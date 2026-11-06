The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 28

**Judge verdict, session 28**

1. **Looks as LOOK.md says: 8.**
   - The play camera shows the `sea`, `cliff`, `pines*` ×126, `sand`, `cloud` ×29, `wolf-rock`, `rocks*` and the `sheep*` flock, all bright and low-poly. The look reports no `Lighting:` or `Surfaces:` lines.
   - The lose screen has a grey band across the top (`div.band`, 25% of the canvas) and a `div#vig` vignette over the whole canvas. Saturation is 40%.

2. **Plays as DESIGN.md says: 8.**
   - I played a real round with held keys (KeyD, KeyW) and no forced `act`. At t=25 the wolf pounced and ate the `player` (susp 1.23), with `wolf.state` "done" and pose "land". That gives `result: "lose"` and the EATEN screen.
   - KeyR restarted a fresh round: bites back to 3, `player` reset to (0, 1.5), and the wolf back to "crouch" on its rock.
   - I did not reach a win, so the win screen is still unseen.

3. **Clip moment: 9.**
   - A natural pounce landed in 25 s, well inside the first minute.
   - The PLAYER 1 `tag` sits over the eaten sheep. The sound log shows `boom`, `stab1` to `stab3`, `thud` and `hit` in order.
   - The "baa?" bubble clamp from session 28 was not re-checked at desktop size.

4. **Looks like refs/01.jpg: 9.**
   - The `sea`, `cliff`, `pines*`, `sand`, `cloud` and `wolf-rock` are all in the play-camera frame.
   - The grey band and vignette make the lose frame duller than the ref.

5. **Solo fun and fair: 8.**
   - The SUSPICION bar, the `clover` ×4 rings and the clover counter are readable.
   - The round ended with 0/3 clovers and susp 1.23 after only walking, so a player who doesn't graze loses quickly. That reads as fair.
   - The wolf took 2 bites in 25 s with `bites` at 2 (the other bite was an AI sheep, as the "decoys" count suggests), so I could not tell whether it hunts too fast.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it this session.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - The page is plain, starts playing on load, and `observe` works.
   - `perf` gave 121 ms per frame at host load 4.2. That is a software renderer, so it is no signal. It reports 76 draw calls, 102.7k triangles and 0 MB of assets.
   - The reveal canvas CSS filter has still not been timed on a real GPU.

8. **Juice: 8.**
   - 43 sounds started in one round: `baa`, `baa2`, `wind`, `boom`, `stab*`, `thud`, `hit` and `womp`. The sheep also visibly bob.
   - The lose screen reads "The wolf got you · 0/3 clovers · R to play again · M to switch mode".

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 the HUD has 0 overlap and nothing cut off.
   - The phone sheet in iteration 28 showed no overflow.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object. `perf` is not a fault on a software renderer.
    - The `player` is drawn by its own shader, so the ID image cannot find it. That is by design, not a fault.

**Next:**
1. **Play a full winning round.**
   - **Do:** take the player to each `clover` and hold KeyE until all three clovers are collected, then reach the win state.
   - **Check:** `interact` with `until: {result: "win"}`, then `look`. It should show a win screen with a restart prompt, matching the lose screen's quality.
2. **Lighten the reveal and lose overlays.**
   - **Do:** reduce `div.band` and `div#vig` so the end screen is not duller than refs/01.jpg. Keep the saturation drop short and let it recover.
   - **Check:** `look` with `sample` at about (200, 600), where grass sits on the lose screen. It should be a vivid green.
3. **Keep the second bite from landing quickly.**
   - **Do:** give the wolf a longer cooldown after an AI-sheep bite, so a player who blends in survives well past the first minute.
   - **Check:** `interact` that grazes for 90 s and checks `wolf.state` and `bites` with `expect`. It should show bites still at 3 or 2 and no `result` yet.

SCORE: 8.2

## Iteration 29
**Did**: `game.js` solo wolf: after an AI-sheep bite `w.cd` is 18 (was 5), so a blending player survives longer. `index.html`: `#reveal .band` alpha 40→22, `#vig` gradient starts at 70% and its opacity in the reveal is 0.25 (was 0.4), so the end screens are less dull.
**Saw**: `node --check game.js` passes. No `look`, `perf` or play run this session, so the lighter overlays and the longer cooldown are unmeasured.
**Next**: (1) play a full winning round (clovers, T>=180) and `look` at the win screen; (2) check the 90 s graze with `bites` and `wolf.state`; (3) sample grass green on the lose screen.
**Open**: no win screen seen yet; the reveal canvas CSS filter is untested on a real GPU.
