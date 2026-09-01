# Anitelos Licensing Boundaries

> **Status:** Initial multi-licence policy for a documentation-first repository.
> Obtain qualified open-source, copyright and database-rights review before
> commercial reliance or enforcement.

## Controlling rule

Anitelos uses established licences with explicit component boundaries. The
presence of a licence text in `LICENSES/` does not apply that licence to every
file. Apply the most specific valid notice in this order:

1. file-level SPDX identifier or notice;
2. nearest directory `LICENSE` or licence notice;
3. repository-level boundary declared in this document.

Third-party material retains its original terms. No contributor can relicense
rights they do not own.

## Current `anitelos-commons` boundary

| Material | Licence | Notes |
| :--- | :--- | :--- |
| Original prose and diagrams in `docs/`, `painted-porch/`, root Markdown policy files and the future END Theory | **CC BY-SA 4.0** | Commercial reuse is allowed; shared adaptations must use compatible ShareAlike terms and preserve attribution. |
| Original schemas and protocol definitions in `schemas/` and `protocols/` | **Apache-2.0** | Chosen to allow independent interoperable implementations. |
| Reference software introduced to explicitly marked code directories | **AGPL-3.0-only** unless that directory states otherwise | No absent implementation is claimed to be AGPL-covered. |
| Commons Covenant | Ethical/social commitment | Distinct from enforceable licence conditions. |
| Legal Design Notes | Non-binding research | Not legal advice or a substitute for review. |
| Third-party quotations, images, papers, code, models and assets | Their existing terms | Must be identified; inclusion does not relicense them. |
| Private user knowledge, prompts, local graphs and raw diagnostics | **Not project-licensed** | Rights remain with the relevant user/rights-holder. Never public merely because an Anitelos tool processed them. |

The canonical licence texts are stored in [`LICENSES/`](LICENSES/).

## Ecosystem repository defaults

| Repository | Default for original implementation | Other material |
| :--- | :--- | :--- |
| `anitelos-harness` | AGPL-3.0-only | Bundled Apache schemas and CC documentation retain their declared licences. |
| `anitelos-cosmic-wiki` | AGPL-3.0-only | Wiki application code is software; Commons prose displayed by it retains CC BY-SA where applicable. |
| `anitelos-node-library` | AGPL-3.0-only | Public aggregate data requires a separate declared data licence after privacy/database-right review. |

AGPL Section 13 concerns modified covered software offered for remote network
interaction. It does not make every independent service, dataset, schema user or
separate program part of the covered work merely because it interoperates.

## Schema contribution rule

A contribution made directly to `schemas/` or `protocols/` is accepted under
Apache-2.0. Code that parses, validates, transports or executes a schema follows
the licence of the code directory or repository containing that implementation.

Apache-2.0 interoperability is a deliberate Commons decision, not permission to
misrepresent compatibility, endorsement or provenance.

## Data and telemetry are not software

An open-source client does not make collected data open, anonymous or safe.
The future Node Library must separately define:

- the licence for released aggregate datasets;
- contributor authority to submit the underlying data;
- client-side minimisation and preview;
- server-side field allow-lists and validation;
- aggregation thresholds and rare-configuration protection;
- retention, withdrawal and re-identification testing.

No raw prompt, chat, private node, exact path, username or directly identifying
event row is intended for the public Node Library. Pseudonymisation is a
risk-reduction measure, not a guarantee that information is anonymous.

## Contribution certification

By intentionally contributing material for inclusion, a contributor must have
authority to submit it and agrees that the contribution may be distributed
under the licence declared for its target path. Sign-off records this
certification; it does not prove ownership, privacy compliance or factual truth.

## Legacy Anikai material

Before importing Anikai/Media Magic material, record:

1. original path, branch/tag and available commit identifier;
2. date range and author/ownership information;
3. third-party dependencies, models and assets;
4. original licence notices;
5. whether the material is source evidence, an executable probe or reusable code.

Legacy provenance can be archived without automatically relicensing every
contained dependency or third-party asset.
