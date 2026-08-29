# Anitelos Commons: Legal Design Notes
> **Status:** PRE-LEGAL-REVIEW | Design Intent, Not Operative License  
> **Purpose:** Document the desired legal/philosophical properties of Anitelos before formal counsel review  
> **Disclaimer:** These notes represent architectural goals and principles, NOT binding legal obligations. Do not rely on this document as legal advice or enforceable license terms.

---

## The Central Principle

**Profit is not extraction. Secrecy of Commons improvements is.**

Someone can make £100 million from a game built with Anitelos and remain in perfect alignment with our philosophy.

What they should not be able to do: take a Commons component, develop it in secret, commercialize the improvement, and prevent the community from studying or superseding it.

---

## What We're Trying to Achieve (Design Goals)

### 1. Reciprocal Transparency for Core Improvements
- **Goal:** If you modify the Anitelos execution layer (kernels, salience graph, memory management), those improvements flow back to the commons.
- **Not a ban on profit:** You can commercialize a game, app, or service built on top.
- **Not a ban on privacy:** Your game logic, story, business model, and UX remain yours.
- **The boundary:** The distinction between "improvements to shared foundation" vs. "innovations built on top."

### 2. Commercial Freedom
- Build and sell games, services, and products using Anitelos.
- Keep your applications proprietary.
- Charge users; keep revenue.
- No licensing fees for using the commons.

