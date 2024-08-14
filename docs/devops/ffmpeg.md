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

### 有损压缩

```bash
ffmpeg -i input.mp4 -c:v libx264 -tag:v avc1 -movflags faststart -crf 30 -preset superfast output.mp4
```

`-c:v libx264` 主流、高效的 H.264 压缩编码。

`-movflags faststart` 元数据前置，视频还未完全下载时，就可以开始播放。

`-crf 30` 动态码律，大幅压缩的关键。

`-preset superfast` 提升压缩速度。

#### Automater

建立优化工作流，多文件选中即可压缩，该方案可用于所有脚本:

```bash
#!/bin/zsh
for f in "$@"
do
  /opt/homebrew/bin/ffmpeg -i "$f" -c:v libx264 -crf 30 -r 24 -movflags faststart -c:a aac -b:a 128k -preset superfast "${f%.*}_compressed.mp4"
done
```

### MacOS M 系列芯片推理加速

- H.264

```bash
-c:v h264_videotoolbox
```

- HEVC/H.265 

```bash
-c:v hevc_videotoolbox
```

```bash
ffmpeg -i input.mov -c:v h264_videotoolbox output.mp4
```

关于其解码器其他选项：

```bash
ffmpeg -h encoder=h264_videotoolbox 
ffmpeg -h encoder=hevc_videotoolbox
```

缺点为该类解码器并不支持 crf 选项，只能使用 `-b:v` 去设置码率：`-b:v 6000k.`
