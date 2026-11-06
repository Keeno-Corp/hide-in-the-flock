The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 16
**Did**: game.js only. Wool: `toonSheep` ramp is now [196,176,140]→255 (ochre shadow step), `sheepMat` emissive 0x2e261c, per-face `jit` removed from the sheep body/head merge, outline hulls thicker (`hullBody` 0.085, `hullHead` 0.06). `ground-ink` ribbons widened (half-width 0.07→0.12), colour 0x33231a, opacity 0.95.
**Saw**: one zoom `look` at frame 1 over [330,470,800,799]: wool reads as flat cream blobs with an ochre shadow side, outlines thicker, ground-ink contours bolder and clear on the bands. The wolf is still very large in that crop. No console errors seen. I did not run `perf` or measure `ground-ink`'s share of the frame.
**Next**: (1) local mode: `wolfRing` and `aimLine` were "Never visible" last judge even with depthTest off, so check their renderOrder/transparent sort and add a "P2 wolf" marker over `wolf-body`; (2) pull the pounce camera back (the `sc2`/`cam.punch` lines ~890-897) so the wolf is 3.5% or less; (3) quantise the ground tones further if band edges still look soft.
**Open**: items 2 and 3 of judge 15 (local-mode wolf visibility, pounce camera) were not done this session. The hull `0.085` edit was checked by grep only.

### Judge 16

**Judge 16**

I took a 4-cell `look` sheet (start, AI pounce, human pounce, local after `KeyM`) and one `perf`. There were no `Lighting:` or `Surfaces:` lines. I did not run `interact`, so the clover patches, the sound and the stamp-card timing are unchecked. The "Juice" score is carried over from judge 15.

**Scores (Must have, in order)**

1. **Looks as LOOK.md says: 8.**
   - The wool is now flat cream blobs with an ochre shadow side and thicker outlines, which is a real gain.
   - The `sky`, sun disc, `ridge*`, `pines*`, `oaks*`, `ground-ink` contours and grain all hold.
   - `pines*` and `round-trees*` are still faceted shapes with thin outlines.
   - 0% of the frame is near black, so the wolf is not the stark darkest shape.
2. **Compared with BOARD, LOOK.png and the turnarounds: 7.5.**
   - The start wolf is 4.4%, over the 3.5% target.
   - The biggest remaining style gap is the faceted trees.
   - The `ground` still has soft gradients where BOARD has flat tones.
3. **Clip moment: 8.5.**
   - The human cell shows the held woodcut duotone, ink splash, tilted "GOTCHA / HUMAN / PLAYER 1" card and the caption.
   - The AI pounce cell has the wolf at 0.96%, so the camera is too far back.
   - The human pounce cell has the wolf at 5.3%.
4. **Core loop and controls: 7.5.**
   - The HUD and toast read as storybook paper panels.
   - I did not exercise the clovers or the SHEEP card.
5. **Local 2-player: 6.5.**
   - `aimArrow` (red triangle) and the `reach` ring show.
   - The wolf is 0.5% of the frame and is lost in the flock, so the wolf player cannot see their wolf.
   - Item 2 of judge 15 is not done.
6. **UI typography: 8.5.**
   - The panels use IM Fell on cream paper with ink borders, and the Alfa Slab stamp reads.
   - The `div#mode` text is small.
7. **Convention and performance: 7.**
   - `perf` gives 188,746 triangles, 56 draw calls and 0.63 MB of assets.
   - The 377 ms frame is a software renderer, so it is no signal.
   - `window.__game` is present and the sheep are instanced.
8. **Juice: 7.5.** Carried over from judge 15.

**Faults: 7.5.** There were no console errors. Local-mode wolf visibility is still broken, and the AI pounce camera is still too far back.

**Next:**
1. **Make the wolf readable in local mode (asked again).**
   - Create `wolfRing` and `aimLine` with `depthTest:false`, `transparent:true` and a high `renderOrder`, and set `renderOrder` on the material of whatever you add. Judge 16's Next noted that `depthTest: false` alone did not work.
   - Add a "P2 wolf" marker over `wolf-body`.
   - Raise the local-mode camera or zoom it in on the wolf.
   - The one call that shows it done is `look` after `KeyM` and 30 frames. `wolf-body` should be 1.5% or more and `wolfRing` and `aimLine` should leave the "Never visible" list.
2. **Pull the AI pounce camera in (asked again).**
   - Edit the `sc2`/`cam.punch` lines around 890-897 so the wolf is 3.5% or more in the leap.
   - The AI cell currently shows the wolf at 0.96%. The previous Next said "3.5% or less", which was the wrong way round. The wolf should fill more of the frame.
   - The one call that shows it done is the `look` `sheet` cell `{steps:[{action:"pounce",target:"ai"},{wait:50}]}`, with `wolf-body` at 3.5% or more.
3. **Flatten the trees and the ground tones.**
   - Give the `pines*` and `round-trees*` the same 2-step ochre toon ramp as the sheep, with a thicker `*-ink` hull.
   - Quantise the `ground` vertex colours to 3 flat tones.
   - The one call that shows it done is `look` with `zoom` [0, 100, 640, 450] at frame 150. It should show flat tree masses with inked edges and no smooth gradients on the grass.

SCORE: 7.7
