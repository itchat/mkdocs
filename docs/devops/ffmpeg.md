## Shortcuts

### 网络串流保存

```bash
ffmpeg -i "<https://somem3u8linkfromwebsite.master.m3u8>" -c:v libx264 -preset slow -crf 22 "save.mp4"
```

### 视频片段裁剪

```bash
ffmpeg -ss 00:00:00 -t 00:00:30 -i input.mp4 -vcodec copy -acodec copy output.mp4
```

### 按照视频序号合并

在文件夹下按照数字排序文件后直接合并，适用于 m3u8 等文件被分段保护后的合并重组

```bash
ffmpeg -safe 0 -f concat -i <(find "$PWD" -name '*.mp4' -printf "file '%p'\\\\n" | sort) -c copy output.mp4
```

### 视频批量转换格式

```bash
for i in *.flv;
  do name=`echo "$i" | cut -d'.' -f1`
  echo "$name"
  ffmpeg -i "$i" "${name}.mp4"
done
```

### 音频嵌入 MP4 视频

```bash
ffmpeg -i input.mp4 -i input.mp3 -c copy -map 0:v:0 -map 1:a:0 output.mp4 
```

### MP4 底部嵌入 SRT 字幕

```bash
ffmpeg -i input.mp4 -vf subtitles=subtitles.srt output.mp4
```
