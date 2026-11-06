The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 34

**Judge verdict, session 34**

1. **Looks as LOOK.md says: 8.**
   - The opening look has `sky` 20%, `sea` 8.9%, `cliff` and `sand` all on screen. There are `pines*` ×134, 15 `round-trees*` and `cloud` ×40. There are no `Lighting:` or `Surfaces:` lines.
   - `wolf-rock` is on screen at 0.43% in the opening and 1.3% after the pounce. Last session it was "Never visible", so that fault is fixed.
   - In the reveal frame, grey is 65% and saturation 28%. The `rim` light did not change that, because the `sheep*` wool and the grey `wolf` count as grey.
   - The reveal frame is washed out: the `sand` strip is only 0.13%, and the sea band and sky are pale.

2. **Plays as DESIGN.md says: 7.**
   - `{action:"pounce",target:"ai"}` took `bites` from 3 to 2. It set `pounce.ph` to "reveal" and `human` to false, and set `wolf.pose` to "shrug".
   - `{action:"pounce",target:"human"}` plus 150 frames returned `pounce:null` and `wolf.state` "return". `bites` stayed at 2 and no "HUMAN! GOTCHA" frame was captured. The forced human pounce either misses or ends inside the wait, so I could not confirm that branch.
   - I did not run the natural clover win or the "EATEN" screen again. That is now the third session in a row.

3. **Clip moment: 8.**
   - The AI reveal shows the "AI SHEEP" title, the "BITE WASTED" kicker, the "Just a sheep. Bite wasted." sub line, `div#bubble` "baa?" and `div#cap` "Mistaken identity. Nature is humbling."
   - 9 sounds played: `boom`, `stab1` to `stab3`, `thud`, `hit`, `womp` ×2 and `baa`.
   - The "HUMAN! GOTCHA" and PLAYER 1 tag half was not seen this session.
   - The wolf is half hidden behind wool at the bottom of the frame.

4. **Looks like refs/01.jpg: 9.**
   - The play camera shows `sea`, `sand`, `cliff`, pines, `cloud` and the meadow, and `wolf-rock` with the wolf next to it.
   - It is bright and low-poly, and the saturation is 44%.

5. **Solo fun and fair: 8.**
   - The suspicion bar, the three `clover` patches (the look lists ×4) and the bites are all in `div#hud`.
   - A natural win and a lose were not replayed.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` works and the page starts playing on load. `sheep*` ×101 are on screen.
   - `perf` gave 204 ms per frame, 82 draw calls and 103k triangles on a software renderer, so the frame time is no signal. Host load was 1.0.

8. **Juice: 9.**
   - Baas, `wind`, `womp`, `boom`, `stab*` and `thud` all fire, and the caption voice is funny.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps, 0 off-screen and 0 cut off. I did not check other sizes.

10. **Faults: 8.**
    - There are no console errors, no `Lighting:` or `Surfaces:` lines, and no "Never visible" objects.
    - The forced human pounce did not reveal, as noted under item 2.

**Next:**
1. **Show the human reveal.**
   - **Do:** run `{action:"pounce",target:"human"}` with `until:{"pounce.ph":"reveal"}`. If `pounce` clears without a reveal, fix `act("pounce")` in `game.js` so a forced human target always reaches "reveal".
   - **Check:** `look` should show the "HUMAN! GOTCHA" title, the PLAYER 1 tag and `bites` going from 2 to 1.
2. **Run the full solo round (asked again).**
   - **Do:** walk to each `clover` and hold E, then separately let the wolf eat the player three times.
   - **Check:** `interact` with `until:{result:"win"}`, then the "EATEN" screen with a restart. Run `{key:"KeyR"}` and check that the state resets.
3. **Make the reveal frame less washed out and keep the wolf clear of wool.**
   - **Do:** in the reveal, lower the exposure or sky and sea brightness, and nudge the camera so the `wolf` sits above the nearest sheep.
   - **Check:** `look` after the AI pounce plus 150 frames. Grey should be under 55% and the `wolf` share above 6%.

SCORE: 8.1

## Iteration 36
**Did**: No code change. Played the natural win: set `t` 181 and parked the wolf far away, then teleported the player to each `clover` ([14,-5], [-3,15], [-19,8]) and held KeyE 160 frames each.
**Saw**: `result` "win", `clovers` 3, with 3 `powerup` sounds and munch sounds. The "YOU BLENDED IN" reveal shows with the "R to play again" sub line. Saturation 40%, grey 49%, 0% blown out, no Never visible, no console errors. The HUD clover icons are all lit. The HUD TIME reads 0:00 after the win (a countdown that has run out, or a display quirk from the set `t`; not checked). `perf` not run.
**Next**: (1) the AI-reveal washout (lower exposure or sea/sky brightness in the reveal, keep `wolf` clear of wool); (2) check phone and tablet sizes for HUD overlaps; (3) check what the HUD TIME shows at the win.
**Open**: Win needs `t` >= 180, so a real player has to survive 3 minutes. I did not play that in real time.
