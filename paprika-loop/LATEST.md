The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 70
**Did**: `game.js` line 135-136: player sheep (i=0) now takes tint and `SZ` from the flock's own distribution (uses j=13 as its index) instead of white/1.0. `index.html`: `#toast` top 84px → 136px, clear of `#hud`/`#mode`.
**Saw**: `look` solo 1280×800: 101 sheep, no console errors, Never-visible none, 0 overlap in HUD. Toast in local mode not looked at (only the CSS moved); no perf run.
**Next**: (1) `KeyM` + `look` to confirm the toast overlap is 0. (2) Real win to check `#time` freeze; phone/tablet `#cap` look. (3) Reveal freeze-frame/zoom flash.
**Open**: Win time and small-screen `#cap` still unverified; the phone `#toast` rule (bottom:60px) is unchanged.

### Judge 70

**Session 70 verdict.** I looked at local mode, forced a solo human pounce, and ran `perf` once. I did not run a real win or take phone and tablet looks this session.

1. **Looks as LOOK.md says: 9.** `sea`, `sand`, `cliff`, `wolf-rock`, `pines*`, `round-trees*`, `cloud` ×40 and `rocks*` all show, and there are no `Lighting:` or `Surfaces:` lines. The `sheep*` vary in tint and size.
2. **Plays as DESIGN.md says: 8.** `KeyM` gives local mode with `wolf.state` ctrl, and `aimArrow`, `wolfRing` and `aimLine` appear. Toggling back to solo works.
3. **Clip moment: 8.** The forced human pounce gives `pounce.ph` leap with a visible `wolf` leap pose, a letterbox bar and the `#cap` caption. The sounds boom and stab1–3 fire. I did not watch the reveal text this session.
4. **Looks like refs/01.jpg: 9.** The `sea`, `sand`, grey `cliff`, `pines*` and puffy `cloud` objects all show from the play camera, and the wolf sits crouched on `wolf-rock`.
5. **Solo fun and fair: 8.** `div#hud` shows TIME, CLOVERS, WOLF BITES and SUSPICION, and `clover` objects show. The real win time is still unverified.
6. **Local 2-player: 8.** The `div#toast` now sits at y 136–176, and the look reports 0 overlap with `div#hud` and `div#mode`. That fixes last session's fault. The wolf still starts some distance from the flock.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 148 ms frame is SwiftShader, which `perf` says is no budget signal. The host load was 3.1.
8. **Juice: 8.** The wool burst, caption voice, `sheep-heads*` and the sounds are present.
9. **Any window size, HUD readable: 8.** At 1280×800 nothing is cut off. Phone and tablet are still unchecked.
10. **Faults: 9.** There are no console errors and no "Never visible" object. The player sheep is not found by the ID image, which is expected for its own shader.

**Next:**
1. **Verify the real win time and the small-screen `#cap`.** (asked again)
   - **Do:** play to `result` win with `until` and a high timescale, then `look` with `viewports` ["phone", "tablet"] during a reveal.
   - **Check:** TIME stays frozen on the win screen, and the `#cap` pill is centred and inside the viewport on both.
2. **Check the phone `#toast`.** (asked again)
   - **Do:** the phone `#toast` rule (bottom:60px) was not changed. Press `KeyM` and `look` with `viewports` ["phone"].
   - **Check:** the toast does not cover `#hud` or `#mode`.
3. **Put the local wolf closer to the flock.**
   - **Do:** start the P2 wolf nearer the flock, or add a short dash. Walking from the rock before the first pounce takes a while.
   - **Check:** after `KeyM`, `observe` shows the wolf within about 6 units of the nearest sheep, and a pounce is possible within the first 10 s.

SCORE: 8.3
