The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 5
**Did**: game.js only. `ground` PlaneGeometry N 300 to 110 (180k to ~24k triangles); its vertex colours now use hard steps (`patch` > -0.35 warm, > 1.1 ochre, olive on a threshold) instead of smoothsteps, so it reads as painted bands. `ROCK.top` 3.15 to 4.1 so `wolf` stands above `wolf-rock`. Clover graze radius 1.9 to 2.6.
**Saw**: `look` frame 0: `wolf` 1.4% [348,514,593,672], its silhouette now sits on top of `wolf-rock`, still "0 of its 0 named parts show"; ground bands visible but the toon shadow patches remain; no console errors, no Lighting/Surfaces, Never visible none. `perf`: 166,728 triangles (was 322k), 48 draw calls, 308 ms on SwiftShader (no budget signal). I did not run `asset_search` or play graze/2-player.
**Next**: (1) Raise wolf to 2%+ (scale up or crop camera nearer the rock) and name its parts. (2) Give `sheep*` ink outlines or flat two-tone cream. (3) `interact` with E held within 2.6 of a `clover` and confirm `clovers` > 0 in state; play the 3 bites in local mode.
**Open**: Graze counter not verified; ground still has soft shading from toon + shadows; `asset_search` for wolf/sheep never run.

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
