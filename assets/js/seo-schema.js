/**
 * Apex Performance Car Rental - Global SEO Helper
 * Auto-injects BreadcrumbList schema on every page
 * Lightweight: ~2KB, no dependencies, zero performance impact
 */
(function () {
  "use strict";

  var BASE_URL = "https://www.apexperformancecarrental.com";

  // Page name mapping for breadcrumbs
  var PAGE_NAMES = {
    "index.html": "Home",
    "about.html": "About Us",
    "cars.html": "All Cars",
    "sports-cars.html": "Sports Cars",
    "luxury-cars.html": "Luxury Cars",
    "convertible-cars.html": "Convertible Cars",
    "suv-cars.html": "SUV Cars",
    "our-fleet.html": "Our Fleet",
    "service.html": "Services",
    "service-shortterm.html": "Short Term Rental",
    "service-longterm.html": "Long Term Rental",
    "service-wedding.html": "Wedding Car Rental",
    "contact.html": "Contact Us",
    "blog.html": "Blog",
    "blog-details.html": "Blog Article",
    "faq.html": "FAQs",
    "booking-terms.html": "Booking Terms",
    "privacy-policy.html": "Privacy Policy",
    "single-inventory.html": "Car Details",
    "login.html": "Login",
    "error.html": "Page Not Found"
  };

  // Parent mapping for breadcrumb hierarchy
  var PARENTS = {
    "sports-cars.html": "cars.html",
    "luxury-cars.html": "cars.html",
    "convertible-cars.html": "cars.html",
    "suv-cars.html": "cars.html",
    "service-shortterm.html": "service.html",
    "service-longterm.html": "service.html",
    "service-wedding.html": "service.html",
    "blog-details.html": "blog.html",
    "single-inventory.html": "our-fleet.html",
    "booking-terms.html": "service.html",
    "privacy-policy.html": "about.html"
  };

  function getCurrentPage() {
    var path = window.location.pathname;
    var page = path.split("/").pop() || "index.html";
    if (page === "" || page === "/") page = "index.html";
    return page;
  }

  function buildBreadcrumbs(page) {
    var crumbs = [];
    var current = page;

    // Walk up the parent chain
    while (current && current !== "index.html") {
      crumbs.unshift({
        name: PAGE_NAMES[current] || current.replace(".html", ""),
        url: BASE_URL + "/" + current
      });
      current = PARENTS[current] || null;
    }

    // Always start with Home
    crumbs.unshift({
      name: "Home",
      url: BASE_URL + "/"
    });

    return crumbs;
  }

  function injectBreadcrumbSchema(page) {
    // Don't add schema to index (already has it) or error/login pages
    if (page === "index.html" || page === "error.html" || page === "login.html" || page === "incoming.html") {
      return;
    }

    var crumbs = buildBreadcrumbs(page);
    var items = [];

    for (var i = 0; i < crumbs.length; i++) {
      items.push({
        "@type": "ListItem",
        position: i + 1,
        name: crumbs[i].name,
        item: crumbs[i].url
      });
    }

    var schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  function injectOrganizationSchema(page) {
    // Only on pages that don't already have schema (index has it manually)
    if (page === "index.html") return;

    var schema = {
      "@context": "https://schema.org",
      "@type": "AutoRental",
      "@id": BASE_URL + "/#business",
      name: "Apex Performance Car Rental",
      url: BASE_URL,
      logo: BASE_URL + "/assets/img/apc high.png",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE"
      },
      telephone: "+971544923609",
      priceRange: "AED 500 - AED 15000",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "00:00",
        closes: "23:59"
      },
      areaServed: { "@type": "City", name: "Dubai" }
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  // Run on page load
  function init() {
    var page = getCurrentPage();
    injectBreadcrumbSchema(page);
    injectOrganizationSchema(page);
  }

  // Use DOMContentLoaded for fastest execution
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
