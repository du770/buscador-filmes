import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Apply persisted theme early to avoid flash
try {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('theme-light');
  else if (saved === 'dark') document.documentElement.classList.remove('theme-light');
} catch {
  // ignore (e.g., SSR or privacy settings)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
