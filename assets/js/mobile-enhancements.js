// Small helper to sync menu-open state and improve mobile scroll performance
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){
    var wrapper = document.querySelector('.th-menu-wrapper');
    if(!wrapper) return;
    // Observe class changes to toggle body no-scroll
    var observer = new MutationObserver(function(muts){
      if(wrapper.classList.contains('th-body-visible')){
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    });
    observer.observe(wrapper,{attributes:true,attributeFilter:['class']});

    // Ensure the menu toggle button gets aria attributes for accessibility
    var toggles = document.querySelectorAll('.th-menu-toggle');
    toggles.forEach(function(btn){
      btn.setAttribute('aria-expanded','false');
      btn.setAttribute('aria-controls','mobile-menu');
      btn.addEventListener('click', function(){
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
      });
    });

    // Add id to mobile menu for aria
    var mobileMenu = document.querySelector('.th-mobile-menu');
    if(mobileMenu) mobileMenu.setAttribute('id','mobile-menu');

    // Prevent horizontal scroll tiny adjustments
    document.documentElement.style.overflowX = 'hidden';

    // Lightweight requestAnimationFrame-based scroll locker for passive optimizations (no visual smoothing)
    // Keep small and opt-in: ensure not to conflict with other libs
    var lastScroll = 0;
    var ticking = false;
    window.addEventListener('scroll', function(){
      lastScroll = window.scrollY;
      if(!ticking){
        window.requestAnimationFrame(function(){
          // placeholder for any scroll-linked transforms (none by default)
          ticking = false;
        });
        ticking = true;
      }
    }, {passive:true});
  });
})();

// Add full-title tooltips for truncated card titles for better UX
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    var links = document.querySelectorAll('.feature-list-1 .box-title a');
    links.forEach(function(a){
      try{
        var txt = a.textContent.trim();
        if(txt && !a.getAttribute('title')) a.setAttribute('title', txt);
      }catch(e){}
    });
  });
})();
