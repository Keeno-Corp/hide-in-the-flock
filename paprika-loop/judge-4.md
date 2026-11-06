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
