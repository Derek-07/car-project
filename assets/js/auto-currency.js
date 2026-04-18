/**
 * APEX Auto Currency Converter
 * Hybrid approach: Uses cached rates (instant) + refreshes from API weekly
 * Automatically converts prices when language is switched
 */
(function () {
    "use strict";

    // === CONFIGURATION ===

    // Language-to-currency mapping
    var LANG_CURRENCY = {
        'en': { code: 'USD', symbol: '$', name: 'US Dollar' },
        'ar': { code: 'AED', symbol: 'د.إ', name: 'درهم' },
        'hi': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
        'ru': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
        'zh-CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
        'fr': { code: 'EUR', symbol: '€', name: 'Euro' },
        'de': { code: 'EUR', symbol: '€', name: 'Euro' },
        'es': { code: 'EUR', symbol: '€', name: 'Euro' }
    };

    // Fallback rates (1 AED = X foreign currency) — updated manually as backup
    var FALLBACK_RATES = {
        'AED': 1,
        'USD': 0.2723,
        'EUR': 0.2518,
        'GBP': 0.2121,
        'INR': 22.69,
        'RUB': 23.81,
        'CNY': 1.979,
        'JPY': 39.89,
        'SAR': 1.0206
    };

    var CACHE_KEY = 'apex_exchange_rates';
    var CACHE_TIMESTAMP_KEY = 'apex_exchange_rates_timestamp';
    var CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    var API_URL = 'https://open.er-api.com/v6/latest/AED';

    // === RATE MANAGEMENT ===

    /**
     * Get current exchange rates (cached or fallback)
     */
    function getRates() {
        try {
            var cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                return JSON.parse(cached);
            }
        } catch (e) { }
        return FALLBACK_RATES;
    }

    /**
     * Check if cache is expired (older than 7 days)
     */
    function isCacheExpired() {
        try {
            var timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
            if (!timestamp) return true;
            var age = Date.now() - parseInt(timestamp, 10);
            return age > CACHE_DURATION;
        } catch (e) {
            return true;
        }
    }

    /**
     * Fetch fresh rates from API and cache them
     */
    function refreshRates() {
        if (!isCacheExpired()) return; // Still fresh, no need to fetch

        fetch(API_URL)
            .then(function (response) {
                if (!response.ok) throw new Error('API error');
                return response.json();
            })
            .then(function (data) {
                if (data && data.rates) {
                    // Store the rates we care about
                    var rates = {};
                    var currencies = ['AED', 'USD', 'EUR', 'GBP', 'INR', 'RUB', 'CNY', 'JPY', 'SAR'];
                    currencies.forEach(function (c) {
                        if (data.rates[c] !== undefined) {
                            rates[c] = data.rates[c];
                        }
                    });

                    // AED to AED should always be 1
                    rates['AED'] = 1;

                    localStorage.setItem(CACHE_KEY, JSON.stringify(rates));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));

                    console.log('[APEX Currency] Rates refreshed from API:', rates);

                    // Re-convert prices with new rates
                    var lang = localStorage.getItem('apex_lang') || 'en';
                    if (lang !== 'ar') {
                        convertAllPrices(lang);
                    }
                }
            })
            .catch(function (err) {
                console.log('[APEX Currency] API fetch failed, using cached/fallback rates:', err.message);
            });
    }

    // === PRICE CONVERSION ===

    /**
     * Convert an AED amount to target currency
     */
    function convertPrice(aedAmount, targetCurrency) {
        var rates = getRates();
        var rate = rates[targetCurrency];
        if (!rate) rate = FALLBACK_RATES[targetCurrency] || 1;
        return Math.round(aedAmount * rate);
    }

    /**
     * Format price with currency symbol
     */
    function formatPrice(amount, currencyInfo) {
        var formatted = amount.toLocaleString();
        // Some currencies put symbol before, some after
        if (currencyInfo.code === 'AED') {
            return formatted + ' AED';
        } else if (currencyInfo.symbol === 'د.إ') {
            return formatted + ' د.إ';
        } else {
            return currencyInfo.symbol + ' ' + formatted;
        }
    }

    /**
     * Convert all prices on the page
     */
    function convertAllPrices(langCode) {
        var currencyInfo = LANG_CURRENCY[langCode];
        if (!currencyInfo) return;

        var targetCurrency = currencyInfo.code;

        // 1. Convert elements with data-aed attribute (index.html carousel cards)
        var priceValues = document.querySelectorAll('[data-aed]');
        priceValues.forEach(function (el) {
            var aedPrice = parseInt(el.getAttribute('data-aed'), 10);
            if (isNaN(aedPrice)) return;

            var converted = convertPrice(aedPrice, targetCurrency);
            el.textContent = formatPrice(converted, currencyInfo);
        });

        // 2. Convert inline price text (e.g., "3,500 AED" or "AED 3,500")
        var allPriceElements = document.querySelectorAll('.price, .price-value, .car-price, [class*="price"]');
        allPriceElements.forEach(function (el) {
            // Skip if already handled by data-aed
            if (el.hasAttribute('data-aed')) return;

            var text = el.textContent.trim();
            // Match patterns like "3,500 AED" or "AED 3,500"
            var match = text.match(/(?:AED\s*)?(\d[\d,]*)\s*(?:AED)?/i);
            if (match && text.toLowerCase().includes('aed')) {
                var aedPrice = parseInt(match[1].replace(/,/g, ''), 10);
                if (isNaN(aedPrice) || aedPrice === 0) return;

                // Store original AED price for future re-conversion
                if (!el.hasAttribute('data-original-aed')) {
                    el.setAttribute('data-original-aed', String(aedPrice));
                }

                var converted = convertPrice(aedPrice, targetCurrency);
                el.textContent = formatPrice(converted, currencyInfo);
            }
        });

        // 3. Handle price range text (e.g., "AED 5,000 - AED 25,000")
        var priceDisplays = document.querySelectorAll('#priceDisplay, .price-range');
        priceDisplays.forEach(function (el) {
            var text = el.textContent.trim();
            var rangeMatch = text.match(/(?:AED)?\s*(\d[\d,]*)\s*[-–]\s*(?:AED)?\s*(\d[\d,]*)/i);
            if (rangeMatch) {
                var min = parseInt(rangeMatch[1].replace(/,/g, ''), 10);
                var max = parseInt(rangeMatch[2].replace(/,/g, ''), 10);
                if (!isNaN(min) && !isNaN(max)) {
                    if (!el.hasAttribute('data-original-min')) {
                        el.setAttribute('data-original-min', String(min));
                        el.setAttribute('data-original-max', String(max));
                    }
                    var convertedMin = convertPrice(min, targetCurrency);
                    var convertedMax = convertPrice(max, targetCurrency);
                    el.textContent = formatPrice(convertedMin, currencyInfo) + ' - ' + formatPrice(convertedMax, currencyInfo);
                }
            }
        });

        // 4. Convert dynamically injected car cards (MutationObserver handles future ones)
        convertDynamicCards(currencyInfo, targetCurrency);
    }

    /**
     * Convert dynamically generated car card prices
     */
    function convertDynamicCards(currencyInfo, targetCurrency) {
        // Look for JS-generated price text in car listing pages
        var dynamicPrices = document.querySelectorAll('.inventory-price, .fleet-price, .car-card-price');
        dynamicPrices.forEach(function (el) {
            var text = el.textContent.trim();
            var match = text.match(/(\d[\d,]*)\s*AED/i) || text.match(/AED\s*(\d[\d,]*)/i);
            if (match) {
                var aedPrice = parseInt(match[1].replace(/,/g, ''), 10);
                if (!isNaN(aedPrice)) {
                    if (!el.hasAttribute('data-original-aed')) {
                        el.setAttribute('data-original-aed', String(aedPrice));
                    }
                    var converted = convertPrice(aedPrice, targetCurrency);
                    el.textContent = formatPrice(converted, currencyInfo);
                }
            }
        });
    }

    // === OBSERVER FOR DYNAMIC CONTENT ===

    /**
     * Watch for dynamically added price elements (JS-injected car cards, etc.)
     */
    function observeDynamicContent() {
        var lang = localStorage.getItem('apex_lang') || 'en';
        var currencyInfo = LANG_CURRENCY[lang];
        if (!currencyInfo || lang === 'ar') return;

        var observer = new MutationObserver(function (mutations) {
            var hasNewPrices = false;
            mutations.forEach(function (mutation) {
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function (node) {
                        if (node.nodeType === 1) {
                            // Check if new node contains price elements
                            var prices = node.querySelectorAll ? node.querySelectorAll('[data-aed], .price-value, .price, [class*="price"]') : [];
                            if (prices.length > 0) hasNewPrices = true;
                        }
                    });
                }
            });

            if (hasNewPrices) {
                // Debounce: wait a tick then convert
                setTimeout(function () {
                    convertAllPrices(lang);
                }, 200);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    // === INIT ===

    function init() {
        // Try to refresh rates from API (won't fetch if cache is fresh)
        refreshRates();

        // Convert prices based on current language (skip only Arabic which stays AED)
        var lang = localStorage.getItem('apex_lang') || 'en';
        if (lang !== 'ar') {
            // Wait a moment for page content to fully render
            setTimeout(function () {
                convertAllPrices(lang);
            }, 500);

            // And again after dynamic content might have loaded
            setTimeout(function () {
                convertAllPrices(lang);
            }, 2000);
        }

        // Watch for dynamically added content
        observeDynamicContent();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

    // Expose for language switcher to call
    window.__APEX_CURRENCY__ = {
        convert: convertAllPrices,
        getRates: getRates,
        refreshRates: refreshRates
    };
})();
