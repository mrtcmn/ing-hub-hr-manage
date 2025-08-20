/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {legacyPlugin} from '@web/dev-server-legacy';

const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        // Manually imported in index.html file
        webcomponents: false,
      },
    }),
  ],
  // SPA routing configuration - serve index.html for all routes
  appIndex: 'index.html',
  // Handle client-side routing by serving index.html for all paths
  // This allows the SPA to handle routing on the client side
  historyApiFallback: true,
  // Custom middleware to handle SPA routing
  middleware: [
    (context, next) => {
      // Check if the request is for a file (has extension)
      const hasExtension = /\.[^/]+$/.test(context.url);
      
      // If it's not a file request and not already index.html, serve index.html
      if (!hasExtension && !context.url.includes('index.html')) {
        context.url = '/index.html';
      }
      
      return next();
    }
  ],
};
