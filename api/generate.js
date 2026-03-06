const { createCanvas, loadImage } = require('canvas');

export default async function handler(req, res) {
  const { name = 'Graduate' } = req.query;

  try {
    // 1. Create the canvas (the size of your certificate)
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    // 2. Load your background image
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 2000, 1414);

    // 3. Add the Name
    ctx.font = 'bold 85px serif';
    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';
    
    // This sits the name right on the line (510px down)
    ctx.fillText(name, 1000, 510);

    // 4. Send the final image back
    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(buffer);
  } catch (error) {
    res.status(500).send(`Error generating image: ${error.message}`);
  }
}
