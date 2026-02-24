import { createCanvas, registerFont } from 'canvas';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

registerFont('/tmp/boogaloo.ttf', { family: 'Boogaloo' });

const scale = 2;
const w = 900;
const h = 340;

const canvas = createCanvas(w * scale, h * scale);
const ctx = canvas.getContext('2d');
ctx.scale(scale, scale);
ctx.clearRect(0, 0, w, h);

const fontSize = 250;
ctx.font = `${fontSize}px Boogaloo`;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
const cx = w / 2;
const cy = h / 2 + 5;

// Soft drop shadow
for (let i = 20; i >= 1; i--) {
  ctx.fillStyle = `rgba(100, 70, 40, 0.015)`;
  ctx.fillText('Faber', cx + i * 0.5, cy + i * 0.65);
}

// Moderate stroke to fatten just enough for puffy look
ctx.strokeStyle = '#DDD0C5';
ctx.lineWidth = 14;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeText('Faber', cx, cy);

// Main fill
ctx.fillStyle = '#DDD0C5';
ctx.fillText('Faber', cx, cy);

const outPath = join(__dirname, '..', 'public', 'faber-logo-final.png');
writeFileSync(outPath, canvas.toBuffer('image/png'));
console.log('Logo generated!');
