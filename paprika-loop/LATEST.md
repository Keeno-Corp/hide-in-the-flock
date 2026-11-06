The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 71
**Did**: `game.js` line 301: local-mode wolf start moved from (-8,-6) to (-5,-4), nearer the flock (Next 3). Nothing else changed.
**Saw**: after `KeyM`, `observe` shows wolf ctrl at (-8,-6) before the edit; player at (0,1.5). I did not measure the nearest-sheep distance after the edit, run `look`, or run `perf`. The real win time and phone `#cap`/`#toast` checks were not done.
**Next**: (1) Real win with `until` and a high timescale, then `look` `viewports` ["phone","tablet"]. (2) `KeyM` on phone: toast vs `#hud`/`#mode`. (3) Check the nearest sheep is within about 6 units of the wolf after `KeyM`.
**Open**: The edit is untested in the browser. The win time, phone `#cap` and phone `#toast` are unverified for the third session running.

### Judge 71

**Session 71 verdict.** I looked at local mode after the wolf-start edit, played a forced AI-sheep pounce to the reveal, took phone and tablet looks, and ran `perf` once. I did not play a real win. I did not measure the nearest-sheep distance after the edit, and I did not take a phone look with `KeyM` pressed.

1. **Looks as LOOK.md says: 9.** `sea`, `sand`, `cliff`, `wolf-rock`, `pines*` ×128, `round-trees*`, `cloud` ×40 and `rocks*` all show. There are no `Lighting:` or `Surfaces:` lines. The `sheep*` ×98 are varied.
2. **Plays as DESIGN.md says: 8.** `KeyM` gives `mode` local with `wolf.state` ctrl at (-5,-4). `aimArrow`, `wolfRing` and `aimLine` appear, and the toast reads "walk to the flock with arrows, get close, Enter to pounce". The wolf now starts at the flock's edge in the look, so Next 3 is done.
3. **Clip moment: 9.** The forced AI pounce reaches `pounce.ph` reveal with `wolf.pose` shrug and `bites` 2. The picture shows a huge "AI SHEEP" with "BITE WASTED", the "Just a sheep. Bite wasted." strip, the `div#bubble` "baa?", the `#cap` "Mistaken identity. Nature is humbling.", a wool burst and letterbox bars. Nine sounds fire: boom, stab1–3, thud, hit, womp ×2 and baa. The human reveal was not replayed this session.
4. **Looks like refs/01.jpg: 9.** `sea`, `sand`, grey `cliff`, `pines*` and puffy `cloud` show from the play camera, and the wolf sits crouched on `wolf-rock`.
5. **Solo fun and fair: 8.** `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION, and `clover` objects show. The win time and the win and lose screens were not played this session, so that is still unverified.
6. **Local 2-player: 8.** `div#toast` at [234,136,1045,176] has 0 overlap with `div#hud` and `div#mode`. The wolf starts closer to the flock. Pounce targeting shows through `wolfRing` and `aimArrow`. The nearest-sheep distance was not measured.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 145 ms frame is SwiftShader, which `perf` says is no budget signal. Host load was 2.1.
8. **Juice: 8.** The wool burst, `sheep-heads*`, the caption voice, `bubble` and the sound set are all present.
9. **Any window size, HUD readable: 8.** On the phone (390×844) `div#hud` is readable and the mode panel collapses to a bottom pill. On the tablet it holds up. Both looks are of solo mode on a fresh load. The `#cap` pill on a phone during a reveal, and the phone toast, are still not seen.
10. **Faults: 9.** There are no console errors and no "Never visible" object. The player is not found by the ID image, which is expected for its own shader.

**Next:**
1. **Verify the real win and the small-screen reveal.** (asked again)
   - **Do:** run `interact` with `until` on `result` win and a high timescale. Then run `look` with `viewports` ["phone"] after `{action:"pounce", target:"human"}` plus 120 frames, so "HUMAN! GOTCHA" and `#cap` are on screen.
   - **Check:** TIME stays frozen on the win screen, and `#cap` and the reveal title sit inside 390 px with no overlap with `#hud`.
2. **Check the phone local-mode toast.** (asked again)
   - **Do:** run `look` with a `sheet` moment on a phone-sized viewport: `steps` [{"resize":[390,844]},{"key":"KeyM"}], 10 frames.
   - **Check:** `div#toast` does not overlap `div#hud` or `div#mode` in the HTML-over-canvas line.
3. **Add a wolf dash for P2 and a pounce-cooldown readout.**
   - **Do:** give the local wolf a short Shift dash with a cooldown, and show a small ring fill when Enter is ready.
   - **Check:** `interact` on ArrowRight + ShiftRight moves the wolf further in 30 frames than ArrowRight alone, and the `wolfRing` change shows in `look`.

SCORE: 8.4
