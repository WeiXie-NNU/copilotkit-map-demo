# 🗺️ AI 地图助手

基于 CopilotKit + LangGraph 的智能地图查询应用

## ✨ 功能特点

- 🤖 **AI 对话交互** - 通过自然语言查询地理位置
- 🗺️ **实时地图显示** - 基于 OpenStreetMap 的地图展示
- 🎯 **智能地点识别** - 内置常见地标坐标库
- 📍 **坐标查询支持** - 支持直接输入经纬度坐标
- 🚀 **LangGraph 集成** - 使用 LangGraph 智能体作为后端

## 🏗️ 技术栈

### 前端
- **React 19** + **TypeScript**
- **Vite** - 快速构建工具
- **CopilotKit** - AI 对话框架
- **OpenStreetMap** - 开源地图服务

### 后端
- **CopilotKit Runtime** - Express 服务器
- **LangGraph** - AI 智能体框架
- **OpenAI API** - 大语言模型

## 📦 项目结构

```
vite-project/
├── src/
│   ├── App.tsx          # 主应用组件
│   ├── main.tsx         # 应用入口
│   ├── App.css          # 应用样式
│   └── index.css        # 全局样式
├── copilotkit_runtime/
│   ├── server.ts        # CopilotKit Runtime 服务器
│   └── package.json     # 后端依赖
├── public/              # 静态资源
└── package.json         # 前端依赖
```

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- npm 或 yarn
- OpenAI API Key
- LangGraph 智能体服务（运行在 localhost:2011）

### 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd copilotkit_runtime
npm install
```

### 环境配置

在项目根目录创建 `.env` 文件：

```env
# OpenAI API 配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_BASE=https://api.openai.com/v1

# 代理配置（如需要）
HTTP_PROXY=http://127.0.0.1:7890
HTTPS_PROXY=http://127.0.0.1:7890
```

### 启动服务

#### 1. 启动 LangGraph 智能体

```bash
# 在你的 LangGraph 项目目录
langgraph dev
```

确保服务运行在 `http://127.0.0.1:2011`

#### 2. 启动 CopilotKit Runtime

```bash
cd copilotkit_runtime
npm run dev
```

服务将运行在 `http://localhost:4000/copilotkit`

#### 3. 启动前端

```bash
npm run dev
```

访问 `http://localhost:5173`

## 💬 使用示例

### 支持的查询方式

#### 1. 地点名称查询
```
"显示北京天安门"
"上海东方明珠在哪里？"
"带我看看巴黎埃菲尔铁塔"
```

#### 2. 坐标查询
```
"查看坐标 40.7580, -73.9855"
"显示纬度 39.9042，经度 116.4074"
```

### 内置地点坐标

- 🇨🇳 北京天安门：39.9042, 116.4074
- 🇨🇳 上海东方明珠：31.2397, 121.4997
- 🇨🇳 广州塔：23.1088, 113.3191
- 🇨🇳 杭州西湖：30.2489, 120.1489
- 🗽 纽约时代广场：40.7580, -73.9855
- 🗼 巴黎埃菲尔铁塔：48.8584, 2.2945
- 🗼 东京塔：35.6586, 139.7454
- 🇬🇧 伦敦：51.5074, -0.1278

## 🛠️ 开发

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

### 预览生产构建

```bash
npm run preview
```

## 📝 API 说明

### CopilotAction: showMap

显示地图的 AI 动作

**参数：**
- `address` (string, optional): 地点名称
- `latitude` (number, optional): 纬度坐标
- `longitude` (number, optional): 经度坐标

**示例：**
```typescript
useCopilotAction({
  name: "showMap",
  parameters: [
    { name: "address", type: "string", required: false },
    { name: "latitude", type: "number", required: false },
    { name: "longitude", type: "number", required: false },
  ],
  handler: async ({ address, latitude, longitude }) => {
    // 处理逻辑
  }
})
```

## 🔧 配置说明

### CopilotKit Runtime 配置

`copilotkit_runtime/server.ts`:

```typescript
const runtime = new CopilotRuntime({
  agents: {
    'my_agent': new LangGraphAgent({
      deploymentUrl: "http://127.0.0.1:2011",
      graphId: 'agent'
    })
  },
});
```

### 前端 CopilotKit 配置

`src/main.tsx`:

```typescript
<CopilotKit runtimeUrl="http://127.0.0.1:4000/copilotkit">
  <App />
</CopilotKit>
```

## 🐛 故障排查

### 常见问题

#### 1. OpenAI API Connection Error
- ✅ 检查 `.env` 文件中的 API Key 是否正确
- ✅ 检查网络连接（可能需要配置代理）
- ✅ 确认 `OPENAI_API_BASE` 地址正确

#### 2. LangGraph 连接失败
- ✅ 确认 LangGraph 服务正在运行
- ✅ 检查端口 2011 是否被占用
- ✅ 查看 LangGraph 日志

#### 3. 前端无法连接后端
- ✅ 确认 CopilotKit Runtime 正在运行
- ✅ 检查端口 4000 是否被占用
- ✅ 查看浏览器控制台错误信息

## 📄 License

MIT

## 👥 贡献

欢迎提交 Issue 和 Pull Request！

## 🔗 相关链接

- [CopilotKit 官方文档](https://docs.copilotkit.ai)
- [LangGraph 文档](https://langchain-ai.github.io/langgraph/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [React 文档](https://react.dev/)

---

**Made with ❤️ using CopilotKit & LangGraph**

