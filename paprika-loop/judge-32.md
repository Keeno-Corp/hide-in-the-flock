**Judge verdict, session 32**

1. **Looks as LOOK.md says: 8.**
   - The win frame shows `sea` 8.8%, `cliff`, `sand`, `pines*` ×141, `cloud` ×35, `wolf-rock`, `sheep*` ×98 and `clover` ×4 glowing. Saturation is 45% and green 54%. There are no `Lighting:` or `Surfaces:` lines and no `Never visible` object.
   - The reveal frame is still 21% saturated and 80% grey. The dark `wolf` fills the view and `sea`, `sand` and `wolf-rock` are not in it. I took no `sample`.

2. **Plays as DESIGN.md says: 7.**
   - `{action:"pounce",target:"ai"}` took `bites` from 3 to 2, set `pounce.ph` to "reveal" with `human` false, and set `wolf.pose` to "shrug".
   - `setState({result:"win"})` shows "YOU BLENDED IN", with a legible sub line on its backing.
   - I did not run the 90 s graze, so the AI-bite cooldown is still unverified.

3. **Clip moment: 8.**
   - The reveal shows the "AI SHEEP" title, the "BITE WASTED" kicker, the "Just a sheep. Bite wasted." sub line, `div#bubble` "baa?" and `div#cap` "A completely innocent sheep. Awkward."
   - Nine sounds played: `boom`, `stab1` to `stab3`, `thud`, `hit`, `womp` ×2 and `baa`.
   - The wolf's dark mass fills the frame and the picture is washed grey, so the shot reads gloomy for a funny moment.

4. **Looks like refs/01.jpg: 9.**
   - The play camera shows the sea, sand beach, grey `cliff`, pines, puffy `cloud` objects and the `wolf` on its `wolf-rock`, all bright and low-poly.

5. **Solo fun and fair: 7.**
   - The suspicion bar and clover glows read clearly, and win and lose screens both exist.
   - The AI-bite cooldown is unmeasured and I did not play a full round.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` works and the page starts playing on load. `perf` gave 118.6 ms per frame, 76 draw calls and 102.7k triangles. This is a software renderer, so the frame time is no signal.

8. **Juice: 8.**
   - Baas, `wind`, `womp`, `boom`, `stab*`, `thud` and `hit` all fire. The caption voice is funny.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 cut-off elements. On the win frame `div#hud` and `div#reveal` overlap slightly, which is benign. I did not re-run other sizes.

10. **Faults: 8.**
    - There are no console errors. `sea`, `sand` and `wolf-rock` are not visible in the reveal frame, because the camera is punched in.

**Next:**
1. **Make the reveal frame vivid (asked again).**
   - **Do:** pull the reveal camera back or raise it, so the wolf takes less of the frame and the meadow, `sea` and sky show. Lighten the wolf's material during `pounce.ph` "reveal", or add a rim light. Check that no grey filter or tint is applied in the reveal phase.
   - **Check:** `look` after `{action:"pounce",target:"ai"}` and `wait:150`. Saturation should be above 35% and grey below 50%.
2. **Verify the AI-bite cooldown (asked again).**
   - **Do:** run `interact` with `trace:["bites","wolf.state"]` over a 90 s graze, in chunks of `{wait:600}`.
   - **Check:** two `bites` changes should be at least 14 s apart. If the trace window is too short, use `eval` to read the `w.afterAI` timestamps.
3. **Run the full solo round once.**
   - **Do:** hold graze and walk to the three `clover` objects, with the wolf active.
   - **Check:** `result` reaches "win" naturally, and a "lose" via 3 forced pounces on the human gives the "EATEN" screen. This confirms the pacing is fair and the clip moment arrives within a minute.

SCORE: 7.9
