const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// 1. Precise path and registration
// We use path.join to make sure Linux finds it correctly
const fontPath = path.join(process.cwd(), 'fonts', 'Saans-Regular.ttf');

try {
    registerFont(fontPath, { family: 'Saans' }); // Let's name the family 'Saans' for clarity
    console.log("Saans font registered successfully");
} catch (e) {
    console.error("Font registration failed:", e);
}

export default async function handler(req, res) {
  const { name = 'Graduate Name', cohort = 'Intermediate', date = 'November 25, 2025' } = req.query;

  try {
    const width = 1920; 
    const height = 1080; 
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = '#0e1f13';

    // 2. USE THE REGISTERED NAME EXACTLY
    // We remove "serif" for a second to TEST if Saans is actually working
    ctx.textAlign = 'center'; 
    ctx.font = 'bold 120px "Saans"'; 
    ctx.fillText(name, width / 2, 520); 
    
    const rightAnchor = 1400; 
    ctx.textAlign = 'center'; 
    
    ctx.font = 'italic 50px "Saans"';
    ctx.fillText(cohort, rightAnchor, 775);
    
    ctx.font = '50px "Saans"';
    ctx.fillText(date, rightAnchor, 925);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Font Error: ${error.message}`);
  }
}
