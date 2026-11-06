The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 76
**Did**: built P2's wolf dash in `game.js` `updateWolf` (local mode): RightShift gives 0.3 s at speed 15 (walk is 7), cooldown `wolf.dashCd` 2.5 s. In local mode the sheep's run is now ShiftLeft only. Added `wolfRingFill` (child of `wolfRing`): disc scaling with dash readiness, red while charging, green when ready. Mode panel text now says "RShift DASH".
**Saw**: after `KeyM`, ArrowRight + ShiftRight 30 frames moved `wolf.x` by 5.9 (= 0.3·15 + 0.2·7; walking alone would be 3.5). `look`: red fill inside the yellow `wolfRing`, panels 0 overlap, 0 console errors, Never visible: none. No `perf` or phone look.
**Next**: (1) show the stalk toast on screen (set `wolf.state` to stalk the human; `look` at phone and desktop). (2) Measure nearest sheep to the wolf after `KeyM`. (3) Phone look in local mode (panel is longer now).
**Open**: the dash cooldown fill was seen only charging (red); the green ready state is unseen. The first plain-walk trace measured 8.5 (includes the start-up frames), so the dash/walk comparison is by formula.

### Judge 76

**Session 76 verdict.** I opened the page and pressed `KeyM` to enter local mode, then looked at it. I ran `perf` once. I then tried to reach the win screen by setting `clover` to 0.97 and holding E for 600 frames. `result` did not change, so the win is unverified for the seventh session. The state key I guessed may be wrong. I took no phone look and did not trigger a human pounce.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `cliff`, `pines*`, `cloud`, `wolf-rock`, `sheep*`, `bushes*`, `rocks*`, `round-trees*` and `tufts*` are all on screen. The picture has no `Lighting:` or `Surfaces:` lines. The first look had `aimLine` as "Never visible", hidden behind sheep. The second look had none.
2. **Plays as DESIGN.md says: 8.** The `KeyM` switch to local works. `div#toast` gives the wolf's instructions, and `wolfRing`, `aimArrow` and `aim` show. I did not play the win path.
3. **Clip moment: 8.** The pounce, reveal banner and caption were not re-tested this session. The scores from sessions 74–75 carry over, and no human reveal has been seen recently.
4. **Looks like refs/01.jpg: 9.** The picture has sea, sand, pine forest, grey cliff, clouds and the wolf on `wolf-rock`, all from the play camera. It is bright and low-poly.
5. **Solo fun and fair: 8.** Nothing was re-tested this session. The win screen has stayed unverified for seven sessions, and the stalk toast has never been seen.
6. **Local 2-player: 8.** The RShift dash and `wolfRingFill` exist, and the panel text now reads "RShift DASH". The ring fill was red while charging in the first look and had changed to a yellow/orange ring by the second. I did not confirm the green ready state. The wolf is a bit small and sits among the sheep at the start.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 227 ms frame is SwiftShader and is no budget signal. Host load was 0.9.
8. **Juice: 8.** The wind and baa sounds fire, and the `sheep-heads*` bob and wolf animation are present.
9. **Any window size, HUD readable: 8.** On desktop `div#hud`, `div#mode` and `div#toast` have 0 overlap and nothing cut off. The mode panel is longer now and has not been looked at on a phone.
10. **Faults: 9.** There are no console errors and no fault lines.

**Next:**
1. **Verify a real win and its frozen TIME.** (asked again, sessions 70–76)
   - **Do:** read the clover and result key names in `game.js` first. Then use `eval` to set that field and press `KeyE` with `{until:{result:"win"}, max:3000}`.
   - **Check:** `result` becomes win and `look` shows the win screen with "R to play again". 120 more frames leave `t` unchanged.
2. **Show the stalk warning toast on screen.** (asked again)
   - **Do:** set `wolf.state` to stalk the human with `eval`, then `look` with `viewports:["phone","desktop"]`.
   - **Check:** "! The wolf has noticed you: blend in, graze!" is visible on both and does not overlap `div#cap`.
3. **Make the local-mode wolf more readable and finish the dash check.**
   - **Do:** make `wolfRing` and the wolf larger and brighter. Show a clear green `wolfRingFill` when the dash is ready.
   - **Check:** `look` with `zoom` on `wolfRing`, taken once at the start and once 3 s after a dash. The first look is green and the second is red.

SCORE: 8.4
