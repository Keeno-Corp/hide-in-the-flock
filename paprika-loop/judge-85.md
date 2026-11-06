**Session 85 verdict.** I opened the page, forced an AI-sheep pounce to the reveal, and ran `perf` once. I did not re-run the human reveal or the stalk vignette, and I did not play 2-player. Those scores carry over from 85's own notes and earlier sessions.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `cliff`, `pines*`, `round-trees*`, `cloud ×40`, `wolf-rock`, `sheep* ×96`, `bushes*`, `rocks*`, `tufts*` and `clover ×4` are all on screen. "Never visible" is none and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.5.** The forced `pounce` reached `pounce.ph:"reveal"` at frame 79 with `bites` dropping to 2, and `wolf.pose` was "shrug". Sounds fired (`boom`, `stab1`–`stab3`, `thud`, `hit`, `womp`, `baa`).
3. **Clip moment: 8.5.** The AI-sheep reveal reads at a glance: a huge "AI SHEEP" with "BITE WASTED", the caption "A completely innocent sheep. Awkward.", the "baa?" bubble, the shrugging wolf mid-air and a bite pip lost. Two things hold it back. `div#bubble` "baa?" is cut off at x=-44, the same clipping as `div#tag` in 85. The `wool` flakes are only 0.53% of the picture and I did not check their colour.
4. **Looks like refs/01.jpg: 9.** The wide look shows the sea, `sand`, a dense `pines*` forest, the grey `cliff`, `cloud ×40` and the wolf crouched on `wolf-rock`. It is bright and low-poly.
5. **Solo fun and fair: 8.** The stalk vignette `div#vig` is new in 85 and was seen on there. The `clover ×4` glow rings are findable and `div#hud` shows the SUSPICION bar. I did not replay the win and lose screens this session.
6. **Local 2-player: 8.5.** Carried over from 83: `wolfRing`, `wolfRingFill` and `aimArrow` exist and are hidden in solo.
7. **`window.__game`, no build, ~100 sheep: 8.** There are 82 draw calls, 103k triangles and 0 MB of assets. The 140 ms frame is SwiftShader at host load 2.0, so it is noise and not a fault.
8. **Juice: 9.** The sting sounds fired, `sheep-heads*` are animated, and the caption voice is funny.
9. **Any window size, HUD readable: 8.** At 1280×800, `div#hud`, `div#mode` and `div#cap` have 0 overlap. `div#bubble` is cut off by the left edge, which is a real readability fault.
10. **Faults: 8.** There were no console errors. The clipped `div#bubble`, and `div#tag` in 85, are the open faults.

**Next:**
1. **Clamp the reveal labels on screen (asked again).**
   - **Do:** clamp `div#bubble` and `div#tag` in `game.js` to the viewport, with an 8 px margin, after they are projected to the bitten sheep.
   - **Check:** `interact` with `{action:"pounce",target:"ai"}` and `{until:{"pounce.ph":"reveal"}}` and `look:true`. `div#bubble` should show 0 cut off. Run it again with `target:"human"` for `div#tag`.
2. **Freeze-frame and shake on the reveal (asked again).**
   - **Do:** hold a 0.3–0.4 s freeze with a zoom-punch on the bitten sheep. Add a `shake` on the human GOTCHA, and a grin pose for the wolf when it bites a human.
   - **Check:** `feel` on the pounce event shows a stronger camera change at the reveal.
3. **Add a stalk audio cue louder than `wind`.**
   - **Do:** play a short low sting from `sfx` when `wolf.state` enters "stalk" in solo.
   - **Check:** `interact` with `{state:{susp:2,wolf:{cd:0}}}` and `wait:40` lists a new sound in the Sound line.

SCORE: 8.5
