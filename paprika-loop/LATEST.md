The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 9

**Judge 9**

I took one 3-cell `look` sheet (start, pounce, bitecard) and ran `perf` with `costs`. I did not run `interact`, so the lose card, the 3-bite local game and the clover graze were not played this session. I did not read console errors.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, the sun disc, `ridge*` ×3, `pines*` ×21 and the paper grain read as storybook. The `oaks*` and `round-trees*` now have ink hulls.
   - The `ground` is still smooth gradient slopes with no hard painted bands, so the frame reads as a 3D scene under a filter, not flat gouache.
   - The raking indigo shadows are weak in the start cell.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png.
   - `wolf-body` is the darkest shape, but it is only 2.3% of the frame at start and sits small and low-left.
   - The biggest style gap is the `ground`, which has no hard bands and no ink edge.
3. **Clip moment: 9.**
   - The pounce cell shows the wolf mid-leap at 3.6% over a dense flock, with the caption "Dusk is patient. The wolf is patient too."
   - The bitecard cell shows the woodcut duotone freeze with the ink splash and red drops, a tilted "GOTCHA / HUMAN" stamp card, "PLAYER 1 has been found." and a "PLAYER 1" tag.
   - The "baa?" SHEEP variant was not looked at.
4. **Core loop and controls: 7.**
   - Not played this session. Iteration 8 proved the clover graze and the win card.
   - The `clover` ring is small and hard to read at the start camera.
   - The lose card is still unseen on its own.
5. **Local 2-player: 6.**
   - Not played. It shares the pounce path with solo, and the 3 bites and the targeting are unverified.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is tiny at 1280 px.
   - The stamp card and the narrator caption read well.
7. **Convention and performance: 6.5.**
   - `perf` gives 179,282 triangles and 52 draw calls, down from 242k. The frame time of 276 ms is on a software renderer, so it is no signal.
   - 117,594 triangles cast shadows. `sheep` (61k) and `sheep-heads` (14k) are the cause. This is above the 60k target.
   - `ground` is 24,200 triangles.
   - `div#paper` is still up after 5.1 s.
8. **Juice: 7.**
   - The bite card, splash and freeze are seen.
   - Sound was not heard or checked this session.

**Faults: 7.** `look` listed no `Lighting:` or `Surfaces:` lines and no "Never visible" object. The `perf` figures are not a fault on a software renderer. `div#paper` over the canvas, the shadow-caster count and the unread console errors remain open.

**Next:**
1. **Make the `ground` hard-banded (asked again).**
   - Use flat normals and a 2–3 step toon ramp, with an indigo shadow patch under the oaks and hills.
   - The one call that shows it done is `look` with `zoom` on the foreground `ground` at the start camera. It should show flat tone steps with hard edges and no smooth gradient.
2. **Cut shadow casters (asked again).**
   - Give `sheep` and `sheep-heads` a low-poly shadow proxy or a `customDepthMaterial`.
   - Lower the `ground` grid from 110 to 70.
   - The one call that shows it done is `perf` with `costs`. It should show under 60k casting shadows and `ground` under 12k.
3. **Bring the wolf up at frame 0, and play the untested paths.**
   - Move the start camera so `wolf-body` is at least 3.5% of the picture in `look`, or scale `wolf-rock` in the foreground.
   - Make the `clovers` ring brighter and larger, and fade `div#paper` out within about 2 s.
   - Then run one `interact` that loses all 3 bites in local mode (`Enter` ×3, `KeyM`) with `look: true`, to see the lose card and the 3-bite flow.
   - The `look` with `sample` at the ring pixels should read cream against dark green.

SCORE: 7.1

## Iteration 10
**Did**: game.js only. `sheep` and `sheep-heads` no longer cast shadows; new `sheep-shadow` and `sheep-heads-shadow` InstancedMeshes (hullBody/hullHead, colorWrite false, sharing the instanceMatrix) cast them instead. `ground` grid N 110→70.
**Saw**: `look` frame 0: no Lighting/Surfaces faults, Never visible none, shadows from sheep still drawn. `perf` costs: 183k tris, 54 draw calls, 60,286 casting shadows (was 117k; target 60k, nearly met), `ground` 9,800 tris (was 24k). Wolf still 2.3% of frame. `div#paper` still up after 5.2 s. Frame time 264 ms on a software renderer, no signal.
**Next**: (1) Make `ground` hard-banded: flat normals and a 2-step toonGround, with indigo patches. (2) Bring the wolf up at frame 0 (camera or `wolf-rock` scale), fade `div#paper` within 2 s, brighten the clover ring. (3) Play the lose card and the 3-bite local game with `interact`.
**Open**: Ground banding, wolf size and `div#paper` fade not done. Lose card and local mode still unplayed. Shadow casters 286 over the 60k target (60,286).
