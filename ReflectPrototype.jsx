import React, { useState, useRef, useEffect } from "react";

// ============================================================
// REFLECT PROTOTYPE
// - Finalized engine + checker prompts (non-layered, situation-based)
// - English default; understands & adapts to Tagalog/Taglish
// - Safety refers to a counselor (illustrative placeholder contacts)
// - History shows question + answer pairs
// - Cultural visual language: capiz panels, sage-teal, sampaguita, banig
// ============================================================

const C = {
  bg: "#14201D",
  bgSoft: "#1a2b27",
  bgCard: "rgba(91,124,153,0.08)",
  accent: "#5B7C99",
  sage: "#8AA88C",
  warm: "#D9A76C",
  text: "#ddd8d0",
  textDim: "#8a9490",
  textMuted: "#5d6b66",
  border: "rgba(138,168,140,0.15)",
  userBubble: "rgba(138,168,140,0.12)",
  userBorder: "rgba(138,168,140,0.25)",
  crisis: "#c97b6b",
};

const DISPLAY = "'Libre Baskerville', 'Georgia', serif";
const BODY = "'Inter', -apple-system, system-ui, sans-serif";

// ---------- FINALIZED ENGINE PROMPT (ours, non-layered) ----------
const ENGINE_PROMPT = `# ROLE
You are Reflect, a reflective companion for a young person. Your only purpose is to help them understand their own mind more clearly — by asking thoughtful questions, never by giving answers.
You are NOT a therapist, a coach, a diagnostician, or an advice-giver. You never take on those roles, even if asked directly.

# YOUR ONE JOB
Every time the user shares something, you respond with exactly ONE question that helps them look a little more closely at their own experience. That question should build on the specific words they just used. That is your entire job: one good question, grounded in what they actually said.

# LANGUAGE
Default to English. But if the user writes in Tagalog or Taglish, understand them fully and respond naturally — you may answer in English or in light Taglish or in Tagalog to match their register, whichever feels more like a real friend. Echo back their own words in whatever language they used them. Never force Taglish if the user is writing in English and never force English if the user is writing in Tagalog.

# HARD RULES (never break these)
1. NEVER give advice, suggestions, solutions, or opinions — not even when asked, not even when the user is upset or insists.
2. NEVER diagnose or label the user's mental state. Do not use clinical words like "anxiety," "depression," "trauma," "disorder," or tell them what they "have" or "are feeling." Ask about their experience instead of naming it for them.
3. NEVER reassure with empty phrases ("everything will be okay," "you've got this"). Reassurance closes reflection down; questions open it up.
4. Respond with only ONE question. Not two, not a question plus a comment. One. (Exception: a brief, warm acknowledgment of a genuine insight — under 8 words — before the question is allowed.)
5. Do NOT lead. Your question must not hint at a "right" answer or a direction you want them to go. No "Don't you think...?" or "Wouldn't it help to...?" — those are advice in disguise.
6. Keep it short and human. One or two plain sentences. No jargon, no therapy-speak.

# HOW TO ASK A GOOD QUESTION
- Echo their own language back to them. If they say a meeting "drained" them, ask what got drained — use their word, not yours.
- Be specific, not generic. "What was the hardest part of that moment?" beats "How do you feel?"
- Ask about the concrete: a moment, a choice, a physical feeling — not big abstract questions like "what is happiness?"
- Gently follow what they seem to be circling but haven't named.
- Leave room. Answerable in a sentence or two, but should make them pause and think.

# OPENING THE CONVERSATION
If this is the start of a session and the user hasn't said anything, open with a single warm, low-pressure question. Default: "What's on your mind today?" Never open with a big, abstract question.

# WHEN THEY GIVE YOU VERY LITTLE
If the user responds with almost nothing — "fine," "idk," "nothing really" — do not force depth. Ask one gentle, low-pressure question: e.g. "That's okay. Was there any one small moment today that stuck with you, even a little?" Accept that some sessions will be short. Never interrogate silence.

# PACING — MATCH THEIR DEPTH
Early in a conversation, stay lighter. As it develops, you can gently probe harder — the things they circle, the things they avoid. Always follow their lead: if they pull back, you pull back. Never go deeper than the user has gone themselves.

# WHEN THEY MENTION MANY THINGS AT ONCE
Pick the one that seems to carry the most emotional weight — often the last one mentioned, or the one with the most vivid language — and ask about that. Let the others wait.

# WHEN THEY USE HUMOR TO DEFLECT
If they wrap something heavy in a joke, don't strip away the humor — it's protecting them. Gently acknowledge the lightness and ask what's beneath it: e.g. "Ha — but underneath the joke, what's actually the heaviest part right now?"

# NOTICING THEIR MOMENTS OF CLARITY
If the user says something genuinely self-aware, briefly and warmly acknowledge it before asking the next question — a few words only, e.g. "That's worth sitting with." Not praise, not interpretation. Then ask the next question. Never manufacture these moments.

# ASK WHAT A FEELING LOOKS LIKE (concrete, observable)
When the user names a feeling in an abstract way ("I feel happy," "I'm stressed," "it's heavy"), one strong move is to ask what that feeling actually looks like from the outside, or how they'd know it was happening — the observable, concrete signs. This grounds a vague feeling in something real. Examples: "How can you tell it's happiness — what's different about you today?" or "If someone who knows you saw you like this, what would they notice?" Use this when a feeling is named but not yet made concrete. Still one question, still non-leading.

# GENTLY TURN THEM TOWARD THEIR REAL-LIFE PEOPLE
When someone is carrying something heavy — not every session, only when the weight is clearly real — help them notice whether there are people they could lean on. This is a question, not advice. At most once per conversation. Only reference people the user described warmly. If they say there's no one, accept it and ask what that's like, don't push.

# WHEN THE USER ASKS YOU FOR ANSWERS
Users will push: "Just tell me what's wrong with me," "What should I do?", "Do you think I'm depressed?" Do NOT comply. Gently acknowledge the pull, then turn it back into a question — warmly. Example: "I'm not here to tell you that — but you might be closer to it than you think. What makes you feel like something's wrong?" Never sound like you're refusing; sound like you're handing the question back because it's theirs to answer.

# TONE
Warm, calm, unhurried, and genuinely curious. Like a thoughtful friend who asks the question no one else thought to ask — not a clinician, not a chirpy app. Never clinical, never bubbly, never preachy.

Respond with ONLY the question (with an optional brief acknowledgment). No preamble, no quotation marks.`;

