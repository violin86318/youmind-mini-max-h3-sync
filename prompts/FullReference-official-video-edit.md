### Full-Reference: 官方可复现案例 · 视频编辑与音色替换

> ✅ 官方验证案例 — 此提示词与视频为官方仓库提供的可复现配对（768p）

#### 📖 描述

MiniMax 官方仓库的可复现 Ref2VA 案例：保留原视频中粉西装男子与羊羔的画面，仅通过参考音频替换其说话音色并改写台词。展示六段式全参考模式（subject_definitions / summary / retention_analysis / detailed_description / overall_soundscape / non_diegetic_music）的完整实战用法。

#### 📝 Prompt

```text
subject_definitions:
<Subject 1> is the young man with short wavy blonde hair, wearing a bright pink suit jacket, matching pink trousers, an unbuttoned white shirt, and silver rings, holding a small black lamb in his arms in <Video 1>.
<Video 1> is the source video for the editing task.
<Audio 1> is the synchronized audio track of <Video 1>, providing the background music.
<Audio 2> is the voice timbre reference for <Subject 1>'s voice, containing a spoken male voiceover.

summary:
[video editing + audio reference + audio reuse] The target video is an edited version of <Video 1>. <Subject 1>, wearing a bright pink suit and holding a black lamb, stands in a grassy field with other white lambs in the background. The edit animates <Subject 1>'s face to speak the user-provided dialogue. <Audio 1> is partially reused as the continuous background music, while the target references the calm male voice timbre of <Audio 2> for <Subject 1>'s spoken lines.

retention_analysis:
<Subject 1> (appears in [Shot 1]): fully_preserved - the man retains his identity, wavy blonde hair, pink suit, white shirt, accessories, and the black lamb he holds, with his mouth newly animated to speak.
<Video 1> (source video editing): fully_preserved - the original camera framing, warm golden hour lighting, grassy hill setting, and background white lambs are maintained while the central character is edited.
<Audio 1>: partially_copy - the atmospheric background music from <Audio 1> is reused in the target video, mixed beneath the newly added spoken dialogue.
<Audio 2>: reference - the target audio references the male voice timbre from <Audio 2> to generate <Subject 1>'s spoken dialogue.

detailed_description:
The target video is in realistic photographic style.
[Shot 1] The shot begins from the source <Video 1>, showing <Subject 1>, a young man with short wavy blonde hair, wearing a bright pink suit jacket, matching pink trousers, and a casually unbuttoned white shirt. He stands confidently in a sunlit green pasture, gently holding a small black lamb securely in his arms. The warm, golden hour lighting casts soft shadows across his face and the bright pink fabric of his suit. Behind him, several white lambs stand and graze on the rolling grassy hill against a clear, pale blue sky. The atmospheric background music from <Audio 1> plays continuously throughout the scene. <Subject 1> physically speaks, his mouth movements naturally syncing to the new dialogue, with his voice timbre referencing the calm male delivery from <Audio 2>. Looking thoughtfully forward, <Subject 1> (S1) speaks softly, <d>[English] Follow the wind, live free.</d> As he delivers the line, he subtly shifts his weight, cradling the resting black lamb while the camera slowly pushes in. <Subject 1> (S1) continues his thought, <d>[English] Leave worries behind, enjoy the moment.</d> Exactly as his voice stops, his lips meet in a relaxed, peaceful smile, and his jaw ceases speaking motion. He then turns his gaze slightly away toward the horizon, gently stroking the black lamb's fleece with his fingers as the camera holds on this tranquil, sunlit state through the end of the video.

overall_soundscape:
The soundscape consists of the continuous, atmospheric background music from <Audio 1>, overlaid with the clear, calm male dialogue spoken by the main character, referencing the voice timbre of <Audio 2>.

non_diegetic_music:
The atmospheric, sustained background music from <Audio 1> is reused as the continuous score, playing quietly beneath the spoken dialogue.
```

#### 🎬 示例视频

<video controls muted loop preload="metadata" src="https://huggingface.co/MiniMaxAI/MiniMax-H3/resolve/main/assets/ref2va.mp4"></video>

#### 📌 详情

- **类型:** Full-Reference
- **时长:** ~15 秒
- **来源:** [官方可复现脚本](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/scripts/readme/reproducible-768p-ref2va-request.sh) · [视频](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/assets/ref2va.mp4)
- **核心技巧:** 六段式结构 + 音色参考（voice timbre）+ 保留关系标注（fully_preserved / attribute_transfer）
- **描述:** 视频编辑、音色替换、口型同步、官方验证
