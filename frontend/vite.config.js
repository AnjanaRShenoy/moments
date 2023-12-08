import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
     // This is the port which we will use in docker
     host: true,

		watch: {
			usePolling: true
		},
    port:3000,
    proxy:{
      '/api':{
        target:'http://localhost:5000',
        changeOrigin:true,
      },
    },
  },
})
