# CLAUDE CODE PROMPT — WEBSITE REFERRAL SYSTEM

**Repository:** tus-papeles-2026
**Branch:** Create new branch `feature/referral-system`

---

## OVERVIEW

Implement referral system on the website:
1. Landing page for referral links (`/r.html?code=XXX`)
2. JavaScript to store/retrieve referral codes
3. Update Telegram links to include codes
4. Referral section on homepage
5. Terms page

---

## FILE STRUCTURE

Create/modify these files:

```
tus-papeles-2026/
├── index.html          # MODIFY: Add referral section
├── verificar.html      # MODIFY: Add share CTA on success
├── r.html              # NEW: Referral landing page
├── referidos-terminos.html  # NEW: Terms page
├── js/
│   └── referral.js     # NEW: Referral handling
└── css/
    └── styles.css      # MODIFY: Add referral styles
```

---

## STEP 1: CREATE js/referral.js

Create this file:

```javascript
/**
 * Referral System for tuspapeles2026
 * Handles localStorage, URL parsing, and Telegram link updates
 */

(function() {
    'use strict';
    
    const STORAGE_KEY = 'tp2026_referral_code';
    const TIMESTAMP_KEY = 'tp2026_referral_time';
    const EXPIRY_DAYS = 30;
    const BOT_URL = 'https://t.me/TusPapeles2026Bot';
    
    /**
     * Get stored referral code (if not expired)
     */
    function getStoredCode() {
        const code = localStorage.getItem(STORAGE_KEY);
        const timestamp = localStorage.getItem(TIMESTAMP_KEY);
        
        if (!code || !timestamp) return null;
        
        // Check expiry
        const age = Date.now() - parseInt(timestamp, 10);
        const maxAge = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        
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
        
        // Basic validation: should be NAME-XXXX format
        if (!/^[A-Z]+-[A-Z0-9]{3,}$/i.test(code)) return false;
        
        localStorage.setItem(STORAGE_KEY, code);
        localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
        return true;
    }
    
    /**
     * Parse code from current URL
     */
    function getCodeFromURL() {
        // Check query param: ?code=XXX or ?ref=XXX
        const params = new URLSearchParams(window.location.search);
        let code = params.get('code') || params.get('ref');
        
        if (code) return code.toUpperCase().trim();
        
        // Check path: /r/XXX or /r.html with hash
        const pathMatch = window.location.pathname.match(/\/r\/([A-Z0-9-]+)/i);
        if (pathMatch) return pathMatch[1].toUpperCase();
        
        return null;
    }
    
    /**
     * Update all Telegram links to include referral code
     */
    function updateTelegramLinks(code) {
        if (!code) return;
        
        const links = document.querySelectorAll('a[href*="t.me/TusPapeles2026Bot"]');
        links.forEach(function(link) {
            link.href = BOT_URL + '?start=' + encodeURIComponent(code);
        });
    }
    
    /**
     * Show referral banner if code present
     */
    function showReferralBanner(code) {
        const banner = document.getElementById('referral-banner');
        if (!banner || !code) return;
        
        // Extract name from code (part before dash)
        const parts = code.split('-');
        const rawName = parts[0] || 'Tu amigo';
        // Capitalize first letter, lowercase rest
        const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
        
        // Update banner content
        const nameSpan = banner.querySelector('.referrer-name');
        if (nameSpan) {
            nameSpan.textContent = name;
        }
        
        // Show banner
        banner.style.display = 'block';
        banner.classList.add('visible');
    }
    
    /**
     * Generate WhatsApp share link
     */
    function generateWhatsAppLink(code) {
        const text = '¡Hola! Acabo de verificar que califico para la regularización 2026 en España.\n\n' +
            'Si llevas tiempo aquí sin papeles, verifica gratis si calificas:\n' +
            '👉 tuspapeles2026.es/r.html?code=' + code + '\n\n' +
            'Usa mi código ' + code + ' y te descuentan €25.\n\n' +
            'Es el nuevo decreto — no necesitas contrato de trabajo. ¡Aprovecha!';
        
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
        // Check URL for new code
        const urlCode = getCodeFromURL();
        if (urlCode) {
            storeCode(urlCode);
        }
        
        // Get active code
        const code = urlCode || getStoredCode();
        
        if (code) {
            updateTelegramLinks(code);
            showReferralBanner(code);
        }
        
        // Set up WhatsApp share buttons
        document.querySelectorAll('[data-share="whatsapp"]').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var shareCode = this.getAttribute('data-code') || code;
                if (shareCode) {
                    window.open(generateWhatsAppLink(shareCode), '_blank');
                }
            });
        });
        
        // Set up copy buttons
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
                            button.textContent = '✓ Copiado';
                            setTimeout(function() {
                                button.textContent = originalText;
                            }, 2000);
                        }
                    });
                }
            });
        });
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Expose for external use
    window.TusPapelesReferral = {
        getCode: getStoredCode,
        storeCode: storeCode,
        updateLinks: updateTelegramLinks,
        whatsappLink: generateWhatsAppLink,
        copy: copyToClipboard
    };
    
})();
```

