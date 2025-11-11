# CopilotKit 集成指南

## 🎉 已完成配置

你的 Vite React 项目已经成功集成了 CopilotKit！

## 📦 已安装的依赖

- `@copilotkit/react-core` - CopilotKit 核心库
- `@copilotkit/react-ui` - CopilotKit UI 组件
- `@copilotkit/runtime` - CopilotKit 运行时
- `@copilotkit/shared` - CopilotKit 共享工具
- `openai` - OpenAI SDK
- `express` - 后端服务器

## 🚀 如何运行

### 方式一：使用 CopilotKit Cloud（推荐 - 最简单）

你已经有了 CopilotKit 的 API Key，直接运行前端即可：

```bash
npm run dev
```

然后访问 http://localhost:5173

### 方式二：使用自己的 OpenAI API Key

1. 在 `.env` 文件中设置你的 OpenAI API Key：
```
OPENAI_API_KEY=sk-your-openai-api-key
```

2. 启动后端服务器：
```bash
npm run server
```

3. 在另一个终端启动前端：
```bash
npm run dev
```

4. 修改 `src/main.tsx` 中的 `runtimeUrl`：
```tsx
<CopilotKit 
  runtimeUrl="http://localhost:4000/api/copilotkit"
>
```

## 💡 功能说明

### 当前已实现的功能

1. **CopilotSidebar** - 右侧的 AI 助手聊天界面
2. **useCopilotReadable** - 让 AI 知道当前的状态（如 count 值）
3. **useCopilotAction** - AI 可以调用的动作（如设置计数器值）

### 试试这些对话

- "当前的计数器值是多少？"
- "请把计数器设置为 100"
- "帮我把计数器增加到 50"

## 🛠️ 自定义配置

### 修改 AI 助手的行为

在 `App.tsx` 中的 `CopilotSidebar` 组件，你可以修改：

```tsx
<CopilotSidebar
  defaultOpen={true}  // 是否默认打开
  instructions="..."  // AI 助手的系统提示词
  labels={{
    title: "AI 助手",  // 标题
    initial: "你好！",  // 欢迎消息
  }}
/>
```

### 添加更多 AI 动作

使用 `useCopilotAction` 添加更多功能：

```tsx
useCopilotAction({
  name: "yourAction",
  description: "动作描述",
  parameters: [
    {
      name: "param",
      type: "string",
      description: "参数描述",
      required: true,
    },
  ],
  handler: async ({ param }) => {
    // 你的逻辑
  },
})
```

### 让 AI 知道更多状态

使用 `useCopilotReadable` 共享状态：

```tsx
useCopilotReadable({
  description: "状态描述",
  value: yourState,
})
```

## 📚 更多组件

除了 `CopilotSidebar`，你还可以使用：

- `CopilotPopup` - 弹窗式聊天
- `CopilotTextarea` - 带 AI 辅助的文本框
- `CopilotChat` - 自定义聊天组件

## 🔗 相关链接

- [CopilotKit 官方文档](https://docs.copilotkit.ai)
- [CopilotKit GitHub](https://github.com/CopilotKit/CopilotKit)
- [示例项目](https://github.com/CopilotKit/CopilotKit/tree/main/examples)

## 🐛 故障排查

如果遇到问题：

1. 确保已安装所有依赖：`npm install`
2. 检查 `.env` 文件中的 API Key 是否正确
3. 查看浏览器控制台是否有错误信息
4. 确保网络连接正常（需要访问 CopilotKit 或 OpenAI API）
