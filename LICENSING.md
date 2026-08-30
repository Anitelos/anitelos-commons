# Anitelos Licensing Boundaries

> **Status:** Initial policy for a documentation-first repository. Obtain
> qualified open-source/IP legal review before public release or before relying
> on these notes for a commercial distribution decision.

## Current Snapshot

The repository currently contains foundational documentation and empty
implementation placeholders. The root `LICENSE` contains GNU AGPLv3, but the
presence of that file alone does not clearly communicate the intended licence
for every future artifact.

Until component-specific notices are added:

- no file should claim that an absent implementation is already AGPL-covered;
- no schema or creative module should claim Apache-2.0 or MIT merely because the
  thesis describes those as possible future choices;
- contributors should not add copied legacy code until its ownership,
  dependencies and compatible licensing are checked.

## Intended Boundaries

| Material | Intended licence | Required before distribution |
| :--- | :--- | :--- |
| Anitelos reference core engine and kernels | GNU AGPLv3 | Source headers/notices and a declared directory boundary |
| Separately distributed public schemas | Apache-2.0 or MIT, chosen explicitly | Matching licence file and SPDX identifier |
| Separately distributed creative/user modules | Chosen by their author, subject to dependencies | Module-level licence declaration |
| Documentation | Not yet resolved | Select and declare a documentation licence |
| Commons Covenant | Ethical/social commitment | Keep distinct from enforceable software licence terms |
| Legal Design Notes | Non-binding research | Legal review before stronger claims |

## Legacy Anikai Material

Anikai/Media Magic files may come from a separate local repository and older
remote account. Before importing them, record:

1. original path, branch/tag and available commit identifier;
2. date range and author/ownership information;
3. third-party dependencies, models and assets;
4. original licence notices;
5. whether the material is source evidence, an executable probe, or reusable code.

Legacy provenance can be archived without automatically relicensing every
contained dependency or third-party asset.
