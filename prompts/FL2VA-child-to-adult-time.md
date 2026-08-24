### FL2VA: Child to Adult Time Passage

> Official first/last frame example — time transition between anchored images

#### 📖 Description

A child gradually grows into an adult across a single continuous shot. The first frame shows a young child's posture and position. The last frame shows the same composition with an adult. The prompt describes the continuous transformation path between them — changes in height, facial features, clothing, and lighting that evolve from one state to the other.

#### 📝 Prompt

```text
How the reference pictures align with the target video — Picture 1 (from Shot 1) aligns with the 00.00-second mark of the target video; Picture 2 (from Shot 1) aligns with the 10.00-second mark of the target video.

integrated_multimodal_description: [Shot 1] Live-action, cinematic, a medium close-up begins with the young child shown in Picture 1, standing in the same sunlit garden with the same tree and fence in the background. The camera holds a static shot as the child's posture gradually shifts — shoulders broaden, height increases, facial features mature. The child's plain t-shirt subtly shifts in color and style as the figure grows. Warm afternoon light transitions to a cooler golden-hour tone. The figure settles into the exact pose, spacing, and composition established by Picture 2 at the end of the shot. The transformation is smooth and continuous, never jumping or cutting.

overall_soundscape: A gentle breeze through leaves, distant birdsong, and the soft rustle of fabric shifting as the figure changes. A low, almost subliminal time-passage hum underneath.

non_diegetic_music: A slow, evolving ambient piece — starting with a single high piano note and gradually adding lower, richer tones as the transformation progresses.
```

#### 📌 Details

- **描述:** 儿童姿态连续过渡到成年姿态，服装光线随时间演变。10 秒单镜头，展示首尾帧之间时间流逝的插值写法。
- **Type:** FL2VA
- **Duration:** 10 seconds
- **Source:** [Official video guide](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md) (adapted)
- **Key technique:** Describe continuous path between two anchored frames (not the frames themselves)
- **Tags:** time-passage, transformation, FL2VA, cinematic, single-shot
