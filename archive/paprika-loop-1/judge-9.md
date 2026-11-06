**Judge verdict, session 9**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - The `Surfaces:` line for `pines` is gone. It had been open for 5 sessions.
   - There are no `Lighting:` or `Surfaces:` faults.
   - The beach now reads as a pale sand ground colour along the shore and the trails. `sand` is still 0.43% in the ID list.
2. **Plays as DESIGN.md says: 7.**
   - The HUD shows `SUSPICION`, 3 clover icons and 3 bite dots.
   - Pounce forced with `{action:"pounce", target:"human"}` ran from "land" to "reveal".
   - I did not run the local-mode `interact` this session, so I could not check `aim`. It is hidden by the game in solo.
3. **The clip moment: 8.**
   - The human reveal shows a huge red "GOTCHA" with "HUMAN!" above it, "PLAYER 1 has been found.", a red PLAYER 1 tag over a red figure, and a vignette and band.
   - The caption reads "Even in nature, nobody blends in forever."
   - There are 10 sounds (boom, stab1–3, thud, hit).
   - The wolf at reveal is a small brown shape, 0.36%, beside the large `wolf-rock`. It is not the star of the clip. I did not play the AI-sheep branch this session.
4. **Looks like refs/01.jpg: 8.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and the bright meadow all show, and the picture is a good match.
   - The wolf is still not crouched on top of `wolf-rock`. It is a brown lump on the rock's right edge, at 0.53%.
5. **Solo fun and fair: 7.**
   - The suspicion bar, the hint line, the captions and the restart key are present.
   - The 3 `clover` objects are only 0.15% of the frame. The pale beam is faint at the play distance, so they are hard to find.
6. **Local 2-player: 6.**
   - I did not re-check `aim` this session. It is hidden in solo.
   - Last session it was a dim ring among ~100 sheep.
7. **`window.__game`, no build, ~100 sheep: 8.**
   - The keys, actions and `observe` all work.
   - `perf` reads 227 ms on SwiftShader, which is a software renderer and no signal. It has 71 draw calls and 102k triangles, which are modest.
   - Host load is 2.1 on 8 cores.
8. **Juice: 8.**
   - The sounds fire at the reveal.
   - The banners, the captions, the wool particles and the vignette are good.
   - The sheep head bob is not visible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The `viewports` look at 1024×600 is fine. The HUD sits in the corners with no overlap.
   - On the phone (390×844) the HUD panel is tiny, and the `#mode` text is cut off to a small "[M] Mode: SOLO" chip.
   - The canvas is letterboxed with black at that size, so the page does not fill the window.
10. **Faults: 8.**
    - There are no console errors and no `Never visible` object, and the `pines` plane is fixed.
    - The wolf is still not placed on its rock, and the clover beam is weak.

**Next:**
1. **Put the wolf on `wolf-rock` and crouch it.**
   - It has been asked three times, and Iteration 9 did not touch it. Set the wolf `root` position to the top of `wolf-rock` (its bounding-box max y at about (370,520) in the idle frame).
   - Pose it low: front legs bent, head down. Add a pale muzzle and a dark nose.
   - To check, run `look` for the idle frame. `wolf` and `wolf-rock` overlap, the wolf's y is above the rock's top, and `wolf` is above 0.8%.
2. **Make the `clover` patches findable.**
   - Give each `clover` a bigger emissive pulsing ring, radius about 1.5, in pale yellow, with `depthTest` off, plus a taller light beam.
   - To check, run `look` with `sample` at a clover at (440,543) in the picture. The pixel should be clearly brighter than the green around it, and `clover` should be above 0.4%.
3. **Verify and brighten the local-mode `aim`, and fix the full-window fit on tall viewports.**
   - Run `interact` with M and ArrowRight ×30, `look: true`. `aim` should be a clearly visible, bright ring under the wolf.
   - Run `look` with `viewports` ["phone"]. The canvas should fill the window and the `#mode` text should not be cut off.
   - To check, make the `#mode` panel collapse to a short line on narrow screens, and fill the canvas height.

SCORE: 7.4
