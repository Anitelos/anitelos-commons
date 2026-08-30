# Contributing to Anitelos: Drops, RFCs, and Provenance

> **Welcome:** You do not need a computer science degree or formal credentials to contribute. Conceptual analogies, failure reports, informal observations, and code patches are equally valued.

---

## 1. How to Submit a "Drop"

A **Drop** is an informal, low-barrier conceptual fragment, analogy, or intuitive comparison (e.g. comparing indirect lighting in graphics to emergent societal impacts, or fluid separation to half-life decay).

1. Create a markdown file in `commons/drops/2026/drop-short-name.md`.
2. Read [`DROP-SAFETY.md`](DROP-SAFETY.md) and decide whether the source is private, pending public review, or public.
3. Never commit credentials, session material or non-consensual private third-party information.
4. Use the following template:

```markdown
# DROP: [Title / Short Name]
- **Author:** Git identity / alias
- **Date:** YYYY-MM-DD
- **Status:** RAW_DROPPED
- **Confidence:** SPECULATIVE
- **Publication:** PRIVATE_RAW | PUBLIC_REVIEW_PENDING | PUBLIC_RELEASED
- **Privacy Review:** REQUIRED | COMPLETE
- **Assistant Content Present:** YES | NO

## The Intuition / Analogy
[Explain your thought in your own words. Informal language welcomed.]

## Potential Connective Edges
- Relates to: [Concept A, Topic B, or Paper C]
```

---

## 2. Submitting RFCs & Component Specs

For formal architectural proposals, use `commons/proposals/open/`:
- Include `SUPERSEDES:` and `RECONSIDER_IF:` blocks.
- Attach benchmark telemetry or evidence logs where applicable.

---

## 3. Community Discourse, Privacy & Safety

- **No Tone-Policing:** Express yourself honestly. Blunt critique and technical pushback are welcomed.
- **No Privacy Shaming:** A contributor may withdraw personal raw material from public access without having to defend why it became unsafe or uncomfortable.
- **Protect Third Parties:** Provenance does not grant permission to publish someone else's private material.
- **Git Hygiene:** Sign-off records contributor certification; it does not by itself prove copyright ownership, consent, factual correctness or legal compliance.
- **Public Release Gate:** A human must approve publication after privacy, secret, redistribution and status review.

See [`DROP-SAFETY.md`](DROP-SAFETY.md) for the full policy and the limitations of automated scanning.
