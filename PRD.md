PRD — BookNest AI (One-Page Relaunch, Template-Based)
0) Non-negotiables

Start from the existing template in the workspace folder full/. Do not scaffold anything new.

Follow the Taskmaster tasks in order. Stop after each task and wait for me to say “continue.”

No vendor names anywhere (copy, code, comments, alt text, meta, filenames): Retell, Retell AI, ElevenLabs, 11labs, Eleven Labs.

Exclude the ROI calculator.

1) Goal

Transform the multi-page HTML template (in full/) into a single-page, professional marketing site with a sticky header that scrolls to sections. Keep it calm, trustworthy, and “real”—not vibe-coded.

2) Source Template Usage

Use the structure, components, and assets from full/.

Consolidate into:

index.html (all sections),

assets/css/main.css,

assets/js/main.js,

assets/img/* (only what’s used).

Remove leftover pages, demo sections, carousels, and stock filler not used in the one-page layout.

3) Brand & Visual (anti vibe-coded)

Palette: Pine #0E7C66, Mint #BFE3D0, Stone #E8ECEB, Charcoal #1E2528, White #FFFFFF.

Type: Use template’s font system; if absent, Inter (700 headings, 400/500 body).

Tone: Calm, modern, minimal; no neon gradients, glassmorphism, floating blobs, or playful emoji UI.

Imagery: Service context (front desk, scheduling, spa/clinic) over abstract shapes.

4) Information Architecture (single page, header anchors)

Hero — headline, subheadline, CTAs

What It Does (Big Wins) — 3–5 benefit cards

Capabilities — grouped, collapsible (see §5)

How It Works — 3 steps: Connect → Configure → Go Live

Solutions by Industry — default “Med/Wellness Spa”; optional tabs/cards for Real Estate, Clinics

Pricing — simple ranges (no calculator)

Security & Compliance — concise bullets

FAQs — 6–8 questions, collapsible

Contact & Demo — form + calendar embed

Footer — minimal legal/contact

5) Consolidated Capabilities (generic, no brands)

Call Handling

24/7 answering with natural turn-taking and interruption handling

Intelligent routing by caller intent + warm transfer with full context

Concurrent calls, queues/hold management

Call recording & transcription with searchable summaries

Appointments & Scheduling

Real-time availability checks; book/reschedule/cancel

Time-zone aware; recurring appointments; confirmations & reminders (email/SMS)

No-show handling support; optional payment workflows

Customer Service

Dynamic FAQ from your knowledge base

Company info (hours, services, locations)

Account lookups, simple transactions, complaint handling with appropriate tone

Maintains context across topics; first-call resolution for common issues

Business Integrations

CRM & helpdesk (e.g., Salesforce/HubSpot/Zendesk/Zoho/GHL/Pipedrive)

Automatic lead creation, call logging, and conversation summaries

Workflow automation (e.g., Zapier/Make), Google Workspace, Teams messages

Communication

30+ languages with auto-detection

Real-time transcription; SMS/email follow-ups; multi-channel (voice/SMS/chat)

Custom greetings/hold messages; optional branded voice personas

Advanced & Governance

Secure by default; encryption in transit/at rest; role-based access

Healthcare-ready configurations (HIPAA-style workflows), SOC-2-aligned practices

Webhooks & API access; analytics & quality monitoring

High availability and multi-region deployments

On the website, present short summaries with expandable details to avoid overwhelming visitors.

6) Copy (drop-in starters)

Hero

H1: Never Miss a Call. Book More Appointments.

Sub: BookNest AI answers every call, books and manages appointments, and hands off to your team when needed—so your front desk never overloads.

CTAs: Book a Demo (primary) • Hear a Sample Call (secondary)

Big Wins

Capture every opportunity 24/7

Fill your calendar automatically

Hassle-free handoffs to humans

Works with your tools in minutes

Secure & compliant from day one

How It Works

Connect your calendar & tools → 2) Configure greeting & FAQs → 3) Go live and start converting calls

Pricing (example, editable)

Launch: $2,000 one-time setup

Plans from $500–$2,000/mo based on call volume & integrations

Includes analytics, summaries, and calendar management

Security

Encryption at rest/in transit, RBAC, audit logs; you own your data

Healthcare-ready configurations available for eligible customers

FAQ seeds

How fast can we go live? Often within a day after intake.

Does this replace our team? No—it handles volume and triage; warm-transfers when needed.

Will it work with our tools? Most major CRMs, helpdesks, and calendars.

7) Interactions & Motion

On-scroll reveal: fade + 8px translate-up (≈260ms ease-out; threshold 0.15; once)

Buttons/cards: hover scale 1.01, press 0.99; subtle shadow shift; 180ms ease

Smooth-scroll anchors with offset + scrollspy

Respect prefers-reduced-motion (disable transforms/animations)

8) Technical

Minify & compress assets; lazy-load below the fold

Forms: POST /api/lead (placeholder), client validation + honeypot

Analytics: one lightweight tool (or none if not configured)

Lighthouse targets: Perf ≥90, A11y ≥95, Best Practices ≥95, SEO ≥90

Axe: no critical issues

9) Compliance & Guardrails

Forbidden terms scan in CI (see Taskmaster)

No vendor logos, names, or hints in code/comments/assets/alt/meta

10) Acceptance Criteria (site)

All sections present; header anchors work; no ROI calculator

Motion implemented + reduced-motion honored

Forbidden terms = 0 hits

A11y & Lighthouse thresholds met