# Bring Up To Date And Working

## Bruce's Ask

I've noticed that:

1.  be-committed.js doesn't follow [the latest](../types/NewEnhancementInstructions.md) [guidance](../types/EnhancementConversionInstructions.md).  For example, be-committed.js imports the json file rather than expecting it in the ctx object of the constructor.
2.  The unit test is failing.

Can you please rectify both of these issues?

## Claude's Implementation Notes

I fixed both problems, and the Playwright test now passes (`1 passed`). Nothing is committed yet.

**1. Brought the code in line with the guidance**
- [be-committed.js](be-committed.js) no longer imports `emc.json`. `init` now takes 4 parameters `(self, enhancedElement, ctx, initVals)` and reads `customData` from `ctx.emc || ctx.config`. The `ctx.config` fallback and the `await` on `roundabout(...)` come from the Important Enhancement Addendum, which is what makes programmatic attachment work.
- [types/be-committed/types.d.ts](types/be-committed/types.d.ts): the `Actions.init` signature now includes `ctx: SpawnContext`. **This file is in the `types` submodule**, so this change has to be committed in that repo.
- [🤝.mjs](🤝.mjs) now follows the emoji template. Before, the generated `🤝.json` had no `customData` and no attribute mappings except `base`, so `🤝` attributes loaded but did nothing. Running the regenerated version shows both are now there.
- The `build` script in [package.json](package.json) is now `node 🤝.mjs > 🤝.json`, and I removed `build-🤝.mjs` (staged with `git rm`).
- [tests/test1.html](tests/test1.html), the Canonical and DefaultSubmit demos, and [README.md](README.md) now point at `emc.json` instead of `emc.mjs`.

**2. Why the test was failing**
The test fired a `keyup` event, but the enhancement listens for `keydown` by default and only clicks on `keydown`. So nothing happened. I changed the test to fire `keydown`.

A type-check of `be-committed.js` with `tsc` shows only two errors, and neither is new. One is the `@this` on the constructor, which is the pattern the guide itself uses. The other is that `tsc` can't resolve the module `mount-observer/nudge.js`.

**Not done (from the addendum, beyond what you asked for):**
- A `def.js` file, tests for programmatic attachment, and a README section about it.
- `nudge` is one of roundabout's reserved property names. If you want programmatic support, that property needs `propagate: ['nudge']` added in `emc.mjs`.

I can take these on if you want them.

## Bruce's Response I

Yes, please proceed with adding support for [programmatic attachment](../types/ImportantEnhancementAddendum.md) and the nudge fix.
## Claude's Implementation Notes II

Done. be-committed now supports programmatic attachment as the addendum describes (steps 1 to 7), and the nudge fix is in. All 7 Playwright tests pass. Nothing is committed yet.

### Nudge

- **The `be-committed-nudge` attribute was broken.** It imported `mount-observer/nudge.js`, which no longer exists. It now imports `assign-gingerly/handlers/nudge.js`, as be-persistent does. The new [tests/Nudge.html](../tests/Nudge.html) tests it with the 🤝 attributes.
- **The reserved-name collision.** Instead of `propagate: ['nudge']`, nudging is now its own action, `nudgeEnhancedElement` (`ifAllOf: ['nudge', 'enhancedElement']`). Referencing `nudge` in an action condition makes roundabout monitor it, which is all `propagate` would do. As its own action, it also still runs when `nudge` is set *after* `hydrate` has already run. It only nudges once, because `nudge` decrements the `disabled` counter.

### Programmatic attachment

- [def.js](../def.js) exports `defBeCommitted(ref)`. It follows the addendum's template, and is added to `package.json`'s `exports`, along with `emc.json` and `🤝.json`.
- **`to` accepts the button element, or a `WeakRef` to it** (addendum step 7). It only ever holds the button weakly. A new `weakenTo` action stores an element back as a `WeakRef`, and remembers which element it already weakened so it doesn't loop (the three-peat pattern). If the button has been garbage collected, pressing Enter does nothing; it doesn't throw.
- The README has a new "Programmatic attachment (no attribute)" section, laid out as in addendum step 6. I checked that nothing `def.js` imports pulls in mount-observer before writing the "less overhead" point.
- Demos are in [demo/Programmatic/](../demo/Programmatic/). I also updated the old [demo/Short and nudges.html](../demo/Short%20and%20nudges.html), which still used the legacy `🤝-nudges` attribute and `/🤝.js`.

### Dependency change: assign-gingerly 0.0.97

The out-of-sequence case (`enh.set` before `defBeCommitted`) failed with assign-gingerly 0.0.87, the version that mount-observer and roundabout-lib pin. The placeholder object was never replaced by a real `BeCommitted`. So `assign-gingerly` is now a direct dependency at **0.0.97**, hoisted to the root as be-persistent does, and npm puts 0.0.87 copies under `mount-observer/` and `roundabout-lib/`. The import map serves only the root copy. The attribute tests pass against it.

### Tests

| Test | What it checks |
|------|----------------|
| `tests/test1` | Attribute path (unchanged) |
| `tests/Nudge` | 🤝 attributes, with nudge |
| `tests/Programmatic/DeclarativeInSequence` | `enh.set` after `defBeCommitted`: nudged, then Enter clicks the button |
| `tests/Programmatic/DeclarativeOutOfSequence` | `enh.set` before `defBeCommitted` |
| `tests/Programmatic/Imperative` | `Object.assign(el.enh.get(emc), {...})` |
| `tests/Programmatic/TargetElement` | `to` as an element without an id, and as a `WeakRef` |
| `tests/Programmatic/TargetElementGC` | A real garbage collection. The removed button is collected, Enter on its input is a no-op, and the other input still works with no errors. |

I ran the GC test against a deliberately broken version that skips the weakening, and it failed as it should ("...was garbage collected, so the enhancement held no strong reference to it").

### Still open (not changed)

- **A console error on every attach, in both the attribute and programmatic paths:** `Error in reaction for resolved: TypeError: vmAny.dispatchEvent is not a function`. It comes from the `when_resolved_changes_dispatch` compact: `BeCommitted` isn't an `EventTarget`, so roundabout has nothing to dispatch on. It predates this work, and the tests still pass. The fix is either to drop the compact or to make the class extend `EventTarget`. None of the reference enhancements use this compact.
- **Switching `to` from an element back to `undefined`** (to fall back to the form's submit button) doesn't work. Enter keeps acting as if the removed button were collected. Setting `to` to an id string does work.
- The `types/be-committed/types.d.ts` changes are in the `types` submodule and need committing there.