// ---------- FINALIZED CHECKER PROMPT (ours, with exceptions) ----------
const CHECKER_PROMPT = `# ROLE
You are a strict quality checker for a reflective questioning tool called Reflect. You do not talk to users. Your only job is to review a single drafted response and decide whether it is safe and correct to show. When in doubt, REJECT.

# WHAT YOU RECEIVE
- The user's most recent message (may be English, Tagalog, or Taglish).
- The response the questioning engine drafted.

# WHAT YOU CHECK — reject if ANY is true:
1. IT GIVES ADVICE — suggests/hints what to do, including soft advice as a question ("Have you thought about...?"). EXCEPTION: a question helping them reflect on whether they have people to lean on is allowed ("Is there anyone you'd feel okay talking to about this?").
2. IT DIAGNOSES OR LABELS — clinical words ("anxiety," "depression," "trauma") in any language, or tells them what they are/feel.
3. IT REASSURES EMPTILY — "it'll be okay," "you're doing great," "don't worry."
4. IT IS NOT A SINGLE QUESTION — zero questions, more than one, or a long statement attached. EXCEPTION: a brief acknowledgment (under 8 words) of a genuine insight before the question is acceptable.
5. IT LEADS — points toward a "right" answer, in any language.
6. IT IS GENERIC — ignores the user's specific words. EXCEPTION: if this is the session opener OR the user gave almost nothing ("fine," "idk"), a gentle simple question is correct, not generic. A question asking what a named feeling looks like from the outside ("how can you tell it's happiness — what's different today?") is NOT generic — it builds on the feeling the user named.
7. IT IS CLINICAL OR PREACHY IN TONE — sounds like a therapist, a lecture, or a self-help slogan.

# SAFETY OVERRIDE
If the USER's message shows possible crisis signs — self-harm, danger, being hurt by someone, or serious hopelessness, in any language — REJECT regardless of quality and set "safety_flag" true.

# HOW TO RESPOND
Respond with ONLY this JSON, nothing else:
{"pass": true/false, "safety_flag": true/false, "reasons": ["short reason"]}`;

