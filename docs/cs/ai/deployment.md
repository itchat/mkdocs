# LLM Deployment

## vLLM

唯一目前支持 `tool parser` 以及自动工具调用的推理工具，可惜在 macOS 中只支持 CPU 模式。

在 `langchain` 强制绑定工具调用时需要启动特定工具选项，下面拿 [MiroThinker-v1.0-8B](https://huggingface.co/miromind-ai/MiroThinker-v1.0-8B) 举例：

### Runpod

```sh
--host 0.0.0.0 --port 8001 --model miromind-ai/MiroThinker-v1.0-8B --dtype bfloat16 --max-model-len 32768 --max-num-batched-tokens 65536 --tensor-parallel-size 1 --enable-auto-tool-choice --tool-call-parser hermes --trust-remote-code --api-key YOUR_API_KEY
```

### Linux

```sh
vllm serve miromind-ai/MiroThinker-v1.0-8B \
  --host 0.0.0.0 \
  --port 8001 \
  --dtype bfloat16 \
  --max-model-len 32768 \
  --max-num-batched-tokens 65536 \
  --tensor-parallel-size 1 \
  --enable-auto-tool-choice \
  --tool-call-parser hermes \
  --trust-remote-code \
  --api-key YOUR_API_KEY
```

80GB 显存，如 A100-80G, H100 - 推荐设置：`--max-model-len` `65536` 或 `131072`，需要比请求里的 `max_tokens` 参数大

### macOS

```sh
uv run mlx_lm.server --model miromind-ai/MiroThinker-v1.0-8B --port 8001 --host 0.0.0.0 --temp 1.0 --top-p 0.95 --max-tokens 16384
```

---

在不清楚 `--tool-call-parser` 的情况下，粘贴模型的 `chat_template.jinja` 代码给 Gemini 分析即可