# Navigation follow-up

Reviewed: 30 October 2026 (Australia/Sydney).

## Correction

Follow-up to draft PR #1, based on head commit
`1776e91c60b3ea61514f2624b6533250dbe6428e`.
The logo's existing `href="#"` reached `document.querySelector('#')`,
which throws a SyntaxError. This defect predates the charity-claims changes.

The handler now leaves bare fragments to native browser navigation, decodes
nonempty fragments and resolves them with `getElementById`. Missing targets
and malformed percent escapes return safely. Only an existing target cancels
the click and receives `scrollIntoView({ behavior: 'smooth' })`.
This also avoids treating punctuation in an element ID as CSS syntax.

The donation handler, both HTML pages, all CSS and the charity-claims wording
are unchanged by this follow-up.

## Executed checks

Run from the repository root:

```sh
node --check look-up-foundation/script.js
node --test tests/navigation.test.cjs
```

All 14 tests passed. Tests load the actual script in a Node VM and exercise its
registered handlers with a minimal DOM stub. Actual anchors and section IDs
are taken from the HTML. Coverage includes:

- The actual logo's bare fragment leaves the click uncancelled and does not scroll.
- Every existing section link, including the hero CTA, resolves its section,
  cancels native navigation and requests smooth scrolling.
- Missing targets, CSS punctuation, encoded IDs and malformed percent escapes.
- Donation amounts 1, 10 and 100 confirm only the amount entered and the absence
  of payment processing. Empty, zero and negative inputs produce no confirmation
  or impact claim; all handler submissions are prevented.

Running the same suite against the original script reproduced the logo's
SyntaxError and missing-target errors (6 failures, 8 passes).
These tests do not exercise browser scrolling, native form validity, actual
Bootstrap behaviour, network requests or rendering.

## Browser testing limits

No local Chrome/Chromium/Firefox executable was found. Installing Playwright
Chromium was attempted; the download returned an invalid/truncated archive.
The available remote Chrome could not reach the local HTTP server
(`ERR_CONNECTION_REFUSED`). An isolated inline fixture was rejected by that
browser's URL policy. No site was deployed to work around these limits.

Desktop and mobile visual testing, real click/scroll behaviour, Bootstrap menu
interaction, and native form validation remain outstanding. No visual pass is
claimed.

## Remaining issues from source review

- The amount input has `min="1"`, no `required` and no explicit `step`.
  Blank submission silently does nothing; the default number-input step of 1
  excludes fractional AUD amounts such as 10.50 in conforming browsers.
  Zero/negative values should be rejected by native browser validation, which
  was not browser-tested here.
- The mobile navigation toggle lacks an accessible name, `aria-controls` and
  an initial `aria-expanded`. Its Bootstrap collapse interaction still needs
  keyboard and mobile testing.
- Bootstrap CSS and JavaScript depend on jsDelivr. CDN loading and behaviour
  were not verified in a browser.
- The root page's Donate Now remains a placeholder. The second page's donation
  CTA leads to an amount checker only; it does not process payments.
- Entity/contact verification and the evidence gaps in `CLAIMS_REVIEW.md`
  remain unresolved.

These existing issues are recorded for review; they are not silently changed
as part of this navigation correction. The PR remains draft. Do not merge or
deploy without owner approval.
