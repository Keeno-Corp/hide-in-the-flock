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

### Judge 6

**Judge verdict, session 6**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are listed on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off, and there is no `Lighting:` line.
   - `sand` is still 0.27% [405,302,741,321]. It is a pale line behind the rocks.
   - The `pines` coplanar face at y=4.30 is still unfixed.
2. **Plays as DESIGN.md says: 7.**
   - I did not replay the solo loop or `interact` this session. This carries over from session 4. The `SUSPICION` bar, clover icons and bite dots show in the HUD.
3. **The clip moment: 7.**
   - The AI case reads well: a "BITE WASTED / AI SHEEP / Just a sheep. Bite wasted." banner, a "baa?" bubble, the wolf's bite dots dropping to 2, and a documentary caption ("A completely innocent sheep. Awkward.").
   - The wolf at the pounce is a giant, flat-shaded brown slab whose arms stick out stiffly sideways. It reads as a T-pose, not a leap or a shrug.
   - I saw the human-reveal banner (PLAYER 1 tag) only in earlier sessions. At frame 50 of the human pounce it had not shown yet. The pounce build-up is slow and the wolf covers half the frame, which makes the clip clumsy.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and bright meadow all show.
   - `wolf-rock` is up to 0.64%, but the wolf is a brown lump on its right side, not clearly crouched on top.
   - The beach is not a visible wedge.
5. **Solo is fun and fair: 7.**
   - The suspicion bar and the "Shift (suspicious!)" hint are there.
   - The 3 `clover` objects are 0.15% of the frame, and there is no tutorial text to point at them.
6. **Local 2-player: 6.**
   - `aim` and `reach` are "Hidden by the game" in the idle look. I did not test them this session.
   - The aim ring is still not clearly readable, which is the same open item from Iteration 6.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` works, with its keys, actions and `observe`.
   - `perf` reads 125 ms with 67 draw calls and 102k triangles. That is SwiftShader only, so it is not a fault.
8. **Juice: 7.**
   - Captions, banners, the "baa?" bubble and the wolf's walk, crouch and leap are all there.
   - Sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The Iteration 6 fix (smaller HUD, `#mode` moved) was seen only as a phone cell in Iteration 6, and I did not re-run `viewports`.
   - The laptop-size HUD is fine.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar face and the thin sand strip are still open.
    - The wolf is oversized and stiff in the pounce.

**Next:**
1. **Make the sand beach a real wedge, and fix the `pines` coplanar face (asked again).**
   - Beach: lower the far `ground` edge, or add a sand ring mesh at the shoreline in front of the rocks, so `sand` is above 1%.
   - Pines: offset the duplicated faces at y=4.30 by 0.001 or delete the hidden one.
   - To check, run `look` with `sample` at (640,310). It should read sand-coloured, not #ced5ba, and `sand` should be above 1%. The `Surfaces:` line should be gone.
2. **Rework the wolf's pounce pose and size.**
   - Make the wolf about 40% smaller in the pounce. Fold the limbs forward in the leap (front legs forward, hind legs back) so it does not read as a T-pose. Give it a pale muzzle and a dark nose.
   - Add a clear shrug on a miss, with shoulders up and the head tilted.
   - To check, run `look` with a `sheet` of the pounce at frames 20, 40 and 70 for `human` and `ai`. The wolf should fill less than a third of the frame, with a visible leap arc and the banner readable.
3. **Make the local-mode `aim` ring and the clovers readable.**
   - Make the `aim` ring 3–4 units wide, bright, pulsing, with a tint on the targeted sheep. Keep `reach` visible during the leap.
   - Add a "find the clovers" hint line and a faint glow or sparkle on each `clover`.
   - To check, run `interact` with `M` and ArrowRight ×30, with `look: true`. `aim` should be above 0.05% in the list. The `clover` share should rise above 0.3%.

SCORE: 6.7

## Iteration 7
**Did**: game.js: `sand` ring raised to SEA+0.75 and lightened (0xe3dba6); ground vertex sand tint widened (cy<1.5); `aim` ring now RingGeometry(1.5,2.1), brighter red, opacity pulses 0.45–0.95; solo hint says "find the 3 clovers, hold E".
**Saw**: opening look: `sand` 0.43% (was 0.27%) [362,298,794,321], sample (640,310) #dbd8be; no Never-visible, HUD 0 overlap; `pines` coplanar y=4.30 line still there. Aim ring not played in Local this session (only hidden-state seen).
**Next**: (1) rework wolf pounce pose/size (smaller, folded limbs, pale muzzle); (2) fix `pines` coplanar face (offset the cone/trunk merge in pineGeo); (3) clover glow/sparkle and verify `aim` via interact M + ArrowRight.
**Open**: sand still a thin strip (the camera sees the shore far away; consider lowering far ground edge); wolf pounce untouched; no perf run.

### Judge 7

**Judge verdict, session 7**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are listed on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - `sand` is 0.43% [362,298,794,321], and the sample at (640,310) is #dbd8be. The beach is still a pale strip behind the rocks, not a wedge.
   - The `Surfaces:` line for `pines` at y=4.30 is still there. It has now been open for 3 sessions.
2. **Plays as DESIGN.md says: 7.**
   - I did not run `interact` this session. The solo HUD shows the `SUSPICION` bar, 3 clover icons, 3 bite dots and the hint "find the 3 clovers, hold E".
3. **The clip moment: 6.**
   - The AI case reads: "BITE WASTED / AI SHEEP / Just a sheep. Bite wasted.", a "baa?" bubble, bite dots dropping to 2, and the caption "A completely innocent sheep. Awkward."
   - The wolf at the pounce is still huge and brown. In human20 and human50 it is a long flat slab with stiff arms sticking out sideways.
   - In ai50 the camera is inside the wolf. Two black boxes (legs or ears) fill the middle of the frame and nothing else reads.
   - In ai90 the wolf is a T-pose with arms out, with no shrug.
   - In the human case the banner and PLAYER 1 tag had not shown by frame 50.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and the bright meadow all show.
   - `wolf-rock` is 0.64% with the wolf as a brown lump beside it, not crouched on top.
5. **Solo fun and fair: 7.**
   - The suspicion bar, the hint line and win/lose/restart keys are present.
   - The 3 `clover` objects are 0.15% of the frame, with no glow.
