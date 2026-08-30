# Anitelos & Anikai-Evolution: Unified Monorepo & Subtree Specification

> **Purpose:** Defines the structural layout of the Anitelos ecosystem monorepo (`anitelos` / `Anikai-Evolution`), cleanly decoupling collaborative commons, subtrees, execution harnesses, and research ingest labs.
>
> **Status:** `[SPEC]` target layout. Paths shown below may be placeholders or
> planned files. Consult `README.md` → **ANITELOS TODAY** for the contents of the
> current snapshot.

---

## 1. Unified Monorepo Tree Layout

```
anitelos / Anikai-Evolution /
├── README.md                      # Prompt Zero + Unified Architecture Overview
├── PROMPT-ZERO.md                 # Fast query bypass for reader's local companion
├── COMMONS-COVENANT.md            # Non-Enclosure, Reciprocity & Anti-Asymmetric Enclosure
├── GOVERNANCE.md                  # Staged progression: Founder -> Community -> Bicameral
├── CONTRIBUTING.md                # Drops, RFC formats & security jury audit rules
│
├── commons/                       # THE COLLABORATIVE COMMONS LAYER
│   ├── drops/                     # Raw thoughts, intuitions, and analogies (indexed by 2026/)
│   ├── questions/                 # Open and resolved conceptual inquiries (open/, resolved/)
│   ├── discussions/               # Active technical discourse & debates (active/)
│   ├── proposals/                 # RFCs (open/, accepted/, rejected/)
│   ├── knowledge/                 # Ratified schemas & master specifications (current/)
│   ├── archive/                   # Superseded proposals & raw chat provenance (superseded/, raw/)
│   └── indexes/                   # Living cross-reference registries (topics.md, unresolved.md, supersession-map.md)
│
├── harness/                       # SUBTREE 1: THE LOCAL NEURAL HARNESS
│   ├── README.md                  # Ego/Organ KV isolation & execution specs
│   ├── src/                       # Mojo/MAX/Python bare-metal execution passes
│   └── adapters/                  # Multi-adapter stubs (llama, vLLM, SGLang, Modular)
│
├── cosmic-wiki/                   # SUBTREE 2: THE INTERACTIVE GRAPH INTERFACE
│   ├── README.md                  # Visual knowledge graph & scrape explorer (Port :3847)
│   ├── web/                       # HTMX / frontend UI
│   └── scraper/                   # Document & paper extraction leaves (Port :3851)
│
├── node-library/                  # SUBTREE 3: THE COSMIC NODE LIBRARY
│   ├── manifests/                 # Public node schemas & community capabilities
│   ├── graph-edges/               # Public provenance & relationship definitions
│   └── telemetry-aggregates/      # Anonymous function usage evidence
│
├── idea-ingest/                   # THE OPEN RESEARCH LAB & PROVENANCE ENGINE
│   ├── _physics-card.md           # North stars & core invariants for outside auditors
│   ├── README.md                  # Ingest charter: Weave & Demote, Research Mandate
│   ├── AUDITOR_PROMPT.md          # Copy-paste prompt for outside AI auditors
│   └── v1/                        # Dated versions (sources/, evolved/)
│
├── docs/                          # Core Architectural Specifications
│   ├── ANITELOS-MASTER-THESIS.md  # 73KB Master Thesis & 4-Layer Epistemic Framework
│   ├── COMMONS-LIFECYCLE.md       # 7-Stage Knowledge Lifecycle & Reconsider-If Framework
│   ├── GOVERNANCE-AUDIT-GRAPH.md  # Deep Node Linkage & Capability Sandboxing
│   └── SUBTREE-MONOREPO-SPEC.md   # Monorepo architecture & subtree layout (this spec)
│
└── experiments/                   # Code Probes & Reference Implementations
    ├── kv-surgery-probe/          # Mojo/Python minimal memory test
    └── colibri-probe/             # Custom runtime probe
```

---

## 2. Core Subtree Descriptions

### Subtree 1: `harness/` (The Proposed Local Neural Harness)
- **Role:** Bare-metal execution layer for LLM inference, dynamic KV cache surgery, and residual attention steering.
- **Key Invariants:** Protects the central Ego's pinned KV cache slot from being thrashing by background Organ workers or temporary tool calls.

### Subtree 2: `cosmic-wiki/` (The Proposed Interactive Knowledge Graph & Scraper)
- **Role:** Local-first SQLite graph visualizer (`data/verse.sqlite`) and live paper/video transcript scraper.
- **Proposed profile:** Candidate development ports are `:3847` (UI) and `:3851` (scraper). A future local-first implementation should permit browsing notes, claims and Drops without automatically transmitting the personal vault.

### Subtree 3: `node-library/` (The Proposed Cosmic Node Library)
- **Role:** Registry of community manifests, public component schemas, IKEA assembly blueprints, and anonymous telemetry aggregates.
- **Key Invariants:** Tracks representation and environmental coverage (e.g. Linux, AMD ROCm, integrated APUs) alongside execution volume.

---

## 3. Staged Governance Progression

1. **Founder Stage (Day 0):** Managed directly from your contributor account (`Anitelos` / `shinobistormjb-tech`) to maintain development velocity.
2. **Growing Commons Stage:**
   - AI acts as the **Cosmic Librarian** (flagging duplicates, surfacing contradictions, checking AST invariants), but **cannot self-merge**.
   - Routine updates require Proof-of-Usage evidence from nodes running that subtree.
3. **Emergency / Critical Patch Guard:**
   - `[SPEC]` A patch marked “Critical” should receive independent human review supported by advisory automated checks. Selection, anti-capture properties and audit procedures remain open research.