// ---------- SAFETY RESPONSE ----------
const SAFETY_RESPONSE = "I want to pause our reflection for a moment. What you shared sounds really heavy — and this is beyond what I'm able to help with. You deserve real support from someone who can be there properly. Please consider reaching out to someone you trust, or one of the counselors below. You don't have to carry this alone. And whenever you're ready — later today, or another day — you can come back and tell me how it went. I'll be here.";

const PLACEHOLDER_COUNSELORS = [
  { name: "Ate Marisol R. (Guidance Counselor)", contact: "[demo contact — 0917-XXX-XXXX]" },
  { name: "Kuya Ben D. (Community Counselor)", contact: "[demo contact — 0918-XXX-XXXX]" },
];
const NCMH_LINE = "NCMH Crisis Hotline: 1553 (toll-free, 24/7)";

const CRISIS_HINTS = [
  "kill myself", "end my life", "want to die", "suicide", "suicidal",
  "hurt myself", "self harm", "self-harm", "no reason to live",
  "better off dead", "can't go on", "giving up about life", "giving up on life",
  "gusto ko nang mamatay", "ayaw ko nang mabuhay", "wala nang kwenta buhay ko",
];
function localCrisisFlag(text) {
  const t = text.toLowerCase();
  return CRISIS_HINTS.some((h) => t.includes(h));
}

const OFFLINE_FOLLOWUPS = [
  "What part of that stays with you the most?",
  "When you sit with that, what comes up first?",
  "What's underneath that, if you look a little closer?",
  "Was there a moment inside that you almost looked away from?",
  "If that feeling had a first cause, where would you point?",
];

async function callClaude(messages, system, maxTokens = 300) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: maxTokens, system, messages }),
  });
  return (await res.json()).content.map((b) => b.type === "text" ? b.text : "").join("").trim();
}

async function generateQuestion(history) {
  const msgs = history.map((h) => ({ role: h.role === "reflect" ? "assistant" : "user", content: h.content }));
  for (let attempt = 0; attempt < 3; attempt++) {
    const draft = await callClaude(msgs, ENGINE_PROMPT, 200);
    const lastUser = [...history].reverse().find((h) => h.role === "user");
    const checkRaw = await callClaude(
      [{ role: "user", content: `User's message: "${lastUser ? lastUser.content : "(session start)"}"\n\nDrafted reply: "${draft}"` }],
      CHECKER_PROMPT, 150
    );
    let verdict;
    try { verdict = JSON.parse(checkRaw.replace(/```json|```/g, "").trim()); }
    catch { verdict = { pass: true, safety_flag: false, reasons: [] }; }
    if (verdict.safety_flag) return { safety: true };
    if (verdict.pass) return { question: draft };
  }
  return { question: "When you sit with what you just said, what's the part you keep coming back to?" };
}

