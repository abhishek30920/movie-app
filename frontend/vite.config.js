import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname,"./../frontend");
  const env = loadEnv(mode, envDir); // Loads variables from backend/.env*
``
  // Ensure variables are correctly loaded
  console.log("VITE_SERVER:", env.VITE_SERVER); // Debug check

  return {
    envDir, // Tell Vite where .env files are located
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER, // Use the prefixed variable
          changeOrigin: true,
        },
      },
    },
  };
});