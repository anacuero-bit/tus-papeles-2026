/**
 * Referral System for tuspapeles2026
 * Handles localStorage, URL parsing, and Telegram link updates
 */

(function() {
    'use strict';

    var STORAGE_KEY = 'tp2026_referral_code';
    var TIMESTAMP_KEY = 'tp2026_referral_time';
    var EXPIRY_DAYS = 30;
    var BOT_URL = 'https://t.me/TusPapeles2026Bot';

    /**
     * Get stored referral code (if not expired)
     */
    function getStoredCode() {
        var code = localStorage.getItem(STORAGE_KEY);
        var timestamp = localStorage.getItem(TIMESTAMP_KEY);

        if (!code || !timestamp) return null;

        var age = Date.now() - parseInt(timestamp, 10);
        var maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

        if (age > maxAge) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(TIMESTAMP_KEY);
            return null;
        }

        return code;
    }

    /**
     * Store referral code
     */
    function storeCode(code) {
        if (!code || code.length < 3) return false;

        code = code.toUpperCase().trim();

        if (!/^[A-Z]+-[A-Z0-9]{3,}$/i.test(code)) return false;

        localStorage.setItem(STORAGE_KEY, code);
        localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
        return true;
    }

    /**
     * Parse code from current URL
     */
    function getCodeFromURL() {
        var params = new URLSearchParams(window.location.search);
        var code = params.get('code') || params.get('ref');

        if (code) return code.toUpperCase().trim();

        var pathMatch = window.location.pathname.match(/\/r\/([A-Z0-9-]+)/i);
        if (pathMatch) return pathMatch[1].toUpperCase();

        return null;
    }

    /**
     * Update all Telegram links to include referral code
     */
    function updateTelegramLinks(code) {
        if (!code) return;

        var links = document.querySelectorAll('a[href*="t.me/TusPapeles2026Bot"]');
        links.forEach(function(link) {
            link.href = BOT_URL + '?start=' + encodeURIComponent(code);
        });
    }

    /**
     * Show referral banner if code present
     */
    function showReferralBanner(code) {
        var banner = document.getElementById('referral-banner');
        if (!banner || !code) return;

        var parts = code.split('-');
        var rawName = parts[0] || 'Tu amigo';
        var name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();

        var nameSpan = banner.querySelector('.referrer-name');
        if (nameSpan) {
            nameSpan.textContent = name;
        }

        banner.style.display = 'block';
        banner.classList.add('visible');
    }

    /**
     * Generate WhatsApp share link
     */
    function generateWhatsAppLink(code) {
        var text = '\u00a1Hola! Acabo de verificar que califico para la regularizaci\u00f3n 2026 en Espa\u00f1a.\n\n' +
            'Si llevas tiempo aqu\u00ed sin papeles, verifica gratis si calificas:\n' +
            '\ud83d\udc49 tuspapeles2026.es/r.html?code=' + code + '\n\n' +
            'Usa mi c\u00f3digo ' + code + ' y te descuentan \u20ac25.\n\n' +
            'Es el nuevo decreto \u2014 no necesitas contrato de trabajo. \u00a1Aprovecha!';

        return 'https://wa.me/?text=' + encodeURIComponent(text);
    }

    /**
     * Copy text to clipboard with fallback
     */
    function copyToClipboard(text, callback) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(function() { if (callback) callback(true); })
                .catch(function() { fallbackCopy(text, callback); });
        } else {
            fallbackCopy(text, callback);
        }
    }

    function fallbackCopy(text, callback) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            if (callback) callback(true);
        } catch (e) {
            if (callback) callback(false);
        }
        document.body.removeChild(textarea);
    }

    /**
     * Initialize referral system
     */
    function init() {
        var urlCode = getCodeFromURL();
        if (urlCode) {
            storeCode(urlCode);
        }

        var code = urlCode || getStoredCode();

        if (code) {
            updateTelegramLinks(code);
            showReferralBanner(code);
        }

        document.querySelectorAll('[data-share="whatsapp"]').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var shareCode = this.getAttribute('data-code') || code;
                if (shareCode) {
                    window.open(generateWhatsAppLink(shareCode), '_blank');
                }
            });
        });

        document.querySelectorAll('[data-share="copy"]').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var shareCode = this.getAttribute('data-code') || code;
                if (shareCode) {
                    var link = 'tuspapeles2026.es/r.html?code=' + shareCode;
                    var originalText = this.textContent;
                    var button = this;

                    copyToClipboard(link, function(success) {
                        if (success) {
                            button.textContent = '\u2713 Copiado';
                            setTimeout(function() {
                                button.textContent = originalText;
                            }, 2000);
                        }
                    });
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.TusPapelesReferral = {
        getCode: getStoredCode,
        storeCode: storeCode,
        updateLinks: updateTelegramLinks,
        whatsappLink: generateWhatsAppLink,
        copy: copyToClipboard
    };

})();
