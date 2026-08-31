# Technical Architecture

## Overview

Reflect uses a **two-model architecture** where every user message passes through four stages before a response is shown. This ensures the "never gives answers" promise is enforced by design, not just by prompting.

## System Flow

```
┌─────────────┐    ┌──────────────┐    ┌──────────────────┐    ┌─────────────┐    ┌────────────┐
│  User types  │───▶│  Safety Gate  │───▶│  Question Engine  │───▶│   Checker   │───▶│  User sees │
│  a message   │    │              │    │    (1st AI)       │    │  (2nd AI)   │    │  one       │
│              │    │  Keywords +   │    │                  │    │             │    │  question  │
│              │    │  pattern      │    │  Drafts one      │    │  Verifies:  │    │            │
│              │    │  matching     │    │  question from   │    │  - Question? │    │  Only if   │
│              │    │              │    │  user's words    │    │  - Not advice│    │  it passes │
└─────────────┘    └──────┬───────┘    └──────────────────┘    │  - Not diagnosis│ └────────────┘
                          │                                     │  - Not leading│
                          │ If crisis detected                  │  - Uses user's│
                          ▼                                     │    words?     │
                   ┌──────────────┐                             └──────┬────────┘
                   │ Safety       │                                    │
                   │ Response     │                              If rejected:
                   │              │                              retry up to
                   │ - Stop asking│                              3 times
                   │ - Acknowledge│
                   │ - Counselor  │
                   │ - Crisis line│
                   │ - Invite back│
                   └──────────────┘
```

## API Call Pattern

Each user message triggers **two API calls** (or up to six if the checker rejects):

1. **Engine call**: `claude-sonnet-4-6` with the engine system prompt + full conversation history → drafts one question
2. **Checker call**: `claude-sonnet-4-6` with the checker system prompt + the user's message + the drafted question → returns JSON verdict

```json
{"pass": true/false, "safety_flag": true/false, "reasons": ["short reason"]}
```

If `safety_flag: true`, the safety response is shown regardless of quality.
If `pass: false`, the engine is called again with the same history (up to 3 attempts).
If all 3 fail, a safe fallback question is used.

## Safety Architecture

### Layer 1: Local Keyword Matching (instant)
A hardcoded list of crisis phrases in English and Tagalog triggers the safety response before any API call is made.

### Layer 2: AI Safety Flag
The checker model evaluates subtler distress signals — indirect hopelessness, descriptions of being harmed, language patterns the keyword list doesn't cover.

### Safety Response
When triggered, the system:
- Stops the questioning loop entirely
- Shows an empathetic acknowledgment
- Displays counselor contacts and NCMH crisis hotline (1553)
- Invites the user to return when ready