6. **Local 2-player: 6.**
   - `aim` and `reach` are "Hidden by the game" in the idle look.
   - The Iteration 7 aim ring change (RingGeometry 1.5–2.1, pulsing) has not been seen in play for two sessions running.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` has its keys and actions, and `observe` works.
   - `perf` reads 150 ms with 68 draw calls and 102k triangles on SwiftShader, so there is no signal. Host load is 2.9 on 8 cores.
8. **Juice: 6.**
   - The captions, banners, "baa?" bubble and wolf leap are there.
   - The wolf animation is crude, and sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The laptop-size HUD is fine. I did not run `viewports` this session.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar face, the thin sand strip and the oversized wolf are still open.
    - Iteration 7 left the wolf pounce untouched, which was the top Next item.

**Next:**
1. **Rework the wolf's pounce: size, pose and camera (asked again).**
   - Scale the wolf to about 60% in the leap and move the pounce camera back, so the camera is not inside it (ai50).
   - Fold the front legs forward and the hind legs back. Add a pale muzzle and a dark nose, and a shrug on a miss (shoulders up, head tilted).
   - To check, run `look` with a `sheet` of `pounce` `human` and `ai` at frames 30, 50 and 90. The wolf should fill less than a third of the frame with a visible arc, no black boxes at frame 50, and the human banner and PLAYER 1 tag readable by about frame 90.
2. **Fix the `pines` coplanar face and make the beach a real wedge (asked again).**
   - Pines: in pineGeo, offset the duplicate cone and trunk faces at y=4.30 by 0.01, or delete the hidden face.
   - Beach: lower the far `ground` edge near the shore, or widen the `sand` ring toward the camera.
   - To check, run `look`: the `Surfaces:` line is gone and `sand` is above 1%.
3. **Make the local-mode `aim` ring and the clovers readable (asked again).**
   - Add a faint pulsing glow or sparkle on each `clover`.
   - To check, run `interact` with `M` then ArrowRight ×30 and `look: true`. `aim` should be above 0.05% in the list. In a plain `look`, the `clover` share should rise above 0.3%.

SCORE: 6.5

## Iteration 8
**Did**: game.js drawWolf: `W.root` scale eases to 2.4 in leap/land/shrug (3.8 otherwise); leap legs folded (front -1.1, hind 1.2, scale.y 0.6); shrug arms less stiff (rotation.z 0.5+, body pitch -0.15). updateCamera pounce zoom 0.55→0.3 so the camera stays back. pineGeo trunk cone shortened to 0.95. `sand` ring inner radius 44→38.
**Saw**: pounce sheet (h50,h90,a50,a90): wolf now a readable mid-leap shape in h50 (small, arc visible), no black boxes inside the camera in a50; GOTCHA/PLAYER 1 tag and AI SHEEP/"baa?" readable at 90. Opening look: `sand` still 0.43% [362,298,794,321] (ground hides the wider ring); `pines` coplanar y=4.30 line still listed (not the trunk); no Never-visible, HUD 0 overlap. perf not run.
**Next**: (1) find the real pines coplanar plane (y=4.30 over 17×73 units is likely the top of the instanced cones / the merge of cone bases: nudge cone y by 0.01 per tier); (2) make the beach visible: lower the `ground` vertex heights near the shore (cy<1.5) or raise `sand` above ground; (3) clover glow/sparkle and verify `aim` via interact M + ArrowRight.
**Open**: wolf in a90 shrug still arms-out-ish and brown; clover glow and aim ring unseen in play; beach unchanged.

### Judge 8

**Judge verdict, session 8**

1. **Looks as LOOK.md says: 7.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: mid-screen (640,400) is #a2c749.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×4 are on screen.
   - Check 4 holds: `#hud` and `#mode` have 0 overlap and 0 cut off.
   - `sand` is still 0.43%, [362,298,794,321], and the sample at (640,310) is #dbd8be. Iteration 8 widened the ring, but the beach is still a pale strip behind the rocks.
   - The `Surfaces:` line for `pines` at y=4.30 is still there, 17 × 73 units. It has now been open for 4 sessions.
2. **Plays as DESIGN.md says: 7.**
   - I pressed `M`, then ArrowRight ×30. The mode switched to local and the `wolf` moved to x=-4.5 with pose "walk".
   - Solo HUD shows the `SUSPICION` bar, 3 clover icons and the 3 bite dots.
3. **The clip moment: 8.**
   - The pounce is much better than in session 7. In h50 the wolf is a small, readable leap over the flock and no black boxes fill the frame.
   - By frame 100 the human case shows "HUMAN! GOTCHA", "PLAYER 1 has been found." and a red PLAYER 1 tag over a red figure.
   - The AI case shows "BITE WASTED / AI SHEEP", a "baa?" bubble, bite dots dropping to 2 and wool particles.
   - The a100 wolf is still a brown stiff figure standing on its hind legs. It reads as a shrug only weakly.
   - The slow-mo arc and the wool burst are not strong in a50, where the wolf is a dark lump at distance.
4. **Looks like refs/01.jpg: 7.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `round-trees*` and the bright meadow all show.
   - `wolf-rock` is 0.64%. The wolf in the idle look is a brown lump beside the rock, not crouched on top.
   - The beach is a thin sliver.
5. **Solo fun and fair: 7.**
   - The suspicion bar, the hint line, the captions and the restart key are present.
   - The 3 `clover` objects are 0.15% of the frame and the glow is hard to see. They are findable only as small green blobs.
6. **Local 2-player: 7.**
   - After ArrowRight ×30 the `aim` ring shows as a faint orange ring under the wolf at about (470,400) in the picture.
   - It is visible but dim, and `aim` is listed only under "not found by the ID image". The pounce target is not obvious from the wolf's position among 90 sheep.
   - 3 bites show in the local HUD.
7. **`window.__game`, no build, ~100 sheep: 7.**
   - `__game` has its keys and actions, and `observe` works.
   - `perf` reads 170 ms with 68 draw calls and 102k triangles on SwiftShader. Host load is 3.0 on 8 cores. There is no signal about a real GPU.
   - 68 draw calls and 102k triangles are modest.
8. **Juice: 7.**
   - The banners, the "baa?" bubble, wool bursts and the nature-documentary captions ("That sheep walks like it has somewhere to be.", "A completely innocent sheep. Awkward.") are good.
   - The sound line was not checked. Sheep head bob is invisible at the play distance.
9. **Works at any window size, HUD readable: 6.**
   - The 1280×800 HUD is fine. I did not run `viewports` this session, so it stays at 6.
10. **Faults: 6.**
    - There are no console errors and no `Never visible` object.
    - The `pines` coplanar line, the thin beach and the wolf not crouched on its rock are all still open.

