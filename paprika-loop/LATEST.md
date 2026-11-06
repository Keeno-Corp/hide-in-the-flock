The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

## Iteration 15
**Did**: game.js: `aimLine` plane width 0.7→1.6; grazing nod amplitude 0.08→0.17 (`sheep-heads*`); `cam.close` factor 0.25→0.4 and reveal target `tz = wolf.z + 0.6` (human reveal closer on the wolf). index.html: `.pip.off` plays `pipPop` keyframes (scale 1.8→0.3 spin→0.6) when a bite is spent.
**Saw**: local look (KeyM, ArrowRight ×60): `aimLine` 0.011% (1.68 × 1.6 units, wolf next to target), `aim` ×3 0.21%, `aimArrow` 0.13%, wolf ×7 1.1%, 0 overlap, no Never-visible, no errors. Reveal framing, bite-pip animation, phone viewports, perf not run.
**Next**: (1) `aimLine` is still short when wolf is beside the target: draw a ring or glow under `wolf` itself, or aim at the nearest sheep beyond 3 units; (2) verify `sheet` pounce human wolf size and the pip pop with `look` zoom `#hud`; (3) phone `#mode` chip and sand strip.
**Open**: none broken; changes untested visually except the local look.

### Judge 15

**Judge verdict, session 15**

1. **Looks as LOOK.md says: 8.**
   - The `start` cell shows the sea, `cliff`, `sand`, `pines*` ×143, `wolf-rock` with the `wolf` on it, `cloud` ×32 and `sheep*` ×94, with no `Lighting:` or `Surfaces:` lines.
   - Brightness is 64% and saturation 44%.
   - The `sand` strip is still only 0.46%.

2. **Plays as DESIGN.md says: 8.**
   - KeyM then ArrowRight ×60 gives mode "local" and wolf state "ctrl", with the wolf at x −1, z −6.
   - The solo HUD shows the TIME clock and the WOLF BITES dots.

3. **Clip moment: 9.**
   - The human cell shows a big red "GOTCHA", "PLAYER 1 has been found.", the PLAYER 1 tag over the red sheep, and the caption "It had a name. It was PLAYER 1."
   - The `wolf` is now more visible in the human cell, as a dark shape at left-centre, though it is partly hidden behind sheep.
   - The AI cell shows "BITE WASTED", "AI SHEEP", the "baa?" bubble and the `wolf` large, with the caption "Mistaken identity. Nature is humbling."
   - The wolf is still not as large in the human cell as in the AI cell.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud`, `pines*`, `sand` and `wolf-rock` all show, and the wolf is crouched on `wolf-rock`.

5. **Solo fun and fair: 8.**
   - `SUSPICION`, the clover icons and the restart text are present.
   - I did not play a full round this session.

6. **Local 2-player: 7.**
   - `aimLine` is 0.011% (1.68 × 1.6 units), so it is still invisible. Its length is the problem, not its width, because the wolf is next to its target.
   - `aim` ×3 (0.24%) and `aimArrow` (0.15%) carry the targeting.
   - The wolf is a dark, flat shape sitting behind the `aim` ring, and it is hard to find among the `sheep*`.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 114.8 ms on SwiftShader, which is no signal.
   - It shows 76 draw calls and 102.7k triangles, both modest.
   - Host load is 3.5.

8. **Juice: 8.**
   - The banners, bubble and tag are strong, and the larger `sheep-heads*` nod is on screen.
   - The bite-pip pop (`.pip.off`) and the sound were not checked.

9. **Works at any window size, HUD readable: 7.**
   - At 1280 wide, `#hud` and `#mode` show 0 overlap and 0 cut off.
   - Phone and tablet were not rechecked this session.
   - The `#mode` chip was a tiny bottom-right chip on the phone last time.

10. **Faults: 9.**
    - No console errors, no `Never visible` object, 0 overlap.
    - `player` and `reach` are not found by the ID image because their own shaders place them, so they are not a fault.

**Next:**
1. **Make the wolf findable in local mode (asked again).**
   - `aimLine` is still invisible when the wolf is close to its target. Add a bright ring or glow under `wolf` itself, such as a yellow `wolfRing` that pulses.
   - If the wolf is next to the target, also draw a short `aimArrow`-style chevron pointing from `wolf` to the target.
   - Check with `interact` KeyM, ArrowRight ×60, `look: true`. The ID list should show a new ring above 0.1%, and the wolf should read at a glance against the `sheep*`.
2. **Phone layout, the `#mode` chip and the `sand` strip.**
   - Check with `look` `viewports: ["phone","tablet"]`.
   - Make `#mode` readable on the phone, for example by collapsing it to a "[M] Solo/Local" line.
   - Widen the `sand` strip at the shoreline from the play camera, so it sits at about 1% or more in the ID list.
3. **Verify the bite-pip pop and push the human reveal further.**
   - Check with `look` `zoom` on `#hud` after `interact` `{action:"pounce", target:"ai"}`, which should show the dark pip mid-animation.
   - Frame the human reveal lower and closer so the `wolf` is as large as in the AI cell, and move `cam.close` a bit further sideways so no `sheep*` hide the wolf. The `sheet` pounce-human cell should show the wolf at about the same size as in the AI cell.

SCORE: 8.1
