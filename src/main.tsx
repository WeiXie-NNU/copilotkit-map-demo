import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CopilotKit } from '@copilotkit/react-core'
import '@copilotkit/react-ui/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit 
      runtimeUrl="http://127.0.0.1:4000/copilotkit"
      // showDevConsole={true}  // 开发时可以打开，查看 CopilotKit 日志
    >
      <App />
    </CopilotKit>
  </StrictMode>,
)
