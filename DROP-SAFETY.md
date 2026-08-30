# Drop Safety, Privacy and Publication Policy

> **Status:** `[SPEC]` contributor safety baseline. Automated scanning assists
> review but cannot certify a Drop as safe.

Anitelos welcomes informal, strange, unfinished and deeply personal thinking.
The purpose of review is not to sanitise unconventional ideas. It is to prevent
accidental exposure, harm to third parties and false elevation of raw material.

## 1. Separate Intellectual Risk from Operational Risk

These are usually **not** reasons to reject a Drop:

- unusual analogies or speculative philosophy;
- criticism, uncertainty or abandoned ideas;
- adult language between consenting adults where lawful and relevant;
- unpopular technical or political positions;
- imperfect grammar or emotional writing.

These require action before committing or publishing:

- passwords, API keys, tokens, cookies, private keys or session material;
- private third-party messages or identifying information without permission;
- medical, financial, family, child, legal or intimate information not intended for release;
- precise home/work locations, personal schedules or security-relevant routines;
- proprietary material, copyrighted dumps or datasets without redistribution rights;
- executable files, archives or documents from unknown/untrusted sources;
- claims whose status could be mistaken for implementation or verification.

Local paths, usernames and hardware details are context-dependent. They are not
automatically self-doxxing, but combinations of weak identifiers can assemble a
strong personal profile and should be reviewed deliberately.

## 2. Credentials Are Never Provenance

Do not commit active or historical secrets merely to preserve an “exact” raw
record. Revoke exposed credentials, remove them before the first commit where
possible, and record a transparent placeholder such as `[REDACTED_SECRET]`.

A private Git repository is not a credential vault. Deleted Git files may remain
in commit history, forks, caches, clones and backups.

## 3. Private Original and Public Derivative

Where a raw source contains publishable ideas mixed with private material:

```text
PRIVATE_ORIGINAL
    exact source; restricted storage; integrity hash

PUBLIC_DERIVATIVE
    reviewed copy; explicit redactions; link to private source ID/hash

REDACTION_LOG
    categories and reasons—not the removed secret values
```

The public copy must never pretend to be verbatim if it is redacted. The private
original must never be assumed publishable simply because it has provenance
value.

## 4. Required Pre-Commit Review

For every Drop:

1. Identify its intended visibility: `PRIVATE_RAW`, `PUBLIC_REVIEW_PENDING`, or `PUBLIC_RELEASED`.
2. Scan for secrets and personal identifiers without printing suspected values into logs.
3. Review third-party privacy, consent and redistribution rights.
4. Open archives only in a safe environment; do not execute included files.
5. Label knowledge status separately from publication status.
6. Record whether assistant-generated statements are present and unverified.
7. Create a public derivative when redaction is required.
8. Have a human approve public release.

## 5. Integrity and Time Claims

A content hash demonstrates that later bytes match the hashed bytes. A normal
Git commit records repository history but does not independently prove authorship,
priority or a trustworthy real-world creation time. Stronger claims require
independent evidence such as signed commits, trusted timestamping, preserved
platform exports or corroborating publication records.

## 6. Withdrawal, Redaction and “Archive, Don’t Delete”

“Archive, Don’t Delete” applies to the evolution of public knowledge and
decisions. It does **not** override:

- removal of secrets or malicious payloads;
- privacy, consent, safeguarding or legal obligations;
- a contributor’s request to withdraw personal raw material from public access;
- repository security and platform policy.

When safe, preserve a non-sensitive tombstone containing the node ID, reason
category, date and supersession/withdrawal relationship. Do not preserve the
harmful content merely to make the graph complete.

## 7. Scanner Limitations

`scripts/audit-drop.sh` reports coarse pattern counts without echoing suspected
values. A zero result means only that its limited patterns did not match. It
cannot detect every secret, identify contextual harm, establish consent or grant
redistribution rights.
