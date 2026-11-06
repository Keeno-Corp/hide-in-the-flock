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
