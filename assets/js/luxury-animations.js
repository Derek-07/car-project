/**
 * APEX LUXURY ANIMATIONS ENGINE
 * 120fps GPU-Accelerated Scroll Reveal, Parallax, Cursor Glow & Progress Bar
 * Uses IntersectionObserver + requestAnimationFrame for zero-jank performance
 */
(function () {
    "use strict";

    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    /* ==========================================
       1. SCROLL PROGRESS BAR
    ========================================== */
    function initScrollProgress() {
        const bar = document.createElement("div");
        bar.className = "scroll-progress-bar";
        bar.id = "scrollProgressBar";
        document.body.appendChild(bar);

        function updateProgress() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = progress + "%";
        }

        // Hook into APEX scroll engine if available
        if (window.__APEX_SCROLL_ENGINE__ && window.__APEX_SCROLL_ENGINE__.onScroll) {
            window.__APEX_SCROLL_ENGINE__.onScroll(function (state) {
                bar.style.width = (state.progress * 100) + "%";
            });
        } else {
            window.addEventListener("scroll", updateProgress, { passive: true });
            updateProgress();
        }
    }

    /* ==========================================
       2. SCROLL REVEAL (IntersectionObserver)
    ========================================== */
    function initScrollReveal() {
        if (prefersReduced) return;

        const revealClasses = [
            "luxury-reveal",
            "luxury-reveal-left",
            "luxury-reveal-right",
            "luxury-reveal-scale",
            "stagger-children"
        ];

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                        observer.unobserve(entry.target); // Reveal once
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        // Auto-tag sections for reveal
        autoTagSections();

        revealClasses.forEach(function (cls) {
            document.querySelectorAll("." + cls).forEach(function (el) {
                observer.observe(el);
            });
        });
    }

    function autoTagSections() {
        // Browse by Type section title
        var browseTitle = document.querySelector(".browse-by-type .text-center.mb-5");
        if (browseTitle) browseTitle.classList.add("luxury-reveal");

        // Car cards row - stagger
        var carRow = document.querySelector(".browse-by-type .row.g-4");
        if (carRow) {
            carRow.classList.add("stagger-children");
        }

        // Carousel section titles
        document.querySelectorAll(".sec-title").forEach(function (el) {
            var parent = el.closest(".text-center");
            if (parent && !parent.classList.contains("luxury-reveal")) {
                parent.classList.add("luxury-reveal");
            }
        });

        // Section descriptions
        document.querySelectorAll(".sec-text").forEach(function (el) {
            if (!el.closest(".luxury-reveal")) {
                el.classList.add("luxury-reveal");
            }
        });

        // Carousel wrappers
        document.querySelectorAll(
            ".sports-carousel-wrapper, .convertible-carousel-wrapper, .luxury-carousel-wrapper, .suv-carousel-wrapper"
        ).forEach(function (el) {
            el.classList.add("luxury-reveal-scale");
        });

        // Documents & Steps section
        document.querySelectorAll(".docs-how-section .section-title").forEach(function (el) {
            el.classList.add("luxury-reveal");
        });

        var docsRow = document.querySelector(".docs-how-section .row.g-4:not(.steps-cards)");
        if (docsRow) docsRow.classList.add("stagger-children");

        var stepsRow = document.querySelector(".docs-how-section .steps-cards");
        if (stepsRow) stepsRow.classList.add("stagger-children");

        // Why Choose Us
        var whyTitle = document.querySelector(".why-choose-us-section .sec-title");
        if (whyTitle) {
            var whyParent = whyTitle.closest(".text-center");
            if (whyParent) whyParent.classList.add("luxury-reveal");
        }

        var whyCards = document.querySelector(".why-choose-us-section .row.g-4");
        if (whyCards) whyCards.classList.add("stagger-children");

        // Testimonials
        var testiTitle = document.querySelector("#testi-sec .title-area");
        if (testiTitle) testiTitle.classList.add("luxury-reveal");

        // Blog
        var blogTitle = document.querySelector("#blog-sec .title-area");
        if (blogTitle) blogTitle.classList.add("luxury-reveal");

        // Contact
        var contactInfo = document.querySelector(".contact-info-group");
        if (contactInfo) contactInfo.classList.add("luxury-reveal-left");

        var contactForm = document.querySelector(".contact-form-wrapper");
        if (contactForm) contactForm.classList.add("luxury-reveal-right");

        // Instagram
        var instaTitle = document.querySelector(".instagram-section h2");
        if (instaTitle) {
            var instaParent = instaTitle.closest(".text-center");
            if (instaParent) instaParent.classList.add("luxury-reveal");
        }

        var instaFeed = document.querySelector(".instagram-feed-wrapper");
        if (instaFeed) instaFeed.classList.add("luxury-reveal-scale");

        // Brand slider
        var brandArea = document.querySelector(".brand-area-1");
        if (brandArea) brandArea.classList.add("luxury-reveal");

        // View All buttons
        document.querySelectorAll(".th-btn.style2").forEach(function (btn) {
            var container = btn.closest(".col-12");
            if (container && !container.classList.contains("luxury-reveal")) {
                container.classList.add("luxury-reveal");
            }
        });
    }

    /* ==========================================
       3. CURSOR GLOW (Desktop Only)
    ========================================== */
    function initCursorGlow() {
        if (isTouch || prefersReduced) return;

        var glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);

        var mouseX = 0, mouseY = 0;
        var glowX = 0, glowY = 0;

        document.addEventListener("mousemove", function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        // Ultra smooth lerp at 120fps
        function animateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            glow.style.transform = "translate3d(" + (glowX - 160) + "px, " + (glowY - 160) + "px, 0)";
            requestAnimationFrame(animateGlow);
        }

        requestAnimationFrame(animateGlow);

        // Fade on leave/enter
        document.addEventListener("mouseleave", function () {
            glow.style.opacity = "0";
        });
        document.addEventListener("mouseenter", function () {
            glow.style.opacity = "1";
        });
    }

    /* ==========================================
       4. MAGNETIC BUTTONS (Desktop)
    ========================================== */
    function initMagneticButtons() {
        if (isTouch || prefersReduced) return;

        var buttons = document.querySelectorAll(".th-btn, .carousel-btn, .slider-arrow, .fab-btn");

        buttons.forEach(function (btn) {
            btn.addEventListener("mousemove", function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = "translate3d(" + (x * 0.15) + "px, " + (y * 0.15) + "px, 0)";
            });

            btn.addEventListener("mouseleave", function () {
                btn.style.transform = "translate3d(0, 0, 0)";
                btn.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
            });

            btn.addEventListener("mouseenter", function () {
                btn.style.transition = "transform 0.15s ease-out";
            });
        });
    }

    /* ==========================================
       5. PARALLAX BACKGROUNDS
    ========================================== */
    function initParallax() {
        if (isTouch || prefersReduced) return;

        var parallaxSections = document.querySelectorAll(
            ".docs-how-section, .why-choose-us-section, .contact-section"
        );

        if (!parallaxSections.length) return;

        function updateParallax() {
            var scrollY = window.scrollY || 0;
            parallaxSections.forEach(function (section) {
                var rect = section.getBoundingClientRect();
                var inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView) {
                    var offset = (rect.top / window.innerHeight) * 30;
                    section.style.backgroundPositionY = "calc(50% + " + offset + "px)";
                }
            });
        }

        if (window.__APEX_SCROLL_ENGINE__ && window.__APEX_SCROLL_ENGINE__.addRafTask) {
            window.__APEX_SCROLL_ENGINE__.addRafTask(updateParallax);
        } else {
            window.addEventListener("scroll", function () {
                requestAnimationFrame(updateParallax);
            }, { passive: true });
        }
    }

    /* ==========================================
       6. COUNTER ANIMATION ON SCROLL
    ========================================== */
    function initCounters() {
        var counters = document.querySelectorAll("[data-count]");
        if (!counters.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseInt(el.getAttribute("data-count"), 10);
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target).toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                }

                requestAnimationFrame(step);
                observer.unobserve(el);
            });
        }, { threshold: 0.3 });

        counters.forEach(function (c) { observer.observe(c); });
    }

    /* ==========================================
       7. TILT EFFECT ON CARDS (Desktop)
    ========================================== */
    function initCardTilt() {
        if (isTouch || prefersReduced) return;

        var cards = document.querySelectorAll(
            ".car-card, .premium-glass-card, .why-card, .carousel-car-card"
        );

        cards.forEach(function (card) {
            card.addEventListener("mousemove", function (e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = "perspective(800px) rotateY(" + (x * 5) + "deg) rotateX(" + (-y * 5) + "deg) translate3d(0, -5px, 0)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translate3d(0, 0, 0)";
                card.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
            });

            card.addEventListener("mouseenter", function () {
                card.style.transition = "transform 0.15s ease-out";
            });
        });
    }

    /* ==========================================
       8. SMOOTH PAGE LOAD TRANSITION
    ========================================== */
    function initPageTransition() {
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)";

        window.addEventListener("load", function () {
            requestAnimationFrame(function () {
                document.body.style.opacity = "1";
            });
        });
    }

    /* ==========================================
       INIT ALL
    ========================================== */
    function init() {
        initScrollProgress();
        initScrollReveal();
        initCursorGlow();
        initMagneticButtons();
        initParallax();
        initCounters();
        initCardTilt();
    }

    // Page transition runs immediately
    initPageTransition();

    // Everything else after DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
