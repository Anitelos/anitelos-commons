# Legacy Anikai Work — Intake Area

> **Status:** `[LEGACY-EVIDENCE / NOT YET INGESTED]`

This directory is reserved for local Anikai/Media Magic archives that predate
or informed Anitelos. The old remote account is currently inaccessible; local
files remain acceptable provenance sources.

Do not treat a ZIP placed here as current Anitelos implementation merely because
it contains related ideas or historical probes.

For each drop, preserve:

```text
legacy-anikai/<date-or-period>-<short-name>/
├── SOURCE.zip              # unchanged source archive where practical
├── MANIFEST.yaml           # provenance, hashes, ownership, licence notes
├── OVERVIEW.md             # what this archive demonstrates
├── EVIDENCE.md             # commands, logs, screenshots and limitations
└── EDGES.yaml              # links to present claims, specs and experiments
```

Minimum manifest fields:

```yaml
drop_id: pending
source_workspace: local-anikai
source_account: unverified-old-account
remote_accessible: false
date_range: unknown
branches_or_tags: []
commit_ids: []
content_hash: pending
author_assertion: Jay
licence_review: required
status: LEGACY_EVIDENCE
```

Replace `unknown`, empty lists and `pending` only from preserved evidence. Never
invent missing commit history to make the archive look complete.

## Preserved Drops

| Drop | Status | Contents reviewed |
| :--- | :--- | :--- |
| [`android-windows-beginning-times/`](android-windows-beginning-times/) | `LEGACY_EVIDENCE` | No |
| [`pre-evolution/`](pre-evolution/) | `LEGACY_EVIDENCE` | No |
| [`evolution-pre-anitelos/`](evolution-pre-anitelos/) | `LEGACY_EVIDENCE` | No |