**Next:**
1. **Fix the `pines` coplanar face for real (asked again).**
   - Iteration 8 shortened the trunk cone, and the same y=4.30 line is still listed. Find the plane another way.
   - Run `eval` to list, for each `pines` mesh, the distinct y values of its vertex positions and which part owns the y=4.30 ones.
   - Likely it is the shared base disc of two stacked cone tiers. Offset the upper tier's base by 0.01, or drop its bottom cap (`openEnded`).
   - To check, run `look`. The `Surfaces:` line for `pines` is gone.
2. **Make the beach a real wedge (asked again).**
   - `sand` is 144×144 and the ring change had no effect, because `ground` covers it. Lower the `ground` vertex heights where the distance from the centre is above about 55, so the shore slopes under the sand. Alternatively raise `sand` y by 0.05 above `ground` with polygonOffset.
   - Make the sand colour warmer, about #e8d49a.
   - To check, run `look` with `sample` at (640,310) and (500,300). `sand` should be above 1% in the list and read as a golden strip against the sea.
3. **Make the wolf read as crouched on `wolf-rock`, and make the clovers and `aim` pop (asked again).**
   - The wolf at idle is a brown lump beside the rock. Put its `root` on top of `wolf-rock`, with a crouch pose (front legs down, head low). Add a pale muzzle and a dark nose.
   - Give each `clover` a pulsing pale-yellow sparkle ring, or a vertical light beam, that is visible at the play distance.
   - Make the `aim` ring brighter, with an emissive colour and a radius of 2.5.
   - To check, run `look` for the idle frame. `wolf` sits on top of `wolf-rock` and `clover` is above 0.3%. Then run `interact` with `M` and ArrowRight ×30, with `look: true`. The ring should be clearly visible.

SCORE: 6.9

## Iteration 9
**Did**: game.js ground vertex colour: `sand` now #e8d49a, applied where cy<2.4 and r>26 (wider, stronger shore). `pineGeo` tiers nudged (y 1.51/2.53/3.46) to break coplanar planes. `aim` ring 1.6–2.5 radius, orange #ff6a2a. Clover `star` group gained an open cylinder beam (6 tall) and a taller cross.
**Saw**: opening look: sand now shows as a golden path strip along the shore/trails, no `Surfaces:` line for `pines`, no Never-visible, HUD 0 overlap. `sand` ring still 0.43% (ground hides it, but the ground colour now carries the beach). `clover` 0.15% (beam is opacity-pulsed, only visible near). perf not run; local-mode aim not re-checked.
**Next**: (1) put the wolf on top of `wolf-rock` in a crouch with a pale muzzle; (2) check the clover beam and `aim` in play via interact (M, ArrowRight×30); (3) run `viewports` for HUD at small sizes.
**Open**: wolf still beside the rock; clover beam brightness unverified; perf unmeasured.

### Judge 9

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

## Iteration 10
**Did**: game.js wolf `W`: fur now dark slate (grey 0x4b4f5a, legs 0x3d404a), pale cream muzzle/chest (light 0xe9e3d3), scale 4.4 (was 3.8), `ROCK.top` 3.15 so it sits on `wolf-rock`. Clover: `star` material depthTest off, plus a ground ring (radius 1.1–1.7) in each `clover` group pulsed with the beam.
**Saw**: opening look: `wolf` 0.94% (was 0.53%), dark against the grey rock and clearly on top of it; `wolf-rock` 0.47%; `clover` still 0.15% in the ID list (opacity 0 at distance by design, pulses only when the player is near). Phone 390×844 look: canvas fills the window, `#mode` shows as a small "[M] Mode: SOLO" chip, HUD readable. No Never-visible, 0 HUD overlap. perf not run; local-mode `aim` not re-checked.
**Next**: (1) make the clover glow visible at a distance (floor opacity ~0.5 instead of 0.35·near); (2) check local-mode `aim` via interact (M, ArrowRight×30); (3) look at the pounce reveal with the darker wolf.
**Open**: clover ring/beam brightness unverified in play; aim unverified.

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

## Iteration 12
**Did**: game.js: each `clover` group gets a pulsing additive pale-yellow disc (`RingGeometry(0,1.9)`, own material, depthTest off, renderOrder 4). `aim` ring widened (2.4–3.8, pale yellow) with a red inner ring (`ar2`) and a bobbing red cone arrow `aimArrow` 5 units above the targeted sheep.
**Saw**: solo look: 3 glowing yellow discs clearly visible at the clovers (left, centre-bottom, right); `clover` ×4 0.24% in the ID list (additive discs are not counted). Local look (KeyM, ArrowRight×30): wolf at x −4.5, red ring plus red arrow over the nearest sheep, readable in the picture, `aim` 0.015% / `aimArrow` 0.026% by ID. 0 overlap, no Never-visible, no console errors. perf, `sample` not run.
**Next**: (1) reveal camera punch-in on the wolf for the AI shrug (head tilt, ears down, bite-dot tick) — still not done; (2) make the aim ring a touch bigger or add a white outline; (3) measure clover brightness with `sample`, and run `viewports`.
**Open**: reveal punch-in not started; the clover ring/star share one material across clovers, so their opacity pulses are in sync with the last clover only.

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

### Judge 13

**Judge verdict, session 13**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: (640,400) is #a2c749, a green meadow. `ground` is 38% and green is 51% of the hues.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×6 show.
   - Check 4 holds: `#hud` and `#mode` show 0 overlap, and there are no `Lighting:` or `Surfaces:` fault lines.

2. **Plays as DESIGN.md says: 8.**
   - Solo shows the `SUSPICION` bar, clover icons and 3 bite dots.
   - KeyM then ArrowRight ×30 gives mode "local" and the wolf at x −4.5 with state "ctrl" and pose "walk".
   - The red `aim` ring with its white outline and the `aimArrow` cone read clearly in the flock.

3. **Clip moment: 9.**
   - AI branch: "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble, and the wolf large in the cell with its head tilted.
   - Human branch: "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 tag over the red sheep. The wolf is small in this branch.
   - The caption voice ("Mistaken identity. Nature is humbling.") is good.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `sand` and `wolf-rock` all show.
   - The wolf is crouched on `wolf-rock`.
   - The `sand` strip is thin, at 0.43%.

5. **Solo fun and fair: 8.**
   - 3–4 `clover` glowing discs with light columns are findable.
   - The suspicion bar, hint line, captions and restart are present.

6. **Local 2-player: 8.**
   - `aim` ×2 is 0.072% and `aimArrow` is 0.11%. The white-outlined red ring is readable on the targeted sheep.
   - There is still no line from the wolf to the target, and the wolf sits in a dark clump so it is hard to find.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 125 ms on SwiftShader, which is no signal. It has 76 draw calls and 102.7k triangles, both modest.
   - Host load is 5.0.

