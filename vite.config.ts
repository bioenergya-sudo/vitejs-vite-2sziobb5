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
      }
    }
  }
})
