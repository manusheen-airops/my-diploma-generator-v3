const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// This tells the server to look for the font file you uploaded earlier
// Make sure the file in your /fonts folder is EXACTLY named 'Arial.ttf'
try {
    const fontPath = path.resolve('./fonts/Arial.ttf');
    registerFont(fontPath, { family: 'DiplomaFont' });
} catch (e) {
    console.log("Font registration skipped or failed, using fallback.");
}

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  try {
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 2000, 1414);

    // If 'DiplomaFont' failed, it will fall back to 'serif'
    ctx.font = 'bold 85px "DiplomaFont", serif';
    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';
    
    ctx.fillText(name, 1000, 510);

    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}
