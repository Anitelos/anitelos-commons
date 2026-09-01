# Anitelos Ecosystem: Repository & Unified Subtree Specification

> **Purpose:** Defines both the real multi-repository Anitelos ecosystem and the
> optional unified checkout used to develop its components together.
>
> **Status:** `[SPEC]`. The four repositories exist. The Harness, Cosmic Wiki and
> Node Library are implementation scaffolds; repository creation and a place in
> this target tree do not mean their proposed mechanisms are implemented.

---

## 1. Canonical repositories

| Repository | Canonical responsibility | Default licence |
| :--- | :--- | :--- |
| `anitelos-commons` | The Painted Porch, governance, theory, shared schemas, protocols and cross-ecosystem specifications | CC BY-SA 4.0 prose/diagrams; Apache-2.0 schemas/protocols |
| `anitelos-harness` | Proposed local execution, update inspection, freeze and rollback reference implementation | AGPL-3.0-only |
| `anitelos-cosmic-wiki` | Proposed interface for local/public nodes, edges, provenance and knowledge states | AGPL-3.0-only |
| `anitelos-node-library` | Proposed privacy-minimised aggregate, manifest and permitted edge-exchange reference layer | AGPL-3.0-only code; aggregate data licence unresolved |

Each repository remains independently cloneable and keeps its own history and
licence boundary. A unified checkout does not merge those legal boundaries.

---

## 2. Unified checkout target

```text
anitelos / Anikai-Evolution /
├── README.md
├── PROMPT-ZERO.md
├── COMMONS-COVENANT.md
├── GOVERNANCE.md
├── CONTRIBUTING.md
├── LICENSING.md
│
├── painted-porch/                 # THE HUMAN COMMONS GATHERING LAYER
│   ├── README.md                  # Purpose, participation and safety boundary
│   ├── drops/                     # Raw thoughts, observations and analogies
│   ├── questions/                 # [PLANNED] Open and resolved inquiries
│   ├── discussions/               # [PLANNED] Durable deliberation records
│   ├── proposals/                 # [PLANNED] Open/accepted/rejected RFC records
│   ├── knowledge/                 # [PLANNED] Current adopted Commons states
│   ├── archive/                   # [PLANNED] Safe superseded/provenance records
│   └── indexes/                   # [PLANNED] Topics, unresolved and supersession maps
│
├── schemas/                       # Apache-2.0 shared formats
├── protocols/                     # Apache-2.0 interoperability specifications
├── docs/                          # Theory and cross-ecosystem specifications
├── idea-ingest/                   # [PLANNED] Research/provenance work inside Commons
├── experiments/                   # [PLANNED] Evidence and reproducible probes
│
├── harness/                       # SUBTREE: anitelos-harness
├── cosmic-wiki/                   # SUBTREE: anitelos-cosmic-wiki
└── node-library/                  # SUBTREE: anitelos-node-library
```

The current `anitelos-commons` repository contains only paths actually committed
to it. Planned directories shown above should be created when they receive real
content, rather than populated with empty placeholders.

**The Painted Porch** is the named gathering place of the Commons. Its subfolders
record how human contributions move from Drops and questions through discussion,
proposal, decision and later revision. It is not a separate authority and is not
evidence that a dedicated discussion platform exists.

---

## 3. Subtree boundaries

### `harness/` — proposed local execution harness

- Canonical source: `Anitelos/anitelos-harness`.
- Intended scope: local model/organ coordination, inspectable updates,
  compatibility checks, freeze and rollback.
- Private user knowledge remains outside the shared repository and is not
  published merely because the Harness processes it.

### `cosmic-wiki/` — proposed knowledge interface

- Canonical source: `Anitelos/anitelos-cosmic-wiki`.
- Intended scope: navigation of local and public nodes, typed edges, provenance
  and declared knowledge states.
- Local/private and public Commons views must remain visibly distinct.

### `node-library/` — proposed aggregate and exchange layer

- Canonical source: `Anitelos/anitelos-node-library`.
- Intended scope: privacy-minimised function-use aggregates, public manifests
  and permitted graph-edge exchange.
- Raw prompts, chats, private nodes, exact paths and directly identifying event
  rows are outside the intended public boundary.
- No dataset licence or claim of legal anonymity has yet been adopted.

---

## 4. Integration rules

1. The three implementation repositories remain canonical for their own code.
2. A unified checkout may import them as Git subtrees at the matching prefixes.
3. Subtree imports must preserve upstream licence files and attribution.
4. Changes intended for an implementation repository should be returned to its
   canonical history rather than existing only in a combined checkout.
5. Shared schemas and protocols remain in `anitelos-commons` unless a recorded
   Commons proposal changes that boundary.
6. `idea-ingest/` and `experiments/` remain Commons areas until scale or
   implementation creates a genuine reason for separate repositories.

Illustrative commands—not an assertion that a subtree has already been imported:

```bash
git subtree add --prefix=harness https://github.com/Anitelos/anitelos-harness.git main --squash
git subtree add --prefix=cosmic-wiki https://github.com/Anitelos/anitelos-cosmic-wiki.git main --squash
git subtree add --prefix=node-library https://github.com/Anitelos/anitelos-node-library.git main --squash
```

Whether to retain full imported history or use `--squash` is an operational
choice that should be recorded when the first integration occurs.

---

## 5. Governance across repositories

- The founder currently acts as direct maintainer; this is a starting condition,
  not permanent authority.
- Work enters shared Anitelos governance when proposed as a canonical component,
  shared baseline or distributed update.
- Affected use creates standing to be heard, not automatic linear voting power.
- AI may surface contradictions, inspect patches and run declared tests, but
  humans retain binding authority under the current governance specification.
- Emergency labels do not permit automatic self-merge.
