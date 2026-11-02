const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;
const PUBLIC_DIR = path.join(__dirname, 'public');

function injectSiteUrl(html) {
  return html.replace(/\{\{SITE_URL\}\}/g, SITE_URL.replace(/\/+$/, ''));
}

function serveHtml(fp, res) {
  fs.readFile(fp, 'utf8', (err, data) => {
    if (err) return serve404(res);
    res.set('Content-Type', 'text/html; charset=utf-8').send(injectSiteUrl(data));
  });
}

function serve404(res) {
  res.status(404).set('Content-Type', 'text/html; charset=utf-8')
    .send('<html><body><h1>404 — Page Not Found</h1><p><a href="/">Return home</a></p></body></html>');
}

app.use(express.static(PUBLIC_DIR, { extensions: false, index: false }));

app.get('*', (req, res) => {
  let p = req.path;
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
  if (p === '/') return serveHtml(path.join(PUBLIC_DIR, 'index.html'), res);
  const exact = path.join(PUBLIC_DIR, p);
  if (fs.existsSync(exact) && fs.statSync(exact).isFile())
    return p.endsWith('.html') ? serveHtml(exact, res) : res.sendFile(exact);
  const html = path.join(PUBLIC_DIR, p + '.html');
  if (fs.existsSync(html) && fs.statSync(html).isFile()) return serveHtml(html, res);
  serve404(res);
});

app.listen(PORT, () => console.log(`Fargate Systems Training running at ${SITE_URL}`));
