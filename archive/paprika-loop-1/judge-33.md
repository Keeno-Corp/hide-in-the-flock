**Judge verdict, session 33**

1. **Looks as LOOK.md says: 8.**
   - The reveal frame now shows the `sky` (34%), `sea`, `cliff`, `round-trees*`, `cloud` ×11 and the `ground` meadow around the wolf. There are no `Lighting:` or `Surfaces:` lines.
   - Saturation is 30% and grey is 64%, both counting the dark `wolf` as grey. That is under the 35% and 50% targets, but the frame reads bright.
   - `sand` is a 0.0023% sliver. `wolf-rock` shows as "Never visible", hidden behind sheep.

2. **Plays as DESIGN.md says: 8.**
   - `{action:"pounce",target:"ai"}` took `bites` from 3 to 2, set `pounce.ph` to "reveal" with `human` false and set `wolf.pose` to "shrug".
   - A 60 s hold of Space (graze) went `wolf.state` "watch" then "stalk" and `bites` 3 to 1. The AI bites came well apart rather than back-to-back, so the cooldown looks fine. That is a rough read, not a timestamped one.
   - I did not run a clover win or a "lose" this session.

3. **Clip moment: 9.**
   - It shows the "AI SHEEP" title, the "BITE WASTED" kicker, the "Just a sheep. Bite wasted." sub line, `div#bubble` "baa?" and `div#cap` "The wolf reconsiders his life choices."
   - 11 sounds played: `boom`, `stab1` to `stab3`, `thud`, `hit`, `womp` ×2, `baa` and `wind`.
   - The wolf's dark mass is still big in the lower frame, but the title and the joke read at a glance.

4. **Looks like refs/01.jpg: 8.**
   - The play camera shows the `sea`, `cliff`, trees, `cloud` and the meadow, all bright and low-poly.
   - The reveal frame hides `wolf-rock` and the beach.

5. **Solo fun and fair: 8.**
   - The suspicion bar sits in `div#hud`. With the player grazing, the wolf took 2 bites in about 56 s, so the first clip moment arrives within a minute.
   - The full natural win and the "EATEN" screen were not replayed.

6. **Local 2-player: 8.**
   - Carried over from earlier sessions. I did not re-run it.

7. **`window.__game`, no build, ~100 sheep: 8.**
   - `observe` works, the page starts playing on load, and the game instances its sheep.
   - `perf` gave 185.9 ms per frame, 77 draw calls and 102.8k triangles. This is a software renderer, so the frame time is no signal.

8. **Juice: 9.**
   - Baas, `wind`, `womp`, `boom`, `stab*`, `thud` and `hit` all fire. The caption voice is funny.

9. **Works at any window size, HUD readable: 8.**
   - At 1280×800 there are 0 overlaps, 0 off-screen and 0 cut-off elements. I did not re-check other sizes.

10. **Faults: 8.**
    - There are no console errors and no `Lighting:` or `Surfaces:` lines.
    - `wolf-rock` is "Never visible" in the reveal frame, hidden behind sheep.

**Next:**
1. **Run the full solo round.**
   - **Do:** walk to the three `clover` patches and hold E on each, with the wolf active.
   - **Check:** `result` reaches "win" on its own. Then run `{action:"pounce",target:"human"}` three times and check that the "EATEN" screen shows with a restart.
2. **Lighten the wolf in the reveal (asked again).**
   - **Do:** give `wolf` a lighter fur colour or a rim light while `pounce.ph` is "reveal", so it separates from the grass.
   - **Check:** `look` after the AI pounce and `wait:150`. Grey should be under 50%.
3. **Show `wolf-rock` and the beach in the opening shot.**
   - **Do:** keep sheep from standing in front of `wolf-rock` at the start, or move the opening camera slightly, so the "wolf crouched on its rock" reads.
   - **Check:** `look` with no steps should list `wolf-rock` as on screen with a pixel share above 0.5%.

SCORE: 8.2
