# Reflect 🌿

> **Every other tool tells young people what they feel. Reflect helps them find out for themselves.**

**Reflect** is an AI-powered self-reflection tool designed primarily for young Filipinos. Instead of giving advice, diagnoses, interpretations, or answers, Reflect responds to what a user shares with **one thoughtful question built from the user's own words**.

The goal is deliberately simple:

> **Help people understand themselves more clearly.**

Reflect is not designed to maximize engagement, keep users talking to an AI, or replace human support. It is designed to act as a **mirror**—helping users slow down, notice what they are saying, and arrive at their own understanding.

---

## 🔗 Live Demo

**Try Reflect:**  
https://reflect-ai-cyan-five.vercel.app/

---

## 📖 Table of Contents

- [About Reflect](#-about-reflect)
- [The Problem](#-the-problem)
- [Our Approach](#-our-approach)
- [Core Principles](#-core-principles)
- [Key Features](#-key-features)
- [How Reflect Works](#-how-reflect-works)
- [AI Architecture](#-ai-architecture)
- [Safety Architecture](#-safety-architecture)
- [Memory and Reflection](#-memory-and-reflection)
- [Technology](#-technology)
- [Design Philosophy](#-design-philosophy)
- [Project Status](#-project-status)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Limitations](#-limitations)
- [Roadmap](#-roadmap)
- [Responsible Use](#-responsible-use)
- [Privacy and Youth Safety](#-privacy-and-youth-safety)
- [Why Reflect Is Different](#-why-reflect-is-different)
- [Research and Expert Validation](#-research-and-expert-validation)
- [Project Background](#-project-background)
- [Team](#-team)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌱 About Reflect

Reflect is a conversational self-reflection experience for young people who may have thoughts, feelings, or situations they are struggling to make sense of.

A user might write:

> “I don't know. School has been exhausting and I'm annoyed at everyone lately but I also feel bad because maybe I'm the problem lol.”

Most AI assistants would try to explain the user's emotions, provide advice, suggest coping strategies, or classify what they are experiencing.

Reflect intentionally does something different.

It identifies the most meaningful thread in what the user said and asks **one carefully constructed question** that helps the user explore it further.

For example:

> “When you say you feel like you might be ‘the problem,’ what happened that made that thought show up?”

Reflect does not determine what the user feels.

It helps the user investigate what they feel themselves.

---

## 🎯 The Problem

Young people increasingly turn to AI when they are confused, overwhelmed, lonely, or trying to understand what they are experiencing.

Traditional conversational AI systems often respond by:

- explaining what the user may be feeling;
- giving advice;
- suggesting solutions;
- assigning emotional labels;
- interpreting patterns;
- offering psychological frameworks;
- or encouraging continued conversation.

These responses can feel helpful, but they also introduce a fundamental problem:

**the AI becomes the interpreter of the user's inner life.**

Reflect explores a different model.

Instead of:

```text
User → AI interpretation → answer
```

Reflect aims for:

```text
User → thoughtful question → self-understanding
```

The AI facilitates reflection without claiming authority over what the user's experience means.

---

## 🪞 Our Approach

The central product principle is:

### **The mirror is the product.**

Reflect does not treat questioning as a preliminary step before advice.

The questioning itself **is the intervention**.

Every response is designed to help the user:

1. slow down;
2. notice their own language;
3. examine something they already said;
4. move from abstraction toward something concrete;
5. identify what matters to them;
6. and reach their own understanding.

Success is therefore not measured by:

- number of messages;
- time spent in the application;
- daily streaks;
- emotional scores;
- or user dependence.

Success means:

> **The user understands themselves more clearly than they did before.**

---

## 🧭 Core Principles

Several non-negotiable principles guide Reflect's product and technical decisions.

### 1. No answers, only questions

Reflect should never become an advice engine disguised as a reflection tool.

It should not tell users:

- what they feel;
- what they should do;
- what their experience means;
- whether they have a condition;
- or which decision is correct.

### 2. The user's language matters

Reflect preserves the user's own words whenever possible.

If someone describes an experience using:

- Filipino expressions;
- Tagalog;
- Taglish;
- slang;
- humor;
- culturally specific language;
- or their own unusual phrasing,

Reflect should not automatically translate that language into clinical terminology.

The user's words are treated as meaningful data rather than something the AI needs to “correct.”

### 3. Safety comes before reflection

Safety classification occurs **before** the normal reflection engine.

If the user appears to be in genuine danger or severe distress, Reflect stops behaving like a reflective questioning tool and instead prioritizes connection with real human support.

### 4. Reflect is not therapy

Reflect is deliberately positioned as:

- a self-reflection tool;
- not a therapist;
- not a diagnostic system;
- not a treatment platform;
- and not a substitute for professional mental-health care.

### 5. Reflect should turn people toward people

The purpose of the system is not to become the user's primary emotional relationship.

When appropriate, Reflect gently helps users notice real people in their lives whom they may be able to talk to.

> **Reflect doesn't want to be the person you talk to. It wants to be the reason you finally do.**

---

## ✨ Key Features

### 1. One Question at a Time

Reflect responds with a single focused question rather than overwhelming the user with explanations, bullet lists, multiple prompts, advice, or lengthy AI responses.

### 2. Questions Built From the User's Own Words

Reflect tries to reference the actual language the user used rather than replacing it with clinical or interpretive labels.

### 3. Tagalog and Taglish Awareness

Reflect is designed for Filipino youth and supports conversations containing English, Tagalog, Taglish, culturally specific expressions, and mixed-language phrasing.

### 4. Adaptive Questioning

Reflect adapts when users send long multi-topic messages, respond with “idk,” use humor, describe emotions abstractly, ask for advice, ask for a diagnosis, or arrive at an insight themselves.

### 5. Finds the Heaviest Thread

Rather than asking about everything at once, Reflect attempts to identify the thread carrying the most emotional or reflective weight and asks about that.

### 6. Makes Abstract Feelings Concrete

When a user describes something abstractly, Reflect may ask what that experience actually looks like in real life.

### 7. Handles Minimal Responses Gently

If a user replies with something like “idk,” Reflect reduces the cognitive burden of the next question rather than forcing a detailed response.

### 8. Preserves Humor

Reflect attempts to acknowledge humor without ignoring the underlying issue or stripping away the user's personality.

### 9. Recognizes Insight Without Interpreting It

When a user reaches an important realization, Reflect may briefly acknowledge it without immediately explaining the insight back to them.

### 10. Refuses Advice and Diagnosis

If a user asks “Just tell me what to do” or “Am I depressed?”, Reflect does not provide a verdict. Instead, it gently returns the focus to the user's own experience.

### 11. Cross-Day Memory

The intended product architecture allows Reflect to remember themes the user repeatedly returns to across sessions through a rolling summary.

> **Current demo note:** Persistent cross-day memory may be simulated rather than fully implemented in the demonstration version.

### 12. Reflection History

Users can revisit dated conversations as question-and-answer pairs.

### 13. Word-Based Check-In Calendar

Instead of mood scores or emotional ratings, Reflect can associate a day with a word that stood out from the user's own reflection.

### 14. Month-End Reflection

At the end of a month, Reflect can assemble a reflection using the user's own language rather than AI-generated interpretation.

### 15. Downloadable Reflection Record

Users can export dated records of their reflections to revisit or share with a counselor, therapist, school support professional, trusted adult, or another person they trust.

---

## ⚙️ How Reflect Works

```text
User writes a message
        │
        ▼
Safety Gate
        │
        ├── High-risk / crisis signal
        │          │
        │          ▼
        │    Human-support response
        │
        ▼
Reflection Engine
        │
        ▼
Candidate Question
        │
        ▼
Question Checker
        │
        ├── FAIL ──► Regenerate
        │
        ▼
       PASS
        │
        ▼
One Question Shown to User
```

---

## 🤖 AI Architecture

Reflect uses a **two-model architecture** to make its central promise more reliable.

### Model 1 — Reflection Engine

The first model generates a candidate reflective question based on the user's current message, conversational context, relevant memory, wording, tone, and situation.

### Model 2 — Question Checker

A second model reviews the candidate question before it is displayed.

The checker rejects outputs that contain advice, diagnosis, interpretation, labeling, leading questions, hidden recommendations, unsupported assumptions, overly therapeutic language, or multiple questions disguised as one.

If the question fails, the system regenerates it up to a limited number of attempts before using a safe fallback.

> **“No answers, only questions” is intended to be enforced structurally—not merely requested in a prompt.**

---

## 🛟 Safety Architecture

Safety is separate from the normal reflection engine.

Every message should pass through a safety layer before reflective questioning begins.

### Layer 1 — Keyword / Pattern Detection

Fast detection of potentially high-risk phrases or signals.

### Layer 2 — AI Safety Classifier

A contextual model determines whether the message suggests meaningful risk requiring a different response.

### Layer 3 — Safety Response

When genuine danger or severe distress is detected, Reflect stops asking ordinary reflective questions and instead prioritizes human support.

For the Philippines, the prototype references the **NCMH crisis hotline 1553**.

> **Important:** Any crisis contacts displayed in a prototype or demo must be independently verified before real-world deployment.

---

## 🧠 Memory and Reflection

Long-term memory is intended to work through a **rolling summary architecture**.

After a session, relevant context can be condensed into a short representation containing recurring themes, important phrases, topics repeatedly revisited, unresolved questions, and recent context.

This avoids indefinitely passing the user's entire historical conversation into every AI request.

---

## 🛠 Technology

### Frontend

- React
- Potential migration to React Native for a native mobile experience

### Backend

A managed backend such as Supabase for authentication, SQL storage, secure backend operations, and protected secret/API-key storage.

### AI

An LLM provider such as Anthropic or another equivalent model API.

The architecture may use separate model calls for:

1. reflection-question generation;
2. question validation;
3. safety classification;
4. conversation summarization.

### Hosting

- Vercel

**Live application:**  
https://reflect-ai-cyan-five.vercel.app/

---

## 🗄️ Conceptual Data Model

### `users`

```text
id
created_at
profile/preferences
consent metadata
```

### `entries`

```text
id
user_id
date
user_text
reflect_question
created_at
```

### `memory`

```text
user_id
rolling_summary
recurring_themes
updated_at
```

A production implementation should additionally consider encryption, deletion requests, consent history, access auditing, age-related safeguards, data retention policies, and country-specific privacy requirements.

---

## 🎨 Design Philosophy

Reflect's visual identity is intended to feel quiet, warm, grounded, culturally aware, non-clinical, and emotionally spacious.

The prototype explores a Filipino-grounded visual system including sage/teal tones, sampaguita-inspired elements, banig-inspired texture, subtle motion, and minimal conversational UI.

---

## 📍 Project Status

Reflect is currently a **prototype / working demonstration**, not a production mental-health platform.

The current work includes:

- an interactive React-based demonstration;
- live AI-powered reflection behavior;
- engine and checker prompts;
- English / Taglish conversational behavior;
- safety-response behavior;
- history views;
- question-and-answer reflection records;
- word-based calendar concepts;
- transcript export;
- architecture planning;
- prompt-engineering documentation;
- expert feedback.

Some functionality represented in the product design—particularly persistent cross-session memory—is not yet fully backed by production infrastructure.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/reflect-ai.git
cd reflect-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

### 4. Start the development server

```bash
npm run dev
```

> Update these instructions if the final project uses a different package manager or framework configuration.

---

## 🔐 Environment Variables

A production implementation may require variables such as:

```env
AI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

> Never expose AI API keys or privileged backend credentials in client-side code.

---

## 🧪 Testing

Because Reflect's behavior depends heavily on language-model output, conventional unit testing alone is insufficient.

The project should also include **behavioral and adversarial prompt testing** for:

- advice requests;
- diagnosis requests;
- minimal responses such as “idk”;
- humor as deflection;
- multi-topic messages;
- advice hidden inside a question;
- leading interpretations;
- culturally specific language;
- safety-trigger edge cases.

---

## ⚠️ Limitations

Reflect remains experimental.

Current limitations include:

- AI outputs can still behave unpredictably;
- prompt-based safeguards are imperfect;
- model classifiers can produce false positives or false negatives;
- long-term memory requires careful privacy design;
- Filipino language and cultural behavior require native review;
- the current prototype is not clinically validated;
- counselor and crisis resources must be professionally verified;
- youth-data requirements differ across jurisdictions;
- AI providers and API behavior may change;
- the effectiveness of AI-mediated self-reflection requires further research.

---

## 🗺️ Roadmap

### Near-Term

- [ ] Harden the reflection engine prompt
- [ ] Harden the checker prompt
- [ ] Build an adversarial conversation test suite
- [ ] Conduct native Taglish review
- [ ] Improve conversational edge-case handling
- [ ] Refine safety classifications
- [ ] Improve mobile responsiveness

### Production MVP

- [ ] Add persistent authentication
- [ ] Build production database
- [ ] Implement real cross-session memory
- [ ] Add secure server-side AI requests
- [ ] Add structured entry/history storage
- [ ] Build transcript export
- [ ] Build month-end reflection generation
- [ ] Implement validated crisis-resource routing
- [ ] Add account and data deletion controls
- [ ] Add consent and privacy flows

### Research / Evaluation

- [ ] Define meaningful self-reflection outcomes
- [ ] Explore validated self-reflection instruments
- [ ] Measure whether Reflect improves clarity without increasing rumination
- [ ] Measure AI dependence
- [ ] Study how users understand an AI that refuses to provide answers
- [ ] Investigate whether users over-attribute understanding or authority to the system

### Longer-Term Possibilities

- deeper cultural adaptation;
- additional countries and languages;
- professionally reviewed counselor integration;
- improved reflection archives;
- carefully designed tools for sharing user-authored records with trusted humans.

---

## 🚫 What Reflect Deliberately Does Not Do

Reflect does not currently aim to provide:

- mood scores;
- emotional graphs;
- daily streak systems;
- push-notification engagement loops;
- open-ended AI journaling;
- AI-generated personality insights;
- AI psychological interpretation;
- goal-setting systems;
- action plans;
- therapy frameworks;
- automated diagnoses;
- clinical risk dashboards;
- therapist caseload management.

These exclusions are part of the product philosophy.

> **A mirror, not a judge. A question, not an answer.**

---

## 🧑‍⚕️ Responsible Use

Reflect is **not a medical device, therapist, crisis counselor, diagnostic system, or treatment service**.

It should never be represented as capable of diagnosing or treating mental-health conditions.

Users experiencing immediate danger, suicidal thoughts, self-harm risk, abuse, severe psychological distress, or another emergency should be directed toward qualified human support and appropriate emergency or crisis services.

AI-generated content can be inaccurate.

No important health, safety, legal, or clinical decision should depend exclusively on Reflect's output.

---

## 🔒 Privacy and Youth Safety

Because Reflect is intended for young users, privacy is a fundamental product requirement rather than a secondary feature.

Before any production release, the project requires professional review of:

- youth-data laws;
- age and consent requirements;
- data minimization;
- data retention;
- right-to-delete workflows;
- encryption;
- third-party AI-provider data policies;
- crisis escalation;
- counselor-resource accuracy;
- cross-border data transfer;
- country-specific privacy regulation.

A licensed mental-health professional should review the safety system.

A qualified lawyer familiar with youth-data and digital-services regulation in each target jurisdiction should review the production implementation before real-world use.

---

## 💡 Why Reflect Is Different

Many AI wellbeing applications compete on how much they can do: more advice, more personalization, more insights, more recommendations, more coaching, and more tracking.

Reflect intentionally competes on **restraint**.

### Typical AI

```text
You sound overwhelmed.
Here are five things you can try...
```

### Reflect

```text
When you say everything has started feeling like “too much,”
what part of it has been hardest to explain to other people?
```

Reflect does not attempt to know the user better than the user knows themselves.

It tries to create the conditions in which the user can know themselves better.

---

## 🔬 Research and Expert Validation

The project's direction has been informed by conversations with practitioners and researchers.

Expert feedback supported several key ideas:

### Preserve Exact Language

A user's own local or culturally specific wording may contain important nuance that disappears when automatically converted into clinical terminology.

### Summaries Should Not Become Interpretations

A record of what the user actually said may be more useful and ethically defensible than an AI-generated explanation of what those statements supposedly mean.

### Timelines Can Matter

Dated records may help users recognize recurring experiences and may also be useful when they choose to speak with a professional.

### Ask What Feelings Look Like

Moving from abstract emotional labels toward concrete, observable experiences can encourage reflection without requiring the AI to interpret the user's psychology.

### Crisis Interactions Should Lead Toward People

A crisis response should encourage appropriate human support while maintaining a compassionate transition.

---

## 🏆 Project Background

Reflect was developed by **Team Clover** for the **Kevin Xu Innovation Challenge / Rhodes Forum 2026**, within the education / non-profit track.

The initial target audience is:

> **Filipino youth aged approximately 16–24.**

The project emerged around a central question:

> **What if AI's role in emotional conversations were not to become better at giving people answers—but better at helping them ask themselves the right questions?**

---

## 👥 Team

**Team Clover**

- Nur-E-Jannat
- Anika
- Christian
- Ziyi
- Azeem
- Aswathi

---

## 🤝 Contributing

Reflect is still an early-stage project, and contributions should preserve its core philosophy.

Before proposing a feature, ask:

1. Does this help users understand themselves?
2. Does this introduce an AI interpretation the user did not provide?
3. Does this turn Reflect into an advice or coaching system?
4. Does this increase dependence on the application?
5. Does this move users toward or away from real human relationships?
6. Does this preserve the user's own language?
7. Could this introduce additional safety or regulatory risk?

### Development Workflow

```bash
git checkout -b feature/your-feature
git add .
git commit -m "feat: describe your change"
git push origin feature/your-feature
```

---

## 📜 License

A license has not yet been specified for this project.

Before accepting external reuse or distribution, choose an appropriate license and add a `LICENSE` file to the repository.

If Reflect contains proprietary prompts, research material, confidential interview information, or challenge-specific intellectual property, confirm what may be publicly released before selecting an open-source license.

---

## 🌿 Final Principle

The easiest path for an AI reflection product is to become a therapist, coach, advice engine, tracker, or interpreter.

Reflect deliberately resists that direction.

Its promise is smaller, but clearer:

> **Reflect doesn't tell you what your thoughts mean.  
> It helps you hear what you're already saying.**

---

## 🔗 Demo

https://reflect-ai-cyan-five.vercel.app/
