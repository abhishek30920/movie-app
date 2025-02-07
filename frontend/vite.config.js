import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({}) => {


  return {
 
    plugins: [react(), tailwindcss()],
   
    
   
}});