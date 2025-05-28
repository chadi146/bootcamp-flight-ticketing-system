import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { render } from './main.server'; // render function from main.server.ts

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const templateHtml = readFileSync(resolve(browserDistFolder, 'index.html'), 'utf-8');


const app = express();
const angularApp = new AngularNodeAppEngine();

// Optional: Add REST API endpoints
// app.get('/api/**', (req, res) => { ... });

/**
 * Serve static assets from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle Angular SSR for all other routes
 */
app.get('*', async (req, res) => {
  const html = await render(req.url, templateHtml);
  res.send(html);
});

/**
 * Fallback for AngularNodeAppEngine
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
