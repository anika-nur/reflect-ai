# Reflect — A Socratic AI That Asks, Never Answers

> *"Reflect doesn't want to be the person you talk to — it wants to be the reason you finally do."*

**Reflect** is an AI-powered self-reflection tool designed for young Filipinos (ages 18–24). Unlike mental health chatbots that give advice, diagnose, or reassure, Reflect responds with exactly one thoughtful question — built from the user's own words — to help them understand themselves more clearly and reach the real people in their lives.

Built by **Team Clover** during the Equitech Futures Institute Fellowship 2026

---

## Table of Contents

- [The Problem](#the-problem)
- [Our Solution](#our-solution)
- [Technical Architecture](#technical-architecture)
- [Key Features](#key-features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Validation](#validation)
- [Team](#team)
- [Acknowledgments](#acknowledgments)

---

## The Problem

Young Filipinos are increasingly turning to AI for emotional support — 29% use AI for mental wellness, higher than the global average of 21% (AXA Philippines, 2026). But the system they need can't support them:

- **1:100,000** mental health professional-to-population ratio (DOH, 2022)
- **1:14,000** guidance counselor-to-student ratio (Lacson et al., 2024)
- **97.5%** of surveyed Filipino youth wished they understood themselves better

Cultural barriers — *hiya* (shame), mental health stigma, fear of burdening others — prevent help-seeking even when support exists. Yet 67.5% of young adults explicitly said they still want human intervention. The desire for connection hasn't disappeared; the system simply can't support it.

**No tool acts as a silent mentor to guide the early stage of private reflection and self-discovery.** That's the gap Reflect fills.

---

## Our Solution

Reflect is a Socratic self-reflection tool. You open it, share whatever's on your mind — messy, short, in Taglish, whatever feels natural — and it replies with one thoughtful question built on your own words.

**What Reflect does NOT do:**
- ❌ Give advice, suggestions, or solutions
- ❌ Diagnose or label mental states
- ❌ Reassure with empty phrases
- ❌ Replace a therapist or counselor

**What Reflect DOES do:**
- ✅ Ask one question at a time, grounded in the user's exact words
- ✅ Match Taglish, Tagalog, and English naturally — never forcing a language
- ✅ Help users notice the people around them they could reach out to
- ✅ Stop asking and connect to crisis support when distress is detected

---

## Technical Architecture

Reflect uses a **two-model architecture** — this is the core technical differentiator:

```
User Message → Safety Gate → Question Engine → Checker → User Sees It
                   │                │                │
                   │                │                └── 2nd AI verifies:
                   │                │                    is it a question?
                   │                │                    not advice?
                   │                │                    not a diagnosis?
                   │                │
                   │                └── 1st AI drafts one question
                   │                    from the user's actual words
                   │
                   └── Checks for crisis signals
                       (keyword + AI detection)
                       If triggered → safety response
                       (counselor referral + crisis hotline)
```

**Why two models?** A single AI will occasionally slip — give a suggestion disguised as a question, offer an opinion, or diagnose. The checker enforces the "never gives answers" promise architecturally, not just through prompting. Up to 3 retry attempts are made if the checker rejects a draft.

### Engine Prompt Design

The question engine follows specific rules validated by mental health practitioners:
- **Echoing**: Uses the user's own words and language back at them
- **Concrete over abstract**: Asks about specific moments, choices, and feelings — not vague "how do you feel?"
- **Non-leading**: Never hints at a "right" answer
- **Pacing**: Matches the user's depth — never goes deeper than they have
- **Human-in-the-loop**: Gently nudges users toward real people they could lean on

### Safety Layer

Two-tier crisis detection:
1. **Local keyword matching** — instant, no API call needed. Catches explicit crisis language in English and Tagalog.
2. **Checker safety flag** — the AI checker evaluates subtle distress signals the keyword list misses.

When triggered, Reflect:
- Stops asking questions entirely
- Acknowledges what the person is carrying
- Provides NCMH Crisis Hotline (1553, toll-free, 24/7) and counselor contacts
- Invites the user to return whenever ready

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Conversational AI** | One question at a time, echoing your Taglish/Tagalog/English naturally |
| **Cross-Day Memory** | Tracks recurring themes across sessions; future conversations build on them |
| **Monthly Reflection** | Surfaces the words and themes you kept returning to — no scores, no AI interpretation |
| **Crisis Response** | Stops questioning and connects to counselors + NCMH crisis hotline when distress detected |
| **Transcript Download** | Raw, dated reflections (zero AI interpretation) to bring to a counselor |

---

## Demo

### Live Prototype
The working prototype is deployed as a [Claude Artifact](https://claude.ai/public/artifacts/8f0ccf60-fd48-43ff-ab90-c4f25e8f20ee). It runs the real two-model AI engine in real time — not scripted responses.

### Interactive Pitch Deck
The full pitch deck is hosted at **[reflect-ai-cyan-five.vercel.app](https://reflect-ai-cyan-five.vercel.app/)** with keyboard/swipe navigation and an embedded demo video.

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

## Getting Started

### Running the Prototype Locally

The prototype is designed to run as a Claude Artifact (React sandbox environment). To use it:

1. Copy the contents of `demo/ReflectPrototype.jsx`
2. Paste into a Claude conversation as an artifact (or any React sandbox that supports the Anthropic API)
3. The prototype will call the Anthropic API for live AI responses

> **Note:** The prototype requires access to the Anthropic API. In the Claude Artifact environment, this is handled automatically. For standalone deployment, you would need to add API key management and a backend proxy.
---

## Validation

### Expert Validation
- **5 in-depth Philippine counselor consultations** — integrated insights for safety protocols and youth conversational tone (Taglish)
- **Hannah Be Sibugan**, Mental Health Social Worker: *"Having a way to process how you feel before you talk to someone makes all the difference."*
- **Den Morales**, Registered Guidance Counselor: *"If a student brings in a Reflect summary, we can immediately focus on case conceptualization and CBT reframing."*

### User Validation
- **n = 79** youth user responses gathered across 3 countries
- **97.5%** wished they understood themselves better
- **91%** intent to access upon release
- **59.5%** prefer to manage wellness struggles on their own before seeking help

### Institutional Interest
- **3 Higher Education Institutions** expressed interest in adopting Reflect pilot trials

### Competitive Analysis
- Benchmarked against **20 apps** and **250k+ Google Play reviews**
- Key finding: 262 Wysa + 49 Woebot reviews call the apps "generic" or "robotic" — the top complaint neither has fixed. Reflect's echoing architecture directly addresses this.

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
