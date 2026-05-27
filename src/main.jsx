import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/montaj-osvetlenie" element={<LandingPage service="osvetlenie" />} />
        <Route path="/sglobyavane-mebeli" element={<LandingPage service="mebeli" />} />
        <Route path="/drebni-remonti" element={<LandingPage service="remonti" />} />
        <Route path="/za-nas" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)