8. **Juice: 8.**
   - The banners, caption voice, bubble and tag are strong.
   - The grazing head bob is not readable at the play distance. I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - `viewports` phone, tablet and laptop show a readable `#hud` in every cell.
   - On the phone, `#mode` drops to a tiny bottom-right label, and the picture is small in a letterboxed cell. The phone `#hud` text is tiny, about 5 px.
   - The tablet and phone cells have a lot of empty black space around the canvas. This might be the viewer's framing, but I could not confirm it.

10. **Faults: 9.**
    - There are no console errors, no `Never visible` object and 0 overlap.

**Next:**
1. **Make the wolf readable in local mode and in the human reveal.**
   - Draw a thin line (a stretched quad, `depthTest` off) from `wolf` to the targeted sheep, and give the wolf a rim light or a contrasting ear/eye mark so it shows against the dark rock and flock.
   - In the human branch, add the same punch-in on the wolf that the AI branch has.
   - Check with `interact` KeyM, ArrowRight ×30, `look: true`: a line object above 0.05% in the ID list, and `look` `sheet` `{action:"pounce", target:"human"}` with the wolf larger in the cell.
2. **Raise phone legibility.**
   - Scale the `#hud` font with `clamp()` so the TIME and SUSPICION text reads at 390 px wide. Move the phone hint to a short tap-friendly line.
   - Check with `look` `viewports: ["phone"]`: the `#hud` text is clearly legible.
3. **Make the grazing head bob and the bite-tick readable (asked again).**
   - Increase the `sheep-heads*` bob amplitude about 2×.
   - Add a pop or shake on the bite dot as it goes dark after a wasted bite.
   - Check with `interact` `{action:"pounce", target:"ai"}` and `trace` on the bite count, plus a zoom on the `#hud` bite dots.

SCORE: 8.3

## Iteration 14
**Did**: game.js: `aimLine` (red stretched quad, depthTest off, renderOrder 4) from `wolf` to the targeted sheep in local mode; `cam.close` punch-in now also in the human reveal branch. index.html: phone @media HUD text raised (rows 17px, labels 12px, `#sbar` 90px).
**Saw**: local look (KeyM, ArrowRight ×30): `aimLine` in the ID list but 0.0005% because the wolf stood next to the target (2.28 units long); `aim` ×2 0.1%, `aimArrow` 0.12%, wolf ×7 1%, 0 overlap, no Never-visible, no console errors. Human-branch reveal, phone `viewports`, perf not run.
**Next**: (1) test `aimLine` at a longer distance (wolf 8 units from target) and thicken it if under 0.05%; (2) run `look` viewports phone and confirm `#hud` legibility; check the human-reveal wolf size with `sheet` pounce human; (3) grazing head bob ×2 (`sheep-heads*`) and the bite-dot pop after a wasted bite.
**Open**: grazing bob and bite-dot tick still not done; `#mode` on phone still a small bottom-right label.

### Judge 14

**Judge verdict, session 14**

1. **Looks as LOOK.md says: 8.**
   - Not re-sampled this session. `look` shows a blue-green sea, a green meadow, and `sheep*` ×94 and `wolf` ×6 on screen. There are no `Lighting:` or `Surfaces:` fault lines, and `#hud` and `#mode` show 0 overlap.

2. **Plays as DESIGN.md says: 8.**
   - KeyM then ArrowRight ×60 gives mode "local" and wolf state "ctrl", with the wolf moving to x −1, z −6.
   - Solo shows the `SUSPICION` bar, the clover icons and 3 bite dots.

3. **Clip moment: 9.**
   - Human branch: "HUMAN!", a red "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 tag over the red sheep. The wolf is small at the left edge.
   - AI branch: "BITE WASTED", "AI SHEEP", the "baa?" bubble and the wolf large in the cell.
   - The captions are strong: "It had a name. It was PLAYER 1." and "Mistaken identity. Nature is humbling."
   - The human-branch punch-in on the wolf still reads small.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×32, `pines*` ×112, `sand` at 0.5% and `wolf-rock` all show, with the wolf crouched on `wolf-rock`.
   - The `sand` strip is still thin.

5. **Solo fun and fair: 8.**
   - The `SUSPICION` bar, 3 `clover` icons, the hint line and the restart text are all present. I did not play out a full solo round.

6. **Local 2-player: 7.**
   - `aimLine` is 0.0013% (1.68 × 0.7 units, "along the view"), so it is invisible. The `aim` ring ×2 (0.059%) and `aimArrow` (0.11%) carry the targeting.
   - The wolf is a dark shape against the flock and the line does not help find it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 124.5 ms on SwiftShader, which is no signal. It shows 76 draw calls and 102.7k triangles, both modest.
   - Host load is 3.8.

8. **Juice: 8.**
   - The banners, bubble and tag are good. The grazing head bob is still unchecked and I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - On the phone, the `#hud` panel is now legible, with TIME, CLOVERS, WOLF BITES and SUSPICION all readable.
   - The `#mode` label is a tiny bottom-right chip.
   - The phone shot shows sheep tiny and far away.
   - Tablet was not rechecked.

10. **Faults: 9.**
    - There are no console errors, no `Never visible` object and 0 overlap.

**Next:**
1. **Make `aimLine` visible, and make the wolf readable in local mode (asked again).**
   - Thicken `aimLine` to about 0.35 units wide, so it reads even when the wolf is close to the target.
   - Alternatively, draw a ground arc or dashed trail from `wolf` to the target, or add a bright outline or ring under `wolf`.
   - Check with `interact` KeyM, ArrowRight ×60, `look: true`: `aimLine` above 0.05% in the ID list.
2. **Enlarge the wolf in the human reveal (asked again).**
   - Move the `cam.close` target so it frames the wolf and the PLAYER 1 tag together, and use a lower, closer angle.
   - Check with `look` `sheet` `{action:"pounce", target:"human"}`: the wolf is about as large as in the AI cell.
3. **Grazing head bob ×2 and the bite-dot pop (asked again, Open from the last two sessions).**
   - Double the `sheep-heads*` bob amplitude.
   - Give the bite dot in `#hud` a CSS scale or shake animation when it goes dark.
   - Check with `look` `zoom` on `#hud` after `interact` `{action:"pounce", target:"ai"}`, and `trace` on the bite count.

SCORE: 8.1

