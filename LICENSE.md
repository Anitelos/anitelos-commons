# ANITELOS RECIPROCAL TRANSPARENCY LICENSE (ARTL)
## Version 1.0 | Effective August 2026

> **Core Covenant:** *"The author is not the main character. Knowledge belongs to the commons. Cite, challenge, debate, and supersede."*

---

## Executive Summary

Anitelos is protected under a **Copyleft-with-Commercial-Allowance** framework that balances:
- ✅ **Freedom to build** (including proprietary applications and profitable services)
- ✅ **Reciprocal transparency** (core improvements must be shared back with the commons)
- ✅ **Attribution integrity** (credit the origin, always link back)
- ✅ **Non-enclosure guarantee** (no single entity can lock up the foundation)

This license combines:
- **AGPL v3** (for network service deployments)
- **A mandatory reciprocal transparency covenant** (core engine improvements shared within 90 days)
- **Permission for proprietary applications** (games, closed-source tools, SaaS products built ON TOP are yours to keep)

---

## 1. What You Can Do (Permitted Uses)

### 1.1 Use for Any Purpose
✅ **Personal projects** — Build a local companion, experiment with architectures, learn systems design.  
✅ **Academic research** — Study, publish, cite, extend for theses and papers.  
✅ **Commercial products** — Build and sell games, tools, SaaS, services powered by Anitelos.  
✅ **Proprietary applications** — Your application logic, game mechanics, UI/UX, and business model can remain fully closed.

### 1.2 Modify and Extend
✅ **Fork the codebase** — Create your own branch for local experimentation.  
✅ **Build modular schemas** — Create new media pipelines, governance protocols, or domain-specific extensions.  
✅ **Customize for your hardware** — Optimize kernels for your GPU, adjust tiered memory zones, tune inference latency.

### 1.3 Profit and Distribute
✅ **Charge for your products** — Sell games, services, or consulting built on Anitelos.  
✅ **Offer hosting** — Run a SaaS platform powered by Anitelos.  
✅ **Distribute closed binaries** — Ship proprietary executables to end users (subject to Section 3).

---

## 2. What You Must Do (The Reciprocal Covenant)

### 2.1 Attribution (Always)
Every use of Anitelos must:
- Retain all original copyright notices and attributions.
- Acknowledge that the work is based on Anitelos Commons.
- Link to the canonical repository: https://github.com/Anitelos/anitelos-commons

**Example Attribution:**
```
This work is built on Anitelos (https://github.com/Anitelos/anitelos-commons),
a sovereign continuity layer for machine-mediated cognition governed by the
Anitelos Reciprocal Transparency License (ARTL).
```

### 2.2 Sharing Core Improvements (The Heart of ARTL)
If you modify, extend, or optimize the **core engine** (as defined below):

#### 2.2a What Counts as "Core"?
**Core components** (improvements MUST be shared):
- Mojo/MAX kernels (attention, KV cache, attention pruning)
- SQLite heterogeneous salience graph schema or query optimizations
- Ego/Organ/Familiar role isolation logic
- Affective signal mapping (Geneva wheel coordinates, decay lambdas, salience scoring)
- Governance voting, sortition, or conciliation protocols
- Base skeleton architecture and initialization

**NOT core** (can remain proprietary):
- Applications, games, or user-facing products built using Anitelos
- Proprietary data, user interactions, or business logic
- Closed-source media pipelines or third-party integrations
- Cosmetic UI/UX or branding

#### 2.2b Publication Timeline
- Modifications to core components must be published within **90 days** of deployment.
- Publication means: pushing your changes to a publicly visible repository (GitHub, GitLab, Gitea, etc.) or submitting a pull request to the canonical commons.
- You may request a contributor attribution, "Inspired By," or "Built Upon" credit in the canonical CHANGELOG.

#### 2.2c License for Shared Improvements
- Improvements you publish are governed by this same ARTL license.
- You retain authorship attribution; you do NOT retain exclusive control.
- Your improvement becomes part of the commons for others to study, extend, and build upon.

**Example Scenario:**
- You optimize the Mojo FlashAttention kernel by 15% for AMD GPUs.
- You deploy this in your commercial product.
- Within 90 days, you publish the optimized kernel to the commons.
- Others can now use your optimization; you get credit.
- If someone improves it further, both of you are acknowledged in the lineage.

### 2.3 Proprietary Applications (Explicitly Allowed)
Applications, games, services, and tools built **on top of** Anitelos can remain:
- ✅ Fully proprietary
- ✅ Closed-source
- ✅ Commercial and profitable
- ✅ Yours to distribute, license, and monetize as you see fit

