const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// 1. Register the font so the server knows it exists
// This looks into your new /fonts folder
registerFont(path.resolve('./fonts/Arial.ttf'), { family: 'DiplomaFont' });

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  try {
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    // 2. Load the GTMGen Background
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 2000, 1414);

    // 3. Use your newly registered font
    ctx.font = 'bold 85px "DiplomaFont"'; 
    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';
    
    // Position the name on the signature line
    ctx.fillText(name, 1000, 510);

    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(buffer);
  } catch (error) {
    res.status(500).send(`Font Loading Error: ${error.message}`);
  }
}