## Iteration 15
**Did**: game.js: `aimLine` plane width 0.7→1.6; grazing nod amplitude 0.08→0.17 (`sheep-heads*`); `cam.close` factor 0.25→0.4 and reveal target `tz = wolf.z + 0.6` (human reveal closer on the wolf). index.html: `.pip.off` plays `pipPop` keyframes (scale 1.8→0.3 spin→0.6) when a bite is spent.
**Saw**: local look (KeyM, ArrowRight ×60): `aimLine` 0.011% (1.68 × 1.6 units, wolf next to target), `aim` ×3 0.21%, `aimArrow` 0.13%, wolf ×7 1.1%, 0 overlap, no Never-visible, no errors. Reveal framing, bite-pip animation, phone viewports, perf not run.
**Next**: (1) `aimLine` is still short when wolf is beside the target: draw a ring or glow under `wolf` itself, or aim at the nearest sheep beyond 3 units; (2) verify `sheet` pounce human wolf size and the pip pop with `look` zoom `#hud`; (3) phone `#mode` chip and sand strip.
**Open**: none broken; changes untested visually except the local look.

### Judge 15

**Judge verdict, session 15**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock` with the `wolf` on it, `cloud` ×32 and `sheep*` ×94, with no `Lighting:` or `Surfaces:` lines.
   - Brightness is 64% and saturation 44%.
   - The `sand` strip is still only 0.46%.

2. **Plays as DESIGN.md says: 8.**
   - KeyM then ArrowRight ×60 gives mode "local" and wolf state "ctrl", with the wolf at x −1, z −6.
   - The solo HUD shows the TIME clock and the WOLF BITES dots.

3. **Clip moment: 9.**
   - The human cell shows a big red "GOTCHA", "PLAYER 1 has been found.", the PLAYER 1 tag over the red sheep, and the caption "It had a name. It was PLAYER 1."
   - The `wolf` is now more visible in the human cell, as a dark shape at left-centre, though it is partly hidden behind sheep.
   - The AI cell shows "BITE WASTED", "AI SHEEP", the "baa?" bubble and the `wolf` large, with the caption "Mistaken identity. Nature is humbling."
   - The wolf is still not as large in the human cell as in the AI cell.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud`, `pines*`, `sand` and `wolf-rock` all show, and the wolf is crouched on `wolf-rock`.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover icons and the restart text are present.
   - I did not play a full round this session.

6. **Local 2-player: 7.**
   - `aimLine` is 0.011% (1.68 × 1.6 units), so it is still invisible. Its length is the problem, not its width, because the wolf is next to its target.
   - `aim` ×3 (0.24%) and `aimArrow` (0.15%) carry the targeting.
   - The wolf is a dark, flat shape sitting behind the `aim` ring, and it is hard to find among the `sheep*`.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 114.8 ms on SwiftShader, which is no signal.
   - It shows 76 draw calls and 102.7k triangles, both modest.
   - Host load is 3.5.

8. **Juice: 8.**
   - The banners, bubble and tag are strong, and the larger `sheep-heads*` nod is on screen.
   - The bite-pip pop (`.pip.off`) and the sound were not checked.

9. **Works at any window size, HUD readable: 7.**
   - At 1280 wide, `#hud` and `#mode` show 0 overlap and 0 cut off.
   - Phone and tablet were not rechecked this session.
   - The `#mode` chip was a tiny bottom-right chip on the phone last time.

10. **Faults: 9.**
    - No console errors, no `Never visible` object, 0 overlap.
    - `player` and `reach` are not found by the ID image because their own shaders place them, so they are not a fault.

**Next:**
1. **Make the wolf findable in local mode (asked again).**
   - `aimLine` is still invisible when the wolf is close to its target. Add a bright ring or glow under `wolf` itself, such as a yellow `wolfRing` that pulses.
   - If the wolf is next to the target, also draw a short `aimArrow`-style chevron pointing from `wolf` to the target.
   - Check with `interact` KeyM, ArrowRight ×60, `look: true`. The ID list should show a new ring above 0.1%, and the wolf should read at a glance against the `sheep*`.
2. **Phone layout, the `#mode` chip and the `sand` strip.**
   - Check with `look` `viewports: ["phone","tablet"]`.
   - Make `#mode` readable on the phone, for example by collapsing it to a "[M] Solo/Local" line.
   - Widen the `sand` strip at the shoreline from the play camera, so it sits at about 1% or more in the ID list.
3. **Verify the bite-pip pop and push the human reveal further.**
   - Check with `look` `zoom` on `#hud` after `interact` `{action:"pounce", target:"ai"}`, which should show the dark pip mid-animation.
   - Frame the human reveal lower and closer so the `wolf` is as large as in the AI cell, and move `cam.close` a bit further sideways so no `sheep*` hide the wolf. The `sheet` pounce-human cell should show the wolf at about the same size as in the AI cell.

SCORE: 8.1

## Iteration 16
**Did**: game.js: new `wolfRing` (yellow RingGeometry 5.2–6.2, renderOrder 6, depthTest off) pulsing under `wolf` in local mode while no pounce/result; set in the aim-rings block next to `aim`/`aimLine`.
**Saw**: local look (KeyM, ArrowRight ×60): `wolfRing` 0.21% (14.2 units across), `aim` ×3 0.25%, `aimArrow` 0.16%, `aimLine` 0.012% (still short), wolf ×6 1.1%, 0 overlap, no Never-visible, no errors. Ring is clear around the wolf and its target. Phone, pip pop, human reveal, perf not run.
**Next**: (1) phone `#mode` chip collapse and a wider `sand` strip (0.45%); (2) verify the `.pip.off` pop with `look` zoom `#hud` after pounce ai; (3) human reveal: wolf as large as in the AI cell, `cam.close` sideways.
**Open**: none broken; only the local look was checked.

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

### Judge 18

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

## Iteration 19
**Did**: Reveal cells lightened: letterbox bars `#bt`/`#bb` 9vh→5vh (game.js, 3 places), `#reveal .band` now green-tint `#2a4a2a40` (index.html), `cam.close` pull-in 0.4→0.32 and reveal camera target `tz = wolf.z + 2.4` so the `wolf` sits higher in frame.
**Saw**: sheet human|ai at 150 frames: brightness 52%/51% (was 44%), near black 9% both (was 15%); whole `wolf` visible above the caption in both cells; GOTCHA/AI SHEEP text still reads. No console errors. Not run: perf, phone, sand %, end-of-reveal sheep pop.
**Next**: (1) near black 9% is mostly the letterbox bars — make them 3vh or translucent to get under 8%; (2) `interact` pounce human, 200 frames, check sheep un-shrink pop; plain `look` for `sand` share; (3) drop `aimLine`, add replay freeze frame.
**Open**: sheep-shrink pop at reveal end still unchecked.

