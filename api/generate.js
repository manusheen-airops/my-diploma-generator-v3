const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

// 1. Resolve the path relative to the root of the project
const fontPath = path.resolve('./fonts/Saans-Regular.ttf');

// 2. Debug Check: If the file is missing, the API will tell us why
if (!fs.existsSync(fontPath)) {
    console.error(`FONT NOT FOUND AT: ${fontPath}`);
}

try {
    registerFont(fontPath, { family: 'Saans' });
} catch (e) {
    console.error("Registration error:", e);
}

export default async function handler(req, res) {
  const { name = 'Graduate Name', cohort = 'Intermediate', date = 'March 2026' } = req.query;

  try {
    const width = 1920; 
    const height = 1080; 
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, width, height);

    ctx.fillStyle = '#1a1a1a';
    ctx.textAlign = 'center';

    // 3. Applying the font (Removing "bold" as Saans Regular is often heavy enough)
    ctx.font = '110px "Saans"'; 
    ctx.fillText(name, width / 2, 520); 
    
    const rightAnchor = 1400; 
    ctx.textAlign = 'center'; 
    
    ctx.font = '50px "Saans"';
    ctx.fillText(cohort, rightAnchor, 775);
    
    ctx.font = '50px "Saans"';
    ctx.fillText(date, rightAnchor, 925);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Font Error: ${error.message} - Path: ${fontPath}`);
  }
}
