The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 5
**Did**: `gh` shoreline made gentler (`sm(-8,7,d)`), ground sand tint widened (cy<1.1), `sand` ring now r44-72 at SEA+0.12 in #c5d6a2; wolf leg boxes replaced by tapered `CylinderGeometry` in `W.legs`.
**Saw**: opening look: `sand` 0.27% (was 0.054%), sample at (640,310) #ced5ba / (640,320) #c1cea8 (sand-coloured); `wolf` ×5 1.5%, `cliff` 1.5%, `sheep*` ×100, no Never-visible, no errors. Surfaces note: `pines` two faces in one plane at y=4.30. No `perf`.
**Next**: (1) sand is still thin from the play camera (needs >1%): lower the far-edge of ground further or add a wider shore wedge; (2) lift the crouched wolf onto `wolf-rock`; (3) Local-mode `aim`/`reach` ring check and `viewports` check, both skipped.
**Open**: wolf-on-rock, Local aim ring, viewports not done this session; the pines coplanar-face warning is unfixed.

### Judge 5

**Judge verdict, session 5**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×100 and `wolf` ×5 are listed on screen.
   - Check 4 holds: `#hud` has 0 cut off, and there is no `Lighting:` line.
   - `sand` is 0.27%. It shows as a pale strip at y≈302–321 behind the rocks.
   - The `pines` coplanar-face `Surfaces:` note (y=4.30) is still unfixed.
2. **Plays as DESIGN.md says: 7.**
   - `M` switched to local, and the arrow keys moved the wolf (`wolf.state` "ctrl", pose "walk").
   - I did not replay the solo loop this session. Clover, win and lose were verified in session 4.
3. **The clip moment: 8.**
   - I did not re-run the pounce sheet this session, so this carries over from the session 4 verdict.
   - The reveals ("HUMAN! GOTCHA" with the PLAYER 1 tag, and "AI SHEEP / BITE WASTED / baa?") were readable then.
   - The wolf's shrug is still weak.
4. **Looks like refs/01.jpg: 7.**
   - `sea`, `cliff`, `cloud` ×34, `pines*` and the meadow all show from the play camera.
   - The wolf is now tapered-limb and brown, but it is huge and reads as a brown lump lying beside `wolf-rock`, not crouched on it.
   - `wolf-rock` is 0.21%.
   - The sand is still under 1%.
5. **Solo is fun and fair: 7.**
   - The `SUSPICION` bar, clover icons, bites and the "Shift run (suspicious!)" hint are all there.
   - The 3 `clover` objects are 0.15% of the frame, so they are hard to find.
   - There is still no tutorial text.
6. **Local 2-player: 6.**
   - The wolf walks, and `aim` is now visible as a faint orange ring under the wolf at (616–638, 500–510).
   - It is only 0.0047% of the frame and is lost in the flock.
   - `reach` is still not found by the ID image.
   - The wolf-player's target is not clear.
7. **`window.__game`, no build, ~100 sheep at 60 fps: 7.**
   - `__game` works.
   - `perf` reads 135 ms on SwiftShader, with host load 3.2. That is not a fault.
   - 68 draw calls and 102k triangles.
8. **Juice: 7.**
   - Sounds and captions were seen in session 4.
   - Sheep head bob is not visible at the play distance.
   - The wolf animation is only walk, crouch and leap.
9. **Works at any window size, HUD readable: 4.**
   - The `viewports` check was run for the first time this session.
   - On phone (390×844) `#hud` and `#mode` overlap: the "2:59" timer and the clovers row are covered by the mode panel.
   - The phone canvas is also pillarboxed, with black bars left and right, and the picture is cropped to the middle of the meadow.
   - Tablet is fine.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The phone HUD overlap and pillarbox are real faults.
    - The coplanar `pines` face and the thin sand strip are still open.

**Next:**
1. **Fix the phone and narrow-window layout.**
   - Stack `#hud` and `#mode` so they don't overlap, for example by shrinking `#mode` or hiding its text under ~600 px wide.
   - Make the canvas fill the window instead of letterboxing, and pull the camera back or widen the FOV on portrait.
   - To check, run `look` with `viewports: ["phone","tablet","laptop"]`. The phone cell should show 0 overlap and no black bars.
2. **Put the wolf on its rock and shrink it.**
   - The wolf's body is wider than the `wolf-rock` (0.21%) and sits next to it. Scale the wolf down by ~30% and raise the crouched pose to the rock's top, y≈rock top.
   - Add a visible eye and snout colour (a pale muzzle, a dark nose) so it reads as a wolf and not a brown boulder.
   - To check, run `look` with `target: "wolf"`, then the opening `look`. `wolf-rock` should sit under the wolf, not beside it.
3. **Make the local aim target and the sand beach read.**
   - Make the `aim` ring bigger (about 3–4 units) and bright, with a pulse or a tint on the targeted sheep, and keep `reach` visible during the leap.
   - Separately, widen the sand wedge past 1%. The strip is hidden behind rocks at y≈302–321, so lower the far `ground` edge or move the rocks off the shore.
   - To check, run `interact` with local mode and ArrowRight ×30. `aim` should be above 0.05% in the list.
   - Run `look` with `sample` at (640,310) and `sand` above 1%.

SCORE: 6.6