### 3. Attribution & Provenance Integrity
- All uses must acknowledge Anitelos as the foundation.
- Trademark reserved for the commons (you can't rebrand Anitelos as your proprietary product).
- Contribution history remains permanent and publicly visible.

### 4. No Unilateral Enclosure
- No single founder, maintainer, corporation, or foundation may convert commons material into proprietary intellectual property.
- Even if Anitelos becomes massive and valuable, the commons cannot be bought, sold, or locked behind closed source.

### 5. Right to Fork & Revert
- Users retain absolute sovereignty over their local installations.
- If the global commons makes decisions users dislike, they can freeze their local schema, fork independently, or operate offline indefinitely.
- No majority vote can force breaking changes on a sovereign node.

### 6. Stewardship Without Fractional Ownership
- Contributors who materially improve a node gain stewardship status and attribution.
- Stewardship ≠ exclusive ownership or right to enclose.
- Stewardship = responsibility, maintenance rights, provenance, standing in relevant decisions.
- Many contributors can steward different nodes without becoming joint legal owners of the entire project.

---

## Open Legal Questions (To Be Resolved With Counsel)

### Q1: Which Established License Best Encodes These Goals?

**Candidate Frameworks:**
- **AGPL v3 for code** — Network copyleft ensures SaaS/cloud deployments share source. But AGPL can be overly broad for embedded libraries.
- **GPL v3 for code** — Strong copyleft. May be overkill if we want permissive proprietary apps.
- **EUPL 1.2** — European equivalent to GPL; slightly different scope.
- **Apache 2.0 + Custom Commons Covenant** — Permissive base, plus non-enclosure covenant as supplementary document.
- **Dual-licensing** — Proprietary license for applications; open license for the foundation.

**The Challenge:** Most established licenses don't natively distinguish between "using Anitelos" and "improving Anitelos core." We need a license that:
- Permits proprietary applications built on top.
- Requires improvements to core components to flow back.
- Protects against secret deployment (AGPL helps here).
- Is legally recognizable and defensible in court.

**Hypothesis:** AGPL v3 for code + a separate non-enclosure covenant (not a standalone "ARTL license") may be the strongest approach.

---

### Q2: Should Different Artifact Types Use Different Licenses?

**Observation:** Software Freedom Conservancy uses AGPL for code and CC-BY-SA 4.0 for documentation.

**Anitelos Artifact Types:**
- **Executable Code** (Mojo kernels, Python runtimes, compiled binaries) → Software license (AGPL/GPL/etc.)
- **Schemas & Configuration** (SQLite graph schema, governance voting logic, salience ranking formulas) → May need hybrid treatment
- **Documentation & Explanations** (architectural guides, design decisions, knowledge base) → CC-BY-SA or similar
- **Governance Protocols** (voting mechanisms, conciliation procedures, stewardship rules) → Constitutional document (not software license)

**Benefit:** Separates concerns. A researcher can use documentation under CC-BY-SA, modify it, and share it without triggering copyleft software obligations.

**Risk:** If boundaries are unclear, license selection becomes a legal trap.

---

### Q3: How Do We Prevent "Relicensing Authority = New Enclosure"?

**The Trap:** A CLA saying "Anitelos Commons may relicense contributions" hands the entire project to whoever controls "Anitelos Commons."

**Better Approach:** Prohibit retroactive relicensing of previously contributed material.

**Proposed Language:**
```
No individual maintainer, corporation, foundation, or governing body
may obtain unilateral authority to convert previously contributed
Commons material into an enclosed proprietary work.

Future versions of the license may add obligations (e.g., additional
reciprocity), but may not remove existing freedoms or rights.

Relicensing requires consensus among active stewards and contributors.
```

**This prevents:** A future "Anitelos Foundation" from doing an OpenSSL-style surprise relicensing.

---

### Q4: Who Has Legal Standing to Enforce the License?

**The Problem:** If everyone owns everything, who sues an encloser?

**Candidate Models:**

**Option A: Delegated Enforcement (Software Freedom Conservancy Model)**
- Establish a legal entity (e.g., Anitelos Foundation, UK non-profit).
- Contributors delegate enforcement authority to this entity.
- The entity holds standing to sue for license violations.
- The entity does NOT own the commons philosophically; it's the commons' legal hand.
- Governance board ensures the entity can't act unilaterally.

**Option B: Distributed Enforcement**
- Any significant contributor can sue for violations affecting their work.
- Expensive, fragmented, but doesn't centralize power.
- Risk: Conflicting legal strategies.

**Option C: Hybrid**
- Contributors retain copyright in their work.
- A non-profit holds authority to coordinate enforcement (not own).
- Enforcement decisions require community deliberation.

**Recommendation:** Option A (delegated through a non-profit entity) with strict governance constraints.

---

### Q5: How Do We Define "Core Engine" vs. "Built On Top"?

**This is the Crux.**

Example: A studio builds a game using Anitelos.

- **Clearly theirs:** Character dialogue, quest systems, world design, asset pipeline, game server logic, business model.
- **Clearly core:** Mojo attention kernels, KV cache eviction algorithms, salience graph ranking.
- **Ambiguous:** A custom NPC decision-making loop that leverages Anitelos? Is that core or application logic?

**Proposed Boundary Definition:**
- **Core:** Any modification to code under `/kernels/`, `/graph/`, `/attention/`, or other designated foundation modules.
- **Application:** Code under `/apps/`, `/games/`, `/schemas/`, or code that sits ABOVE the published Anitelos API.
- **The Test:** If removing your changes breaks Anitelos core functionality for other users, it's core. If it only affects your application, it's application code.

**This needs Legal + Technical Input.**

---

### Q6: What About Contributor-Managed Stewardship?

**Your Concept:** Contributors who materially improve a node become stewards of that node.

**Legal Challenge:** Stewardship ≠ copyright ownership. Need to clarify what stewardship grants:
- ✅ Provenance (always credited)
- ✅ Maintenance authority (can accept/reject PRs affecting that node)
- ✅ Standing in governance (vote on decisions affecting that node)
- ❌ Exclusive ownership (cannot prevent others from forking or improving)
- ❌ Right to relicense (cannot unilaterally change that node's license)
- ❌ Veto power over the commons (overridden by majority)

**Proposed Language:**
```
Contribution creates stewardship, not dominion.

A person who creates, materially improves, documents, validates, or
maintains a Commons node gains:
  • Recognised provenance and attribution
  • Maintenance authority over that node (within governance constraints)
  • Standing to participate in deliberation affecting that node
  • Continuity of acknowledgment even if superseded

Stewardship does NOT grant:
  • Exclusive ownership of Commons knowledge
  • Right to enclose or privatize the node
  • Right to prevent supersession or improvement
  • Veto power over global governance decisions
  • Unilateral control over relicensing
```

---

### Q7: Should We Eventually Distinguish Contributors from Users?

**Your Question:** "If I just run Anitelos, am I a contributor? Or do I only become one if I improve something?"

**Answer:** Not yet. Leave this unresolved.

**Why:** Contribution in Anitelos will include non-code activities:
- **Submitting benchmark evidence** → Useful contribution
- **Finding a flaw in design logic** → Valuable contribution
- **Running the system for 6 months and documenting friction** → Potentially important contribution
- **Just using it** → User, not (yet) contributor

**Better Taxonomy (Not Yet Binding):**
- **User:** Runs Anitelos; doesn't propose changes
- **Evidence Contributor:** Reports bugs, benchmarks, friction
- **Code Contributor:** Submits patches, kernels, schemas
- **Steward:** Maintains a node; has governance standing
- **Maintainer:** Stewards a foundational area; coordinates others

**Don't lock this down yet.** Let it evolve as the commons grows. Make it part of GOVERNANCE.md, not LICENSE.md.

---

### Q8: Should We Remove the "Bad-Faith Competitor" Clause?

**Current Language (from draft ARTL):**
```
❌ Bad-Faith Competitive Blocking: Using Anitelos to build a direct
commercial competitor while deliberately withholding improvements that
would obviously benefit the commons (e.g., a dramatically faster kernel).
```

**Problem:** This violates the Open Source Definition principle of field-of-use neutrality. Open licenses cannot discriminate against particular uses or industries.

**Also:** Your philosophy is anti-enclosure, not anti-competition. Let competitors exist. They're welcome as long as they comply with license terms.

**Better Language:**
```
✅ Competition is welcomed. Building a commercial alternative powered
by Anitelos is permitted, as long as improvements to the commons layer
are shared (within the license terms) and attribution is maintained.
```

---

## What This Repository Should Contain (Restructured)

```
anitelos-commons/
├── README.md                           # Main entry point, Prompt Zero
│
├── LICENSE                             # Chosen established license (to be selected with counsel)
├── LICENSES/
│   ├── CODE-LICENSE                    # e.g., AGPL v3 or GPL v3
│   ├── DOCUMENTATION-LICENSE           # e.g., CC-BY-SA 4.0
│   └── GOVERNANCE-LICENSE              # Non-enclosure covenant (separate from code license)
│
├── GOVERNANCE.md                       # How decisions are made, voting, stewardship
├── COMMONS-COVENANT.md                 # Non-enclosure philosophy (aspirational + binding)
├── LEGAL-DESIGN-NOTES.md               # This document (pre-counsel hypothesis)
├── CONTRIBUTING.md                     # How to contribute, stewardship, provenance
│
├── ANITELOS-MASTER-THESIS.md           # The foundational vision & architecture
├── ARCHITECTURE-QUICKSTART.md          # TL;DR for rapid onboarding
│
├── genesis/                            # Raw provenance (immutable)
│   ├── 2026-08-29-CORE-CHAT-LOG.md     # This conversation (unedited)
│   └── raw-notes/                      # Original thoughts, sketches, failures
│
├── docs/                               # Structured specs
│   ├── 01-cognitive-architecture.md
│   ├── 02-silicon-layer.md
│   ├── 03-heterogeneous-salience-graph.md
│   └── old-anikai/                     # Pre-Anitelos ideas
│
├── schemas/                            # Community templates
│   ├── template-ikea-schema.md
│   └── examples/
│
└── .gitignore
```

---

## Next Steps Before Going Public

1. **Hire Open-Source IP Counsel:** Have them review this LEGAL-DESIGN-NOTES.md and recommend:
   - Which established license(s) to use for code, docs, governance
   - Whether a non-profit entity is needed for enforcement
   - How to structure the CLA / contributor agreement (if needed at all)
   - Trademark registration strategy for "Anitelos"

2. **Don't Custom-Write a License Yet:** Archive the proposed ARTL as design intent, not law.

3. **Separate Philosophical Covenant from Legal License:**
   - LICENSE → Use an established framework (AGPL, GPL, etc.)
   - COMMONS-COVENANT.md → Articulate non-enclosure principles + restrictions on future relicensing
   - GOVERNANCE.md → Decision-making, stewardship, dispute resolution

4. **Test the Boundaries:** In LEGAL-DESIGN-NOTES.md (this doc), include concrete scenarios and ask counsel how the chosen license handles them.

5. **Make the Genesis Immutable:** Lock the February-August 2026 thought trail in read-only form. Let future evolution build on top, not rewrite the foundation.

---

## Why This Matters

You're not just building an AI engine. You're designing legal and governance structures that will outlive your involvement and shape how thousands of people can contribute without fearing enclosure.

Getting this right before 100 contributors exist is exponentially easier than fixing it when the project is massive and fractious.

So yes: slow down here. Archive the hypothesis. Get counsel. Then move forward.

That's the Anitelos way: everything is flawed when it's proven. Test early, refine rigorously, preserve the evidence.

---

*This document is a hypothesis, not law. It will be reviewed by qualified legal counsel before becoming binding.*

*Drafted August 2026 — Anitelos Commons Design Team*
