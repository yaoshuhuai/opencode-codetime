# opencode-codetime

[![npm version](https://img.shields.io/npm/v/opencode-codetime.svg)](https://www.npmjs.com/package/opencode-codetime)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 自动统计代码行数的 OpenCode 插件，支持文件保存时自动触发统计，多语言分类统计

## 概述

opencode-codetime 是一个为 [OpenCode](https://opencode.ai/) 打造的插件，能够自动追踪和统计你的代码贡献。无需手动操作，每次文件保存时自动统计代码行数，帮助你了解项目的代码规模和语言分布。

## 适用场景

- 📈 **追踪编码进度** - 了解每天编写了多少代码
- 🌍 **语言分布分析** - 了解项目中使用各语言的比例
- 📊 **项目规模评估** - 快速了解项目的代码规模
- 🏆 **编码成就激励** - 看着代码行数增长是一件很有成就感的事情

## 功能特性

- 📁 **文件保存自动触发** - 每次保存文件时自动统计，无需手动操作
- 🌐 **30+ 编程语言支持** - 支持 JavaScript, TypeScript, Python, Go, Rust, Java, Vue, React 等主流语言
- 📊 **增量统计** - 记录本次会话新增、删除、修改的代码行数
- 📈 **全量统计** - 统计目录下所有代码文件的总行数
- 🎨 **按语言分类** - 按编程语言分类统计代码行数
- 📝 **双输出模式** - 终端彩色输出 + JSON 文件持久化
- ⚙️ **可配置** - 支持自定义监控目录、输出文件名等

## 支持的语言

| 类别 | 语言 |
|------|------|
| 前端 | JavaScript, TypeScript, TSX, JSX, Vue, Svelte, HTML, CSS, SCSS, Less |
| 后端 | Python, Java, Go, Rust, C, C++, C#, PHP, Ruby, Kotlin, Scala |
| 脚本 | Shell, Bash, PowerShell, Batch |
| 数据 | JSON, YAML, XML, TOML, CSV |
| 其他 | Markdown, SQL, Dockerfile, Terraform |

## 安装

### 方式 1：npm 安装（推荐）

```bash
npm install opencode-codetime
```

### 方式 2：本地引用

```bash
# 克隆仓库
git clone https://github.com/your-username/opencode-codetime.git
cd opencode-codetime
npm install
npm run build
```

## 配置

在 `opencode.json` 中添加插件：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "opencode-codetime"
  ]
}
```

或使用本地路径：

```json
{
  "plugin": [
    "./plugins/codetime"
  ]
}
```

## 使用方法

1. 重启 OpenCode
2. 每次文件保存时自动统计并输出
3. 统计结果保存到 `codetime.json`

## 输出示例

```
📊 Code Time 统计
=================
📁 总文件数: 156
📝 总代码行数: 45,230

按语言分类:
  TypeScript   18,000 (39.8%)
  Python       12,000 (26.5%)
  Vue           5,500 (12.2%)
  JavaScript    3,200 (7.1%)
  Go            3,000 (6.6%)
  Markdown      2,530 (5.6%)

本次会话增量:
  ➕ 新增: 1,250 行
  ➖ 删除:   320 行
  ✏️ 修改:   930 行
  📈 净增:   930 行
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| watchDir | string | "." | 监控目录 |
| outputFile | string | "codetime.json" | 输出文件名 |
| debounceMs | number | 500 | 防抖延迟(毫秒) |

## 常见问题

### Q: 统计结果保存在哪里？
A: 默认保存在项目根目录的 `codetime.json` 文件中。

### Q: 如何排除某些文件或目录？
A: 目前插件会自动排除 `node_modules`、`.git`、`dist` 等目录，以及常见的二进制文件。如需自定义排除规则，可以修改源代码。

### Q: 统计的是代码行数还是文件行数？
A: 统计的是非空代码行数，不包括空行。

### Q: 支持统计注释行数吗？
A: 当前版本不区分注释行和代码行，统一统计为代码行数。

### Q: 如何查看历史统计？
A: 可以查看 `codetime.json` 文件，其中包含了会话开始时间、最后更新时间等历史信息。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: add xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 创建 Pull Request

## 反馈

如果你发现了 bug 或有新功能建议，请提交 [Issue](https://github.com/your-username/opencode-codetime/issues)。

## License

MIT
