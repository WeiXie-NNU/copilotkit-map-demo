import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNodeHttpEndpoint,
  LangGraphAgent
} from '@copilotkit/runtime';
import OpenAI from "openai";

const app = express();

// 启用 CORS 支持前端跨域请求
app.use(cors({
  origin: 'http://localhost:5173', // Vite 开发服务器地址
  credentials: true
}));

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY, 
  baseURL: process.env.OPENAI_API_BASE
});
const serviceAdapter = new OpenAIAdapter({ openai, model: "gpt-4o-mini" } as any);

app.post('/copilotkit', async (req, res) => {
  // 从请求中提取 threadId  
  const threadId = req.headers['x-thread-id'] as string || req.body?.threadId;
  
  console.log('🔗 [CopilotKit] Request received:', {
    method: req.method,
    threadId: threadId || 'new-thread',
    timestamp: new Date().toISOString()
  });

  const runtime = new CopilotRuntime({
    agents: {
      'my_agent': new LangGraphAgent({
        deploymentUrl: "http://127.0.0.1:2011",
        graphId: 'agent'
        // LangGraph Agent 会自动从 CopilotKit 的上下文中提取 threadId
      })
    },
  });

  const handler = copilotRuntimeNodeHttpEndpoint({
    endpoint: '/copilotkit',
    runtime,
    serviceAdapter,
  });

  try {
    return handler(req, res);
  } catch (error) {
    console.error('❌ [CopilotKit] Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    services: {
      copilotkit: 'running',
      langgraph: 'http://127.0.0.1:2011'
    }
  });
});

app.listen(4000, () => {
  console.log('✅ CopilotKit Runtime started');
  console.log('   📍 URL: http://localhost:4000/copilotkit');
  console.log('   🔗 LangGraph: http://127.0.0.1:2011');
  console.log('   💚 Health check: http://localhost:4000/health');
});