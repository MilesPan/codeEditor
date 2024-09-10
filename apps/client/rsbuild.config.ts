import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';

export default defineConfig({
  plugins: [pluginReact(), pluginTypedCSSModules()],
  server: {
    port: 3030,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' }
      }
    }
  },
  source: {
    define: {
      'process.env': JSON.stringify(process.env)
    }
  },
  html: {
    title: 'Code Editor'
  }
});
