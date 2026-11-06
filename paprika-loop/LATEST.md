The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 84
**Did**: `game.js` pounce leap-end: added a 260-flake `wool.emit` (speed 8, life 2.8) above the bitten sheep when `p.human`, on top of the existing 160+30 bursts. Not run in a browser this session.
**Saw**: no look run; only a one-line edit.
**Next**: (1) `interact {action:"pounce",target:"human"}`, wait 60, look: flakes around `div#tag`; (2) dash ring colour sample; (3) stalk vignette/audio cue.
**Open**: the new burst is unseen; check for console errors.

### Judge 84

**Session 84 verdict.** I opened the page and forced `{action:"pounce",target:"human"}` with `wait:60`, then looked again after `wait:50`. I also ran `perf` once. I did not see the reveal or the new 260-flake wool burst, so that item is still unverified.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `cliff`, `pines*`, `round-trees*`, `cloud ×40`, `wolf-rock`, `sheep*`, `bushes*`, `rocks*`, `tufts*` and `clover ×4` are all on screen. "Never visible" is none, and there are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** The `pounce` action put `wolf.state` in "pounce" with pose "leap" and `pounce.human` true. The sting sounds fired (`boom`, `stab1`–`stab3`). In the second look the pounce state was no longer in the diff and the HUD still read 2:59. I did not trace what ended it.
3. **Clip moment: 7.** The first look caught the leap: the wolf is dark and large, the camera is punched in, and the caption says "Observe: a sheep that jogs." The second look, after `wait:50`, showed no wool flakes, no `div#reveal` and no `div#tag`, only the wide view with the wolf crouched at the rock. So this session I saw neither the new burst nor the "HUMAN! GOTCHA" reveal. The 78 verification of the reveal still stands, but it is now stale.
4. **Looks like refs/01.jpg: 9.** The sea, `sand`, `pines*`, grey `cliff`, `cloud ×40` and the wolf on `wolf-rock` all read in the wide look. It is bright and low-poly.
5. **Solo fun and fair: 8.** The stalk toast, the lose screen and the win path were verified in 77 and 83. The `clover ×4` glow rings are findable, and `div#hud` shows the SUSPICION bar. Nothing changed this session.
6. **Local 2-player: 8.5.** Not re-run this session. The carried-over result from 83 is `wolfRing`, `wolfRingFill` and `aimArrow`, still hidden in solo.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 134 ms frame is SwiftShader with host load 2.0, so it is noise and not a fault.
8. **Juice: 9.** The sting sounds fired, `sheep-heads*` are animated, and the caption voice is intact.
9. **Any window size, HUD readable: 8.5.** At 1280×800, `div#hud`, `div#mode` and `div#cap` have 0 overlap and nothing cut off. The phone check from 83 is unchanged.
10. **Faults: 8.5.** There were no console errors. The new wool burst is unseen, and the pounce-end state cannot be read from the two frames I took.

**Next:**
1. **Verify the wool burst (asked again).**
   - **Do:** run `interact` with `{action:"pounce",target:"human"}`, then `{until:{"pounce.ph":"reveal"},max:300}`, and then `look:true` with `sample` around `div#tag`.
   - **Check:** `wool.emit` flakes should be white or cream in the air above the bitten sheep, with `div#reveal` showing "HUMAN! GOTCHA". If `pounce.ph` never reaches the reveal in that wait, `game.js` has a bug in the leap-end path and it needs fixing before anything else.
2. **Add a stalk cue (asked again).**
   - **Do:** add a screen-edge vignette or a short audio cue when the wolf enters a stalk, so a phone player notices before the toast.
   - **Check:** `interact` with `{state:{wolf:{cd:0},susp:2}}` and `look:true` shows the vignette, with `sample` on the screen edge reading darker or redder than before.
3. **Beyond the brief: a slow-mo freeze-frame on the reveal.**
   - **Do:** hold a 0.4 s freeze-frame on the bitten sheep with a zoom-punch and the wolf's reaction pose (shrug for an AI sheep, grin for a human), and `shake` the camera on the human GOTCHA.
   - **Check:** `feel` on the pounce event shows a stronger camera change at the reveal.

SCORE: 8.5
