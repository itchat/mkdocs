# Ronin's Notes

个人学习笔记网站，使用 MkDocs Material 主题构建。

## 网站信息

- **站点名称**: Ronin's Notes
- **站点URL**: https://execution.icu
- **主题**: Material for MkDocs
- **作者**: ronin

## 功能特性

- 📝 Markdown 文档编写
- 🎨 Material Design 主题
- 🔍 全文搜索支持
- 📱 响应式设计
- 🌙 深色/浅色主题切换
- 📊 数学公式支持 (KaTeX)
- 🎯 代码高亮
- 📁 自动构建和部署

## 技术栈

- **MkDocs**: 静态网站生成器
- **Material for MkDocs**: 主题
- **GitHub Actions**: CI/CD 自动化
- **GitHub Pages**: 网站托管 (可选)

## 本地开发

### 环境要求

- Python 3.x
- pip

### 安装依赖

```bash
pip install -r requirements.txt
```

### 本地预览

```bash
# 启动开发服务器
mkdocs serve

# 构建静态网站
mkdocs build
```

## CI/CD 流程

本项目配置了 GitHub Actions 自动化流程：

### 触发条件

- 推送到 `main` 或 `master` 分支
- PR 到 `main` 或 `master` 分支  
- 手动触发
- 文件变更检测：
  - `docs/**` - 文档内容
  - `mkdocs.yml` - 配置文件
  - `resources/**` - 资源文件
  - `requirements.txt` - 依赖文件
  - `.github/workflows/**` - 工作流文件

### 构建流程

1. **环境准备**
   - 检出代码
   - 设置 Python 环境
   - 缓存 pip 依赖

2. **依赖安装**
   - 安装 `mkdocs-material`
   - 安装额外插件和扩展

3. **文档构建**
   - 执行 `mkdocs build`
   - 生成静态网站文件

4. **构建产物**
   - 上传 `site/` 目录作为构建产物
   - 保留 30 天

5. **自动部署** (可选)
   - 仅在主分支推送时触发
   - 自动部署到 GitHub Pages

### 工作流文件

- `.github/workflows/build.yml` - 主要的 CI/CD 工作流

## 项目结构

```
.
├── docs/                   # 文档源文件
│   ├── index.md           # 首页
│   ├── arts/              # 艺术相关
│   ├── tools/             # 工具相关  
│   ├── cs/                # 计算机科学
│   ├── handbook/          # 手册
│   └── cyber/             # 网络安全
├── resources/             # 静态资源
├── .github/
│   └── workflows/         # GitHub Actions 工作流
├── mkdocs.yml            # MkDocs 配置文件
├── requirements.txt      # Python 依赖
└── site/                 # 构建输出 (Git 忽略)
```

## 配置说明

主要配置文件 `mkdocs.yml` 包含：

- 网站基本信息
- 导航结构
- 主题配置
- 插件设置
- Markdown 扩展

## 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 在 `docs/` 目录下添加或修改 Markdown 文件
4. 提交更改并推送
5. 创建 Pull Request

CI/CD 流程会自动构建和验证您的更改。

## 许可证

本项目采用相应的许可证，详见 `LICENSE` 文件。