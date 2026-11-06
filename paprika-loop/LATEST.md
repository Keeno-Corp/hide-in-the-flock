The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 10
**Did**: game.js only. `sheep` and `sheep-heads` no longer cast shadows; new `sheep-shadow` and `sheep-heads-shadow` InstancedMeshes (hullBody/hullHead, colorWrite false, sharing the instanceMatrix) cast them instead. `ground` grid N 110→70.
**Saw**: `look` frame 0: no Lighting/Surfaces faults, Never visible none, shadows from sheep still drawn. `perf` costs: 183k tris, 54 draw calls, 60,286 casting shadows (was 117k; target 60k, nearly met), `ground` 9,800 tris (was 24k). Wolf still 2.3% of frame. `div#paper` still up after 5.2 s. Frame time 264 ms on a software renderer, no signal.
**Next**: (1) Make `ground` hard-banded: flat normals and a 2-step toonGround, with indigo patches. (2) Bring the wolf up at frame 0 (camera or `wolf-rock` scale), fade `div#paper` within 2 s, brighten the clover ring. (3) Play the lose card and the 3-bite local game with `interact`.
**Open**: Ground banding, wolf size and `div#paper` fade not done. Lose card and local mode still unplayed. Shadow casters 286 over the 60k target (60,286).

### Judge 10

**Judge 10**

I took one 3-cell `look` sheet (start, a local-mode 3-pounce attempt, and a solo AI-sheep bite) and ran `perf` with `costs`. The lose card did not appear in the sheet, so it is still unseen. I did not read console errors.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, the sun disc, `ridge*` ×3, `pines*` and the paper grain read as storybook.
   - The `ground` is still a smooth gradient with no hard bands and no ink edge. It reads as a 3D scene under a filter, not flat gouache.
   - The raking indigo shadows are barely visible.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The sheep are close to SHEEP.png.
   - `wolf-body` is the darkest shape but only 2.3% of the frame at start.
   - The biggest style gap is still the `ground` banding.
3. **Clip moment: 8.5.**
   - The "baa?" sheep variant now shows, as a speech bubble over the flock.
   - The caption line "And the wolf was wrong, as wolves so often are" shows with it.
   - The pounce and the HUMAN card were seen in Judge 9.
   - In the sheepbite cell the wolf is only 0.32% of the frame, so the bite is hard to read from the start framing.
4. **Core loop and controls: 7.**
   - The `clover` ring is visible as an orange ring in the lose cell.
   - The lose card was not reached, so I could not see it.
5. **Local 2-player: 5.5.**
   - The mode toggled to "LOCAL 2-PLAYER" in the HUD.
   - My forced pounces did not end the game, so the 3-bite flow and the lose card are still unverified.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell type.
   - The `div#mode` text is small.
   - The caption banner reads well.
7. **Convention and performance: 7.**
   - `perf` gives 183k triangles and 54 draw calls. The 320 ms frame is on a software renderer, so it is no signal.
   - 60,286 triangles cast shadows, about at the 60k target. `sheep-shadow` and `sheep-heads-shadow` now carry the sheep shadows.
   - `ground` is 9.8k triangles, down from 24k.
   - `div#paper` is still up after 5.1 s.
8. **Juice: 7.**
   - Visuals are fine. Sound was not checked.

**Faults: 7.** `look` listed no `Lighting:` or `Surfaces:` fault lines and no "Never visible" object. Open items: `div#paper` over the canvas, the lose card never seen, and unread console errors.

**Next:**
1. **Make the `ground` hard-banded (asked again).**
   - Use flat normals and a 2-step toon ramp, with indigo patches under the oaks and hills. Draw a dark ink edge where the bands meet.
   - The one call that shows it done is `look` with `zoom` on the foreground `ground` at the start camera. It should show flat tone steps with hard edges.
2. **Bring the wolf up and fade `div#paper` (asked again).**
   - Move the start camera or scale `wolf-rock` so `wolf-body` is at least 3.5% of the frame at start. The pounce camera should also keep the wolf above 1% in the sheepbite cell.
   - Fade `div#paper` out within about 2 s.
   - The one call that shows it done is `look` with `sheet` at frame 0. It should list the wolf at 3.5% or more. `perf` should no longer name `div#paper` as an overlay.
3. **Prove the lose card and the 3-bite local game.**
   - Run `interact` with `look: true` and `trace` on the bites-left state. Use `KeyM`, then wolf `Enter` presses next to a human, so it reaches the 3rd bite.
   - If `action: pounce` does not count bites in local mode, fix it so it does.
   - It should show the lose card as a stamped storybook card with restart.

SCORE: 7.1
