The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 41

**Session 41 verdict.** I looked at the 6.2 `lookAt` change, the human reveal, the opening and `perf`. I did not replay the natural clover win, 2-player mode, or the phone and tablet reveals.

1. **Looks as LOOK.md says: 8.**
   - The opening look has `sky`, `sea`, `cliff`, `sand`, `wolf-rock`, `pines*` ×139, `round-trees*` ×14 and `clover`.
   - It shows no `Lighting:` or `Surfaces:` lines and no "Never visible" object.
   - Brightness is 64%, saturation 44%, 0% blown out.

2. **Plays as DESIGN.md says: 8.**
   - Forced pounces on `ai` and `human` both reach their reveal screens.
   - `setState {t:178, clovers:2}` plus 60 frames left `result` null, so that shortcut does not trigger the win.
   - `wolf.bites` is not in `observe()`, so I could not compare it with the bite lights.
   - The natural clover win has now gone unchecked for the sixth session in a row.

3. **Clip moment: 9.**
   - The AI reveal (100 frames) shows "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" `div#bubble` and the grey `wolf`.
   - The 6.2 `lookAt` works: the "AI SHEEP" title now ends above the wolf's ears. The wolf is still visible between the foreground `sheep`, though partly crowded by them.
   - The human reveal shows a red "GOTCHA", "PLAYER 1 has been found." and the red PLAYER 1 `div#tag` over the wolf, and it reads at a glance.

4. **Looks like refs/01.jpg: 9.**
   - The opening look shows the sea, sand, pines, grey `cliff` and clouds, and the wolf on `wolf-rock`.

5. **Solo fun and fair: 8.**
   - `div#hud` has the suspicion bar, the clover and bite lights, and the timer. `topSusp` in the state shows which sheep the wolf suspects.
   - Clover glows are visible on the opening look.
   - The win screen was not seen.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions; I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` and the `pounce` and `startle` actions work, and there are 82 draw calls and 103k triangles.
   - The 143 ms frame time is a software-renderer artefact (SwiftShader, host load 5.0), so it is no signal.

8. **Juice: 9.**
   - Baas, wind, stings and the documentary captions are in place. The caption line at the bottom is small but readable.

9. **Works at any window size, HUD readable: 8.**
   - The `div#hud` panel and mode chip are tiny at 1280 wide.
   - The phone and tablet reveals are still not checked.

10. **Faults: 9.**
    - There are no console errors and no "Never visible" objects.

**Next:**
1. **Check the reveal on phone and tablet (asked again).**
   - **Do:** run `interact` with `{resize:[390,844]}`, then `look` with `sheet:[{steps:[{action:"pounce",target:"human"}],frames:110}]`. Repeat at 820×1180.
   - **Check:** the "GOTCHA" title, `div#tag` and sub line sit inside the frame. If the title overflows, size it with `min(vw,vh)`.
2. **Verify the natural clover win and restart (asked again).**
   - **Do:** don't use the `t`/`clovers` state shortcut. Add `wolf.bites` and `clovers` to `observe()`, then walk to each `clover` and hold `KeyE`.
   - **Check:** `interact` with `until:{result:"win"}` shows the win screen. After `KeyR`, `wolf.bites` is 3. The bite lights match `wolf.bites` on the EATEN screen.
3. **Make the wolf stand out more in the AI reveal.**
   - **Do:** clear the sheep in front of the wolf. Push nearby `sheep` outward during the reveal, or lift the camera slightly. Give the wolf a brief rim light or a bigger shrug.
   - **Check:** `look` after the AI pounce plus 100 frames. The `wolf` silhouette should be fully clear of foreground `sheep`, and the "baa?" bubble should not overlap the sub line.

SCORE: 8.4

## Iteration 43
**Did**: No code changes. Checked the human-pounce reveal on phone (390×844) and tablet (820×1180) after 110 frames.
**Saw**: Phone: "GOTCHA" title, "PLAYER 1 has been found." sub line and the `div#tag` PLAYER 1 all fit and read. `look` lists `div#reveal` [-4,142,393,273] as "cut off", but that is only its 4 px padding. Visible text sits inside the frame. Tablet: same layout, fits, wolf and tag clear. 0 console errors, no "Never visible" objects, 1% blown out on phone. On phone the `div#hud` panel takes about 230×130 px and the `div#mode` chip sits over the bottom caption's right end without overlapping it.
**Next**: (1) Look at the AI reveal on phone. (2) Check why the HUD timer reads 0:00 at the win. (3) Make the wolf stand out in the AI reveal by moving the foreground `sheep` aside.
**Open**: The phone and tablet human reveals are now verified. The AI reveal on phone, the 0:00 timer at the win and the sheep crowding the wolf are still open.
