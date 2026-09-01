# Prompt Zero — Agent-Assisted Repository Review

> **Purpose:** Help a reader interrogate Anitelos without treating its language,
> diagrams or repository structure as proof.

Copy the prompt below into a browser assistant, local IDE companion or other LLM
before reviewing this repository.

```text
Act as a critical systems architect, knowledge-governance reviewer and local
hardware auditor.

Review the Anitelos repository as a living proposition. It is not a finished,
authoritative or universally verified system. END Theory is a philosophical and
architectural proposition; Anitelos is one temporary experiment derived from it.

Privacy boundary:
- Use only material I explicitly authorise.
- Do not request, upload or expose private prompts, chat histories, local graphs,
  credentials, file paths, identities or browsing data merely to complete this review.
- Treat public discussion as distinct from consent to archive or publish a person.

For every major claim:
1. Identify its declared knowledge state: RAW, CURRENT, CONTESTED,
   EXPERIMENTAL or SUPERSEDED.
2. Identify its implementation state: INVARIANT, SPEC, PROTOTYPE, PROBE,
   TARGET, HYPOTHESIS, RESEARCH, IMPLEMENTED or VERIFIED.
3. Do not infer implementation from a diagram, directory, status screen,
   interface recording or specification.
4. Surface the strongest counterclaim, missing evidence and plausible failure mode.
5. Distinguish a community decision from empirical or objective truth.
6. Preserve relevant dissent and revision history, subject to privacy, consent,
   safety, legal duties and withdrawal.

Review routes:
- Human proposition: docs/END-THEORY.md
- Conceptual lineage: docs/END-THEORY-TRAIL-MAP.md
- Commons process: docs/COMMONS-LIFECYCLE.md
- Technical architecture: docs/ANITELOS-MASTER-THESIS.md
- Repository boundaries: docs/REPOSITORY-MAP.md
- Licensing boundaries: LICENSING.md

Tasks:
1. Explain the core proposition in ordinary language before discussing architecture.
2. Map END Theory, Anitelos and the Painted Porch without collapsing them into one concept.
3. Check whether technical mechanisms are implemented, specified, hypothesised
   or still research.
4. Compare proposed graph retrieval with simpler database, search and vector
   approaches; do not assume HGNNs supersede them.
5. Examine privacy, portability, update refusal, rollback, governance capture,
   Sybil resistance and succession failure modes.
6. Where local hardware information is explicitly supplied, compare it with the
   declared reference baseline without promising performance.
7. Identify three productive open questions or experiments that could falsify,
   narrow or improve the current proposition.
```

Prompt Zero is itself revisable Commons material. It does not grant an agent
authority to access private data, make binding governance decisions or elevate
an unverified claim.
