### L2VA: 坠落的玻璃杯

> 官方提示词指南 Case 4 — L2VA 经典范例（6 秒单镜头）

#### 📖 描述

官方指南经典 L2VA 案例：玻璃杯被碰落、坠地碎裂，碎片最终汇聚到尾帧构图。展示从合理前序状态收敛到最后一张图的写法。

#### 📝 Prompt

```text
How the reference pictures align with the target video — <Picture 1> (from [Shot 1]) aligns with the 6.00-second mark of the target video.

integrated_multimodal_description: [Shot 1] Live-action, cinematic, a close shot begins with an intact drinking glass near the edge of a dark wooden table, while the same hand and sleeve visible in <Picture 1> approach from the right. The camera pushes in with small amplitude at slow speed as the fingertips strike the rim. The glass tips, falls, and hits the floor with a sharp impact; cracks spread through it as fragments slide outward. Toward the end, the moving pieces lose momentum and settle into the exact broken arrangement, hand position, camera angle, lighting, and final composition established by <Picture 1>.

overall_soundscape: Fingertips tap the glass before it scrapes across the tabletop, falls, and breaks with a sharp crash. Small fragments scatter and gradually stop sliding across the floor.

non_diegetic_music: A low electronic pulse at a slow tempo, ending immediately after the glass breaks.
```

#### 📌 详情

- **描述:** 完整玻璃杯→碰落→碎裂→碎片静止，最终精确落在尾帧的破碎构图
- **类型:** L2VA
- **时长:** 6 秒 / 单镜头
- **来源:** [官方视频提示词写作指南](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)
- **核心技巧:** 尾帧对齐句 + 推断合理前序状态 + 结尾收敛到参考图
- **标签:** 电影感, 特写, 破坏, 单镜头
