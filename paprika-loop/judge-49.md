**Scores**

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, inked `pines*`, `ridge*` and grain read as a storybook.
   - `round-trees*` and `oaks*` are now one flat green, but they still show faceted facets.
   - `ridge*` still carries a gradient.
   - The `sheep*` (×68) are still soft cream lumps with thin `sheep-ink*`.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - `wolf-body` is a clear near-black mass on `wolf-rock`, with grass around it.
   - `Subject: wolf` is 2.5% (up from 3% in the last verdict's frame 40, which was measured differently), and it stands out at 8% brightness against 56%.
   - The biggest remaining style gaps are the soft sheep and the faceted trees.
3. **Clip moment: 9.** I carried this over and did not re-run it this session.
4. **Core loop and controls: 7.**
   - The HUD now says "win at 3:00", which helps.
   - My `state: {T:179}` step did not move the timer: `t` read 3.02 afterwards. The state key for time is not `T`, so I never saw the win card.
   - Nothing has yet proven the win stamp, and the three-minute wait is too long to reach by hand.
5. **Local 2-player: 8.** Carried over, not checked.
6. **UI typography: 8.5.** The cream `#hud` and `#mode` panels have ink borders and IM Fell text, with no overlap or cut-off.
7. **Convention and performance: 8.**
   - `perf` reports 71 draw calls, 150,662 triangles and 0.63 MB of assets.
   - The 412 ms frame is SwiftShader and gives no budget signal.
8. **Juice: 8.** The baa and wind sounds start, and the wolf moves and stops. The rest is carried over.

**Faults: 8.**
- I saw no console errors and no `Lighting:` or `Surfaces:` lines, and nothing is Never visible.
- The front `sheep*` crowd the bottom 25% of the frame.
- The wolf-start move to (-15,-2) is still unplayed against the AI stalk distances.

**Next:**
1. **Prove the win card (asked again).**
   - Read `observe` to find the real timer key, since `T` did nothing.
   - Set it to 179 and step 120 frames. If no key can be set, add a `{action:"win"}` to `window.__game.act`.
   - Proof: `interact` with `expect: {result: "win"}` and `look: true` shows a stamped storybook win card with a restart.
2. **Make the sheep storybook (asked again).**
   - Give the `sheep*` flat cream fills with no soft gradient lumps, and thicker, darker `sheep-ink*`.
   - Add a pale rim behind `wolf-body` so it reads even against the dusk hills.
   - Proof: `look` with `sample` at two points on one sheep body returns near-equal colour, and the ink edge is visible at 1280 px.
3. **Flatten `ridge*` and the tree facets.**
   - Give `ridge*` and `round-trees*` a flat unlit tint with no vertex gradient or per-facet shading, keeping the ink outline.
   - Proof: `look` with `sample` at two points on one `round-trees*` crown returns near-equal colour, and the faceted blobs are gone from the picture.

SCORE: 7.9
