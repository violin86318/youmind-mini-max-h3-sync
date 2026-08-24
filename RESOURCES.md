# 📚 MiniMax H3 Prompt Resources

A curated list of tools, guides, and communities for creating MiniMax H3 prompts.

## Official Documentation

| Resource | Description |
|----------|-------------|
| [MiniMax H3 Model Card](https://huggingface.co/MiniMaxAI/MiniMax-H3) | Official model page on HuggingFace |
| [Base Prompt Guide (T2VA/I2VA/FL2VA/L2VA)](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md) | Official format for text/image-to-video modes |
| [Reference Video Guide (Full-Reference)](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_ref_en.md) | Official format for full-reference mode |

## Prompt Generation Tools

| Tool | Description | Link |
|------|-------------|------|
| **ComfyUI MiniMax H3-Promptor** | Auto-generates cinema-production-grade prompts for H3. Two-stage Hollywood AI Director engine, full-reference automation, dialogue syntax support. | [GitHub](https://github.com/1038lab/Comfyui-Minimax-H3-Promptor) |
| **Local LLM Prompt Assistant** | System prompt for LM Studio + Qwen3-VL-30B that turns any local model into a guided H3 prompt builder. Asks one question at a time. | [Dropbox RTF](https://www.dropbox.com/scl/fi/sh96uo95od7s787smj3mt/MiniMax_H3_Video_Prompt_Assistant_1.rtf) |
| **Velorn's MCP Tools** | MCP-based tools for generating, organizing, and editing H3 prompts. | Mentioned on Reddit |

## Community & Tutorials

| Source | Description |
|--------|-------------|
| [r/StableDiffusion - H3 Official Guide Discussion](https://www.reddit.com/r/StableDiffusion/comments/1vhloyz/walter_white_and_the_minimax_h3_official/) | 895 upvotes, 162 comments on the official guide |
| [r/comfyui - H3 Character Swap Prompts](https://www.reddit.com/r/comfyui/comments/1vinc36/testing_character_swap_with_minimax_h3/) | Notion page with full V2V character swap prompt |
| [r/aivideo - Fallout TV Show](https://www.reddit.com/r/aivideo/comments/1vooc4t/fallout_low_intelligence_i_used_minimax_h3_to/) | Full animated TV show using H3 reference model |
| [foxdit's AI Filmmaking Series](https://www.reddit.com/user/foxdit/) | Scene-by-scene H3 prompt tutorials |
| [Civitai Workflows](https://civitai.com/api/v1/models?query=MiniMax+H3) | ComfyUI workflows with embedded prompts |

## Key Prompt Format Notes

1. **Not natural language** — H3 prompts are structured shooting scripts
2. **Required fields**: `integrated_multimodal_description`, `overall_soundscape`, `non_diegetic_music`
3. **Full-reference mode adds**: `subject_definitions`, `summary`, `retention_analysis`
4. **Camera motion**: Type + Amplitude + Speed (e.g., "pushes in with small amplitude at slow speed")
5. **Speakers**: Stable IDs like `(S1)`, `(S2)` with dialogue in `<d>[Language] "..."</d>`
6. **Duration**: Up to 15 seconds, minimum 2.5-4s per shot

## Licensing

All prompts in this collection: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
