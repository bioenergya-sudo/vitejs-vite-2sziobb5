import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        elektro: './elektro.html',
        'vik-remonti': './vik-remonti.html',
        mebeli: './mebeli.html',
        montaji: './montaji.html',
        dovarshitelni: './dovarshitelni.html',
        gumi: './gumi.html',
        // Генерирани от scripts/static-pages.mjs (npm run build ги пуска първи)
        'za-nas': './za-nas.html',
        en: './en.html',
        'en/plumbing-repairs-sofia': './en/plumbing-repairs-sofia.html',
        'en/home-finishing-sofia': './en/home-finishing-sofia.html',
        'en/appliance-installation-sofia': './en/appliance-installation-sofia.html',
        'en/furniture-assembly-sofia': './en/furniture-assembly-sofia.html',
        'en/electrical-installation-sofia': './en/electrical-installation-sofia.html',
        'en/seasonal-tyre-change-sofia': './en/seasonal-tyre-change-sofia.html',
      }
    }
  }
})
