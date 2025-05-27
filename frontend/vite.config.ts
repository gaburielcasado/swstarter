import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default ({ mode }) => {
  // load the correct .env file
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const viteApiUrl = env.VITE_API_URL;
  console.log(`Using API URL: ${viteApiUrl}`);

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': env,
    },
  });
};
