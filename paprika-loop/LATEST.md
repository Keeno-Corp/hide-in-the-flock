The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 10

**Judge verdict, session 10**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 does not hold. (640,400) reads #c7cfbb, not green. It lands on the pale sheep and the path, and the meadow is still bright green in the picture.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×6 show.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - There are no `Lighting:` or `Surfaces:` faults.
2. **Plays as DESIGN.md says: 7.**
   - Solo shows `SUSPICION`, 3 clover icons and 3 bite dots.
   - M switches to local mode. ArrowRight ×30 moves the wolf to x −4.5 with state "ctrl" and pose "walk".
   - In local mode the wolf runs along the sheep as a long dark body, and it reads well.
   - `aim` still sits in "Not found by the ID image", so I can't see its ring in the picture. It is hidden in solo and invisible in local without a pounce target.
3. **The clip moment: 9.**
   - AI branch: "BITE WASTED" above a huge "AI SHEEP", "Just a sheep. Bite wasted.", a "baa?" bubble over the wolf, and the caption "A completely innocent sheep. Awkward."
   - Human branch: "HUMAN!" above a red "GOTCHA", "PLAYER 1 has been found.", a red PLAYER 1 tag over a red figure, and the caption "It had a name. It was PLAYER 1."
   - Both read in a 5-second clip.
   - The wolf is small under the banner, and the bite-lost shrug isn't obvious.
4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, sand and `wolf-rock` all show.
   - The wolf is now dark slate and sits on `wolf-rock` at 0.94%, so the "crouched on its rock" item is met.
5. **Solo fun and fair: 7.**
   - The suspicion bar, hint line, captions and restart are present.
   - The 3 `clover` objects are still 0.15% of the frame, and the opening picture shows only small pale-green patches among the grass. They are hard to find from the play camera.
6. **Local 2-player: 6.**
   - The wolf moves with the arrows. I did not see an `aim` ring in that picture, and the sheep crowd hides targeting.
7. **`window.__game`, no build, ~100 sheep: 8.**
   - The keys, `act` and `observe` all work.
   - `perf` reads 117 ms on SwiftShader, which is no signal. It has 73 draw calls and 102k triangles, which are modest. Host load is 1.3.
8. **Juice: 8.**
   - The banners, captions, bubble, tag and vignette are strong.
   - The sheep head bob isn't readable at the play distance.
9. **Works at any window size, HUD readable: 7.**
   - Iteration 10 reports the canvas fills the phone window and the HUD is readable. At 1280×800 the HUD is fine.
   - I did not re-run the phone `viewports` look this session.
10. **Faults: 8.**
    - There are no console errors, no `Never visible` object and no HUD overlap.
    - The `clover` glow and local `aim` visibility are still unverified.

**Next:**
1. **Make the `clover` patches findable (asked again).**
   - Floor the beam and ring opacity at about 0.5 even when the player is far, in pale yellow, with `depthTest` off. Make the beam taller.
   - To check, run `look` with `sample` at the clover near (440,543). The pixel should be clearly brighter than the green around it, and `clover` should be above 0.4% in the ID list.
2. **Make `aim` a bright ring under the target in local mode (asked again).**
   - Set `aim` to a bright, pulsing, `depthTest`-off ring at the sheep the wolf would bite. Show it whenever local mode is on, not only when a pounce is armed.
   - To check, run `interact` with KeyM and ArrowRight ×30, `look: true`. `aim` should show in the ID list with a visible bright ring.
3. **Give the wolf more presence in the reveal.**
   - Add a camera punch-in that holds on the wolf for the AI shrug: head tilt, ears down, a "bite lost" tick on the bite dot.
   - To check, run the `sheet` with `{action:"pounce", target:"ai"}`. `wolf` should be above 3% in the reveal cell.

SCORE: 7.7

## Iteration 11
**Did**: game.js clover glow: opacity floor 0.55 (was 0.35) with pulse 0.75–1.0, beam cylinder taller (9 units, wider). `aim` ring: `depthTest` false, `renderOrder` 5, and it now picks the nearest sheep within 9 units (was 3.6), so it shows whenever local mode is on and the wolf is not pouncing.
**Saw**: local look (KeyM, ArrowRight×30): wolf walks to x −4.5 state "ctrl"; an orange `aim` ring is visible under a sheep near the wolf's chest (small, not in the ID list because of its own shader). Solo 30-frame sheet: faint pale beams and rings at the 3 clovers are visible against the meadow, still subtle. No Never-visible, 0 HUD overlap, no console errors. perf not run.
**Next**: (1) make `aim` ring larger/brighter (it is small in the crowd); (2) clover beams still subtle: try a brighter additive ring or a pale-yellow disc on the ground; (3) reveal punch-in on the wolf for the AI shrug (Next 3 of judge 10, not done).
**Open**: clover `sample` brightness not measured; reveal camera punch-in not started.
