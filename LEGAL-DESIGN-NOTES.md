# Legal Design Notes & Non-Adversarial Data Guarantees

> **Status:** Exploratory Legal Design Intent & Non-Binding Architectural Philosophy.

---

## 1. The Anti-Detriment Data Principle

Conventional big-tech platforms (such as Microsoft Outlook, Google Workspace, and social media platforms) operate on **Adversarial Data Capture**:
- User actions, text streams, and usage patterns are harvested to build behavioral dossiers.
- This data is frequently deployed **to the user's direct detriment** (e.g. targeted ad price discrimination, corporate monetization without compensation, or algorithmic lock-in).

Anitelos establishes the **Non-Adversarial Data Invariant**:

$$\text{Data Utility} = \text{App Reliability} + \text{Community Hardware Coverage} - \text{Adversarial Exploitation}$$

1. **Normative Non-Exploitation:** Anitelos-compatible telemetry MUST NOT intentionally be used for advertising, behavioural profiling, user tracking, or sale to third-party data brokers.
2. **Sovereign Machine Boundary:** The intended architecture keeps prompts, local SQLite vaults, personal knowledge graphs, and private chat histories local unless a user explicitly exports selected material.
3. **Inspectable Payload Specification:** `[SPEC]` Voluntary telemetry uses an explicit allowlist of plain JSON diagnostic counters and provides a preview before submission. No telemetry client or verification suite is implemented in this repository yet.

---

## 2. Reciprocal Copyleft & Non-Enclosure

* **GNU AGPLv3 Core Intent:** Declared covered core components are intended to use GNU AGPLv3 according to its actual terms. Exact derivative-work and distribution questions require qualified legal review.
* **Non-Enclosure Covenant:** Records the project's ethical expectation; it does not independently create licence restrictions.
* **Commercial Freedom:** Commercial use is intended to remain possible subject to each component's declared licence.
