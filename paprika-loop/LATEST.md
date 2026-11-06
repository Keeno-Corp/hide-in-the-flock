The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 17

**Judge verdict, session 17**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×136, `wolf-rock`, `wolf` and the `sheep*` flock. Brightness is 64%, saturation 45%, 0% near black.
   - I did not read the `sand` percentage. The strip is visible but thin on the left.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The solo HUD shows TIME 2:59, the WOLF BITES dots and the SUSPICION bar.
   - I did not run `interact` this session. This score carries over from session 16, where KeyM then ArrowRight gave mode "local" with the wolf under control.

3. **Clip moment: 8.**
   - The human cell shows a big red "GOTCHA", "PLAYER 1 has been found.", the PLAYER 1 tag over the red sheep, and the caption "Even in nature, nobody blends in forever."
   - In the human cell the `wolf` is still a flat dark sliver at the lower centre, half hidden by `sheep*` ×60. This is the same fault as last session, and the camera is unchanged.
   - The AI cell shows "BITE WASTED", "AI SHEEP", the "baa?" bubble, a large `wolf` and the caption "A completely innocent sheep. Awkward."
   - Both reveal cells are still dark: brightness 46% and 44%, with 14–15% near black, much of it the letterbox bars. The target of under 8% was not met.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera. The picture is bright and low-poly.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover rings and the restart text are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from session 16: `wolfRing`, `aim` ×3 and `aimArrow` are visible.
   - I did not re-run it this session.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 152.7 ms on SwiftShader, which is no signal. The host load is 5.7.
   - It shows 77 draw calls, 102.8k triangles and 0 MB of assets, all modest.

8. **Juice: 8.**
   - The banners, bubble, tag and captions are strong.
   - I did not check the sound or the bite-pip pop.

9. **Works at any window size, HUD readable: 8.**
   - The HUD is readable at 1280 wide.
   - I did not run `viewports` this session. The phone crop of near sheep from session 16 is unchanged.

10. **Faults: 9.**
    - There is no `Never visible` object, and the sheet and `perf` raised no console errors.
    - The human-reveal `wolf` is still small, but this is covered under item 3.

**Next:**
1. **Make the human reveal show the wolf (asked again).**
   - Last session's sideways, lower `cam.close` made the `wolf` leave the frame, so use a different approach.
   - Hide or scale down the `sheep*` within about 6 units of the wolf during the reveal, or put the camera on the wolf-to-target line just behind the wolf, at its height, looking at the target.
   - Check with `look` `sheet` on `pounce human`, 150 frames. The `wolf` should show as a clear grey shape about the size it has in the AI cell.
2. **Lighten the reveal cells (asked again).**
   - Make the letterbox bars thinner or semi-transparent, and give the band a lighter tint. About 15% of the pixels are near black in both reveal cells.
   - Check with the same `look` `sheet`: near black should be under 8% and brightness above 55%.
3. **Read the `sand` share, then finish.**
   - Run a plain `look` on the `start` view and widen the `sand` ring if it is under 1%.
   - Run `interact` `{action:"pounce", target:"ai"}`, then `look` `zoom` on `#hud` [14, 12, 241, 101] to check the pip pop, and drop the invisible `aimLine`.
   - Then add a clip-friendly "replay" freeze frame after the reveal.

SCORE: 8.2

## Iteration 18
**Did**: `drawSheep` (game.js): during a human reveal, `sheep*` within 7 units of `wolf` (not the target) shrink to 25% over 0.25s (`scK`), so the wolf is no longer hidden.
**Saw**: sheet human|ai at 150 frames: the human cell now shows a clear grey `wolf` at lower centre beside the red target and PLAYER 1 tag; brightness 44% both, 15% near black (letterbox bars/band, unchanged). No console errors. Not run: perf, phone, sand %, pip pop.
**Next**: (1) lighten reveal cells (thinner letterbox, lighter band; target near black <8%); (2) plain `look` for the `sand` share; (3) pip pop check, drop `aimLine`, add replay freeze frame.
**Open**: the shrink pops the sheep back to full size when the reveal ends (not checked visually).