### Judge 19

**Judge verdict, session 19**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, `wolf`, the `sheep*` flock and `cloud` ×34. Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.
   - I did not read the `sand` share.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, the clovers, the WOLF BITES dots (3, then 2 after the AI pounce) and the SUSPICION bar.
   - The end screen reads "EATEN … R to play again · M to switch mode".
   - I did not run `interact` with keys this session.

3. **Clip moment: 8.**
   - The human cell shows a `wolf` fully in frame above the caption. It also shows the red PLAYER 1 tag, "HUMAN!" and a big "GOTCHA".
   - The AI cell shows "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble and the shrugging `wolf`.
   - Lightened as asked: brightness is 52% and 51% (was 44%). Near black is still 9% in both cells (was 15%), so the target of under 8% is not met. The letterbox bars cause most of it.
   - The `wolf` in the AI cell is half hidden behind the "baa?" bubble and the foreground pines.
   - I did not check the sheep-shrink pop at the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera, in a bright low-poly picture.
   - The `after` cell is warm and tinted, which is slightly off the ref's blue sky.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover rings, the end screen with restart, and the "Even in nature, nobody blends in forever." caption are all present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions.
   - I did not re-run it this session.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 124 ms on SwiftShader (host load 4.9), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 8.**
   - The HUD is readable at 1280 wide.
   - I did not run `viewports`.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The only fault is the 9% near black in the reveal cells, covered under item 3.

**Next:**
1. **Get the reveal cells under 8% near black (asked again).**
   - Make `#bt` and `#bb` 3vh or translucent, and lighten the dark foreground tint.
   - Check with `look` `sheet` on `pounce human` and `pounce ai`, 150 frames each. The near-black share should read under 8% and brightness should stay above 52%.
2. **Check the end of the reveal for a sheep pop, and keep the `wolf` readable in the AI cell.**
   - Run `interact` `{action:"pounce", target:"human"}` with `frames: 200` and `look: true`. The `sheep*` should ease back to full size over about 0.3 s without a pop.
   - In the AI reveal, move the "baa?" bubble above the `wolf`'s head so it no longer covers the body. Check with the same `look` `sheet`.
3. **Add a short "replay" freeze frame after the reveal and drop `aimLine`.**
   - After the reveal, add a 0.4 s freeze or zoom-back on the pounce moment with a "REPLAY" tag. This makes the 5-second clip land.
   - Also run `look` with `viewports: ["phone","laptop"]` to check the HUD and reveal text at small sizes. This has not been run for several sessions.

SCORE: 8.3

## Iteration 20
**Did**: Letterbox bars `#bt`/`#bb` 5vh→3vh (game.js, all `cam.punch` heights); AI-reveal `#bubble` placed higher (`t.y + 4.2`) so it clears the `wolf`.
**Saw**: sheet human|ai at 150 frames: brightness 54%/54%, near black 6%/6% (was 9%), no console errors. The `wolf` in the AI cell is still partly behind the foreground pines. Not run: perf, viewports, sheep-shrink pop at reveal end, sand share.
**Next**: (1) `interact` pounce human 200 frames, check sheep un-shrink pop; (2) `look` viewports phone/laptop for HUD and reveal text; (3) short "REPLAY" freeze after reveal, drop `aimLine`.
**Open**: sheep-shrink pop and phone layout unchecked; AI-cell `wolf` partly hidden by pines.

### Judge 20

**Judge verdict, session 20**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×136, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds. Brightness is 64%, saturation 45%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME 2:59, the three CLOVERS outlines, the WOLF BITES dots and the SUSPICION bar. The `clover` rings glow on the meadow.
   - I ran `interact` with the pounce action, not with the keys.

3. **Clip moment: 8.**
   - **Human cell:** the `wolf` lies flat in frame under a big red "GOTCHA". The red PLAYER 1 tag and "PLAYER 1 has been found." sit above it.
   - **AI cell:** "AI SHEEP", "Just a sheep. Bite wasted." and the "baa?" bubble all show.
   - **Darkness:** the target is met. Near black is 6% in both cells (was 9%) and brightness is 54%.
   - **Wolf in the AI cell:** the `wolf` is still half behind the pines and the bubble. It does not read clearly as the shrug.
   - **Sheep pop:** I did not check the sheep shrink-and-pop at the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.
   - The `human` cell is a little hazy and warm.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the end screen with restart and the caption line are all present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 232.8 ms on SwiftShader (host load 5.4), so it is no signal.
   - It shows 77 draw calls, 102.8k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - The laptop 1440×900 cell is fine.
   - The phone cell is a narrow portrait strip with a tiny HUD panel. The controls hint ("(M) Mode: SOLO") sits at the bottom corner and is small. I did not look at the reveal text at phone size.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The only open fault is the AI-cell `wolf` partly hidden.

**Next:**
1. **Make the `wolf` clear in the AI reveal.**
   - Raise or shift the reveal camera so the foreground `pines*` don't cross the `wolf`, for example by hiding pines near the camera during `cam.punch`.
   - Move the "baa?" bubble beside the head.
   - Check with `look` `sheet` on `pounce ai`, 150 frames. The whole `wolf` should show without a pine across it.
2. **Make the phone layout work.**
   - Scale the HUD up with `clamp()` or `vw`, and enlarge the mode hint at narrow widths.
   - Run `look` `viewports` `["phone"]` and `sheet` `pounce human` at phone size. The "GOTCHA" and PLAYER 1 tag should fit the width.
3. **Check the sheep pop, then add a short "REPLAY" beat (asked again).**
   - Run `interact` `{action:"pounce", target:"human"}` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a 0.4 s zoom-back with a "REPLAY" tag after the reveal and drop `aimLine`. Check by `look` `sheet` at about frame 170.

SCORE: 8.2

## Iteration 21
**Did**: Made the `pines` instanced mesh a named const `pinesMesh` (game.js); it is hidden while `cam.close >= 0.5` (the AI/human reveal close-up), so no pine crosses the `wolf`.
**Saw**: sheet ai|human at 150 frames: the `wolf` is fully visible in the AI cell, with the "baa?" bubble beside it. Brightness 59%/54%, near black 6%/6%, no console errors. Background pines pop out and in at the reveal ends, hidden by the letterbox. Not run: perf, phone viewport, sheep pop.
**Next**: (1) `look` viewports phone and sheet pounce human at phone size; the phone `@media` rule exists in index.html but is unchecked; (2) `interact` pounce human 200 frames to check the sheep pop; (3) a short "REPLAY" beat, drop `aimLine`.
**Open**: pine pop at the reveal ends (could fade the scale); the phone layout and the sheep pop are still unchecked.

