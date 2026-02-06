# TICKER + HERO CTA SPEC — tuspapeles2026.es

**Goal:** User lands → scans for 10-15 seconds → clicks → starts process

---

## PART 1: TICKER (Updated)

### Speed
- **20% faster than default** — full cycle in ~12-15 seconds (was 20)
- Still readable, but creates energy/urgency
- Pause on hover

### Position & Style
- Below header, above hero
- Background: Navy (#1E3A5F)
- Text: White
- Height: 40px desktop, 36px mobile
- Full width, scrolling right to left

### Messages (Longer, More Compelling)

```javascript
const tickerMessages = [
  "🔴 Solo quedan 847 de 1,000 plazas disponibles — cuando se acaben, se acaban",
  "⏰ El plazo cierra el 30 de junio de 2026 — faltan 144 días para preparar tu caso",
  "✅ Esta semana 89 personas han empezado su proceso de regularización con nosotros",
  "💼 Este decreto NO requiere contrato de trabajo — tu situación irregular ya te califica",
  "📱 Todo el proceso es 100% online — sin citas, sin colas, sin ir a ninguna oficina",
  "⚖️ Cada expediente es revisado por abogados colegiados con 25 años de experiencia",
  "💰 El servicio completo cuesta menos de 300 euros — y pagas en fases, no todo de golpe",
  "🏃 Los primeros en presentar su solicitud serán los primeros en recibir respuesta",
  "📅 La última regularización extraordinaria fue en 2005 — hace más de 20 años",
  "🎉 El 80-90% de las solicitudes en 2005 fueron aprobadas — este decreto es aún más flexible",
];
```

### Separator
Use ` ••• ` between messages for visual breathing room

### CSS Speed Adjustment
```css
.ticker-content {
  animation: scroll 12s linear infinite; /* was 15-20s, now 12s = 20% faster */
}
```

---

## PART 2: HERO CTA — Front and Center

### The Problem
Users land, see info, but don't immediately know WHERE to click to start.

### The Solution
**Two massive, unmissable buttons side by side:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                    Regulariza tu situación en España                        │
│                                                                             │
│          Verifica si calificas en 2 minutos. Gratis. Sin compromiso.        │
│                                                                             │
│    ┌─────────────────────────────┐    ┌─────────────────────────────┐      │
│    │                             │    │                             │      │
│    │   [Telegram Logo]           │    │   [Globe/Web Icon]          │      │
│    │                             │    │                             │      │
│    │   Empezar en Telegram       │    │   Empezar en la Web         │      │
│    │                             │    │                             │      │
│    │   Bot disponible 24/7       │    │   Continúa aquí mismo       │      │
│    │                             │    │                             │      │
│    └─────────────────────────────┘    └─────────────────────────────┘      │
│                                                                             │
│                     ¿Cómo funciona? ↓ (scroll link)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Button Specifications

**Button 1: Telegram**
- Real Telegram logo (SVG): https://telegram.org/img/t_logo.svg or use official brand assets
- Background: Telegram blue (#0088cc) or keep brand navy
- Text: "Empezar en Telegram"
- Subtext: "Bot disponible 24/7"
- Link: https://t.me/tuspapeles2026_bot (or actual bot username)
- Opens in new tab

**Button 2: Web**
- Icon: Globe, browser window, or arrow-right
- Background: Gold (#E8D4A8) with navy text
- Text: "Empezar en la Web"
- Subtext: "Continúa aquí mismo"
- Link: /verificar (eligibility check page on same site)
- Same tab navigation

### Button Styling
```css
.cta-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 48px;
  border-radius: 12px;
  min-width: 280px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.cta-button .icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
}

.cta-button .subtext {
  font-size: 14px;
  font-weight: 400;
  opacity: 0.8;
  margin-top: 4px;
}
```

### Mobile Layout
- Stack buttons vertically
- Full width
- Telegram first, Web second
- Same prominence

---

## PART 3: TELEGRAM LOGO

**DO NOT use fake/approximation logos.**

### Official Telegram Logo Sources:
1. **Official brand page:** https://telegram.org/tour/screenshots
2. **Direct SVG:** 
```html
<!-- Telegram official logo SVG -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <defs>
    <linearGradient id="a" x1="0.667" x2="0.417" y1="0.167" y2="0.75">
      <stop offset="0" stop-color="#37aee2"/>
      <stop offset="1" stop-color="#1e96c8"/>
    </linearGradient>
  </defs>
  <circle cx="120" cy="120" r="120" fill="url(#a)"/>
  <path fill="#fff" d="M98 175c-3.9 0-3.2-1.5-4.6-5.2L82 132.2 152.8 88l8.3 2.2-6.9 18.8L98 175z"/>
  <path fill="#d2e5f1" d="M98 175c3 0 4.3-1.4 6-3l16-15.6-20-12L98 175z"/>
  <path fill="#fff" d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1l19.7-92.8c2-8.1-3.1-11.7-8.4-9.3L51 108.5c-7.9 3.2-7.8 7.6-1.4 9.5l29.7 9.3L152 83c3.2-2 6.2-.9 3.8 1.3L100 144.4z"/>
</svg>
```

3. **Or download from:** https://telegram.org/img/t_logo.svg

### Usage
- Use the official circular logo with the paper airplane
- Minimum size: 32px (buttons), 48px preferred for hero CTAs
- Don't modify colors or proportions

---

## PART 4: VISUAL HIERARCHY (10-15 Second Scan)

User eye flow should be:

```
1. TICKER (movement catches eye, urgency registered)
         ↓
2. HEADLINE ("Regulariza tu situación")
         ↓
3. SUBHEADLINE ("2 minutos, gratis")
         ↓
4. TWO BIG BUTTONS (Telegram | Web)
         ↓
5. CLICK
```

### What to REMOVE or DE-EMPHASIZE:
- Long explanatory text (move below fold)
- Multiple navigation options
- Competing CTAs
- Anything that isn't "understand → click → start"

### Above the Fold = ONLY:
1. Header (logo + minimal nav)
2. Ticker
3. Headline + subheadline
4. Two CTA buttons
5. Maybe "¿Cómo funciona? ↓" subtle scroll prompt

Everything else (process steps, pricing, FAQ, testimonials) goes BELOW.

---

## PART 5: FULL HERO CODE STRUCTURE

```jsx
<section className="hero">
  {/* Ticker */}
  <Ticker messages={tickerMessages} speed="fast" />
  
  {/* Hero Content */}
  <div className="hero-content">
    <h1>Regulariza tu situación en España</h1>
    <p className="subheadline">
      Verifica si calificas en 2 minutos. Gratis. Sin compromiso.
    </p>
    
    {/* CTA Buttons */}
    <div className="cta-container">
      <a href="https://t.me/tuspapeles2026_bot" target="_blank" className="cta-button telegram">
        <TelegramLogo className="icon" />
        <span className="main-text">Empezar en Telegram</span>
        <span className="subtext">Bot disponible 24/7</span>
      </a>
      
      <a href="/verificar" className="cta-button web">
        <GlobeIcon className="icon" />
        <span className="main-text">Empezar en la Web</span>
        <span className="subtext">Continúa aquí mismo</span>
      </a>
    </div>
    
    {/* Scroll prompt */}
    <a href="#como-funciona" className="scroll-prompt">
      ¿Cómo funciona? ↓
    </a>
  </div>
</section>
```

---

## Summary for Claude Code

Build/update tuspapeles2026.es hero:

1. **Ticker:** Longer messages (see list above), 20% faster (12s cycle), navy bg
2. **Hero:** Clean, minimal — headline + subheadline + 2 buttons only
3. **CTA Buttons:** Side by side, equal prominence
   - Telegram (real logo from telegram.org, blue or navy) → bot link
   - Web (globe icon, gold) → /verificar
4. **Remove/move:** Any content that distracts from the 2 buttons
5. **Mobile:** Stack buttons vertically, full width
6. **Goal:** 10-15 second scan → click → start

Push to main.
