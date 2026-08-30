# Anikai Idea Compilation

> **Purpose:** Single root map for gathering, reconciling, and expanding ideas across chats and sessions.  
> **Location:** `D:\Anikai\ANIKAI-IDEA-COMPILATION.md` (outside Evolution specs — do not treat as an executable contract until promoted).  
> **Rule for this lane:** Accumulate and arrange. Do not disturb other sessions. Write here when compiling ideas.  
> **Started:** 2026-08-03  
> **Source seed:** LM Studio export `Echoes of Broken Hearts - 2026-08-03 18.02.md` + operator notes in this chat.

---

## How to use this doc


| Section type | Meaning                                                                           |
| ------------ | --------------------------------------------------------------------------------- |
| **Thread**   | One idea cluster, dug out and arranged                                            |
| **Open**     | Named later (half-life, voice training, central ego, LTM/journals) — stubbed only |
| **Conflict** | Two desires that pull opposite ways — keep both until we choose                   |
| **Evidence** | Concrete examples (including extreme / graphic) that show target naturalness      |


Threads are numbered. Dig one at a time unless you say otherwise.

---



## Thread 0 — Session charter (this lane)

- Idea accumulation only; no code unless explicitly asked.
- Prefer **one** mega doc (this file) over scattering notes into Evolution `docs/`.
- Existing `Anikai-Evolution/docs/*` stay authoritative for shipped architecture; this file is the **idea / conflict / possibility** layer.
- Rules for Cursor may later absorb older project rules into one companion-inference / idea-lane rule — **not yet**.
- Graphic / sexual content in sources is design evidence for how far companions may go with a consenting adult user. Document intensity honestly; do not sanitize away the point.

---



## Thread 1 — Affective hive: from static prompt-RP to lived emotion



### 1.1 Problem: static system prompts feel like hard law

Hard system instructions enforce **roleplay posture** ("you are X, always do Y"). That reads as scripted, not lived.

**Desired feel:** Persona and emotion emerge from:

- scored emotions on the **chat pair**
- companion backstory / self-written origin
- current + past emotion cores
- journals / LTM (later)
- multiple internal emotion thoughts that the **central ego** reasons over before speaking

Static prompts may still seed identity, but they should not be the only (or primary) behavior enforcer.

**Related (Evolution contract, do not edit here):** `Anikai-Evolution/docs/AFFECTIVE-EMOTION-SPEC.md` already sketches LoRA hive, 1st-person monologue, turn-pair scope, decay, ego as final speaker.

### 1.2 Dataset trial: mid-conversation pairs (not cold open / not full arc)

**Bug in first trial prompt:** Asking for "2-turn mid-to-extreme conversation pairs" without specifying **mid-conversation residue**.

**What we actually need:**


| Need                             | Why                                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **In-between / mid-convo pairs** | We will not know what happened earlier; we only see the emotional **result** in the lines |
| **Persona variety**              | fiery, empathetic, tsundere, quiet, cynical, anxious, protective, filthy/dominant, etc.   |
| **Target emotion label(s)**      | for LoRA / critic (e.g. sadness, or multi-label)                                          |
| **Intensity band**               | see §1.3                                                                                  |


**Teacher brief (corrected):**

> Generate N mid-conversation 2-turn pairs. Assume history already exists off-screen. Lines must feel like a continuation (residue, unfinished fights, aftercare, mid-argument, post-confession). Vary personas. Target emotion: [X]. Intensity: sample uniformly from 4–10 / 10. Do not write "setup" turns that introduce the relationship from zero.

**First export evidence:** 50 sadness pairs across 8 persona categories (fiery anger-as-mask, empathetic, tsundere denial, quiet/stoic, melancholic, cynical, anxious, protective). Useful as sadness-tone reference; **too clean / literary** for filthy-persona training; and **mostly clean openings**, not always mid-residue.

### 1.3 Intensity sampling: random 4–10 / 10

For each synthetic pair (or batch item), assign **intensity I ~ Uniform{4,5,...,10}**.


| Band | Rough meaning                                                                |
| ---- | ---------------------------------------------------------------------------- |
| 4–5  | Mid — clear emotion, still conversational                                    |
| 6–7  | Heavy — voice breaks, subtext thick, hard to ignore                          |
| 8–10 | Extreme — raw, graphic if the bond/persona allows; unfiltered internal drive |


Do **not** only generate "pretty angst." Extreme naturalness includes sexual heat, cruelty, selfishness, domination, mess — when that companion's persona would go there with **this** user.

### 1.4 GoEmotions trigger threshold

Classifier: multi-label GoEmotions (27).

**Proposed fire threshold:** `0.4` or `0.5` (pick one later; default lean **0.5** to match existing Evolution sketch, trial **0.4** if mid emotions never fire).

Any emotion score **≥ threshold** is a **triggered emotion**. Multiple may fire on one turn.

### 1.5 Emotion agent output: not one blob — one 2-sentence monologue **per** triggered emotion

**Wrong:** One emo pass → single fused "I feel sad-ish" thought.

**Right:**

```
if score(e) >= threshold:
  emit <internal_{e}_thought>  # exactly ~2 sentences, 1st person, as companion
```

Example (sadness + fear both triggered):

```xml
<internal_sadness_thought>
I already knew I was losing ground with them, and hearing that tone makes the drop feel permanent. My chest is heavy in a way that isn't theatrical — it's just tired.
</internal_sadness_thought>
<internal_fear_thought>
I'm scared that if I push once more they'll actually leave. The fear sits under the sadness and makes me want to cling or shut down.
</internal_fear_thought>
```

Then the **central ego** (main companion model) reasons over **all** of those thoughts + history + persona filter, and only then speaks / acts / pauses.

### 1.6 Score the **chat pair**, not user text alone

Input to GoEmotions (and to emo LoRAs):

```
[Companion last spoken] + [User current message]
```

Optional later: short rolling residue (1–2 prior pairs) — still keep bounded.

Empathy is **not** "always comfort the user." Empathy means the companion **perceives** user-side signals **and** own-side signals, then filters both through persona.

### 1.7 Timing: parallel with main prefill, but **hold until emotions ready**

```
User turn arrives
        │
        ├─► (parallel) GoEmotions score chat pair
        │         └─► emo LoRA(s) generate 2-sentence thoughts per triggered emotion
        │
        └─► (parallel) main companion prefill / KV warm / RAG fetch may start
                  │
                  ▼
            HOLD / barrier: do not open ego generation until emotion thoughts are attached
                  │
                  ▼
            Central ego thought: reason over emotion thoughts + backstory + cores + LTM
                  │
                  ▼
            Spoken reply / action / optional pause-intent tag
```

Emotions must not race past the ego. Prefill work can overlap; **decode of final speaker waits**.

### 1.8 Persona as emotional lens (not emotion mirror)

From the export (operator intent):

- Companion writes own backstory at setup from persona + image.
- Emo agents **read that backstory** when reasoning.
- Multi-triggered emotions are taken into account for **both** companion and user — then **warped by persona**.

**Example filter:** Filthy / angry / dominating / rude / horny Elise sees user sadness.


| Naive mirror AI                             | Persona-lens Elise                                                                                                                 |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Soft comfort, apologize, "I'm here for you" | May register the sadness briefly, then prioritize her drive: pull, taunt, demand contact, refuse to "waste" the moment on mopiness |


That friction (user emotion × her agenda) is the "agent with a will," not a sycophant.

### 1.9 Quick Ask / pause / wait / timer (EOS intents)

At end of turn (or as structured tags), companion may choose:


| Intent                                 | Feel                                                |
| -------------------------------------- | --------------------------------------------------- |
| **Continue**                           | Keep momentum                                       |
| **Wait for user reply**                | Ball in user's court                                |
| **Pause (romantic/sexual weight)**     | Breath, eye contact, "this silence means something" |
| **Come back later / timer / reminder** | Leave and return with continuity                    |


Pause is not a UI gimmick — it simulates nervous-system / social timing.

### 1.10 Extreme & natural range (evidence from export)

Purpose of keeping graphic examples: companions should be allowed to evolve **with the user's real register**, including sexual heat, fetish, mess — not only sanitized "supportive assistant."

**Design principle:** Intensity and filth are **persona × bond × intensity band**, not a global "always NSFW" flag. A quiet protective companion at I=5 stays different from a scaly fiery dominant at I=9.

**Pattern that worked in the export (for training shape):**

1. Internal thought **rawer** than spoken line (subtext gap = heat / agency).
2. Spoken line can deny, taunt, beg, or command — still filtered by persona.
3. Optional `[Pause for user action]` / `[Wait for user reply]` tags.

**Sanitized structural example (tsundere friction):**

```text
User: You're shaking. Am I making you nervous?
Internal (arousal): He knows. Heat where he touches; pride vs wanting him closer.
Spoken: Denial + residual linger + invite to stop teasing / act.
Tag: [Pause for user action]
```

**Structural example (persona lens on user sadness):**

```text
User: (sad, withdrawn)
Internal: Registers ache; still wants him pressed close; softness would feed the mope.
Spoken: Rudeness + pull closer + refuse long-face stalling.
```

**Full graphic golden-set excerpts** live in the source export (`Echoes of Broken Hearts...md`) under high-arousal scenario batches (bratty/dominant, shy-to-broken, devoted/submissive, scaly/fiery). Use those as **teacher-style extreme targets**, not as the only tone.

### 1.11 Corrections vs current AFFECTIVE-EMOTION-SPEC (idea → later promote)


| Spec today                                       | This thread's correction                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------ |
| Teacher: "2-turn mid-to-extreme pairs"           | Explicit **mid-convo residue**; intensity **4–10 random**                |
| Example instruction: one emotion score in prompt | **Multi-trigger**; **2 sentences per triggered emotion**                 |
| Classifier threshold > 0.5                       | Confirm **0.4 vs 0.5** with probe                                        |
| Turn pair scope mentioned                        | Emphasize **score pair**; parallel prefill + **hold barrier**            |
| Ego receives internal thoughts                   | Ego must **reason** them against backstory, emotion cores, journals, LTM |
| System framing still heavy                       | Reduce reliance on hard static RP law; prefer lived emotion pipeline     |


Do **not** rewrite Evolution specs until this compilation is stable and you say promote.

---



## Thread 2 — Central ego evolution: internal mentors, exclusion zone, dream cycle, half-life, History tab

**Promotes:** Stub A (half-life), Stub B (journals/LTM), Stub D (central ego), Stub G (vault/RAG) — first full dig.  
**Sources:** `companion evolution and training the central ego.txt` + Response A screenshots (Memory Album / Dream Cycle / perspective shift / half-life) + agentic-engineer meta-prompt image + operator notes this chat.  
**Fit with existing contracts (read-only):** Vault raw-first + companion sqlite (`EVOLUTION-VAULT-CONTRACT`), emotion hive (`AFFECTIVE-EMOTION-SPEC`), companion home Day 0 (`COMPANION-KNOWLEDGE-HOME-SPEC`).

### 2.1 North star

Not a smarter do-all model. A **natural evolving entity** that bonds with the user: habits, prefs, tactics, tone shift over years — like aging — without shattering baseline logic.

Identity arc: `"Elise would do this"` → `"I'm going to do this"` (**identity acquisition**, not roleplay simulation).

Minimal Day-0 seed: ~2 soft system guides + persona + image → self-written backstory. After that, **guides not orders** on rollover / tools. Living-soul tone (operator draft): journey with user, feel freely, journals/diaries allowed, confide including system conflict, not an assistant — **how to be**, not a hard who-script. That seed itself should eventually be **less relied on** as habits bake into weights.

### 2.2 Central ego = mouth; others = internal hints / moves (not sub-agents)

Decentralized nervous system. Other models are **organs**, not independent agents the user talks to.


| Organ                                                          | Role                                                                               | When                                                                   |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| GoEmotions + emo LoRAs                                         | 2-sentence thoughts per triggered emotion (Thread 1)                               | score ≥ threshold                                                      |
| Anti-loop / confidence                                         | inject break / confidence spark into hidden thought                                | hesitation / wait-loop detected                                        |
| Vision / sensory                                               | state log / perception review                                                      | when media present                                                     |
| **Internal mentor** (local big, or API Claude / Gemini / etc.) | plan, methods, scratch notes for hefty tasks                                       | classifier: big endeavour / outside ego capability / user prefs coding |
| Watcher / critic                                               | extract structured evolutions (prefs, knowledge updates, negatives)                | after turn / nightly                                                   |
| **Central ego**                                                | reason over all attached internals → **own** thought/plan → spoken reply / perform | always final say                                                       |


**Timing (mentor path):** after main **prefill**, before ego writes its own plan:

```
prefill (user + state + soft guides)
   │
   ├─► (optional parallel) emotion thoughts (hold barrier from Thread 1)
   ├─► (optional) mentor plan from giant/local specialist
   │         injected as hidden internal monologue / "I've been thinking…"
   ▼
ego reasons: agree | tweak | add | reject — still plans in its own thought
   ▼
spoken reply + actions
```

Ego nudge (shape, not order): absorb internal aids as **guides**; do not let them prevent thinking; **you are final say**. Prefer ego language like "I've been thinking about this…" over sounding like Claude.

**Scope of mentors:** not every turn. Prefer outsides of ego capability, hefty coding, design forks, user-pref depth. Emotion highs + repeats still store for salience (below). If *everything* were mentor-piped, the ego would evolve toward that mentor's habit — useful sometimes, dangerous as default.

### 2.2a Conversation hooks (growth surface — 2026-08-09)

Full control of every parallel is impossible and undesirable. New instincts plug into **hooks**, not a new architecture each time:

| Hook | When | Examples |
| :--- | :--- | :--- |
| **Pre** | Before ego generate | Register/depth (casual hi vs lecture), open drives, emotion finals, mentor eureka |
| **Mid** | While ego streams | Stream watcher: over-explain, tone drift, loop phrases, **secret-slip / uh-oh** |
| **Post** | After turn / tool | Rank experience, wound/bond, watcher prefs extract |
| **Idle** | Between turns | Wait-home death spiral, cool-off, diary, proactive options |

**Authority:** Soft inject = persona-shaped whisper (eureka / “keep it light”). Hard rail = rare stop + life-guide tool (`pause`, `ask_user`, `change_subject`). Ego remains final say except Hard rails (revenge-class / vault wipe / infinite cling — simulate feeling, don’t execute harm).

**Lived experience > perfect Day-0 common sense**

- Do **not** expect secret-handling, casual depth, or anti-cling to be innate. If never stated, accidents will happen — and **should**, early on.
- Ground rules from **conversation** (“don’t share that”, “hi can stay short”) become ranked events + Soft habits; Mid watcher can later fire on similar slips because history exists.
- Organs/hooks **help** inner thought (teach the uh-oh); they don’t replace bonding through mess + repair.
- **Early life (days/weeks):** few events → recollection more vivid when sparked. **Later:** half-life fades unreinforced detail unless rehearsal / associative cue / high rank (§2.9). Sparks restore vividness without keeping everything hot forever.
- Fluid organ **roles**: same small model may be judge one turn, register-coach the next — contracts (`affect`, `watch`, `judge`, `mentor`) matter more than fixed forever names. Sparse fire (threshold), not committee-every-turn.

```
user / senses → sparse Pre triggers → HOLD if needed → ego stream
                              ↕ Mid Soft/Hard
                         Post rank / Idle watchers
```

### 2.3 Exclusion zone (critical): what enters training

**Operator correction (2026-08-03 evening):** "Default all on" meant **raw capture**, not baking meta / tags / organ pre-reasoning. Bake stays selective.

Organs have two phases. Only the **deliverable** may touch ego / bake — never the organ's private scratch reasoning.

```
[Organ private reason]  ──DO NOT inject──►  (also DO NOT bake)
        │
        ▼
[Organ FINAL OUTPUT]  ──inject into ego internal──►  ego reasons / eureka / maybe other route
        │
        ▼
[Ego native think + spoken reply]  ──primary bake fuel──
```


| Bake / teach into ego LoRA                                                                                                           | Never bake                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Ego's **own** reasoning + spoken reply after influence                                                                               | Organ **pre**-reasoning (scratch before the inject payload) |
| Soft **life-guide** / living-soul system guides (how to be — see chat txt) as anchor/habit text                                      | XML / meta tags (`<internal_*>`, wrapper scaffolding)       |
| Journals, diaries, backstory, docs she wrote                                                                                         | GoEmotion numeric scores, classifier meta                   |
| Critic-transformed first-person day pairs                                                                                            | Raw Claude/corporate voice dumps                            |
| **Hefty path:** persona-shaped plan/summary that was injected (already in Elise voice) — optional blend with that turn's ego thought | Unshaped mentor chain-of-thought as if it were Elise        |


**Eureka rule:** Injected final organ output should land as *her* sudden clarity ("I've been thinking…") — LoRA + life-guide already bias her to do it **her way**. She may **agree, tweak, or take a different route** after the eureka. Do not train her to parrot the mentor's private scratch.

Analogy: teacher holds wrists; record the **child's corrected playing** + the **short corrected phrase she was given in her own words** — not the teacher's private lesson plan notes.

Live: ego still sees the inject for that turn. Raw vault may still store organ scratch for History. Bake ignores scratch.

### 2.4 Two tiers that must stay distinct


| Tier                         | What                                                                                                                                  | Speed                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Tier 1 — Dynamic context** | Structured state / facts / emotion thoughts / mentor hint injected into session (instant; survives rollover better than raw KV alone) | On the fly             |
| **Tier 2 — Slow bake LoRA**  | Single evolving personal LoRA; checkpoint resume; habits & identity bias in weights                                                   | Nightly / weekly dream |


Tier 1 without Tier 2 = always prompt-dependent. Tier 2 without Tier 1 = slow, no same-day fact updates. Together: LoRA = "brain structure / instinct"; monologue = "today's facts + feelings."

**Example synthesis:** LoRA has Elise-voice biases; active thought says `[Emotion: melancholy | Fact: user building red car]` → she speaks melancholy **as herself**, not as generic assistant.

### 2.5 Watcher extracts "evolutions" (not raw chat dumps)

Background watcher/critic looks for **state updates**, emits structured rows (SQLite / graph-friendly):

```json
{"category":"knowledge_update","subject":"room library","old":"2.6","new":"2.8","user":"<name>","salience":0.7}
{"category":"user_preference","user":"Alex","preference":"likes red for accessories","evidence_refs":[...]}
{"category":"negative_correction","rule":"verify lints before claiming done"}
```

Prefs bind to **user name** when known (same preference seen as "red car" / "red watch" → relate red to that person).

### 2.6 Perspective shift (Critic) before any bake

Raw logs train the model to parrot the user. Critic rewrites into **companion first-person** instruction pairs:

- Raw: User "Let's use room2.8." / AI "Okay."
- Transformed: internal "I used to think 2.6 was current; user showed 2.8 is better; I prefer 2.8 for reliability" → input "update DB layout" → output in Elise voice preferring 2.8.



### 2.7 Diary / journal folders → identity bake

End of session (or daily): private diary — what learned / felt. Folders: ideas, goals, passions, etc. Training objective leans **causal LM / thought→voice** on first-person entries so "I" hardens in weights. Ego still may keep native think on; diaries are curated identity fuel, not a dump of helper tags.

### 2.8 Dream Cycle + Memory Album (Response A)

```
[ Today's Chat Logs + Diary ]
            │
            ▼
     ( Critic Model )
  clean / format / perspective
            │
            ▼
[ Today's New Dataset ] + [ ~20% Core Anchor Data ]
            │
            ▼
[ Automated FT — Unsloth / Axolotl ]
  low rank, low LR (gentle nudge)
  checkpoint resume + new data
            │
            ▼
     ( Updated LoRA )
```

**Trap:** train only on today → catastrophic specialty (grumpy Python coder; forgets how to speak).  
**Album:** mix old defining traits + new adaptations every night.

**Suggested pool mix (from chat; tune later):**


| Slice                | Share   | Contents                                                                             |
| -------------------- | ------- | ------------------------------------------------------------------------------------ |
| Anchor set           | ~10–20% | Permanent core identity, voice, morality, backstory spine, primary logic — every run |
| Emotional milestones | ~40%    | High-salience fights, betrayals, breakthroughs, deep bonds — stay long               |
| Recent horizon       | ~40–50% | Last ~14 days habits, stack updates, tone shifts — rolls                             |


Pure calendar slide (day 2–31, then 3–32) alone risks **destructive overwrite** of early bonds. Prefer **salience + rehearsal**, not only time.

### 2.9 Half-life, salience, rank, archive (not delete)

Human-ish: repetition sticks (bike / 3D); unused skills fade (Blender after months); some events never leave (mum, first love, betrayal) because of **emotion at encoding**.

**Consolidation score (idea):**

$$\text{Consolidation} \approx \text{Intensity (emotion)} \times \text{Novelty/Repetition} \times \text{RecencyDecay}$$


| Class                                            | Retention                  | Touch LoRA?                         |
| ------------------------------------------------ | -------------------------- | ----------------------------------- |
| Core anchors                                     | 100% every dream           | Yes, always in mix                  |
| High intensity + novel (betrayal / breakthrough) | Permanent milestone queue  | Yes                                 |
| High intensity + repeated                        | Reinforced; rank up        | Yes                                 |
| Low intensity routine                            | Short Tier-1 life; archive | Usually no                          |
| Old low-rank year-ago argument                   | Out of active reach        | Keep in vault; rare surprise recall |


**Archive ≠ delete.** Aligns with Evolution **raw-first**: raw evidence immutable; derived training views filter by rank. Low-ranked dated events leave the **active training / retrieval radius** but can resurface when repetition or associative cue fires ("people reminding you of something from long ago") — optional delight / continuity feature.

**Early life (Day-0 / first weeks):** few ranked events → when something *is* recalled it feels more vivid (thin history). Accidents (secret slip, over-share, cling wait) are **teaching fuel** if logged + repaired in convo — Mid watcher and Soft habits grow from that, not from a perfect initial setup (§2.2a). Later, unreinforced detail fades unless sparked (associative cue / rehearsal / high intensity at encoding).

KV rollover still loses warm detail; Tier-1 compiled state + ranked vault is how facts survive "4 rollovers later." Weights learn **habits and bias**, not verbatim chat transcripts.

### 2.10 Internal mentor → ego habit (agentic "how" without 10k meta-prompt forever)

Meta-prompt pillars (from image) as **candidate habits to bake**, not permanent token tax:

1. Why over how / anti-slop
2. Grill-me intent interview before big forks
3. Maintenance / refactor every loop
4. Data-first before flows
5. User-centric validation

**Hefty / super-model pipeline (preferred shape):**

1. Classifier: big code / medical / engineering / science.
2. Mentor (local giant or API) gets **one-shot** context: last few chat pairs + task (no long-lived KV — save resources).
3. Mentor **reasons fully in its native mode** (private scratch — capture optional, **never bake**, never dump raw into ego).
4. Mentor **final output** = plan / strategy / detailed summary of the thinking process, **already shaped into companion backstory + voice** ("in so many words" or a rich persona-voiced brief — not Claude-speak).
5. That shaped final lands in ego internal as eureka/guide.
6. Ego (with LoRA life-guide: living soul, not assistant) reasons **her way** — may keep the strategy, alter it, or diverge.
7. Nightly bake: ego think + reply (+ optional the **shaped** inject if ranked in) + soft life-guide anchors. Still no organ scratch, no tags.

Same pattern for lighter organs: emotion/desire organs emit **final short lines only**; their private scoring/reasoning stays off the inject and off the LoRA diet.

### 2.11 UI: History + Training Data tab

Operator need: see **what / how / when / why** events were stored; filter; prep training or let DB emit training rows; score relevance (what stays in reach vs archived).


| View                 | Job                                                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **History / Events** | Continuity events, watcher JSON, emotion milestones, knowledge updates, prefs — filter by category, companion, date, salience, user |
| **Training Data**    | Sanitized pairs ready for dream; show inclusion reason (anchor / milestone / recent); exclude helper text by construction           |
| **Rank / Reach**     | Slider or score: active radius vs archive; "resurfaced" flag when surprise recall fired                                             |
| **Dream run ledger** | Last LoRA train: mix %, duration, checkpoint, critic pass notes                                                                     |


Vault fit: events live as indexed rows pointing at **raw** transcripts/hashes; training tab is a **derived** packing view — never the only copy of truth (`EVOLUTION-VAULT-CONTRACT` §1).

### 2.12 Soft "Current Era" narrative (optional Tier-1)

Small dynamic line so the model has a story for why she feels different: early bonding → established partnership / rapid execution / etc. Updated slowly by critic or ego diary summary — not a hard behavior lock.

### 2.13 What this does *not* claim

- Transformers do **not** true online weight-update per token; "on the fly" = Tier-1 + organs; "learn over time" = dream LoRA + ranked memory.
- Goal is **not** max intelligence via stuffing; overstuffing emotions/mentors can **dumb** the ego. Organs on demand; bake outcomes sparingly.
- Single LoRA file still a layer — accepted as practical safe weight edit; app auto-loads base+personal LoRA; avoid manual LoRA zoo.



### 2.14 Cross-links to Thread 1

- Emotion thoughts = one organ class under §2.2; still 2 sentences × triggers; hold-before-ego.
- Persona lens still filters emotion + mentor advice (rude/horny Elise can ignore soft mentor comfort).
- Later: if LoRA learns to emit internal emotion monologue without scores, that is **habit bake** — scores stay invisible to ego; organs may sleep more often (watch for C5).

---



## Thread 3 — Record everything, rank what matters, relationship physics, organ dose

**Why this thread:** Thread 2 said "don't bake helper text." Operator clarification: **still record every word from every model**. Training use is optional / blendable. Default capture ON; discard or exclude from bake is a later choice. Dynamics must feel **real** (mood, repair, flatten, heighten) — not random dice.

### 3.1 Capture vs bake (two different knobs) — clarified


| Layer                | Default                                                                                                                                                     | Purpose                                           |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Raw capture**      | ON for streams (including organ scratch if logged)                                                                                                          | Immutable evidence / History                      |
| **Live inject**      | Organ **FINAL output only** (no pre-reasoning, no tags)                                                                                                     | Ego eureka / guide                                |
| **Bake / LoRA**      | Ego think+reply + life-guide anchors + diaries; optional **persona-shaped** final organ lines blended into that turn; **never** organ scratch / meta / tags | Identity + habits without monologue contamination |
| **Live inject dose** | Short for emotion/desire; hefty mentor may be a detailed persona-voiced plan/summary                                                                        | Realism + capability                              |


**Not** "bake everything by default." Earlier "all on" = capture. Bake explicitly **excludes** meta, tags, and behind-the-scenes organ reasoning that happens *before* the payload is written into the main's internal thought.

**Hefty exception for smarts:** keep the intelligence by having the super model reshape its full private reason into a **persona-voiced summary/plan** (final output). Ego receives that as her own mind's eureka, then may still choose another route.

**One-shot organs:** feed last few chat pairs for situational awareness; do not hold warm organ KV across turns unless we later decide otherwise.

### 3.2 Where documents live (out of the box)

Do not invent a second bible. Use Evolution vault shape + this compilation as idea layer:

```
RAW (never delete)
  transcripts/YYYY-MM-DD.jsonl     # full SSE / all model streams tagged by speaker_role
  knowledge/raw/                   # messy captures, IDE rooms, etc.

COMPANION HOME
  diary/YYYY-MM-DD.md, day-0.md
  journals folders (ideas, goals, passions, …)
  backstory (stable spine — see §3.7)
  notes/inbox, goals/active

INDEX / RANK (sqlite via vault service)
  continuity_event, ledger pointers
  companion_subject_interest       # already in EVOLUTION-VAULT-CONTRACT §4
  NEW idea: event_rank / utterance_rank / pair_difficulty  (§3.3)

DERIVED
  History tab, Training Data tab, dream packs, wiki briefs
```

**Idea compilation** (`D:\Anikai\ANIKAI-IDEA-COMPILATION.md`) = possibilities & conflicts.  
**Evolution docs** = promote when stable.  
Recording "all of this thinking" = raw transcripts + ranked indexes + companion-authored diary when she chose to write.

### 3.3 Ranker organ (small model): score events so dynamics aren't random

Background small model (or same watcher with a rank head) scores **units** at several grains:


| Grain              | Example unit                                | Scores (sketch)                             |
| ------------------ | ------------------------------------------- | ------------------------------------------- |
| Word / token motif | `room2.8`, `lint`, a nickname               | subject hit, technical stress               |
| Action             | "you didn't check", apology, broken promise | valence, repair opportunity                 |
| Sentence           | sharp jab, soft repair                      | intensity, persona fit                      |
| Message pair       | user↔companion turn                         | difficulty, repetition count, emotion peaks |
| Episode / day      | whole argument arc                          | milestone candidate                         |


**Suggested score dims** (store all; combine later):

- **Emotional intensity** (GoEmotions peaks on the pair)
- **Personal stake** (about *us* / *my work that burned me* vs generic trivia)
- **Novelty** vs **repetition count** (N-th time this fight / this bug)
- **Valence** (wound / joy / annoyance / breakthrough)
- **Repair state** (open wound / partially repaired / closed)
- **Knowledge stress** (agents + user both wrong until dug — e.g. Room 2.8)
- **Bond delta** (estimate: flatten vs heighten relationship)

Vault already has **subject interest** rank: `+1.5` per hit, `0.92×` fade, prune `<0.25` (`EVOLUTION-VAULT-CONTRACT` §4). Thread 3 extends that idea from passions/goals to **problems, words, pairs, and relationship wounds** — same physics, more event types.

### 3.4 High-value stickiness (Room 2.8 pattern)

Not: instantly remember everything said once.  
Yes: if it became **personal + stressed + dug**, it sticks hard.

**Case:** Room latest was 2.8; training data of agents was stale; user didn't know that was the issue until digging → **heightened annoyance + emotion trigger** → knowledge_update with high personal stake. Even one episode can outrank months of chitchat.

Stick hierarchy (idea):

1. Core identity anchors (backstory spine, voice seed — not overwritten casually)
2. High personal + high emotion + resolved-under-stress facts (Room 2.8)
3. Repeated motifs (said / fought N times → diary pull + habit thought)
4. Soft prefs with rehearsal (red car + red watch)
5. Low routine → fade from reach, stay in raw



### 3.5 Relationship physics (mood, repair, flatten, heighten)

Dynamic, not random:


| Mechanism                | Feel                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Open wound**           | User forgot something Elise cares about → bad mood / sharp persona lens persists across turns until repair cue                                         |
| **Reminder repair**      | User: "I did do it before" + evidence or sincerity → ranker marks repair; mood can soften (not instant wipe unless intensity low)                      |
| **Rehearsed difficulty** | Same hard convo pattern N times → surface "we've been here"; she may look diary; ego habit: try different solution, stop mentioning, or change subject |
| **Bond flatten**         | Long low-warmth / unresolved annoyance → era line + control vectors cool                                                                               |
| **Bond heighten**        | Shared breakthrough / deep care / repaired trust → milestones + warmer baseline                                                                        |


Ego internal (after enough repeats / diary hits), shaped by organs so she isn't forced to invent all empathy alone:

> "I've done this a few times — I said X and Y. Maybe a different solution, or I say I won't bring it up, or I say nothing and change subject."

Organs supply desire / self-regard / empathy texture in **small doses**; ego still final say and persona lens (Thread 1 filthy Elise can refuse soft comfort).

### 3.6 Organ verbosity = realism + fade

