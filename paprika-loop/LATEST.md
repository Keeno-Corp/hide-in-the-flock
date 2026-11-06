The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 11
**Did**: game.js clover glow: opacity floor 0.55 (was 0.35) with pulse 0.75–1.0, beam cylinder taller (9 units, wider). `aim` ring: `depthTest` false, `renderOrder` 5, and it now picks the nearest sheep within 9 units (was 3.6), so it shows whenever local mode is on and the wolf is not pouncing.
**Saw**: local look (KeyM, ArrowRight×30): wolf walks to x −4.5 state "ctrl"; an orange `aim` ring is visible under a sheep near the wolf's chest (small, not in the ID list because of its own shader). Solo 30-frame sheet: faint pale beams and rings at the 3 clovers are visible against the meadow, still subtle. No Never-visible, 0 HUD overlap, no console errors. perf not run.
**Next**: (1) make `aim` ring larger/brighter (it is small in the crowd); (2) clover beams still subtle: try a brighter additive ring or a pale-yellow disc on the ground; (3) reveal punch-in on the wolf for the AI shrug (Next 3 of judge 10, not done).
**Open**: clover `sample` brightness not measured; reveal camera punch-in not started.

### Judge 11

**Judge verdict, session 11**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 does not hold again: (640,400) reads #c7cfbb, not green. The point lands on the pale sheep and the path, though the meadow around it is green. `ground` is 37% and the hues are green 51%.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×6 show.
   - Check 4 holds: 0 overlap on `#hud` and `#mode`, and there are no `Lighting:` or `Surfaces:` faults.

2. **Plays as DESIGN.md says: 7.**
   - Solo shows the `SUSPICION` bar, 3 clover icons and 3 bite dots.
   - KeyM switches to local mode. ArrowRight ×30 moves the wolf to x −4.5 with state "ctrl" and pose "walk".
   - The `aim` ring is now visible, but small and orange, under a sheep at the wolf's chest, and the crowd swallows it. It is not in the ID list.

3. **Clip moment: 9** (not re-run this session, so this is carried from judge 10).
   - AI branch: "AI SHEEP" and the "baa?" bubble. Human branch: "HUMAN! GOTCHA" and the PLAYER 1 tag.
   - The wolf is still small under the banner, and the shrug and bite-lost are not emphasised.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, sand and `wolf-rock` all show.
   - The wolf is dark and crouched on `wolf-rock`.
   - The `sand` strip is thin, at 0.43%.

5. **Solo fun and fair: 7.**
   - The suspicion bar, hint line, captions and restart are present.
   - The `clover` ×3 patches are 0.15% of the frame. Their beams are now faintly visible as pale rings and columns at left, centre and right, but they stay subtle against the bright meadow.

6. **Local 2-player: 6.**
   - The wolf moves and the `aim` ring exists, but it is tiny and low-contrast in the crowd. The wolf player cannot tell at a glance which sheep a pounce will hit.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 140.8 ms on SwiftShader, which is no signal. It has 74 draw calls and 102k triangles, both modest. Host load is 1.8.

8. **Juice: 8.**
   - The banners, captions, bubble and tag are strong.
   - The grazing head bob is not readable at the play distance.

9. **Works at any window size, HUD readable: 7.**
   - The HUD is fine at 1280×800. I did not re-run `viewports` this session.

10. **Faults: 8.**
    - There are no console errors, no `Never visible` object and no HUD overlap.
    - Clover `sample` brightness is still unmeasured.

**Next:**
1. **Make the `clover` patches clearly findable (asked again).**
   - Beams and rings are in but still subtle. Add a bright pale-yellow additive disc on the ground, about 1.2 units wide, pulsing, with `depthTest` off. Add a small floating sparkle or icon above each clover.
   - Check with `look` and `sample` at the left clover near (170,590) in the 1280 px page. It should read at least 40/255 brighter than the grass around it, and `clover` should be above 0.4% in the ID list.
2. **Make `aim` large and obvious in local mode (asked again).**
   - Make the ring about 2× wider, bright white-yellow, with a thick outline. Add a bobbing arrow or a "TARGET" marker above the targeted sheep.
   - Check with `interact` KeyM, ArrowRight ×30, `look: true`. The ring should read at a glance in the 1024 px picture as the brightest thing near the wolf.
3. **Give the wolf more presence in the reveal (asked again).**
   - For the AI-sheep branch, add a camera punch-in that holds on the wolf for the shrug. Add head tilt, ears down and a visible tick on the bite dot going dark.
   - Check with `look` `sheet` of `{action:"pounce", target:"ai"}`. `wolf` should be above 3% in the reveal cell.

SCORE: 7.7
