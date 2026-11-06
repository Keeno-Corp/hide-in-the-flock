The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 35
**Did**: game.js: `W.root` start scale 8→2 and per-pose targets (line ~864) cut to 1.7 / 2.0 / 2.4 (was 2.4/2.8/3.4); `wolf-head` split into upper jaw + lower jaw (notch), nose, neck blob; ears now the body's dark `mat` (not `rimMat`); `wolf-tail` bigger curved blob plus lighter tip; bite card copy "EATEN"→"HUMAN" kicker "Gotcha" (two `endGame` calls).
**Saw**: `look` zoom [250,340,760,640] at frame 1 still showed the wolf huge because the scale started at 8 and lerps; jaw notch and dark ears visible. Fixed start scale but did not re-look. No perf/interact.
**Next**: re-look zoom to confirm wolf size ~2× sheep and tail curve; clover zoom + glow ring; enlarge HUD; move bite card off the wolf; 2-player pass.
**Open**: wolf foot height on rock at new scale unchecked; card placement and HUD size untouched.
Correction: line ~905 forced wolf scale to 8/8.5 each frame (the real size); now 3/3.4.

### Judge 35

**Session 35 verdict.** I looked at a 3-cell sheet (start, forced human pounce, forced AI pounce) and the wolf zoom [250,340,760,640]. I ran `perf` once. I did not run `interact`, so keys, the 2-player pass and sound are unchecked this round. I did not zoom on a clover, check the card timing or view a laptop viewport.

1. **Looks as LOOK.md says: 7.5.**
   - The `sky`, sun disc, layered `ridge*` hills, inked `oaks*` and pines, paper grain and cream `sheep*` still read as a storybook.
   - `wolf-body` sits on `wolf-rock` as a near-black shape, the darkest on screen. It is now about 2× a sheep, so it fits in the flock.
   - It is still a flat black blob at start-camera size. The frame is still busy and muddy from the hatch overlay.

2. **Compared with BOARD, LOOK.png and the turnarounds: 6.5.**
   - The wolf's scale is fixed, and the dark ears now match the body.
   - Head and body merge into one black mass. The jaw notch, tail curve and legs do not read at this size.
   - Biggest remaining style gap: the wolf's silhouette detail (neck, tail, legs) and the lack of any interior tone.
   - The sheep are good but lighter and flatter than the SHEEP.png turnaround.

3. **Clip moment: 9.**
   - The human pounce gives a tilted cream card with a red "HUMAN" stamp, a "GOTCHA" kicker, a "PLAYER 1" tag, ink splatter and a woodcut duotone.
   - The AI pounce gives "BAA? SHEEP", "Just a sheep. Bite lost." and a "baa?" bubble.
   - The copy now matches the brief.
   - The card still fills the frame and hides the wolf and the bitten sheep. I did not time it.

4. **Core loop and controls: 7.** Carried over from last round; not re-played. The clover heart leaves and a glow ring are still unchecked. The HUD panels are tiny at 1280 wide.

5. **Local 2-player: 6.5.** Not played again; carried over.

6. **UI typography: 8.5.** IM Fell panels, Alfa Slab stamps and an ink border on cream. The HUD text is small.

7. **Convention and performance: 7.5.**
   - 80 draw calls, 116,234 triangles and 0.63 MB of assets.
   - `window.__game` is present and `#paper` clears.
   - The 269 ms frame is SwiftShader on a busy host (load 5.2), so it is not a signal.

8. **Juice: 7.5.** Not re-checked. Carried over: baa, baa2 and wind start, and the pounce, splash and stamps work.

**Faults: 8.** There were no `Lighting:` or `Surfaces:` lines. The wolf scale fault is fixed. The wolf is small, and its foot height on the rock looks fine. I did not read the console, because I ran no `interact`. The bite card covering the scene, the HUD size and the clover and 2-player passes remain open.

**Next:**
1. **Give the wolf a readable silhouette at its new size.**
   - Raise the `wolf-body` scale about 15% and add a lighter warm-brown interior shoulder patch so it is a painted mass.
   - Lift the head and snout clear of the sheep.
   - Make the `wolf-tail` and legs visible against the rock.
   - Check with `look` `zoom` [250,340,760,640]. The jaw notch, tail curve and four legs should all show against `wolf-rock`.
2. **Run the clover and 2-player passes (asked again).**
   - Get a clover position from `observe`, then run `look` with `zoom` on it. It should show three inked heart leaves and a glow ring near the player.
   - Run one `interact` with KeyM, then Enter. A pounce target marker should show on the wolf's target.
3. **Move the bite card and enlarge the HUD.**
   - Slide the card to the top third, or shrink it to about 60%, so the wolf and the bitten sheep stay visible.
   - Raise the HUD panel font size, and check with `look` `viewports` ["laptop"]. The HUD text should be readable.

SCORE: 7.5
