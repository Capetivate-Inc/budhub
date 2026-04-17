import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const now = new Date()
const est = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }))
const buildVersion = `V.${est.getMonth() + 1}.${est.getDate()}.${est.getFullYear() % 100}.${est.getHours()}.${est.getMinutes().toString().padStart(2, "0")}`

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BUILD_VERSION': JSON.stringify(buildVersion),
  },
})
