# 🎬 Awesome MiniMax H3 Prompts

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![GitHub stars](https://img.shields.io/github/stars/violin86318/youmind-mini-max-h3-sync?style=social)](https://github.com/violin86318/youmind-mini-max-h3-sync)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/violin86318/youmind-mini-max-h3-sync/issues)
[![Update Prompts](https://github.com/violin86318/youmind-mini-max-h3-sync/actions/workflows/deploy.yml/badge.svg)](https://github.com/violin86318/youmind-mini-max-h3-sync/actions)

> 🎨 A curated collection of structured prompts for [MiniMax H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — the open-source omnimodal video generation model with synchronized audio

> ⚠️ **Not natural language prompts.** MiniMax H3 uses a strict **shooting-script format** with timed shots, camera motion vocabulary, speaker IDs, and separate sound/music sections. New to H3? Read the [official prompt guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md) first.

---

## 🤔 What is MiniMax H3?

**MiniMax H3** (also known as 海螺3 / Hailuo 3) is MiniMaxAI's open-source 33B-parameter omnimodal generation system:

- 🎬 **Three generation modes** — T2VA, I2VA, FL2VA / L2VA, Full-Reference (up to 9 images + 3 videos + 3 audio)
- 🔊 **Native stereo audio** — Dialogue, sound effects, and music generated in a single pass
- 📐 **2K / 15s output** — Up to 2K resolution, 24fps, multiple aspect ratios
- 🌐 **11 languages** — Including Chinese, English, Japanese, Korean, French, German
- 🔧 **ComfyUI native** — Official workflow templates available

### 📝 Prompt Formula

Every H3 prompt follows this structure:

```
Subject + Action + Environment + Camera + Lighting/Style + Constraints
```

| Part | What to write | Example |
|------|---------------|---------|
| **Subject** | Main character, animal, or object | A middle-aged baker |
| **Action** | What happens, in order | Opens shutters, places bread on counter |
| **Environment** | Location, weather, background | Small street bakery before sunrise |
| **Camera** | Shot type, movement, speed | Slow push in with small amplitude |
| **Lighting/Style** | Visible treatment, not vague quality words | Soft morning light, warm tones |
| **Constraints** | What must stay unchanged | Baker's white apron stays clean |

📚 **Learn more:** [Official Video Prompt Writing Guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md) · [Full-Reference Guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md)

---

## 📊 Statistics

<div align="center">

| Metric | Count |
|--------|-------|
| 📝 Total Prompts | **10** |
| 🎬 T2VA | **4** |
| 🖼️ I2VA | **2** |
| 🎞️ FL2VA | **2** |
| 🔄 L2VA | **1** |
| 🔀 Full-Reference | **1** |
| 🔄 Last Updated | **August 24, 2026** |

</div>

---

## 🔥 Featured Prompts

> ⭐ Hand-picked for exceptional quality and instructional value

### No. 1: Anime Opening with Music Sync (T2VA + Timeline)

![Language-EN](https://img.shields.io/badge/Language-EN-blue)
![Featured](https://img.shields.io/badge/⭐-Featured-gold)

#### 📖 Description

A 15-second anime opening sequence using timeline-anchored prompts to synchronize visual cuts with music beats. By writing timestamps like "at 3 seconds" and binding them to drum hits and instrumental changes, the model generates audiovisual content where frame transitions align with musical rhythm — no post-editing required.

#### 📝 Prompt

```
integrated_multimodal_description: The screen fades in from black, and the outline of a city skyline appears. A low drum beats at the 3-second mark as the camera pushes in to a character close-up. A jazz bass joins at the 6-second mark as the camera pulls wide to reveal the full cityscape. Strings swell at the 12-second mark as the shot cuts to the title card.

overall_soundscape: Bass drum hits, jazz bassline, orchestral strings, city ambient hum, and distant traffic.

non_diegetic_music: A cinematic anime opening score — starting with a single bass drum, building with jazz bass at 00:06, and culminating in a full orchestral swell at 00:12. Sparse reverb throughout.
```

#### 📌 Details

- **Author:** [@fal](https://x.com/fal/status/2083267196625535159)
- **Source:** X (Twitter) Post
- **Published:** August 2026
- **Languages:** en
- **Key technique:** Timeline-anchored prompt with music sync

---

### No. 2: Dual-Image Character + Environment Lock (Full-Reference)

![Language-EN](https://img.shields.io/badge/Language-EN-blue)
![Featured](https://img.shields.io/badge/⭐-Featured-gold)

#### 📖 Description

A war thriller short film using two reference images to separately lock character identity and environment. Image 1 controls facial features, clothing, and body proportions. Image 2 controls the city bridge setting and color grading. The model maintains both independently across multiple shots — solving the #1 AI video consistency problem without LoRA training.

#### 📝 Prompt

```
subject_definitions:
<Subject 1> is the soldier whose facial identity, short-cropped hair, tactical vest, and body proportions come from <Picture 1>.
<Subject 2> is the urban bridge environment from <Picture 2>, including the steel structure, wet road surface, and cold blue-grey color grading.
<Picture 2> is the establishing wide-shot composition reference for [Shot 1].

summary:
[reference generation] Create a 15-second cinematic war thriller. <Picture 1> supplies character identity. <Picture 2> supplies the environment and overall color grade. <Subject 1> moves through <Subject 2> with timeline-anchored shots.

retention_analysis:
<Subject 1> (appears in [Shot 1-3]): fully_preserved — retain facial identity, tactical vest, and body proportions.
<Subject 2> (appears in [Shot 1-3]): partially_preserved — retain bridge structure and road; change time from sunset to overcast.

detailed_description:
The target video is in a gritty war-film style with desaturated colors and high contrast.
[Shot 1] A wide shot of an urban bridge at dawn. <Subject 1>, a soldier in tactical gear, stands at the bridge railing, looking down at the water. The camera holds a static shot. He exhales slowly.
[Shot 2] At 00:05.000, the camera cuts to a medium close-up. <Subject 1> lifts his head, eyes wide with tension. The camera pushes in with small amplitude at slow speed. Rain begins to fall.
[Shot 3] At 00:10.000, the camera cuts to a tracking shot as <Subject 1> turns and runs along the bridge, the city skyline unfolding behind him.

overall_soundscape: Steady rain on metal and concrete, distant thunder, heavy breathing, boot steps on wet pavement.

non_diegetic_music: A low drone at a slow tempo, gradually building with percussive hits that sync with footfalls.
```

#### 📌 Details

- **Author:** [@Diplomeme](https://x.com/Diplomeme/status/2082770042630943156)
- **Source:** X (Twitter) Post
- **Published:** August 2026
- **Languages:** en
- **Key technique:** Dual-reference assignment (character OR environment, never both in one image)

---

### No. 3: Single Image → 15s Product Commercial (I2VA)

![Language-EN](https://img.shields.io/badge/Language-EN-blue)
![Featured](https://img.shields.io/badge/⭐-Featured-gold)

#### 📖 Description

Generate a 15-second commercial product video from a single product photo. The key is structured prompt writing: specify camera movement (orbit, push-in, pull-out), background style, timeline nodes, and overall atmosphere. One image + 10 minutes of prompt writing = a social-media-ready ad.

#### 📝 Prompt

```
For the target video, at 0.00 seconds into the target video, <Picture 1> (from [Shot 1]) is fully referenced.

integrated_multimodal_description: [Shot 1] Product photography style, a medium shot frames the luxury watch shown in <Picture 1>, preserving its exact face design, bracelet links, and reflective surfaces. The camera orbits slowly to the right around the watch, showing its profile and case details. Soft studio lighting creates gentle highlights across the metal. [Shot 2] At 00:08.000, the camera cuts to a macro close-up as it pushes in with small amplitude toward the watch face, revealing the dial text and hands. [Shot 3] At 00:12.000, the camera pulls out with large amplitude, revealing the full watch against a dark gradient background as faint brand text fades in.

overall_soundscape: Subtle mechanical ticking of the watch movement, soft fabric movement as the camera passes.

non_diegetic_music: A minimal electronic pulse at a slow tempo, building subtly with a warm synth pad underneath.
```

#### 📌 Details

- **Author:** [@ai_for_success](https://x.com/ai_for_success)
- **Source:** X (Twitter) Post
- **Published:** August 2026
- **Languages:** en
- **Key technique:** Structured single-image commercial prompt with timeline-anchored camera movements

---

## 📋 All Prompts

### 🎬 T2VA (Text → Video + Audio)

| # | Title | Key Features |
|---|-------|-------------|
| 1 | [Baker Opening Shop](prompts/T2VA-baker-opening-shop.md) | Dialogue, bakery morning, official example |
| 2 | [Alpine Lake Sunrise](prompts/T2VA-alpine-lake-sunrise.md) | Cinematic landscape, verified result |
| 3 | [Space Opera Captain](prompts/T2VA-space-opera-captain.md) | Sci-fi, emotional, dialogue |
| 4 | [Runner Tunnel to Daylight](prompts/T2VA-runner-tunnel-daylight.md) | Camera reveal, sports |

### 🖼️ I2VA (First Frame + Text → Video + Audio)

| # | Title | Key Features |
|---|-------|-------------|
| 1 | [Train Window Letter](prompts/I2VA-train-window-letter.md) | Rain, dialogue, emotion |
| 2 | [Dancer Rehearsal](prompts/I2VA-dancer-rehearsal.md) | Dance movement, lateral tracking |

### 🎞️ FL2VA (First/Last Frame → Video)

| # | Title | Key Features |
|---|-------|-------------|
| 1 | [Rain Cyclist Umbrella](prompts/FL2VA-rain-cyclist-umbrella.md) | Single shot, 8s, official example |
| 2 | [Child to Adult Time Passage](prompts/FL2VA-child-to-adult-time.md) | Time transition, FL2VA path |

### 🔄 L2VA (Last Frame → Video)

| # | Title | Key Features |
|---|-------|-------------|
| 1 | [Falling Glass](prompts/L2VA-falling-glass.md) | Destruction, close-up, converge to last frame |

### 🔀 Full-Reference (Subject/Video/Audio References)

| # | Title | Key Features |
|---|-------|-------------|
| 1 | [Character Swap V2V](prompts/FullReference-character-swap-v2v.md) | Object replacement, photoreal |

---

## 📐 Prompt Format Reference

### Camera Motion Vocabulary

H3 uses three-dimensional camera expressions: **Type + Amplitude + Speed**

| Type | Movement | Example |
|------|----------|---------|
| `Push In / Pull Out` | Camera moves toward/away | `pushes in with small amplitude at slow speed` |
| `Pan Left / Right` | Horizontal pivot in place | `pans right with large amplitude at fast speed` |
| `Truck Left / Right` | Horizontal translation | `trucks left with small amplitude at slow speed` |
| `Tilt Up / Down` | Vertical pivot | `tilts up at normal speed` |
| `Arc Shot` | Orbits subject | `arcs around the subject` |
| `Tracking Shot` | Follows moving subject | `tracks the runner` |
| `Static Shot | No movement | `holds a static shot` |

**Amplitude:** `with small amplitude` / `with large amplitude` (omit for medium)
**Speed:** `at slow speed` / `at fast speed` (omit for normal)

### Speaker & Dialogue Format

```
The young woman with a quiet, breathy voice (S1) says: <d>[English] I get off at the next station.</d>
```

- `(S1)`, `(S2)` — Stable speaker IDs, same character keeps same ID across shots
- `<d>[Language] "..."</d>` — Dialogue with language tag
- Voiceover: `says in an off-screen voiceover` + `while his lips remain completely closed`

### Three Core Fields

Every prompt contains:

1. **integrated_multimodal_description** — Visuals, actions, shots, dialogue, diegetic sound along timeline
2. **overall_soundscape** — Ambient sounds, physical action sounds (1-4 sentences)
3. **non_diegetic_music** — Background music only the audience hears (1-3 sentences, or `N/A`)

---

## 📚 Resources

See [RESOURCES.md](RESOURCES.md) for official docs, tools, and community links.

### 🔧 Recommended Tools

| Tool | Description | Link |
|------|-------------|------|
| H3-Promptor | ComfyUI node that auto-generates H3 prompts | [GitHub](https://github.com/1038lab/Comfyui-Minimax-H3-Promptor) |
| H3 Prompt Rewriter LoRA | 8B LoRA for prompt optimization | [ModelScope](https://www.modelscope.cn/models/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA-8B) |
| MiniMax H3 Studio | Free online generator | [minimaxh3.studio](https://minimaxh3.studio/zh/guide/minimax-h3) |
| H3 Long Video Planner | Plan 60-120s multi-segment videos | [minimax3.com](https://minimax3.com) |

---

## 🤝 How to Contribute

**We need your H3 prompts!** Submit via GitHub Issues using the [Submit a Prompt](https://github.com/violin86318/youmind-mini-max-h3-sync/issues/new?template=submit-prompt.yml) template.

Please include:
- **Title** — short description
- **Type** — T2VA / I2VA / FL2VA / L2VA / Full-Reference
- **The structured prompt** (all official fields)
- **Tags** — style, scene type, etc.
- **Source** — original link if shared elsewhere
- **Technique** — what makes this prompt special

All prompts licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## 💡 Pro Tips (from community testing)

1. **Start with one action + one camera movement.** Generate, watch, then change one variable.
2. **Write timestamps** ("at 3 seconds") to control pacing and synchronize with music beats.
3. **Assign each reference image ONE job.** Character OR environment, never both in one image.
4. **Use speaker IDs** `(S1)`, `(S2)` consistently — same character, same ID across all shots.
5. **Separate diegetic sound from music.** Sound effects go in `overall_soundscape`, BGM goes in `non_diegetic_music`.
6. **On-screen text in quotes:** `A red neon sign reading "营业中" glows above the doorway.`
7. **Don't stack camera terms at sentence end.** Weave movement into action: `The camera pushes in as she reaches for the letter.`

---

## 📄 License

Content (prompts): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: [MIT](LICENSE)

---

## 🙏 Acknowledgements

- [MiniMaxAI](https://huggingface.co/MiniMaxAI) for open-sourcing H3
- [@fal](https://x.com/fal), [@Diplomeme](https://x.com/Diplomeme), [@ai_for_success](https://x.com/ai_for_success) for featured prompt techniques
- [Antigravity](https://antigravity.google/) for awesome badge infrastructure
