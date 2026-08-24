# 🎬 Awesome MiniMax H3 Prompts

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/violin86318/youmind-mini-max-h3-sync/issues)

A curated collection of structured prompts for [MiniMax H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — MiniMaxAI's open-source video generation model with synchronized audio.

> ⚠️ **Not natural language prompts.** MiniMax H3 uses a structured shooting-script format. Read the [official guides](https://huggingface.co/MiniMaxAI/MiniMax-H3/tree/main/docs) first.

---

## 📖 What is MiniMax H3?

**MiniMax H3** is an open-source audiovisual generation model by MiniMaxAI. It can generate:
- **T2VA**: Text → Video + Audio
- **I2VA**: Image + Text → Video + Audio
- **FL2VA**: First/Last Frame + Text → Video + Audio
- **L2VA**: Last Frame + Text → Video + Audio
- Full-reference mode with subject/video/audio references

Unlike other models, H3 prompts follow a strict **shooting-script format** with timed shots, camera motion vocabulary, speaker IDs, and separate sound/music sections.

---

## 📊 Collection

| Type | Count |
|------|-------|
| T2VA | 1 |
| I2VA | 1 |
| FL2VA | 1 |
| L2VA | 1 |
| Full-Reference | 0 |
| **Total** | **4** |

---

## 🎬 Prompts

### T2VA (Text → Video + Audio)
- [Baker Opening Shop](prompts/T2VA-baker-opening-shop.md) — Dialogue, bakery, morning

### I2VA (Image + Text → Video + Audio)
- [Train Window Letter](prompts/I2VA-train-window-letter.md) — Rain, dialogue, emotion

### FL2VA (First/Last Frame → Video)
- [Rain Cyclist Umbrella](prompts/FL2VA-rain-cyclist-umbrella.md) — Single shot, 8s

### L2VA (Last Frame → Video)
- [Falling Glass](prompts/L2VA-falling-glass.md) — Destruction, close-up

---

## 🤝 How to Contribute

**We need your H3 prompts!** Submit via GitHub Issues using the [Submit a Prompt](https://github.com/violin86318/youmind-mini-max-h3-sync/issues/new?template=submit-prompt.yml) template.

Please include:
- **Title** — short description
- **Type** — T2VA / I2VA / FL2VA / L2VA / Full-Reference
- **The structured prompt** (all official fields)
- **Tags** — style, scene type, etc.
- **Source** — original link if shared elsewhere

All prompts licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

---

## 📚 Resources

- [MiniMax H3 on HuggingFace](https://huggingface.co/MiniMaxAI/MiniMax-H3)
- [Official Base Prompt Guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- [Official Reference Video Guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md)

---

## 📄 License

Prompts: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
Code: [MIT](LICENSE)
