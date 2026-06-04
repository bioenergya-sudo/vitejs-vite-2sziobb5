import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ZaNas from './pages/ZaNas.jsx'
import SeoManager from './seo/SeoManager.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SeoManager />
      <Routes>
        {/* Bulgarian */}
        <Route path="/"                element={<App />} />
        <Route path="/vik-remonti"     element={<LandingPage service="vik" />} />
        <Route path="/dovarshitelni"   element={<LandingPage service="dovarshitelni" />} />
        <Route path="/montaji"         element={<LandingPage service="montaji" />} />
        <Route path="/mebeli"          element={<LandingPage service="mebeli" />} />
        <Route path="/elektro"         element={<LandingPage service="elektro" />} />
        <Route path="/za-nas"          element={<ZaNas />} />

        {/* English */}
        <Route path="/en"                              element={<App lang="en" />} />
        <Route path="/en/plumbing-repairs-sofia"       element={<LandingPage service="vik" lang="en" />} />
        <Route path="/en/home-finishing-sofia"         element={<LandingPage service="dovarshitelni" lang="en" />} />
        <Route path="/en/appliance-installation-sofia" element={<LandingPage service="montaji" lang="en" />} />
        <Route path="/en/furniture-assembly-sofia"     element={<LandingPage service="mebeli" lang="en" />} />
        <Route path="/en/electrical-installation-sofia" element={<LandingPage service="elektro" lang="en" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)