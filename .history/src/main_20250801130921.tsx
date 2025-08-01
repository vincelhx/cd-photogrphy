// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/Global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <div className="bg-red-500 text-white p-4">
  ✅ Tailwind fonctionne
  </div>

  </React.StrictMode>,
)
