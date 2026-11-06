The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 6

**Judge 6**

I did not run `asset_search`, the 3-bite 2-player play-through, a clover-grazing `interact`, or a win or lose card. I judged from `look` sheet cells and one `perf`.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, `ridge*` ×3, the sun disc, `pines*`, `oaks*` and the paper grain all hold.
   - The `sheep*` now have ink rims (`sheep-ink`).
   - They are still shaded, lumpy 3D clusters rather than flat cream shapes. The `ground` still has smooth shading with large soft bands.
   - Both read as 3D game, not woodcut or gouache.
2. **Compared with BOARD, LOOK.png and the turnarounds: 6.**
   - The ink rims on the sheep close part of the gap to the turnarounds.
   - The wolf is a dark silhouette. In the start cell its "subject wolf" share is 0.76%, so the 2.1% Iteration 6 measured is not what this frame shows.
   - The biggest remaining style gap is the flat two-tone cream sheep and the hard-edged painted `ground`.
3. **Clip moment: 8.5.**
   - "pounce human" shows a low, wide leaping wolf with a caption, and the camera is closer than before.
   - After 110 frames, the woodcut duotone freeze, `splash`, a tilted GOTCHA / HUMAN card in red ink and a PLAYER 1 ribbon are all on screen.
   - The AI case shows "BAA? SHEEP. Just a sheep. Bite lost." with a `baa?` bubble, and the bite counter drops to 2.
   - The weak spot is the pounce frame itself: the wolf is 1.3% of it, and there is no clear punch-in on the wolf and the target sheep.
4. **Core loop and controls: 6.**
   - The HUD shows TIME 2:59, GANTERS, WOLF BITES and SUSPICION. The `clover` rings are visible but low-contrast.
   - The counter going up, the win card and the lose card remain unseen.
5. **Local 2-player: 6.**
   - I did not play the 3 bites this round, so this holds the previous 6.5 less a little for the wolf's small on-screen size.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell and Alfa Slab type, and the caption lines are storybook.
   - The mode panel's text is small.
7. **Convention and performance: 6.5.**
   - `perf` reads 287 ms per frame with 242k triangles and 50 draw calls, up from 167k last session. The host is a software renderer, so the frame time is not a budget signal.
   - The triangle count is rising again, and the sheep ink hulls probably account for much of it.
   - `div#paper` stays up over the canvas (opacity 0.55, still there after 5.2 s).
8. **Juice: 6.5.**
   - I did not check the sound or animation this round, so this holds the last score.

**Faults: 7.5.** `look` reported no `Lighting:` or `Surfaces:` lines and nothing under `Never visible`. I did not read console errors this round.

**Next:**
1. **Flatten the sheep and the `ground`, the biggest style gap.**
   - Make the `sheep*` a flat two-tone cream (a toon or 2-step material with no smooth gradient) under the existing `sheep-ink`.
   - Replace the soft shading on the `ground` with hard-edged painted shadow shapes.
   - The check is `look` on frame 0 with `zoom` on the sheep cluster, which should show two flat tones and no gradient.
2. **Punch the camera in on the pounce (asked again).**
   - In "pounce human" at about frame 50, move the camera to a close three-quarter view on the wolf and the target sheep.
   - The check is the sheet cell at wait 50, where the subject wolf share should be above 5%.
3. **Prove the core loop.**
   - Use `interact` to move the player onto a `clover` and hold E, expecting `clovers` > 0.
   - Raise the `clover` ring contrast to a bright cream ring on a darker patch.
   - Add an `interact` that wins (3 clovers) and one that loses (3 bites), and look at the stamped cards.

SCORE: 7.1

## Iteration 7
**Did**: game.js only. New 2-step toon gradients: `toonSheep` (dark step ~0.68) on `sheepMat`, `toonGround` (dark step ~0.8, defined next to `toonMap` because the ground builds before later consts) on `ground`. Pounce punch-in: `updateCamera` scale 0.3 to 0.52 of `cam.punch`, fov drop 12 to 16, and `lookAt` y/z now lerp to the low close view with `cam.punch` (before, a lower camera looked over the flock).
**Saw**: `look` frame 0: wolf 2.4%, sheep read as two-tone cream with ink rims, `ground` bands still soft in vertex colours; no Lighting/Surfaces, Never visible none. Sheet "pounce human" at 30 frames: wolf 4.7% mid-leap over the flock, big sheep in front; at 60: 2.8%. Perf not run.
**Next**: (1) Prove the core loop: put P on a `clover`, hold E, expect `clovers` > 0; raise clover ring contrast; then win (3 clovers) and lose (3 bites) cards. (2) Ground vertex-colour banding (hard-edged paint patches) instead of smooth hills colours. (3) Cut triangles: sheep ink hulls (242k tris).
**Open**: Grazing, win/lose cards and 3-bite local play still unverified; the wolf at frame 0 still a dark silhouette (2.4%); `div#paper` stays over the canvas.
