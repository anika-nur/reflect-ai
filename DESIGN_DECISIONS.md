# Design Decisions

This document records the key product, technical, and design decisions made during the development of Reflect, along with the reasoning behind each.

## Product Decisions

### Questions Only — Never Answers
**Decision**: Reflect responds exclusively with questions. It never gives advice, suggestions, diagnoses, or reassurance.

**Reasoning**: AI that answers reduces critical thinking; one that asks the right question deepens it. Every mental health chatbot on the market (Wysa, Woebot, Replika, BetterMe) gives answers. The top user complaint across 250k+ Google Play reviews is that these tools feel "generic" or "robotic." Reflect's constraint — questions only — is both the differentiator and the product.

**Enforcement**: This isn't just a prompt instruction. The two-model architecture (engine + checker) enforces it structurally. The checker rejects any response that isn't a question.

### Anti-Dependency by Design
**Decision**: Reflect actively turns users toward the real people in their lives rather than fostering continued app usage.

**Reasoning**: If our tagline is "it wants to be the reason you finally do [talk to someone]," the product must actually push people outward. Questions like "is there someone in your life you'd feel okay talking to about this?" are built into the engine prompt. Our success metric isn't engagement or session length — it's whether the user leaves clearer about who to reach out to.

### Filipino Cultural Grounding
**Decision**: Reflect is built specifically for young Filipinos, not translated from a global product.

**Reasoning**: Every competitor in our benchmarking (Wysa, Woebot, Calm, Headspace, Replika) is a generic global import — none built for the Philippine context. Understanding hiya (shame), kapwa (shared self), Taglish code-switching, and Filipino humor isn't a localization feature — it's a product requirement. Validated by 5 in-depth Philippine counselor consultations.

### Wellness Tool, Not Medical Device
**Decision**: Position Reflect as a self-guided wellness tool, not a clinical or medical product.

**Reasoning**: Classifying as a medical device triggers regulatory requirements that killed Woebot's consumer app. Reflect is the step before the counselor — helping users understand themselves — not a replacement for clinical care. This positioning needs legal review under the Philippine Data Privacy Act (on roadmap).

## Technical Decisions

### Two-Model Architecture
**Decision**: Use separate AI models for question generation (engine) and quality verification (checker).

**Reasoning**: A single model will occasionally slip — give a suggestion disguised as a question, offer an opinion wrapped in curiosity, or use clinical language. The checker catches these failures before the user sees them. This costs 2x API calls per message but makes the core promise reliable rather than aspirational.

### Claude Artifact for Prototype
**Decision**: Build the prototype as a Claude Artifact (React sandbox) rather than a standalone deployed web app.

**Reasoning**: The artifact runs the real AI engine live — calling the actual two-model system with every message. Building a standalone site would require backend setup, API key management, hosting, and authentication — all for a demo that judges see as a screen recording. The artifact gives us everything needed for the pitch with zero infrastructure overhead.

### No Calendar Feature
**Decision**: Removed the word-based check-in calendar from the current version.

**Reasoning**: The calendar picked the "most notable word" from each session using a crude heuristic (longest non-filler word). This produced a grid of random-looking words that didn't tell users anything actionable. It was the weakest of the features — decorative rather than functional. Removed to keep the product focused on what works: the questioning, the memory, and the monthly reflection.

## Features Explicitly Rejected

| Feature | Why Rejected |
|---------|-------------|
| Mood scoring | Turns reflection into performance ("am I having a good day?"). That's judgment, not understanding. |
| Journaling mode | Writing without questions lets someone dump without deepening. The question is the product. |
| Goal-setting | Turns Reflect into a coach → giving advice → breaks core promise. |
| Gamification | Streak counts and rewards incentivize usage, not understanding. Contradicts anti-dependency design. |
| Social features | Sharing reflections publicly contradicts the safe, private space Reflect creates. |
| Therapist matching | Moves into a regulated clinical space. Reflect refers to counselors; it doesn't become a therapy marketplace. |

## Visual Design Decisions

### Color Palette
- **Background**: `#14201D` (dark sage-green) — calm, grounding, distinctly Filipino
- **Accent**: `#8AA88C` (sage) — organic, not clinical
- **Warm**: `#D9A76C` (gold) — for stats, feature labels, moments of emphasis
- **Crisis**: `#C97B6B` (coral) — reserved exclusively for safety-related elements

### Cultural Visual Language
- **Capiz lattice pattern**: Subtle background texture on the welcome screen, referencing traditional Filipino capiz shell windows
- **Sampaguita loading indicator**: The thinking animation uses five petals arranged like the Philippine national flower
- **Banig texture**: The monthly reflection card uses a woven mat pattern, referencing traditional Filipino craftsmanship
- **Typography**: Libre Baskerville (display) + Inter (body) — warm serif for questions, clean sans for UI

### Typography in the Pitch Deck
- **Cambria** for all headings — serif warmth, readable at large sizes
- **Calibri** for all body text — clean, professional
- Two fonts only, consistent across all slides (direct response to mentor feedback about font inconsistency)
