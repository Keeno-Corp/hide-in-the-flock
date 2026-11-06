**Judge 24 scores**

I took one 3-cell `look` sheet (start, human bite, local mode via `KeyM`) and one `perf` with costs. I didn't run `interact` or `feel`, and I didn't hear the sound. I didn't play through to the win or lose card or check other viewports. There were no console errors and no `Lighting:` or `Surfaces:` lines.

1. **Looks as LOOK.md says: 8.5.**
   - The `sky` with the sun disc, the `ridge*` hills, the inked `pines*`, `oaks*` and `round-trees*`, the paper grain and the cream `sheep*` read as a storybook frame.
   - `wolf-body` is the darkest shape, at 2% near black.
   - The `ground` still has a hard yellow-to-green edge.
2. **Compared with BOARD, LOOK.png and the turnarounds: 8.**
   - The biggest remaining style gap is still the wolf.
   - Even with the new `wolf-rim` (Iteration 24), the wolf in the start frame is a black lump on `wolf-rock`. The rim is too faint to separate `wolf-leg`, `wolf-head` and the ears. It looks nothing like the lean WOLF turnaround.
3. **Clip moment: 8.5.**
   - The human bite shows the "GOTCHA / HUMAN" card tilted, a red "PLAYER 1" stamp, ink splash and woodcut freeze, and a storybook caption. It reads in 5 seconds.
4. **Core loop and controls: 7.5.**
   - I carry this over from Judge 23, since I didn't play this session.
   - The `suspicion` HUD is present.
   - The `clover` patches are still faint rings, so they are hard to find.
5. **Local 2-player: 7.**
   - In local mode the wolf is a black mass with `wolf-head ×4` and `wolf-rim ×9` overlapping on `wolf-rock`.
   - The `wolfRing` is a bright orange and green target that is readable and in style.
   - The wolf's pose and its occlusion behind the rock are still unclear.
6. **UI typography: 8.5.**
   - The IM Fell panels in `#hud` and `#mode` have ink borders and nothing overlaps.
   - The Alfa Slab stamps are in style.
   - The narrator caption in the local frame is a storybook line.
7. **Convention and performance: 7.**
   - `perf` gives 195,618 triangles (up from 191k), 74 draw calls and 0.63 MB of assets.
   - The 265 ms frame is on a software renderer, so it is not a signal.
   - `sheep` is 61k triangles, `sheep-heads` 14k, `round-trees` plus `round-trees-ink` 20k, and the `sheep-shadow`, `sheep-ink` and `sheep-heads-*` meshes together 36k.
   - The sheep detail is too heavy for a flat-painted look. `window.__game` is present.
8. **Juice: 7.5.**
   - The pounce and bite visuals and the stamps work. I didn't hear the sound or run `feel`.

**Faults: 8.** There were no console errors. The wolf is still a blob. The triangle count is high and the ground edge is hard.

**Next:**
1. **Make the wolf read as a wolf (asked again).**
   - The Iteration 24 rim exists, but it isn't enough because the rim colour 0x6a5546 is lost against the dark body and the `wolf-leg` meshes overlap.
   - Thicken the rim to about 0.08 and lighten it toward 0x8a7058.
   - Pose the wolf standing apart from `wolf-rock`, with a visible gap between the front and hind legs.
   - Give it two upright ears and a pointed snout in profile.
   - The one call that shows it done is `look` with `zoom` [250, 300, 650, 650] on the start page. It should show four separated legs, ears and a snout, each edged by the rim.
2. **Make the clover patches findable and storybook-drawn (asked again).**
   - Draw each `clover` as an inked patch with a three-leaf motif larger than the sheep's feet, with a soft glow when the player is near.
   - The one call that shows it done is `look` with `zoom` on a clover position. It should show leaf shapes in an ink outline.
3. **Cut the triangle count by about 40%.**
   - Reduce the sheep body and head segment counts (`sheep` 61k, `sheep-heads` 14k).
   - Drop `round-trees-ink` or `sheep-heads-ink` to a cheaper outline.
   - Run `perf` with `variants` hiding `sheep-heads-shadow` and `round-trees-ink` to see what each saves. The triangle count should be about 115k or less, and the look should hold.
   - Then fix the local wolf so it is upright and `wolf-rock` covers its hind legs. Press `KeyM` and `look` with `zoom` on the wolf.

SCORE: 7.8