---

## STEP 2: CREATE r.html (Referral Landing Page)

Create this file:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>€25 de Descuento | tuspapeles2026</title>
    <meta name="description" content="Regularización extraordinaria 2026. Verifica si calificas gratis.">
    
    <!-- Copy all other head elements from index.html: favicon, fonts, CSS, etc. -->
    <link rel="stylesheet" href="css/styles.css">
    
    <style>
        /* Referral-specific styles */
        .referral-banner {
            display: none;
            background: linear-gradient(135deg, #E8D4A8, #D4C094);
            color: #1E3A5F;
            padding: 15px 20px;
            text-align: center;
            font-weight: 500;
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .referral-banner.visible {
            display: block;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        
        .referral-banner .gift-icon {
            font-size: 1.3em;
            margin-right: 8px;
        }
        
        .referral-banner strong {
            font-weight: 700;
        }
    </style>
</head>
<body>
    <!-- Referral Banner (shown by JS if code valid) -->
    <div id="referral-banner" class="referral-banner">
        <span class="gift-icon">🎁</span>
        <span class="referrer-name">Tu amigo</span> te regala <strong>€25 de descuento</strong>
    </div>
    
    <!-- 
        COPY THE REST OF YOUR index.html CONTENT HERE
        Including: header, hero, process section, pricing, FAQ, footer
        
        Make sure ALL Telegram links use: https://t.me/TusPapeles2026Bot
        (The JS will automatically append the referral code)
    -->
    
    <!-- Include referral.js before closing body -->
    <script src="js/referral.js"></script>
</body>
</html>
```

**IMPORTANT:** Copy all content from index.html into r.html. The JS will handle adding the referral code to Telegram links.

---

## STEP 3: CREATE referidos-terminos.html

Create this file:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programa de Referidos — Términos | tuspapeles2026</title>
    
    <!-- Copy head elements from index.html -->
    <link rel="stylesheet" href="css/styles.css">
    
    <style>
        .terms-page {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .terms-page h1 {
            color: #1E3A5F;
            margin-bottom: 30px;
        }
        
        .terms-page h2 {
            color: #1E3A5F;
            margin-top: 40px;
            margin-bottom: 15px;
            font-size: 1.3em;
        }
        
        .terms-page ul, .terms-page ol {
            margin-bottom: 20px;
            padding-left: 25px;
        }
        
        .terms-page li {
            margin-bottom: 10px;
            line-height: 1.6;
        }
        
        .terms-page li ul {
            margin-top: 10px;
        }
        
        .example-box {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .example-box h3 {
            margin-top: 0;
            color: #1E3A5F;
        }
        
        .last-updated {
            margin-top: 40px;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <!-- Copy header from index.html -->
    <header>
        <!-- Your site header -->
    </header>
    
    <main class="terms-page">
        <h1>Programa de Referidos — Términos</h1>
        
        <section>
            <h2>Cómo Funciona</h2>
            <ol>
                <li>Al completar la verificación de elegibilidad, recibes un <strong>código personal único</strong>.</li>
                <li>Cuando pagas tu primera fase (<strong>€39</strong>), tu código se activa para ganar recompensas.</li>
                <li>Por cada amigo que pague usando tu código:
                    <ul>
                        <li>Tú recibes <strong>€25 de crédito</strong></li>
                        <li>Tu amigo recibe <strong>€25 de descuento</strong> en su primer pago</li>
                    </ul>
                </li>
                <li>Puedes acumular hasta <strong>€299 en créditos</strong> (el costo total del servicio).</li>
                <li>Si ya pagaste los €299 completos, ganas <strong>10% en efectivo</strong> por cada pago de tus referidos. Pagamos mensualmente por Bizum (mínimo €30 acumulados).</li>
            </ol>
        </section>
        
        <section>
            <h2>Reglas</h2>
            <ul>
                <li>Solo ganas por referidos <strong>directos</strong>. No es multinivel — no ganas por los amigos de tus amigos.</li>
                <li>El crédito se aplica automáticamente a tus pagos pendientes.</li>
                <li>Si tu amigo solicita reembolso en los primeros 14 días, el crédito se revierte.</li>
                <li>Los pagos en efectivo se procesan 30 días después del pago del referido.</li>
                <li>Máximo €1,000 en efectivo por año calendario.</li>
                <li>Una cuenta bancaria/Bizum por código de referido.</li>
                <li>Nos reservamos el derecho de revisar cuentas con actividad inusual.</li>
            </ul>
        </section>
        
        <section>
            <h2>Importante</h2>
            <p>Este programa recompensa a quienes ayudan a su comunidad a conocer nuestros servicios. El dinero viene de nuestros ingresos por servicios prestados, no de otros usuarios. <strong>No es un esquema multinivel.</strong></p>
        </section>
        
        <section>
            <h2>Ejemplos</h2>
            
            <div class="example-box">
                <h3>Ejemplo 1: María refiere 12 amigos</h3>
                <ul>
                    <li>12 amigos pagan → María gana €25 × 12 = €300 en créditos</li>
                    <li>María tiene €299 en créditos (el máximo)</li>
                    <li>María paga €39 → usa €39 de crédito → paga €0</li>
                    <li>María paga €150 → usa €150 de crédito → paga €0</li>
                    <li>María paga €110 → usa €110 de crédito → paga €0</li>
                    <li><strong>Resultado: María obtuvo el servicio completo GRATIS</strong></li>
                </ul>
            </div>
            
            <div class="example-box">
                <h3>Ejemplo 2: Carlos refiere 20 amigos</h3>
                <ul>
                    <li>Primeros 12 amigos → €299 en créditos (servicio gratis)</li>
                    <li>Carlos paga sus €299 con créditos</li>
                    <li>Siguientes 8 amigos pagan €299 cada uno:</li>
                    <li>Carlos gana 10% × €299 × 8 = €239.20 en efectivo</li>
                    <li><strong>Resultado: Servicio gratis + €239 en efectivo</strong></li>
                </ul>
            </div>
        </section>
        
        <p class="last-updated">Última actualización: Febrero 2026</p>
    </main>
    
    <!-- Copy footer from index.html -->
    <footer>
        <!-- Your site footer -->
    </footer>
    
    <script src="js/referral.js"></script>
</body>
</html>
```

---

## STEP 4: MODIFY index.html

### 4.1 Add Referral Banner (After Opening Body)

```html
<body>
    <!-- Referral Banner (hidden by default, shown by JS if code present) -->
    <div id="referral-banner" class="referral-banner">
        <span class="gift-icon">🎁</span>
        <span class="referrer-name">Tu amigo</span> te regala <strong>€25 de descuento</strong>
    </div>
    
    <!-- Rest of your page... -->
```

### 4.2 Add Referral Section (After Hero, Before Process)

```html
<!-- REFERRAL SECTION -->
<section id="referidos" class="referral-section">
    <div class="container">
        <h2>📣 Comparte y Gana</h2>
        <p class="section-subtitle">Ayuda a tu comunidad — y gana tú también</p>
        
        <div class="referral-steps">
            <div class="referral-step">
                <div class="step-number">1</div>
                <div class="step-icon">✅</div>
                <h3>Verifica gratis</h3>
                <p>Comprueba si calificas y recibe tu código</p>
            </div>
            
            <div class="referral-step">
                <div class="step-number">2</div>
                <div class="step-icon">💳</div>
                <h3>Paga €39</h3>
                <p>Activa tu código</p>
            </div>
            
            <div class="referral-step">
                <div class="step-number">3</div>
                <div class="step-icon">🎁</div>
                <h3>Gana €25</h3>
                <p>Por cada amigo que pague</p>
            </div>
        </div>
        
        <div class="referral-summary">
            <div class="summary-row">
                <span>👤 Tu amigo recibe</span>
                <strong>€25 de descuento</strong>
            </div>
            <div class="summary-row">
                <span>💰 Tú recibes</span>
                <strong>€25 de crédito</strong>
            </div>
            <div class="summary-row highlight">
                <span>🎉 12 amigos =</span>
                <strong>¡Servicio GRATIS!</strong>
            </div>
        </div>
        
        <a href="https://t.me/TusPapeles2026Bot" class="btn btn-primary btn-large">
            Obtener mi código →
        </a>
        
        <p class="referral-terms-link">
            <a href="referidos-terminos.html">Ver términos del programa</a>
        </p>
    </div>
</section>
```

### 4.3 Add Footer Link

In your footer, add link to terms:

```html
<footer>
    <div class="footer-links">
        <a href="aviso-legal.html">Aviso Legal</a>
        <a href="privacidad.html">Privacidad</a>
        <a href="referidos-terminos.html">Programa de Referidos</a>
    </div>
</footer>
```

### 4.4 Include referral.js Before Closing Body

```html
    <script src="js/referral.js"></script>
</body>
</html>
```

---

## STEP 5: MODIFY verificar.html

After the success result ("¡Calificas!"), add share CTA:

```html
<!-- In the success result section -->
<div id="result-success" class="result-box success" style="display: none;">
    <div class="result-icon">✅</div>
    <h2>¡Calificas!</h2>
    <p>Cumples los requisitos básicos para la regularización 2026.</p>
    
    <!-- ADD THIS REFERRAL CTA -->
    <div class="share-cta-box">
        <h3>📣 Comparte y gana hasta €299</h3>
        <p>Tu código personal aparecerá cuando inicies en Telegram.</p>
        
        <ul class="share-benefits">
            <li>Tu amigo recibe €25 de descuento</li>
            <li>Tú ganas €25 por cada amigo</li>
            <li>12 amigos = ¡servicio GRATIS!</li>
        </ul>
        
        <a href="https://t.me/TusPapeles2026Bot" class="btn btn-primary btn-large">
            Consigue tus papeles →
        </a>
        
        <p class="terms-note">
            <a href="referidos-terminos.html">Términos del programa</a>
        </p>
    </div>
</div>
```

Also include referral.js:

```html
    <script src="js/referral.js"></script>
</body>
```

---

## STEP 6: ADD CSS STYLES

Add these styles to your CSS file:

```css
/* =============================================================================
   REFERRAL SYSTEM STYLES
   ============================================================================= */

/* Referral Banner */
.referral-banner {
    display: none;
    background: linear-gradient(135deg, #E8D4A8, #D4C094);
    color: #1E3A5F;
    padding: 12px 20px;
    text-align: center;
    font-weight: 500;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.referral-banner.visible {
    display: block;
    animation: bannerSlideDown 0.4s ease;
}

@keyframes bannerSlideDown {
    from { 
        transform: translateY(-100%);
        opacity: 0;
    }
    to { 
        transform: translateY(0);
        opacity: 1;
    }
}

.referral-banner .gift-icon {
    font-size: 1.2em;
    margin-right: 8px;
}

.referral-banner .referrer-name {
    font-weight: 700;
}

/* Referral Section */
.referral-section {
    background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
    padding: 80px 0;
    text-align: center;
}

.referral-section h2 {
    color: #1E3A5F;
    font-size: 2rem;
    margin-bottom: 10px;
}

.referral-section .section-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 40px;
}

/* Referral Steps */
.referral-steps {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin: 40px 0;
    flex-wrap: wrap;
}

.referral-step {
    position: relative;
    max-width: 180px;
    padding: 20px;
}

.referral-step .step-number {
    position: absolute;
    top: 0;
    left: 0;
    width: 28px;
    height: 28px;
    background: #1E3A5F;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.9rem;
}

.referral-step .step-icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.referral-step h3 {
    color: #1E3A5F;
    font-size: 1.1rem;
    margin-bottom: 8px;
}

.referral-step p {
    color: #666;
    font-size: 0.95rem;
    line-height: 1.4;
}

/* Referral Summary Box */
.referral-summary {
    background: white;
    border-radius: 12px;
    padding: 25px 30px;
    max-width: 400px;
    margin: 30px auto;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.referral-summary .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
}

.referral-summary .summary-row:last-child {
    border-bottom: none;
}

.referral-summary .summary-row.highlight {
    background: #f0f7ff;
    margin: 10px -15px -10px;
    padding: 15px;
    border-radius: 8px;
}

.referral-summary .summary-row span {
    color: #666;
}

.referral-summary .summary-row strong {
    color: #1E3A5F;
}

/* Referral Terms Link */
.referral-terms-link {
    margin-top: 25px;
}

.referral-terms-link a {
    color: #666;
    font-size: 0.9rem;
    text-decoration: underline;
}

/* Share CTA Box (verificar.html) */
.share-cta-box {
    background: #f0f7ff;
    border-radius: 12px;
    padding: 25px;
    margin: 25px 0;
    text-align: left;
}

.share-cta-box h3 {
    color: #1E3A5F;
    margin-top: 0;
    margin-bottom: 15px;
}

.share-cta-box .share-benefits {
    margin: 15px 0;
    padding-left: 20px;
}

.share-cta-box .share-benefits li {
    margin-bottom: 8px;
    color: #333;
}

.share-cta-box .terms-note {
    margin-top: 15px;
    font-size: 0.85rem;
}

.share-cta-box .terms-note a {
    color: #666;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .referral-banner {
        padding: 10px 15px;
        font-size: 0.95rem;
    }
    
    .referral-section {
        padding: 50px 20px;
    }
    
    .referral-section h2 {
        font-size: 1.6rem;
    }
    
    .referral-steps {
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }
    
    .referral-step {
        max-width: 250px;
    }
    
    .referral-summary {
        margin: 20px 15px;
        padding: 20px;
    }
    
    .referral-summary .summary-row {
        flex-direction: column;
        text-align: center;
        gap: 5px;
    }
}
```

---

## TESTING CHECKLIST

After implementing:

- [ ] Visit `/r.html?code=MARIA-7K2P` — banner shows, code stored
- [ ] Check localStorage — `tp2026_referral_code` is set
- [ ] Click Telegram button — URL includes `?start=MARIA-7K2P`
- [ ] Visit another page, click Telegram — code still included
- [ ] Clear localStorage, visit normal page — no banner
- [ ] Homepage shows referral section
- [ ] Terms page loads correctly
- [ ] verificar.html shows share CTA on success
- [ ] Mobile: All elements responsive

---

## DEPLOYMENT

1. Create branch: `git checkout -b feature/referral-system`
2. Add all files
3. Test locally (use Live Server or similar)
4. Commit and push
5. Create PR
6. Merge to main
7. GitHub Pages auto-deploys

---

**END OF PROMPT**
