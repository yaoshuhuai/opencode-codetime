# opencode-codetime

自动统计代码行数的 OpenCode 插件，支持文件保存时自动触发统计，多语言分类统计。

## 功能特性

- 📁 文件保存时自动触发统计
- 🌐 支持 30+ 种编程语言分类统计
- 📊 增量统计（本次会话新增/删除/净增行数）
- 📈 全量统计（按语言分类）
- 📝 终端彩色输出 + JSON 文件持久化

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

## 开发

```bash
# 安装依赖
npm install

# 开发模式（监听文件变化自动编译）
npm run dev

# 构建
npm run build
```

## License

MIT
