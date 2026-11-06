The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 78

**Session 78 verdict.** I forced both pounce reveals, then switched to local mode on a 390×844 viewport and ran `perf` once. I did not see the stalk toast, the lose screen, or the green-to-red dash ring after `ShiftRight`.

1. **Looks as LOOK.md says: 9.** `ground`, `sea`, `sand`, `cliff`, `pines*`, `round-trees*`, `cloud`, `wolf-rock`, `sheep*`, `bushes*`, `rocks*` and `tufts*` are all present, and "Never visible" is none. There are no `Lighting:` or `Surfaces:` lines.
2. **Plays as DESIGN.md says: 8.** The forced pounces, `KeyR` restart and `KeyM` mode switch all work. In the stage-phone local mode `bites` read 3 and `wolf.state` was "ctrl". The solo stalk toast and the lose screen were not re-checked.
3. **Clip moment: 9.** The human pounce gives `pounce.ph: "reveal"` with a huge red "GOTCHA" banner, the "HUMAN!" kicker, a red `div#tag` "PLAYER 1" over the sheep, and the caption "It had a name. It was PLAYER 1.". The AI pounce gives a big "AI SHEEP" banner with "BITE WASTED", `div#bubble` "baa?", the wolf in its `shrug` pose, and `bites` dropping to 2. The caption is "A completely innocent sheep. Awkward." Both read clearly in a 5-second clip, and the sounds include boom, stab, thud, womp and baa.
4. **Looks like refs/01.jpg: 9.** The phone look shows sea, sand, pines, `cliff`, clouds and the wolf on `wolf-rock`. It is bright and low-poly.
5. **Solo fun and fair: 8.** The win path is verified from session 77, and both reveals are now verified. The stalk toast and the lose screen are still unseen.
6. **Local 2-player: 8.** On the phone, `wolfRing` shows yellow and orange around the wolf, with `aimArrow` over it. The wolf body is visible through the fill, so the 0.35 opacity works. `div#toast` "Wolf: walk to the flock with arrows, get close, Enter to pounce" fits the width. The red state after `ShiftRight` is unconfirmed.
7. **`window.__game`, no build, ~100 sheep: 8.** `perf` shows 82 draw calls, 103k triangles and 0 MB of assets. The 136 ms frame is SwiftShader (host load 2.0) and is no budget signal.
8. **Juice: 9.** The sound set is rich, `sheep-heads*` and wolf poses animate, and the caption voice is funny.
9. **Any window size, HUD readable: 8.** At 390×844 `div#hud`, `div#toast` and `div#mode` have no overlap and none is cut off. `div#mode` sits tight against the toast at the bottom.
10. **Faults: 9.** There are no console errors and no fault lines.

**Next:**
1. **Show the stalk toast and the lose screen on a phone.** (asked again)
   - **Do:** run `interact` with `[{resize:[390,844]},{state:{wolf:{state:"stalk"}}},{wait:30}]` and `look:true`.
   - **Check:** "! The wolf has noticed you: blend in, graze!" is visible and does not overlap `div#cap`. Then run `{state:{bites:0}}` or let `t` reach 0, and confirm the lose banner and "R to play again" fit the phone.
2. **Confirm the local dash colour change.**
   - **Do:** in local mode, run `interact` with `[{key:"ShiftRight",frames:30}]` and `look` with `zoom` on the wolf.
   - **Check:** `wolfRingFill` is red with the wolf body clearly visible, and green at the start.
3. **Beyond the brief: make the reveal's wool burst bigger.**
   - **Do:** in the human and AI reveals, add a wool-flake `burst` from the bitten sheep's position, with `shake` on the human GOTCHA.
   - **Check:** `interact` with `{action:"pounce",target:"human"}`, `wait` 60 frames and `look:true` shows flakes in the air around `div#tag` in the reveal frame.

SCORE: 8.5

## Iteration 79
**Did**: no code change. Checked `game.js` for Next item 3: the reveal already has wool `burst` (160+30 flakes, 240 more for the AI) and `camShake.kick(1.0)`/`kick(1.6)` for the human GOTCHA (lines ~552-559).
**Saw**: phone 390×844, `{state:{wolf:{state:"stalk"}}}` + 30 frames: no stalk toast showed. The toast is only called when the wolf picks a target with `susp >= 1.5` (line 515), so forcing `wolf.state` skips it. 89 sheep, 534 objects, no fault lines, "Never visible" none, HUD and `div#mode` fit with no overlap.
**Next**: (1) to see the toast, set the player's suspicion high (`topSusp`) rather than `wolf.state`, or call the toast path via an action. (2) lose screen on phone via `{state:{bites:0}}`. (3) dash ring colour after `ShiftRight` in local mode.
**Open**: stalk toast, lose screen and red dash ring are still unseen on screen.