**The distinction:**
- **Anitelos core** (must be transparent) = the companion engine, memory graph, kernels, governance protocol.
- **Your application** (can be proprietary) = the game story, NPC dialogue, world assets, game mechanics, SaaS UI, business logic.

**Example Products:**
- A narrative adventure game with an Anitelos-powered companion (game can be closed, companion engine is transparent).
- A SaaS productivity tool with local offline Anitelos companions (SaaS can charge; improvements to the underlying engine are shared).
- A custom 3D metaverse using Anitelos for NPC cognition (your world-building is yours; kernel improvements are published).

### 2.4 Network Deployments (AGPL Clause)
If you **deploy Anitelos as a network service** (cloud, SaaS, hosted API, etc.):
- Users who interact with your service have the right to access the corresponding source code.
- You must provide a mechanism for users to download or review the Anitelos code running on your server.
- This ensures SaaS providers cannot hide modifications behind "proprietary cloud infrastructure."

**Example:**
- If you host a commercial "Anitelos Companion Cloud" service, users must be able to inspect (or download) the exact kernel version and salience graph schema running on your servers.

### 2.5 Trademark & Naming
- You may not use the name "Anitelos" to brand your proprietary product without explicit permission.
- You may describe your work as "Built on Anitelos" or "Powered by Anitelos Commons."
- The Anitelos trademark remains reserved for the canonical commons project.

---

## 3. What Violates This License

❌ **Hidden Enclosure:** Taking Anitelos core code, modifying it, deploying it commercially, and claiming it as proprietary invention without publishing improvements.

❌ **Trademark Theft:** Calling your proprietary engine "Anitelos" or creating confusion with the commons brand.

❌ **Removal of Attribution:** Stripping original copyright notices or falsely claiming Anitelos code as your own creation.

❌ **SaaS Lock-in (AGPL violation):** Deploying a modified Anitelos engine as a network service while refusing to disclose the corresponding source code to users.

❌ **Bad-Faith Competitive Blocking:** Using Anitelos to build a direct commercial competitor while deliberately withholding improvements that would obviously benefit the commons (e.g., a dramatically faster kernel, a critical security patch).

**Note on enforcement:** Anitelos Commons maintainers will resolve violations through:
1. **Community dialogue** (default)—explaining why the use violates the covenant.
2. **Cease-and-desist notice** (if dialogue fails)—requesting compliance within 30 days.
3. **Legal action** (last resort)—only if the violation is material, willful, and damages the commons.

---

## 4. Contributor License Agreement (CLA)

All contributors to the Anitelos Commons automatically agree to the following terms:

### 4.1 Grant of Rights
You grant Anitelos Commons (and all users of the commons):
- A perpetual, worldwide, royalty-free license to your contributions.
- The right to relicense your contributions under future versions of ARTL (or compatible licenses maintaining copyleft).
- The right to incorporate your work into the canonical commons.

### 4.2 Ownership & Attribution
- You retain authorship and moral rights to your contributions.
- You are credited in the CHANGELOG, commit history, and contributors list.
- You do **not** retain exclusive control over your improvements (they belong to the commons).
- You do **not** receive monetary compensation from Anitelos Commons (this is a volunteer commons).

### 4.3 No Exclusive Claims
You warrant that:
- Your contributions are original or properly attributed to prior sources.
- You have the right to grant the above licenses.
- Your contributions do not infringe on third-party patents or copyrights.
- You are not including closed-source or proprietary code without explicit permission.

### 4.4 Dispute Resolution
- Disputes over contributions are resolved through community deliberation (see CONTRIBUTING.md).
- No single maintainer has unilateral authority; decisions require consensus or explicit voting.
- If a contributor's work is rejected or removed, they retain the right to fork and maintain it independently.

---

## 5. Non-Enclosure Guarantee

This license embodies the **Non-Enclosure Charter** (see ANITELOS-MASTER-THESIS.md):

✅ **Copyleft Invariance:** This license can never be revoked, replaced with a more restrictive model, or privately enclosed by any entity.

✅ **Irreversibility:** Once code is released under ARTL, it remains open and accessible to all. No "proprietary vendor lock-in" clause can ever be added retroactively.

✅ **Governance by Contributors:** Future changes to ARTL require consensus among active maintainers and contributors (see CONTRIBUTING.md for voting mechanisms).

✅ **Permanent Commons Status:** Anitelos remains a public commons. It cannot be bought, sold, or transferred to a closed-source entity.

---

