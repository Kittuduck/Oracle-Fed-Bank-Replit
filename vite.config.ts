import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const geminiBaseUrl = env.AI_INTEGRATIONS_GEMINI_BASE_URL || '';
    const geminiTarget = geminiBaseUrl ? new URL(geminiBaseUrl) : null;

    return {
      server: {
        port: 5000,
        host: '0.0.0.0',
        allowedHosts: true,
        proxy: geminiTarget ? {
          '/gemini-proxy': {
            target: geminiTarget.origin,
            changeOrigin: true,
            rewrite: (path: string) => path.replace(/^\/gemini-proxy/, geminiTarget!.pathname),
          },
        } : undefined,
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.AI_INTEGRATIONS_GEMINI_API_KEY': JSON.stringify(env.AI_INTEGRATIONS_GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