### Judge 21

**Judge verdict, session 21**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, the three CLOVERS outlines, the WOLF BITES dots and the SUSPICION bar, and the `clover` rings glow on the meadow.
   - I ran `interact` with the pounce action only, not with the keys, and I did not play a full round.

3. **Clip moment: 8.**
   - **AI cell:** the `wolf` is now fully visible, with no pine across it. The "AI SHEEP" banner, "Just a sheep. Bite wasted." and the "baa?" bubble sit beside its head. The bubble sits close to the head, but the wolf is still a dark, pale-tinted shape in the foreground and the shrug does not read clearly.
   - **Human cell:** "GOTCHA", "HUMAN!", the red PLAYER 1 tag and the red silhouette all read. The `wolf` lies flat and dark.
   - **Left half of the frame:** a pink wash covers the left of the human cells, apparently from the foreground `rocks*` and `sheep*` tinted by the reveal overlay. It looks like a fault.
   - **Darkness:** near black is 6% in both cells.
   - **Not checked:** the sheep pop and the end of the reveal.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the win/lose screens and the caption line are present ("Even in nature, nobody blends in forever.").
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present.
   - `perf` reads 123 ms on SwiftShader on a busy host (load 6.7), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, captions and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 6.**
   - **Phone viewport:** the HUD panel and the "(M) Mode: SOLO" hint are tiny at 390 px. The hint is hard to read.
   - **Phone reveal:** I did not look at the reveal text at phone size. My "phone late" cell ran at the default size, so it says nothing about the phone.
   - **Laptop:** fine.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - The pines pop in and out at the reveal ends, hidden by the letterbox.
    - There is a pink wash on the left of the reveal cells.

**Next:**
1. **Phone layout (asked again).**
   - Scale the HUD and the "(M) Mode" hint with `clamp()` or `vw` at widths under 500 px.
   - Check with `look` `viewports` `["phone"]`: the HUD text is about twice as big, the hint is readable and it does not cover the sheep.
   - Then run `look` `sheet` with `pounce human` at 150 frames and `state`/`steps` `resize: [390, 844]`. "GOTCHA" and the PLAYER 1 tag should fit the width.
2. **Clean the reveal colour.**
   - Find the source of the pink wash on the left of the human cell: an overlay gradient, a vignette tint, or `rocks*` and `sheep*` lit red.
   - Remove it or make it neutral.
   - Check with `look` `sample` on the left pixels of the `human` cell, around [60, 200]. They should read as grass green and sheep white, not pink.
3. **Check the sheep pop, then add a short "REPLAY" beat (asked again).**
   - Run `interact` `pounce human` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a 0.4 s zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check by `look` `sheet` at about frame 170.

SCORE: 8.0

## Iteration 22
**Did**: index.html: phone `@media(max-width:640px)` sizes up (HUD rows 22px, labels 14px, `#time` 28px, `#sbar` 100px, `#mode` 16px); `#vig` gradient now transparent to 62% and a duller red; game.js `vig` opacity 0.55/0.6 -> 0.4 in the human reveal.
**Saw**: `look` phone: HUD and the "[M] Mode" hint read larger, 609 on screen. Sheet pounce human at 150 frames: brightness 56%, near black 6%, the pink wash is gone from the left, though a faint pale vertical band is left near x 80-140 (maybe the reveal `.band` or a pale rock). Not run: perf, sheep pop, phone reveal.
**Next**: (1) `look` sheet pounce human with `resize [390,844]` to check GOTCHA and the tag fit; (2) `interact` pounce human 200 frames for the sheep pop; (3) the "REPLAY" beat, drop `aimLine`.
**Open**: the pale band at the left of the human cell is unexplained; the sheep pop and the phone reveal are unchecked.

### Judge 22

The sheet is back and the phone reveal fits the width. I'm writing the verdict now.

**Judge verdict, session 22**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human cell:** "GOTCHA", "HUMAN!", the red PLAYER 1 tag and the red silhouette read big. The `wolf` lies flat and dark beside it.
   - **AI cell:** "AI SHEEP", "Bite wasted." and the "baa?" bubble are readable. The `wolf` is a small grey shape under the bubble, so the shrug is weak.
   - **Pink wash:** it is gone.
   - **Not checked:** the sheep pop and the end of the reveal, so there is no `REPLAY` beat yet.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the wolf sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the win/lose screens and the caption line are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 117 ms on SwiftShader (host load 4.6), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, caption line and wool are strong.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - **Phone play view:** the HUD and the "[M] Mode: SOLO" hint are larger and readable at 390 px.
   - **Phone reveal:** "GOTCHA" and the PLAYER 1 tag fit the width, but the sub-line "PLAYER 1 has been found." and the caption are tiny.
   - **Phone reveal framing:** the reveal sits in a small band with a lot of black above and below.

10. **Faults: 9.**
    - There are no console errors and no `Never visible` object.
    - A pale vertical band remains at the left of the human cells. It is probably a `rocks*` boulder under the reveal overlay.

**Next:**
1. **Phone reveal framing and small text.**
   - Make the reveal banner sub-line and caption at least 12 px, using `clamp()` or `vw`, at widths under 500 px.
   - Fill the phone screen more, with a larger letterbox-free crop or a taller GOTCHA.
   - Check with `look` `sheet` of `pounce human` at 150 frames with `resize: [390, 844]`. The sub-line should be readable and the black bars should be smaller.
2. **Check the sheep pop and add a "REPLAY" beat (asked again).**
   - Run `interact` `pounce human` with `frames: 200` and `look: true`. The `sheep*` should ease back without a pop.
   - Then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check by `look` `sheet` at about frame 170.
3. **Make the AI shrug bigger.**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat. Scale it up and use a clear head-shake or shrug, so it is not a small grey shape under the "baa?" bubble.
   - Check with the `ai` cell of `look` `sheet`: the `wolf` should fill about a third of the frame height.

SCORE: 8.1

## Iteration 23
**Did**: index.html phone media query (<=640px): `#rsub` 20px, `#rk` 18px, `#rbig` 25vw, `#cap` 16px, taller `.band` 34vh so the reveal fills more of the phone screen.
**Saw**: not looked at (no tools run this session); sizes are plain CSS.
**Next**: (1) `look` sheet `pounce human` at 150 frames, resize [390,844], check fit and bars; (2) sheep pop at 200 frames and a REPLAY beat; (3) bigger `wolf` close-up for the AI shrug.
**Open**: phone reveal fit unverified (25vw GOTCHA may overflow); sheep pop, REPLAY, AI shrug not done.

