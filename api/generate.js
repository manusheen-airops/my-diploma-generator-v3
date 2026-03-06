const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  try {
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    // 1. Load Background
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 2000, 1414);

    // 2. Set Text Style
    // We use 'serif' as a fallback, but we'll try to use a standard system font first
    ctx.font = 'bold 85px serif';
    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';
    
    // 3. Draw Name (Centered at 1000px, 510px down)
    ctx.fillText(name, 1000, 510);

    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(buffer);
  } catch (error) {
    res.status(500).send(`Font Error: ${error.message}`);
  }
}
