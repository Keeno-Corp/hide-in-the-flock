The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 4

**Judge 4**

Sheep and wolf are bigger since session 3. The `ground` and the wolf's position are unchanged. I looked, played the pounce, local and graze cells, and ran `perf`.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 7.**
   - The sky, `ridge*` ×3, the sun disc, ink-outlined `pines*`/`round-trees*`/`oaks*` and the paper grain all hold.
   - The `ground` is still smoothly shaded with soft 3D shadow patches and a hatching texture. It is not flat painted bands.
   - The `wolf` is the darkest shape (14% brightness against 54% around it).
   - The `sheep*` look like 3D low-poly lumps with some per-face shading.
2. **Compared with BOARD, LOOK.png and the turnarounds: 5.5.**
   - The `sheep*` ×98 are larger, with dark legs and heads, but they are still clumped and faceted rather than flat cream shapes with ink outlines.
   - The `wolf` is now 1.4% of the frame, up from 0.61%. It reads as a silhouette but still overlaps `wolf-rock`, and the look says "0 of its 0 named parts show".
   - The biggest remaining style gap is that the ground and the sheep are still shaded 3D, against BOARD's flat gouache masses.
3. **Clip moment: 9.**
   - "pounce human" shows a woodcut duotone freeze, the red `splash`, a red PLAYER 1 tag and the caption "And so the hidden one was found."
   - "pounce ai" shows the `baa?` bubble and the caption "And the wolf was wrong, as wolves so often are."
   - The slow-mo and camera punch-in were not checked. The HUMAN/SHEEP stamp card is not visible in these frames, so I could not confirm it.
4. **Core loop and controls: 6.5.**
   - The `clover` ×8 patches are drawn as green rings with ink outlines, but they are small and low-contrast.
   - The graze cell (E held for 60 frames) shows the clover counter staying at 0 of 3 and the timer ticking, so I could not confirm that grazing registers. I did not see the win or lose card or restart.
5. **Local 2-player: 6.5.**
   - The "local" cell shows the mode panel, a caption and a red arrow marker.
   - It also shows an orange targeting ring under the wolf, which is clear and in style.
   - The wolf takes only 0.8% of the frame in that cell, and I did not play the 3 bites through.
6. **UI typography: 8.5.** `div#hud` and `div#mode` are cream panels with ink borders and IM Fell and Alfa Slab type. There is no overlap and nothing is cut off. The narrator caption is a storybook line.
7. **Convention and performance: 6.**
   - `__game` works and play starts on load.
   - `perf` reads 333 ms of frame work on SwiftShader, which says nothing about a GPU.
   - 322k triangles is heavy for a flat style: `ground` 180k, `sheep` 61k, `bushes` 18k, `rocks` 14k, `sheep-heads` 14k. `div#paper` stays up.
8. **Juice: 6.5.** The visual bite beat is strong. I did not check sound, and the wolf visibly has animation in the graze cell, but I did not check the sheep's grazing bob.

**Faults: 7.** There are no console errors, no `Lighting:` or `Surfaces:` lines, and `Never visible` is none. The only fault is that `perf` is over budget, which is a software-render artefact. The `ground` mesh holds 180k triangles, which is an over-built plane.

**Next:**
1. **Flatten and slim the `ground` (asked again).**
   - Cut the `ground` mesh from 180k to about 20k triangles.
   - Swap its material for a flat toon material with 2–3 painted bands, and remove the soft shadow patches.
   - The check is `look` with `sample` on neighbouring ground pixels, which should be near uniform, and `perf` triangles under 200k.
2. **Wolf visibility (asked again).**
   - Move the `wolf` so it stands on the open grass or on top of `wolf-rock`, not behind it.
   - Give it a crouch pose and enlarge it to at least 2% of the frame.
   - Run `asset_search` for "wolf" and "stylized sheep" first, because `asset-hits.json` holds no search for either and both are code-made.
   - The check is `look`, where the Subject line says "named parts show" with more than 0 and a share above 2%.
3. **Sheep outlines and grazing proof.**
   - Give the `sheep*` an ink outline or a flat two-tone cream material.
   - Fix or show the clover graze: hold E on a `clover` and show the clover counter going up.
   - The check is an `interact` with E held on a `clover`, where the state's clover count goes above 0.

SCORE: 6.9

## Iteration 5
**Did**: game.js only. `ground` PlaneGeometry N 300 to 110 (180k to ~24k triangles); its vertex colours now use hard steps (`patch` > -0.35 warm, > 1.1 ochre, olive on a threshold) instead of smoothsteps, so it reads as painted bands. `ROCK.top` 3.15 to 4.1 so `wolf` stands above `wolf-rock`. Clover graze radius 1.9 to 2.6.
**Saw**: `look` frame 0: `wolf` 1.4% [348,514,593,672], its silhouette now sits on top of `wolf-rock`, still "0 of its 0 named parts show"; ground bands visible but the toon shadow patches remain; no console errors, no Lighting/Surfaces, Never visible none. `perf`: 166,728 triangles (was 322k), 48 draw calls, 308 ms on SwiftShader (no budget signal). I did not run `asset_search` or play graze/2-player.
**Next**: (1) Raise wolf to 2%+ (scale up or crop camera nearer the rock) and name its parts. (2) Give `sheep*` ink outlines or flat two-tone cream. (3) `interact` with E held within 2.6 of a `clover` and confirm `clovers` > 0 in state; play the 3 bites in local mode.
**Open**: Graze counter not verified; ground still has soft shading from toon + shadows; `asset_search` for wolf/sheep never run.