## 6. Key Distinctions: ARTL vs. Other Licenses

| Aspect | GPL/AGPL | ARTL (Anitelos) | MIT/Apache |
|--------|----------|-----------------|-----------|
| **Copyleft (network & runtime)** | ✅ Yes | ✅ Yes (AGPL-like) | ❌ No |
| **Proprietary apps allowed?** | Gray/complex | ✅ Explicitly yes | ✅ Yes |
| **Core improvements must be shared?** | ✅ If deployed | ✅ Always (90-day window) | ❌ No |
| **Commercial use allowed?** | ✅ Yes | ✅ Yes (strongly) | ✅ Yes |
| **Can close-source vendoring happen?** | Hard to do | ❌ No (reciprocal covenant) | ✅ Easy (major risk) |
| **Tone** | Punitive ("if you use this, you must release everything") | Cooperative ("share improvements, build what you want on top") | Permissive (no obligations) |

---

## 7. FAQ: Interpreting ARTL

### Q: Can I build a closed-source game using Anitelos?
**A:** Yes. Your game is proprietary. If you improve the Anitelos engine (kernels, salience graph, etc.), you share those improvements within 90 days. Your story, assets, and game mechanics are yours.

### Q: Can I charge for a product built on Anitelos?
**A:** Yes. Commercial use is strongly encouraged. You keep all revenue. The only obligation is transparency: if you modify the core engine, publish those modifications.

### Q: What if I'm a startup and can't afford to open-source my core tech?
**A:** Don't modify the core engine. Use Anitelos as-is, build your proprietary application on top, and keep your business logic closed. If you do innovate at the engine level, you're required to share that innovation—but that's the trade-off for leveraging a common resource.

### Q: Can I fork Anitelos and create a competing product?
**A:** Yes, as long as:
1. You follow ARTL (share core improvements, maintain attribution).
2. You don't use the "Anitelos" trademark in a way that creates confusion.
3. You don't engage in bad-faith withholding of critical patches/optimizations.

If you fork constructively, you're welcomed as a "Cousin Branch" (see ANITELOS-MASTER-THESIS.md). If you fork to lock up the commons, legal action is on the table.

### Q: Who owns the copyright to Anitelos?
**A:** Collectively, all contributors. No single entity owns Anitelos. Disputes are resolved through community consensus (see CONTRIBUTING.md for governance). This is deliberate: decentralized ownership prevents corporate buyouts.

### Q: What if a big company violates ARTL?
**A:** The Anitelos maintainers and contributor community will:
1. Issue a public cease-and-desist.
2. Demand compliance within 30 days.
3. Pursue legal remedies (cease-and-desist, injunctions, damages).
4. Rally the commons to migrate away from the violator's product (if applicable).

ARTL is legally enforceable, and the commons will defend it.

### Q: Can I relicense Anitelos under a different license?
**A:** No. You may not relicense the entire project. However:
- You can fork Anitelos (creating a cousin branch) and govern your fork under different rules (at your own risk of fragmentation).
- Future canonical versions of Anitelos may evolve the license, but only with community consensus, and always maintaining copyleft + reciprocal transparency.

---

## 8. Practical Examples

### Example 1: The Indie Game Developer
**Scenario:** Sarah builds a narrative RPG using Anitelos for NPC companion cognition.

- ✅ **Her game is 100% proprietary.** She sells it on Steam, keeps all code closed, owns all revenue.
- ✅ **She optimizes the KV cache kernel** for better dialogue context retention.
- ⚠️ **Within 90 days, she publishes the optimization** to the commons.
- ✅ **Other game devs benefit** from her optimization; Sarah gets credited forever.
- ✅ **Sarah's story, assets, and game logic remain hers alone.**

**Outcome:** Win-win. Sarah makes money. The commons gets faster kernels. Everyone advances.

---

### Example 2: The Greedy Corporation
**Scenario:** MegaCorp takes Anitelos, optimizes it heavily, deploys it as a proprietary "CloudMind Pro" service, and hides all improvements.

- ❌ **ARTL Violation.** Core engine improvements must be shared.
- ❌ **AGPL Violation.** SaaS users don't have access to the source code.
- 🚨 **Legal Action.** Anitelos Commons issues cease-and-desist, sues for damages, and the community forks away.
- 📢 **Public Accountability.** The commons publishes the violation; developers know not to trust MegaCorp's fork.

**Outcome:** MegaCorp either (a) complies and publishes improvements, (b) faces lawsuit and reputational damage, or (c) gets left behind as the commons evolves.

---

