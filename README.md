# 自然拼读自由拼 - Blending Blocks

牛津自然拼读法的交互式学习工具。输入任意英文单词，自动拆分为音素并展示发音规则。

## 使用方式

- **双击 `index.html`** 在浏览器打开即可使用
- 选择预设单词或输入自由单词，查看音素拆分
- 点击音素积木可听发音

## 部署到 GitHub Pages

1. 创建 GitHub 仓库
2. 上传 `index.html` 到仓库根目录
3. 开启 Settings → Pages（选择 main 分支）
4. 访问 `https://你的用户名.github.io/仓库名/`

## 技术说明

- 纯前端，单 HTML 文件，无外部依赖
- 语音使用 Web Speech API（需要 HTTPS）
- 音素分割基于牛津自然拼读规则
