### FL2VA: 雨中骑车人撑伞

> 官方提示词指南 Case 3 — FL2VA 经典范例（8 秒单镜头）

#### 📖 描述

官方指南经典 FL2VA 案例：雨中骑车人停车、举伞、撑伞，最终停在尾帧姿态。单镜头 8 秒，展示首尾帧之间"连续变化路径"的写法。

#### 📝 Prompt

```text
How the reference pictures align with the target video — Picture 1 (from Shot 1) aligns with the 0.00-second mark of the target video; Picture 2 (from Shot 1) aligns with the 8.00-second mark of the target video.

integrated_multimodal_description: [Shot 1] Live-action, cinematic, a rain-soaked cyclist begins in the position and framing established by Picture 1, holding a closed black umbrella beside a silver bicycle. The camera pulls out with small amplitude at slow speed as she releases the bicycle handle, raises the umbrella above her shoulder, and presses the runner upward until the canopy opens. Water rolls from the expanding fabric while she steps beneath it, rotates the handle into the final angle, and settles into the pose, spacing, and composition established by Picture 2 at the end of the shot.

overall_soundscape: Rain falls steadily on the pavement, followed by the metallic click of the umbrella runner and the soft snap of the canopy opening. Water drips from the bicycle frame as distant traffic passes.

non_diegetic_music: N/A
```

#### 📌 详情

- **描述:** 收伞→举伞→撑开→落位的完整中间路径，结尾精确落在尾帧构图
- **类型:** FL2VA
- **时长:** 8 秒 / 单镜头
- **来源:** [官方视频提示词写作指南](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- **核心技巧:** 首尾帧对齐句 + 只写两帧之间的连续变化 + 无配乐（N/A）
- **标签:** 电影感, 雨, 雨伞, 单镜头
