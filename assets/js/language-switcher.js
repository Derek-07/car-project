/**
 * APEX Language Switcher - Google Translate Integration
 * Premium globe icon with dropdown language selector
 * Layout-safe: all Google Translate UI elements are hidden/overridden
 */
(function () {
    "use strict";

    // Languages to show (code: display name)
    var LANGUAGES = {
        'en': { name: 'English', flag: '🇬🇧' },
        'ar': { name: 'العربية', flag: '🇦🇪' },
        'ru': { name: 'Русский', flag: '🇷🇺' },
        'zh-CN': { name: '中文', flag: '🇨🇳' },
        'fr': { name: 'Français', flag: '🇫🇷' },
        'de': { name: 'Deutsch', flag: '🇩🇪' },
        'hi': { name: 'हिन्दी', flag: '🇮🇳' },
        'es': { name: 'Español', flag: '🇪🇸' }
    };

    // Current active language
    var currentLang = localStorage.getItem('apex_lang') || 'en';

    /**
     * Inject Google Translate script
     */
    function loadGoogleTranslate() {
        // Hidden container for Google Translate (required by API)
        var gtContainer = document.createElement('div');
        gtContainer.id = 'google_translate_element';
        gtContainer.style.cssText = 'position:absolute;top:-9999px;left:-9999px;opacity:0;pointer-events:none;height:0;overflow:hidden;';
        document.body.appendChild(gtContainer);

        // Google Translate init function
        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: Object.keys(LANGUAGES).join(','),
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');

            // Restore saved language after Google Translate loads
            setTimeout(function () {
                if (currentLang && currentLang !== 'en') {
                    triggerTranslation(currentLang);
                }
            }, 1000);
        };

        // Load Google Translate script
        var script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
    }

    /**
     * Trigger translation to a specific language
     */
    function triggerTranslation(langCode) {
        if (langCode === 'en') {
            // Reset to original
            var frame = document.querySelector('.goog-te-banner-frame');
            if (frame) {
                try {
                    var btn = frame.contentDocument.querySelector('.goog-close-link');
                    if (btn) btn.click();
                } catch (e) { }
            }
            // Also try cookie method
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + window.location.hostname;
            // Reload to reset
            if (currentLang !== 'en') {
                localStorage.setItem('apex_lang', 'en');
                window.location.reload();
            }
            return;
        }

        // Set cookie for Google Translate
        document.cookie = "googtrans=/en/" + langCode + "; path=/;";
        document.cookie = "googtrans=/en/" + langCode + "; path=/; domain=." + window.location.hostname;

        // Try to use the Google Translate select element
        var selectEl = document.querySelector('#google_translate_element select');
        if (selectEl) {
            selectEl.value = langCode;
            selectEl.dispatchEvent(new Event('change'));
        }

        localStorage.setItem('apex_lang', langCode);
        currentLang = langCode;
    }

    /**
     * Build the premium language switcher UI
     */
    function buildSwitcherUI() {
        // Create wrapper
        var wrapper = document.createElement('div');
        wrapper.className = 'apex-lang-switcher';
        wrapper.id = 'apexLangSwitcher';

        // Globe button
        var btn = document.createElement('button');
        btn.className = 'apex-lang-btn';
        btn.setAttribute('aria-label', 'Change Language');
        btn.innerHTML = '<i class="fas fa-globe"></i>';

        // Dropdown
        var dropdown = document.createElement('div');
        dropdown.className = 'apex-lang-dropdown';

        // Language items
        var langKeys = Object.keys(LANGUAGES);
        for (var i = 0; i < langKeys.length; i++) {
            var code = langKeys[i];
            var lang = LANGUAGES[code];

            var item = document.createElement('button');
            item.className = 'apex-lang-item' + (code === currentLang ? ' active' : '');
            item.setAttribute('data-lang', code);
            item.innerHTML = '<span class="lang-flag">' + lang.flag + '</span><span class="lang-name">' + lang.name + '</span>';

            (function (c) {
                item.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Update active state
                    var items = dropdown.querySelectorAll('.apex-lang-item');
                    for (var j = 0; j < items.length; j++) items[j].classList.remove('active');
                    this.classList.add('active');

                    // Trigger translation
                    triggerTranslation(c);

                    // Close dropdown
                    wrapper.classList.remove('open');

                    // If switching to non-English, reload after setting cookie
                    if (c !== 'en') {
                        localStorage.setItem('apex_lang', c);
                        setTimeout(function () { window.location.reload(); }, 300);
                    }
                });
            })(code);

            dropdown.appendChild(item);
        }

        wrapper.appendChild(btn);
        wrapper.appendChild(dropdown);

        // Toggle dropdown
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            wrapper.classList.toggle('open');
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (!wrapper.contains(e.target)) {
                wrapper.classList.remove('open');
            }
        });

        return wrapper;
    }

    /**
     * Inject as a fixed floating button on the LEFT side (opposite WhatsApp/Phone)
     */
    function injectSwitcher() {
        var switcher = buildSwitcherUI();
        switcher.classList.add('apex-lang-fixed');

        // Append directly to body as a fixed element
        document.body.appendChild(switcher);
    }

    /**
     * Hide Google Translate default UI elements that break layout
     */
    function hideGoogleUI() {
        var style = document.createElement('style');
        style.textContent = [
            '/* === HIDE GOOGLE TRANSLATE DEFAULT UI === */',
            '.goog-te-banner-frame { display:none !important; }',
            '#goog-gt-tt { display:none !important; }',
            '.goog-te-balloon-frame { display:none !important; }',
            '.goog-tooltip { display:none !important; }',
            '.goog-tooltip:hover { display:none !important; }',
            '.goog-text-highlight { background:none !important; box-shadow:none !important; }',
            'body { top:0 !important; position:static !important; }',
            '#google_translate_element { display:none !important; }',
            '.skiptranslate { display:none !important; }',
            'body > .skiptranslate { display:none !important; }',
            'body { margin-top:0 !important; padding-top:0 !important; }',
            '#goog-gt-tt, .goog-te-balloon-frame { display:none !important; }',
            '.goog-te-gadget { display:none !important; }',
            ''
        ].join('\n');
        document.head.appendChild(style);

        // Observe body for Google Translate's injected top bar and remove it
        var observer = new MutationObserver(function (mutations) {
            // Kill the top bar frame
            var frame = document.querySelector('.goog-te-banner-frame');
            if (frame) frame.style.display = 'none';

            // Reset body top position (Google Translate pushes body down)
            if (document.body.style.top && document.body.style.top !== '0px') {
                document.body.style.top = '0px';
            }
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'], childList: true });
    }

    /**
     * Init
     */
    function init() {
        hideGoogleUI();
        injectSwitcher();
        loadGoogleTranslate();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
