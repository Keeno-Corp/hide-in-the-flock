# Characters: Storybook Pastoral
## Sheep (AI x100 and the player)
Role: identical bodies; the player is only marked by a faint ink-and-apricot ring under it. Must read as one flat cream blob per sheep.
Silhouette: fat 1 unit wool cloud (cluster of 5 lumps), dark head, ears and four stubby legs; ~1.3 scale.
Colours: wool #f3e8cc (tints #efe0bf, #ddd5c0), face/legs #2b211c, eye glints #f3e8cc.
Materials: toon-banded, smooth-normal wool lumps (rounded), warm emissive lift so wool stays cream in shade, ink outline from the post pass.
Animation: walk bob, graze nod, startle run, squash-and-stretch hop on bite.
Source: code: by design, instanced (101 instances, 2 draw calls) · picked by builder; Sketchfab "Sheep 1" (Iso Game Lab, CC BY, 484 tris) was the best web candidate but is untextured white and needs recolour: not downloaded; library "sheep" hits were textured/realistic.
Refs: refs/01.jpg (flock in dusk light), refs/02.jpg (woolly sheep woodcut), study/4 (flat blobs).
Turnaround: none generated (fal key locked); `model_look`-style views are the `look target: sheep` pictures.
## Wolf
Role: AI wolf in solo, player 2 in local; sits on a rock, crouches, pounces, shrugs.
Silhouette: low angular near-black body, long snout, tall pointed ears, bush tail, 4.4 scale crouched; the darkest shape in the frame.
Colours: ink #17110e everywhere, eye glint #e9c46a only, no lit shading (unlit basic material).
Materials: unlit flat black fill so it is a pure silhouette; cream rim not needed.
Animation: crouch breathe, stalk, leap, land, shrug, grin, sulk (unchanged from the working game).
Source: code: by design · picked by builder; Sketchfab "Low-poly wolf" (sinork123, CC BY) and "Low Poly Wolf" (Ezgarth, CC BY) are white and dog-like; not downloaded.
Refs: refs/03.jpg (wolf ink line art), refs/02.jpg, study/2 (dark lone animal on a haze).
Turnaround: none generated (fal key locked).
## Picked by the builder
Pines (smooth rounded cone tiers, indigo-green #34503f-#41644a), oaks (lumpy smooth crowns #5f6e3b-#93a05a on #4a3324 trunk), stone wall runs (#a79f8c blocks, cap stones), rocks, clovers, bushes, tufts, clouds: code (no usable flat oak/fence on the web; Sketchfab wall "Wall Stone Low Poly Medieval" CC0 by Avramania was a fine match but code walls instance cheaply in the palette).
