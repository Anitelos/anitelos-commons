# Contributing to Anitelos: Drops, RFCs, and Provenance

> **Welcome:** You do not need a computer science degree or formal credentials to contribute. Conceptual analogies, failure reports, informal observations, and code patches are equally valued.

---

## 1. How to Submit a "Drop"

A **Drop** is an informal, low-barrier conceptual fragment, analogy, or intuitive comparison (e.g. comparing indirect lighting in graphics to emergent societal impacts, or fluid separation to half-life decay).

1. Create a markdown file in `painted-porch/drops/2026/drop-short-name.md`.
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

## 2. Bring a Drop to the Painted Porch

**The Painted Porch** is the Commons gathering place for discussion, meetings, challenge and collaborative edge-mapping. Today, participation may happen through repository issues, pull-request review or a discussion record in `painted-porch/`; it is not a claim that a dedicated platform already exists.

You can contribute without proposing a solution. Useful Porch contributions include:

- reporting how a change affects your actual system or workflow;
- asking a question the current proposition cannot answer;
- adding supporting or counter-evidence;
- identifying privacy, security, accessibility or minority-configuration risks;
- connecting a Drop to earlier discussions or superseded decisions.

A Porch discussion may remain open, branch into several Drops, or mature into a formal proposal. Discussion is not itself acceptance.

---

## 3. Submitting RFCs & Component Specs

For formal architectural proposals, use `painted-porch/proposals/open/`:
- Include `SUPERSEDES:` and `RECONSIDER_IF:` blocks.
- Attach benchmark telemetry or evidence logs where applicable.

---

## 4. Community Discourse, Privacy & Safety

- **No Tone-Policing:** Express yourself honestly. Blunt critique and technical pushback are welcomed.
- **No Privacy Shaming:** A contributor may withdraw personal raw material from public access without having to defend why it became unsafe or uncomfortable.
- **Protect Third Parties:** Provenance does not grant permission to publish someone else's private material.
- **Git Hygiene:** Sign-off records contributor certification; it does not by itself prove copyright ownership, consent, factual correctness or legal compliance.
- **Public Release Gate:** A human must approve publication after privacy, secret, redistribution and status review.

See [`DROP-SAFETY.md`](DROP-SAFETY.md) for the full policy and the limitations of automated scanning.


---

## 5. Choose the Target Before Contributing

The licence follows the target path:

| Contribution | Target | Licence |
| :--- | :--- | :--- |
| Drop, Painted Porch discussion, proposal, original documentation or diagram | `painted-porch/`, `docs/` or root policy Markdown | CC BY-SA 4.0 |
| Schema or protocol definition | `schemas/` or `protocols/` | Apache-2.0 |
| Reference implementation code | Explicitly marked software repository/directory | AGPL-3.0-only unless stated otherwise |
| Public aggregate dataset | Do not submit yet | Data licence and privacy release process remain unresolved |

Mixed contributions must separate code, prose, schemas, data and third-party
assets so each part can carry the correct notice. Do not copy the same material
into differently licensed directories to manufacture a new licence choice.

By submitting a contribution for inclusion, you certify that you have authority
to submit it and agree to its target path's declared licence. See
[`LICENSING.md`](LICENSING.md) before opening a pull request.
