The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 86
**Did**: `game.js`: new `clampEl(el)` (8 px viewport margin) called on `div#tag` and `div#bubble` after they are placed on the bitten sheep. Stalk start in solo now also plays `boom` 0.7 + `stab1` 0.8 next to `wind`.
**Saw**: human pounce to `reveal`: `div#tag` rect 646–852 px of 1280, on screen, after 5 more frames. A read on the very first reveal frame still gave -62, which is the clamp not yet run. Sound line listed boom/stab1–3. Did not re-check the AI `div#bubble`, the stalk sound, or `perf`.
**Next**: (1) 0.3 s freeze-frame and zoom-punch plus `shake` on the reveal; (2) grin pose for the wolf on a human bite; (3) look at the `wool` colour on a zoom.
**Open**: `div#bubble` clamp is untested; `div#tag` can sit off-screen for the first reveal frame.

### Judge 86

The `div#bubble` clamp works. "baa?" now sits at x=598–743, fully on screen with 0 cut off.

**Session 86 verdict.** I opened the page, forced an AI-sheep pounce to the reveal, and ran `perf` once. I did not re-run the human reveal, the stalk cue or 2-player. Those scores carry over from earlier sessions.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `pines* ×35`, `round-trees*`, `rocks*`, `bushes*`, `tufts* ×71` and `sheep*` are all on screen, and there are no `Lighting:` or `Surfaces:` lines. `cliff` was outside the view of this reveal camera. `wolf-rock` was behind the sheep. Neither was checked in a wide look this session.
2. **Plays as DESIGN.md says: 8.5.** The forced `pounce` reached `pounce.ph:"reveal"` with `bites` dropping to 2, and `wolf.pose` was "shrug". Sounds fired (`boom`, `stab1`–`stab3`, `thud`, `hit`, `womp`, `baa`).
3. **Clip moment: 8.5.**
   - The AI reveal reads at a glance: "AI SHEEP", "BITE WASTED", the "baa?" bubble, the shrugging wolf mid-air and the caption "A completely innocent sheep. Awkward.".
   - The shrug looks like the wolf is falling over backwards, not shrugging.
   - There is no freeze-frame or `shake` on the reveal.
   - `wool` takes up 2.6% of the picture. It looks pale and is easy to miss against the sheep.
4. **Looks like refs/01.jpg: 9.** Carried over from 85, and this picture agrees: sea, `sand`, `pines*` and bright low-poly all show.
5. **Solo fun and fair: 8.** The stalk vignette `div#vig` and the new stalk sting from 86 are not re-checked. The `div#hud` suspicion bar is there.
6. **Local 2-player: 8.5.** Carried over. `wolfRing`, `wolfRingFill` and `aimArrow` exist and are hidden in solo.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls, 103k triangles and 0 MB of assets. The 135 ms frame is SwiftShader at host load 2.1, so it is noise and not a fault.
8. **Juice: 9.** There were nine sounds in the reveal, the sheep heads animate, and the caption voice is funny.
9. **Any window size, HUD readable: 8.5.** There was 0 overlap, 0 off-screen and 0 cut off among the five HTML overlays at 1280×800. I did not run `viewports` this session.
10. **Faults: 8.5.** There were no console errors. The clamp for `div#tag` on the first reveal frame is still unconfirmed.

**Next:**
1. **Freeze-frame, zoom-punch and `shake` on the reveal (asked again).**
   - **Do:** hold the reveal for 0.3 s with a camera punch-in on the bitten sheep. Add `shake` on the human GOTCHA.
   - **Check:** `feel` on the pounce event shows a stronger camera change at the reveal.
2. **Grin pose for the wolf on a human bite, and a less falling-over shrug on an AI bite (asked again).**
   - **Do:** add the grin pose. Make the AI-sheep shrug read as shoulders and paws up, with the wolf upright.
   - **Check:** `interact` with `{action:"pounce",target:"human"}` and `{until:{"pounce.ph":"reveal"}}` and `look:true` shows the grin pose in the picture.
3. **Make the `wool` burst bigger and more colourful.**
   - **Do:** make the flakes larger, or add a few cream and pink tones.
   - **Check:** `look` with `zoom:[480,380,820,660]` at the reveal frame shows the flakes clearly against the sheep.

SCORE: 8.6
