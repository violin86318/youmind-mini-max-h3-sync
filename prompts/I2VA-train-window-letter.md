### I2VA: 列车窗边的信

> 官方提示词指南 Case 2 — I2VA 经典范例

#### 📖 描述

官方指南经典 I2VA 案例：雨夜列车上，女子读信后抬头望向窗外城市灯光并说出短对白。展示如何保持首帧身份、只描述动作与镜头变化。

#### 📝 Prompt

```text
For the target video, at 0.00 seconds into the target video, <Picture 1> (from [Shot 1]) is fully referenced.

integrated_multimodal_description: [Shot 1] Live-action, cinematic, the young woman shown in <Picture 1> remains beside the rain-covered train window, preserving her appearance, clothing, seat position, and the carriage layout. The camera trucks right with small amplitude at slow speed as she lifts her gaze from the folded letter toward the passing city lights. Her reflection moves across the glass while the quiet, breathy young woman (S1) says: <d>[English] I get off at the next station.</d> She folds the letter along its existing crease.

overall_soundscape: The train wheels produce a steady metallic rhythm beneath a low ventilation hum. Rain ticks against the window while paper rustles softly in her hands.

non_diegetic_music: Sustained cello notes at a slow tempo with widely spaced piano tones, gradually decreasing in volume.
```

#### 📌 详情

- **描述:** 雨夜列车读信场景，首帧全引用 + 横移跟拍 + 单句对白
- **类型:** I2VA
- **来源:** [官方视频提示词写作指南](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- **核心技巧:** 首帧全引用指令 + 保持身份/服装/座位 + 只描述新动作
- **标签:** 电影感, 对白, 列车, 雨
