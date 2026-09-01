# The Anitelos Sovereign Non-Enclosure Covenant

> **Core Mandate:** Knowledge and tooling created by the human commons belong to humanity. Anitelos is structurally protected against corporate capture, proprietary enclosure, and surveillance exploitation.

---

## 1. The 4-Layer Stance: Law, Covenant, Culture, Governance

To prevent the failure modes of previous open-source projects, Anitelos establishes four complementary protection layers:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ 1. LAW (GNU AGPLv3 for declared covered components)                      │
│    - Reciprocal copyleft applies according to the licence text and the   │
│      documented boundary of each distributed component.                 │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. COVENANT (The Anti-Asymmetric Covenant)                               │
│    - Ethical covenant: We ask commercial entities to return useful       │
│      improvements to the commons rather than building secret IP moats.   │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. CULTURE (Reciprocal Celebration)                                       │
│    - We celebrate and credit contributors who improve shared tools while │
│      maintaining an open, friction-welcoming, non-policed community.    │
├──────────────────────────────────────────────────────────────────────────┤
│ 4. GOVERNANCE (Durable, Auditable Provenance)                            │
│    - Unbroken attribution and supersession graphs preserve every         │
│      ingredient, drop, and critique in the historic record.              │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Anti-Asymmetric Enclosure (Commercial Use vs. Proprietary Moats)

* **Commercial Use Allowed:** Commercial businesses, applications and services may use Anitelos components subject to each component's applicable licence, attribution duties, third-party rights and law.
* **Non-Enclosure Commitment:** Commons participants are asked not to use secret improvements or patent/IP barriers to exclude the public from shared foundations. Enforceable obligations come from the applicable software licence; this Covenant records the project's ethical commitment.

---

## 3. The Non-Detriment Invariant (Anti-Surveillance Data Commitment)

Centralized platforms (such as enterprise email, cloud operating systems, and ad-tech monopolies) harvest user interactions, chats, and telemetry to build behavioral profiles, target ads, or sell data to third parties—frequently to the direct personal or economic detriment of their users.

Anitelos declares a strict **Non-Detriment Covenant**. Technical enforcement remains to be implemented and verified:

1. **Zero Behavioral Profiling:** Data emitted by an Anitelos node MUST NOT be used to profile, track, target, sell, or act to the detriment of any user or community.
2. **Purpose-Limited Telemetry:** Voluntary telemetry exists **solely** to improve runtime reliability, hardware compatibility, and knowledge graph coverage for the application itself.
3. **No Prompt Harvesting:** `[INVARIANT]` Anitelos-compatible telemetry MUST NOT intentionally contain personal vaults, private chat streams, local prompts, or personal memory graphs. `[SPEC]` Export payloads use explicit allowlists and user inspection. This repository does not yet contain an implementation or verification suite for that boundary.
4. **Protection for Non-Majority Edge Nodes:** `[INVARIANT]` Governance and engineering processes must not discard underrepresented configurations merely because they are uncommon. `[SPEC]` Coverage reports should surface evidence from Linux, AMD ROCm, integrated APUs, rural networks and other underrepresented environments.
