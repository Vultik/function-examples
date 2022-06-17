import { defineConfig, loadEnv } from 'vite';
import path from 'path';

// prettier-ignore
const INDEX_ROUTE = "^/(\\?.*)?$";
const API_ROUTE = '^/api/';
const ENV_KEYS = [
  'SHOPIFY_API_KEY',
  'SHOPIFY_ORDER_DISCOUNT_ID',
  'SHOPIFY_SHIPPING_DISCOUNT_ID',
  'SHOPIFY_PRODUCT_DISCOUNT_ID',
];

const root = new URL('.', import.meta.url).pathname;

// Function IDs are populated in ../../.env by the Shopify CLI after being deployed
if (process.env.npm_lifecycle_event === 'dev') {
  const envFile = loadEnv('dev', path.join(process.cwd(), '..', '..'), '');
  process.env = { ...process.env, ...envFile };
}

export default defineConfig({
  root,
  define: ENV_KEYS.reduce((env, key) => {
    env[`process.env.${key}`] = JSON.stringify(process.env[key]);
    return env;
  }, {}),
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      assets: path.resolve(root, './assets'),
      components: path.resolve(root, './components'),
      pages: path.resolve(root, './pages'),
      test: path.resolve(root, './test'),
    },
  },
  server: {
    port: process.env.FRONTEND_PORT,
    middlewareMode: 'html',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 64999,
      clientPort: 64999,
    },
    proxy: {
      [INDEX_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
      [API_ROUTE]: {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        changeOrigin: false,
        secure: true,
        ws: false,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test/setup.js',
    deps: {
      inline: ['@shopify/react-testing'],
    },
  },
});
