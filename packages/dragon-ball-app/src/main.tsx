import { createRoot } from 'react-dom/client'
import './index.css'
import 'abc-styles/dist/styles/common.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/dragon-ball-react/">
    <App />
  </BrowserRouter>
)
