---
title: "Character Swap V2V (Full-Reference)"
type: Full-Reference
source: Community (MIHAWKJR007 via Notion)
submitted: 2026-08-24
tags: [character-swap, v2v, object-replacement, photoreal, full-reference]
---

## Instruction

Object replacement pass. In `<Video_1>`, the target object is replaced by the object shown in `<Image_1>`. Everything else in `<Video_1>` remains exactly as is.

## Prompt

**ACTIVE REFERENCES:**

`<Video_1>`: the master plate. Camera path, framing, timing, cast, environment, lighting and every other object 100% match `<Video_1>`.

`<Image_1>`: identity of the replacement object only. Its shape, proportion, material, colour, logos and surface markings 100% match `<Image_1>`, kept legible and correctly oriented throughout.

**MOTION INHERITANCE:**

The replacement object inherits the full behaviour of the object it replaces, frame by frame: same screen position, same scale, same rotation, same motion path, same speed, same entry and exit timing. Whatever the original object did, the new object does identically. No new movement is introduced and none is removed.

**INTEGRATION:**

Contact reads physically: hands wrap the new silhouette, supporting surfaces meet its actual base, contact shadows land directly beneath it, and any grip conforms to its real geometry. Occlusion order is preserved: whatever passed in front of the original object passes in front of the new one, and whatever it covered stays covered. Reflections, refractions and cast shadows on nearby surfaces are rebuilt for the new geometry while keeping the same direction and softness as the plate.

**OPTICS:**

Shot size, FOV, depth of field, focus falloff and motion blur carried over from `<Video_1>` with no drift. The object sits at the same focal plane as the original.

**CAMERA:**

Camera behaviour, height, distance, movement and handheld character identical to `<Video_1>`.

**PHYSICS:**

Mass, inertia, swing and settle behaviour consistent with the material shown in `<Image_1>`. Any fluid, spill, dust or particle interaction updates to the new geometry while obeying the same gravity and timing as the plate.

**LIGHTING:**

Key direction, intensity, falloff and white balance taken from `<Video_1>`. The object catches the same key from the same side, sits at the same ambient level, and throws a shadow matching the existing shadows in length, direction and softness. Specular highlights appear only where the plate's key light would place them, reading the true surface finish from `<Image_1>`.

**STYLE:**

Photoreal, fully integrated into the original plate: same grain structure, same black level, same tonal contrast, same colour grade as `<Video_1>`.

**POSITIVE LOCKS:**

- Only the target object changes; every other element of `<Video_1>` stays untouched.
- The object stays present, complete and correctly scaled in every frame the original appeared in.
- Identity from `<Image_1>` holds steady across the whole clip, with no drift in shape, colour or markings.
- Edges blend seamlessly: matching noise, matching edge softness, no halo, no outline.
- One continuous plate, cuts only where `<Video_1>` already cuts.
