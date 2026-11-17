// Copia il gioco dentro desktop/game e lo rende autonomo (motore 3D incluso, niente CDN).
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), out = path.join(__dirname, 'game');
fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(path.join(out, 'vendor'), { recursive: true });
for (const f of ['index.html', 'icon.svg', 'icon-192.png', 'icon-512.png', 'manifest.webmanifest']) fs.copyFileSync(path.join(root, f), path.join(out, f));
fs.copyFileSync(path.join(__dirname, 'node_modules', 'three', 'build', 'three.module.js'), path.join(out, 'vendor', 'three.module.js'));
const idx = path.join(out, 'index.html');
let html = fs.readFileSync(idx, 'utf8');
const cdn = 'https://unpkg.com/three@0.160.0/build/three.module.js';
if (!html.includes(cdn)) throw new Error('importmap di three non trovato in index.html');
html = html.replace(cdn, './vendor/three.module.js');
fs.writeFileSync(idx, html);
console.log('gioco pronto in', out);