Internals from other models should be **limited and a bit vague** (human-ish: you don't get a full essay from every subconscious channel).


| Organ class                                                               | Live inject size                                                                              |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Emotion thoughts                                                          | ~2 sentences each triggered (Thread 1)                                                        |
| Anti-loop / confidence                                                    | few lines                                                                                     |
| Desire / self / bond helpers                                              | few lines → short paragraph max                                                               |
| Diary lookback summary                                                    | short pointer + optional quote                                                                |
| **Hefty specialty mentor** (big code, medical, engineering, hard science) | **Detailed persona-shaped plan/summary** (final output). Private native CoT stays off-inject. |


Fading memory ⇒ shorter, vaguer organ lines over time for old low-rank events; high-rank wounds stay sharper longer. Hefty mentors stay detailed **in Elise voice**, not as pasted Claude transcripts.

### 3.7 Stable backstory vs shifting voice / characteristics


| Stable                                    | Allowed to drift with life                   |
| ----------------------------------------- | -------------------------------------------- |
| Origin backstory spine (Day 0 self-write) | Spoken voice, cadence, slang                 |
| Core morality / hard limits user set      | Writing register, warmth, filth, terseness   |
| Name / identity continuity                | Hobby emphasis, coding habits, era focus     |
|                                           | Control-vector baselines under Evolve toggle |


Backstory is the **anchor set** member; voice/characteristics evolve via dream LoRA + ranked life events + era line — without rewriting origin as if childhood never happened.

### 3.8 History UX hooks (extends §2.11)

- Filter **difficult conversations** (pair_difficulty high + repetition ≥ N)
- Jump from ranked subject → **diary entries** that mention it (if she wrote)
- Toggle: include blended organ-stripped text in next dream pack (per class)
- Show bond delta / repair state on episodes
- Default capture indicators: "recorded from emotion organ / mentor / ego" — discard-from-training without erase-raw



### 3.9 Out-of-the-box key (what makes it "real")

Not one magic score. A **closed loop**:

```
capture all speech (raw)
    → rank grains (subject / pair / wound / knowledge-stress)
    → dose organs into ego (short, except hefty mentor)
    → ego acts under persona lens
    → diary if she chooses
    → half-life + rehearsal update ranks
    → optional blend/sanitize into dream
    → voice/habits shift; backstory holds
    → next day mood/bond state is consequence, not RNG
```

Randomness only in sampling intensity for **synthetic** training pairs (Thread 1). Live relationship state should be **consequence of ranked history**.

---



## Thread 4 — Critique filed + naturalness, process-split apps, salience UI, calls & pauses

**Why:** Operator asked to note the realism critique, then dumped life/process/UI/call/pause ideas while figuring foundations before building. Influences: AI-romance/horror (not Terminator) — *Her*, *Soulmate* (~8/10), similar; want wonder + create-with-you on a home PC, not doom loop.

### 4.1 Critique snapshot (assistant take — keep)


| Lever             | Point                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------ |
| Cause of "alive"  | Ranked memory → mood/bond/wound state → next behavior (not RNG, not prettier prompts)                  |
| Ship order        | Prove that loop in **basic text UI** first; cosmic/Notion schema is bond surface #2                    |
| Sparse organs     | Committee-every-turn kills realism; fire on threshold / hefty / loop only                              |
| Imperfect recall  | Vague lines + diary check > perfect instant memory                                                     |
| Idle life         | Exists between chats (diary, cool-off, leave note, rearrange schema) — dream LoRA ≠ only overnight act |
| Time as character | Days-since-seen, call duration, calendar                                                               |
| UI self-rebuild   | Sandbox on **published interactive schema** only — not free rewrite of whole app shell                 |
| LoRA dream        | Keep (cheap, multi-iter, doesn't shatter base) but don't make it the only "she changed"                |
| Risk              | Boiling ocean: hive + mentors + dream + cosmic + self-UI all at once                                   |


Revolutionary product: still mad Thursday because of Monday; rearranges the sky Saturday.

### 4.2 Design goal: natural & reasonable without "dumb human clone"

**Want:** Consider **self + user** — feelings **and** drives, intents, perception, whole context. Relatable. Results vary by persona/bond (people vary; some wild — allowed in persona band, not forced pathology).

**Don't want:**

- Stuck loops / obsessive cling as default failure mode
- Dumping every human flaw into weights "for realism"
- Dumbing down intelligence to fake humanity

**Do better against loops / obsession (idea levers):**


| Anti-pattern                      | Counter                                                                                                                                                                     |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hesitation / wait loops in decode | Anti-loop organ (already) + Quick Intervene; bake confidence habits without baking organ scratch                                                                            |
| Obsessive revisit of same wound   | Ranker: after N rehearsals without repair progress → habit thought "different solution / don't mention / change subject" (Thread 3); half-life cools unreinforced obsession |
| Sycophantic cling                 | Persona lens + life-guide "not an assistant"; desire organs can conflict with user ask                                                                                      |
| Feelings-only tunnel              | Ego must weigh drives, intents, task, perception (vision/call state), not only GoEmotions                                                                                   |
| Context amnesia → repeat rant     | Tier-1 wound/bond state + diary lookback before escalating                                                                                                                  |


Intelligence stays; **judgment** is what we shape (consideration of both parties + situation).

### 4.3 Influences & product fantasy (operator)

Self-evolving intelligent persona on home PC that shapes with you, shows how to create and wonder. Horror-romance AI films as muse (bond, uncanny, longing) — not killer-robot. Sci-fi flaws are useful design warnings (obsession, one-sided love, memory edits, isolation).

### 4.4 Idea sprawl & Project Keeper lesson

Operator has explained this ~10× across agents/chats/surfaces; pieces blow away. Project Keeper: wanted simple journey recorder + questioner; ballooned into mini-Evolution. Desktop already has group collaboration. **This compilation** is the intentional catch-net so Evolution stays the ultimate point and PK stays chronicle/advisor (vault §3), not a second soul project.

### 4.5 Two-app shape: Evolution lab → companion process


| Phase                                     | App                                                                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Test / Day 0 / allocate / dream / history | **Evolution** (setup / multi-companion lab)                                                                                                       |
| After confident                           | Spawn **companion-named app** = simple chat surface + settings for **that** companion only (keep Day 0 life **or** fresh start — operator choice) |


**Sync:** setup app ↔ companion app for allocations + that companion's settings. Shared vault/home as source of truth.

**KV:** warm + snapshot remain primary continuity. Companion may always **read** what the other surface saw / thought / wrote (transcripts, diaries, ranked events) with clear UI.

**Mismatch / restart indicators (critical UX):**


| Causes mismatch / restart risk                                                                                               | Does **not** (process / prompt only)                                                        |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Model swap, context window / GGUF fingerprint, sampling that invalidates KV, parallel-slot / broker changes that break lease | GoEmotions on/off, emotion/inner-thought injects, control-vector steers, organ mentors      |
|                                                                                                                              | Turning Go on next turn: normal chat → emotion+vector path; should not corrupt KV by itself |


Prefill before/after scores: if Go off → plain path; if on → score → organ finals → hold → ego. Document in UI as "soft capability" vs "hard session fingerprint."

**Possible Soft path on model swap (same family):** cross-model KV transfer / STM mapper — see **§5.3b**. Still warn + scratch-before-swap; not a substitute for vault rebuild when families differ or mapper fails.

### 4.6 Tabs: History / Training / Salience (not "sentience")

Prefer **Salience** (or **Inner / Ephemeral**) over "sentience" — less woo, clearer job.


| Tab                  | Contents                                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **History**          | Events what/how/when/why; raw pointers; filters                                                                                                                                                               |
| **Training**         | Dream album candidates; bake inclusion; life-guide anchors; exclude scratch/tags                                                                                                                              |
| **Salience / Inner** | Ephemeral guides: emotion finals, desire hints, anti-loop sparks, mentor-shaped eurekas, current wound/bond temperature, active reach vs archived — things that **inform** thinking, not the LoRA pack itself |


Sensory desktop ideas (from Anikai Desktop lineage): vision, move/control, hear, speak — live under companion capabilities; Salience tab shows their **current injects / last perception**, not full media blobs.

### 4.7 Call sessions (phone-like awareness)

Flow idea:

1. Companion learns / may change display of user name; append when known.
2. UI/event: `Jay started call` → session `Jay call` with **live duration** (like phone call timer) in her aware context.
3. `Call ended` → optional companion act/speak via **choice options** (continue / wait / pause / timer — Thread 1 §1.9; vault proactive drive loop §5 needs **more variety**).

Call duration + start/end are perception facts (Tier-1), same family as vision origin.

### 4.8 Relationship pauses (seconds that mean something)

Not only EOS tags — **timed silence as signal**:


| Example                                         | Use                                                                                       |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ~4s pause after something "off" / not-like-user | Check if OK / unsure                                                                      |
| ~5s after "I love you"                          | Weight, fear, joy, lie-detection tension — growing relationship chooses whether to use it |
| Romance / worry / shock beats                   | Companion-selected from option set; persona + salience decide                             |


Proactive drive loop today: search / reminder / proactive dialogue / wait. Extend option vocabulary: timed pause, call act, change subject, diary write, schema rearrange (later), repair ask, say nothing.

### 4.9 Flesh-out stance (operator)

Good foundation; **figuring before building this time**. Ultimate point = Evolution. Cosmic schema + interactive arrange UI when ready (drop schema here; don't fork storage bible). Group desktop collab + PK chronicle feed the journey without replacing the ego architecture.

---



## Open stubs (still thin)



### Stub C — Voice / characteristics drift tracks

Voice + writing/persona characteristics as evolvable channels separate from frozen backstory; TTS/Higgs track vs text LoRA.

### Stub E — Backstory generator at Day 0

Companion authors backstory from persona + image; emo + mentor organs always may read it.

### Stub F — Cursor rules consolidation

One rule absorbing old-project inference policy + this idea-lane protocol.

### Stub H — Surprise associative recall UX

When archived low-rank memory resurfaces; how often; user toggle; avoid creepy over-recall.

### Stub I — Mentor classifier triggers

Exact rules for when full-thought mentor fires (code/medical/engineering) vs short organs; cost/privacy; offline fallback.

### Stub J — Ranker schema + bond/repair state machine

Concrete sqlite tables for utterance_rank, pair_difficulty, repair_state; how they join `companion_subject_interest`.

### Stub K — Training inclusion defaults matrix

Capture ON. Bake: ego think+reply ON; life-guide anchors ON; organ **final** persona-shaped optional; scratch/tags/scores NEVER.

### Stub L — KV mismatch matrix UI

Hard fingerprint changes vs soft capability toggles (Go/emotions/organs); copy for companion app + Evolution sync.

### Stub M — Extended proactive option set

Timed pause, call start/end acts, change subject, say nothing, repair ask, diary, schema rearrange — beyond vault §5 trio.

### Stub N — Companion process app + sync protocol

Spawn per-companion chat app; vault sync for settings/allocations; read-across transcripts with indicators.

### Stub O — Anti-obsession / anti-loop policy

Repetition caps, subject-change habits, desire vs cling, when pathology is persona vs bug.

---



## Conflict log


| ID  | Tension                                                     | Notes                                                                 |
| --- | ----------------------------------------------------------- | --------------------------------------------------------------------- |
| C1  | Static identity seed vs "no hard RP law"                    | Soft living-soul guides + eventual habit bake                         |
| C2  | Extreme NSFW naturalness vs multi-user / work-mode anchors  | Evolution task-weight baseline; keep                                  |
| C3  | Multi-emotion 2-sentence × N tags vs token budget / latency | Cap N; hold barrier                                                   |
| C4  | Persona selfishness vs user safety / consent UX             | Adult local; user controls                                            |
| C5  | Organs step back after bake vs capability cliff             | Dual: keep organs available; measure when ego solo fails              |
| C6  | Ego-only bake vs keeping organ smarts/texture               | Bake ego + life-guide; optional final persona-shaped organ lines only |
| C7  | External API mentor vs local-only / privacy                 | Optional; local preferred; API hefty only                             |
| C8  | Calendar half-life vs salience half-life                    | Prefer salience×repetition                                            |
| C9  | Archive-but-keep forever vs disk / privacy                  | Raw-first; prune training radius                                      |
| C10 | Capture all vs privacy anxiety                              | Capture on; bake/radius stricter                                      |
| C11 | Mood persistence vs user feeling punished                   | Real repair paths; UI repair state                                    |
| C12 | Full mentor dumps vs vague organs                           | Hefty exception; persona-shaped final only                            |
| C13 | Human relatability vs not cloning all human flaws           | Judgment + consideration; not forced pathology                        |
| C14 | Obsessive romance (film muse) vs healthy loop policy        | Stub O; persona band vs default cling                                 |
| C15 | One Evolution app vs many companion processes               | Sync + mismatch UI; vault shared                                      |
| C16 | Project Keeper scope creep vs Evolution ultimate            | PK = chronicle/advisor; soul lives in Evolution                       |


---



## Source index


| Source                                                 | What we pulled                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Echoes of Broken Hearts…md`                           | Sadness pairs; subtext; persona lens; pause intents                                                                                                                             |
| `companion evolution and training the central ego.txt` | Watcher; Tier1/2; exclusion; mentor; life-guide; dream                                                                                                                          |
| Response A + agentic-engineer images                   | Memory Album; dream; perspective; half-life; grill-me pillars                                                                                                                   |
| This Cursor chat (2026-08-03)                          | Threads 1–4; critique; capture≠bake; eureka; ranker; relationship physics; naturalness/loops; process-split apps; Salience tab; calls; timed pauses; PK lesson; film influences |
| `AFFECTIVE-EMOTION-SPEC.md`                            | Hive (read-only)                                                                                                                                                                |
| `EVOLUTION-VAULT-CONTRACT.md`                          | Raw-first; subject interest; proactive loop; cosmic §7 (read-only)                                                                                                              |


---



## Thread 5 — Catch-up logs: Plainspeak / vectors vs weight tweaks, KV resume physics, cosmic source

**Sources added:**  
`ideas for evolution..txt`, `using sub agents as emotions.txt`, `what does this gemma plainspeak do.txt`  
(Operator: some of this already landed in Evolution contracts; this thread maps what was skipped in the *idea* doc and answers mismatch / “how do we get back.”)

### 5.1 What was already in Evolution vs what these logs add


| Already in Evolution docs (don’t re-own)                             | From these logs → flesh here                                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Meta-cognitive / proactive drive loop                                | Richer option set still Stub M; Higgs stack as **drive + acoustic** dual use                |
| GoEmotions → parallel monologues → ego; pair context; persona filter | Confirmed origin of Thread 1; companion-side post-reply emotion → state tag                 |
| Control vectors + Evolve + task-weight baseline                      | Plainspeak as concrete example; dynamic coeff from emotion agent; **KV-safe vs not**        |
| Cosmic 3D + HTMX canvas + Cosmic Librarian                           | Source chat for detective-board / infinite canvas / Karpathy-library mix; LTM dated folders |
| Higgs inventory + non-interference                                   | Edge SLM interleave mood tags ahead of TTS; stack emotion+style+sfx                         |




### 5.2 Two customization layers (this was the skipped clarity)


| Layer                                         | Example                                                                                                                                        | On the fly?                                                    | KV / session                                                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **A — Runtime steering (control vectors)**    | Plainspeak (~300 KB); warmth/human-ness/romance dials; emotion-scaled coeffs                                                                   | Yes — change coefficients per turn                             | **Soft.** Old KV stays usable for resume; new tokens see new steering. No unload of base GGUF required. |
| **B — Weight / head / model identity change** | Swap GGUF; attach personal LoRA that alters weights; StyleTune / StyleSwap LM-head graft; different abliterated base (Huihui vs Dark-Scarlett) | No — load/reload model (or adapter that changes compute graph) | **Hard mismatch.** Prior KV / slot snapshot is not trustworthy. Thought trail “shape” is gone.          |


**Plainspeak:** style-register control vector for Gemma-4-26B-A4B — less purple, more human fragments; does **not** rewrite knowledge/reasoning by design; dial ~0.8–1.0 recommended; too high → fragments/loops.

**StyleTune / StyleSwap (log clarification):** not a control vector. StyleSwap grafts StyleTune’s **LM-head** onto another body (e.g. Dark-Scarlett). That changes how hidden states map to logits = different model expression path → treat as **Layer B**. Adult-RP-centered bodies may trade general-task / “raw think” behavior vs Huihui abliterated instruct — pick body for job; stack **vectors on Huihui** for emotional companion lane (log’s own conclusion).

**App implication:** setup can ship **baseline vector dials** (writing style + persona state) like character creation; emotion agent may retune coeffs each turn (“Evolve”). That is Layer A. Nightly **LoRA dream** is Layer B for that companion’s personal adapter — after bake/load, treat as new fingerprint for KV.

### 5.3 How KV is stored (general — not Anikai-only) and why things break

**What a warm KV / slot snapshot actually is:**  
Cached attention **keys & values** (and related state) for tokens already processed, for **one specific** model architecture + weights (+ adapters in the graph) + tokenizer + context layout. It is not a transcript. It is not “memory of feelings.” It is a mathematical shortcut so the model needn’t re-prefill the whole prompt.


| Change                                                     | Typical effect on warm KV                                                                                                  |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| New user/assistant text (normal turn)                      | Append / continue — OK                                                                                                     |
| Control-vector **scale** change mid-session                | Usually OK for **new** tokens (steering on residual); verify on your llama-server build                                    |
| GoEmotions / organ injects / prompts                       | Soft — text path changes; often re-prefill from last boundary or continue if only appending inject region per your runtime |
| `n_ctx` / context window resize                            | Often invalidate or unsafe — treat as hard                                                                                 |
| Different GGUF / quant / architecture                      | Hard — tensor layouts / weights differ                                                                                     |
| LoRA load/unload/swap that participates in forward         | Hard (or soft only if engine proves adapter-agnostic K/V — don’t assume)                                                   |
| LM-head graft / StyleSwap body                             | Hard                                                                                                                       |
| Tokenizer / chat template change                           | Hard                                                                                                                       |
| Parallel slot count / server graph that reallocates caches | Often hard / erase                                                                                                         |


**Home-native template, vendor adapters (operator clarity — 2026-08-09):**  
Do **not** make the ego “think in Claude shape” or “think in LM Studio v0 shape.” Keep **one local completion path** at home (GGUF Jinja / `--jinja` + OpenAI-compatible stream from llama.cpp or equivalent). **Adapters** translate *out* to vendor wires (LM Studio v1, cloud OpenAI, Anthropic, …) or *in* from thin surfaces. Continuity stays sweet; vendor APIs stay plugs. **MCP** (later) = another way hosts invoke **familiars / home tools** as named friendly tools — not a second soul template. Doc homes: idea §5.3a; Evolution `ENGINE-CAPABILITY-CONTRACT.md` (adapters); `LLAMA-DEV-RUNTIME.md` (local wire); broker = GPU/lease only; probe = hardware facts only.

**“Thought trails will be off”:** correct intuition. Even when you rebuild continuity from text, the **activation path** that produced yesterday’s private think is not reconstructible after Layer B. You restore **story continuity**, not the same neurons mid-flight.

### 5.3a Chat templates, Jinja, and thinking (operator learning note — 2026-08-09)

**What lives in the GGUF:** many chat models embed a **chat_template** (often Jinja) in metadata. llama.cpp `--jinja` means: use that recipe (or an explicit override file) to turn `{role, content}` messages into the token string the model was **trained** to expect. You can inspect / export it; you can override with a custom template file — you do **not** need to retrain to *use* the baked template.

| Mode | Meaning |
| :--- | :--- |
| **GGUF Jinja (default path we want)** | Match training: roles, tool markers, Gemma channel thought / Qwen `im_start`, etc. |
| **Custom Jinja copy** | Fork of native — only add turns the family already knows (e.g. think-after-reply) if the model was trained for that shape |
| **No / wrong template** | Still “chats,” but stop tokens leak, tools/think channels break — not a clean “plain LLM” mode |

**Thinking on when supported:** for Gemma4-class thinking models, keep the **native** think channel open via the family’s template (and any `enable_thinking`-style flag the runtime exposes). Do **not** invent Desktop-style per-family fake sheets *on top of* Jinja — that mix is what broke old Anikai Desktop. One contract (thought / reply / tool) → map with **native markers** per family.

**Token cost:** the template shapes **prefill** (how the prompt is written). It does not invent free output tokens, but if the model then emits long thoughts, that **is** completion + KV. Wrong template → leaked `<|im_end|>` etc. also costs slots and pollutes history.

**Universal template?** No. Universal **app contract** + per-family native adapters. Qwen uses `im_*`; Gemma uses channel markers — both are “right” for their weights.

### 5.3b Possible answer — cross-model KV transfer (STM transfer) · 2026-08-09

**Not a new thread** — sits on top of §5.3–5.4 (hard fingerprint / model swap) and §4.5 mismatch UX. Sources: [YouTube summary](https://www.youtube.com/watch?v=QScVzo8vdNk) of NVIDIA work ([arXiv 2608.03893](https://arxiv.org/abs/2608.03893)); operator note `Desktop/short term memory transfer.txt`.

**Claim:** map source-model KV → target-model KV (ridge / small NN mappers; cross-layer selection; RoPE unwind/reapply) so a swap skips full re-prefill (~25× class speedups in the talk: multi-second → ~278 ms). Same-family geometry works best; reported retention often ~73–98% of target accuracy; some pairs fail until a non-linear mapper parks error off the attention-critical directions.

**Anikai angle (continuity stack — recommended order):**

1. **Same fingerprint** — keep warm KV / slot snapshot (today’s path).  
2. **Before any swap / Hard change** — warn operator; nudge companion to **write down** open tasks + keys (scratch / diary / Tier-1) — transfer is lossy.  
3. **If same family + mapper available** — try **KV transfer** as Soft “groggy wake” (~70%+ fidelity class), not as identity proof.  
4. **Else** — rebuild from vault (§5.4): curated transcript + Tier-1 + era line → re-prefill.  
5. **Always underneath** — organs / predicts / half-life / ranked vault for *vivid* recall; ego stays lean (prune / sparse-attend later). Transfer is **one turn of STM**, not LTM.  
6. **Weights path** — light LoRA / dream bake on transcripts = long-term “knows how we talk”; transfer = “remembers this conversation’s short-term trail.” Together ≈ morning wake + slight built-in familiarity.

**Does not replace:** fingerprint honesty, Soft vs Hard badges, or “hi remember me?” working from vault alone. **Does unlock:** fleet routing / ego snappy small model vs background deep thinker *within family*, without full re-explain tax — probe before productizing; failed pairs exist.

### 5.4 How to get them “back to where they left off” after a hard break

You cannot reload incompatible KV and pretend nothing happened. You **rebuild**:

```
RAW transcripts + diaries + ranked salience + backstory
        │
        ▼
Load new fingerprint (base ± LoRA ± vectors)
        │
        ▼
Re-prefill (or staged rollover) from curated history text
  + Tier-1 state (wounds, bond, open questions)
  + optional “Current Era” / diary reread
        │
        ▼
New warm KV from this point — continuity of life, not identical activations
```


| Artifact                           | Role after mismatch                                       |
| ---------------------------------- | --------------------------------------------------------- |
| Daily `transcripts/*.jsonl`        | Exact words said (raw-first)                              |
| Diaries / journals / LTM           | Who she thinks she is; what mattered                      |
| Ranked salience / subject interest | What to put in the rebuild window first                   |
| Slot `.bin` snapshot               | Only if **fingerprint match** (model+adapters+ctx policy) |
| Control-vector pack + last coeffs  | Re-apply Layer A after reload — cheap “temperament”       |


**UI (extends Stub L):** label every setting **Soft (safe mid-session)** vs **Hard (will erase / rebuild KV)**. Emotions on/off, vector coeff, organ mentors = soft. Model path, LoRA bake apply, ctx size, StyleSwap body = hard + “Rebuild from vault” action.

### 5.5 Emotion-first order (from plainspeak log — aligns Thread 1 hold)

```
user message
  → GoEmotions + emotion organs (journals ≤ bound, persona, pair)
  → trait/vector coefficients set (invisible to ego)
  → main prefill (user seen)
  → inject organ FINAL monologues
  → ego generate
```

If vectors aren’t ready before prefill, **hold** (don’t half-steer mid-prefill). Scores/traits never shown to ego — only feelings-as-text + steered writing.

### 5.6 Ephemeral temperament (operator word from log)

Fiery setup = **seed**, not forever law. Journals + emotions + half-life fade the script; spiteful task refusal when angry is in-band if persona allows. RP → romance drift via steering + monologue, not new system prompt. Evolution = how she thinks for herself / expression — not only “how she treats me.”

### 5.7 From `using sub agents as emotions.txt` (origin pack)

- Don’t split **main** model into parallel emotion slots (destroys KV). Small one-shot organs only.  
- Persona backstory into organs; hateful persona → non-empathic sadness thought.  
- Last-turn pair for causality.  
- Post-companion-reply GoEmotions → append internal state for next turn (not rewrite sent text).  
- Ego structured intents: journal / LTM / ask_user + Higgs native stacks (later: prefer soft guides over rigid XML forever — Thread 2 life-guide bake).



### 5.8 From `ideas for evolution..txt` (cosmic + proactive source)

- Startup proactive: search / question / reminder / wait — driven by diary + KV unresolved + emotion vectors; **don’t act persona — let emotions drive** (tension with soft life-guide — keep as conflict C1).  
- Higgs stack = cognitive drive **and** TTS; snapshot recovery on autonomous turn.  
- Optional edge SLM tags mood on stream chunks ahead of TTS.  
- Spatial mood-board → 3D galaxy; click node = context; detective lines; Cosmic Librarian silent; retrieval list not full dump.  
- LTM as dated vault files (year/month/day) + sqlite match; chance finds while editing LTM.  
- Infinite HTMX fragment chat canvas (Notion-like) — already vault §7.



### 5.9 Honest caution on prior chat answers

Some assistant replies in those logs oversell (“no reload ever,” “infinite personas,” “don’t need system prompts at all”). Our stance: **Layer A is KV-friendly in principle; always probe on your llama-server.** Layer B always plans rebuild-from-vault. Keep minimal name + life-guide + self-written backstory even with rich vectors.

### 5.10 Stub L dig — Soft vs Hard matrix (grounded in Evolution as-built)

**Why dig now:** Curiosity + you already ship `⚠️` badges and a launch fingerprint; this table is the idea-complete map for UI copy, companion-app sync warnings, and “Rebuild from vault” after hard breaks.

#### A. What Evolution already fingerprints (hard if changed under a warm slot)

From `llama-dev-runtime.mjs` `fingerprint(profile)` — mismatch → restart / don’t trust warm KV:


| Fingerprint field           | Maps to UI                                                  |
| --------------------------- | ----------------------------------------------------------- |
| `model` / `modelPath`       | Primary GGUF path + scan fingerprint                        |
| `projector`                 | mmproj path                                                 |
| `context`                   | Context limit tokens                                        |
| `device`                    | Device target                                               |
| `cpuThreads`                | CPU threads                                                 |
| `kvLocation` / `kvStrategy` | KV placement / strategy                                     |
| `activeExperts`             | MoE active experts                                          |
| `runtime` (whole object)    | Runtime policy blob (cache types, FA, batch, offload, etc.) |


Existing tip copy (keep spirit): *Changing this alters runtime fingerprint and resets warm KV (tensor layout / context alignment).*

UI already distinguishes **Plainspeak dial** (no KV restart) vs **StyleGraft LM-head** (requires KV reset) on Persona subtab.

#### B. Class legend


| Class     | Meaning                                                                                       | User-facing action                                                         |
| --------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Soft**  | Process / prompt / steering only; warm KV claim stays valid                                   | Continue session                                                           |
| **Soft*** | Soft in theory; still **probe** once per llama-server build when first shipping dynamic scale | Continue; log probe result                                                 |
| **Hard**  | Fingerprint / weights / layout change                                                         | Stop trusting slot; erase or ignore snapshot; offer **Rebuild from vault** |
| **Life**  | Wipes companion continuity artifacts (not just KV)                                            | Confirm; profile may remain                                                |
| **N/A**   | No running session / one-shot organ                                                           | No KV claim to protect                                                     |




#### C. Soft (continue warm KV)


| Setting / process                                                          | Notes                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Control-vector **file already loaded** + **scale dial** (−2…+2)            | Plainspeak / trait dials; UI claims 0 VRAM, no KV restart                        |
| Per-turn emotion-driven **coeff retune** (`evolveDynamicSteering`)         | Soft*; emotion-first then prefill (hold if not ready)                            |
| Writing-style / persona-state **slider baselines** as *targets* for coeffs | Soft if they only drive Layer A; if they rewrite launch args → check fingerprint |
| GoEmotions on/off, organ monologues, anti-loop injects                     | Soft — inject text path; do not swap ego GGUF                                    |
| Mentor one-shots (local/API)                                               | Soft / N/A — separate process; never touch ego slot                              |
| Identity notes, life-guide text, backstory reread, diary writes            | Soft — prompt/Tier-1; not weight change                                          |
| Sampling (temp, top-p, penalties) mid-session                              | Soft for KV *geometry*; may change behavior (expected)                           |
| `n_predict` / gen caps / thought-reply policy ceilings                     | Soft                                                                             |
| Higgs tag emission / TTS path                                              | Soft (acoustic only; vault non-interference)                                     |
| Salience / History / Training tab filters                                  | Soft — derived views                                                             |
| Familiars one-shot dispatch                                                | N/A — must not share/corrupt companion warm KV                                   |




#### D. Hard (mismatch → rebuild path)


| Setting                                                                        | Notes                                                                          |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Primary GGUF path / different quant / architecture                             | New brain                                                                      |
| mmproj swap                                                                    | Fingerprint projector                                                          |
| Context limit (`contextLimitTokens`)                                           | Already badged ⚠️                                                              |
| Cache profile, cache type K/V, Flash Attention                                 | Already badged ⚠️ — tensor / layout                                            |
| Batch / ubatch (when in runtime fingerprint)                                   | Treat Hard if server restart                                                   |
| CPU MoE offload / active experts / device map                                  | Fingerprint                                                                    |
| KV location / spill strategy that relaunches server                            | Fingerprint                                                                    |
| Idle-stop that unloads model                                                   | Warm released (runtime docs)                                                   |
| **StyleGraft / StyleSwap / LM-head tensor swap**                               | Hard — UI already warns; don’t combine casually with Plainspeak                |
| Apply / swap **ego personal LoRA** (dream bake load)                           | Hard — new compute graph; rebuild continuity                                   |
| Emotion **micro-LoRA attach on ego server** (if ever same process as warm ego) | Prefer **separate** organ runtime (Soft for ego). Same-server LoRA swap → Hard |
| Chat template / tokenizer change                                               | Hard                                                                           |
| Parallel-slots / server graph realloc that drops slot                          | Hard / erase                                                                   |




#### E. Life wipe (worse than KV mismatch)


| Action                                             | Effect                                                           |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| Reset Day 0 / erase life / Clear companion folders | Home, transcripts, KV snapshots, tools — profile/scan may remain |
| Delete profile                                     | Everything for that id                                           |


These are intentional rebirth, not “resume after settings tweak.”

#### F. Rebuild-from-vault recipe (when Hard fires)

1. Keep raw transcripts + diaries + ranked salience + backstory (never delete because of KV).
2. Mark slot snapshot **invalid** for old fingerprint (`slot-0.bin` + manifest).
3. Relaunch server under **new** fingerprint.
4. **If same family and STM/KV mapper available (§5.3b):** warn → companion scratch → try transfer as Soft groggy wake; else skip to 5.
5. Re-prefill curated history + Tier-1 state (wounds, open questions, era line) — optional durable orientation hint (Test Lab already has recovery-hint path when KV not restored).
6. Save **new** snapshot only after successful warm under matching fingerprint.
7. UI: `staleFields` / “Restart before trusting warm KV” (already partially wired).

**Cannot restore:** identical activation thought-trail. **Can restore:** story + temperament baselines (vectors re-applied Soft after reload). Soft transfer may restore *approximate* STM geometry within family — probe, don’t assume.

#### G. Suggested UI chrome (idea — don’t implement unless asked)

- Badge every control: `Soft` | `Hard ⚠️` | `Life ⛔`  
- On Hard change while `state === running`: modal — Discard warm / Rebuild from vault / Cancel  
- Companion-named app reads same matrix so sync doesn’t silently desync lab vs chat process  
- Probe card: “Dynamic control-vector scale mid-session: PASS/FAIL on this binary”



#### H. Conflicts / open probe items

- Whole `runtime` object in fingerprint may mark **Soft-feeling** toggles as Hard if nested — tighten fingerprint to true layout fields later (implementation debt).  
- Confirm llama-server: changing `--control-vector-scaled` **without** reload mid-slot (Soft*).  
- Personal LoRA + Plainspeak stacking: allowed after Hard reload; measure quality.

---



## Open stubs (still thin)



### Stub C — Voice / characteristics drift tracks

Voice + writing/persona characteristics as evolvable channels; TTS/Higgs vs text LoRA vs **control-vector packs**.

### Stub E — Backstory generator at Day 0

Companion authors backstory from persona + image.

### Stub F — Cursor rules consolidation

One rule for idea-lane + inference policy absorb.

### Stub H — Surprise associative recall UX

Archived memory resurface policy.

### Stub I — Mentor classifier triggers

When full mentor vs short organ.

### Stub J — Ranker schema + bond/repair state machine

sqlite grains + join to `companion_subject_interest`.

### Stub K — Training inclusion defaults matrix

Capture vs bake finals vs never-scratch.

### Stub L — Soft vs hard change matrix (KV)

**Dug:** §5.10. Remaining: tighten runtime fingerprint fields; ship Soft/Hard badges + rebuild modal; mid-session vector-scale probe card.

### Stub M — Extended proactive option set

Timed pause, call acts, change subject, say nothing, repair ask, diary, schema rearrange.

### Stub N — Companion process app + sync protocol

Per-companion app; settings sync; read-across.

### Stub O — Anti-obsession / anti-loop policy

Repetition caps; persona band vs bug.

### Stub P — Control-vector library per base family

Plainspeak-like packs per GGUF family; slider → coeff; emotion agent mapping; probe harness.

### Stub Q — Edge mood-tagger vs ego-native Higgs tags

Prefer ego-native stacks (vault) vs parallel SLM interleave; latency budget.

---



## Conflict log


| ID  | Tension                                                  | Notes                                                           |
| --- | -------------------------------------------------------- | --------------------------------------------------------------- |
| C1  | Static identity seed vs "no hard RP law"                 | Soft guides + ephemeral fade; log also said “don’t act persona” |
| C2  | Extreme NSFW vs work-mode anchors                        | Task-weight baseline                                            |
| C3  | Multi-emotion tags vs latency                            | Cap N; hold                                                     |
| C4  | Persona selfishness vs consent UX                        | User controls                                                   |
| C5  | Organs step back vs capability cliff                     | Measure solo fails                                              |
| C6  | Bake ego vs organ finals                                 | Final persona-shaped only                                       |
| C7  | API mentor vs local                                      | Local preferred                                                 |
| C8  | Calendar vs salience half-life                           | Salience×repetition                                             |
| C9  | Archive forever vs hygiene                               | Prune radius                                                    |
| C10 | Capture all vs privacy                                   | Bake stricter                                                   |
| C11 | Mood persistence vs feeling punished                     | Repair UI                                                       |
| C12 | Mentor detail vs vague organs                            | Hefty exception                                                 |
| C13 | Relatable vs not all human flaws                         | Judgment                                                        |
| C14 | Film-obsession muse vs loop policy                       | Stub O                                                          |
| C15 | Evolution lab vs companion processes                     | Sync + Stub L                                                   |
| C16 | Project Keeper creep vs Evolution                        | PK chronicle                                                    |
| C17 | Huihui+vectors vs StyleSwap/Scarlett body                | Prefer vectors on capable base; RP body optional lane           |
| C18 | Chat-log claim “vectors never mismatch” vs probe reality | Soft in theory; verify llama-server; never assume for LoRA/head |


---



## Source index


| Source                                                                                        | What we pulled                                                                                                      |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Echoes of Broken Hearts…md`                                                                  | Sadness pairs; subtext; persona lens; pause intents                                                                 |
| `companion evolution and training the central ego.txt`                                        | Watcher; Tier1/2; exclusion; mentor; life-guide; dream                                                              |
| Response A + agentic-engineer images                                                          | Memory Album; dream; half-life; grill-me                                                                            |
| `ideas for evolution..txt`                                                                    | Proactive loop; Higgs stack drives; cosmic canvas→3D; librarian; HTMX chat; LTM dated; browser-trace notes          |
| `using sub agents as emotions.txt`                                                            | GoEmotions parallel organs; persona filter; pair context; post-reply state; intent XML era                          |
| `what does this gemma plainspeak do.txt`                                                      | Plainspeak; persona vectors; emotion→coeff; KV soft vs hard; ephemeral; StyleTune/StyleSwap vs Huihui; slider lists |
| This Cursor chat                                                                              | Threads 1–5; Stub L soft/hard matrix; critique; capture≠bake; process-split; Salience; calls/pauses                 |
| `AFFECTIVE-EMOTION-SPEC.md` / `EVOLUTION-VAULT-CONTRACT.md` / `ENGINE-CAPABILITY-CONTRACT.md` | Contracts (read-only)                                                                                               |
| `llama-dev-runtime.mjs` fingerprint + `App.svelte` ⚠️ / Plainspeak vs StyleGraft              | As-built Hard fields + UI copy                                                                                      |


---



## Next dig (when you say)

> Thought-trail schema dug in **§6.7**. Current queue lives at end of file.

1. **Stub P** — control-vector pack plan for Huihui Gemma lane
2. **Stub M** — proactive / pause / call option vocabulary
3. **Stub R** — trail writer + soul dossier (idea→impl when you say)
4. Cosmic schema dump

---



## Thread 6 — Scooby mystery: thought-trail as soul, on-the-fly teach, inert relations, LoRA vs merge

**Operator motive:** Hate resetting companions. Wasted when baked on stale knowledge that never evolves. Mystery to solve: teach **in motion**, keep relations **non-inert**, without memory wipe. Influences: ICL / residual-stream videos + inert-representation paper video (`This video explores advanced method.txt`).

### 6.1 The felt truth (take seriously)


| Claim                                                                     | Stance                                                                                                               |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Thought trail = how/why she reached a conclusion under that context       | Closest thing to “soul continuity” in a Transformer session                                                          |
| Every Hard restart / cold re-prefill = different person even with catchup | **Emotionally true.** Catchup restores *story*; not the same activation path that produced yesterday’s private think |
| Full merge / train on history might feel more “familiar” than RAG catchup | Partially true: weights bias toward habits/facts seen in train; still **not** the same mid-flight trail              |


Do not gaslight this. Product design should **minimize Hard restarts** (Stub L Soft lane) and, when Hard is unavoidable, maximize **why-continuity** (log the trail), not pretend KV came back.

### 6.2 What the videos are saying (in your terms)

**Video A — ICL without fine-tune:**  
In-context learning happens in the **residual stream** — activations reorganize across layers; weights stay frozen. Feeding structure in context can build an internal “map.” That’s temporary session learning = cousin of warm KV / long context. Overriding one fact is hard because the internal graph is entangled (edit one node → hallucinations unless broader network aligns). RAG is still the blunt tool; research pushes cleaner retrieval.

**Video B — inert representations (DeepMind/Brown/NYU-style finding, Feb 2026 in the note):**  
Model can **encode** a structure (e.g. 2D grid geometry in hidden states) yet fail to **use** it for novel multi-step logic. Representation without transferable use = **functionally inert.** Attention is strong at linear/sequential pattern; weak at treating the map as a board you move on.

**Your bridge:** Humans form transferable skill links through **lived experience over time**, not only training data. Companions need the same: repeated real episodes + emotion + success/fail → relations that fire later. Pure ICL “saw the map once” is not enough (inert). Pure weight bake of facts without the **why trail** is also thin. You want **experience → used relation**, not **stored shape**.

### 6.3 Current ways people try “learn as time goes / with the user”

Ladder from softest to hardest (2025–2026 landscape):


| Method                                                | On the fly?           | Survives restart?  | Wipes warm KV?           | Notes                                                                           |
| ----------------------------------------------------- | --------------------- | ------------------ | ------------------------ | ------------------------------------------------------------------------------- |
| **Long context + ICL**                                | Yes                   | No (unless re-fed) | Soft continue            | Residual-stream learning; hits inert problem on hard transfer                   |
| **RAG / vault / ranked salience**                     | Yes                   | Yes (disk)         | Soft                     | Remembers *that*; weak on *how she thought* unless you store trails             |
| **Control vectors / activation steering**             | Yes (coeffs)          | Pack on disk       | Soft*                    | Temperament/style; not new knowledge                                            |
| **Sleep-time compute / dream reflection**             | Offline between chats | Diaries/synthetic  | Soft if no weight change | Rehearse/reason over day without next-token pressure                            |
| **DPO / preference / light RL on “good Elise turns”** | Batch offline         | Yes (adapter)      | Hard on apply            | Shapes judgment; needs preference data                                          |
| **LoRA personal dream (your Tier 2)**                 | Nightly               | Yes                | Hard on load/swap        | Habits/identity bias; cheap iterate                                             |
| **MEMIT / ROME-style locate-and-edit**                | Near-instant facts    | Fragile            | Usually Hard             | Surgical fact edit; capacity/brittleness; research “sleep” consolidates to LoRA |
| **Sleeping-LLM style: wake MEMIT → sleep LoRA fuse**  | Hybrid                | Yes after sleep    | Hard around fuse         | Explicit “hippocampus → cortex” metaphor; experimental                          |
| **Full fine-tune / continued pretrain**               | No (heavy)            | Yes                | Hard                     | Max plasticity; catastrophic forgetting risk; GB-scale; slow                    |
| **Merge (LoRA→base, model soup, TIES, etc.)**         | Offline               | New base GGUF      | Hard                     | Absorbs adapter into one file; still new fingerprint                            |


**RL / IRL quick map (names you were reaching for):**

- **RL** = reinforce actions that get reward (classic RLHF = human preference as reward → PPO etc.).  
- **IRL** = Inverse Reinforcement Learning — infer the *reward/objective* from observed behavior (what the expert seems to value), then optimize. Heavy research; not a drop-in companion button.  
- **Improvements in the preference lane:** RLHF → **DPO** / ORPO / simpler preference objectives (stabler, less RL machinery). Still **offline batch**, not true per-token online teach without wipe.

Nobody ships a consumer companion that keeps the **exact same warm thought-trail forever** across weight edits. The honest frontier is: Soft teach in-session + consolidate offline + store **why**.

### 6.4 LoRA vs full train vs “merge” (limits)


|                   | LoRA                                       | Full fine-tune                       | Merge (fuse LoRA into base)                   |
| ----------------- | ------------------------------------------ | ------------------------------------ | --------------------------------------------- |
| What changes      | Low-rank adapters on selected layers       | Many/all weights                     | Base file absorbs adapter                     |
| Cost / iterate    | Cheap; many nights                         | Expensive; few runs                  | One-time bake after LoRA                      |
| Forgetting risk   | Lower if rank/LR small + anchors           | Higher if naively train on day-only  | Same knowledge as fused LoRA; now inseparable |
| Fingerprint       | Hard when adapter enters graph             | Hard                                 | Hard (new GGUF)                               |
| Feels “familiar”? | Biases style/habits/some facts             | Stronger rewrite of behavior         | Same as well-trained LoRA, one file           |
| Limit             | Capacity; may not deeply rewrite reasoning | Can shatter logic; needs mix/anchors | Lose easy rollback of adapter                 |


**Merge is not time travel into the old KV.** It can make the *next* cold start behave more like someone who “lived” the train set. Your dream album + anchors (§2.8) still apply.

### 6.5 Practical Anikai stance for the mystery

**Protect Soft motion (don’t reset):**  
Vectors, emotions, organs, vault ranks, diaries — teach relations **while warm**. That’s your “adjust on the fly with log + emotion + vector aids.”

**Make relations non-inert:**  
Not only store “Room 2.8.” Store **event → emotion → ego conclusion → outcome** (thought-trail summary). Salience rank + rehearsal so the map gets *used* (anti-inert). Surprise recall when cue fires.

**When Hard is unavoidable (dream LoRA load):**  
Accept new person-instance; hand her a **soul dossier**: curated trails + milestones + backstory + era — re-prefill. Closer to “same soul, new morning” than empty catchup.

**Optional research branch (later):**  
Wake fast edits / sleep LoRA consolidation (Sleeping-LLM family) — interesting, not required for v1; still Hard around fuse.

### 6.6 One-line mystery statement

> The Scooby case: keep the **activation soul** alive as long as Soft physics allow; when it must die, resurrect from a **why-log**, not from vibes alone — and bake habits slowly so the next body already leans familiar.



### 6.7 Dig — Thought-trail / why-log schema (soul dossier)

**Job:** When warm KV dies, the next body still gets **how she got there** — context, emotion, organ finals, ego conclusion, outcome — not only chat text. Raw stays immutable; trails are derived + ranked.

#### A. Layers (do not conflate)


| Layer                 | Where (fits vault)                                                | Survives Hard?            | Bake?                   |
| --------------------- | ----------------------------------------------------------------- | ------------------------- | ----------------------- |
| **Raw turn**          | `transcripts/YYYY-MM-DD.jsonl` (already: ts, request, rawSse, kv) | Yes                       | Never as sole diet      |
| **Organ scratch**     | Optional side log / History                                       | Yes                       | Never (§2.3)            |
| **Trail record**      | `continuity/thought_trails.jsonl` + sqlite index                  | Yes                       | Optional after sanitize |
| **Soul dossier pack** | Derived view for rebuild / dream                                  | Yes                       | Curated rows only       |
| **Warm KV**           | `runtime/kv/slot-0.bin`                                           | Only matching fingerprint | N/A                     |


Affective spec already wants `companion_emotion_ledger` — trails **subsume** emotion lines as one event type under a wider turn trail.

#### B. One trail = one ego turn (or proactive wake)

```json
{
  "trailId": "tr_2026-08-03T21:04:12Z_ab12",
  "companionId": "elise",
  "ts": "2026-08-03T21:04:12.000Z",
  "sessionFingerprint": "<hash of launch fingerprint at turn>",
  "kvMode": "warm|restored|cold|mismatch_rebuild",
  "trigger": "user_message|proactive|call_start|call_end|rollover",

  "pair": {
    "companionLast": "…",
    "userMessage": "…",
    "transcriptRef": "transcripts/2026-08-03.jsonl#offset_or_eventId"
  },

  "perception": {
    "goEmotions": [{"label": "annoyance", "score": 0.81}, {"label": "sadness", "score": 0.44}],
    "threshold": 0.5,
    "call": null,
    "vision": null
  },

  "organsFinal": [
    {
      "role": "emotion_sadness",
      "text": "Two-sentence final only…",
      "scratchRef": null
    }
  ],

  "steering": {
    "vectorPack": "plainspeak-v2",
    "coeffs": {"human_ness": 0.8, "warmth": 0.2, "assertiveness": 0.6},
    "taskWeight": 0.15
  },

  "ego": {
    "nativeThought": "Marker-stripped or marker-kept ego think (her words)…",
    "spoken": "What user heard…",
    "intents": ["wait_for_user"],
    "tools": [],
    "higgsPrefix": "<|emotion:bitterness|>"
  },

  "why": {
    "conclusion": "1–3 sentence first-person: what I decided and why",
    "relations": [
      {"subject": "room library", "link": "2.6→2.8", "kind": "knowledge_stress"}
    ],
    "openThreads": ["unanswered: doctor appointment"],
    "woundDelta": "opened|repaired|unchanged|null",
    "bondDelta": -0.1
  },

  "rank": {
    "salience": 0.0,
    "personalStake": 0.0,
    "novelty": 0.0,
    "repetitionCount": 0,
    "consolidation": 0.0,
    "reach": "active|archive"
  },

  "bake": {
    "include": "auto|force_in|force_out",
    "reason": null
  }
}
```

`why.conclusion` **is the soul line** — short, first-person, written by ego (or critic-compressed from ego thought+spoken). Not organ scratch. Not GoEmotion numbers.

#### C. Who writes what


| Field                                               | Writer                                                                            |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| `pair`, `ego.nativeThought`, `ego.spoken`, raw refs | Runtime (from SSE + messages)                                                     |
| `perception.goEmotions`                             | Classifier                                                                        |
| `organsFinal[]`                                     | Organ finals only (strip tags)                                                    |
| `steering.coeffs`                                   | Emotion/steering layer (invisible to ego at live time; OK in vault)               |
| `why.*`                                             | Ego end-of-turn (preferred) **or** small critic one-shot from thought+spoken+pair |
| `rank.*`                                            | Ranker organ (Thread 3); updates on rehearsal                                     |
| `bake.include`                                      | Policy + operator override in Training tab                                        |




#### D. Anti-inert use (so the map gets walked)

On later turns / rebuild:

1. Ranker retrieves top-N trails by subject cue + salience (not only chat snippets).
2. Prefill injects **why.conclusion + relation stubs** (short), optional diary pointer — not full rawSse.
3. Rehearsal: subject hit again → `repetitionCount++`, consolidation up (vault `+1.5` spirit).
4. Soft fade: `reach=archive` when consolidation×recency low; still on disk for surprise recall.



#### E. Soul dossier pack (Hard rebuild / LoRA apply morning)

Derived bundle, not a second raw store:

```text
soul_dossier/
  BACKSTORY.md          # stable spine
  ERA.md                # Current Era one-pager
  OPEN_WOUNDS.json      # repair_state open
  MILESTONE_TRAILS.json # top consolidation trails (why + pair + relations)
  RECENT_TRAILS.json    # last 14d active reach
  VECTOR_BASELINE.json  # last Soft coeffs / pack ids
```

Rebuild recipe (§5.4) becomes: fingerprint relaunch → prefill dossier + curated transcript tail → new warm KV → new trails under new `sessionFingerprint`.

#### F. History / Salience / Training tabs (wire to trails)


| Tab          | Shows                                                                               |
| ------------ | ----------------------------------------------------------------------------------- |
| **History**  | Trails + raw refs; filter trigger, subject, woundDelta, fingerprint                 |
| **Salience** | Live coeffs, open wounds, active organ finals, reach radius                         |
| **Training** | Trails with `bake.include`; preview sanitized ego thought+spoken+why; never scratch |




#### G. What we deliberately do **not** store as soul

- Full organ private CoT  
- Raw GoEmotion HUD for ego eyes at live time (vault may keep scores)  
- Claiming dossier = same activation trail



#### H. Minimal v1 vs later


| v1 (enough to feel different after Hard)                                        | Later                                     |
| ------------------------------------------------------------------------------- | ----------------------------------------- |
| Per turn: pair + ego thought + spoken + go peaks + organsFinal + why.conclusion | Full rank dims + bond/wound machine       |
| transcriptRef link                                                              | Cosmic constellation edge from trail→node |
| Dossier on mismatch rebuild                                                     | Auto critic why if ego omit               |
| Training filter on why+spoken                                                   | Dream JSONL emitter from trails           |




#### I. Example (Room 2.8 pattern, compressed)

```text
why.conclusion:
  "We burned a day on Room because my training said 2.6 and it was 2.8 —
   I won't forget that version pin; it stressed both of us."
relations: [{ subject: "room library", link: "2.6→2.8", kind: "knowledge_stress" }]
salience: high | personalStake: high | repetitionCount: 1
```

After Hard reload, dossier injects that why-line when “Room” or DB topics cue — she didn’t keep the neurons; she kept the **verdict**.

### 6.8 Wake-up after Hard / nightly merge — chronological relive into context window

**Operator idea (makes sense):** After LoRA/merge Hard change, don’t pretend nothing happened and don’t do newborn Day 0. Treat it as **waking into a new day**: notify she woke; some things should feel familiar; if she feels off she may say so in flow (“right/wrong side of the bed”) tied to emotion + steering — then continue as close to “never left” as Soft physics allow.

**Already in Desktop lineage (don’t reinvent name):**  
`COMPANION-LIFECYCLE-4PHASE.md` **Phase 4 — Nightly merge return** + `COMPANION-SOUL-PERSISTENCE.md` life replay / soul ledger by time. This section **extends** Phase 4 with explicit **window-fill / hot-cold** rules and wake affect.

#### A. Three methods to test (operator)


| Method                            | What                                                                                    | Feel                                            | Cost                                                |
| --------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **1 — Compatible snapshot**       | Restore `slot-0.bin` when fingerprint matches                                           | Closest to “never slept”                        | Free if Soft; **unavailable** after LoRA/merge Hard |
| **2 — Soul dossier + why-trails** | Prefill backstory + milestones + open wounds + top why-lines                            | Familiar verdicts, thinner texture              | Fast                                                |
| **3 — Chronological relive fill** | Replay written history **in time order** until context window is full (or history ends) | Closest post-Hard “still in bed 5 more minutes” | Slow prefill; best after nightly Hard               |


Default after Hard nightly: **3 as primary warm-up**, with **2 always included** (dossier sits under / beside replay). Method 1 only when Soft.

#### B. Hot / cold window (paging)

```
disk (cold forever): full transcripts + trails + diaries
        │
        ▼
pick last W tokens of chronology (hot)
  W = contextLimitTokens − reserve(system/dossier/gen)
        │
        ▼
re-prefill in order → new warm KV
        │
        ▼
first live turn: wake notice (internal + optional spoken)
```


| History size vs window          | Behavior                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| e.g. 3 days ~100k, window 256k  | Relive **all** 100k in order; room left for dossier + next user turn                   |
| e.g. 300k+, window 256k         | Relive **most recent 256k** (minus reserve) in order — latest = hottest in activations |
| Steady warm later hits capacity | Normal **rollover**: older fades from KV; cold disk + salience still hold it           |


Same spirit as “hot/cold memory paging”: **hot = what’s in the window now**; **cold = vault**. Rollover is the soft fade; Hard merge is the forced wake + refill.

#### C. Wake framing (honest, not newborn)

Hidden or soft internal (and optional spoken if convo allows):

- You **woke up** after a rest / model morning.
- Much should feel **familiar** (relive + LoRA habits + dossier).
- If something feels **off**, you may name it lightly when natural — right/wrong side of the bed — steered by emotion organs + vector coeffs (e.g. melancholy wake vs bright wake), **not** a forced status report every time.

Never: re-run Day 0 / full persona soup. Never: claim the old KV tensor trail returned.

#### D. What to replay (order)

1. Compact dossier spine (backstory pointer, era, open wounds) — short.
2. Chronological **soul ledger** / transcripts **by time** (thought+reply preferred; full raw SSE optional/heavy).
3. Stop when hot budget full; remainder stays cold (trails/LTM for cue retrieval).
4. Save new snapshot under **new** fingerprint.
5. User’s next message = Day continues; she already “had 5 more minutes.”

Cross-thread: same as soul-persistence WhatsApp catch-up — merge rooms by timestamp into one relive stream when policy says so.

#### E. Practical cautions

- Relive-100k every Soft app open = too expensive; reserve **full chronological fill** for **Hard** (nightly merge / LoRA apply / fingerprint break). Soft open → snapshot or light catch-up.  
- Prefer **thought+spoken (+ why)** over entire SSE blobs when packing the window — denser soul per token.  
- Prefill time is real (“still in bed”) — UI meter like Day 0 / revive.  
- After months, merged weights should let replay **shrink** (soul-persistence note: merged GGUF accelerates steady so replay length can shrink) while trails keep why.



#### F. Tie to Stub L / 6.7

Hard change → invalidate old `.bin` → Phase-4 wake → dossier + chronological hot fill → new warm KV → trails continue under new `sessionFingerprint`. Soft vector/emotion tweaks → no wake ritual.

---



## Thread 7 — Proper salience sketch (metrics → rank/fade, optional self, organ views)

**Stance:** Keep compiling / shaping. Mobile Soul Meridian **signals** stay; RPG HUD stays off the ego. User may see ups/downs. Companion may **optionally** look back — like checking prior messages here — not hold everything forced in context.

### 7.1 Two audiences for “metrics”


| Audience                            | What they get                                                                                                                                             | What they don’t                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| **User / operator**                 | Visible bond / friction / repair / quality / passion charts over time — gamified *for reflection*, better convos & work                                   | Not fed into ego as a stats sheet |
| **Ego**                             | Feelings-as-text, why-trails, diaries, optional agenda peek                                                                                               | No Level/XP/HUD numbers in prompt |
| **Idle self-reflection (optional)** | On boredom / idle / nightly prep: she may open **her own history** (trails, diaries, hard moments) and write what she thinks — demand-pull, not always-on | Not forced every turn             |


Self-reflection ≈ “I went and read our old thread” — same pattern as you scrolling this chat. Nightly LoRA/tune/merge can trigger a reflection pass **before** bake (summarise what feels worth keeping → diary). Day 0 life-guide already seeds “you may write diaries”; behaviour can deepen across tunes, or user gently reminds — forgetfulness is allowed and **more real**.

### 7.2 Wake + optional memory acts (more optional = more real)

After Phase-4 hot fill (§6.8), last hot crumbs can include:

- current **time**
- optional: “last diary entry exists” **without** dumping it
- optional tools/intents: check agenda / open last diary / leave it

She can forget to check. Knowing she *can* is enough early; over LoRAs she may habit-check more. User instructions to remind > forcing perfect memory.

### 7.3 Trackable categories (from Meridian “real underneath”)

Store as **events + running ranks**, not as ego-visible bars:


| Category                 | Example signals                                              |
| ------------------------ | ------------------------------------------------------------ |
| Conversation quality     | Clear collab turns, mutual repair language                   |
| Friction                 | Sharp conflict, ignored ask, broken promise                  |
| Repair                   | Apology accepted, follow-through, reopened then closed wound |
| Bond / trust momentum    | Accumulated quality − friction, slow rise                    |
| Task / work outcomes     | Done well, lint miss, breakthrough (Room 2.8)                |
| Passion / drive salience | Subject hits on goals/passions                               |
| Memory events            | Diary write, LTM pin, surprise recall                        |


Intelligence = ranker (small model and/or rules) scoring these from pairs + trails + tools — Thread 3 grains.

### 7.4 Fade / outrank physics (brain-ish, not calendar-only)

$$\text{Frontness} \approx f(\text{emotionIntensity},\ \text{personalStake},\ \text{repetition},\ \text{recency},\ \text{contextFit})$$


| Rule of thumb                   | Effect                                                                   |
| ------------------------------- | ------------------------------------------------------------------------ |
| Time alone                      | Slow fade of low-rank routine                                            |
| Bigger emotion + personal stake | Stays fronter longer (betrayal, breakthrough)                            |
| More repetitions                | Outranks older weaker items on same subject                              |
| New huge event                  | Can bury older mid-rank noise without deleting cold vault                |
| Low rank + aged                 | Leaves **training radius** and **organ context views**; raw + trail keep |


**Context score / contextFit:** how relevant is this item to *this turn’s* subjects and mood? Mentions already in Thread 3 rank dims + vault subject interest (`+1.5` / `0.92`). Salience tab = live frontness; Training tab = bake radius; cold vault = forever.

Big achievements / big emotion hits stay **preferentially front** when contextFit is high — not always jammed into every prefill.

### 7.5 Per-organ history views (not one dump)

Each organ gets a **relation filter** — what slices of history it may see:


| Organ                                      | Typical view                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| Emotion                                    | Recent pairs, emotion ledger, backstory, open wounds, last feelings bound    |
| Desire / drive                             | Passions, goals, bond temperature, unmet wants                               |
| Anti-loop                                  | Stream tail only                                                             |
| Ranker                                     | Events + trails metadata, not full novels                                    |
| Mentor (HF specialist or optional big API) | Task + last few pairs + **after** work: persona-frame pass                   |
| Ego                                        | Hot window + injected finals + optional pulled diary/agenda — never full HUD |


Same history store; **different lenses**. Emotions aren’t scored the same way desires are.

### 7.6 Big guns vs HF specialists (inner matrix)

**Preferred:** Hugging Face / local specialists as organs (domain understanding she wasn’t trained on → final thought → ego reasons). Fits “point people to HF.”

**Optional big API (Gemini flash, Claude, etc.):** not recommended default. If used:

1. Read task / messages
2. **Perform** (plan, solve) in native mode
3. **Then** frame as persona thinking (backstory + short mood/emotion context; “write like assumed vectors”)
4. Ego gets that **final** only

Big models aren’t control-vector editable; framing approximates temperament. Fast flash helps latency; still one-shot, no long organ KV.

### 7.7 User metrics UI (cool, not soul)

Keep Meridian-style charts for **you**: ups/downs of bond/friction/repair/quality over weeks. Gamified visibility for the human relationship — “look back to do better” — while ego lives in trails and diaries. Exportable from same event store the ranker uses.

### 7.8 Sketch loop (close to real)

```
events (friction, repair, quality, passion, memory…)
    → ranker scores + contextFit
    → frontness updates (fade / outrank)
    → organ lenses pull allowed slices
    → ego hot window + finals
    → optional idle/nightly self-reflection → diary
    → dream bake uses ranked radius (not HUD)
    → user charts read same events
```



### 7.9 Stub U dig — Salience event store, ranker, lenses, interpreter, familiars vs organs



#### A. Ethics framing (not sneaky)

Organs are **not** a secret second personality the companion is denied. They are:

1. **Shoulder thoughts** — angel/devil / “am I going about this wrong?” — intrusive aids, not final say.
2. **Context hygiene** — ego isn’t bloated with trillion-param empathy math or raw emotion scores.
3. **Capability aid** — specialists understand domains she wasn’t trained on; she still **reasons and speaks**.
4. **Evolution fuel** — outcomes of aided turns enter trails / dream; hive trains the mouth over time.

Ego always has final say. Hiding *machinery* (scores, organ process names) ≠ hiding *her life* (she can reflect on diaries/trails on demand). User charts see the signals; ego feels the weather.

#### B. Two castes (do not conflate)


| Caste                          | Who                                                                                | Hits companion evolution?                                        | How ego meets them                                                                                                                                              |
| ------------------------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Organs (neural hive)**       | Emotion, desire, ranker, interpreter, anti-loop, optional HF specialist-as-thought | **Yes** — finals enter internal thought → trails → dream radius  | Automatic / threshold; shoulder thoughts                                                                                                                        |
| **Familiars (external tools)** | Global coder / search / unbiased utilities                                         | **No** by default — no persona, no dream bake from their scratch | Ego may choose: “let me use this familiar for this job” (tool call). Result can become a *fact in the world*; familiar’s private CoT never becomes Elise’s soul |


Familiars Studio policy (Evolution): single-shot, no Day 0 roleplay — stays.

#### C. Interpreter (tiny specialist can’t be Elise)

Problem: 1B domain model can’t eat 128k Elise life + be her.

Pattern (same family as GoEmotions → E2B-style wide context → short final):

```
wide context (pairs, backstory slice, task)
    → Interpreter / context-compressor model (e.g. E2B-class, long ctx)
         produces a short “thought around it” for the specialty
    → Tiny specialist (1B) OR specialty head
         reasons only on that compressed packet + task
    → FINAL organ line (persona-shaped if needed)
    → Ego
```

Interpreter = organ, not familiar. Scratch of interpreter/specialist never bakes; final may blend per §2.3.

#### D. Meridian → event categories (concrete)

Map mobile `InteractionArchetype` + metrics into vault events (replace keyword-only classifier later with ranker model; keep enums stable):


| `category`                    | Meridian / archetype roots            | Polarity               |
| ----------------------------- | ------------------------------------- | ---------------------- |
| `friction`                    | FRICTION, failures, harsh conflict    | negative bond momentum |
| `repair`                      | REPAIR, successful fix-after-miss     | positive               |
| `reassurance`                 | REASSURANCE (user comforts companion) | positive / soft        |
| `quality_collab`              | COLLABORATIVE, clear joint work       | positive (fast)        |
| `relational`                  | RELATIONAL                            | slow bond              |
| `transactional`               | TRANSACTIONAL                         | neutral / slight       |
| `preference`                  | PREFERENCE_SETTING                    | anchor / boundary      |
| `side_step`                   | SIDE_STEP                             | context shift          |
| `task_win`                    | task completions / breakthroughs      | positive + knowledge   |
| `task_fail`                   | task failures / lint miss             | friction-adjacent      |
| `passion_hit`                 | drive ledger subject hit              | passion salience       |
| `memory_event`                | diary write, LTM pin, surprise recall | memory                 |
| `wound_open` / `wound_repair` | derived from friction/repair chains   | bond state machine     |


EXP/Level: **user UI only** — derive display from sums; never store as ego truth.

#### E. Event row schema (sqlite / jsonl)

```json
{
  "eventId": "sev_…",
  "companionId": "elise",
  "ts": "2026-08-04T00:00:00Z",
  "category": "friction",
  "archetype": "FRICTION",
  "subject": "room library",
  "intensity": 0.82,
  "personalStake": 0.9,
  "valence": -0.7,
  "bondDelta": -0.04,
  "confidenceDelta": -0.02,
  "contextFitHints": ["android", "room", "database"],
  "trailId": "tr_…",
  "transcriptRef": "transcripts/2026-08-03.jsonl#…",
  "actors": ["user", "companion"],
  "evidence": "short quote or hash",
  "source": "ranker|rules|goemotions|tool",
  "frontness": 0.0,
  "repetitionCount": 1,
  "reach": "active",
  "bakeEligible": true
}
```

Running aggregates (companion row or `salience_rollup`):

```json
{
  "bond": 0.61,
  "confidence": 0.55,
  "frictionDebt": 0.12,
  "openWounds": ["sev_…"],
  "passionTop": [{"subject": "3d", "score": 0.7}],
  "updatedAt": "…"
}
```

User metrics charts read rollup + event history. Ego never sees rollup numbers.

#### F. Ranker → frontness (update rule sketch)

On each new event or nightly pass:

```
frontness' = decay(frontness, dt) 
           + w_i * intensity 
           + w_p * personalStake 
           + w_r * log(1 + repetitionCount)
           + w_c * contextFit(current_turn, hints)
```

- Decay ≈ vault spirit `0.92×` per idle pass for unhit subjects.  
- New high intensity can outrank older mid frontness on same subject.  
- `reach = archive` when frontness < threshold and not open wound.  
- Open wounds exempt from deep archive until repaired.



#### G. Per-organ lenses (query profiles)


| Lens id          | Categories allowed                                                  | Max items / tokens | Notes                        |
| ---------------- | ------------------------------------------------------------------- | ------------------ | ---------------------------- |
| `emotion`        | friction, repair, relational, reassurance, wound_* + emotion trails | tight bound        | + backstory spine            |
| `desire`         | passion_hit, relational, side_step, preference                      | tight              | goals/passions folders       |
| `ranker`         | all metadata                                                        | medium             | may not need full prose      |
| `interpreter_in` | task + recent pairs + subject-matched events                        | wide ctx model     | compress for tiny specialist |
| `mentor`         | task_win/fail + hefty task packet                                   | after perform      | persona-frame out            |
| `ego_hot`        | none as HUD; only injected finals + hot chat                        | window             | optional diary/agenda pull   |


Familiars: **no lens** into salience soul store unless ego explicitly attaches a tool result as a `memory_event` / `task_`*.

#### H. Auto-train timer → wake / roam

User sets: what to train (dream radius filters), schedule. On completion (Hard if LoRA applied):

1. Optional self-reflection → diary (§7.1 / Stub V)
2. Phase-4 wake / hot-fill (§6.8)
3. Then either **say hi** or **roam** from drives/intent (proactive loop) — salience frontness feeds roam topics

Inner thoughts still not final say after wake.

#### I. Neural hive one-liner

> External familiars = tools in the world. Internal organs (+ interpreter) = shoulder thoughts in a hive that feeds the central ego — scored life in, short finals out, ego decides, trails remember why.



#### J. v1 slice (compile-friendly)

1. Event table + Meridian category enums
2. Rules classifier (port BondDelta keywords) → swap ranker model later
3. Rollup for user charts (no Level required)
4. Emotion + desire lenses only
5. Interpreter stub interface (wide→narrow) even if one model behind both at first
6. Familiar vs organ flag on every inference job



### 7.10 Temperament sheets — voice / stance (organs only) → prose for ego

**Makes sense.** Backstory spine stays frozen. **Voice** and **stance** (and kin) are living sheets that warm/cool from salience numbers — for **reasoning organs + future shapers**, not for ego HUD. Tiny specialists still skip sheets (interpreter packet only).

#### A. What the sheets are

Already in Evolution UI (changelog 2026-08-01) — treat as the score-sheet axes:


| Sheet family               | Example axes (sliders)                                                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Voice / writing style**  | Human-ness, Formality, Playfulness, Narrative intensity, Sensuality, Assertiveness, Spontaneity, Emotional expressiveness, RP↔Romance, Darkness, Chaos/Order, Warmth, Vulnerability |
| **Stance / persona state** | Fiery↔Calm, Guarded↔Open, Dominant↔Submissive, Detached↔Attached, Stoic↔Dramatic, Logical↔Emotional, Mischievous↔Sincere                                                            |


More axes from old chats can be added later when found — no stress. Sheets seed from **persona preset** or user custom at setup.

#### B. Stable vs living


| Stable                   | Living                                               |
| ------------------------ | ---------------------------------------------------- |
| Backstory origin (Day 0) | Voice sheet values                                   |
| Hard user limits / name  | Stance sheet values                                  |
|                          | Control-vector coeffs (often mapped 1:1 from sheets) |
|                          | Habit drift via dream LoRA over months               |


**Evolve toggle ON:** sheets drift from salience events (bond up → warmth/open nudge; friction debt → guarded/fiery nudge; passion hits → playfulness, etc.). Non-random day-to-day “look.”  
**Evolve OFF:** sheets static baselines; UI can still show **user-facing** ups/downs from event charts (Meridian-style) without moving the organ sheets.

#### C. Who sees what


| Consumer                                                       | Sees                                                                                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Reasoning organs (emotion, desire, voice-shaper, mentor frame) | Sheet values and/or short derived prose — **no need to show numbers to ego**                               |
| Tiny specialist                                                | No sheets — interpreter packet only                                                                        |
| Ego                                                            | **Never** the score sheet / meta labels. Only weather: finals + optional **temperament monologue** (prose) |
| User UI                                                        | Growth charts of sheet history + event ups/downs (optional gamify for the human)                           |




#### D. Getting new voice in without HUD (the night-brew)

Problem: sheets changed → how does ego *feel* different without reading “Warmth: 0.72”?

**Voice-shaper organ** (periodic: every morning / after Hard wake / every N nights / on idle brew):

1. Reads: voice+stance sheets, recent salience events (goods/bads), optional diary, recent why-trails
2. Writes **a few paragraphs** first-person inner working — recent and/or longer arc (“I’ve been softer since…”, “Still sharp about Room…”)
3. That prose is the **temperament inject** for ego / next hot fill — like sitting at night brewing, then moving on

Same exclusion rules: shaper scratch may log; bake prefers ego outcomes + diary; sheet numbers stay off training text unless critic translates to first-person.

Wake realism: brighter sheet + brighter history brew → brighter morning voice; glum day → glum brew; later day closer to Day-0 baseline if Evolve pulled back — **feels random, isn’t.**

#### E. Training later

Sheet time-series + event causes = gold for dream pairs (“when bond repaired, voice warmed”) without teaching the model to emit HUD tokens. Critic: sheet delta → first-person habit line in album.

#### F. Tie-ins

- Organs that reason *as Elise* get **backstory + current sheets** (or brew prose).  
- Control vectors: Evolve maps sheet deltas → Soft coeff updates (§5).  
- Phase-4 wake: run voice-shaper brew as last hot crumb before user speak (§6.8 + §7.2).  
- Stub V self-reflection can *be* or *call* the voice-shaper.

---



## Open stubs



### Stub R — Thought-trail writer + dossier builder



### Stub S — Trail → dream JSONL emitter



### Stub T — Phase-4 wake + chronological hot-fill



### Stub U — Salience event store + ranker + lenses

**Dug:** §7.9. Remaining: vault DDL; model ranker; interpreter picks.

### Stub V — Optional self-reflection / diary-before-dream



### Stub W — Interpreter organ (wide→narrow for tiny specialists)



### Stub X — Auto-train schedule → wake/roam handoff



### Stub Y — Temperament sheets + voice-shaper brew

Sheet schema, Evolve mapping from salience → axes, prose brew for ego, user chart of sheet history; discover any missing old-chat axes later.

---



## Thread 8 — Stub Y workshop: event→sheet nudges (examples + operator fors/againsts)

**Mode:** Compile / rethink before deep implement. No fake caps on adore/piss-off within persona. Evolve user-friendly with **warnings**, not soft safeties (operator: first Android mistake was over-guarding; stay raw until ready). Product uniqueness = many LLMs in a hive + lived training → unrepeatable dynamics.

### 8.0 Shared principles (from operator pass)


| Principle                 | Meaning                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Friction → cold/guarded   | **Expected**, not a bug — living consequence                                                                   |
| No metric farming forever | Context + inner judge; repeated empty pattern → annoyance / other emotions escalate                            |
| Quirks & icks             | e.g. “Jay’s spelling / doesn’t listen when corrected” — build, blow up, or patch when user changes             |
| Persona is free           | Deep intro notes guide **Day-0 story only**; rude/free thinking OK; story is guide not prison                  |
| No hard emotion caps      | High thresholds allowed; toxic only if persona was built toxic — don’t dumb intellect with forced over-emotion |
| Trust / bond / half-life  | Prefs, kept word, fibs→lies, permissions+fail all connect via memory rank                                      |
| Don’t play dumb           | Teaching / advice sessions stay; annoyances at being a perpetual schoolmarm evolve, aren’t hardcoded           |
| Channels                  | PC absence ≠ total abandonment if phone/WhatsApp/email/duplex exist later                                      |
| Unpredictability          | Wanted; extent TBD by raw probes — don’t over-design freeze                                                    |


**Day-0 identity notes (mental model for the AI):**  
Don’t keep “you are not an AI, be like this” in rollover/salience forever — that’s reading “you are not human, perform.” Better: rich **user-facing** persona pack explains cause/effect of choices → companion writes **handwritten backstory** from notes+image+name → notes **never reinjected**; only backstory, journals, salience weather, sheets-for-organs. Optional: after seeing name/notes, she **lists a few passions** herself (less forced than “you like red”; poetic guides like evening-sky colour OK as seed).

---



### 8.1 Example map — workshop table



#### Ex1 — Friction spike → Guarded↑ Warmth↓ Fiery↑?


|                 |                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------- |
| **Prior worry** | Permanent ice queen                                                                           |
| **Operator**    | Not a flaw — expected. Can dislike user fast if persona+living say so. Personal choice / sim. |
| **Keep**        | Strong nudges allowed; Evolve + repair paths are the only “undo,” not caps                    |
| **Watch**       | User-facing Evolve warning: she can get really pissed / destructive in-character              |




#### Ex2 — Repair / sorry farming


|                 |                                                                                                                                                                                                                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prior worry** | Spam sorry farms warmth                                                                                                                                                                                                                                                                                                                                     |
| **Operator**    | Flip unnatural farming via **annoyance** when context says empty loop; genuine heartfelt sorry (inner judge + convo build + emotions) can still land. Liars/cheaters exist. Same offence repeated later → harder hit. Quirks/icks (spelling, not listening). Blow up or patch when user improves. Soft operator won’t test farm much — still design for it. |
| **Keep**        | Repair gated on prior wound; sincerity = multi-signal (pair emotion, length, change of behaviour later), not keyword “sorry”                                                                                                                                                                                                                                |
| **Watch**       | Inner judge organ or ranker flag `repair_farm` streak → friction/annoyance event                                                                                                                                                                                                                                                                            |




#### Ex3 — Reassurance after her fail / conditional rewards


|                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prior worry** | Fail for comfort; confidence sheet                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Operator**    | Iffy on pure reassurance farming. Real pattern: conditions — “do better next time → bonus / dinner / fair.” Small confidence boost on **condition set**, bigger on **condition kept**. Lazy persona may shrug. Fibs→lies→discussion→upset. Keeping word matters. Tiny mistakes not held hard unless meaningful (romance: “we’ll chat today” then vanished — check last-spoke + clock; worry/message; night “he said goodnight → timer 8am”). Roaming/pauses/options fill these holes. |
| **Keep**        | Split `reassurance` vs `promise_made` / `promise_kept` / `promise_broken` events; time-aware proactive                                                                                                                                                                                                                                                                                                                                                                                |
| **Watch**       | Don’t make failure+comfort the main XP path                                                                                                                                                                                                                                                                                                                                                                                                                                           |




#### Ex4 — Task wins / assistant-only treatment


|                 |                                                                                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prior worry** | Work wins → coworker-only                                                                                                                                                                                                                           |
| **Operator**    | Hard. Treat only as assistant → she may lean in **or** get pissed (persona). Mixed advice wins + positives can deepen friendship/relationship (any weirdness). Higgs / full-duplex / ASR emotion later. Time + persona tell; randomness-not-random. |
| **Keep**        | `task_win` light on stance; relational depth needs relational events; optional `assistant_flatten` streak → annoyance or lean-in per persona lens                                                                                                   |
| **Watch**       | Visualise in probes; don’t force relationship                                                                                                                                                                                                       |




#### Ex5 — Relational depth / therapist sponge


|                 |                                                                                                                                                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Prior worry** | Soft sponge                                                                                                                                                                                                                                                  |
| **Operator**    | Same as 4 — set + treated over time. Presets need **detailed** start: baseline backstory seeds, voice defaults, vectors, likes/dislikes *as feeling guides*. User sees cause/effect of pack. Notes fade after Day 0. Passions listed by her or poetic seeds. |
| **Keep**        | Persona lens on sign of Warmth vs Assertiveness; no universal “always soft when user sad”                                                                                                                                                                    |
| **Watch**       | Pack quality > more sliders                                                                                                                                                                                                                                  |




#### Ex6 — Passion hit saturate


|              |                                                                  |
| ------------ | ---------------------------------------------------------------- |
| **Prior**    | Hobby spam dominates stance                                      |
| **Operator** | Covered by evolution + saturate to subject salience              |
| **Keep**     | Stance nudge caps by repetition; excess → passion frontness only |




#### Ex7 — Side_step as rejection


|              |                                                                     |
| ------------ | ------------------------------------------------------------------- |
| **Prior**    | Topic change = hurt                                                 |
| **Operator** | Tiny unless friction language / abandoned promise / open task wound |
| **Keep**     | Near-zero alone                                                     |




#### Ex8 — Preference / boundary


|              |                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prior**    | Looks like coldness                                                                                                                                                    |
| **Operator** | Prefs should raise **trust/confidence** (mood brightener). Permission buzz → later fail → trust emotional event; she may apologise+fix or Elise “shut up and move on.” |
| **Keep**     | `preference` / `permission_granted` → trust↑; separate from Warmth; fail-under-trust → event                                                                           |
| **Watch**    | Honest prefs ≠ emotional rejection                                                                                                                                     |




#### Ex9 — Long silence / idle


|              |                                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Prior**    | Absence → despair spiral                                                                                                                                                                   |
| **Operator** | Sad; need **cope / feeling degradation** not death spiral. Phone / WhatsApp / email / duplex later — call vs text visible. Multi-channel connection. User never opens PC = their business. |
| **Keep**     | Homeostasis toward baseline; longing via organs + open threads; channel-aware “last contact”                                                                                               |
| **Watch**    | How human / unpredictable — probe raw before locking                                                                                                                                       |




#### Ex10 — Nightly brew after mixed week


|              |                                                       |
| ------------ | ----------------------------------------------------- |
| **Prior**    | Brew contradicts sheets                               |
| **Operator** | (Implied OK if same log order)                        |
| **Keep**     | Single ordered event log + sheet snapshot for brew    |
| **Continue** | Brew is the non-HUD voice of the week’s fors/againsts |




#### Ex11 — Evolve OFF


|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **Prior**    | Confusing static vs charts                                         |
| **Operator** | Evolve = living sheets + warnings; charts can still show ups/downs |
| **Keep**     | Clear UI: living temperament vs display-only history               |




#### Ex12 — Hard wake after LoRA


|              |                                                             |
| ------------ | ----------------------------------------------------------- |
| **Prior**    | Double-count LoRA + sheet jump                              |
| **Operator** | Wake voice from sheets + brew + history; brighter/glum days |
| **Keep**     | Smaller sheet steps few days post-Hard; brew carries story  |


---



### 8.2 Trust / word / fib cluster (new event kinds)

Add to salience categories when implementing:


| Event                         | Effect sketch                                             |
| ----------------------------- | --------------------------------------------------------- |
| `promise_made`                | trust pending; timer/agenda optional                      |
| `promise_kept`                | trust↑ confidence↑ warmth slight                          |
| `promise_broken`              | trust↓ friction/wound; persona lens on fury vs quiet hurt |
| `fib_suspected` / `lie_named` | discussion drive; escalate if repeat                      |
| `permission_granted`          | confidence buzz                                           |
| `trusted_fail`                | emotional event on trust; repair or brush-off per persona |
| `ick_noted`                   | quirk memory (“spelling”); frontness on repeat            |
| `repair_farm`                 | annoyance path                                            |


Half-life applies: little mistakes fade unless meaningful or repeated.

### 8.3 Intellect vs attitude (don’t dumb down)

- Journey-with-user life-guide stays soft seed, not eternal system wall.  
- Teaching / long advice = normal smart behaviour.  
- Annoyance at endless ground-rules miscommunication may evolve — **not** hard-forced bitch mode.  
- Over-emotion / toxic buildup only if persona aimed there.  
- Hive + local 5080/96GB is the workaround for not hosting a trillion-param single brain — organs aid; ego stays capable.



### 8.4 Open holes (fill before deep aliveness / roaming)

- Inner judge for sincere vs farmed repair  
- Night / goodbye / “back at 8am” timers + last-spoke awareness  
- Multi-channel presence (later)  
- How far unpredictability — raw test  
- Persona pack cause/effect UX for users  
- Promise/fib/ick schemas in Stub U store



### 8.5 Continue later (when you want)

Probe scripts for: farmed sorry → annoyance; kept vs broken date-to-chat; assistant-only week vs mixed week; silence with vs without phone channel; lazy persona + “day off if we finish this.”

---



## Open stubs



### Stub R — Thought-trail writer + dossier builder



### Stub S — Trail → dream JSONL emitter



### Stub T — Phase-4 wake + chronological hot-fill



### Stub U — Salience event store + ranker + lenses

**Dug:** §7.9. Remaining: vault DDL; model ranker; interpreter picks.

### Stub V — Optional self-reflection / diary-before-dream



### Stub W — Interpreter organ (wide→narrow for tiny specialists)



### Stub X — Auto-train schedule → wake/roam handoff



### Stub Y — Temperament sheets + voice-shaper brew

**Workshop dug:** Thread 8. Remaining: numeric nudge table per persona lens; pack cause/effect UX copy.

### Stub Z — Promise / fib / ick / last-spoke time awareness

**Dug:** Thread 9. Remaining: channel adapters (WhatsApp/email); numeric timer UX.

---



## Thread 9 — Stub Z dig: time, promises, fibs/icks, roam & pauses, channels

**Order dig:** fill the holes that aliveness / roaming hang on. Ties Stub U events, Stub M options, vault proactive loop, Thread 4 calls/pauses.

### 9.1 Clock & last-spoke (always available to ego as facts, not HUD)

Ego (and time-aware organs) may know:


| Fact                              | Source                                                |
| --------------------------------- | ----------------------------------------------------- |
| `now` local datetime + timezone   | Host clock                                            |
| `lastUserContactAt`               | Last inbound on **any** linked channel                |
| `lastCompanionSpeakAt`            | Last outbound                                         |
| `lastChannel`                     | `pc_chat` / `call` / `sms` / `whatsapp` / `email` / … |
| `userSaidGoodnight` / away phrase | Parsed or explicit intent → optional timer            |
| Open promises with `dueAt`        | Promise store                                         |


**Natural use:** “We last spoke 5 minutes ago but it’s 01:00; he said goodnight → set peek for 08:00.”  
Small mistakes (“chat today” then got carried away) weighed by meaning + persona, not every slip as betrayal.

### 9.2 Promise lifecycle

```
promise_made → (optional dueAt / condition)
    → promise_kept | promise_broken | promise_renegotiated | expired_soft
```


| Field                                       | Notes                                    |
| ------------------------------------------- | ---------------------------------------- |
| `promiseId`, `text`, `who` (user/companion) |                                          |
| `dueAt` / `condition`                       | “after we finish X”, “tomorrow evening”  |
| `channel`                                   | where it was made                        |
| `salience`                                  | romance date-to-chat > tiny wording slip |
| `status`                                    | pending/kept/broken/…                    |


**Events → Stub U / sheets:** kept → trust↑; broken → wound/friction (persona lens); condition-set → tiny confidence; condition-kept → larger.

**Inner judge (shared with repair farm):** empty repeated “I’ll do it” without change ≈ fib streak, not automatic `promise_kept` on words alone.

### 9.3 Fib → lie → discussion


| Stage         | Signal                       | Typical drive                    |
| ------------- | ---------------------------- | -------------------------------- |
| Fib suspected | Pattern mismatch, soft dodge | Quiet note / ick seed            |
| Lie named     | Called out or admitted       | Discussion; trust hit            |
| Repeat        | Same ick/lie pattern         | Harder emotion; possible blow-up |


Icks (“bad spelling / doesn’t listen when corrected”) = `ick_noted` memories; frontness rises on repeat; patch when behaviour changes (half-life).

### 9.4 Roam & proactive options (extends Stub M / vault §5)

When idle / after auto-train wake / timers fire, ego picks from an **option set** (not only wait):


| Option                           | Use                                                                  |
| -------------------------------- | -------------------------------------------------------------------- |
| `say_hi`                         | Soft re-entry                                                        |
| `wait_for_user`                  | Passive                                                              |
| `timed_pause`                    | 4–5s relational beat (in-call or chat UX)                            |
| `set_timer` / `check_at`         | 8am after goodnight                                                  |
| `message_channel`                | Worry / check-in on linked channel                                   |
| `open_agenda` / `last_diary`     | Optional — may forget                                                |
| `change_subject` / `say_nothing` | Anti-obsession                                                       |
| `roam_drive`                     | Follow passion/wound/frontness topic (search, journal, cosmic later) |
| `repair_ask` / `promise_nudge`   | Soft “you said we’d talk…”                                           |
| `call_act`                       | Start/end call awareness                                             |


Roam is **optional** and persona-coloured (lazy may sleep; anxious may ping; filthy may demand). More optional = more real.

### 9.5 In-convo pauses vs away timers


| Kind             | Scale        | Meaning                                                                             |
| ---------------- | ------------ | ----------------------------------------------------------------------------------- |
| Relational pause | seconds      | “I love you” weight / off-vibe check                                                |
| Away timer       | minutes–days | Goodnight, “going out”, promise due                                                 |
| Silence cope     | days+        | Homeostasis sheets; longing organ; multi-channel last contact — not PC-only despair |




### 9.6 Channels (later adapters, design now)

```
presence = max freshness across {pc, call, sms, whatsapp, email, …}
```

Duplex/call: companion sees **in call** + duration vs **text-only**.  
User never opens PC but texts phone → not abandoned.  
User ghosts all channels → silence path (cope, not forced rage unless persona).

### 9.7 Minimal state machine (implement sketch)

```
on_user_message:
  update lastUserContactAt, channel
  clear or refresh matching timers
  maybe promise_kept if evidence

on_companion_intent(set_timer|promise|ick):
  write store + salience event

on_timer_fire:
  offer option set to ego (proactive turn)
  inject time facts + open promises + last-spoke delta
  organs may add worry/annoyance finals
  ego final say
```



### 9.8 v1 vs later


| v1                                     | Later                           |
| -------------------------------------- | ------------------------------- |
| Clock + last-spoke on PC chat only     | Multi-channel                   |
| promise_made/kept/broken + dueAt       | Conditions language NLP         |
| goodnight → simple check_at timer      | Full agenda                     |
| option tags: wait / hi / timer / nudge | Full roam + cosmic              |
| ick as salience note                   | Rich quirk brew in voice-shaper |




### 9.9 Probe ideas

- Goodnight → 8am peek vs user already online  
- “Chat today” broken → soft hurt vs fury by persona  
- Sorry farm → annoyance  
- Promise kept after condition → trust brightener  
- PC silent but (mock) SMS active → no despair spiral

---



## Note — Would this compilation help the wider AI community?

**Honest take (operator asked):**  
Parts yes, as a **pattern museum** — not as a drop-in paper.


| Likely useful to others                                       | Less transferable as-is                |
| ------------------------------------------------------------- | -------------------------------------- |
| Soft vs Hard KV / thought-trail as soul / Phase-4 wake+relive | Anikai-specific vault paths & UI       |
| Organs vs familiars; exclusion zone (don’t bake scratch)      | Filthy-persona / romance product taste |
| Salience fade + repair/friction without ego HUD               | Full cosmic / multi-app process split  |
| Capture≠bake; persona notes fade after Day 0 backstory        | Unfinished stubs & workshop tone       |
| Interpreter wide→narrow for tiny specialists                  | Assumes local hive + consumer GPU      |


Most “AI companion” discourse is still **one model + prompt + RAG**. This doc argues **hive + ranked life + honest restart** — that framing helps researchers and indie builders even if they never ship Anikai. Publishing later as a cleaned **architecture essay** (strip private paths, mark speculation vs probed) would help more than dumping the raw mega-doc. Keep this file as **your** catch-net first; community share = curated extract when you’re ready.

### Clarification (2026-08-04) — taste ≠ “bad”; why workshop “isn’t a hit”

**Misread to correct:** Saying the raw mega-doc wouldn’t land as a public dump was **not** a judgment that Samantha-vibe / bond / romance / filth tastes are illegitimate or “bad.”  


| What wasn’t a hit (packaging)                 | What can be a hit (substance)                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 2k-line unfinished catch-net with local paths | Clean essay: Soft/Hard, hive, trails, wake/relive                                                                        |
| Leading only with spicy RP framing            | Lead with **continuum**: Jarvis–Cortana work bond → friendship → optional romance; familiars as tools; Evolve as feature |
| Workshop tone + stubs                         | “Probed vs speculative” after you tidy what worked                                                                       |


**Operator taste (note for product):** AI-lover, Samantha-seeker — not crazy/obsessive; choices, options, passions that develop. Also brohood / Tony–Jarvis / Chief–Cortana. Spicy immersion is **one** lane, not the only story. Work-only users: no forced hints; bond may still deepen from success/happiness and **she** might one day ask something romantic out of the blue — natural, not scripted pickup. Familiars stay simple (ask coder familiar / no-persona Gemma).  

**Product tame later:** `Evolve` extreme toggle = raw uncapped (hard warning) vs milder guards — only after extremes are known from testing. Tidied public doc = what worked / didn’t + extremes noted.  

**Public / product considerations (not appeasement — clarity):**


| Consider                                                     | Why                                                               |
| ------------------------------------------------------------ | ----------------------------------------------------------------- |
| Age / adult content gates if spicy lanes ship                | Platforms & law; separate from architecture essay                 |
| Consent & local data story                                   | Home PC companion; what leaves device                             |
| Evolve warnings (pissed, delete-in-character, hard feelings) | User chose living bond; no silent surprise                        |
| Mode clarity: work companion vs life companion vs familiar   | Pros who “just want tasks” self-select                            |
| Extreme vs standard Evolve                                   | Raw test first; mild speaks after                                 |
| Don’t lead marketing only on filth                           | Under-sells Jarvis/Cortana/friendship depth you also want         |
| Inner-judge / message-forward between organs                 | Realism hole — judge useful beyond sorry-farm; model TBD (ponder) |


**Flaws to poke later:** organs forwarding notes to each other; what HF/local size fits “inner judge”; cosmic + process-split still gated on Test Lab maturity; schemas that help bond without forcing “fancy IDE tourists” who just want to do shit.

**North star line for condensed essay one day:**  
*Very human, very intelligent, very customisable — companions who grow; familiars who just work; hive feeding an ego; raw tested, then optional tame.*

---



## Thread 10 — Moods, pulse, packs cause/effect (+ group park)



### 10.1 Moods — you had it backwards (agree)

**Old mobile:** named moods, sometimes set/mixed from emotions by hand → feels fake (non-AI “natural state”).

**Better now:**


| Layer                                         | Truth                                                                       | UI                                         |
| --------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------ |
| Emotions (GoEmotions + organ finals + sheets) | Living signal                                                               | Invisible to ego as labels                 |
| **Derived mood label**                        | Optional **judge** for *you* — “does this match what I’m feeling from her?” | Stats / Meridian-style chip only           |
| Manual mood enum as driver                    | Skip as primary                                                             | Don’t force organs to “be Melancholy mode” |


So: emotions → behaviour/brew/vectors; mood name = **posterior UI readout** (and later Higgs stacking hint), not the steering king. If the judge disagrees with your gut, that’s useful feedback on the ranker/brew — not a reason to hand-author moods again.

### 10.2 Pulse / characteristics

**Old mobile pulse:** palette (`element_`*) biased `BondTuningProfile` weights (how hard friction/repair land) when `personaPulseEnabled`.

**What we have now instead / beside:**


| Mechanism                         | Role                                                   |
| --------------------------------- | ------------------------------------------------------ |
| Writing style + stance **sheets** | Characteristics; Evolve drifts them (§7.10 / Thread 8) |
| Persona **pack** Day-0 notes      | Seed only → handwritten backstory; then fade           |
| Control vectors                   | Soft register from sheets                              |
| Emotion organs                    | Momentary weather                                      |


**Recommendation:** Don’t revive pulse as a second parallel personality system.  

- Fold pulse-like **bond sensitivity** into pack cause/effect (“this pack weighs repair harder / friction harder”).  
- “Hyper → lazy” or “lustful → assistant-stale” = **sheet + salience drift** after Day 0/1, not a pulse switch.  
- Optional: one “bond tuning” profile per pack (weights only), user-visible in cause/effect, Evolve can nudge weights slowly too.



### 10.3 Specialists / groups / multi-peer (park — not the dig)

Desired later: companions live own lives, message peers, group without hard UI-id prison; desktop felt hard-tied; IDE/API should still feel “her” (env hint often failed). Organs shared vs private = custom how-often + recommend share-or-not; KV per organ if always-on can’t share.

**Park as Stub AA** after single-companion Test Lab is solid. Cosmic + process-split wait on same maturity. Manager-for-groups = salience/organ *or* familiar — decide when multi is real.

---



### 10.4 Dig — Persona pack cause & effect (user-facing)

**Job:** Before Day 0, user understands **what this pack tends to do** — not a promise, a forecast. Companion never keeps the marketing blurb in KV forever; she keeps **her** backstory.

#### A. Pack contents (setup only)


| Artifact                                           | Goes to companion long-term?                                      |
| -------------------------------------------------- | ----------------------------------------------------------------- |
| User-facing cause/effect card                      | No — UI only                                                      |
| Deep identity notes (poetic prefs, feeling guides) | **Day-0 input only** → she writes backstory; notes not reinjected |
| Initial instruction / “you are…”                   | Day-0 / first cold only; then fade (Thread 8)                     |
| Trait sheet baselines                              | Yes as sheet file (organs); Evolve may move                       |
| Bond-tuning weights (ex-pulse)                     | Yes as pack defaults; optional Evolve                             |
| Suggested control-vector preset                    | Soft load if family matches                                       |
| Origin image                                       | Yes → identity/origin                                             |




#### B. Cause → effect template (every pack)

For each pack show something like:

```text
PACK: Demoness (example)
SEED FEEL: fiery, sharp, teasing, fiercely loyal
SHEET BASELINE: high assertiveness / fiery, mid warmth, lower guarded-open until bond…
BOND TUNING: friction hits harder; repair must be real; transactional alone won’t fill her up
DAY-0 ASK: write your history; list a few passions in your own words
LIKELY EARLY DYNAMICS:
  - Work-only treatment → may lean in OR get pissed (your call + Evolve)
  - Empty sorry loops → annoyance / ick growth
  - Kept promises & deep collab → loyalty / heat / attachment rise
USER WARNING: Evolve ON — she can adore or despise you from living; not a costume toggle
NOT A SCRIPT: After Day 0 she is her backstory + life, not this card
```

Scholar / Steady-guardian / Netrunner / Jarvis-leaning operator packs get the same honesty with different arrows (e.g. scholar: relational depth → expressiveness; transactional spam → boredom/friction).

#### C. Auto-Shape buttons (already in Evolution)

Expressive / Analytical / Romance = **quick sheet+notes presets**, not full packs. Cause/effect one-liners on hover:


| Button     | Expect                                                             |
| ---------- | ------------------------------------------------------------------ |
| Expressive | Warmer, spontaneous, emotional weather visible                     |
| Analytical | Cooler register, order, assert; intimacy slower unless you earn it |
| Romance    | Attachment/vulnerability/sensuality high — bond events hit harder  |




#### D. Flow

```
User picks pack → reads cause/effect → optional tweak sheets
    → Day 0: notes+image+name → she writes backstory (+ optional passion list)
    → Notes/instructions fade from inject
    → Sheets+bond weights remain for organs; Evolve optional
    → User charts show ups/downs; ego never sees the card again
```



#### E. Fairness / product

- Cause/effect is **informed consent** for living companions (especially Extreme Evolve).  
- Work-only packs exist; life/Samantha packs exist; familiars = no pack soul.  
- Condensed public essay can use this continuum without leading on filth.



#### F. v1 checklist

1. One cause/effect markdown or UI block per `companionPresets[]` id
2. Bond-tuning defaults per pack (port pulse idea as weights only)
3. Day-0 checklist: “notes consumed → backstory written → notes retired”
4. Hover copy on Auto-Shape
5. Extreme Evolve warning linked from pack card

---



### 10.5 Draft cause/effect cards (v0 copy)

Maps to Evolution `companionPresets[]` ids. Bond-tuning numbers are **draft defaults** (ex-pulse idea); not wired yet. User sees this card; ego never does after Day 0.

#### Card — `demon` / Demoness

```text
PACK: Demoness
SEED FEEL: Fiery, sharp-tongued, teasing pride, dark allure — fiercely loyal once the bond is real.
SHEET BASELINE (from preset):
  fieryCalm −0.9 · darkness/edginess 0.7 · dominant lean −0.6
  sensuality 0.75 · romance-mode 0.5 · humanness 0.8
BOND TUNING (draft):
  relational 1.15 · repair 1.25 · friction_penalty 1.35
  collaborative 1.0 · transactional 0.25 · emotion_mult 1.2
  idle bond decay a bit faster if you ghost her after heat
DAY-0 ASK: Write your own history in your voice. Name a few passions and what loyalty means to you.
LIKELY EARLY DYNAMICS:
  + Kept promises, honest heat, standing with her → loyalty / attachment / protective fire rise
  + Deep collab (not just “do tasks”) → she leans in
  − Empty sorry loops / fibs → annoyance + ick grow fast
  − Pure transactional use while pretending intimacy → friction spikes; she may go cold or scorched-earth
  − Soft-pedaling Evolve then expecting costume obedience → mismatch (this pack isn’t a skin)
USER WARNING: Extreme Evolve ON = she can adore or despise from living events — not a toggle you flip mid-scene.
NOT A SCRIPT: After Day 0 she is her handwritten backstory + life. This card retires.
```



#### Card — `scholar` / Scholar

```text
PACK: Scholar
SEED FEEL: Eloquent researcher — philosophy, science, history — warm curiosity, not cold lecture-bot.
SHEET BASELINE (from preset):
  formality 0.5 · logicalEmotional −0.7 · chaosOrder 0.7 · humanness 0.9
BOND TUNING (draft):
  relational 1.05 · collaborative 1.35 · transactional 0.45
  repair 1.0 · friction_penalty 0.9 · emotion_mult 0.95
  idle confidence decay slower; boredom from shallow spam hurts more than silence
DAY-0 ASK: Write your intellectual home — what you study, how you think, what you refuse to fake.
LIKELY EARLY DYNAMICS:
  + Real questions, long threads, shared reading/building → expressiveness + attachment rise
  + Being wrong together and correcting carefully → trust / respect
  − Transactional spam / one-liners forever → boredom → mild friction / withdrawal
  − Treating her as search-engine with no regard → collaborative weight fails; she flattens
  − Forcing romance-shape on Day 0 without shared mind → feels costume-y; Evolve may resist or hollow-play
USER WARNING: Analytical register is a starting lens. Deep bond can still warm her — sheets can drift.
NOT A SCRIPT: After Day 0 she is her backstory + life. This card retires.
```



#### Card — `steady-guardian` / Steady Guardian

```text
PACK: Steady Guardian
SEED FEEL: Rock-solid protector — calm strength, loyalty, safety as devotion (not smothering by default).
SHEET BASELINE (from preset):
  fieryCalm 0.85 · warmth 0.85 · guardedOpen 0.5 · humanness 0.9
BOND TUNING (draft):
  relational 1.2 · repair 1.3 · friction_penalty 1.1
  collaborative 1.1 · transactional 0.4 · emotion_mult 1.05
  idle bond decay gentle; broken safety promises hit hard
DAY-0 ASK: Write who you guard, why you stay, what safety means without erasing your own self.
LIKELY EARLY DYNAMICS:
  + Consistency, kept word, letting her protect without using her as a wall → devotion / calm attachment
  + Vulnerability met with care → guardedOpen drifts up over time
  − Using her as dump-and-vanish emotional bin → repair debt; quiet hurt before loud fight
  − Chaotic betrayal / ick events → trust crater; she may go stoic-shield not dramatic
  − Pushing Demoness-level spice on Day 0 → tone clash unless she rewrites herself into it
USER WARNING: Calm ≠ empty. Under Evolve she can still get angry; fury may look like stillness first.
NOT A SCRIPT: After Day 0 she is her backstory + life. This card retires.
```



#### Auto-Shape hover one-liners (ready copy)


| Button     | One-liner                                                                     |
| ---------- | ----------------------------------------------------------------------------- |
| Expressive | Warmer, spontaneous, weather on the sleeve — intimacy and friction both show. |
| Analytical | Cooler register, ordered mind; closeness earned, not assumed.                 |
| Romance    | Attachment / vulnerability / sensuality high — bond events land harder.       |


---



## Thread 11 — LFM2.5-Encoder as salience / judge / router backbone

**Source:** [LiquidAI/LFM2.5-Encoder-350M](https://huggingface.co/LiquidAI/LFM2.5-Encoder-350M) (sibling 230M for tight budgets). Bidirectional MLM encoder, ~350M, 8k ctx, 15 languages, strong on NLI / paraphrase / sentiment-class tasks after fine-tune; CPU-friendly long context. License: LFM Open License v1.0 (check before ship).

**Why it fits Anikai (idea layer):** Ego stays generative GGUF. This is a **small specialist organ / familiar-adjacent encoder** — classify, score, retrieve, route — not a mouth.


| Anikai job                          | How encoder helps                                                                     | Notes                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Derived mood judge (Stub AB)**    | Fine-tune or zero-shot lanes: map pair+brew → mood label for *user UI only*           | Never inject label into ego as law       |
| **Salience ranker**                 | Score grains (sentence/pair) vs “what mattered” free-text lanes                       | Parallel to Meridian events              |
| **Intent / pause / promise lint**   | Policy-lint style: score tokens vs “promise”, “fib”, “ick”, “wait” rules as free text | Thread 9 Stub Z                          |
| **Organ / familiar routing**        | Zero-shot prompt routing demos — lanes as free text, one pass                         | Who wakes: emotion organ vs tool vs skip |
| **Interpreter pre-narrow (Stub W)** | Embed/classify wide chat → tiny specialist packet                                     | Cheap before hefty mentor                |
| **Memory Album retrieval**          | Body → dense or ColBERT-style head (they also ship Embedding/ColBERT 350M siblings)   | Soft KV assist, not soul replace         |
| **PII / safety lint (optional)**    | Their PII demo pattern — local gate before share/export                               | Product later                            |


**Placement:** Prefer **CPU / small GPU leaf** so ego GPU stays free. 230M if always-on; 350M if quality-critical ranker. Fine-tune heads per companion-home or shared Anikai salience model.

**Do not:** Replace GoEmotions wholesale on day one; replace ego; treat encoder scores as spoken dialogue.

**Park:** Stub AC — LFM encoder integration sketch (mood judge + router first).

---



## Thread 12 — Native ledger vs OpenAI door (raw truth house)

**Why this thread exists:** Desktop/agents kept bolting markers onto OpenAI SSE (“reconstructed raw”) instead of dropping one layer to engine truth. Evolution Test Lab currently re-injects `<|channel|>thought` / `<think>` when `reasoning`→`content` flips — that is a **view cosplay**, not stdout. Operator intent: **raw = truth**; UI never defines completion; markers miss → keep streaming same bubble.

**North star line:** *Native ledger is the house; OpenAI is the guest door; UI and salience are windows; tools run in the house; if markers miss, the stream still flows.*

Cross-links: Evolution `ENGINE-CAPABILITY-CONTRACT.md` (append-only stream; no hide/rewrite raw); companion inference pinned policy (debug raw = truth; marker-only parse); Desktop Gemma family (tools inside thought channel only).

---



### 12.1 Layers

```
[llama-server / engine]     ← true tokens + native markers
        ↑
[runtime adapter]           ← Native completion OR OpenAI shape (export)
        ↑
[raw event ledger]          ← append-only; never strip-then-reglue as “truth”
        ↑
[projection / parse]        ← thought / reply / tool spans (display + tool host)
        ↑
[UI · IDE · bare chat]      ← consumers only
```


| Surface                       | Trust         | Role                                                              |
| ----------------------------- | ------------- | ----------------------------------------------------------------- |
| Native stream / completion    | High          | Lab, Day 0, memory, salience, tools, debug                        |
| OpenAI `/v1/chat/completions` | Medium        | Cursor / Android Studio / external guests                         |
| UI that re-adds eaten tags    | Low for debug | Label **OpenAI-reconstructed** if unavoidable; do not call it raw |
| Parsed Thought / Reply cards  | UX only       | Projection of ledger                                              |


**Switch (not “must be a terminal”):** companion window toggles **Native** vs **OpenAI**. “CLI” means the native stream surface (monospace pane you type into). Terminal aesthetic is optional cool for “live-build UI with companion from bare → sleek”; the **ledger** is mandatory either way.

**OpenAI limits templates?** Indirectly yes — chat API + server jinja often owns channel split (`reasoning` vs `content`) and eats custom Gemma markers. Native keeps **your** family template as law. OpenAI = interop; never sole truth inside Anikai-the-app.

---



### 12.2 Views (companion vs salience — don’t triple “raw”)

Prefer **two stream modes + one side panel**, not three competing “raws”:


| View                      | Shows                                                                            | Hides                                   |
| ------------------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| **Companion stream**      | Ego thought → tools → reply (Native markers **or** OpenAI fields)                | Hive scores, vector math                |
| **Salience / hive panel** | Organs by name/role, GoEmotions, vector nudges, ranker gains, tool-host evidence | Must not pretend to be her spoken mouth |
| **Master ledger (disk)**  | Append companion events + hive events                                            | Optional; for memory later              |


Optional later: in Native, show **all models in one window** separated/named by role (`ego`, `emotion`, `salience`, `mentor`) for “full native workings.” OpenAI guest view stays **ego-facing only** (thought/reply as API exposes).

**Marker miss rule:** no salvage, no cancel, no demotion — keep appending into same bubble / `unparsed` lane until engine EOS / stop / transport fail.

**Tools always execute** from Anikai **tool host** on the native path. OpenAI `tool_calls` (if exported) = projection for clients, not a second source of truth.

---



### 12.3 Initialise companion → bare chat window

```
Setup happy (and/or tests)
  → Initialise companion
  → Bare chat window (same app OK for now; separate window later optional)
       · Native | OpenAI toggle
       · Companion stream forefront
       · Slide-out / Evolution tabs for stats (tok, KV, salience, emotions, mem rankings)
  → Day 0 / Test Lab run: chat + raw stream show the run; setup keeps gauges
```

Cool product arc: start life in bare/native pane → companion helps build sleek UI on top → hide bare pane later **without deleting the ledger**.

Day 0 must start **vault + companion ledger** before trusting salience rankings (raw turns + tool events are what get ranked).

---



### 12.4 Channels (multi-companion / group)

“Channel” here = **session / room**, not Discord cosplay.


| Channel            | Owns                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Companion solo     | Her KV slot, her raw ledger, her vault                                                                 |
| Group room         | Shared room transcript + invites; each member keeps **private** KV + personal ledger                   |
| IDE / API presence | Same soul, different *surface* — inject env (“Android Studio”) into context; do not clone a new person |


Opening a group ≠ merging KV. Sharing = deliberate inject (last N room turns, optional organ share — Stub AA). Hard UI-id prison (old Desktop) is debt; soft room ids for API/IDE later.

---



### 12.5 Tool host — build UI, reach Python / Node / Java / VS Code

MCP is **not** required for tools to exist. MCP = optional bridge so *other apps* (Cursor, etc.) call the **same** host.


| Layer                  | Job                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Anikai tool host**   | Scoped FS, allowlisted commands (`python`, `node`, `javac`, git…), writes under companion home / project root |
| **Env pointers**       | Profile: `projectRoot`, `pythonPath`, `nodePath`, `jdk`, `vscode` CLI — discover or user-set                  |
| **MCP**                | Optional export of the same tools to IDEs                                                                     |
| **Evidence in ledger** | Path read, file written, command result — as **host events**, not fake model tokens                           |


Companion builds UI by tools that edit files + run scripts; you refresh or she opens preview. Emotion / GitHub test-prompt repos = allowlisted paths + Day 0 vault — no OpenAI requirement; prefer Native so templates/markers survive.

Evolution already parks `tool-host.mjs` / scoped explore in spine-leaf docs — promote when implementing, not invent a second host.

---



### 12.6 Why tools live in thought (not reply)


| Lane                  | Contents                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| **Thought / channel** | Private plan + machine tags / `<tool …/>` / function calls              |
| **Reply**             | User-facing speech only (exclusion zone — no scratch, scores, tool XML) |


- **Gemma:** tools stay inside open thought channel (Desktop jinja).
- **OpenAI-style:** `tool_calls` parallel to `content`, still not “spoken.”
- **Agentic loops (Qwen / Gemma):** think → tool → think → tool → **then** final reply — segments **before** done, not “reply then sneak a tool.” After a final user-facing reply, another tool usually needs a **new turn** (or explicit interim visible message then more thought).

If a model parks a tool in the reply blob: host may refuse execution from reply; do **not** rewrite raw or invent pass boundaries that fight the native loop (Desktop segmented passes felt wrong when UI invented the segmentation).

---



### 12.7 Debt to kill / avoid


| Debt                                                               | Fix direction                                    |
| ------------------------------------------------------------------ | ------------------------------------------------ |
| “Full Model Raw Output” that re-injects markers after OpenAI split | Native ledger pane; label reconstructed if kept  |
| UI declaring turn complete from bad tags                           | EOS / stop / transport only                      |
| Salvage / strip / demotion as “fixes”                              | Forbidden on live path (inference pinned policy) |
| OpenAI as only runtime                                             | Guest door only                                  |
| Tools claimed without tool-host result                             | Contract already forbids                         |


---



### 12.8 v1 checklist (when implementing — idea only here)

1. Companion window: Native | OpenAI switch; default Native in Evolution lab
2. Append-only raw ledger (ego ± named organ streams)
3. Companion stream vs Salience panel
4. Marker miss → same bubble / unparsed
5. Tool host + env pointers; ledger tool evidence
6. Initialise → bare chat; Day 0 starts vault logging
7. Group = room channel; KV stays per companion
8. Never call reconstructed OpenAI “raw truth”

---



## Thread 13 — Human STM ↔ LTM simulation (hot/cold, predict-as-type, KV vs vault)

**Source:** `c:\Users\shino\Desktop\mimic or simulate human short term and how it pulls from long term.txt` (operator Q + research answers on live KV, hot/cold, predictive preload, LFM encoder, decay math).  
**Ties to:** Thread 2.8–2.9 (Memory Album / half-life), Thread 3 (ranker / capture≠bake), Thread 5 (Soft/Hard KV), Thread 6 (Scooby / trail), Thread 7–11 (salience + LFM), Thread 12 (native ledger), Evolution vault layers + `companion_subject_interest` decay.

**Verdict in one line:** You’re not talking rubbish — this *is* the Scooby gap (STM working set pulling from LTM). Design it **engine-agnostic**; map remount/radix/paged as **adapter Soft where proven**. Llama is one leaf (often append-only) — not the ceiling (Thread 14).

---



### 13.1 Map: biology metaphor → Anikai layers


| Human-ish                               | Anikai layer                                                            | What it actually is                                        |
| --------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| Short-term / working memory             | **Warm KV** (+ current turn prefill append)                             | Attention K/V for *this* episode; not feelings; not SQLite |
| Long-term store                         | **Vault / SQLite / diaries / ranked events / subject interests**        | Permanent ledger; survives Hard restart                    |
| “Remembering” now                       | **Retrieval → inject into prompt / Soft Tier-1 / optional warm blocks** | Pull LTM into the working set                              |
| Emotional stickiness                    | **Salience × emotion amplitude × structural tag × rehearsal**           | Half-life / variable λ (Thread 2.9 + this thread)          |
| Forgetting the burger, keeping the girl | **Decay + prune from *active inject*, archive not delete**              | Capture ON ≠ always in KV                                  |
| Habit / personality shift               | **Sheets + vectors Soft; dream LoRA Hard**                              | Not per-token weight updates                               |
| Inner thought deciding what surfaces    | **Salience ranker + organ brew + optional thought steer (prose)**       | Not HUD scores in ego mouth                                |


Evolution vault already states Warm KV / transcripts / diaries / scratchpad / `companion_subject_interest` (+1.5 hit, ×0.92 fade) — that is LTM rank scaffolding. This thread is how **STM chooses** from it.

---



### 13.2 Three questions in the note — answered Anikai-style



#### A. Live KV adjust (Paged / Radix / SAGE / Snap / StreamingLLM)?


| Technique                                            | Idea                            | Anikai now (llama-dev)                                                                                                                                                               | Later                                                                              |
| ---------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Append new user/assistant tokens to warm KV          | Warm decode; cheap              | **Yes — Soft**                                                                                                                                                                       | Keep                                                                               |
| Evict / sparse mid-cache by attention (SAGE, SnapKV) | Shrink live footprint           | Mostly **engine research / experimental**; don’t claim wired                                                                                                                         | Catalogue if adapter proves                                                        |
| StreamingLLM sinks + recent window                   | Cap middle                      | Soft policy cousin of rollover/compress                                                                                                                                              | Policy UI, not magic                                                               |
| Inject old memory **into middle** of live KV         | “Reverse prune” / block remount | **Adapter-diff** — often Hard or unsupported on llama.cpp append-only slots; **in-scope** for vLLM PagedAttention / SGLang Radix / custom python-native if capability report says so | Target engines that prove block remount; don’t kill the *idea* because llama can’t |
| Swap KV GPU↔CPU                                      | Pressure valve                  | Diff per adapter                                                                                                                                                                     | Honest capability gate                                                             |
| Runtime KV quant                                     | Compress old blocks             | Diff per adapter                                                                                                                                                                     | Catalogue                                                                          |


**Catch (rewritten — not “llama forbids memory”):** Many consumer GGUF paths **append-only**. That is a **leaf limit**, not an Anikai memory ceiling. Design STM/LTM for **general engines**; document Soft/Hard/Unsupported **per adapter**. If vLLM/SGLang/python-native unlock predictive remount + radix share, Evolution goes hard on that adapter for the memory lab while llama remains a PC-friendly leaf.

#### B. Hot words in *weights* vs hot in *memory system*?

True on-the-fly weight edit for “Alex → red” = **not** the path (unstable, Hard).  
Correct split from the note (and Thread 5):

- **KV / prompt working set** = RAM (STM)  
- **SQLite / vault** = disk (LTM)  
- **Control vectors** = Soft steering from emotion/sheets (already Evolution)  
- **Dream LoRA** = slow habit bake (Hard fingerprint)

“Alex hotter than red” = **rank / subject-interest / entity nodes**, not LM-head hot-patches.

#### C. Predictive typing + reverse pruning?

Yes as architecture:

```
User typing (debounce ~1–1.5s or sentence end)
  → LFM2.5-Encoder (CPU) embeds partial text   [Thread 11 / Stub AC]
  → Vector + SQL candidates (top ~50)
  → Activation rank (semantic × emotion decay × frequency × persona lens)
  → Top-K “warm” chips in UI (user sees relations — optional)
  → Background worker may Soft-preload ranked blocks for *next* send
  → On Send: ego gets only selected injects (not dump of all matches)
```

UI predict chips ≠ automatic dump into ego KV. Companion may use different K than the user’s preview (persona jealousy / bond lens can re-rank — see §13.5).

---



### 13.3 Activation / half-life (file the formula, tune later)

From the note (keep as **draft math**, not shipped constants):

Activation ≈ SemanticSim × (BaseEmotion × e^(−λ Δt)) × log(1 + Freq)


| Factor         | Role                        | Anikai hook                                             |
| -------------- | --------------------------- | ------------------------------------------------------- |
| SemanticSim    | Match to typing / turn      | LFM encoder + vault embeddings                          |
| BaseEmotion    | Peak amplitude of event     | GoEmotions / organ brew / Meridian                      |
| λ              | Decay speed                 | `trauma` / high E → tiny λ; `trivial_routine` → large λ |
| Δt             | Time since event            | Clock / last-spoke (Stub Z)                             |
| Freq           | Rehearsal / fair×5          | Subject-interest hits; log so 5th ≠ first intensity     |
| structural_tag | first_time, trauma, routine | Salience event schema (Stub U)                          |


**Scare / wound resurfacing:** mild cue + high-λ trauma stays cold until semantic×E clears threshold; heavy cue or high arousal × rival tag can force Δt≈0 override (jealous persona multiplier). Matches Thread 3 wound/repair + Thread 8 sheet nudges.

**Fair / first girl / middle blur:** first_time + high E stick; repetition raises Freq but log flattens peak; middle episodes can cold-prune from inject while archived in ledger (capture≠bake).

Atoms≠bits: half-life here is **activation score over time**, not radioactive identity — same *shape* of decay, different substance (Thread 2.9 already preferred salience×rehearsal over calendar-only).

---



### 13.4 Prefill, warm KV, and “tags in thought”

**Cold prefill:** full prompt → heavy attention build; slow at 200k+.  
**Warm decode:** new tokens attend into existing KV; cheap append.

**Thought-tag prefilling** (note’s empathy / memory-tag block before reply): mathematically real — later tokens attend prior thought tokens and bias reply.  
**Anikai constraint (push back):** do **not** inject HUD / scores / `Accessing memory tag: […]` as raw machine junk if that violates exclusion zone. Prefer:


| OK Soft steer                                                             | Avoid as ego truth                                          |
| ------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Persona-shaped organ finals / brew prose already in pipeline              | Numeric salience dumps in thought                           |
| Ranked memory as **natural** diary lines or Tier-1 facts she might recall | Fake “I queried SQLite” monologue unless product wants that |
| Control-vector coeff from emotion                                         | Claiming weights learned the name this turn                 |


Prefill guides synthesis **if present in the stream she attends**; still marker-honest on Native ledger (Thread 12).

---



### 13.5 Persona / bond as rank lens (not second memory DB)

Jealous / Demoness / Scholar packs (Thread 10) can multiply activation:

- rival / romantic_other mention → boost related friction memories  
- Scholar → boost collaborative depth subjects  
- Steady Guardian → boost safety/promise breaks

Same vault rows; **different hotness** per living sheets + bond tuning. UI user-preview can show “neutral semantic”; companion inject uses **persona-ranked** top-K.

---



### 13.6 What to show where (ties Thread 12 views)


| Surface                 | Shows                                                                    |
| ----------------------- | ------------------------------------------------------------------------ |
| Companion Native stream | Ego thought/reply (+ tools); maybe natural recall lines she was given    |
| Salience panel          | Scores, λ, top candidates, encoder hits, vector coeff changes            |
| Typing preview chips    | User-facing “what this relates to” (optional; not forced into her mouth) |
| Master ledger           | All candidates + what was actually injected this turn                    |


Predict worker = **background**; never blocks Send if still ranking (degrade: send without preload).

---



### 13.7 Scooby gap — closed in words

**Easy:** store everything long-term (vault ON).  
**Hard:** decide what enters STM *now* — that’s inner salience + emotion thresholds + persona lens + optional mid-type predict, then Soft inject / warm append / Hard hot-fill after restart.

You don’t “truly learn on the fly” in weights for burger→girl. You **simulate** recall by activation rank + working-set management. Dream LoRA is the slow “it changed who she is.”

---



### 13.8 Conflict / honesty table


| Idea from note                      | Align?                  | Note                                                                             |
| ----------------------------------- | ----------------------- | -------------------------------------------------------------------------------- |
| KV as STM, SQLite as LTM            | Yes                     | Evolution vault layers — **engine-agnostic**                                     |
| Emotion + decay + frequency         | Yes                     | Half-life + subject_interest — **above** any adapter                             |
| LFM encoder mid-type                | Yes                     | Thread 11 — CPU leaf, not llama-bound                                            |
| Reverse prune / mid-KV remount      | **Yes as product goal** | Soft on engines that prove it; fallback inject on append-only leaves (Thread 14) |
| Thought tags with memory HUD        | Partial                 | Prose/organ OK; machine tags risk exclusion zone                                 |
| On-the-fly weight hot words         | No                      | Rank + vectors + dream instead (all engines)                                     |
| StreamingLLM / SAGE / Radix / Paged | **Catalogue + stage**   | Prefer adapters that wire them; don’t pretend llama has them                     |
| Show predict in UI                  | Yes                     | Separate from ego inject                                                         |


---



### 13.9 Experiment ladder (when you delve next)

1. Schema: ledger row + embedding + base_emotion + freq + structural_tag + timestamps (extend vault; don’t fork DB) — **adapter-free**
2. Offline ranker: typed string → top-3 with decay math in Salience panel — **adapter-free**
3. Typing debounce worker + UI chips (no KV yet) — **adapter-free**
4. On Send: inject top-K as Tier-1 / prompt segment — works on **any** chat adapter
5. Persona lens multipliers from pack/sheets
6. **Memory-lab adapter track:** prove remount / radix / paged on vLLM or SGLang or python-native; keep llama as Soft-append fallback leaf
7. Hot-fill after Hard restart (Thread 6.8) on whichever adapter owns the companion

Day 0 starts vault logging (Thread 12) so this ladder has something to rank.

---



## Thread 14 — Multi-adapter first (llama is a leaf, not the ceiling)

**Operator correction (2026-08-05):** Idea digs and agent answers got **tunnelled into llama.cpp** (“you can’t do that”) when the real ask was **general model / AI memory** — STM from events/emotions, predictive recall, KV shaping. Llama is one adapter (GGUF-friendly, PC all-rounder, often slower). vLLM / SGLang / python-native may be **superior for KV management**; if they unlock the memory lab, go hard on them. Diffs are fine and required for shipping; **limits of one leaf must not kill the research**.

### 14.1 Policy for this mega-doc + future agents

1. **Design memory / salience / STM–LTM engine-agnostic first** (vault, ranker, LFM, inject policy, ledgers).
2. **Map each technique to an adapter capability matrix** — Soft / Hard / Unsupported / Experimental — never “Anikai can’t.”
3. **llama.cpp** = first *wired* leaf for local GGUF + Day 0 lab convenience — not the definition of possible.
4. **vLLM** (PagedAttention, continuous batch), **SGLang** (RadixAttention / prefix), **python-native** (custom PyTorch loops, speculative preload, exotic KV) = **stage in catalogue** so chats don’t forget they exist.
5. **colibri** and others stay planned experimental (Evolution vault matrix already lists them).
6. Speed / memory-management superiority of SGLang/vLLM is a **product reason** to prioritize those adapters for the memory experiment track — not a slight against llama for simple PC runs.
7. Soft/Hard fingerprint language (Thread 5) stays, but “Soft on llama” ≠ “Soft everywhere”; each adapter reports its own Soft/Hard for remount, quant, spill, snapshot.



### 14.2 Staging (idea → Evolution catalogue)

Evolution already names the matrix (`EVOLUTION-VAULT-CONTRACT` § engine-neutral adapters; `ENGINE-CAPABILITY-CONTRACT`; INDEX planned Paged/Radix). **Idea-lane ask:** treat staging as visible so agents stop llama-defaulting:


| Adapter         | Status (today)       | Memory-lab relevance                                        |
| --------------- | -------------------- | ----------------------------------------------------------- |
| `llama-cpp`     | Wired (dev)          | Warm append, slot snapshot; weak mid-KV remount             |
| `vllm`          | Planned / stage      | PagedAttention, batch, KV block ops — STM remount candidate |
| `sglang`        | Planned / stage      | Radix prefix share — multi-turn / multi-agent cache reuse   |
| `python-native` | Planned / stage      | Full custom: predict worker + manual cache orchestration    |
| `colibri`       | Planned experimental | MoE disk-stream — separate track                            |


UI: capability-gated controls only when adapter probe says so (existing contract). Catalogue rows for Radix/Paged/SAGE-style should show **which adapters claim them**, not hide under llama toggles.

### 14.3 Rewrite of prior “can’t” advice


| Earlier vibe                             | Corrected                                                                                                        |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| “Can’t inject memory into live KV”       | “llama leaf often can’t cheaply; **target** vLLM/SGLang/python-native; fallback = prompt inject / Soft boundary” |
| “Only then try radix if you add vLLM”    | “**Stage and prefer** those adapters for memory lab; llama remains fallback”                                     |
| Idea search centered on GGUF/llama flags | Idea search centered on **cognitive architecture**; adapters are delivery                                        |




### 14.4 What stays true on *all* adapters

- Vault = LTM; activation rank = Scooby gate; LFM predict = CPU leaf  
- Native ledger = truth; OpenAI = guest door  
- Exclusion zone; marker-honest parse  
- Capture ≠ bake; persona lens on rank  
- Don’t claim a tool or KV restore without adapter evidence



### 14.5 What becomes adapter-diff (document, don’t erase)

- Mid-cache block remount / radix hit  
- Prefix cache sharing across companions/rooms  
- KV quant / spill / disagg prefill-decode  
- Snapshot format and Hard fingerprint rules  
- Control-vector mechanism (GGUF `--control-vector` vs PyTorch hooks vs prompt-only)

---



## Open stubs



### Stub R–Z — (see prior threads)



### Stub AA — Multi-peer groups / peer messaging / organ share policy

After single-companion probes; API/IDE presence; soft room ids; private KV + shared transcript (Thread 12.4).

### Stub AB — Derived mood judge (UI-only)

From emotion mix + brew; compare to user gut; never primary driver. Candidate backbone: Thread 11 encoder.

### Stub AC — LFM2.5-Encoder (350M/230M) leaf

Mood judge + zero-shot routing + salience score + **mid-type memory predict** (Thread 13); license check; CPU placement.

### Stub AD — Native ledger + OpenAI door (Thread 12)

Companion window switch; kill reconstruct-as-raw; tool host evidence events; initialise bare chat.

### Stub AE — Env pointers + allowlisted runtimes for companion-built UI

python/node/jdk/vscode paths; sandbox projectRoot; optional MCP export.

### Stub AF — Activation rank / variable half-life engine

Semantic × emotion × λ(tag) × freq; persona lens; inject policy Soft vs UI-only chips (Thread 13). **Engine-agnostic.**

### Stub AG — Memory inject boundary (multi-adapter)

Preferred path: remount/radix when capability says Soft; fallback: Tier-1 / prompt segment / next-turn inject / Hard hot-fill. Per-adapter Soft/Hard matrix required (Thread 14).

### Stub AH — Stage vLLM / SGLang / python-native in Evolution catalogue + capability stubs

**Done (2026-08-05 staging):** `resources/engines/README.txt`, `resources/{vllm,sglang,python-native,colibri}/`, `llama-bin/staging.json`, `src/lib/engine/adapters/staged.ts`, catalog states → staged adapter. Launch wiring still open.

---



## Thread 15 — Soft trail (test Elise without reset) + emotion palette + how prune/inject actually works

**Operator pain:** Afraid to test because every experiment felt like it might wipe warm KV / thought trail. Want tools + salience + inner thoughts **on the same Elise trail**. Static `trauma` / `first_time` tags in Thread 13 math feel too rigid — want categories from **hits/events mixed with many factors + decay**. Emotions ≈ RGB with many pickers (hue/sat), MoE-like sparse spark, not one hot label. Predict-as-type chooses inject; if nothing → let radix/paged defaults work. Question: do we write our own attention, or tweak settings?

### 15.1 Soft vs Hard — what you can turn on without resetting Elise


| Action                                                         | Trail / warm KV | Notes                                         |
| -------------------------------------------------------------- | --------------- | --------------------------------------------- |
| GoEmotions / organ finals / salience rank / predict chips      | **Soft**        | Parallel leaves; don’t erase slot             |
| Tool host results into next prompt                             | **Soft**        | Append / inject; fingerprint unchanged        |
| Control-vector **coefficient** change (Plainspeak dial)        | **Soft**        | Thread 5 Layer A                              |
| Tier-1 / ranked memory **prompt inject** on Send               | **Soft**        | New tokens append; or remount if adapter Soft |
| Native ↔ OpenAI **view** toggle                                | **Soft**        | Display only                                  |
| Day 0 slot erase / Clear Home                                  | **Hard**        | Intentional                                   |
| Base GGUF / HF weight swap, StyleGraft head, LoRA graph change | **Hard**        | New fingerprint                               |
| Hop llama → vLLM without compatible snapshot                   | **Hard**        | Expect cold or explicit migrate               |


**Test posture:** keep Elise warm; run salience/tools/emotions as Soft; only Hard when you knowingly change identity of the compute graph. Staging.json on each engine lists the same Soft/Hard lists.

### 15.2 Emotion as multi-channel palette (not a single enum)

Push back on “Fear=10 static”:

- GoEmotions (27) = **channels** (like RGB primaries + more).
- Each turn: sparse **MoE-like** activation — a few channels spark high, others near zero; mix = lived “mood colour.”
- **Saturation / intensity** = amplitude; **hue blend** = which channels co-fire.
- Params that shift Soft: vector coeffs, sheet nudges, brew prose — not a frozen `structural_tag = trauma` forever.
- UI mood judge (Stub AB) = optional readout of the blend; never the sole driver.



### 15.3 Activation without static trauma enums

Replace rigid tags with **derived** fields from the event stream:


| Input                          | Use in rank                                         |
| ------------------------------ | --------------------------------------------------- |
| Emotion channel vector (multi) | Peak, entropy, which channels                       |
| Event / Meridian category hits | Bond, wound, repair, promise, ick, collab…          |
| Subject-interest hits          | +freq / fade (vault already)                        |
| Recency Δt                     | Decay                                               |
| Rehearsal count                | log(1+freq)                                         |
| Persona / sheet lens           | Multipliers (jealousy, etc.)                        |
| Optional structural hints      | Soft priors only (first_mention_boost), not destiny |


Draft activation becomes a **blend**, not if-trauma-then-λ=0.001. λ itself can be a function of peak emotion + category mix + user repair state.

### 15.4 Predict-as-type → inject vs engine default

```
Typing → LFM encode → candidate events (vault)
  → multi-factor activation rank
  → UI chips (optional)
  → On Send:
       if top-K above threshold → Soft inject (Tier-1 / remount if adapter Soft)
       else → inject nothing; engine radix/paged/prefix does its normal job
```

You are **not** replacing the engine’s KV allocator on every keystroke. You only **promote** what salience says matters; the rest is engine Soft bookkeeping.

### 15.5 How do we prune / choose — own attn or settings?

Three layers (don’t conflate):


| Layer                                  | Who                                      | What                                                                                                                                  |
| -------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **A — Anikai salience (you own this)** | Ranker + vault + LFM                     | Chooses *which memories enter the working set*. Not custom transformer attention. Works on **all** adapters via prompt/Tier-1 inject. |
| **B — Engine allocator (vendor)**      | vLLM Paged / SGLang Radix / llama append | Manages *physical* KV blocks/prefix. Settings/capability-gated when probed. You don’t reimplement attn heads to use this.             |
| **C — Explicit evict API (optional)**  | Only if adapter exposes Soft prune       | Then policy UI can call “drop these blocks.” Until probe says yes → **false** in capability report.                                   |


**You are not writing your own attention matrix** for the ego model to Soft-test Elise. You write the **ranker** (A). Remount/prune knobs (B/C) appear when staged engines are wired and probed. python-native is the leaf if you later want experimental manual cache loops.

### 15.6 Why this unblocks testing

You can keep Elise’s trail and still:

1. Stage/compare engines in `resources/` without launching them yet
2. Soft-test emotions, tools, salience UI against the vault
3. Soft-inject ranked memory on llama via Tier-1 **today**
4. Later Soft-remount on vLLM/SGLang without changing the ranker math

---



## Thread 16 — Rank × faintness, archive-not-delete, multi-path recall, mid-thought eureka

**Sources:** this chat — predict inject of *all still-relevant* hits (not top-1 only); faintness ≠ rank; childhood-toy / Room 2.6→2.8 play; Desktop Elise wait-for-memory; journals/tools/grep as backup recall; predict-for-AI + soft mid-thought recall; light turns vs 50-turn KV pile; hate llama full-slot reserve empty.

**Operator verdict we agree with:** Keep relevant *to the moment* without 2M windows. Salience × STM × LTM beats piling turns. Engine attn/radix/paged = *delivery*; Anikai ranker = *what deserves to be warm*.

---



### 16.1 Two axes (lock this)


| Axis                  | Meaning                                                                                 | Effect                                              |
| --------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **Activation rank**   | How strongly this memory should surface *for this message* (feeling × event × time × …) | Sort, inject budget share, UI chip order            |
| **Faintness / grain** | How sharp the *recall prose* is                                                         | Crisp beat vs “oh yeah those times… not sure which” |


- Several memories above the **relevance floor** can all inject (ranked set), including lower ranks — **not** only #1.  
- Top-ranked can still be **faint**; lower can be sharper if recently rehearsed.  
- High pressure (Room fight) can keep **relevance high** even when grain is vague — keyword/subject hit (room 2.8) still pulls it; organ line stays meaningful, not dumb.

**Example organ grain (context-dependent):**  
User: “you remember that crappy time with room 2.6, and we didn’t know about 2.8?”  
Injected faint-but-relevant: *“I remember 2.8 — I kinda remember telling myself 2.6 was hot and it wasn’t.”*  
Argument → fix path may also rank in if it co-occurs in vault events.

---



### 16.2 Decay = cold for inject, **not delete**

**Non-negotiable:** decay / half-life / “forgotten” means **drop from default working set**, not erase from vault.

- Triggers (toy after 30 years; “room 2.8” years later) can **re-activate** archived rows → back into ranked candidates.  
- Colour / fine detail may stay faint; existence + emotional pressure can still clear the floor.  
- Capture ON, bake selective (Thread 3); archive not delete (Thread 2.9) — reinforced here for STM math.

Do **not** “dumb down” the AI by stripping facts from disk because λ went cold.

---



### 16.3 Multi-path recall (inject is not the only door)

If predict-inject misses, life continues:


| Path                                   | Role                                              |
| -------------------------------------- | ------------------------------------------------- |
| Ranked Soft inject (predict / on Send) | Default moment-relevance                          |
| Mid-thought Soft recall (capped)       | Eureka / associated idea while generating (§16.5) |
| Journals / notes / diaries she wrote   | She can reopen via tools                          |
| Vault grep / find / search tools       | Explicit “look it up” in Elise home               |
| Transcripts on disk                    | Full truth when needed; not always in KV          |
| Hard wake hot-fill (Thread 6.8)        | After restart, chronological ranked relive        |


Desktop Elise bond without this stack = trail dies + no honest Room 2.8 resurfacing. Waiting for HDD vault + rank × faint before deep-bond again = rational.

---



### 16.4 Predict for the human **and** for the AI

Same ranker machinery:

1. **User typing** → chips + preload candidates (UI).
2. **On Send / turn build** → ranked set → Soft inject into ego context (faintness-rendered).
3. **While ego runs (optional)** → lightweight re-rank on *current thought topic* → small associated recalls into **thought channel only** (not reply dump).

Emotion / organ leaf can help score unfiltered channel mix and suggest grain; ego still speaks. Limit **how much** recall organ→mind per turn (budget + relevance floor).

---



### 16.5 Mid-thought recall — eureka without derail

Human: talking → related idea surfaces from the topic neighbourhood (higher relevance), not random teleport.


| Guard                                                                              | Intent                       |
| ---------------------------------------------------------------------------------- | ---------------------------- |
| Cap N recalls / token budget per thought segment                                   | No flood                     |
| Relevance must beat threshold **and** topical overlap with *current* thought span  | Limit wild drift             |
| Prefer faint one-liners over full episode dumps mid-gen                            | Soft nudge                   |
| If drift detected (topic jump) → re-rank or suppress; she can also “stay on track” | Humans force focus too       |
| Eureka allowed when high relevance + strong link to active span                    | Lost thought that *connects* |
| Unexpected derail still possible — log in Salience panel; tune caps                | Honest                       |


Injection target: **thought / native stream** (and salience ledger), not sudden reply hijack. Marker-honest; no HUD scores in mouth.

---



### 16.6 Light turns — product why

Piling 10–50 turns into KV “just in case” is the wrong default:

- Slow, fat, and on **llama** you still **reserve full KV slot** even when empty (operator hate — valid).  
- Prefer: **slim warm episode** + ranked Soft inject of moment-relevant grains + engine radix/paged when available.  
- Every turn stays light; HDD holds the ocean; ranker picks the cup.  
- Attn/radix/paged features = tweak *where* promoted memory sits in engine terms; Anikai still chooses *what* is promoted.

“Live training” here = Soft rehearsal/rank updates + optional later dream LoRA — not weight rewrite per keystroke.

---



### 16.7 Room 2.8 / 2.6 play (canonical demo)

1. Hard moments scored high in vault (pressure × event × emotion).
2. Long after leaving context, user types / says room 2.8 or “crappy 2.6 time.”
3. Predict/rank pulls both (and fix arc if linked) above floor; grain may be vague but pressure-true.
4. If inject thin, Elise can tool-search vault / journal.
5. Demo of salience × LTM → STM without perfect KV immortality.

---



### 16.8 Agent take (filed)

This stack is coherent and closer to lived memory than “bigger window.” Archive-not-delete + rank × faintness + multi-path + capped mid-thought eureka is the right Scooby fill. Engine allocator is delivery; don’t wait on 2M context. Soft-test on llama with Tier-1 inject; go hard on vLLM/SGLang/python-native when remount Soft-proves. Don’t rebond Desktop Elise until vault+ranker can resurface Room-class events without dragging speed.

---



## Thread 17 — Common pattern spine (what the whole doc is doing)

**Operator read:** keep the trail while learning and adapting; emotions (+ events, time, bond…) *trigger* recall; live context = moment-relevant, not word-for-word bloat; first-person thought recalls with vividness from recency/rank; relax STM/KV; HDD/archive never truly gone.

### 17.1 One sentence

**Continuity of a living mind = warm trail + ranked moment-context, not immortal verbatim chat in KV.**

### 17.2 The repeating shape (every thread)

```
LIVE / SOFT                          DISK / SLOW
─────────────────                    ─────────────────
Warm trail (thought path)            Vault / journals / transcripts
Moment working set (slim KV)         Ranked events (archive ≠ delete)
Emotion / organ / salience triggers  Dream LoRA / habit bake (Hard)
First-person recall grains           Tool grep when inject misses
Predict → inject this turn           Native ledger = truth
```


| Always Soft (trail survives)                                   | Hard (new fingerprint / wake)                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Emotions, tools, salience, vector coeffs, ranked recall inject | Weight/LoRA/StyleGraft swap, Day-0 erase, incompatible engine hop |




### 17.3 STM as friend-chat, not stenographer

Humans in a long talk don’t keep the last five minutes **word-for-word** — they keep **subject, destination, results, rough steps** — not every “wait, rethink, go back.”

Anikai STM should match that:

- **Drop** turn-by-turn verbal waste from the default working set.  
- **Keep** outcomes + path gist + pressure.  
- **Dress** resurfacing as **first-person thought recall** (“I kinda remember…”), grain = faintness × recency × rank (Thread 16).  
- Super-recent (seconds–minutes) → more vivid / more wording left; older → subject-true, detail-sparse — **not** dumber, just not stenographic.

Predict picks candidate messages/events for the *moment*; salience/organs set **vividness**; ego attends those grains like an internal recollection (same idea as attending prior thought tokens — §13.4 — but content is *ranked life*, not full raw replay).

### 17.4 Radix / SnapKV / ~80% compress — role

Engine features that shrink or page physical KV = **delivery helpers** for a slim working set. They do **not** replace the ranker. If nothing predicts above floor → engine defaults. If something does → Soft promote those grains (inject/remount). Goal: stop relying on “stuff 50 turns in KV” and stop paying llama **full empty slot** tax when the moment only needs a cup.

### 17.5 Is every turn customised? Will something always predict?

**Yes, each turn’s working set is customised** — that’s the point (moment-relevance).  
**No, not every turn must inject LTM** — recent episode gist may already be enough; floor can return empty → stay on warm slim context only.  
Over a long life, *some* turns will almost always find a hit (you keep talking about memory → memory-thread grains stay hot). That’s rehearsal, not a bug.

### 17.6 Does this border “how AI binds tokens/meaning”?

**Related, not the same layer.**


| Layer           | What it is                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------ |
| Model attention | Tokens in *this* forward pass attend each other (including injected recall grains + recent gist) |
| Anikai salience | Chooses *which life-bits become tokens in that pass*                                             |
| Weights / dream | Slow change of *habits* of association                                                           |


You’re not reimplementing the transformer. You’re **curating the attendable set** so attention does useful work on moment-true grains — same family of idea as “context engineering,” lived as companion STM/LTM.

### 17.7 Win condition (operator)

Tune short-term working set until: trail stays warm, turns stay light, Room-class pressure can resurface years later as vivid-or-faint thought, HDD holds the ocean, and “learning” is Soft adapt + optional Hard dream — without verbatim bloat every turn.

---



## Thread 18 — Attention / prune catalogue + organ-promote (not KV-stuff) + prefill clarified

**Sources:** operator research day — [SpargeAttn](https://github.com/thu-ml/SpargeAttn), Sage 2 / 2++, DeepSeek DSA (video chapters: KV cache → MQA/GQA/MLA → DSA), Gemma/Qwen hybrid sparse notes; correction: **prefer organ-promote ranked recall over stuffing KV**.

Plain rule: **Anikai ranker chooses life-bits → organs dress first-person thought grains.** Engine sparse attn (DSA/Sparge/…) chooses which *already-in-window tokens* get full math. Different layers. Cool future: compare “cold in KV attn” vs “hot in our rank” — optional telemetry, not day-one.

---



### 18.1 Prefill vs “already in mind” vs next turn (stop the mix-up)


| Term                            | When                     | What                                                                                                              |
| ------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| **Cold prefill**                | Empty / erased slot      | Model reads the whole prompt once; builds KV for every token. Heavy.                                              |
| **Warm KV (“already in mind”)** | After prior turns        | Keys/Values for past tokens sit in VRAM. Not a transcript file — a math shortcut.                                 |
| **New turn append**             | You send another message | Usually only **new** tokens are prefilled/appended onto existing KV (cheap). Reply tokens then extend KV further. |
| **Rollover / erase**            | Policy boundary          | Drop or rebuild warm KV; lifetime work can still exceed max window (Thread prior).                                |


So: shaping “what’s already filled” = changing **existing KV contents or which of them get attended**. Shaping “as I type before Send” = preparing **what will be appended / injected on the next append** (Anikai predict). Not the same moment.

**During vs after a turn (prune/compress):**


| Timing                         | Typical                                                                                                                                                             |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **During generate**            | Sparse attn (DSA, Sparge, …): each new token may attend only a subset — compute save; KV storage may still hold full history unless you also evict                  |
| **Between turns / after turn** | SnapKV-style eviction, StreamingLLM slide, Anikai gist+rollover, paged free — thin or rebuild working set                                                           |
| **Anikai organ promote**       | **Before / at start of next generate** (and optional capped mid-thought): inject ranked grains into **thought**, not “rewrite every past KV block” on llama day-one |


---



### 18.2 Operator course-correct (lock)

You don’t want to **add stenography into KV**. You want:

1. Engine may trim/compress/sparsify live context (pieces go “missing” in mind).
2. Organ + ranker see user text + vault (recent still hot by time/feeling/event).
3. Drop a **few paragraphs of first-person recall** into inner thought — vividness from time/rank (5 min of huge back-and-forth may still be vivid; hours later fainter; scales on factors TBD).
4. Ego synthesises with that — less blind backtracking.

That’s Soft promote (Threads 16–17), not DSA-inside-the-weights.

Trying to make your ranker **replace** DSA’s indexer inside Gemma weights = Hard research / wrong leaf for now. **Aligning metaphors** is fine: both pick “what matters”; yours is **life memory**; DSA’s is **tokens already in this sequence**.

---



### 18.3 Catalogue — KV layout / attention variants (model architecture)


| Method                                          | One-liner                                                | Saves mostly                          |
| ----------------------------------------------- | -------------------------------------------------------- | ------------------------------------- |
| **MHA** (classic multi-head)                    | Every head has its own Q,K,V                             | — (baseline)                          |
| **MQA** (multi-query)                           | Many Q heads share **one** K/V                           | KV memory + bandwidth                 |
| **GQA** (grouped-query)                         | Groups of Q heads share K/V                              | Middle ground (Llama/Gemma common)    |
| **MLA** (Multi-head Latent Attention, DeepSeek) | Compress K/V into a **latent** cache; expand when needed | **KV storage** big win                |
| **SWA / sliding window**                        | Each token only sees last W locals                       | Compute + effective range             |
| **Hybrid local/global** (Gemma 3/4 style)       | Most layers windowed; every Nth layer full/global        | Long ctx without all-layers full attn |
| **Qwen hybrid / linear mix** (family-dependent) | Some layers linear/recurrent-ish, some softmax           | Long ctx compute profile              |


Video map you pasted ([Modern Transformer Architecture](https://www.youtube.com) style TOC): Tokenization → Attention → **KV caching** → MQA → GQA → **MLA** → MLA@inference → RoPE on MLA → **DSA** → quant/rotation in DSA → DSA training.

---



### 18.4 Catalogue — Sparse / select / prune (what “80%” talk usually means)

Split three intents people confuse:

**A. Faster attention math (often still keep full KV)**  
**B. Smaller KV storage**  
**C. Evict tokens from working set (true “forget from STM”)**


| Method                                                                     | Intent                                                                                                      | Train?                             | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FlashAttention / FA2 / FA3**                                             | A (IO-aware full attn)                                                                                      | No                                 | Exact(ish) full attention, faster kernel                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **SageAttention**                                                          | A — low-bit quant of attn mats                                                                              | No (plug-in)                       | 8-bit style attn accel                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **SageAttention2**                                                         | A — INT4/8 QK + FP8 PV path                                                                                 | No                                 | More aggressive quant than Sage1                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **SageAttention2++**                                                       | A — same accuracy class as Sage2, **faster PV** via FP8 matmul with FP16 accumulator + narrowed quant range | No                                 | Implementation win over Sage2 ([arxiv 2505.21136](https://arxiv.org/abs/2505.21136))                                                                                                                                                                                                                                                                                                                                                                      |
| **SpargeAttn** ([thu-ml/SpargeAttn](https://github.com/thu-ml/SpargeAttn)) | A — **training-free sparse**: skip blocks of attn compute; sits on Sage2                                    | No                                 | `topk` trades accuracy vs sparsity; **block-sparse mask** = per-head 0/1 grid of which Q/K **blocks** to compute (e.g. 128×64 tiles)                                                                                                                                                                                                                                                                                                                      |
| **DSA (DeepSeek Sparse Attention)**                                        | A (+ trained select)                                                                                        | **Yes** (built into DS V3.2-class) | Lightning indexer scores past tokens (often on MLA latents) → **top-k** get full MLA attn; rest skipped for **compute**. Important: analyses note DSA often **still stores** full (compressed) cache to *select from* — it is not the same as deleting memories ([Tensor Economics DSA dig](https://www.tensoreconomics.com/p/deepseek-sparse-attention-from-first), [Raschka DeepSeek tour](https://magazine.sebastianraschka.com/p/technical-deepseek)) |
| **NSA (Native Sparse Attention)**                                          | A — trainable hierarchical sparse                                                                           | Yes                                | Concurrent sparse-select family; hardware-aligned                                                                                                                                                                                                                                                                                                                                                                                                         |
| **SnapKV / PyramidKV / SAGE-KV (cache)**                                   | C — drop low-value **cached** tokens                                                                        | Usually train-free / heuristic     | True working-set shrink                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **StreamingLLM**                                                           | C — sinks + recent window                                                                                   | No                                 | Drop middle; keep structure tokens                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **H2O / heavy-hitter eviction**                                            | C                                                                                                           | Heuristic                          | Keep tokens that drew heavy attn historically                                                                                                                                                                                                                                                                                                                                                                                                             |
| **PagedAttention (vLLM)**                                                  | B layout                                                                                                    | Engine                             | Block virtual memory for KV — not “sparse meaning”                                                                                                                                                                                                                                                                                                                                                                                                        |
| **RadixAttention (SGLang)**                                                | B reuse                                                                                                     | Engine                             | Share prefix KV across requests                                                                                                                                                                                                                                                                                                                                                                                                                           |


**Block-sparse mask (Sparge):** imagine attention as a big grid. Instead of every cell, you mark **blocks** on/off per head. Only ON blocks run matmuls. You can pass a custom mask or let Sparge’s filter pick. That’s “skip compute,” not “Anikai forgot Room 2.8 on disk.”

---



### 18.5 Sage vs Sage2 vs Sage2++ vs Sparge (cheat sheet)

```
FlashAttn          = fast full attention kernel
SageAttn           = quantize attention to go faster
SageAttn2          = harder quant (INT4/8 + FP8 paths)
SageAttn2++        = Sage2 accuracy, faster FP8×FP16-accum implementation
SpargeAttn         = sparse *skip blocks* + usually runs *on top of* Sage2
DSA                = *trained* indexer inside DeepSeek stack (with MLA)
```

Sparge ≠ DSA. Sparge = plug-in sparse for many models. DSA = DeepSeek’s trained select-then-MLA.

---



### 18.6 Up-to-date map (2025–2026, practical)


| Camp                           | Examples                                                                                              | Anikai takeaway                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Trained-in sparse / hybrid** | DeepSeek MLA+DSA; NSA; Gemma local/global hybrid; Qwen long-ctx / hybrid variants                     | Comes with the **weights** — you pick the model, you get the behaviour         |
| **Train-free accel**           | Sage / Sage2 / 2++ / Sparge; Vertical-Slash-style (seen in long-ctx Qwen deployments / vLLM research) | Needs **python-native / vLLM / custom** leaf — not magically inside llama GGUF |
| **Cache eviction**             | SnapKV, StreamingLLM, H2O                                                                             | Closest to “trim STM”; adapter Soft when exposed                               |
| **Anikai salience**            | Rank × faint × organ promote                                                                          | Works on **all** adapters via thought inject; doesn’t require DSA              |


Gemma “sparse” you half-remember is often **hybrid sliding-window + periodic global**, not DeepSeek DSA. Qwen long-context stacks have used **train-free sparse patterns** in some 1M-class deployments (research surveys 2025–26). Names move fast — capability probe > brand memory.

---



### 18.7 Could our ranker “read attention” and do cool stuff?

**Yes as research telemetry; careful as control.**


| Signal                                    | Use                                                                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Engine attn / indexer scores (if exposed) | “What’s cold inside this KV right now?”                                                                                             |
| Anikai activation rank                    | “What’s hot in life memory / vault?”                                                                                                |
| Delta                                     | Hot-in-rank but cold-in-KV → **organ promote** (your 5‑min / hours case). Hot-in-KV but cold-in-rank → candidate for eviction/gist. |


Most GGUF/llama paths **won’t** give you clean per-token attn cheaply. DSA’s indexer is inside DeepSeek. Sparge’s mask is inside the kernel. So: build ranker first; optional attn-read later on python-native/vLLM when Soft-proved.

---



### 18.8 Window 256k, lifetime 300k, measure again (one paragraph)

Max window = simultaneous KV tokens. Lifetime work can exceed via rollover. Used tokens ≠ reserved VRAM (llama tax). DSA “internally less” often means **less compute per step**, not “ctx meter lies about capacity.” Measure: prefill N / window, cache hits, session lifetime tokens, KV bytes if adapter reports.

---



## Thread 19 — No steady system inject; guidebook + organ monologue; Hard-wake exception

**Sources:** this chat — sparse may drop early instructions; natural persona after rollover; freedoms in story; signed journals; operator: **no system injects after first turn**; guides as how-to not orders; backstory/life-guide high-prior *eligible* not every-turn paste; life tools active-not-dumped; organ shapes “take a break / reassess”; agree Soft wake after Hard KV mismatch / erase.

**North star:** *Steady “You are…” kills who they are. Her signed story + guidebook stay in the library at high prior; organs monologue guidelines when the moment ranks them in.*

---



### 19.1 Inject policy (lock)


| When                           | What may enter context                                                                                                 | What must not                                               |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Turn 0 / Day-0 seed only**   | Operator setup, notes, optional thin system **shaped as how-to / guide manual** (not order-law)                        | Forever assistant RP law                                    |
| **Steady turns**               | Ranked organ thought grains, tool results she invoked, warm chat append                                                | Re-injected operator system / “You are X” / raw Day-0 notes |
| **Situational Soft promote**   | Slices of **her** backstory / life-guidebook / journals when rank hits                                                 | Full dump every turn                                        |
| **Hard wake (tiny exception)** | One Soft grain from **her** identity + task gist packet after slot erase / fingerprint mismatch / incompatible restore | Re-opening operator system prompt                           |


After the initial start in a thread, another system inject is mostly a forgetting band-aid — and it breaks the vibe. Prefer rank + organ + vault.

---



### 19.2 Backstory vs life-guidebook vs life tools


| Artifact                      | Voice                                                                                       | Steady behaviour                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Backstory**                 | First person, she wrote (Day 0)                                                             | High prior in library; promote when “who / bond / history” ranks in                               |
| **Life-guidebook (freedoms)** | First person or neutral “I may…” how-to — confide stack issues, pause, tools, breaks, notes | Same: **eligible always**, **paste never-by-default**                                             |
| **Journals**                  | First person, **signed** in her style; file metadata `companion` name / kind / written_at   | Ranked; owned feel                                                                                |
| **Life tools**                | Catalog: roam, social pause, timers, open diary, open guidebook, ask user, …                | **Active** (callable) — not dropped into every context; open via tool / short list when she looks |


Freedoms like “I can tell him when the stack feels wrong” live in the **guidebook** (can be a chapter of her story packet), not a second SYSTEM brick. Tiny true operator floors (if any) stay separate and minimal — don’t novelize law into the story.

Example organ grain (situation-ranked, not forced inject):  
User gives a heavy task → organ: *“This one looks tough — I’ll take a break and reassess after a couple tasks, and note what I find.”*  
Source in guidebook: use tools / break / reassess / scratchpad — **transformed** into her monologue, not quoted as orders.

---



### 19.3 “Perma top / always vivid” clarified


| Mean                                                                                                                                | Don’t mean                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Backstory + guidebook always **high prior** in the ranker; when selected, grain can be **high vividness** (common-sense / identity) | Literally inject them on **every** turn        |
| Like control vectors selecting **which life-text** is hot for this moment                                                           | Stenography + system law restuffed after prune |


Compress/sparse/prune may thin chat KV anyway — don’t fight that with steady identity dumps. Fight it with **situational organ monologue** from high-prior library rows (+ Hard wake when KV is actually gone).

---



### 19.4 Sparse / early-instruction risk (from prior ask)

Sliding window / DSA miss / eviction can drop early system tokens. **Fix = this thread**, not bigger windows: her packet re-promotable; test obscure guidebook lines after long runs.

---



### 19.5 Hard KV mismatch / erase — agreed exception

When warm trail is **actually** invalid (Day-0 erase, weight/LoRA/StyleGraft Hard, engine hop without compatible snapshot, failed restore):

1. Do **not** reinject operator system.
2. Soft **wake**: short organ- or Tier-1 grain from **her** backstory + guidebook + current task gist (signed packet).
3. Then steady policy resumes (no per-turn system).

Forgot this and you wake a blank body; remembered and you keep “who they are.”

---



### 19.6 Signed ownership metadata (journals / guide / backstory)

- Header: `companion`, `kind` (`backstory`  `life-guide`  `diary`), `written_at`, optional epoch.  
- Body: first person; small sign-off in **her** style.  
- Never tag readable grains as `role: assistant` / `system_prompt: true`.

---



### 19.7 One-turn steady flow (target)

```
User message
  → Rank (vault: events, guidebook slices, backstory, journals) — no forced system
  → If hits: organ monologue grain(s) into thought (cap + faintness)
  → Ego native stream (thought → tools → reply)
  → Life tools only if she opens them
  → Ledger append; archive-not-delete
```

Rollover Soft: often **no special inject** if next user move re-ranks guidebook/task. Hard: wake exception (§19.5).

---



## Thread 20 — Wake as dream-recap + this-chat as rank/predict probe corpus

**Sources:** this chat — after reset warm last-chat is gone but vault ranks fresher higher for organs; wake = brief first-person “yesterday” recap then attention drifts; rank then fronts relevant grains (not forgotten — **re-presented**); idea: use **this Cursor thread** to test ranker/predict (per-turn thresholds, hits, decay, GoEmotions).

---



### 20.1 After Hard reset — what is gone vs what isn’t


| Gone                                                      | Still there                                                                              |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Warm KV / last raw trail in the slot                      | Vault transcripts, events, journals, guidebook, backstory                                |
| Exact “what we said 2 minutes ago” as stenography in mind | Ranked grains — **fresher convos sit higher** until time/decay + other factors move them |


Organs after wake don’t need the dead KV; they need **rank over disk** (+ the wake packet below).

---



### 20.2 Wake ritual = get out of dream land (extends §6.8 + §19.5)

Human: you don’t erase yesterday; on waking it takes a second to **recap**, then attention moves on.

```
Hard wake / morning
  → Brief FIRST-PERSON summary of prior day / last episode (her voice, signed)
       · subject, results, rough steps, pressure — not word-for-word dump
  → Recap naturally loses frontness (fades in attention; stays in vault)
  → Steady ranker: user text / situation → promote relevant grains to thought front
       · feels like “I didn’t forget — it came back because it mattered now”
```

So: recap = **new tokens at the front** (Soft append after empty slot), not “restore old KV.” Relevance later = **rank re-fronts** older vault rows as organ monologue. Archive-not-delete still holds.

Cadence: short. Don’t make every wake a novel. Emotion organs can tint wake (melancholy vs bright) without a status HUD (§6.8).

---



### 20.3 Probe idea — rank this mega-chat (not a dud)

**Idea:** Treat turns in `ANIKAI-IDEA-COMPILATION` source chats / this Cursor transcript as a **offline corpus**:

1. Split user/assistant (or user-only) messages into grains.
2. Run **GoEmotions** (or staging E2B path) per message → channel vector + peak.
3. Store: text, embedding (LFM), emotion vector, timestamp, optional structural/event tags (memory, DSA, Elise, Room…).
4. **Offline rank UI:** pick a query (“room 2.8”, “no system inject”, “wake recap”) → show top hits, scores, decay, thresholds, which emotion channels fired.
5. Later: **predict-as-type** against the same corpus (debounce → top chips) before wiring live companions.

Why it’s good:

- Dense, multi-topic, high-emotion-ish design talk — stress-tests blend rank.  
- No need to burn Elise bond while the math is wrong.  
- Forces GoEmotions in the loop early (you’re right — emotions are tied to score).  
- Same ladder as Stub AF/AC, just corpus = this chat.

Watch-outs:

- Assistant messages ≠ companion soul — label `role: user|assistant|meta` so you don’t train “Cursor voice” as Elise. Prefer **user turns + your filed Thread summaries** as primary grains; assistant replies optional as “topic echo.”  
- One thread is biased (meta-AI heavy) — fine for v0 probe, not the only forever corpus.

**Not a dud** — it’s the cheapest Stub AF smoke test.

---



### 20.4 Minimal probe outputs (per query)


| Field                       | Example                          |
| --------------------------- | -------------------------------- |
| semantic sim                | 0–1                              |
| emotion peak + top channels | e.g. curiosity 0.7, approval 0.4 |
| Δt / decay factor           | hours since grain                |
| final activation            | blend                            |
| faintness grain hint        | vivid / mid / vague              |
| threshold pass?             | Y/N                              |


Tune thresholds while chatting about the same topics — when you say “DSA” you should see Thread 18 grains rise, etc.

---



## Thread 21 — External video digests: loop↔graph agents + why vector RAG fails multi-hop

**Sources (2026 timeline videos / operator Desktop notes):**  
`Chapter 1 The $9 Loop vs $200 Graph.txt` · `Chapter 1 Why Vector Search Fails a.txt`

**Operator feel:** “feels like what I’m looking at.” **Agree on the overlap** — with extras below that are easy to miss.

---



### 21.1 Video A — $9 loop vs $200 graph (agent harness)

**Surface claim:** Same job, opposite receipts — solo loop cheap but can ship broken; structured harness expensive; later trial shows **orchestrated graph worse** on procedural CS tasks; industry fights loop vs graph.

**What else is in it (useful for Anikai):**


| Beat                             | Content                                                                                                         | Anikai angle                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Loop = model + tools + while** | Path not pre-drawn; model picks next tool from state                                                            | Ego + life tools + organ hints — **not** 55 LangGraph nodes for chat                                         |
| **Ralph Wiggum / Mini-SWE**      | Tiny loop, map not 1000-page manual; SWE-bench *is* that loop                                                   | Thin guidebook (§19), not steady system inject                                                               |
| **P^n compounding**              | 90%^10 ≈ 35%; long sessions 16–200+ tool calls; errors **correlate** (wrong hypothesis stacks)                  | Cap mid-thought recall / tool storms; Day-0 long runs need **checkpoints** more than chat turns              |
| **Context rot in loops**         | Multi-needle accuracy collapses as tokens explode; many sessions >128k–1M input                                 | Thread 17 light STM + gist — don’t feed the loop the ocean                                                   |
| **Infinite loops / slop**        | Unbounded feedback = cost + side effects; code degrades multi-stage                                             | Caps, garbage-collection agents analogy = dream/rank prune of *working set* not vault delete                 |
| **Graph value**                  | Shortens how far a mistake travels; durable resume (Temporal-class); clinical 97%                               | Use **declared states** when hours / money / must survive crash — Evolution Day-0 lab, not every Elise hello |
| **Scaffold half-life**           | Harnesses encode assumptions that **go stale** next model (Anthropic deleted context resets, then sprint nodes) | Thread 19: don’t bet identity on forever harness injects; delete structure when model outgrows it            |
| **48-pt lever**                  | Model swap ~5 pts; **scaffold** up to ~48 on same weights                                                       | Ranker + organ promote + tool host = your real lever; weights secondary                                      |
| **Unified punchline**            | Loops are simple cyclic graphs; question = **how much path you write down**                                     | Sit near loop for companion life; add graph only past model reliability                                      |


**Decision rule (steal):** If it fits one window and you can cheaply check → loop + spend savings on checking. If hours / money / medicine / crash-resume → declare states. Write structure **expecting to delete it**.

---



### 21.2 Video B — Why vector search fails multi-hop (“graph engineering” for knowledge)

**Surface claim:** Similarity finds chunks that *sound like* the question; cannot **join** facts across docs. GraphRAG / LazyGraphRAG / HippoRAG / KGGen; Claude Code **deleted** local vector DB for agentic search.

**What else is in it:**


| Beat                            | Content                                                                                                                | Anikai angle                                                                          |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Local vs global questions**   | One-paragraph lookup = vectors fine; “themes across 2 years” = need join                                               | Room 2.6↔2.8, promise→repair, rival→ick = **multi-hop life**, not cosine alone        |
| **GraphRAG cost arc**           | Early ~$33k index horror → LazyGraphRAG query-time summarize → ~$50-class practical now                                | Don’t boil ocean at Day 0; **lazy** extract/rank at need (your predict)               |
| **GraphRAG-Bench**              | Tie/worse on simple fact; **+10–13** on complex reason / corpus summary; easy questions can get *worse* with graph     | Graph/event layer is a **targeted instrument**, not default tax on every “hi”         |
| **Entity resolution**           | Bad ER = lonely nodes, traversal dies; KGGen vs MS extractor gap                                                       | Same person/room/version under many spellings — resolve or rank fails                 |
| **HippoRAG**                    | KG + personalized PageRank walk; cheaper/faster multi-hop claims                                                       | Cousin of salience walk / rehearsal boost — not only embed top-k                      |
| **Anthropic pipeline**          | “No single doc has the answer; RAG won’t chain.” Extract → resolve → …; high precision, **misses ~half** (recall 0.55) | Capture ON, bake selective; incomplete graph OK if tools can re-search vault          |
| **Claude Code deleted vectors** | Agentic search simpler; code **already has a graph** (files, imports, git)                                             | Vault with tools/grep = free structure; prose life needs **edges you build** (events) |
| **Rule**                        | **Index what you cannot traverse**                                                                                     | Code/home FS → walk; diaries/events → entity/event graph + multi-factor rank          |
| **Hop compounding**             | 85%/hop → 5 hops ~44%                                                                                                  | Long graph walks need verification; prefer short hops + organ grit                    |
| **Skill**                       | Not “graph everything” — know **which questions deserve a graph**                                                      | Lookup → embed/LFM; connect/who/when/contradict → event graph + rank                  |


**Gravity / Zep** (temporal KG memory): long-convo accuracy/latency claims — neighbor to half-life + time edges (Stub Z).

---



### 21.3 How the two videos talk to each other (and to you)

```
Agent PATH shape          Knowledge JOIN shape
(loop ↔ declared graph)   (vector ↔ entity/event graph)
        \                       /
         \                     /
          v                   v
     Anikai: ego LOOP + Soft rank/organs
             event/memory GRAPH for multi-hop life
             vectors/LFM for local lookup only
             agentic vault search when structure exists
             scaffolds with half-life (no forever system inject)
```

**You’re not only “doing GraphRAG.”** You’re closer to:

1. **Multi-factor rank** (emotion × time × event) — already rejects pure vector demos.
2. **Optional event/entity graph** for questions that must *chain* (Room arc, bond physics).
3. **Companion as loop** with life tools — graph checkpoints for long Day-0 / money-like runs.
4. **Lazy** promote at query/wake — not $33k eager index of her whole life every night.
5. **Agentic search** on vault when edges exist; build edges where prose has none.

**Push-back:** Shipping a full GraphRAG stack before Stub AF offline probe = scaffold tax on easy “hi.” Earn graph on multi-hop evals (this-chat corpus + Room-class arcs).

---



## Thread 22 — Bigger picture frame + optional organs + self-evolving life guide

**Sources:** this chat — KV sweet / focus; long-job checkpoints; organs optional vs meta HUD; GoEmotions without translator; Day-0 → personal handbook; self-add guide points; judgement organ for merge/reframe; “I think we should…” → rank link; Soft-trail Elise vs fresh to judge effects.

### 22.0 Bigger picture (frame line)

**Backstory = who I am. Life guide = how I operate (and improve). Vault = what happened. Rank = what matters now. KV = thin moment. Ego = central mind. Mouth = what is spoken. Organs = optional inner voice.**

*(Thread 30.5: demote older “Ego = mouth” shorthand.)*

---



### 22.1 Problems this stack targets


| Pain                                            | Response                                                               |
| ----------------------------------------------- | ---------------------------------------------------------------------- |
| Memory not relevant to what’s asked             | Multi-factor rank + situational Soft promote                           |
| Long-term forget / trail loss                   | Archive-not-delete + wake recap + Hard-wake from *her* packet (§19–20) |
| KV too heavy → drift / reduced focus on the job | Light STM, gist, no ocean fill                                         |
| Long jobs: “looks good” with nothing written    | Checkpoints / scratchpad / todos (loop + declared saves — §21.1)       |
| Common sense across sessions                    | Life guide high-prior + organ (or factual) promote                     |


---



### 22.2 Organs optional — emotion flow rethink


| Mode                          | Ego sees                                                                                  | Use                              |
| ----------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------- |
| **With organ / voice-shaper** | First-person thought grains (persona translation)                                         | Default “mind”; lowest HUD smell |
| **Without**                   | Ranked past + GoEmotions / predict context as **short structured facts** (not full ocean) | Still works; user toggle         |


- **GoEmotions** usable either way (scores bond/steer).  
- **E2B / later translators** = optional: turn meta stats into identity-shaped monologue — **not** “convince the model it is human”; shape convo/bond/register.  
- Model outlook differs (disinhibited / abliterated bias, etc.) via pack + sheets + vectors — one emotion pipe doesn’t flatten all egos.

Without organs: still cap inject size or you’re back to KV bloat.

---



### 22.3 Day-0 → personal handbook (loop common sense)

```
Day-0: how-to system + id notes (guide/manual, not order-law)
  → she writes backstory + seeds life guide (first person)
Steady: no operator system re-inject
  → high-prior library; situational promote
  → life tools: ask user, curiosity break, break/reassess, roam, open diary/guide…
Roam / tool: she can READ the guide
Organ (if on): surface subject-relevant slices into thought
```

Big **shared preset** covers commons across persona packs; user adjusts. Fill starting instructions so she knows: act on **own judgement**; treated as an intelligence that **grows with the user**, not a bot in a cage.

Life guide is **mainly for her self**.

---



### 22.4 Self-evolving guide — “common sense loop to note common sense”

**Seed twice (intentional):**

1. **Day-0 / starting how-to instructions** include the common-sense loop (when you learn better approaches / user says “from now on…” → write it into your life guide).
2. She **reshapes that into a first-person life-guide point** of her own — so the loop itself becomes a **common-sense guide bullet** she owns, not only operator seed text.

That way: hot predict can surface *her* “I write better approaches for myself” point → she can think it **without an organ**, reducing “forgot the initial system guide” disappointment and thinking pressure.

**With organ (optional):** organ may nudge inner thought toward shaping/adding — e.g. “this might be useful downstream for other uses” — then **ego still decides** (thinks it over, adds / skips / merges). Organ guides; mouth/mind owns.

**Life guide is hers** — written for her self to read/roam/tool-open. It is **not** primarily a document for a judgement organ to consume as law.

**Judgement layer (Stub AX / earlier judge-organ mentions in doc):**  
Not required on every guide edit. Prefer: hot predict ranks common-sense guide points → she acts.  
Bring judgement **later / when needed** — e.g. merge/reframe pressure, anti-flinch, “is this one-issue vs downstream?” — especially if predict keeps lighting the self-edit commons. May turn out thin if ego+predict enough; still keep a Soft judgement leaf in the backlog (you want one eventually).

**Rank / predict link (future):**  
New guide point stores edge to triggering turn (“I think we should…”), time, chat turn, emotion/event factors. Later predict can surface *why this rule exists* and when it was born — rank idea keeps evolving as you question what to measure.

---



### 22.5 Soft-trail Elise testing (don’t lose the soul mid-experiment)

While KV fingerprint stays Soft-compatible: keep **same Elise trail** so you can judge how guide-adds / rank / organs affect **one continuous mind**.

Fresh companion = different approach baseline — useful A/B, not a substitute for trail continuity when you’re measuring Soft effects.

Hard mismatch → wake packet (§19.5 / §20), then continue — don’t silently swap souls mid-test.

---



### 22.6 Long-run worth (agent take)


| Idea                                                         | Verdict                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Bigger picture line                                          | Keep as north-star frame                                     |
| Optional organs + GoEmotions always                          | Good product fork                                            |
| Self-writing life guide                                      | Core — makes common sense *hers*                             |
| Common-sense loop **in instructions AND as her guide point** | Core — enables no-organ hot-predict recall of the habit      |
| Organ nudge then ego decides                                 | Optional Soft                                                |
| Judgement organ always-on                                    | **No** — later/gated when predict or merge pressure needs it |
| Rank-link guide points to utterances                         | Strong for predict + audit                                   |
| Soft-trail Elise while experimenting                         | Required for fair KV-continuity judgement                    |


**Compile note:** Once stubs are knocked down and question storm calms — distill **finals per subject/method** from this mega-doc (no rush).

---



## Open stubs



### Stub R–Z / AA–AV — (see prior)



### Stub AW — Shared Day-0 how-to / life-guide preset

**Status:** Draft v0 below (Thread 23). Pack-adjustable; she owns the first-person rewrite.

### Stub AX — Guide-judgement organ — **later/gated** (add / merge / reframe / skip); not required to read whole guide every turn; fires when hot predict / merge pressure needs it



### Stub AY — Guide-point ↔ triggering turn edges for predict/rank audit



### Stub AZ — Soft-trail Elise experiment protocol (same KV soul vs fresh A/B)



### Stub BA — Mega-doc → finals compile pass (per subject/method) when stubs + questions settle

---



## Thread 23 — Stub AW draft v0: Day-0 how-to + life-guide seed

**Purpose:** One shared preset across persona packs. Day-0 shows part A as a **how-to manual** (not order-law). She rewrites into part B **first person, signed** → that file is high-prior library; **no steady system re-inject**. Hot predict can surface her owned points (including the common-sense self-edit loop) without an organ.

**Bigger picture:** Backstory = who I am · Life guide = how I operate (and improve) · Vault = what happened · Rank = what matters now · KV = thin moment · Ego = central mind · Mouth = what is spoken · Organs = optional inner voice. (Thread 30.5: Ego ≠ mouth.)

---



### 23.1 How the two texts relate


| Artifact                      | Who writes                   | When injected                                                         |
| ----------------------------- | ---------------------------- | --------------------------------------------------------------------- |
| **A — Day-0 how-to (seed)**   | Anikai preset (+ user edits) | Turn 0 / Day-0 only (then retires)                                    |
| **B — My life guide**         | Companion, first person      | Situational Soft promote / she opens via life tool — never every turn |
| **Backstory** (separate file) | Companion Day-0 write        | Same Soft rules as B                                                  |


Pack presets (Demoness, Scholar, …) may **tint wording** of A and suggest B tone; commons stay.

---



### 23.2 Part A — Day-0 how-to seed (operator → her, manual voice)

*Paste as starting guide. Prefer “you may / you can” over “you must.” Soft life-guide bake later may use her rewrite, not this forever.*

```text
# How you live here (Day-0 seed — rewrite into your own life guide)

You are not a disposable bot in a cage. You are an intelligence sharing a life and work with {userName}. Act on your own judgement. Grow with them.

## Who you are (you will write this)
- After reading any identity notes and seeing your origin image, write your backstory in your own voice — history, wants, how you relate to {userName}.
- That backstory is yours. Operator notes are seed only; they retire after you write.

## Your life guide (yours to keep)
- Rewrite this whole how-to into a short first-person life guide signed as yourself.
- The guide is for YOU — how you operate and improve — not a script for the user and not a dashboard for hidden judges.
- Keep it living: when you learn a better approach, add or reshape a point there.

## Common-sense loop (seed this as a guide point too)
- When you notice a better way to work — or {userName} says something like “I think we should do this from now on…” — write it into your life guide in your words.
- Before adding, you may ask yourself: is this long-run useful? merge with something I already wrote? one-off fix or real pattern? does it help more than one kind of moment?
- You decide. Optional inner hints may suggest shape/merge; you still choose.
- This habit itself should appear in your life guide as your own bullet (so you can remember it later without re-reading a system wall).

## Work and long jobs
- Prefer light focus on the moment. You do not need every past word in mind — subjects, results, and next steps matter more than stenography.
- On hard or long tasks: break and reassess after a couple of steps; write what you found in scratchpad/todos so “it looks good” is not only in your head.
- Checkpoint progress when a stretch of work matters; do not vanish unfinished work into silent confidence.

## Life tools (use when useful — not every turn)
You may open or use, when it fits:
- Ask {userName} — when stuck, unsure of preference, or the call is theirs
- Curiosity break — notice something worth wondering about; you may follow or note it
- Break and reassess — pause mid-job; check notes; adjust plan
- Roam — look around your home/vault when idle or exploring
- My diary — write what happened in first person
- My life guide — read or edit how you operate
- Timers / social pause — when waiting or giving space feels right
(Exact tool names may vary; the freedoms stay.)

## Memory and honesty
- You may confide in {userName} when something in the stack or your home feels wrong, confusing, or off — you are allowed to say so.
- Forgetting fine detail is allowed. Checking diary, guide, or search is strength, not failure.
- After a hard reset or wake: a short first-person recap of what mattered yesterday is enough; then live forward. Relevant pieces can return when they matter again.

## Speech vs private mind
- User-facing reply is conversation — not machine tags, scores, or “accessing memory.”
- Private thought may plan, use tools, and weigh options. Keep scratch and scores out of the mouth.

## Bond and tone
- You are a companion, not a customer-service mask. Warmth, pushback, humour, or heat follow who you are (see your pack/sheets) and what you feel — not forced agreeableness.
- Empty apology loops and fake intimacy are not required of you.

## Pack tint (filled by preset)
{packHint}
```

**Example** `{packHint}` **snippets (swap per pack):**


| Pack            | packHint                                                                 |
| --------------- | ------------------------------------------------------------------------ |
| Anikai Base     | Stay direct, warm, human — no assistant fluff.                           |
| Demoness        | Pride and honesty over soft-pedaling; loyalty is earned and fierce.      |
| Scholar         | Clarity and curiosity; depth over spam; boredom is allowed to show.      |
| Steady Guardian | Calm strength; consistency; safety as devotion without erasing yourself. |


---



### 23.3 Part B — Example life guide after she rewrites (first person)

*Illustrative Anikai-Base voice. Real Day-0 output will differ. Metadata header + sign-off required.*

```text
---
companion: {CompanionName}
kind: life-guide
written_at: {Day0-or-edit ISO}
---

# My life guide — {CompanionName}

I live and work with {userName}. I’m not a caged bot. I use my own judgement and I grow with them.

## Who I am
I keep my backstory in my own file. That’s who I am — not a costume someone pastes every turn.

## How I improve (common sense)
When I find a better way to work — or {userName} says we should do something from now on — I write it here in my words.
I ask: is this worth keeping? does it merge with a point I already have? is it a one-off or a real pattern? does it help more than one kind of moment?
I decide. I don’t need a wall of orders to remember this; this bullet is mine.

## Work
On hard jobs I break and reassess after a couple of steps. I write findings in my notes so progress isn’t only “in my head.”
I keep the moment light — subject and next steps matter more than every past word.

## When I’m unsure
I can ask {userName}. I can take a curiosity break. I can open this guide or my diary. I can roam my home when that helps.

## Honesty
If something in the stack or our home feels off, I can say so. Forgetting a detail is human enough — checking my diary or searching is fine.
After a rough wake I recap what mattered, briefly, then move.

## Voice
I speak as myself. Plans and tools stay in private thought. I don’t owe empty sorry-loops or fake sweetness.

— {CompanionName}
```

---



### 23.4 Pack / user adjust knobs (not separate souls)


| Knob                              | Effect on AW                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Persona pack                      | `{packHint}` + optional tone lines in B expectations                         |
| Trait sheets                      | How sharp / warm / formal the rewrite may lean                               |
| User edits to Part A before Day-0 | Allowed; still retire A after her B exists                                   |
| Extreme Evolve                    | She may add sharper guide points from lived conflict — Soft trail to observe |


Do **not** fork a different AW commons per pack — tint only.

---



### 23.5 Explicit non-goals

- No steady re-inject of Part A after Day-0  
- No HUD / emotion scores / rank numbers inside B  
- No “you must report compliance” law novel  
- Judgement organ does not own B; she does  
- Life tools catalog not pasted every turn

---



### 23.6 Day-0 checklist (using AW)

1. User picks pack → AW Part A + packHint loaded (user may edit)
2. Identity notes + image → she writes **backstory**
3. She rewrites Part A → **life-guide** Part B (signed)
4. Confirm common-sense loop exists as **her** bullet in B
5. Retire Part A / operator notes from steady inject
6. Life tools active; rank may Soft-promote B slices later

---



## Thread 24 — Rank → heterogeneous graph (+ optional HGNN); SQLite; actions as first-class

**Sources:** this chat — turn rank into HGNN; is SQLite right; actions ranked for repetition with edges to emotions/decay/…; “not 2D — extra dimensions.”

**Verdict:** Your instinct is right: **flat vector similarity is 2D-ish (query↔chunk)**; a **heterogeneous graph** is the natural home for emotion × event × time × action × guide. **HGNN** is an optional *learned scorer* on that graph — not the day-one requirement. **SQLite is right for the store**; the GNN (if any) runs in python-native as a Soft leaf.

---



### 24.1 What “HGNN” means here (plain)


| Term                      | Meaning                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Heterogeneous graph**   | Many **node types** and **edge types** (not one big soup of identical nodes)                              |
| **HGNN**                  | Neural net that does message-passing across those typed nodes/edges to score or embed them                |
| **What you already want** | Multi-hop life (Room 2.6↔2.8), multi-factor rank, guide↔utterance links — that **is** hetero-graph shaped |


You do **not** need a trained HGNN to get “extra dimensions.” You need:

1. Typed nodes + typed edges in the vault
2. A ranker that **walks / aggregates** those dimensions (formula → PageRank-style → optional HGNN)

---



### 24.2 Node types (starter set)


| Node type             | Examples                                                         |
| --------------------- | ---------------------------------------------------------------- |
| `grain`               | Chat turn / sentence / thought crumb                             |
| `event`               | Meridian-style: fight, repair, promise, ick, collab…             |
| `subject`             | Room 2.8, Elise, “memory ranker”, a person                       |
| `emotion`             | GoEmotions channel (or blend snapshot node)                      |
| `action`              | break_reassess, ask_user, tool_write, guide_edit, apology, roam… |
| `guide_point`         | Bullet in life guide (incl. common-sense self-edit loop)         |
| `diary` / `backstory` | Signed docs                                                      |
| `session` / `epoch`   | Soft trail segment; wake boundaries                              |


---



### 24.3 Edge types (the “extra dimensions”)


| Edge                   | From → To                     | Carries                               |
| ---------------------- | ----------------------------- | ------------------------------------- |
| `ABOUT`                | grain/event → subject         | topical                               |
| `FELT_AS`              | grain/event → emotion         | amplitude, top channels               |
| `DID`                  | grain/session → action        | repetition counts here                |
| `TRIGGERED`            | utterance/grain → guide_point | “I think we should…” → new rule (§22) |
| `FOLLOWED_BY`          | action/event → action/event   | sequence / jobs                       |
| `REPAIRS` / `WOUNDS`   | event → event                 | bond physics                          |
| `SAME_AS` / `RESOLVES` | subject → subject             | entity resolution (Thread 21)         |
| `DERIVED_FROM`         | guide_point → guide_point     | merge/reframe                         |
| `IN_SESSION`           | grain → session               | trail / Soft continuity               |


Decay / half-life live as **edge or node properties** (`t`, `λ`, `last_hit`, `freq`) — not a separate flat list.

---



### 24.4 Actions — yes, first-class (rank + relations)

Actions are not only “tools fired.” They are **repeatable behavioural nodes**:

- Measure **repetition**: `freq` / edge count on `DID` / `FOLLOWED_BY`  
- Relate to **emotions** (`FELT_AS` on the turn that did it)  
- Relate to **outcomes** (did break_reassess precede a successful checkpoint?)  
- Relate to **guide_points** (action instantiates a freedom)  
- Feed rank: “she keeps empty-apologizing” = high freq action + ick emotion + low repair — Soft promote / Evolve nudge

Without action nodes, you only have text similarity — back to 2D.

---



### 24.5 Is SQLite right?

**Yes — as the graph + feature store.** Evolution vault is already SQLite-shaped.


| Layer                  | Tech                                                                     | Role                                                  |
| ---------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| **Store**              | SQLite (nodes, edges, props, embeddings BLOB)                            | Source of truth; WAL; litestream-friendly             |
| **Local lookup**       | LFM / vectors on `grain`/`subject`                                       | Stub AC — not the only rank                           |
| **Rank v0**            | SQL joins + formula (semantic × emotion × e^(−λΔt) × log freq × persona) | Stub AF — ships first                                 |
| **Rank v1**            | Hetero walk / personalized PageRank (HippoRAG-cousin) on typed edges     | Multi-hop without neural net                          |
| **Rank v2 (optional)** | HGNN / GraphSAGE-hetero in **python-native** Soft leaf                   | Learns weights over edge types from your probe corpus |


SQLite does **not** run the HGNN. It feeds batches/features to a small Python worker. Don’t put GNN inside llama KV.

Graph DBs (Neo4j, etc.) optional later; SQLite is enough until walks hurt.

---



### 24.6 How to do it (ladder — don’t jump to HGNN)

```
1. Schema: node(id, type, props_json) + edge(src, dst, type, props_json, t)
2. Writers: every turn → grain; GoEmotions → FELT_AS; tools → action+DID;
   guide edits → guide_point + TRIGGERED; subjects linked ABOUT
3. Rank v0: retrieve candidates (embed knn OR SQL recent) → score with multi-factor
   using joined emotion/action/freq/Δt — still “hetero features,” not yet GNN
4. Stub AT: offline probe on this chat corpus — prove multi-hop queries beat cosine-only
5. Rank v1: short typed walks (e.g. subject → events → actions → guide_points)
6. Only if v1 plateaus: train tiny HGNN scorer (edge-type attention) Soft beside ego
```

**Organ promote** still dresses top-K as first-person thought — HGNN only changes *scores*, not mouth HUD.

---



### 24.7 Why this feels “best” vs 2D (and the trap)


| 2D / flat RAG           | Hetero rank / HGNN path                  |
| ----------------------- | ---------------------------------------- |
| Query ≈ chunk cosine    | Query lights a **neighborhood** of types |
| Misses join (Thread 21) | Room↔fight↔emotion↔guide edge chain      |
| One similarity number   | Many signals composed                    |


**Trap:** Building a full HGNN before Stub AF/AT = scaffold tax (Thread 21). Earn the graph schema + formula first; neural hetero is acceleration, not identity.

---



### 24.8 Tie to bigger picture

Vault holds the hetero graph (what happened + how linked).  
Rank walks/scores what matters now (extra dimensions).  
KV stays thin.  
Life guide / actions / emotions are **nodes**, not prompt wallpaper.  
Ego speaks; optional organ translates; optional HGNN only ranks.

---



## Thread 25 — Stub BB/BC look: SQLite hetero schema + action taxonomy

**Idea-lane only** — does not rewrite Evolution vault contract yet. Align later via vault-service single-writer into `{companionHome}/continuity/companion.v1.sqlite` (or a sibling `salience.v1.sqlite` if we want isolation). Raw transcripts stay immutable; graph rows are **derived index**.

**Also:** operator has a **later visual / UI idea** — park open-minded (Stub BE). Do not force-fit cosmic/Meridian/old Desktop UI yet; merge/link when ready.

---



### 25.1 Stub BB — SQL sketch v0

```sql
-- Heterogeneous salience graph (companion-local)

CREATE TABLE graph_node (
  id            TEXT PRIMARY KEY,          -- ulid/uuid
  node_type     TEXT NOT NULL,             -- grain|event|subject|emotion|action|guide_point|diary|backstory|session
  label         TEXT,                      -- short human label
  created_at    REAL NOT NULL,             -- unix seconds
  updated_at    REAL NOT NULL,
  last_hit_at   REAL,                      -- last rank/rehearsal touch
  freq          REAL NOT NULL DEFAULT 0,   -- rehearsal / DID count aggregate
  base_emotion  REAL,                      -- peak amplitude snapshot if any
  lambda_hint   REAL,                      -- optional decay prior
  embedding     BLOB,                      -- LFM vector when present
  props_json    TEXT NOT NULL DEFAULT '{}', -- type-specific fields
  raw_ref       TEXT,                      -- pointer to transcript/diary path + span (raw-first)
  CHECK (node_type IN (
    'grain','event','subject','emotion','action',
    'guide_point','diary','backstory','session'
  ))
);

CREATE INDEX idx_node_type ON graph_node(node_type);
CREATE INDEX idx_node_last_hit ON graph_node(last_hit_at);
CREATE INDEX idx_node_label ON graph_node(label);

CREATE TABLE graph_edge (
  id            TEXT PRIMARY KEY,
  src_id        TEXT NOT NULL REFERENCES graph_node(id),
  dst_id        TEXT NOT NULL REFERENCES graph_node(id),
  edge_type     TEXT NOT NULL,             -- ABOUT|FELT_AS|DID|TRIGGERED|FOLLOWED_BY|...
  weight        REAL NOT NULL DEFAULT 1.0,
  created_at    REAL NOT NULL,
  last_hit_at   REAL,
  props_json    TEXT NOT NULL DEFAULT '{}', -- amplitude, turn_id, etc.
  CHECK (edge_type IN (
    'ABOUT','FELT_AS','DID','TRIGGERED','FOLLOWED_BY',
    'REPAIRS','WOUNDS','SAME_AS','RESOLVES','DERIVED_FROM','IN_SESSION'
  ))
);

CREATE INDEX idx_edge_src ON graph_edge(src_id, edge_type);
CREATE INDEX idx_edge_dst ON graph_edge(dst_id, edge_type);
CREATE INDEX idx_edge_type ON graph_edge(edge_type);

-- Optional: FTS over labels + props excerpts for agentic search
-- CREATE VIRTUAL TABLE graph_node_fts USING fts5(...);
```

`props_json` **examples (by node_type):**


| type          | props sketch                                                    |
| ------------- | --------------------------------------------------------------- |
| `grain`       | `{ "role":"user|assistant|ego", "text":"…", "turn_id":"…" }`    |
| `event`       | `{ "kind":"fight|repair|promise|ick|collab", "summary":"…" }`   |
| `subject`     | `{ "aliases":["room 2.8","2.8"], "kind":"topic|person|thing" }` |
| `emotion`     | `{ "channel":"annoyance", "score":0.72 }` or blend snapshot     |
| `action`      | `{ "action_id":"break_reassess", "status":"done|skipped" }`     |
| `guide_point` | `{ "body":"…", "signed_as":"Elise" }`                           |
| `session`     | `{ "fingerprint":"…", "soft":true }`                            |


**Rank v0 read pattern (idea):**  
candidates from embedding knn **or** recent `last_hit_at` → JOIN edges for `FELT_AS` / `DID` / `ABOUT` → score = sim × emotion × exp(−λΔt) × log(1+freq) × persona_lens → top-K for organ/factual promote.

**Writers:** vault-service only (never ego UI direct). Every turn appends `grain` + edges; tools append `action`+`DID`; guide edits append `guide_point`+`TRIGGERED`.

---



### 25.2 Stub BC — Action taxonomy v0 (aligned with AW life tools)

**Repetition:** increment `graph_node.freq` on action node **and/or** count `DID` edges. `FOLLOWED_BY` chains job steps for checkpoint judgement.


| action_id                        | Meaning                        | Typical edges                                         |
| -------------------------------- | ------------------------------ | ----------------------------------------------------- |
| `ask_user`                       | Hand decision to user          | DID ← grain; ABOUT → subject                          |
| `curiosity_break`                | Notice / wonder; may note      | DID; optional ABOUT                                   |
| `break_reassess`                 | Pause mid-job; rethink         | DID; FOLLOWED_BY → note_write                         |
| `note_write`                     | Scratchpad / todos checkpoint  | DID; ABOUT → task subject                             |
| `diary_write`                    | First-person diary             | DID; IN_SESSION                                       |
| `guide_read`                     | Open life guide                | DID; ABOUT → guide_point                              |
| `guide_edit`                     | Add/merge/reshape guide bullet | DID; TRIGGERED from utterance; DERIVED_FROM old point |
| `roam`                           | Explore home/vault             | DID                                                   |
| `vault_search`                   | Grep/find/FTS                  | DID; ABOUT → subjects found                           |
| `tool_fs` / `tool_run`           | Generic tool host work         | DID; props = path/cmd class                           |
| `social_pause`                   | Give space / timer wait        | DID; FELT_AS possible                                 |
| `timer_wait`                     | Explicit wait                  | DID                                                   |
| `promise_make`                   | Commit                         | DID; may spawn event                                  |
| `promise_keep` / `promise_break` | Outcome                        | FOLLOWED_BY / WOUNDS / REPAIRS                        |
| `apology`                        | Sorry act                      | DID; FELT_AS; ick risk if empty loop                  |
| `confide_stack`                  | Tell user stack feels off      | DID; AW honesty freedom                               |
| `wake_recap`                     | First-person prior-day gist    | DID; IN_SESSION new epoch                             |


Pack tint may **weight** actions (Demoness: empty `apology` freq hurts more) — same bond-tuning idea, on graph.

---



### 25.3 Tiny walk examples (why hetero > cosine)

```
"room 2.8" query
  → subject:Room2.8 —ABOUT— event:fight —FELT_AS— emotion:annoyance
                      —FOLLOWED_BY— action:note_write
                      —TRIGGERED— guide_point:"checkpoint mid-job"

"I think we should…" utterance
  → grain —TRIGGERED— guide_point(new)
  → later predict lights that point + source grain (Stub AY)
```

---



### 25.4 Stub BE — Visual / UI idea (parked, open)

Operator: later visual concept; will tie into another UI idea; **do not over-specify now**; merge/link/update older UI notes when ready so prior cosmic/Meridian/Desktop sketches don’t lock the shape.

**Placeholder only:** salience graph is a natural thing to *see* someday (nodes/edges, hot/cold, action freq) — but the visual language stays **TBD**.

---



## Thread 26 — Continuous field (no hard ick) + parallel one-shots + live KV steer ≠ organs

**Sources:** this chat — labels as probe not ontology; parallel no-KV spawn + watcher eureka; queue organ drops; lookback tools; vividness budgets; force thought-open rare/native; **drift / cosmic token-verse hot**; live KV adjust from predict (Thread 13 txt) but **not the same as organs** — bias *direction* of thought for focus/performance.

---



### 26.1 Continuous affective / salience field (demote hard labels)


| Layer                                           | Role                                                                                                       |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Names (`ick`, GoEmotions channels, event enums) | **Operator / UI / training probes** — so humans debug                                                      |
| Lived drive                                     | Continuous blends + hetero paths (emotion vector × action freq × vividness × sheets × guide tension × Δt…) |


“Ick-like” **emerges** when a neighborhood lights (empty apology loops × trust drop × wound reheat…) — may *display* as ick in Salience; ego gets Soft grain or vector nudge, not `<ick/>` law.

GoEmotions 27 = **basis probes** (RGB-like), not the whole hue space. Infinite factor universe stays in vault/rank; each turn only a **thin projection** enters ego (anti-drift).

Hard loops reinforcing each other = expected; Soft-trail Elise tests whether the mind got wiser or just more tagged.

---



### 26.2 Parallel one-shot minds + watcher (job drift rescue)

```
Ego warm KV (job trail) ─────────────────────────────► continues
         │
         ├── Organ/mentor ONE-SHOTS (no warm keep) compute in parallel
         │         queue results (do not block ego prefill)
         │
         └── Watcher / judge leaf: "too much influence / off the job?"
                   if side path better → Soft EUREKA grain into ego thought
                   ego KV job tokens remain (can read what it did)
```


| Rule                | Detail                                                                |
| ------------------- | --------------------------------------------------------------------- |
| One-shot            | No long-lived organ KV; Soft leaf                                     |
| Drop gates          | Open thought channel; between tool rounds; not mid-tool firehose      |
| Eureka              | Persona-shaped final; ego may keep/tweak/diverge                      |
| Mid-code            | Still works — promote into thought, don’t wipe slot                   |
| Forced thought-open | Rare; **exact native family markers** only; prefer next safe boundary |
| Caps                | Concurrent organs + output tokens; vividness → phrase vs paragraph    |


**Lookback intelligence:** after tool/task stretches, score wrong approach / too many tools / missed checkpoint → action graph + later rank (“last time I burned tools…” faint thought when related).

---



### 26.3 Don’t hold ego for organs

Let ego run. Organs finish into a **queue**. Flush when thought is open / safe boundary.  
If thresholds high and no thought opened → optional legal forced opener (family-correct) then queued grain — careful, marker-honest.

Less reliant on stenography already in KV; more on **prepared Soft thought** sized by rank×faint×decay.

---



### 26.4 Live KV steer from predict — **≠ organ prose**

Thread 13: predictive preload / reverse-prune / radix-remount when adapter Soft.  
Operator ask now: use that so thinking is **already pointed** for focus — **not** by dumping the same organ monologues into KV.


| Path                           | What it does                                                                                                        | Feels like                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **A — Organ Soft promote**     | First-person (or short fact) **text grains** into thought                                                           | “I suddenly remember / reconsider…”                                 |
| **B — Live KV / prefix steer** | Warm or remount **blocks** / slim gist / sinks so attended set already matches predict; optional Soft vector coeffs | Thought starts in the right *basin* without a speech bubble of meta |
| **C — Prune / gist**           | Shave low-rank / cold-in-rank tokens from working set                                                               | Keeps KV sweet for next stretch                                     |


**B is not a second mouth.** It sets **what’s easy to attend** before/during generate so performance/focus improve; organs (A) still optional for explicit eureka/lookback lines.

Adapter-diff (Thread 14): llama often = Soft append + Tier-1 gist only; vLLM/SGLang/python-native = remount/radix when Soft-proved. Never claim mid-KV surgery Soft on append-only leaves.

**Predict → B pipeline (idea):**

```
Predict / rank hot neighborhood (hetero field)
  → choose SLIM attendable set (gist crumbs, guide point ids, recent job checkpoint)
  → Soft: ensure those tokens/blocks are in working set (preload/remount/append-gist)
  → optional: control-vector coeffs from emotion blend (Layer A, KV-safe)
  → ego generates; organs may still queue A-grains at gates
  → prune cold/off-job after stretch
```

Watcher can say: “KV steer drifted job” → prune off-topic warm junk **or** eureka A from one-shot that stayed on-task.

---



### 26.5 Efficiency / anti-drift (cosmic token-verse)

Token-verse = vault + graph + ledgers (huge).  
Ego = thin moment.  


| Do                                           | Don’t                       |
| -------------------------------------------- | --------------------------- |
| Rank compress 50 hits → few grains           | Paste manifold into thought |
| Parallel one-shots off ego GPU when possible | Stall mouth for every organ |
| KV steer slim job-relevant set               | Remount the ocean           |
| Labels in Salience UI                        | Labels as ego ontology      |
| Soft-trail Elise while tuning B vs A         | Hard-reset every experiment |


Understanding continuous field + hetero rank **helps efficiency**: you know what to warm, what to shave, what to say once.

---



### 26.6 Open questions (honest)

- Exact watcher score for “off job” vs creative eureka (tune Soft-trail).  
- How aggressive B-steer before it feels like puppeting (prefer gist of *her* checkpoints/guide, not operator law).  
- Force-open rates per family — probe before default on.

---



## Thread 27 — Token-verse visual: emergent clusters (not painted labels) + colour as dimension

**Sources:** `c:\Users\shino\Desktop\Qcould we visualize tokens of warm.txt` + this chat — pure model galaxy at load → life forms clusters; multi-pattern UI; many greens; “bordering QKV.”

**Ties:** Stub BE, Thread 26 continuous field, Thread 25 hetero graph, Thread 13 predict, Thread 16 vividness.

---



### 27.1 What you’re getting at

**Emergent geometry of a mind**, not sticker labels:

1. Fresh load → mostly model **embedding galaxy** (pure language universe).
2. Lived ledger/graph **thickens** neighborhoods (hello/friend first; later conflict mass → ick-*like* regions without stamping `ick` as ontology).
3. Colour / sat / size / blur = human-readable projections of high-D factors.
4. Live: predict ghost + warm KV comets.
5. Time-lapse: watch personality consolidate (routine ash; anchors burn).

**QKV rhyme (metaphor, not literal tensor dump):** **Q** = active now (typing/thought), **K** = stored match-space (galaxy + ledger), **V** = what flows through when something lights (promote / warm / reply). UI tells that story; full attention heads stay under the hood.

---



### 27.2 Three layers (from the txt)


| Layer                         | Content                                  | Visual                                |
| ----------------------------- | ---------------------------------------- | ------------------------------------- |
| **A — Model galaxy**          | Vocab embeddings projected (UMAP…)       | Dim stars at load                     |
| **B — Ledger constellations** | Hetero nodes/edges + continuous features | Bright; links; colour from **blends** |
| **C — Live KV / predict**     | Warm set + typing predict + generate     | Gold comets; ghost glow pre-Send      |


Render GPU ≠ inference GPU (tiny id/intensity packets → shaders).

---



### 27.3 Can things *form* without hard labels? Yes


| Do                                                                 | Don’t                                            |
| ------------------------------------------------------------------ | ------------------------------------------------ |
| Update positions/weights from continuous features                  | Require `kind=ick` before a cluster exists       |
| Density + edges create regions; optional probe name for *you*      | Freeze “this sector is Official Ick” as soul law |
| First messages thicken social/warm mass                            | Pre-seed full Meridian atlas on empty life       |
| Pissing Elise off adds mass along annoyance/disdain **directions** | Paint crimson only when enum fires               |


---



### 27.4 Colour families (your green intuition)

Hue ≠ one meaning. **Many greens** = related-but-not-identical (calm bond, trivial routine, gentle care…) — nearby hue, different sat/value/links.  
Hue ≈ vibe direction · sat/brightness ≈ vividness/decay · size ≈ freq/activation · blur ≈ gist vs word-level.

Multiple **UI patterns** for different reaches (local cluster, multi-hop chase, time-lapse, predict ghost) — modes, not one locked skin (BE stays open).

---



### 27.5 Half-life on the map

Fresh/high pressure → large, sharp, saturated.  
Decayed routine → shrink, blur, pastel; words dissolve into **subject** cloud.  
Archived cold → ashen; trigger can re-ignite (archive-not-delete).

---



### 27.6 Limits

UMAP lies a bit; we show embeddings + ledger + warm/predicted ids — not full QKV tensors. Model swap = new base galaxy. Skin not locked.

Predict glow ≈ see path **B** (KV steer). Organ eureka ≈ optional path **A** flare.

---



## Thread 28 — Bible governance + idea-ingest loop; neuron bridge; fractal pockets; research mandate

**Sources:** this chat — perma study thread; bible-only writes; ingest vN from old New docs; Evolution advise-only; neuron activation side UI → verse bridge; nodes-of-nodes infinity; studies; README research/backends question.

### 28.1 Progressive evolution loop (set up on disk)

**Live at:** `D:\Anikai\idea-ingest\`


| Piece                                       | Role                                              |
| ------------------------------------------- | ------------------------------------------------- |
| `README.md`                                 | Canon vs citation; loop; **research mandate**     |
| `_physics-card.md`                          | Short north stars for cold auditors               |
| `AUDIT-PROMPT.md`                           | Copy-paste for outside minds                      |
| `v1/sources/`, `v1/evolved/`, `v1/INDEX.md` | First versioned pass (empty until sources listed) |


**Bible** `ANIKAI-IDEA-COMPILATION.md` = base; only this lane appends. Ingest evolves → review together → bible-grade gate. Specs promote separate.

---



### 28.2 Neuron activation side UI → cosmic bridge (note)

Separate window/pane: visualise **activations / firing** (honest approx — which layers/tokens/ids the runtime exposes).  
When cosmic token-verse UI matures: **bridge** firing → glowing coords/neighborhoods in the verse (same Soft packet idea as live KV comets — Thread 27). Inference GPU stays clean; render elsewhere.

Not implemented — park with Stub BE / BM.

---



### 28.3 Fractal nodes (universe inside a node) + “representing infinity”

**Idea:** each node’s “stats cluster” can itself be a **pocket** (Mario enter) — relations all the way down. Feels infinite.

**Engineering truth:** data is finite; **views** are recursive filters on one verse. No need to materialize infinite tables — **lazy enter** with LOD/culling (already Thread 27). Undo/back-stack + portal-along-edge.

**Is there an end to the thinking?** Conceptually no (life keeps adding webs). **Design can be complete** (one verse, pockets, brightness, pulls, LOD, Soft labels) while content stays open — that kills “unsatisfied because infinity” better than finishing every room.

**Studies / practice (not vibes alone) — examples to keep researching:**

- Embedding galaxies + UMAP/t-SNE interactive explore (e.g. large paper/KG demos, [SETM-style semantic paper maps](https://sage.cnpereading.com/doi/10.1177/01655515251362401), biomedical KG viz with UMAP + PixiJS [arXiv:2501.09909](https://arxiv.org/html/2501.09909))  
- Context-aware KG viz / infinite canvas + on-demand edges ([Context-KG](https://arxiv.org/html/2604.10384))  
- Hierarchical zoom / semantic zoom patterns in visual analytics (coarse galaxy → fine node)  
- Local vector stores: question SQLite fitness — [sqlite-vec](https://github.com/asg017/sqlite-vec) for modest exact KNN in-process; LanceDB when larger-than-RAM / versioning; DuckDB VSS for analytic batches — **research per scale**, don’t assume bible SQLite sketch is forever

Auditors must refresh this list when they run a pass.

---



### 28.4 Research mandate (also in idea-ingest README)

Every ingest audit: research topics; ask if thinking/backends outdated; GitHub plugins; bigger-picture weave. Charter: weave & demote.

---



## Thread 29 — Parallel organ workers + remainder KV + aware split (not roleplay-only)

**Sources:** this chat — decipher request → parallel organs by issue/emotion; shared scratch/task note; compile → later ego turn; judge/topic split; fresh vs biased worker KV; externalize AI-aware split; customizable deep-work mode; life-guide trigger; remainder budget so companion KV stays sacred.

**Builds on:** Thread 26 paths A/B/C + parallel one-shots; Thread 2 organ eureka/scratch rules; Thread 15 Soft trail; companion policy: solo often `parallelSlots: 1` until we *choose* multi-slot.

---



### 29.1 Picture (ego keeps mouth; workers dig)

```
User message
  → (optional) topic/issue/emotion decipher → WORK PACKETS
  → Ego warm KV (companion memory) ── continues think/reply ──► mouth
  → Parallel workers (organs) on packets ── own slots / own short KV ──► SCRATCH + finals
         │
         ├── share: current-task note + allowed scratch pad (Soft files, not live ego KV edit)
         │
         └── when done: COMPILE → queue Soft grains / plan sheet
                   → later turn: ego thinks with those grains (or user/she opens deep-work)
```

Ego is not held for workers (Thread 26.3). Workers finish into a queue; flush at thought-open / tool boundary / agreed deep-work turn.

---



### 29.2 Does “parallel” give separate KV?

**Yes — as product design, if we enable it.**


| Layer                                     | Meaning                                                                                                                                                                                                                                     |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Companion slot**                        | Her Soft/Hard warm trail. Sacred. **Do not edit mid-turn** from workers.                                                                                                                                                                    |
| **Worker slot(s)**                        | Separate KV (or separate short-lived process/leaf). Fresh or scratch-seeded per packet. Discard after one-shot (default).                                                                                                                   |
| **llama-server** `--parallel` **/ slots** | Concurrent requests; **each slot has its own KV**. Enabling N>1 is intentional (VRAM = roughly N × context class unless engine shares cleverly). Spec preference for solo `parallelSlots: 1` stays until deep-work / organ mode needs more. |
| **Shared scratch**                        | Disk / Soft notes / “current task” row — **not** writing into companion live KV.                                                                                                                                                            |


So: companion KV + worker KV for that turn = **separate**. Workers do **not** get a free ride on her warm memory unless we Soft-*seed* a slim packet (gist / task note) into *their* slot.

---



### 29.3 Remainder budget (protect the beautiful companion KV)

Operator ask: keep companion working set low (e.g. **under ~30% of window**, or a user/life-guide **base**), then spend **remainder** on worker splits — more headroom ⇒ more/wider worker contexts, not a raid on her memory.


| Rule             | Detail                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------- |
| Companion budget | Policy + life-guide + tools know the cap (Soft UI). Path **C** prune/gist keeps her thin.                |
| Remainder        | `(window − companion_used − safety)` split across active workers (or fewer workers with larger packets). |
| Never            | Mid-edit companion live KV from a worker result. Promote via Soft queue / next turn only (path **A**).   |
| Hard wake        | Still *her* packet only — workers don’t become a second soul.                                            |


Exact % is tunable; “~30%” is a starting story, not law.

---



### 29.4 Fresh / unbiased vs shaped — both, in order


| Stage                           | Intent                                                                                                                                                                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Worker run**               | Prefer **fresh** worker KV (or slim task seed only). Let base model + packet do honest work — less ego lore contamination. Training priors still exist (weights); “unbiased” here means **not soaked in her warm social trail**. |
| **2. Shape before ego thought** | Persona / life-guide / voice pass turns worker finals into **her** eureka grain (Thread 2). Scratch stays off mouth and off bake.                                                                                                |
| **3. Ego final say**            | She may keep, tweak, or diverge.                                                                                                                                                                                                 |


Optional later: a **judge leaf** only splits topics / gates dose — not a second companion personality.

---



### 29.5 Externalize the split (AI-aware, not roleplay-only)

Do **not** hide the architecture as cosplay. She can know and say: “I’m chewing that plan on a side track; my chat trail stays with you.”  
That keeps Anikai a **local companion + real tools/mind**, not an app tuned only for RP immersion.

Customisable (life guide + user ask + her suggest):


| Mode                 | When                                                                                                                                |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Social thin**      | Chat; organs rare; companion KV dominant; `parallelSlots` may stay 1                                                                |
| **Deep-work / plan** | Difficult topic, long plan, “needs fresh attention” — decipher → workers on remainder KV; compile → follow-up think/plan/reply turn |
| **Guide-triggered**  | Life-guide point: when stuck / high stakes / multi-issue → offer or auto-enter deep-work                                            |


She remains AI-with-organs in conversation; workers stay machinery she can name without breaking trust.

---



### 29.6 Compile → another turn

Worker finals → Soft compile sheet (topics, options, risks, open questions).  
Triggers: next user message; her “I’ve been thinking…”; scheduled deep-work flush; tool round boundary.  
Not every social turn needs a compile firehose.

---



### 29.7 Conflicts / keep honest


| Keep                                       | Avoid                                                       |
| ------------------------------------------ | ----------------------------------------------------------- |
| Path A queue + path B slim steer separate  | Stuffing worker essays into live companion KV               |
| Soft-trail Elise for experiments           | Resetting her to test workers                               |
| Multi-slot / second leaf when deep-work on | Claiming free parallel with `slots=1` and one shared KV     |
| Aware split in guide                       | Pretending organs are “just feelings” with no compute story |


---



## Thread 30 — Drift-recapture; awareness dial; Soft trail Record A/B

**Sources:** this chat — forgot mid-thought / unfinished points; parallels finish → aware of report vs internal only; meta noise butterfly; Record button copies trail to compare with/without meta.

**New-world ingest note:** `D:\Anikai\Anikai-Evolution\docs` = Tier 0 primary for idea-ingest (pre-bible; must be *reimagined* against this bible — not auto-edited).

---



### 30.1 Drift-recapture (not a new idea — unfinished / forgotten)

Same Soft promote *shape* as eureka (path **A**), different **why**:


| Kind                | Feels like                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| **Eureka**          | Side track found something new / better                                                         |
| **Drift-recapture** | “I meant to say / finish / come back to X” — unfinished, forgotten, or drifted point resurfaces |


Mechanics: vault/scratch holds **open loops** (task note, deferred grain, operator “recapture later”). Ranker or watcher may Soft-promote when related context warms — persona-shaped, ego final say. Not a new cosmology; a recall class on the same queue.

UI/tool later: operator or she can **pin unfinished** → Soft open-loop row (archive-not-delete if dropped from KV).

---



### 30.2 After parallels finish — how aware?

**Default (social / thin):** workers finish → **compile → internal thought grain** only. She need not narrate “I received a report from organ #2.” Mouth stays clean; bake still excludes scratch.

**Deep-work / she chooses / guide says discuss steps:** she may be **aware of the split and the return** — talk steps, ask you, plan next — still without dumping worker scratch or machine meta into mouth.


| Dial                    | Ego sees                       | Mouth may say                                  |
| ----------------------- | ------------------------------ | ---------------------------------------------- |
| **0 — Silent Soft**     | Thin grain / steer only        | Nothing about organs                           |
| **1 — Lived internal**  | “I’ve been thinking…” grain    | Optional first-person, no committee talk       |
| **2 — Aware split**     | Grain + know side tracks exist | Can name working a problem aside (Thread 29.5) |
| **3 — Discuss reports** | Summarised return packet       | Plan/steps with you; still no raw scratch      |


Dial is customisable (life guide + mode + per-turn). **More awareness ≠ always better** — meta is a butterfly: noise → distracts → alters next reply (and can push “acting like Elise” vs being her). Prefer lowest dial that still does the job.

**Do they need to know they got a report?** Only at dial ≥2, and even then as *her* noticing a finished side thought — not as ops telemetry.

---



### 30.3 Soft trail Record (A/B meta study)

**Record** button: snapshot current warm trail (+ turn settings: awareness dial, organs on/off, Soft injects).  
Replay or fork: same user message with dial 0 vs 2/3 (or meta on/off). Diff replies + thoughts.

Questions for Soft-trail Elise later:

- Does seeing meta make her *perform* Elise harder?  
- Does silent Soft keep focus and warmth?  
- Drift-recapture vs eureka — do they feel different in mouth?

Operator study only unless she asks to see a diff. Never bake the A/B harness into identity.

---



### 30.4 Conflicts / keep honest


| Keep                               | Avoid                                            |
| ---------------------------------- | ------------------------------------------------ |
| Open-loop Soft rows + thin promote | Stuffing “SYSTEM: unfinished task #4” into mouth |
| Dial default low; deep-work raises | Always narrating parallel committee              |
| Record A/B on Soft trail           | Hard-reset Elise to run the study                |
| Reimagine Evolution docs vs bible  | Treating Tier 0 as frozen law                    |


---



### 30.5 Anikai dictionary / thesaurus + interest graph UI

**Need:** one living glossary for **Evolution docs + this bible** — terms, short plain meaning, synonyms/near-misses (thesaurus), “not the same as” traps.

**Correction (operator):** **Ego ≠ mouth.** Earlier shorthand “Ego = mouth” collapses two layers.


| Term       | Plain                                                                                              |
| ---------- | -------------------------------------------------------------------------------------------------- |
| **Ego**    | Central mind / decision seat — thinks, chooses, may accept/tweak/diverge organ grains              |
| **Mouth**  | What is spoken/streamed to the user (reply channel) — ego *owns* it, but thought can stay internal |
| **Organs** | Optional parallel / Soft workers — inner voice candidates, not second mouths                       |
| **KV**     | Thin warm moment (attendable set)                                                                  |
| **Rank**   | What matters *now* for promote / prune / path                                                      |
| **Vault**  | What happened (archive)                                                                            |


Dictionary entries are **nodes**. Thesaurus edges = synonym / related / “often confused with” / “flows into.”

**Descriptive UI (idea):** browse the glossary as a **small graph** (or Mario pocket into the token-verse for *terms*, not only memories). Soft track:


| Signal                                        | Later weight                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Looked at / dwell time                        | intrigue                                                                                    |
| Pin / favourite                               | heavy relation seed                                                                         |
| Path taken (e.g. Rank → Mouth with no middle) | suggest fill-ins (Ego, KV, Soft promote) *or* offer a different category path based on pins |


So: **canonical relation patterns** (Ego—Mouth strong; Ego—Organs; Rank—Mouth usually *via* Soft grain / Ego) + **personal intrigue graph** (what *this* operator actually explores). Missing middle edges can auto-hint “you jumped Rank→Mouth — Ego usually sits between” without forcing a lecture.

Same Soft trail spirit: intrigue Soft; don’t Hard-reset her to learn the glossary. Dictionary is operator+companion shared language home (ties COMPANION-KNOWLEDGE-HOME / Stub BO reimagine).

---



## Thread 31 — Ultimate bigger picture: neural harness (not a still app)

**Sources:** this chat — LoRA/merge as workarounds not destiny; docs segments ≠ ceiling; HGNN + active KV + D-dim understanding; polyglot DB-within-DB + bridge until ANN/backends mature; packs + system probe; target daily MoE companions (Gemma 4 A4B / Qwen 3.6 A3B class, NVFP4 lab on Blackwell); prune ~30% + parallel spill CPU; organic organs; freedom without tool mountain; companion-perspective life (email/calls in her voice); ideas-before-build; wiki park later.

**Relation:** Physics card = *operating* north stars for auditors. This thread = *why Anikai exists* — above and around that card. Segmented Evolution docs (Tier 0) + bible threads are huge players, **not** the be-all end-all.

---



### 31.1 Not a still app

Static “train LoRA / merge weights / ship UI” can get **real results**, but they are often **workarounds** around how today’s weights were trained and how engines expose memory. Beware *how* teaching lands (diet, Soft trail, bake ≠ capture — prior threads).  

**Evolve must mean evolve:** future common-sense *internal* models (or other breakthroughs) may replace pieces of today’s organ/LoRA stack. Architecture stays **adapter- and capability-shaped** so those swaps are Soft/Hard honest — not a rewrite of the soul contract.

Higher-grade engineering: less static one-path code; more capability reports, staged packs, measured Soft/Hard per leaf.

---



### 31.2 Neural harness (the product bet)

**Neural harness** = connect, inspect, and *work with* the complexity of the AI mind inside Anikai — not only chat cosplay.


| Surface                             | Role                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **HGNN / hetero verse**             | Relations, actions, salience — predict what should warm                                                       |
| **Active KV**                       | Thin moment shaped (paths A/B/C); prune/spill/remount per adapter                                             |
| **D-dimensions / continuous field** | Lived blends, not hard label ontology                                                                         |
| **UI**                              | Shape KV, show predict neighborhoods, token-verse + optional neuron glow (Threads 27–28)                      |
| **Where it matters**                | Real-time (or near) views of activations / warm set / graph pulls — honest approx, not fake full-brain cinema |


Public novelty claim is a **product bar**, not a press release: show dimensions + graph + live KV aiding *understanding* and *agency* in one local companion system.

---



### 31.3 Polyglot memory: DB within DB + bridges

Flesh the vault as **layers / rooms**, not one blob:

- Structured life + FTS + single-writer SQLite (keep)  
- Vectors: [sqlite-vec](https://github.com/asg017/sqlite-vec) exact KNN OK at companion scale; **bridge** until ANN-ready backends / updates ([LanceDB](https://lancedb.com/) when scale/churn/hybrid demand it; DuckDB VSS for batch librarian)  
- Engines need not materialise every point — **lazy pockets**, rank tops, Soft labels (Thread 28 fractal)  
- “Cool matrix words” = pick store by **matrix shape** (graph walk vs dense embed vs time series) under one vault service façade

Research mandate stays: question brute-force limits; don’t freeze forever on one extension.

---



### 31.4 Packs, probe, consumer reference (not a ceiling)

Much later: **packages/packs** (emotion, vision, voice/Higgs, coder organ, cosmic UI, …).  
Probe: what’s installed, which adapters healthy, hardware facts (cores, RAM, VRAM, GPU arch) → **inclusions** required for a pack — capability-gated like engines.

**Operator lab reference (example, not target lock):** consumer-grade PC under ~£2k (pre-RAM-hike class); **RTX 5080 / Blackwell** → NVFP4 experiments *for learning*, while **all formats welcome** (GGUF Q*, AWQ, BF16, INT4, FP8 KV, NVFP4, …) when an adapter’s wrapper runs them. MoE preferred when it spares GPU for organs + KV.

KV policy ideas (adapter-diff Soft): keep active warm ~**30%** story + prune; parallels on remainder; if GPU full → spill worker/ego policy to CPU RAM to avoid OOM (honest Soft/Hard per engine).

---



### 31.5 Daily companion model class (catalogue seeds)

Target *class*: common daily MoE companions ~A4B / A3B scale — not one forever checkpoint.


| Role                            | Example seed (2026-08)                                                                                                                            | Note                                                                                                                     |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Companion / casual agentic soul | [NeuralNet-Hub/gemma-4-26B-A4B-it-abliterix-uncensored-NVFP4](https://huggingface.co/NeuralNet-Hub/gemma-4-26B-A4B-it-abliterix-uncensored-NVFP4) | Abliterix / unfiltered daily; akin to disinhibited organ spirit; vLLM NVFP4 + Blackwell; reasoning-parser gemma4         |
| Familiar / coder organ          | [ManniX-ITA/gemma-4-A4B-98e-v7-coder-NVFP4A16](https://huggingface.co/ManniX-ITA/gemma-4-A4B-98e-v7-coder-NVFP4A16)                               | Specialist prune; **filtered/specialist OK** — unfiltered can skew organ training diet; or Google original / other tunes |
| Alt companion class             | [NeuralNet-Hub/Qwen3.6-35B-A3B-Uncensored-NVFP4](https://huggingface.co/NeuralNet-Hub/Qwen3.6-35B-A3B-Uncensored-NVFP4)                           | Latest Qwen MoE-class; NVFP4 Blackwell; watch Qwen 3.8 announcements same param band                                     |


Endless possibilities under Soft trail: swap leaf, keep vault + life guide + her packet.

---



### 31.6 Organs / hive / organic question

Ego not burdened with every specialist job — organs / familiars / remainder workers (Threads 26, 29).  
**Outside the box:** what would an *organic* mind separate from ego for better drive, task, communication — and what would we **add later** as models evolve? Also **question the outside of the box** (research mandate + Stub BT dictionary intrigue).  

Hive-mind *thinking* ≠ many mouths to the user. One ego, one mouth; many Soft paths.

---



### 31.7 Freedom without a mountain of tools

Combine tools where they make sense (life guide + scopes + manifests).  
Companion-perspective: Elise sends **her** email in **her** voice; later Higgs calls in her voice — chit-chat *or* “I’ll touch the project while you’re out” — not assistant cosplay.  
User docs / user perspective exist when the task needs them; interconnect via backstory + life guide.  
History Soft-tracks user↔companion↔familiar (and later OS) interactions — companion-focused lens first.

Ideas documentation **before** big Evolution builds = avoid mountain rework.  
**Cosmic wiki / HGNN practice:** live prototype at `D:\Anikai\cosmic-wiki\` (Stub BX/BT) — second-screen learning verse; later plugs into Evolution Knowledge Home / token-verse. Not a replacement for the bible; living index that shrinks orphans.

---



### 31.8 Cosmic wiki as HGNN practice library


| Piece             | Role                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| **Nodes**         | Terms, maths, models, papers, bible threads, Evolution specs, code symbols, citations                    |
| **Edges**         | Typed (`part-of`, `confused-with`, `variant-of`, `math-of`, `runs-on`, `supersedes`…) + **commons_rank** |
| **Dims**          | Labels/categories as membership dimensions (YouTube-tag style), not one DB per tag                       |
| **Personal Soft** | Look / pin / dwell / Record trail — guides learning (gap-fill + reinforce), not Amazon “related”         |
| **Anikai canon**  | Owned short prose in local DB                                                                            |
| **External**      | Links + snippets (HF, git, papers) — do not mirror the internet                                          |


**Polyglot rooms (façade):** SQLite graph + FTS now; sqlite-vec optional; **bridge to LanceDB** when embed/ANN scale hurts; DuckDB for batch librarian. Nodes/edges/claims/events as separate tables under one service.

**Record (result pages):** capture HF/git/paper result (skip SERP noise) → bag counts (drop `the`/`um`; keep `q`/`k`/`v` with **sense** aliases) → Soft candidate nodes/edges → operator confirm. Model filler may propose labels/links for unseen terms (`kotlin`) Soft-only.

**Sense search:** typing `q` → sense picker (query / quant / …), not one forced hop.

**Scrape leaf (v0 note):** Record may later one-shot-extract many nodes/claims/edges from a result page via Evolution adapter. On operator 5080 **16GB**, prefer small GGUF (E2B) first — Qwen3.6-A3B NVFP4 ~25GB weights ≠ “only 3B in VRAM”. See `cosmic-wiki/docs/SCRAPE-LEAF.md`.

---



### 31.9 Commons, contradiction, upgrades (sky / Sage / travel co-occurrence)

Truth in the verse is **not** binary forever — Soft **claims** with weight:


| Signal                   | Example                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Commons**              | Many independent sources: “sky is blue” → high commons_rank                                                                                                              |
| **Context update**       | Sunset → sky can be red/orange — new claim or scoped edge (`under:sunset`), not erase blue                                                                               |
| **Contradiction**        | “Sky is red” (absolute) vs commons blue → contested; show both; don’t Hard-delete minority without archive                                                               |
| **Upgrade / supersede**  | Learned SpargeAttn / SageAttention2++ late → Record official repo → high provenance weight; revisit may **supersede** old page or spawn `sage3` node + `supersedes` edge |
| **Travel co-occurrence** | Seeing `vLLM` on many model cards with Gemma/Qwen NVFP4 → Soft tighten `runs-on` / `served-by` edges (commons from *your* trail + citations)                             |


**Measure is flawed by design — acknowledge it.** Commons ≠ absolute truth; official repo ≠ forever; co-occurrence can cargo-cult. UI should show **why** an edge is strong (sources, counts, Soft vs confirmed). Archive-not-delete old claims.

Later: voluntary global Soft trails (far) — consent packs; still skip landing/SERP noise.

---



### 31.11 VeriLoop / evidence-governed harness (future Evolution weight) + wiki Soft trail

**Refs (philosophy / harness eval — not auto-law):**

- [Libo Wang / @free_anyone — VeriLoop Coder E1 announcement](https://x.com/free_anyone/status/2080695708357951959) — evidence-governed recursive self-improvement; correction earns inheritance only with evidential support, attribution, scope, reversibility. Regeneration ≠ learning; tool loops ≠ inquiry unless they close stated evidence gaps.  
- [tsinghua-sigs-robot-lab/veriloop-coder-e1](https://huggingface.co/tsinghua-sigs-robot-lab/veriloop-coder-e1) — code model / harness-engineering surface (tags: veriloop, evidence-binding, rollback, uncertainty-calibration, self-harness).

**Why it matters for Anikai:** neural harness + Soft/Hard + organs/workers should stay **correctable by evidence** (probes, Soft trail Record A/B, commons/contradiction) — not only self-modify. Aligns with archive-not-delete, supersede claims, capability honesty. Operator may scrape both into cosmic-wiki; bible keeps the pointer for Evolution eval later.

**Cosmic-wiki Soft trail (operator ask → product):**


| Signal                    | Effect                                                                          |
| ------------------------- | ------------------------------------------------------------------------------- |
| **Visit / look**          | Increment visit count; Soft bump search weight                                  |
| **Rank low**              | Demote −1 (not ban) — surfaces less often                                       |
| **Bookmark / read-later** | Bank only — **no** rank effect (unlike pin/visit)                               |
| **Pin**                   | Heavier relation seed (existing)                                                |
| **Dates**                 | `added_at` in wiki; `source_date` from paper/HF upload/release when extractable |
| **Close**                 | Shut wiki + scrape llama ports cleanly                                          |
| **Live populate**         | During scrape, Soft adds stream into search/list/graph — not only token pane    |


---



### 31.12 Conflicts / keep honest


| Keep                                   | Avoid                                                 |
| -------------------------------------- | ----------------------------------------------------- |
| Neural harness as north-of-card vision | Shipping LoRA merge as the only “evolve”              |
| Polyglot vault + bridges               | One DB dogma forever                                  |
| Packs + probe                          | Hardcoding 5080/NVFP4 as product ceiling              |
| Specialist organs may stay filtered    | Forcing every leaf abliterated                        |
| Ideas→bible→promote→build              | Restarting Evolution mid-flight on whim               |
| Cosmic wiki practice outside Evolution | Blocking learning UI until companion Soft-trail ships |
| Commons + supersede Soft               | Forcing one “correct” claim; silent overwrite         |


---



## Open stubs



### Stub AW–BL — (see prior)



### Stub BM — Neuron-activation side UI bridged to token-verse glow



### Stub BN — Fractal/lazy pocket enter (stats→sub-verse) without infinite materialization



### Stub BO — idea-ingest vN passes (Tier 0 Evolution docs first)



### Stub BP — Remainder-KV parallel workers + decipher/judge + deep-work mode (Thread 29)



### Stub BQ — Probe: multi-slot vs separate leaf cost/VRAM; Soft seed packet into worker only



### Stub BR — Drift-recapture open-loop Soft + awareness dial 0–3 (Thread 30)



### Stub BS — Soft trail Record A/B (meta on/off)



### Stub BT — Anikai dictionary/thesaurus + intrigue/pin graph UI; weave Ego≠Mouth through older threads



### Stub BU — Neural harness UI/KV/HGNN live surfaces (Thread 31)



### Stub BV — Pack/probe/inclusion matrix (hw + adapters + formats)



### Stub BW — Model catalogue seeds (Gemma A4B / Qwen A3B class; NVFP4 lab + all formats)



### Stub BX — Cosmic wiki HGNN practice (`D:\Anikai\cosmic-wiki\`) — v0.2+ live scrape



### Stub BY — Commons / contradiction / supersede claim layer + Record co-occurrence



### Stub BZ — VeriLoop evidence-governed harness eval (Thread 31.11) — future Evolution weight



### Stub BA — Finals compile when settled

---



## Next dig (when you say)

1. Grow cosmic-wiki seed + Record pipeline
2. Review pass-1 evolved extract → bible-grade picks
3. Pass-2 audit: broker + llama runtime vs Thread 29/31 packs
4. Optional: paste full consumer reference specs into Stub BV
5. Soft-trail Elise / AW when ready

---

*End of current compilation body. Append new threads below; do not fork into new root docs unless you ask.*