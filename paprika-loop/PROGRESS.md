# Progress

The request is in PROMPT.md. Each session of the loop appends one section here: a builder's `## Iteration n` (Did, Saw, Next, Open) and the judge's `### Judge n` (its scores, Next). LATEST.md holds the last of each, rewritten by the loop after every session; the next builder reads the latest Judge's Next there first.

## Iteration 1
**Did**: A page already existed (index.html, game.js, fx.js). Changed in place: camera in `updateCamera` now lower (15·zoom+3 up, 32·zoom+6 back, lookAt z-8) with FOV 50 so sea/sky horizon show; sky dome and `scene.fog` colours moved toward #97edfe/#a6ecfb; wolf scale 1.9→2.8 and `ROCK.top` 1.9→3.0 (it was sunk inside the rock, 0.008% of screen); `#reveal` top 9vh→17vh so "HUMAN!" clears the cinema band; `#tag` moved below the card when it would overlap the subtitle.
**Saw**: opening look: ground 51%, sky 12%, sea 4.8%, pines ×191, sheep ×101, wolf listed (~0.07%, still small), no Never-visible, no errors. Sea is only a thin strip behind the pines; no sand beach/cliffs/cloud clearly visible; sheep start in a tight clump near centre, not spread like refs/01.jpg. Pounce (`act pounce human`) gives leap → GOTCHA card + PLAYER 1 tag + captions, reads well. Did not run perf (software GPU).
**Next**: (1) make the island read like refs/01.jpg: lower forest ring so sea, sand beach and grey cliffs show at the back/sides, add visible clouds in frame; (2) spread the starting flock across the meadow and put the wolf rock closer to the camera/left foreground so the wolf is clearly visible at opening; (3) play solo for suspicion readability and test the AI SHEEP reveal and Local mode.
**Open**: Wolf pose in leap has boxy legs at scale 2.8; AI SHEEP reveal and local mode not re-verified this session.

### Judge 1

**Judge verdict, session 1**

1. **Looks as LOOK.md says: 6.** Checks, each read off the opening look:
   - Sky: `sample` at (640,20) is #bfdce2 against #97edfe, so the red channel is off by 40, right on the limit. It is washed out by haze and `fog`.
   - Grass: it dominates at 49% of the frame, and the bottom of the frame samples #448613. The mid-screen sample landed on a sheep, so it is untestable.
   - Sheep and wolf: `sheep*` ×101 are visible and `wolf` is listed. The wolf is only 0.096% of the frame, [404,337,493,394], so it does not stand out as the subject.
   - HUD: `#hud` is readable top-left, with no `Lighting:` or `Surfaces:` fault lines.
2. **Plays as DESIGN.md's Core loop and Controls say: 6.**
   - `interact` with KeyD moved `player.x` to 1.85, and `susp` rose to 0.35 with `topSusp.player` true, so suspicion responds.
   - The caption "Observe: a sheep that jogs. Highly irregular." is funny and clear.
   - Not verified this session: clover grazing with E, the win screen, the lose screen, and local mode.
3. **The clip moment: 6.**
   - `act pounce ai` gave `wolf.pose` "leap", `pounce.ph` "leap" and sound booms and stabs.
   - The wolf is now huge in frame at 5%, which is funny, but the leap pose has boxy legs, so it looks like a gray log.
   - The AI SHEEP card, "baa?" and the wolf shrug were not visible at 50 frames after the pounce. The reveal timing or visibility is unconfirmed.
   - The camera punch-in lands on a sheep clump, so the target sheep is not clear.
4. **Looks like refs/01.jpg: 4.**
   - The `sea` is 4.8% of the frame, a thin strip behind `pines*` ×191.
   - No sand beach or visible grey cliffs show, only `rocks*` and a hill.
   - No puffy clouds are visible.
   - `wolf-rock` is 0.32% at mid-left, so the crouched wolf is barely readable.
5. **Solo is fun and fair: 5.** Suspicion shows in the `SUSPICION` bar and captions, and 3 `clover` objects exist but are tiny (0.13%) and hard to find. Win and lose screens were not checked.
6. **Local 2-player: 4.** Not tested this session (M toggle, Enter pounce, aim and reach indicators).
7. **`window.__game` convention, no build step, ~100 sheep at 60fps: 7.**
   - `__game` works, the page starts on load, and `sheep*` is ×101.
   - `perf` reads 141 ms per frame, 122 ms of it the frame's code. The host is a software renderer, so that is not a GPU signal, but 122 ms of JS suggests CPU-side per-sheep updates or skinning and needs a check.
