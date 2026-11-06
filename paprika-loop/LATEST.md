The last builder's section and the last judge's verdict; paprika-loop/PROGRESS.md holds every session's.

### Judge 14

**Judge verdict, session 14**

1. **Looks as LOOK.md says: 8.**
   - Not re-sampled this session. `look` shows a blue-green sea, a green meadow, and `sheep*` ×94 and `wolf` ×6 on screen. There are no `Lighting:` or `Surfaces:` fault lines, and `#hud` and `#mode` show 0 overlap.

2. **Plays as DESIGN.md says: 8.**
   - KeyM then ArrowRight ×60 gives mode "local" and wolf state "ctrl", with the wolf moving to x −1, z −6.
   - Solo shows the `SUSPICION` bar, the clover icons and 3 bite dots.

3. **Clip moment: 9.**
   - Human branch: "HUMAN!", a red "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 tag over the red sheep. The wolf is small at the left edge.
   - AI branch: "BITE WASTED", "AI SHEEP", the "baa?" bubble and the wolf large in the cell.
   - The captions are strong: "It had a name. It was PLAYER 1." and "Mistaken identity. Nature is humbling."
   - The human-branch punch-in on the wolf still reads small.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×32, `pines*` ×112, `sand` at 0.5% and `wolf-rock` all show, with the wolf crouched on `wolf-rock`.
   - The `sand` strip is still thin.

5. **Solo fun and fair: 8.**
   - The `SUSPICION` bar, 3 `clover` icons, the hint line and the restart text are all present. I did not play out a full solo round.

6. **Local 2-player: 7.**
   - `aimLine` is 0.0013% (1.68 × 0.7 units, "along the view"), so it is invisible. The `aim` ring ×2 (0.059%) and `aimArrow` (0.11%) carry the targeting.
   - The wolf is a dark shape against the flock and the line does not help find it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 124.5 ms on SwiftShader, which is no signal. It shows 76 draw calls and 102.7k triangles, both modest.
   - Host load is 3.8.

8. **Juice: 8.**
   - The banners, bubble and tag are good. The grazing head bob is still unchecked and I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - On the phone, the `#hud` panel is now legible, with TIME, CLOVERS, WOLF BITES and SUSPICION all readable.
   - The `#mode` label is a tiny bottom-right chip.
   - The phone shot shows sheep tiny and far away.
   - Tablet was not rechecked.

10. **Faults: 9.**
    - There are no console errors, no `Never visible` object and 0 overlap.

**Next:**
1. **Make `aimLine` visible, and make the wolf readable in local mode (asked again).**
   - Thicken `aimLine` to about 0.35 units wide, so it reads even when the wolf is close to the target.
   - Alternatively, draw a ground arc or dashed trail from `wolf` to the target, or add a bright outline or ring under `wolf`.
   - Check with `interact` KeyM, ArrowRight ×60, `look: true`: `aimLine` above 0.05% in the ID list.
2. **Enlarge the wolf in the human reveal (asked again).**
   - Move the `cam.close` target so it frames the wolf and the PLAYER 1 tag together, and use a lower, closer angle.
   - Check with `look` `sheet` `{action:"pounce", target:"human"}`: the wolf is about as large as in the AI cell.
3. **Grazing head bob ×2 and the bite-dot pop (asked again, Open from the last two sessions).**
   - Double the `sheep-heads*` bob amplitude.
   - Give the bite dot in `#hud` a CSS scale or shake animation when it goes dark.
   - Check with `look` `zoom` on `#hud` after `interact` `{action:"pounce", target:"ai"}`, and `trace` on the bite count.

SCORE: 8.1

## Iteration 15
**Did**: game.js: `aimLine` plane width 0.7→1.6; grazing nod amplitude 0.08→0.17 (`sheep-heads*`); `cam.close` factor 0.25→0.4 and reveal target `tz = wolf.z + 0.6` (human reveal closer on the wolf). index.html: `.pip.off` plays `pipPop` keyframes (scale 1.8→0.3 spin→0.6) when a bite is spent.
**Saw**: local look (KeyM, ArrowRight ×60): `aimLine` 0.011% (1.68 × 1.6 units, wolf next to target), `aim` ×3 0.21%, `aimArrow` 0.13%, wolf ×7 1.1%, 0 overlap, no Never-visible, no errors. Reveal framing, bite-pip animation, phone viewports, perf not run.
**Next**: (1) `aimLine` is still short when wolf is beside the target: draw a ring or glow under `wolf` itself, or aim at the nearest sheep beyond 3 units; (2) verify `sheet` pounce human wolf size and the pip pop with `look` zoom `#hud`; (3) phone `#mode` chip and sand strip.
**Open**: none broken; changes untested visually except the local look.
