# Charity claims review

Reviewed: 27 October 2026 (Australia/Sydney).

## Evidence and limits

Baseline: [`84866ac189dc90ee43bd8a7d1715c6535f41bb0d`](https://github.com/TrueRootsPtyLtd/WEB/commit/84866ac189dc90ee43bd8a7d1715c6535f41bb0d).
The current main branch has one commit, timestamped 14 February 2026 at 23:07:55 UTC (15 February in Sydney). Its complete, non-truncated tree contains six files: two HTML pages, two JavaScript files and two stylesheets. All six were inspected. There are no reports, datasets, program records, calculation sources or registration documents in that tree, and no AGENTS.md or automated test configuration. The issues and pull-request collections were empty before this proposed change.

Repository metadata reports `has_pages: false` and no homepage; the tree contains no deployment workflows. This does not establish whether another service hosts the site, nor whether it is a demonstration. No deployment or demonstration status is assumed by the replacement wording. The legal identity, registration and actual impact were not independently verified. Missing repository evidence means these claims are unsupported here, not proven false.

## Claims requiring verification

Source links below are pinned to the reviewed commit so line references remain stable.

| Original claim | Repository evidence | Proposed treatment | Evidence needed before restoring |
| --- | --- | --- | --- |
| 15,000+ individuals supported ([root page, line 204](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L204)) | Hard-coded number only; no reporting period or beneficiary records. | Retain the card and category; replace the number with “Not verified.” | Dated, attributable beneficiary totals with reporting period, definition of support and deduplication method. |
| 50+ community programs ([line 208](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L208)) | Hard-coded number only; no program inventory. | Same explicit verification placeholder. | Dated program register, counting rules, delivery status and reporting period. |
| 2,000+ hectares protected ([line 212](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L212)) | Hard-coded number only; no land records or definition of protection. | Same explicit verification placeholder. | Site/area records, measurement method, definition and duration of protection, attribution and checks for overlapping areas. |
| Australian charity in the title; Australian Registered Charity with ABN “[Your ABN]” ([line 6](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L6), [line 222](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L222)) | Assertion and placeholder only; no actual ABN or registration record. | Use a neutral page title and “Charity registration and ABN details require verification.” | Exact legal entity and ABN matched to current official ABN and ACNC records, with source links and date checked. Verify charity registration separately from the existence of an ABN. |
| Non-profit status ([second page, line 38](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/look-up-foundation/index.html#L38)) | Copy only; no governing or status documents. | Describe aims; state that non-profit status and charity registration require verification. | Governing documents and relevant official records identifying the same entity. |
| Resources, training, programs and environmental protection presented as delivered activities ([root lines 190–194](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/index.html#L190), [second page, programs](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/look-up-foundation/index.html#L43)) | Descriptions only; no delivery records. | Frame these as aims and areas of focus. | Dated activity records and evidence of delivery and attribution. |
| Donation amount divided by 10 predicts native trees planted ([second-page script, lines 5–8](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/look-up-foundation/script.js#L5)) | Script calls this a simulation but visitors see a numerical impact claim; no cost model. | Remove the formula and show that estimates are unavailable without a documented method. | Sourced cost model, assumptions, scope, date, uncertainty and a clear explanation that any approved estimate is not a delivered outcome. |
| “Thank you for your donation” ([script, line 5](https://github.com/TrueRootsPtyLtd/WEB/blob/84866ac189dc90ee43bd8a7d1715c6535f41bb0d/look-up-foundation/script.js#L5)) | Handler prevents submission and only changes browser text; no payment integration in the repository. | Label the control “Check Amount,” confirm only the amount entered, and explain that the form does not process payments. | A separately reviewed payment integration and verified transaction result before claiming payment success. |

## Change boundaries and remaining checks

The existing colours, CSS, responsive rules, cards, section IDs, links and controls are retained. No replacement impact numbers, legal identifiers, tax-deductibility claims, payment integrations or deployment configuration are introduced. No claim is made that registration is pending or that the organisation is a demo.

The retained “Look Up Foundation Ltd” name, contact details and mission/brand language are not verified by this review. Confirm the entity name and contact details before publication. Existing donation links are placeholders (`#` on the root page and an in-page link on the second page). They are not evidence of a functioning donation service. The existing bare-`#` smooth-scroll error was corrected in the 30 October follow-up; see [NAVIGATION_REVIEW.md](NAVIGATION_REVIEW.md) for tests, remaining issues and browser-testing limits.

## Initial claims-change validation (27 October)

- JavaScript syntax check passed.
- Original HTML elements and attributes compared, allowing only added explanatory paragraphs and the status accessibility attribute; existing layout classes, IDs, links and controls were retained.
- Root inline CSS and all stylesheet files are unchanged; unrelated root JavaScript is unchanged.
- Removed figures, registration assertion and ABN placeholder are absent from both updated HTML pages.
- Donation handler exercised with amounts 1, 10, 100, 0, -1 and empty input using a Node VM DOM stub. It prevents submission, shows only amount-entry confirmation for positive amounts, and never produces a tree estimate or payment-success message.
- Browser rendering was attempted with Playwright but could not run because its Chromium executable is not installed. Desktop and mobile visual review remains outstanding.

This is a proposal for review. Main has not been changed, and no deployment has been requested or performed. Obtain the owner's approval before deployment.

