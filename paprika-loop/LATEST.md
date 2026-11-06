The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 29
**Did**: `game.js` solo wolf: after an AI-sheep bite `w.cd` is 18 (was 5), so a blending player survives longer. `index.html`: `#reveal .band` alpha 40→22, `#vig` gradient starts at 70% and its opacity in the reveal is 0.25 (was 0.4), so the end screens are less dull.
**Saw**: `node --check game.js` passes. No `look`, `perf` or play run this session, so the lighter overlays and the longer cooldown are unmeasured.
**Next**: (1) play a full winning round (clovers, T>=180) and `look` at the win screen; (2) check the 90 s graze with `bites` and `wolf.state`; (3) sample grass green on the lose screen.
**Open**: no win screen seen yet; the reveal canvas CSS filter is untested on a real GPU.

### Judge 29

**Judge verdict, session 29**

1. **Looks as LOOK.md says: 8.**
   - The play camera shows `sea`, `cliff`, `pines*` ×136, `sand`, `cloud` ×34, `wolf-rock`, `rocks*` and `sheep*` ×97, all bright and low-poly. The look reports no `Lighting:` or `Surfaces:` lines.
   - Saturation is 45% on the play frame. On the reveal frame it drops to 26% and grey is 74% of the hues. The `div.band` still covers 25% of the canvas. The overlays are lighter than in session 28 but not measured with `sample`.

2. **Plays as DESIGN.md says: 8.**
   - I held Space for 3000 frames (about 50 s). `wolf.state` went from "watch" to "stalk" at frame 559. `bites` ended at 1, so two AI-sheep bites landed. `topSusp` was `player: false`, and no `result` was set.
   - The run was a long continuous graze, and the player stayed at 0 suspicion.
   - The win screen is still unseen, for the fourth session running.

3. **Clip moment: 9.**
   - A forced AI pounce reached `pounce.ph` "reveal" with the wolf pose "shrug". It shows a big "AI SHEEP" title, a "BITE WASTED" kicker, and the subline "Just a sheep. Bite wasted."
   - The "baa?" `div#bubble` sits over the wolf at [601, 411, 746, 479] and is not clipped. The `div#cap` caption reads "Mistaken identity. Nature is humbling." and the bite pips drop to 2.
   - The sound log runs `boom`, `stab1` to `stab3`, `thud`, `hit`, `womp` and `baa`. It reads clearly in a 5-second clip.

4. **Looks like refs/01.jpg: 9.**
   - All of `sea`, `cliff`, `sand`, `pines*`, `cloud` and the crouched `wolf` on `wolf-rock` are in the play frame, and the clovers show as glowing rings.

5. **Solo fun and fair: 7.**
   - The cooldown of 18 s after an AI bite did not stop two AI bites inside 50 s. I did not time the gap between them, so I can't say whether the 18 s change did anything.
   - The player never lost suspicion while grazing, so a graze-only player is safe but cannot win without reaching the clovers.
   - I did not see a win this session.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - The page is plain, starts playing on load, and `observe` works.
   - `perf` gave 118 ms per frame, which is no signal on a software renderer (76 draw calls, 102.7k triangles, 0 MB assets). The reveal canvas CSS filter is still untimed on a real GPU.

8. **Juice: 8.**
   - 53 sounds started in the graze run, including `baa`, `baa2`, `wind`, `boom`, `stab*`, `thud`, `hit` and `womp`. The caption voice is funny.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps and nothing is cut off. Not re-run at other sizes.

10. **Faults: 8.**
    - There are no console errors and no `Never visible` object.

**Next:**
1. **Play a full winning round (asked again, 4th time).**
   - **Do:** use `interact` to step to each `clover` ring (`cloverProgress`) and hold KeyE until `clovers` reaches 3. If walking there is too slow, use `{state: {...}}` to place the player on each ring.
   - **Check:** `interact` with `until: {result: "win"}` and `look: true`. It should show a win screen with a restart prompt that matches the lose screen's polish.
2. **Check the AI-bite cooldown (asked again).**
   - **Do:** log `t` at each AI bite. If two bites still land under 18 s apart, find which code path sets `w.cd` and fix it.
   - **Check:** `interact` that grazes 90 s with `trace` on `bites`. The first change in `bites` and the next should be at least 18 s apart.
3. **Make the reveal overlay lighter again (asked again).**
   - **Do:** cut the grey desaturation on the reveal filter further, from the 26% saturation measured now, and keep the `div.band` strip to the title area only.
   - **Check:** `look` after a forced pounce with `sample` at about (200, 600). It should read a vivid green, and saturation in the reply should be above 35%.

SCORE: 8.1
