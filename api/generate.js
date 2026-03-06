const { createCanvas, loadImage } = require('canvas');

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  try {
    // 1. Create the canvas
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    // 2. Load the Background
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 2000, 1414);

    // 3. Set Text Style (Using built-in 'serif' to prevent crashes)
    ctx.font = 'bold 85px serif';
    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';
    
    // 4. Draw Name (Centered)
    ctx.fillText(name, 1000, 510);

    // 5. Send Image
    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Generation Error: ${error.message}`);
  }
}
