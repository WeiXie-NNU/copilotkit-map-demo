import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CopilotKit } from '@copilotkit/react-core'
import '@copilotkit/react-ui/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CopilotKit publicApiKey="ck_pub_b26393ce9fb20086b36d08ba72b903c9">
    {<App />}
    </CopilotKit>
    
  </StrictMode>,
)