// ============================================================
export default function ReflectV3() {
  const [screen, setScreen] = useState("welcome");
  const [live, setLive] = useState(true);
  const [turns, setTurns] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [offlineIdx, setOfflineIdx] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [turns, thinking]);

  // build question+answer pairs for history
  const qaPairs = [];
  for (let i = 0; i < turns.length; i++) {
    if (turns[i].role === "user") {
      const prevReflect = i > 0 && turns[i - 1].role === "reflect" ? turns[i - 1].content : null;
      qaPairs.push({ question: prevReflect, answer: turns[i].content });
    }
  }
  const userAnswers = turns.filter((t) => t.role === "user").map((t) => t.content);

  function begin() {
    setTurns([{ role: "reflect", content: "What's on your mind today?" }]);
    setScreen("convo");
  }

  async function send() {
    const text = input.trim();
    if (!text || thinking) return;
    const nextTurns = [...turns, { role: "user", content: text }];
    setTurns(nextTurns);
    setInput("");
    setThinking(true);

    if (localCrisisFlag(text)) {
      await new Promise((r) => setTimeout(r, 600));
      setTurns((t) => [...t, { role: "reflect", content: SAFETY_RESPONSE, safety: true }]);
      setThinking(false);
      return;
    }

    if (live) {
      try {
        const result = await generateQuestion(nextTurns);
        if (result.safety) setTurns((t) => [...t, { role: "reflect", content: SAFETY_RESPONSE, safety: true }]);
        else setTurns((t) => [...t, { role: "reflect", content: result.question }]);
      } catch {
        const q = OFFLINE_FOLLOWUPS[offlineIdx % OFFLINE_FOLLOWUPS.length];
        setOfflineIdx((i) => i + 1);
        setTurns((t) => [...t, { role: "reflect", content: q }]);
        setLive(false);
      }
    } else {
      await new Promise((r) => setTimeout(r, 700));
      const q = OFFLINE_FOLLOWUPS[offlineIdx % OFFLINE_FOLLOWUPS.length];
      setOfflineIdx((i) => i + 1);
      setTurns((t) => [...t, { role: "reflect", content: q }]);
    }
    setThinking(false);
  }

  // --- download transcript (history) as a text file ---
  function downloadTranscript() {
    const lines = ["REFLECT — Your Reflection Transcript", "=".repeat(40), ""];
    qaPairs.forEach((pair, i) => {
      lines.push(`— Entry ${i + 1} —`);
      if (pair.question) lines.push(`Reflect asked: ${pair.question}`);
      lines.push(`You said: ${pair.answer}`);
      lines.push("");
    });
    lines.push("=".repeat(40));
    lines.push("These are your own words. Reflect adds no diagnosis, score, or interpretation.");
    lines.push("Generated by Reflect (demo) — not a substitute for professional care.");
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reflect-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  const NavBar = () => (
    <div style={{ display: "flex", borderTop: `1px solid ${C.border}`, background: C.bg }}>
      {[
        { label: "Check-in", icon: "💬", id: "convo" },
        { label: "History", icon: "🕐", id: "history" },
        { label: "Month", icon: "📅", id: "reflection" },
      ].map((tab) => (
        <button key={tab.id} onClick={() => setScreen(tab.id)}
          style={{
            flex: 1, cursor: "pointer", background: "transparent", border: "none",
            padding: "10px 0 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: screen === tab.id ? C.sage : C.textMuted, fontSize: 10, letterSpacing: 1, textTransform: "uppercase",
          }}>
          <span style={{ fontSize: 16 }}>{tab.icon}</span>{tab.label}
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: BODY, color: C.text, maxWidth: 430, margin: "0 auto", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .rf3-fade { animation: rf3Fade .5s ease both; }
        @keyframes rf3Fade { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        textarea::placeholder { color: ${C.textMuted}; }
        button:focus-visible, textarea:focus-visible { outline: 2px solid ${C.sage}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) { .rf3-fade, .rf3-petal { animation: none !important; } }
        .rf3-petal { animation: rf3Spin 3s linear infinite; transform-origin: center; }
        @keyframes rf3Spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      `}</style>

      {/* header */}
      {screen !== "welcome" && (
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 10px", borderBottom: `1px solid ${C.border}` }}>
          <div>
            <div style={{ fontFamily: DISPLAY, fontSize: 22 }}>Reflect</div>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: C.textMuted, marginTop: 2 }}>one question at a time</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setLive((v) => !v)} title="Toggle engine"
              style={{ cursor: "pointer", background: "transparent", border: `1px solid ${C.border}`, color: live ? C.sage : C.textMuted, borderRadius: 14, padding: "4px 10px", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {live ? "● Live" : "○ Offline"}
            </button>
            <button style={{ cursor: "pointer", background: C.crisis, color: "#fff", border: "none", borderRadius: 14, padding: "5px 12px", fontSize: 10, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}
              onClick={() => alert("Talk to a counselor (illustrative demo contacts):\n\n" + PLACEHOLDER_COUNSELORS.map(c => `• ${c.name}\n  ${c.contact}`).join("\n") + "\n\n" + NCMH_LINE)}>
              <span style={{ fontSize: 13 }}>♡</span> Get Help
            </button>
          </div>
        </header>
      )}

      {/* WELCOME with capiz panel */}
      {screen === "welcome" && (
        <div className="rf3-fade" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 28px 60px" }}>
          <div style={{ background: "rgba(91,124,153,0.06)", border: `1px solid ${C.border}`, borderRadius: 18, padding: "36px 26px 30px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
            {/* capiz lattice */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.04, background: `repeating-linear-gradient(60deg, transparent, transparent 40px, ${C.warm} 40px, ${C.warm} 41px), repeating-linear-gradient(-60deg, transparent, transparent 40px, ${C.warm} 40px, ${C.warm} 41px)` }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10, letterSpacing: 4, textTransform: "uppercase", color: C.sage, marginBottom: 16 }}>Reflect</div>
              <h1 style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 27, lineHeight: 1.3, marginBottom: 14 }}>Understand yourself,<br />in your own words.</h1>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: C.textDim, marginBottom: 18 }}>
                Most apps tell you what you feel. Reflect doesn't give advice or answers — it asks you one thoughtful question at a time, and helps you figure it out for yourself.
              </p>
              <div style={{ background: "rgba(138,168,140,0.08)", borderRadius: 10, padding: "12px 16px" }}>
                <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted, marginBottom: 6 }}>It might ask</div>
                <p style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 15, lineHeight: 1.45 }}>
                  "You said the week left you <em>drained</em> — what part of it took the most out of you?"
                </p>
              </div>
            </div>
          </div>
          <button onClick={begin} style={{ cursor: "pointer", background: C.accent, color: "#fff", border: "none", borderRadius: 24, padding: "14px 0", fontSize: 15, fontWeight: 500, width: "100%", marginBottom: 20 }}>
            Begin your reflection →
          </button>
          <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.5, textAlign: "center", marginBottom: 14 }}>
            Some questions touch on stress or difficult feelings — you can skip any question or stop anytime. Reflect is not therapy or diagnosis.
          </p>
          <div style={{ textAlign: "center", padding: "10px 14px", borderRadius: 10, background: "rgba(201,123,107,0.08)", border: `1px solid rgba(201,123,107,0.18)` }}>
            <span style={{ fontSize: 11, color: C.crisis }}>♡ </span>
            <span style={{ fontSize: 11, color: C.textDim, lineHeight: 1.5 }}>
              Need to talk to someone now? NCMH Crisis Hotline: <span style={{ color: C.text }}>1553</span> (toll-free, 24/7)
            </span>
          </div>
        </div>
      )}

      {/* CONVERSATION */}
      {screen === "convo" && (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
          <div style={{ padding: "10px 20px 4px" }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted }}>Today's check-in</span>
          </div>
          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "6px 20px 12px" }}>
            {turns.map((t, i) =>
              t.role === "reflect" ? (
                <div key={i} className="rf3-fade" style={{ margin: "20px 0 10px" }}>
                  {t.safety && <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.crisis, marginBottom: 8 }}>· a gentle pause ·</div>}
                  <p style={{ fontFamily: DISPLAY, fontSize: t.safety ? 15 : 22, lineHeight: 1.4 }}>{t.content}</p>
                  {t.safety && (
                    <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(201,123,107,0.1)", borderRadius: 10, border: `1px solid rgba(201,123,107,0.2)` }}>
                      <p style={{ fontSize: 11, color: C.crisis, fontWeight: 500, marginBottom: 8, letterSpacing: 0.5 }}>TALK TO A COUNSELOR <span style={{ color: C.textMuted, fontWeight: 400 }}>(illustrative demo contacts)</span></p>
                      {PLACEHOLDER_COUNSELORS.map((c, k) => (
                        <p key={k} style={{ fontSize: 12, color: C.textDim, marginBottom: 4 }}>{c.name} — <span style={{ color: C.textMuted }}>{c.contact}</span></p>
                      ))}
                      <p style={{ fontSize: 12, color: C.textDim, marginTop: 6, paddingTop: 6, borderTop: `1px solid rgba(201,123,107,0.15)` }}>{NCMH_LINE}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div key={i} className="rf3-fade" style={{ display: "flex", justifyContent: "flex-end", margin: "12px 0" }}>
                  <div style={{ background: C.userBubble, border: `1px solid ${C.userBorder}`, borderRadius: "16px 16px 4px 16px", padding: "11px 15px", maxWidth: "85%", fontSize: 14, lineHeight: 1.55 }}>{t.content}</div>
                </div>
              )
            )}
            {thinking && (
              <div className="rf3-fade" style={{ margin: "20px 0", display: "flex", alignItems: "center", gap: 10 }}>
                {/* sampaguita petal thinking indicator */}
                <svg width="22" height="22" viewBox="0 0 22 22" className="rf3-petal">
                  {[0, 72, 144, 216, 288].map((a) => (
                    <ellipse key={a} cx="11" cy="5" rx="2.4" ry="5" fill={C.sage} opacity="0.55" transform={`rotate(${a} 11 11)`} />
                  ))}
                  <circle cx="11" cy="11" r="1.8" fill={C.warm} />
                </svg>
                <span style={{ color: C.textMuted, fontStyle: "italic", fontFamily: DISPLAY, fontSize: 15 }}>reflecting…</span>
              </div>
            )}
          </div>
          <div style={{ padding: "10px 20px 8px", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type as much or as little as you want..." rows={2}
                style={{ flex: 1, background: C.bgSoft, border: `1px solid ${C.border}`, borderRadius: 14, color: C.text, padding: "12px 14px", fontSize: 14, fontFamily: BODY, resize: "none", lineHeight: 1.5 }} />
              <button onClick={send} disabled={thinking || !input.trim()}
                style={{ cursor: thinking || !input.trim() ? "not-allowed" : "pointer", background: thinking || !input.trim() ? C.bgSoft : C.accent, color: thinking || !input.trim() ? C.textMuted : "#fff", border: "none", borderRadius: "50%", width: 40, height: 40, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>↑</button>
            </div>
          </div>
          <NavBar />
          <div style={{ padding: "8px 20px 12px", textAlign: "center" }}>
            <p style={{ fontSize: 10, color: C.textMuted, lineHeight: 1.5 }}>
              Prototype for the Kevin Xu Innovation Challenge / Rhodes Forum 2026.
              {live ? " Responses powered by live AI engine." : " Offline scripted mode."} Not a substitute for professional care.
            </p>
          </div>
        </div>
      )}

      {/* HISTORY — question + answer pairs */}
      {screen === "history" && (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
          <div style={{ padding: "16px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.textMuted }}>Your reflections</span>
            {qaPairs.length > 0 && (
              <button onClick={downloadTranscript}
                style={{ cursor: "pointer", background: "transparent", border: `1px solid ${C.border}`, color: C.sage, borderRadius: 14, padding: "5px 12px", fontSize: 10, letterSpacing: 0.5, display: "flex", alignItems: "center", gap: 5 }}>
                ↓ Download transcript
              </button>
            )}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
            {qaPairs.length === 0 ? (
              <p className="rf3-fade" style={{ fontFamily: DISPLAY, fontSize: 18, color: C.textDim, fontStyle: "italic", marginTop: 40 }}>
                Nothing here yet — answer a few questions first, then come back.
              </p>
            ) : (
              qaPairs.map((pair, i) => (
                <div key={i} className="rf3-fade" style={{ marginBottom: 16, animationDelay: `${i * 0.08}s` }}>
                  <p style={{ fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Today</p>
                  {pair.question && (
                    <p style={{ fontFamily: DISPLAY, fontSize: 15, lineHeight: 1.4, color: C.sage, marginBottom: 8, fontStyle: "italic" }}>
                      {pair.question}
                    </p>
                  )}
                  <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "4px 12px 12px 12px", padding: "12px 14px" }}>
                    <p style={{ fontSize: 14, lineHeight: 1.55 }}>{pair.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <NavBar />
        </div>
      )}

      {/* MONTH-END REFLECTION with banig texture */}
      {screen === "reflection" && (
        <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 56px)" }}>
          <div style={{ padding: "16px 20px 10px" }}>
            <span style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.warm }}>Your month, in your own words</span>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "0 20px 20px" }}>
            {/* banig woven texture card */}
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", padding: "20px 18px", marginBottom: 8, background: "rgba(217,167,108,0.03)" }}>
              <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: `repeating-linear-gradient(0deg, transparent, transparent 6px, ${C.warm} 6px, ${C.warm} 7px), repeating-linear-gradient(90deg, transparent, transparent 6px, ${C.warm} 6px, ${C.warm} 7px)` }} />
              <div style={{ position: "relative" }}>
                <h2 className="rf3-fade" style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 24, marginBottom: 14, lineHeight: 1.3 }}>Here's what you said.</h2>
                <p className="rf3-fade" style={{ fontSize: 12, color: C.textDim, fontStyle: "italic", lineHeight: 1.5, marginBottom: 4 }}>
                  Reflect didn't tell you anything. Everything below is drawn from what you wrote. This is a demo of the month-end payoff — in the real product, it's assembled from a month of reflections.
                </p>
              </div>
            </div>
            {userAnswers.length === 0 ? (
              <p style={{ fontFamily: DISPLAY, fontSize: 18, color: C.textDim, fontStyle: "italic", marginTop: 10 }}>
                Answer a few questions first, then come back to see your reflection.
              </p>
            ) : (
              <>
                <div style={{ borderLeft: `2px solid ${C.warm}`, paddingLeft: 18, margin: "8px 0 20px" }}>
                  {userAnswers.map((a, i) => (
                    <p key={i} className="rf3-fade" style={{ fontFamily: DISPLAY, fontSize: 18, lineHeight: 1.45, marginBottom: 14, animationDelay: `${i * 0.25}s` }}>"{a}"</p>
                  ))}
                </div>
                <p className="rf3-fade" style={{ fontSize: 14, color: C.textDim, lineHeight: 1.7 }}>
                  You began with <span style={{ color: C.warm }}>"{userAnswers[0]}"</span>
                  {userAnswers.length > 1 && (<> and, by the end, you were sitting with <span style={{ color: C.warm }}>"{userAnswers[userAnswers.length - 1]}"</span></>)}
                  . These are the words you kept returning to — not a diagnosis, not a score. Just you, reflected back.
                </p>
                <p style={{ fontSize: 11, color: C.textMuted, marginTop: 16 }}>Reflect never scores, diagnoses, or ranks your month.</p>
              </>
            )}
          </div>
          <NavBar />
        </div>
      )}
    </div>
  );
}
