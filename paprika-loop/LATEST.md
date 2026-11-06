The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 12

**Judge verdict, session 12**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 is borderline: (640,400) is #cad8a5, a pale green-yellow. The point lands on a sheep and path area, though the meadow around it is green. `ground` is 38% and the hues are green 51%.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×6 show.
   - Check 4 holds: 0 overlap on `#hud` and `#mode`, and there are no `Lighting:` or `Surfaces:` faults.

2. **Plays as DESIGN.md says: 8.**
   - Solo shows the `SUSPICION` bar, 3 clover icons and 3 bite dots.
   - KeyM then ArrowRight ×30 gives mode "local" and the wolf at x −4.5 with state "ctrl" and pose "walk".
   - The red `aim` ring and the `aimArrow` cone now read in the picture, on the sheep next to the wolf.

3. **Clip moment: 9.**
   - AI branch: "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble, one bite dot gone, and a caption line.
   - Human branch: "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 tag over the red sheep.
   - The wolf is still small under the banner. There is no punch-in on the shrug.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `sand` and `wolf-rock` all show.
   - The wolf is dark and crouched on `wolf-rock`.
   - The `sand` strip is thin, at 0.43%.

5. **Solo fun and fair: 8.**
   - The three `clover` patches now show as glowing yellow discs with light columns.
   - `sample` at (170,590) reads #d3fab1, a bright pale green, against grass around #8ac04a.
   - The suspicion bar, hint line, captions and restart are present.

6. **Local 2-player: 7.**
   - The red ring and arrow are visible at a glance.
   - They are still small at 0.015% and 0.028%. When the wolf is among many sheep it is hard to tell which sheep is targeted.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 117.5 ms on SwiftShader, which is no signal. It has 76 draw calls and 102.7k triangles, both modest.
   - Host load is 3.4.

8. **Juice: 8.**
   - The banners, caption voice, bubble and tag are strong.
   - The grazing head bob is not readable at the play distance.

9. **Works at any window size, HUD readable: 7.**
   - The HUD is fine at 1280×800. I did not run `viewports`.

10. **Faults: 9.**
    - There are no console errors, no `Never visible` object and no HUD overlap.

**Next:**
1. **Give the wolf presence in the reveal (asked again, third time).**
   - For the AI branch, add a camera punch-in and hold on the wolf for 1.5 s. Add a head tilt, ears down and a shrug, and a visible tick as the bite dot goes dark.
   - Check with `look` `sheet` of `{action:"pounce", target:"ai"}`. `wolf` should be above 3% in the reveal cell.
2. **Run `viewports` for phone, tablet and laptop, and fix the HUD.**
   - The `#hud` and `#mode` panels are large. On a narrow window, shrink or collapse `#mode` and keep the `SUSPICION` bar visible.
   - Check with `look` `viewports: ["phone","tablet","laptop"]`: 0 overlap and 0 cut off.
3. **Make the wolf's targeting read in a dense crowd.**
   - Draw the `aim` ring with `depthTest` off and a white outline, scaled up to about 1.5×. Add a short line from the wolf to the targeted sheep.
   - Check with `interact` KeyM, ArrowRight ×30, `look: true`: `aim` above 0.05% in the ID list.

SCORE: 8.1

## Iteration 13
**Did**: game.js: AI-shrug reveal now holds `cam.punch` at 1 until p.t 1.9 s and adds `cam.close` (camera centres on `wolf`, ~25% closer) until 2.0 s. `aim` ring scaled 1.5× with a white outer ring (depthTest off); arrow kept.
**Saw**: sheet pounce target ai: wolf now fills the lower-centre of the cell (large, head tilting under the "baa?" bubble), banner, caption fine. Local look: `aim` ×2 0.072%, `aimArrow` 0.11% (was 0.015/0.026), white outline readable in the dense flock; 0 overlap, no Never-visible, no console errors. perf, `viewports` not run.
**Next**: (1) run `look` viewports phone/tablet/laptop and fix HUD (`#mode` collapse, keep SUSPICION visible); (2) a line from wolf to the targeted sheep in local mode; (3) the visible tick on the bite dot when a bite is wasted; clover pulse shares one material.
**Open**: viewports untested; wolf% in the reveal cell not measured numerically; no wolf→sheep line yet.
