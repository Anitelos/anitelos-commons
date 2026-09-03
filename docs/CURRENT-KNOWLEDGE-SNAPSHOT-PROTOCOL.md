# Current Knowledge Snapshot Protocol

> **Status:** `[SPEC + RESEARCH]` A proposed method for turning an informal question into a dated, correctable research record.  
> **Boundary:** A snapshot records what a review could responsibly establish at a stated time. It is not permanent consensus, proof of END Theory or a substitute for specialist review.

## Why this exists

The Painted Porch should preserve more than polished conclusions. A useful record may begin with an intuition stated in unfamiliar language, pass through an incorrect interpretation, meet an established term or counterexample, and leave behind a better question.

Correction is therefore part of provenance. The original wording need not be silently rewritten, and the person who asked the question need not claim ownership of terminology or prior research uncovered along the way.

> **A correction need not end a line of thought. It may reveal that the line began from the wrong coordinate while still pointing toward a worthwhile question.**

## Required record

Each Current Knowledge Snapshot SHOULD contain:

1. **Raw question** — the contributor's original wording, preserved where publication is safe and consented.
2. **Initial interpretation** — what the question appeared to propose before research or correction.
3. **Current knowledge** — the strongest relevant account supported by inspected sources at the review date.
4. **Correction or counterclaim** — what was inaccurate, overstated, ambiguous or already named elsewhere.
5. **Remaining question** — what is genuinely unsettled after the correction.
6. **END/Anitelos relevance** — why the question matters to the relational model or an engineering decision.
7. **Sources and review date** — direct papers, standards, datasets or responsible institutional references.
8. **Revision path** — what later evidence would reopen, narrow or supersede the snapshot.

Suggested header:

```yaml
record_type: current-knowledge-snapshot
reviewed_on: YYYY-MM-DD
knowledge_state: current | contested | experimental | superseded
claim_scope: mathematical | physical | computational | philosophical | cultural
source_quality: primary | review | institutional-summary | secondary
reconsider_if:
  - stronger evidence changes the stated boundary
  - a specialist identifies a category error
  - an existing field provides a clearer established term
```

## Source and assistance boundary

Search engines, language models and research assistants may help discover vocabulary, candidate sources and objections. They are not the underlying authority for an empirical or historical claim.

The public trail SHOULD distinguish:

> contributor question → search or agent-assisted discovery → source inspection → correction → retained uncertainty → revised proposition

A snapshot should cite the paper, dataset, standard or institutional material actually inspected. An AI-generated explanation may be preserved as part of the reasoning trail, including its mistakes, but should not be promoted into evidence merely because it sounds confident.

## Terminology and originality

Before presenting project vocabulary as distinctive, record its relationship to prior work:

| Status | Meaning |
|---|---|
| **Established term** | Used with its recognised disciplinary meaning |
| **Adapted term** | Existing language deliberately applied in a narrower or different context |
| **Project shorthand** | Convenient internal wording without a claim of originality |
| **Proposed definition** | A precise END-specific meaning offered for criticism |
| **Possible prior overlap** | Similar work has been found; the relationship remains under review |
| **Retracted wording** | Earlier language proved misleading and has been replaced while its trail remains visible |

END does not claim ownership over every concept it connects. Any contribution lies in the proposed synthesis, the questions it makes examinable and the open method by which both may be corrected.

## Worked example: point, line and relational node

**Raw intuition:** A single pivot felt like the first dimension, and relations appeared to grow outward from it.

**Current mathematical correction:** In elementary geometry, a point is zero-dimensional. A line is one-dimensional because position along it requires one coordinate. This mathematical convention does not establish that a physical particle is literally a dimensionless END node.

**END refinement:** A node is an analytical distinction, not a claim about physical size or dimensionality. An edge represents a specified relation. A drawn point may stand for a person, atom, event, proposition or entire galaxy depending on the question's resolution.

**Remaining research question:** Under what formal conditions can higher-dimensional or spatial behaviour emerge from relational structure, and which existing graph, network, causal-set or quantum-gravity research already addresses that question?

**Lesson:** The correction changes the representation without making the originating curiosity worthless.

## Publication rule

Use a dated label such as:

> **Current Knowledge Snapshot — 3 September 2026**  
> This entry describes the evidence and terminology found during this review. It is neither timeless consensus nor final truth. Sources, counterarguments and later revisions remain attached.

A snapshot may be useful enough to guide present action while remaining eligible for challenge, demotion and supersession through the [Commons lifecycle](COMMONS-LIFECYCLE.md).
