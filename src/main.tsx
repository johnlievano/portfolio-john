import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { ThemeProvider } from './hooks/useTheme' // Importa el Provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Envolvemos la App con el Provider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)