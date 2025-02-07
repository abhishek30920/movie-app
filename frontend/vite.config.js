import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const envDir = path.resolve(__dirname, "./../frontend");
  const env = loadEnv(mode, envDir);

  // Optional: Add validation for critical env variables
  if (!env.VITE_SERVER) {
    console.error("VITE_SERVER is not defined!");
    throw new Error("Missing VITE_SERVER environment variable");
  }

  return {
    envDir,
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/api/':  env.VITE_SERVER,
      
       
        
      },
    
   
}}});