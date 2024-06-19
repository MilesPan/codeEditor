import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 3030,
    open: false,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3000',
        pathRewrite: { '^/api': '' }
      }
    },
  },
  source: {
    define: {
      'process.env': JSON.stringify(process.env)
    }
  }
});
