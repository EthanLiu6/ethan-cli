# @ethan/cli - Ethan 构建工具

这是一个自定义的前端脚手架构建工具，旨在替代复杂的内网工具，提供简洁、透明的 Vue3 项目初始化能力。

## 核心功能
- **项目初始化**: `ethan init <project-name>`
- **内置模版**: 集成了 Vue3 + Vite + Ant Design Vue + Tailwind CSS 的标准开源模版。
- **纯净无内网依赖**: 所有依赖均来自 npm 公开仓库。

## 安装方式

### 本地开发调试
在 `ethan-cli` 目录下执行：
```bash
npm link
```
执行后，你可以在全局使用 `ethan` 命令。

### 上传到 npm (可选)
1. 在 `package.json` 中确认名称为 `@ethan/cli`（如果需要发布到私有域或公开域，请确保你有对应权限）。
2. 执行 `npm publish --access public`。

## 使用说明

### 1. 初始化新项目
```bash
ethan init my-new-project
```
该命令会自动创建一个名为 `my-new-project` 的文件夹，并将内置的开源模版复制进去，同时自动配置好 `package.json` 中的项目名称。

### 2. 模版维护
内置模版位于 `ethan-cli/template` 目录下。如果你需要修改默认的页面、工具类或配置，直接修改该目录下的文件即可。

## 技术架构
- **CLI 框架**: [Commander.js](https://github.com/tj/commander.js)
- **交互提示**: [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- **终端美化**: [Chalk](https://github.com/chalk/chalk) & [Ora](https://github.com/sindresorhus/ora)
- **文件操作**: [fs-extra](https://github.com/jprichardson/node-fs-extra)
