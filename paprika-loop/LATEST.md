The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 83

**Session 83 verdict.** I opened the page at 390×844 and forced the lose screen. I also switched to local mode, held `ShiftRight` for 30 frames, and ran `perf` once. The two checks that were open in 83 are now seen. I did not re-force the pounce reveals this session; they are carried over from 78.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `cliff`, `pines*`, `round-trees*`, `cloud`, `wolf-rock`, `sheep*`, `bushes*`, `rocks*` and `tufts*` are all on screen. "Never visible" is none, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** `KeyM` switches to local: `mode` "local", `bites` 3, `wolf.state` "ctrl". `result:"lose"` ends the run. Setting `bites:0` did not end it, which is likely correct because bites are probably only spent by a pounce. I did not check that this was the cause.
3. **Clip moment: 9.** The reveal banner, tag, bubble and captions were verified in 78 and the code is unchanged. The lose screen has the same big banner style: "EATEN" in `div#reveal`.
4. **Looks like refs/01.jpg: 9.** The phone view shows the sea, `sand`, `pines*`, `cliff`, clouds, and the wolf on `wolf-rock`. It is bright and low-poly.
5. **Solo fun and fair: 8.** The stalk toast is verified from 83, the lose screen is now verified, and the win path is verified from 77. The lose banner reads "YOU WERE THE HUMAN EATEN" with "R to play again · M to switch mode", and it fits at 390 wide with 0 overlap.
6. **Local 2-player: 8.5.** After the 30-frame `ShiftRight` hold, `wolfRingFill` showed an orange-red core inside the yellow ring, with `aimArrow` above it. The ring shows the dash state. I could not read an exact red value, since `wolfRingFill` is not in the ID image.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 56 draw calls, 101k triangles and 0 MB of assets. The 73 ms frame is SwiftShader with host load 2.3, so it says nothing about a real GPU.
8. **Juice: 9.** The sound set, `sheep-heads*` animation, wolf poses and caption voice are unchanged since 78.
9. **Any window size, HUD readable: 8.5.** At 390×844 `div#hud`, `div#toast`, `div#mode` and `div#reveal` have 0 overlap and nothing cut off. The 83 toast fix holds, with the toast at y 680–731 clear of the caption.
10. **Faults: 9.** I saw no console errors and no fault lines.

**Next:**
1. **Beyond the brief: make the reveal's wool burst bigger.**
   - **Do:** in the human and AI reveals, add a wool-flake `burst` from the bitten sheep's position, with `shake` on the human GOTCHA.
   - **Check:** run `interact` with `{action:"pounce",target:"human"}`, `{wait:60}` and `look:true`. Flakes should be in the air around `div#tag`.
2. **Confirm the local dash ring at a precise colour.**
   - **Do:** run `interact` with `[{key:"ShiftRight",frames:30}]`, then `look` with `zoom` on the wolf and `sample` at the ring centre.
   - **Check:** the sample reads red, against green before the dash.
3. **Add a clearer solo-pounce cue.**
   - **Do:** when the wolf enters a stalk, add a short audio cue or a screen-edge vignette, so a phone player notices before the toast.
   - **Check:** `interact` with `{state:{wolf:{cd:0},susp:2}}` and `look:true` shows the cue.

SCORE: 8.6

## Iteration 84
**Did**: `game.js` pounce leap-end: added a 260-flake `wool.emit` (speed 8, life 2.8) above the bitten sheep when `p.human`, on top of the existing 160+30 bursts. Not run in a browser this session.
**Saw**: no look run; only a one-line edit.
**Next**: (1) `interact {action:"pounce",target:"human"}`, wait 60, look: flakes around `div#tag`; (2) dash ring colour sample; (3) stalk vignette/audio cue.
**Open**: the new burst is unseen; check for console errors.
