# tuspapeles2026 — Project Context

## WHAT THIS IS
Legal service helping undocumented immigrants navigate Spain's 2026 extraordinary regularization process. Backed by Pombo & Horowitz law firm.

## NARRATIVE
This started as a news site tracking the regularization decree. People asked us to help them apply. So we built a service. The site reflects this: information FIRST, service as natural extension.

## CURRENT STATUS
- Pre-launch waitlist phase
- NO payments until BOE publishes (expected late Feb/March 2026)
- Solicitations open April 1 - June 30, 2026

## PRICING (FINAL)
| Phase | Price | Deliverable |
|-------|-------|-------------|
| Phase 1 | FREE | Eligibility + upload docs |
| Phase 2 | €29 | Evaluación (case overview, probability) |
| Phase 3 | €89 | Expediente (forms, docs organized, NO memoria) |
| Phase 4 | €129 | Memoria legal + presentación + seguimiento + recurso |
| **Total phased** | **€247** | |
| **Upfront** | **€199** | Same service, €48 savings |

NO payments accepted until BOE publishes.

## REFERRAL SYSTEM (Cónsul/Embajador)

### Definitions
- "Complete Phase 1" = Pay Phase 2 (€29), since Phase 1 is free

### Cónsul Status
- Requirement: 3 friends pay Phase 2 + YOU paid in full
- Benefits: Priority processing, urgent requerimiento response, extra doc review, direct WhatsApp

### Embajador Status
- Requirement: 10 friends pay Phase 2 OR 5 friends pay full + YOU paid in full
- Benefits: All Cónsul + dedicated case manager, website feature, certificate, lifetime discount

### Friend Benefit
- €25 off Phase 4 (everyone referred gets this)

### Rules
- NO cash credits
- Status locked until referrer pays in full
- €199 upfront = instant Cónsul (service perks only, no early access since payments open for all simultaneously)

## WAITLIST COUNTER
- Base: 3,127
- Grows 2-8 per hour (seeded random)
- Show exact number, not "más de"

## TONE
Professional law firm voice. Not sales-y. Minimal emojis in buttons. Trust through competence.

## SITE STRUCTURE (target order)
1. Ticker (news)
2. Header
3. Hero (dual: info + service)
4. Trust strip
5. News/Updates (moved UP)
6. Requirements
7. Documents (moved UP)
8. THE PIVOT ("Miles nos pidieron ayuda")
9. Process (4 phases)
10. Pricing
11. Why Us
12. Programa Diplomático (Cónsul/Embajador)
13. Embajadores (placeholder cards)
14. Verify CTA
15. FAQ
16. Final CTA
17. Footer

## KEY MESSAGES
- "No cobramos hasta que el proceso sea oficial"
- "Información + Servicio"
- "Seguimos cada novedad desde el día uno"

## DO NOT
- Use old pricing (€297, €299, €336, €39+€150+€110)
- Reference €25 cash credits
- Use "Auditoría" (use "Evaluación")
- Use excessive emojis in buttons
- Promise specific approval rates as guarantees


# Claude Code Instructions

## Git Workflow
- Always push directly to main branch
- Never create feature branches
- Never create pull requests
- Never ask for confirmation before pushing
- After changes, run: git add -A && git commit -m "description" && git push origin main

## Deployment
- PH-Bot: Railway auto-deploys from main
- Websites: GitHub Pages auto-deploys from main
```

---

## Do This Now

**For PH-Bot:**
1. Go to GitHub → PH-Bot
2. Click "Add file" → "Create new file"
3. Name it `CLAUDE.md`
4. Paste the content above
5. Commit directly to main

**Repeat for:**
- tus-papeles-2026
- PH-Site

---

## Then in Claude Code Sessions

Start with:
```
Read CLAUDE.md for git workflow rules. Push all changes directly to main.