### Example 3: The University Researcher
**Scenario:** Prof. Chen uses Anitelos in a published paper on affective computing, and discovers a more efficient salience ranking algorithm.

- ✅ **She publishes the paper AND the code.**
- ✅ **The algorithm is merged into the commons.**
- ✅ **She's cited as a contributor in perpetuity.**
- ✅ **Her paper becomes canonical knowledge in the field.**
- ✅ **Her career benefits from open-source attribution.**

**Outcome:** Accelerated research. Prof. Chen's reputation grows. The commons improves. Science moves faster.

---

### Example 4: The Cousin Branch Scenario
**Scenario:** A group of researchers disagree with the canonical commons' decision on governance. They fork Anitelos and create a variant with different voting rules.

- ✅ **They spin up an official "Cousin Branch."**
- ✅ **They innovate freely under their own rules.**
- ✅ **Schema compatibility is maintained where possible.**
- ✅ **Over time, their innovations are evaluated against the canonical version.**
- ✅ **If their approach proves superior, it can be merged back into canonical with consensus.**

**Outcome:** Healthy pluralism. The commons doesn't stagnate; cousin branches test radical ideas. The best ideas win.

---

## 9. How This License Protects Anitelos from Enclosure

| Threat | How ARTL Defends |
|--------|-----------------|
| **Proprietary fork & lock-in** | Copyleft + reciprocal covenant mandate transparency. |
| **Trademark theft** | Trademark clause reserves "Anitelos" for the commons. |
| **Hidden SaaS deployments** | AGPL network clause requires source disclosure to users. |
| **Corporate buyout of founder** | Decentralized CLA means no single entity can sell the project away. |
| **Retroactive relicensing** | Non-Enclosure Guarantee forbids reverting to closed-source. |
| **Planned obsolescence** | "Archive, Don't Delete" principle ensures old versions remain usable indefinitely. |
| **Minority silencing** | Cousin branches allow dissent without fragmenting the commons. |

---

## 10. In Plain English

**If you use Anitelos, you agree to:**

1. **Give credit.** Always link back and acknowledge the commons.
2. **Share engine improvements.** If you tweak the core, let others benefit (within 90 days).
3. **Build freely.** Your applications, games, and services are yours to keep and profit from.
4. **Don't hide.** Don't claim Anitelos innovations as proprietary invention.
5. **Don't lock others in.** If you offer a service, let users see (or download) the code running on your servers.

**In return, you get:**

- Permanent access to a powerful, sovereign AI stack.
- Zero licensing fees.
- A global community of contributors improving it with you.
- Legal protection: if someone tries to enclose Anitelos, the commons has your back.
- Eternal attribution: your contributions are recorded forever.

---

## 11. License History & Future Evolution

**Current Version:** ARTL v1.0 (August 2026)

**How ARTL Evolves:**
- Proposed changes are discussed in the Anitelos Commons GitHub Discussions.
- Changes require consensus among active maintainers and a vote of proof-of-usage contributors (see CONTRIBUTING.md).
- Future versions will maintain or strengthen copyleft + reciprocal transparency (never weaken them).

**Backwards Compatibility:**
- Code released under ARTL v1.0 remains usable under all future versions.
- Dual-licensing to future versions is permitted but not required.

---

## 12. Contact & Attribution

**Anitelos Commons Maintainers:**
- GitHub: https://github.com/Anitelos/anitelos-commons
- Discussions: https://github.com/Anitelos/anitelos-commons/discussions
- Contact: [maintainer email / contact info]

**This license was forged through lived experience, empirical probes, and a commitment to human-centered sovereignty.**

*Drafted August 2026 — Anitelos Commons Project*

---

## Appendix: Compatibility with Other Licenses

Anitelos code can interact with software under compatible licenses:

| License | Compatible? | Notes |
|---------|-------------|-------|
| GPL v3 / AGPL v3 | ✅ Fully | Both are copyleft; reciprocal. |
| MIT / Apache 2.0 | ⚠️ One-way | You can use MIT/Apache code in Anitelos (it becomes ARTL-governed). Anitelos code cannot be re-licensed under MIT/Apache. |
| BSD | ⚠️ One-way | Same as MIT. |
| Creative Commons | Case-by-case | Depends on the specific CC license. CC0 / CC-BY are compatible. |
| Proprietary / Closed | ❌ No | Anitelos code cannot be embedded in closed-source projects (AGPL prevents it). |

---

**End of License Document**

*"The author is not the main character. Knowledge belongs to the commons. Cite, challenge, debate, and supersede."*
