The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 16

**Judge verdict, session 16**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock` with the `wolf` crouched on it, `cloud` ×32 and `sheep*`. Brightness is 64% and saturation 44%. There are no `Lighting:` or `Surfaces:` lines.
   - The `sand` strip is still only 0.43%, and it was 0.46% last session.

2. **Plays as DESIGN.md says: 8.**
   - KeyM then ArrowRight ×60 gives mode "local" and wolf state "ctrl", with the wolf at x −1, z −6.
   - The solo HUD shows the TIME clock, the WOLF BITES dots and the SUSPICION bar.

3. **Clip moment: 8.**
   - The human cell shows a big red "GOTCHA", "PLAYER 1 has been found.", the PLAYER 1 tag over the red sheep, and the caption "Even in nature, nobody blends in forever."
   - In the human cell the `wolf` is only a flat dark sliver at the lower left. It is much smaller than in the AI cell, and the sheep hide it.
   - The AI cell shows "BITE WASTED", "AI SHEEP", the "baa?" bubble, a large `wolf` and the caption "A completely innocent sheep. Awkward."
   - Both cells are dark: brightness is 42% in the human cell and 40% in the AI cell, with about 15% near black. The dark band behind the banner is heavy.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud`, `pines*`, `sand` and `wolf-rock` all show from the play camera, and it reads bright and low-poly.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover rings and the restart text are present.
   - I did not play a full round this session.

6. **Local 2-player: 8.**
   - `wolfRing` is 0.13% (14.2 units across) and `aim` ×3 is 0.14%. The wolf is now clearly circled by the yellow ring.
   - `aimArrow` is 0.17% and reads as a red triangle at the target.
   - `aimLine` is 0.00078%, so it is still invisible. It is redundant now.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 117.8 ms on SwiftShader, which is no signal.
   - It shows 76 draw calls and 102.7k triangles, both modest.
   - Host load is 4.6.

8. **Juice: 8.**
   - The banners, bubble, tag and captions are strong.
   - The bite-pip pop and the sound were not checked this session.

9. **Works at any window size, HUD readable: 8.**
   - At 1280 wide there are 0 overlap and 0 cut off.
   - On the phone the `#hud` panel is intact and `#mode` is now a small "[M] Mode: SOLO" chip at the bottom, which is readable.
   - On the tablet the `#mode` panel shows the full controls text, so that works too.
   - On the phone, the sheep near the camera are cropped at the sides because the view is narrow.

10. **Faults: 9.**
    - No console errors, no `Never visible` object and 0 overlap.
    - `player` and `reach` are shader-placed, so they are not a fault.

**Next:**
1. **Make the human reveal as readable as the AI one.**
   - Move `cam.close` to the side and lower it, so no `sheep*` cover the `wolf` in the human cell.
   - Make the wolf at least as large as in the AI cell.
   - Lighten the dark banner band, which leaves about 15% near black in both reveal cells.
   - Check with `look` `sheet` on `pounce human`, 150 frames. The wolf should show as a clear grey shape of about the AI cell's size, and the near-black share should drop under 8%.
2. **Widen the `sand` strip (asked again).**
   - Raise it where it meets the sea, as seen from the play camera, so `sand` is about 1% or more.
   - Check with `look` on the `start` view. The `sand` line should read 1% or more, and it is 0.43% now.
3. **Verify the bite-pip pop, then drop the dead `aimLine`.**
   - Run `interact` `{action:"pounce", target:"ai"}`, then `look` `zoom` on `#hud` [14, 12, 241, 101]. A pip should be mid-animation, dark or shrinking.
   - Remove `aimLine` or make it a thicker dashed line, since it is 0.0008% and adds nothing.
   - Then, for the finish: add a faint wind or leaf drift on the screen edge and a clip-friendly "replay" freeze frame after the reveal.

SCORE: 8.2

## Iteration 17
**Did**: tried a lower, sideways `cam.close` (x+9, y-4): the `wolf` left the human cell entirely, so I reverted it. Kept: `#reveal .band` darkness #000b to #0006 (index.html); `sand` ring raised to SEA+1.1 (game.js).
**Saw**: sheet start|human|ai: start brightness 64%, `sand` on screen; human 42% bright, 16% near black (mostly the letterbox bars), ai 34%, 14% near black. Sand % not re-read; wolf in the human cell not verified after the revert; perf, phone and pip pop not run.
**Next**: (1) human reveal: place the camera on the wolf-to-target line at wolf height, or hide `sheep*` within 6 units of the wolf during reveal; (2) read the `sand` % with a plain `look`; (3) the bite-pip pop check and drop `aimLine`.
**Open**: the human reveal camera is unchanged and the wolf is still small there.