8. **Juice: 6.** Sound events fire (boom, stab1–3), captions are in a documentary voice, and there are sheep heads and tufts. Not confirmed: grazing bob, hops, the wolf animation beyond the leap, and the baa, munch and wind sounds.
9. **Works in any window size, HUD readable: 6.** `#hud` and `#mode` have 0 overlap and 0 cut off at 1280×800. During the pounce the cinema band covers the HUD top (TIME and CLOVERS are clipped). `viewports` was not run.
10. **Faults: 6.** There are no console errors and nothing is `Never visible`. The frame cost is unexplained, the HUD is clipped by the cinema band, and the sea and clouds are missing.

**Next:**
1. Make the island read like refs/01.jpg. Thin and lower the `pines*` ring at the back and sides so the sea (raise it above 15% of the frame), a sand beach strip (#c5d6a2) and grey cliffs show. Add 4–6 white low-poly `clouds` in the upper frame. Check with a plain `look`: sea over 12%, sand and cliffs listed, clouds listed.
2. Make the wolf the subject at the opening. Move `wolf-rock` toward the camera or left foreground and enlarge it, so `wolf` is over 1% of the frame at opening. Spread the starting flock across the meadow instead of one clump. Fix the boxy leap pose so the wolf reads as a wolf, and re-run `act pounce ai` with a `look` to show the AI SHEEP card, "baa?" and shrug 1–2 s later.
3. Check the CPU cost with `perf` `variants` that hide `sheep*`, `tufts*` and `pines*`, because 122 ms of JS a frame is suspicious. Then play local mode with `interact` (M, Enter, arrows), the win and lose screens, and E grazing on `clover`. Keep the `#hud` clear of the cinema band during the pounce.

SCORE: 5.6

## Iteration 2
**Did**: `gh()` mountains lowered/moved to the sides (9 at 34,-30; 7 at -36,-28) and `ridge` 5.5→2.5 so the sea shows behind the meadow; `pines` 330→300 with 90% of back-centre (z<-20, |x|<30) dropped; sand colour band widened (cy<0.9) in ground vertex colours; `ROCK`/`wolf` moved to (-10, 3) in the left foreground, wolf root scale 2.8→3.6; `reset()` flock now 16 clusters over polar(2,26) instead of 9 over (2,22); `#hud` and `#mode` z-index 10 so the cinema bars no longer clip them.
**Saw**: opening look: sea 10% (was 4.8%), sky 13%, ground 46%, pines ×149 14%, wolf 0.66% [369,389,510,498] (was 0.096%) and reads as a grey wolf crouched by its rock, sheep ×101 8% spread over the meadow, no Never-visible, no errors. `act pounce ai`: AI SHEEP card, "baa?" bubble, shrug pose and caption all show at 110 frames. Leap/shrug legs are still boxy. No sand beach or cliffs visibly listed; clouds not in frame. perf not run.
**Next**: (1) lower the camera pitch slightly or push sea/sand into frame (visible sand beach strip, grey cliffs, clouds in the top band); (2) `perf` with variants hiding sheep*/tufts*/pines* to explain the 122 ms JS frame; (3) play local mode (M, Enter, arrows), win/lose screens, E grazing on clover; round off the wolf legs in the leap/shrug pose.
**Open**: Clouds spawn z -170..10 at y 40-62 and are not seen in the opening frame. Local mode, win/lose screens and clover grazing still unverified.

### Judge 2

**Judge verdict, session 2**

1. **Looks as LOOK.md says: 6.**
   - Sky: `sample` at (640,20) is #bfdce2, still a hazy pale blue. The sea band (10%) is clean.
   - Grass: `ground` is 46% and the bottom of the frame samples #a6ca4a, bright and low-poly.
   - Sheep and wolf: `sheep*` ×101 are spread over the meadow. `wolf` is 0.66% [369,389,510,498], crouched by `wolf-rock`, so it is readable but small.
   - HUD: the `#hud` panel is clear. There are no `Lighting:` or `Surfaces:` fault lines.
2. **Plays as DESIGN.md's Core loop and Controls say: 6.**
   - KeyD moved `player.x` to 1.9, and E set `player.grazing` true.
   - Grazing is recorded in `flock.graze` and `susp` stays low, which is the intended blending.
   - Clover collection, the win screen and the lose screen are still not verified.
3. **The clip moment: 8.**
   - The sheet shows a slow-mo leap with the wolf big in frame.
   - The HUMAN reveal shows "HUMAN! GOTCHA", the "PLAYER 1" tag and the caption "Even in nature, nobody blends forever."
   - The AI reveal shows "AI SHEEP", "BITE WASTED", the "baa?" bubble and the caption "Bite wasted. The documentary crew looks away."
   - The leap pose still has boxy legs. The `human` and `ai` frames cover the HUD less than before.
4. **Looks like refs/01.jpg: 5.**
   - `sea` is 10% and reads as a flat blue band behind the pines.
   - No sand beach strip or grey cliffs show in the opening look, and no `clouds` are listed.
   - The pines are thinner on the left and right, but the picture is still mostly meadow.
5. **Solo is fun and fair: 5.**
   - The `SUSPICION` bar and captions are present, and `topSusp` is read back.
   - The 3 `clover` objects are 0.14% of the frame and hard to find.
   - The win and lose screens and restart are unchecked.
6. **Local 2-player: 5.**
   - M switches to "LOCAL 2-PLAYER". The HUD drops CLOVERS and shows the P1 and P2 key hints.
   - The wolf's `aim` and `reach` indicators were not seen, and the Enter pounce was not played.
7. **`window.__game`, no build step, ~100 sheep at 60fps: 6.**
   - `__game` works and `sheep*` is ×101.
   - `perf` reads 130.8 ms a frame, 119 ms of work, 29 draw calls and 99k triangles. The host load is 5.1 on 8 cores and the renderer is software, so the figure is partly noise.
   - The `hide` variants matched no names, so they were not run. The sheep and pines are named with an asterisk, so the real names are needed.
8. **Juice: 7.**
   - The captions are consistently funny.
   - The reveal cards and the wool burst show.
   - Sound events were not rechecked, and the grazing bob was not visible.
9. **Works at any window size, HUD readable: 6.**
   - `#hud` and `#mode` have 0 cut off.
   - `viewports` was not run.
10. **Faults: 6.**
    - There are no console errors, and no `Never visible` object.
    - The leap legs are boxy.
    - The sand beach, cliffs and clouds from refs/01.jpg are still missing.
    - The frame cost has not been explained.

**Next:**
1. Make the scenery match refs/01.jpg. This is the lowest score and it is asked for again from Judge 1 (asked again). Raise the camera's look-at slightly so the horizon and sea sit higher in the frame. Add a visible sand strip (#c5d6a2) where the meadow meets the `sea`, and a grey cliff face on the left or right. Pull the `clouds` inside the opening frustum, around y 25–35 and z -60 or nearer. A plain `look` then lists `clouds` with a share above 1%. `sample` at the shore row shows sand rather than green.
2. Explain the 130 ms frame (asked again). Use the real object names that `look` lists, such as `sheep`, `pines` and `tufts`, or hide by name with `perf` `code` variants. Expect the cost to be CPU per-sheep updates. Move the per-sheep matrix and skinning work to every 2nd frame or into one loop. One `perf` call with the variants should show the median dropping well under 60 ms with the sheep hidden.
3. Play the parts nobody has verified. Use `interact` with `state` set so the player stands on a `clover`, hold E to completion and check the `CLOVERS` count. Then set the round near 0:00 for the win screen, and run Local mode with Enter to pounce. At the same time make the wolf bigger at the opening (above 1.5% of the frame) and round the leap and shrug legs so the pose reads as a wolf.

SCORE: 6.0

## Iteration 3
**Did**: `updateCamera` now `lookAt(cam.x, 5, cam.z - 8)` (was y 0) so the horizon/sea sit higher; `clouds` respawn at x ±110, y 27-38, z -150..-75 (was y 40-62, z -170..10), so they are in the opening frame.
**Saw**: opening look: `cloud` ×35 3.2% [0,0,1273,122], sky 21%, sea 9.7%, ground 36%, pines ×146 13%, wolf 0.68%, sheep ×101 7.9%, no Never-visible, no errors. `perf` (software GPU, host load 6): baseline 137 ms, 68 draw calls, 102k tris. Hiding pines/tufts/rocks/trees/bushes → 82 ms (−39%); hiding sheep, or shadows off → no clear change. So the frame cost is mostly the SwiftShader raster of scenery fill/triangles, not per-sheep JS. `cloud` is 46 draw calls (one mesh per puff) and could be merged.
**Next**: (1) sand strip (#c5d6a2) and a grey cliff face still not visible against refs/01.jpg: the shore is hidden behind the pines; thin pines near the sea or move the shore into view; (2) cut `tufts` (11.7k tris) and `pines` cost: fewer/lower-detail instances, merge cloud puffs into 1 mesh per cloud; (3) still unplayed: clover grazing to completion, win/lose screens, Local-mode Enter pounce; make the wolf bigger (>1.5%) and round the leap legs.
**Open**: Sand/cliffs missing. Win/lose, clover collect, Local pounce unverified. Frame ms is software-render noise, no real-GPU number.

### Judge 3

**Judge verdict, session 3**

1. **Looks as LOOK.md says: 6.**
   - Sky is 21%, `sea` 9.7% and `ground` 36%. The meadow is bright and low-poly, with no `Lighting:` or `Surfaces:` lines.
   - `cloud` ×35 is now 3.2% and puffy clouds show in the opening frame. That is the one visible gain since session 2.
   - `wolf` is 0.68% [366,473,508,584], crouched by `wolf-rock`. It is still small, and it reads as a grey lump among the white sheep.
   - The `pines*` ×146 (13%) wall the left and right edges.
2. **Plays as DESIGN.md's Core loop and Controls say: 5.**
   - I put the player at (-7, 9) by `state` and held E for 240 frames. `player.grazing` turned true, but `clovers` stayed 0 and `cloverProgress.0` stayed 0.
   - I did not stand on a `clover` position, so this proves nothing about collecting. It also leaves unverified whether the player can find and use a patch.
   - Setting `state: {t: 1}` only moved the clock to 3.02. The win and lose screens are still not seen, so they are unverified for the third session.
3. **The clip moment: 7.**
   - The slow-mo leap fills the frame, with the wolf stretched across the sheep and the nature-documentary caption below it. This works.
   - My `pounce` sheet cells showed only the leap and the captions "Something about that sheep is... off." and "That sheep walks like it has somewhere to be." Both are shown before the verdict. I did not see the reveal cards ("HUMAN! GOTCHA", "AI SHEEP") this session. Session 2 saw them.
   - The wolf in the leap is a dark grey slab with boxy front legs.
4. **Looks like refs/01.jpg: 5.**
   - The `sea` band and the clouds are now there.
   - The sand beach and the grey cliffs are still missing, for the third session. The shoreline is hidden behind the `pines*` and the sea meets the hill directly.
   - The wolf is not prominent, so "wolf crouched on its rock" does not read at a glance.
5. **Solo is genuinely fun and fair: 5.**
   - The `SUSPICION` bar is present, and the player's blending (`flock.graze`) responds.
   - The 3 `clover` objects are only 0.05–0.15% of the frame and hard to find. There is no marker or hint.
   - The win and lose screens and restart are unseen.
6. **Local 2-player: 5.**
   - Session 2 saw the mode toggle. I did not play the Enter pounce, and the `aim` and `reach` indicators were hidden and never seen.
7. **`window.__game`, no build, ~100 sheep at 60 fps: 6.**
   - `__game` works and `sheep*` is ×101.
   - `perf` reads 148 ms median with 69 draw calls and 102k tris. The host load is 4.8 and the renderer is SwiftShader, so this is not a real-GPU number and is not scored down.
   - The `cloud` meshes are 46 draw calls and `tufts*` are about 11k tris, which are reasonable to trim.
8. **Juice: 7.**
   - Sound events fired: wind, baa and baa2.
   - The captions are funny. The wool burst and the caption cards work.
   - The grazing head bob is not visible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - `#hud` and `#mode` have 0 cut off at 1280×800. `viewports` was not run.
10. **Faults: 7.**
    - There are no console errors and no `Never visible` object.
    - The scenery gaps from refs/01.jpg are still there. The leap legs are still boxy.

**Next:**
1. **Sand strip and grey cliffs (asked again, third time).** The shore is behind the `pines*`. Thin or remove the `pines*` in the back 25% of the island, between the camera's far edge and the `sea`. Put a sand ring mesh (#d9c98a) at the shoreline, and one grey low-poly cliff block on the right at the back. Search for it in an asset library: "low poly cliff rock". To check, `look` with `sample` at (640, 215) and (640, 235). Sand shows as #d9c98a-ish instead of green or blue, and `look` lists a `cliff` or `sand` object above 1%.
2. **Make the wolf big and readable on its rock (asked again).** The wolf is 0.68% now. Raise it above 1.5% by scaling `wolf` and `wolf-rock` ×1.6, or move the opening camera closer and lower. Give the wolf a lighter or warmer colour such as brown-grey #8a7560 so it stands out from the white sheep. Round the leap legs by replacing the boxes with capsule or cylinder limbs. The `look` list should show `wolf` above 1.5%, and the `pounce` sheet pose should read as a wolf.
3. **Play what nobody has verified, in order (asked again).**
   - Read the real `clover` positions with `eval` (`window.__game` or the scene's `clover` objects). Use `interact` to put the player exactly on one, hold E, and expect `clovers` to go to 1. Add a glowing ring or sparkle on each `clover` so it is findable; they are 0.05% of the frame now.
   - Add an `act` action for the end of the round, such as `{action:"win"}` and `{action:"lose"}`. Then `look` at both screens and the R restart.
   - Play the Local-mode Enter pounce with the `aim` indicator visible, and show it in a `sheet` moment.

SCORE: 6.0

## Iteration 4
**Did**: `wolf` scale 3.6→5.2 and recoloured brown-grey (#8a7560, light #c9b393); added `cliff` (grey icosahedron at 34,5,-44) and `sand` ring (r46-62 at sea level) next to `sea`; pines at the back (z<-20) now 97% culled so the horizon is open; clover star markers are larger (scale 2, y 2.2) and always faintly visible (35%+ opacity, full when near); `act({action:'win'|'lose'})` added to end the round for checks.
**Saw**: opening look: `wolf` ×6 1.6% (was 0.68%), `cliff` 1.4%, `sand` 0.05% (thin sliver, still tiny), clover ×3 0.12%, pines ×137 12%, no Never-visible, no errors. `{action:"win"}` shows the "THE FLOCK WINS / YOU BLENDED IN" band, readable. No `perf` run this session.
**Next**: (1) sand is only a sliver: widen/raise it where the hill meets the sea (the `ground` mesh hides it); (2) play clover grazing on a real clover position (14,-5), (-3,15), (-19,8) with E held, and the `lose` screen and Local Enter pounce, still unverified; (3) round the leap legs (capsules instead of boxes), merge cloud puffs.
**Open**: leap legs still boxy; clover collection, lose screen and Local pounce not played this session; no perf number.

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

## Iteration 6
**Did**: index.html `@media(max-width:640px)` shrinks `#hud`, moves `#mode` to bottom-right and hides its `small` text, moves `#toast` low; game.js camera fov widens when aspect<1.4 (keeps ~1.4 horizontal view, max 80); `W.root` scale 5.2→3.8; `wolf-rock` mesh scaled 1.3 so the crouched wolf sits on it.
**Saw**: opening look: `wolf-rock` 0.64% (was 0.21%), `wolf` ×4 0.52%, 0 overlap in HUD, no Never-visible; phone cell: HUD and mode panel no longer overlap, wider meadow view (the black side bars in the phone cell look like the montage's cell layout, canvas is 390 wide). `sand` still 0.27%; `pines` coplanar note at y=4.30 unfixed. No `perf`.
**Next**: (1) bigger bright `aim` ring/target-sheep tint in Local mode, keep `reach` visible in leap; (2) widen sand beach >1% (lower far ground edge); (3) fix `pines` coplanar face; add a tutorial hint for clovers.
**Open**: aim ring, sand, pines face not done; not re-played this session.
