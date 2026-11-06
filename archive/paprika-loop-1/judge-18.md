**Judge verdict, session 18**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, `wolf` and the `sheep*` flock. Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.
   - I did not read the `sand` share.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, the clovers, the WOLF BITES dots and the SUSPICION bar.
   - The pounce action works and the bites count down (3 dots, then 2 after the AI cell).
   - I did not run `interact` with keys this session.

3. **Clip moment: 8.**
   - The human cell now shows the `wolf` as a clear dark shape at lower centre, next to the red target, the PLAYER 1 tag and a big "GOTCHA".
   - The AI cell shows "AI SHEEP", "Bite wasted", the "baa?" bubble and the `wolf` shrugging.
   - Both reveal cells are still dark: brightness 44% and 15% near black. The letterbox bars and the grey band cause most of it. This is the second time this is asked for.
   - The `wolf` in the human cell is cropped at the bottom edge.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover rings and the end screen "EATEN … R to play again · M to switch mode" are present.
   - The `after` cell shows the end screen reading clearly over the meadow.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from the earlier sessions.
   - I did not re-run it this session.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 131 ms on SwiftShader, so it is no signal. The host load is 5.8.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag and captions are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 8.**
   - The HUD is readable at 1280 wide.
   - I did not run `viewports`.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The reveal cells stay dark, which is covered under item 3.

**Next:**
1. **Lighten the reveal cells (asked again).**
   - Make the letterbox bars thinner or semi-transparent, and give the banner band a lighter tint than the current dark grey.
   - Check with `look` `sheet` on `pounce human` and `pounce ai`, 150 frames each. Near black should drop under 8% and brightness rise above 55%.
2. **Keep the `wolf` fully in frame in the human reveal.**
   - Raise or pull back `cam.close` slightly so the `wolf` is not cut off at the bottom edge.
   - Check with the same `look` `sheet`. The whole `wolf` should show above the caption bar.
3. **Check the end of the reveal, then add the replay.**
   - Run `interact` `{action:"pounce", target:"human"}` with `frames: 200` and `look: true`. This checks that the `sheep*` shrink does not pop back to full size visibly. Ease them back over about 0.3 s if it does.
   - Run a plain `look` and read the `sand` share. Widen the `sand` ring if it is under 1%.
   - Drop the invisible `aimLine`, then add a short "replay" freeze frame after the reveal.

SCORE: 8.3
