# 🚀 GitHub 备份步骤指南

## ✅ 已完成

- [x] 初始化本地 Git 仓库
- [x] 配置 .gitignore（已保护 .env 文件）
- [x] 创建首次提交（19 个文件已提交）

---

## 📋 接下来需要你手动完成的步骤

### 步骤 1: 在 GitHub 上创建新仓库

1. **访问 GitHub**
   - 打开浏览器访问：https://github.com
   - 登录你的 GitHub 账号

2. **创建新仓库**
   - 点击右上角的 `+` 号
   - 选择 "New repository"（新建仓库）

3. **填写仓库信息**
   - **Repository name**（仓库名称）：`ai-map-assistant` （或你喜欢的名字）
   - **Description**（描述）：`AI地图助手 - 基于 CopilotKit 的智能地图应用`
   - **Public/Private**：选择 Public（公开）或 Private（私有）
   - **⚠️ 重要**：不要勾选以下选项（保持未选中）：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license

4. **点击 "Create repository"** 创建仓库

---

### 步骤 2: 连接并推送到 GitHub

创建完仓库后，GitHub 会显示一些命令。**复制下面的命令并在终端中执行**：

#### 方式一：如果你的 GitHub 用户名是 `YOUR_USERNAME`，仓库名是 `ai-map-assistant`

```bash
# 1. 添加远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/ai-map-assistant.git

# 2. 设置主分支名称
git branch -M main

# 3. 推送代码到 GitHub
git push -u origin main
```

#### 方式二：直接从 GitHub 页面复制命令

GitHub 创建仓库后会显示类似这样的命令：

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

**直接复制 GitHub 显示的命令并在终端执行即可！**

---

### 步骤 3: 验证推送成功

推送完成后：

1. 刷新 GitHub 仓库页面
2. 你应该能看到所有的代码文件
3. README.md、使用说明.md 等文档会自动显示

---

## 🔐 安全提示

✅ **已保护的敏感信息**：
- `.env` 文件已被 .gitignore 排除
- 你的 API 密钥不会被上传到 GitHub
- node_modules 文件夹也已被排除

⚠️ **注意**：
- 不要在公开仓库中提交 API 密钥
- 如果需要分享项目，提供 `.env.example` 示例文件

---

## 📝 后续使用

### 更新代码到 GitHub

每次修改代码后，使用以下命令更新：

```bash
# 1. 查看修改的文件
git status

# 2. 添加修改的文件
git add .

# 3. 提交修改
git commit -m "描述你的修改内容"

# 4. 推送到 GitHub
git push
```

### 从其他地方克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/ai-map-assistant.git
cd ai-map-assistant
npm install
# 创建 .env 文件并添加 API 密钥
npm run dev
```

---

## 🆘 常见问题

### Q1: 推送时要求输入用户名和密码
**A**: GitHub 已不再支持密码认证，需要使用 Personal Access Token (PAT)

**解决方法**：
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token" → "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成后复制 token
5. 推送时，密码处粘贴这个 token

### Q2: 提示 "Permission denied"
**A**: 可能需要配置 SSH 密钥或使用 HTTPS + PAT

**推荐使用 HTTPS 方式**（简单）

### Q3: 想要更改远程仓库地址
```bash
git remote set-url origin NEW_URL
```

---

## 🎉 完成后

你的项目将被安全地备份到 GitHub 上，可以：
- ✅ 在任何地方访问代码
- ✅ 与他人分享项目
- ✅ 版本控制和历史记录
- ✅ 协作开发

---

**现在按照上面的步骤操作，几分钟就能完成 GitHub 备份！** 🚀
