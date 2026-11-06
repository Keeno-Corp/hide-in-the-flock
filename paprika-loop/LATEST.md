The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 5

**Judge 5**

The `ground` is now cheaper, and the wolf's position and size are unchanged since session 4. The wolf is still 1.4% of the frame with "0 of its 0 named parts show". I did not run `asset_search` or the 3-bite 2-player play-through.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky with cloud bands, the sun disc, `ridge*` ×3, `pines*`, `round-trees*`, `oaks*` and the paper grain all hold.
   - The `ground` is still smoothly shaded with large soft shadow bands. Only the colours are stepped.
   - The `sheep*` are still faceted, shaded 3D lumps, not flat cream shapes with ink outlines.
   - The `wolf` is the darkest shape (14% brightness against 54% around it).
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `wolf` is a clean silhouette standing on `wolf-rock`, and that is better.
   - The sheep still read as 3D lumps. That is the biggest remaining style gap, and it is the same gap as last round.
3. **Clip moment: 7.5.**
   - After 70 frames, "pounce human" and "pounce ai" show only a tiny wolf (0.42% and 0.25%) in a low, wide camera, with a caption.
   - I saw no splash, duotone freeze or stamp card at that moment, so I could not see the beat land.
   - Session 4's frames did show the duotone freeze, `splash` and `baa?`.
4. **Core loop and controls: 6.**
   - `clover` ×8 are green rings with ink outlines, but they are low-contrast.
   - E held for 120 frames away from a `clover` leaves `clovers` at 0, as it should, and the player's `grazing` flag goes true.
   - I still have not seen the counter go up, or the win or lose card.
5. **Local 2-player: 6.5.**
   - The "local" cell shows the red arrow marker, an orange targeting ring and a caption panel.
   - The wolf is only 0.55% of the frame there, and the 3 bites were not played.
6. **UI typography: 8.5.**
   - `div#hud` and `div#mode` are cream paper panels with ink borders and IM Fell / Alfa Slab type.
   - Nothing overlaps or is cut off, and the narrator captions are storybook lines.
7. **Convention and performance: 6.5.**
   - `__game` works and play starts on load.
   - Triangles are down from 322k to 167k, with 48 draw calls.
   - `perf` reads 267 ms per frame on SwiftShader (host load 5.2), which is no budget signal.
   - `div#paper` stays up.
8. **Juice: 6.5.**
   - Sound events fire (baa, baa2, wind).
   - The wolf stops and settles after walking.
   - I did not check the gong, stab or grazing bob.

**Faults: 7.5.** No console errors, no `Lighting:` or `Surfaces:` lines, and `Never visible` is none.

**Next:**
1. **Wolf and sheep are still code-made, and `asset_search` has never been run for either (asked again).**
   - Run `asset_search` for "wolf" and "stylized sheep".
   - If nothing fits, rebuild the wolf with a crouch pose and visible head, ears, tail and legs, and name those parts.
   - Scale the wolf up or pull the camera nearer `wolf-rock` so it exceeds 2% of the frame.
   - The check is `look`, where the Subject line shows more than 0 named parts and a share above 2%.
2. **Make the clip frame readable.**
   - In "pounce human", the camera punches in on the wolf and sheep so they are large, not a tiny speck on a low camera.
   - Show the `splash`, the woodcut freeze and the HUMAN stamp card. The check is a sheet cell at roughly frames 90 and 130 after the pounce.
3. **Flatten the sheep and the ground, and prove grazing.**
   - Give the `sheep*` an ink outline (back-face hull) and a flat two-tone cream material.
   - Drop the soft shadow bands on the `ground` for hard painted shadow shapes.
   - Move the player onto a `clover`, hold E, and show `clovers` go above 0 in an `interact` `expect`.

SCORE: 6.9

## Iteration 6
**Did**: game.js only. `asset_search` "low poly wolf" run: hits were a dog, a white fox and a 430-tri blue wolf (Wolf - Low poly, 78aeb85f…), none picked (kept the code wolf). Sheep ink outline: `sheep-ink` / `sheep-heads-ink` InstancedMeshes sharing `bodyIM`/`headIM` instanceMatrix, normal-pushed hull, BackSide `0x2b211c`. `W.root` scale 6.2 to 8; parts named `wolf-body`, `wolf-head`, `wolf-tail`, `wolf-leg`.
**Saw**: `look` frame 0: `wolf` 2.1% [328,489,642,693], "1 of its 1 named parts show", 14% brightness vs 48% around; sheep now read with dark ink rims; no console errors, no Lighting/Surfaces, Never visible none. Perf not run.
**Next**: (1) Clip frame: camera punch-in on wolf+sheep during "pounce human", check sheet at frames ~90/130. (2) Flatten sheep to two-tone cream, harder `ground` shadow shapes. (3) Prove grazing: move P onto a `clover`, hold E, expect `clovers` > 0.
**Open**: Grazing count and 3-bite local play still unverified; clip moment not touched; the wolf-body ×1 only counts one part in Subject.
