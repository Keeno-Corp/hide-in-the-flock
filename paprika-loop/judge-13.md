**Judge verdict, session 13**

1. **Looks as LOOK.md says: 8.**
   - Check 1 holds: sky at (640,20) is #b7dae1.
   - Check 2 holds: (640,400) is #a2c749, a green meadow. `ground` is 38% and green is 51% of the hues.
   - Check 3 holds: `sheep*` ×101 and `wolf` ×6 show.
   - Check 4 holds: `#hud` and `#mode` show 0 overlap, and there are no `Lighting:` or `Surfaces:` fault lines.

2. **Plays as DESIGN.md says: 8.**
   - Solo shows the `SUSPICION` bar, clover icons and 3 bite dots.
   - KeyM then ArrowRight ×30 gives mode "local" and the wolf at x −4.5 with state "ctrl" and pose "walk".
   - The red `aim` ring with its white outline and the `aimArrow` cone read clearly in the flock.

3. **Clip moment: 9.**
   - AI branch: "BITE WASTED", "AI SHEEP", "Just a sheep. Bite wasted.", the "baa?" bubble, and the wolf large in the cell with its head tilted.
   - Human branch: "HUMAN!", "GOTCHA", "PLAYER 1 has been found." and the PLAYER 1 tag over the red sheep. The wolf is small in this branch.
   - The caption voice ("Mistaken identity. Nature is humbling.") is good.

4. **Looks like refs/01.jpg: 9.**
   - The sea, `cliff`, `cloud` ×34, `pines*` ×136, `sand` and `wolf-rock` all show.
   - The wolf is crouched on `wolf-rock`.
   - The `sand` strip is thin, at 0.43%.

5. **Solo fun and fair: 8.**
   - 3–4 `clover` glowing discs with light columns are findable.
   - The suspicion bar, hint line, captions and restart are present.

6. **Local 2-player: 8.**
   - `aim` ×2 is 0.072% and `aimArrow` is 0.11%. The white-outlined red ring is readable on the targeted sheep.
   - There is still no line from the wolf to the target, and the wolf sits in a dark clump so it is hard to find.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `perf` reads 125 ms on SwiftShader, which is no signal. It has 76 draw calls and 102.7k triangles, both modest.
   - Host load is 5.0.

8. **Juice: 8.**
   - The banners, caption voice, bubble and tag are strong.
   - The grazing head bob is not readable at the play distance. I did not check the sound.

9. **Works at any window size, HUD readable: 7.**
   - `viewports` phone, tablet and laptop show a readable `#hud` in every cell.
   - On the phone, `#mode` drops to a tiny bottom-right label, and the picture is small in a letterboxed cell. The phone `#hud` text is tiny, about 5 px.
   - The tablet and phone cells have a lot of empty black space around the canvas. This might be the viewer's framing, but I could not confirm it.

10. **Faults: 9.**
    - There are no console errors, no `Never visible` object and 0 overlap.

**Next:**
1. **Make the wolf readable in local mode and in the human reveal.**
   - Draw a thin line (a stretched quad, `depthTest` off) from `wolf` to the targeted sheep, and give the wolf a rim light or a contrasting ear/eye mark so it shows against the dark rock and flock.
   - In the human branch, add the same punch-in on the wolf that the AI branch has.
   - Check with `interact` KeyM, ArrowRight ×30, `look: true`: a line object above 0.05% in the ID list, and `look` `sheet` `{action:"pounce", target:"human"}` with the wolf larger in the cell.
2. **Raise phone legibility.**
   - Scale the `#hud` font with `clamp()` so the TIME and SUSPICION text reads at 390 px wide. Move the phone hint to a short tap-friendly line.
   - Check with `look` `viewports: ["phone"]`: the `#hud` text is clearly legible.
3. **Make the grazing head bob and the bite-tick readable (asked again).**
   - Increase the `sheep-heads*` bob amplitude about 2×.
   - Add a pop or shake on the bite dot as it goes dark after a wasted bite.
   - Check with `interact` `{action:"pounce", target:"ai"}` and `trace` on the bite count, plus a zoom on the `#hud` bite dots.

SCORE: 8.3
