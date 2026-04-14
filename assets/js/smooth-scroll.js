(function () {
  "use strict";

  function initSmoothScroll() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    const body = document.body;
    const header = document.querySelector(".th-header");
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasLenis = typeof window.Lenis === "function";
    const rafTasks = new Set();
    const scrollSubscribers = new Set();
    let rafId = 0;
    let lastScroll = window.scrollY || 0;
    let ticking = false;

    const scrollState = {
      animatedScroll: lastScroll,
      actualScroll: lastScroll,
      velocity: 0,
      direction: 0,
      progress: 0,
      limit: Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    };

    function updateScrollState(nextScroll, velocity) {
      scrollState.animatedScroll = nextScroll;
      scrollState.actualScroll = window.scrollY || nextScroll;
      scrollState.velocity = velocity || 0;
      scrollState.direction = nextScroll === lastScroll ? scrollState.direction : nextScroll > lastScroll ? 1 : -1;
      scrollState.limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollState.progress = Math.min(1, Math.max(0, nextScroll / scrollState.limit));
      lastScroll = nextScroll;
    }

    function emitScroll() {
      scrollSubscribers.forEach(function (callback) {
        callback(scrollState);
      });

      window.dispatchEvent(
        new CustomEvent("apex:smooth-scroll", {
          detail: scrollState
        })
      );
    }

    function onScrollFrame(nextScroll, velocity) {
      updateScrollState(nextScroll, velocity);

      if (header) {
        if (scrollState.direction > 0 && scrollState.animatedScroll > 50) {
          header.classList.add("header-hidden");
          header.classList.remove("header-visible");
        } else {
          header.classList.remove("header-hidden");
          header.classList.add("header-visible");
        }
      }

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () {
          emitScroll();
          ticking = false;
        });
      }
    }

    // Keep all scroll interpolation on a single ticker so WebGL and UI stay frame-aligned.
    const lenis = hasLenis && !prefersReducedMotion
      ? new window.Lenis({
          lerp: isTouchDevice ? 0.16 : 0.12,
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.14,
          wheelMultiplier: isTouchDevice ? 0.95 : 1,
          touchMultiplier: isTouchDevice ? 0.9 : 1,
          duration: isTouchDevice ? 1 : 1.15,
          autoResize: true
        })
      : null;

    function runTasks(time) {
      rafTasks.forEach(function (task) {
        task(time, scrollState);
      });
    }

    function frame(time) {
      if (lenis) {
        lenis.raf(time);
      }

      runTasks(time);
      rafId = window.requestAnimationFrame(frame);
    }

    function startTicker() {
      if (!rafId) {
        rafId = window.requestAnimationFrame(frame);
      }
    }

    function stopTicker() {
      if (!rafId) {
        return;
      }

      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function subscribe(task) {
      if (typeof task !== "function") {
        return function () {};
      }

      rafTasks.add(task);
      return function () {
        rafTasks.delete(task);
      };
    }

    function subscribeScroll(callback) {
      if (typeof callback !== "function") {
        return function () {};
      }

      scrollSubscribers.add(callback);
      callback(scrollState);

      return function () {
        scrollSubscribers.delete(callback);
      };
    }

    function smartScrollTo(target, options) {
      if (!target) {
        return;
      }

      if (lenis) {
        lenis.scrollTo(target, options || {});
        return;
      }

      const node = typeof target === "string" ? document.querySelector(target) : target;
      if (!node) {
        return;
      }

      const top = node === document.documentElement || node === document.body
        ? 0
        : node.getBoundingClientRect().top + window.scrollY + ((options && options.offset) || 0);

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    }

    function handleAnchorNavigation(event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      smartScrollTo(target, {
        offset: -10,
        duration: isTouchDevice ? 1 : 1.15,
        easing: function (value) {
          return 1 - Math.pow(1 - value, 3);
        }
      });
    }

    function handleScrollTopClick(event) {
      const trigger = event.target.closest(".scroll-top");
      if (!trigger) {
        return;
      }

      event.preventDefault();
      smartScrollTo(document.documentElement, {
        duration: isTouchDevice ? 1 : 1.15,
        easing: function (value) {
          return 1 - Math.pow(1 - value, 3);
        }
      });
    }

    function observeModelViewers() {
      const models = document.querySelectorAll("model-viewer");
      if (!models.length || !("IntersectionObserver" in window)) {
        return;
      }

      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            const model = entry.target;

            if (entry.isIntersecting) {
              if (model.dataset.wasPausedByViewport === "true" && typeof model.play === "function") {
                model.play();
              }
              model.dataset.wasPausedByViewport = "false";
              return;
            }

            // Offscreen model viewers keep their layout box but stop spending GPU time.
            if (typeof model.pause === "function") {
              model.pause();
              model.dataset.wasPausedByViewport = "true";
            }
          });
        },
        {
          rootMargin: "150px 0px"
        }
      );

      models.forEach(function (model) {
        model.setAttribute("loading", "lazy");
        model.setAttribute("interaction-prompt", "none");
        observer.observe(model);
      });
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (lenis) {
          lenis.stop();
        }
        stopTicker();
        return;
      }

      if (lenis) {
        lenis.start();
      }
      startTicker();
    }

    function bindNativeScrollFallback() {
      if (lenis) {
        lenis.on("scroll", function (event) {
          onScrollFrame(event.animatedScroll, event.velocity);
        });
        return;
      }

      window.addEventListener(
        "scroll",
        function () {
          onScrollFrame(window.scrollY || 0, 0);
        },
        { passive: true }
      );
    }

    root.classList.add("lenis-enhanced");
    body.classList.add("lenis-enhanced-body");

    bindNativeScrollFallback();
    document.addEventListener("click", handleAnchorNavigation, { capture: true, passive: false });
    document.addEventListener("click", handleScrollTopClick, { capture: true, passive: false });
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    window.addEventListener(
      "resize",
      function () {
        scrollState.limit = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      },
      { passive: true }
    );

    window.__APEX_SCROLL_ENGINE__ = {
      lenis: lenis,
      addRafTask: subscribe,
      onScroll: subscribeScroll,
      // Shared API so other renderers can join the same frame loop without extra rAF chains.
      scrollTo: smartScrollTo,
      getState: function () {
        return Object.assign({}, scrollState);
      }
    };

    onScrollFrame(window.scrollY || 0, 0);
    observeModelViewers();
    startTicker();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSmoothScroll, { once: true });
    return;
  }

  initSmoothScroll();
})();
