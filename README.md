# Reflect — A Socratic AI That Asks, Never Answers

> *"Reflect doesn't want to be the person you talk to — it wants to be the reason you finally do."*

**Reflect** is an AI-powered self-reflection tool designed for young Filipinos (ages 18–24). Unlike mental health chatbots that give advice, diagnose, or reassure, Reflect responds with exactly one thoughtful question — built from the user's own words — to help them understand themselves more clearly and reach the real people in their lives.

This tool is developed by me, but it is built on a concept developed collaboratively by Team Clover during the Equitech Futures Institute Fellowship 2026. 

---

## Demo

### Interactive Pitch Deck
The full pitch deck is hosted at **[reflect-ai-cyan-five.vercel.app](https://reflect-ai-cyan-five.vercel.app/)** with keyboard/swipe navigation and an embedded demo video.

### Live Prototype
The working prototype is deployed as a [Claude Artifact](https://claude.ai/public/artifacts/8f0ccf60-fd48-43ff-ab90-c4f25e8f20ee). It runs the real two-model AI engine in real time — not scripted responses.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React (JSX), inline CSS |
| **AI Engine** | Anthropic Claude API (claude-sonnet-4-6) |
| **Architecture** | Two-model system: engine + checker |
| **Deployment (Prototype)** | Claude Artifacts |
| **Deployment (Pitch Deck)** | Vercel (static HTML) |
| **Design** | Custom Filipino-inspired visual language |

---

## Team

**Team Clover** — An interdisciplinary team of Equitech Futures scholars from 5 countries.

| Member | Role | Background |
|--------|------|-----------|
| **Ziyi Aduana** | Research & Execution Lead | UPLB · Applied Economics · Rise Global Fellow 2024 |
| **Azeem Khan** | Product & Storytelling Lead | Yokohama National University · Urban Sciences |
| **Cristian Varela** | Business & Policy Lead | URI · Systems Engineering |
| **Nur Anika** | AI Architecture & Engineering | Colby College · CS & Neuroscience |
| **Aswathi Thummarukudy** | Research, Engineering & Ops | VJCET · Computer Science |

---

## Acknowledgments

- **Hannah Be Sibugan** — Mental Health Social Worker, Municipality of San Jose, Philippines
- **Den Morales** — Registered Guidance Counselor, Labas SHS Philippines
- **Marianne Aragon** — Student, University of the Philippines Los Baños
- **Equitech Futures** — For the platform and fellowship
- **Kevin Xu Innovation Challenge 2026** — For the opportunity to build and pitch this
- **Anthropic** — For the Claude API powering the engine and checker

---

## Status

This is a **working prototype**. It demonstrates the core two-model architecture, safety layer, and Filipino cultural grounding. It is not yet a production product — persistent backend, authentication, real cross-day memory, and clinical review are on the roadmap.
