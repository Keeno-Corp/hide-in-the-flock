The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

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

## Iteration 87
**Did**: `game.js` `updatePounce`: reveal freeze (slow 0.03 for first 0.3 s, then 0.2) plus a fov punch-in (−12° fading over 0.6 s) in `updateCamera`; human GOTCHA `camShake.kick(2.4)`. New wolf pose `grin` (body back, head up, paws raised, fast tail wag) used on a human bite; `shrug` made upright (less body tilt/bob). `wool` size 2.4→2.7, extra pink (0xffb8cc) and tan (0xffd9a0) bursts, human burst 260→150.
**Saw**: human pounce reveal after 60 frames: pose "grin", 10 sounds, `div#tag` [614,474,820,524] on screen, 0 overlap/off-screen. At wool size 3.6 `wool` covered 57% of the frame, so I lowered it to 2.7; that final size was not re-looked at. Did not run `perf`, `feel`, the AI shrug look or a zoom on the wool colours.
**Next**: (1) look at the final `wool` size and a zoom on the pink/tan flakes; (2) look at the grin and shrug poses on the wolf up close, since the wolf is hidden under wool in the reveal; (3) re-check `perf` and `feel`.
**Open**: wool coverage at 2.7 unverified; the grin pose has not been seen without wool in front.
