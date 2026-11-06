The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 4

**Judge verdict, session 4**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: the sky at (640,20) is #b7dae1, within 40/255 of #97edfe.
   - Check 2 holds: mid-screen is #9abe51 against #90c62b.
   - Check 3 holds: `sheep*` is ×101 and `wolf` is listed on screen at 1.6%.
   - Check 4 holds: `#hud` has 0 cut off, and there is no `Lighting:` or `Surfaces:` line.
   - The palette's sand #c5d6a2 is barely there: `sand` is 0.054%.
   - The brown-grey `wolf` differs from LOOK.md's "wolf grey #757269". The builder did that deliberately, so I count it as a decision, not a fault.
2. **Plays as DESIGN.md's Core loop and Controls say: 7.**
   - Clover collection now verified. I put the player at (14,-5) and held E for 240 frames. `cloverProgress.0` reached 1.01 and `clovers` went 0→1 at frame 145. The powerup sound fired.
   - The `lose` screen ("YOU WERE THE EAGEN... EATEN") is seen and readable, with an "R to play again" prompt.
   - The `win` screen was seen last session. I did not press R after either end screen.
3. **The clip moment: 8.**
   - Both reveals are seen in one sheet. "HUMAN! GOTCHA / PLAYER 1 has been found." has the red PLAYER 1 tag and a caption. "AI SHEEP / BITE WASTED / baa?" shows the bite counter dropping to 2.
   - The wolf's leap fills the frame.
   - The leap legs are still flat brown boxes, and the leap pose looks like a slab.
   - The wolf shrug on the AI reveal is not clearly readable.
4. **Looks like refs/01.jpg: 6.**
   - Seen from the play camera: `sea`, grey `cliff` (1.4%), puffy `cloud` (4%), `pines*` and the meadow.
   - The sand beach is still just a sliver: `sand` is 0.054% of the frame, on the horizon at about y=316–321.
   - The wolf now reads as brown, beside its `wolf-rock`, but it still looks like a lump among the sheep and not like a wolf crouched on a rock.
5. **Solo is genuinely fun and fair: 7.**
   - The `SUSPICION` bar, clover pickup, and the win, lose and R-restart prompts all exist.
   - The 3 `clover` stars are still only 0.12% of the frame.
   - There is no tutorial or hint on what raises suspicion beyond the HUD line "Shift run (suspicious!)".
6. **Local 2-player: 6.**
   - `M` switched the mode, the arrows moved the wolf, and Enter fired the pounce (`pounce.ph` "leap", with a sting sound).
   - The `aim` and `reach` objects are Hidden by the game. I never saw the targeting indicator, so "pounce targeting is clear" is not shown.
   - The leap zoom is so large that the wolf fills 16% of the frame, and the wolf player cannot see who is being targeted.
7. **`window.__game`, no build, ~100 sheep at 60 fps: 7.**
   - `__game` works, with `observe`, `act` and `setState`.
   - `perf` reads 133 ms on a software renderer with host load 5.8. This is not scored down. There are 75 draw calls and 102k triangles, which is reasonable.
8. **Juice: 7.**
   - Sound events seen: munch, baa, baa2, wind, powerup, boom, stab1–3.
   - Captions are funny: "Even in nature, nobody blends in forever." and "A completely innocent sheep. Awkward."
   - The wool burst and `wool` particles show.
   - The grazing head bob is not visible at the play distance, and the wolf animation is just a crouch and a leap.
9. **Works at any window size, HUD readable: 6.**
   - At 1280×800 the HUD is fine, with 0 cut off. `viewports` was not run, and `#mode` is wide (327 px).
10. **Faults: 7.**
    - There are no console errors, no `Never visible` object and no `Lighting:` or `Surfaces:` lines.
    - The leap legs are still boxy, and the sand sliver is still a fault against the brief.
    - Two sheet cells show 15–16% near black, which is the dark letterbox bars.

**Next:**
1. **Sand beach (asked again, the fourth time).**
   - The sand `ring` is hidden behind `ground` or the hill.
   - Raise the sand ring (r46–62) a little above the `sea` plane, and lower the `ground` edge toward the water so a clear #c5d6a2 band shows between the meadow and the sea in the opening look.
   - To check, `look` with `sample` at (640,300–320) and see sand colour. `sand` should be above 1% in the object list.
2. **Round the wolf and make it read as a wolf (asked again).**
   - Replace the box legs in the leap with capsule or cylinder limbs.
   - Add a visible snout, tail and eye.
   - Also lift the crouched wolf onto `wolf-rock` so it sits on top, not beside.
   - To check, run `look` on `target: "wolf"`, and run the `pounce` sheet cell again.
3. **Local mode targeting and the `viewports` check.**
   - Show the `aim` and `reach` objects (currently hidden) as a ring on the sheep under the wolf's cursor during the Local steps, and keep the camera pulled back so the wolf player can see the flock.
   - To check, `interact` with Local, ArrowRight ×30 and `look: true`; `aim` should show as a ring.
   - Then run `look` with `viewports: ["phone","tablet","laptop"]` to confirm the `#hud` and `#mode` panels shrink and don't overlap.

SCORE: 6.7

## Iteration 5
**Did**: `gh` shoreline made gentler (`sm(-8,7,d)`), ground sand tint widened (cy<1.1), `sand` ring now r44-72 at SEA+0.12 in #c5d6a2; wolf leg boxes replaced by tapered `CylinderGeometry` in `W.legs`.
**Saw**: opening look: `sand` 0.27% (was 0.054%), sample at (640,310) #ced5ba / (640,320) #c1cea8 (sand-coloured); `wolf` ×5 1.5%, `cliff` 1.5%, `sheep*` ×100, no Never-visible, no errors. Surfaces note: `pines` two faces in one plane at y=4.30. No `perf`.
**Next**: (1) sand is still thin from the play camera (needs >1%): lower the far-edge of ground further or add a wider shore wedge; (2) lift the crouched wolf onto `wolf-rock`; (3) Local-mode `aim`/`reach` ring check and `viewports` check, both skipped.
**Open**: wolf-on-rock, Local aim ring, viewports not done this session; the pines coplanar-face warning is unfixed.
