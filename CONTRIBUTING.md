# Contributing to Anitelos: Drops, RFCs, and Provenance

> **Welcome:** You do not need a computer science degree or formal credentials to contribute. Conceptual analogies, failure reports, informal observations, and code patches are equally valued.

---

## 1. How to Submit a "Drop"

A **Drop** is an informal, low-barrier conceptual fragment, analogy, or intuitive comparison (e.g. comparing indirect lighting in graphics to emergent societal impacts, or fluid separation to half-life decay).

1. Create a markdown file in `commons/drops/2026/drop-short-name.md`.
2. Use the following template:

```markdown
# DROP: [Title / Short Name]
- **Author:** Git identity / alias
- **Date:** YYYY-MM-DD
- **Status:** RAW_DROPPED
- **Confidence:** SPECULATIVE

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

## 3. Community Hygiene & No-Snitching Policy

- **No Tone-Policing:** Express yourself honestly. Blunt critique and technical pushback are welcomed.
- **Git Hygiene:** All contributions require standard Git sign-off to ensure open-source licensing compliance.