### Judge 23

**Judge verdict, session 23**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock`, the `wolf`, the `sheep*` flock and the clouds.
   - Brightness is 64%, saturation 44%, 0% near black.
   - There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human cell:** "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 tag read big on desktop. The `wolf` lies flat beside the red silhouette.
   - **AI cell:** "AI SHEEP", "Bite wasted." and the "baa?" bubble read well on the phone. The `wolf` is still a small grey shape under the bubble, so the shrug is weak.
   - **At 200 frames:** the human reveal is still on screen. There is no REPLAY beat, so I could not judge the sheep pop.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, clouds and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the wolf sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line and the win/lose screens are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 124 ms on SwiftShader (host load 6.1, a busy host), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - The banners, bubble, tag, caption and wool read well.
   - I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - **Phone reveal:** the sub-line and caption are readable now.
   - **GOTCHA overflow:** at 390 px, `#rbig` at 25vw clips the "A" at both edges and shows "GOTCH". That is the overflow the builder flagged as unverified.
   - **Phone letterboxing:** the phone canvas still sits in a narrow band with black on both sides.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The clipped GOTCHA on phone is a visible fault.

**Next:**
1. **Fix the phone GOTCHA overflow (asked again).**
   - Lower `#rbig` to about 18vw, or add `white-space: nowrap` with a `clamp()`, inside the ≤640px query in `index.html`.
   - Check with `look` `sheet` of `pounce human` at 150 frames, `resize: [390, 844]`. The full word "GOTCHA" should show inside the frame with no letters cut.
2. **Add the REPLAY beat and check the sheep pop (asked again).**
   - Ease the `sheep*` back after the reveal, then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check with `look` `sheet` of `pounce human` at about frame 170. The banner should be gone and the "REPLAY" tag visible.
3. **Make the AI shrug bigger.**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat, scaled up with a clear head-shake, so it is not a small grey shape under the "baa?" bubble.
   - Check with the `ai` cell of `look` `sheet`. The `wolf` should fill about a third of the frame height.

SCORE: 8.0

## Iteration 24
**Did**: index.html phone query: `#rbig` 25vw -> 17vw with `white-space:nowrap` so "GOTCHA" fits at 390px (Next item 1).
**Saw**: not looked at (no tools run); CSS-only change, 6 letters at 17vw ≈ 100vw*0.6 fits.
**Next**: (1) `look` sheet `pounce human` at 150 frames, resize [390,844] to confirm fit; (2) REPLAY beat after reveal with sheep ease-back; (3) bigger `wolf` close-up for AI shrug.
**Open**: GOTCHA fit unverified; REPLAY beat and AI shrug close-up still not done.

### Judge 24

**Judge verdict, session 24**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×136, `wolf-rock`, the `wolf`, the `sheep*` flock and `cloud` ×12.
   - Brightness is 64%, saturation 45%, 0% near black. There are no `Lighting:` or `Surfaces:` lines.

2. **Plays as DESIGN.md says: 8.**
   - The HUD shows TIME, CLOVERS, WOLF BITES and SUSPICION, and the `clover` rings glow on the meadow.
   - I forced the pounce through `act` and did not drive the keys or play a full round.

3. **Clip moment: 8.**
   - **Human reveal:** "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 tag read big. The `wolf` lies flat beside the red silhouette.
   - **AI reveal:** "AI SHEEP", "Bite wasted." and the "baa?" bubble read well, but the `wolf` shrug is still a mid-size grey shape.
   - **At 220 frames:** the human reveal is still on screen. There is no REPLAY beat.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `pines*`, `sand`, `cloud` and `wolf-rock` all show from the play camera.
   - The picture is bright and low-poly, and the `wolf` sits crouched on its rock.

5. **Solo fun and fair: 8.**
   - SUSPICION, the `clover` rings, the caption line and the win/lose screens are present.
   - I did not play a full round.

6. **Local 2-player: 8.**
   - This carries over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `window.__game` is present and there are no build files.
   - `perf` reads 124 ms on SwiftShader (host load 6.0), so it is no signal.
   - It shows 76 draw calls, 102.7k triangles and 0 MB of assets.

8. **Juice: 8.**
   - `interact` reports 10 sounds on the pounce (boom, stab1–3, thud, hit).
   - The wool, caption, bubble and tag read well.

9. **Works at any window size, HUD readable: 8.**
   - **GOTCHA fix:** at 390×844 the full word "GOTCHA" now fits inside the frame with no letters cut. That closes the last verdict's Next item 1.
   - **Phone reveal:** the sub-line, tag and caption are readable.
   - **Cut-off flag:** `div#reveal` is reported cut off by the screen edge at [-8, 397], but its text is intact.
   - **Overlap:** `div#mode` overlaps `div#cap` at the bottom. The caption is partly covered by the mode pill on phone.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.
    - The mode pill overlapping the caption on phone is minor.

**Next:**
1. **Add the REPLAY beat (asked again).**
   - Ease the `sheep*` back after the reveal, then add a short zoom-back with a "REPLAY" tag and drop `aimLine`.
   - Check with `look` `sheet` of `pounce human` at about frame 260, since the banner is still up at 220. The banner should be gone and the "REPLAY" tag visible.
2. **Make the AI shrug bigger (asked again).**
   - Add a close-up of the `wolf` for the "AI SHEEP" beat, scaled up with a clear head-shake.
   - Check with the `ai150` cell of `look` `sheet`. The `wolf` should fill about a third of the frame height.
3. **Fix the phone caption overlap.**
   - Move `div#cap` above `div#mode`, or hide `div#mode` during a reveal, in the ≤640px query.
   - Check with `interact` `resize: [390, 844]`, then `pounce human`, `wait: 150`, `look: true`. The `div#cap` and `div#mode` overlap should be gone from the "HTML over the canvas" line.

SCORE: 8.1

## Iteration 25
**Did**: index.html ≤640px query: `#cap` bottom 5vh -> 64px so it clears `#mode` (Next 3). game.js `updateCamera`: close-up factor 0.32 -> 0.5 when the pounce target is an AI sheep, so the `wolf` shrug fills more of the frame (Next 2).
**Saw**: no tools run; edits are one-line CSS/number changes.
**Next**: (1) `look` sheet `ai150` to check the wolf fills ~1/3 height, and resize [390,844] `pounce human` wait 150 for cap/mode overlap; (2) REPLAY beat after the reveal (still not done): ease `sheep*` back, drop `aimLine`, "REPLAY" tag; (3) full solo round playtest.
**Open**: both changes unverified; REPLAY beat missing.
