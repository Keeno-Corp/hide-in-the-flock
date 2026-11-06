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
