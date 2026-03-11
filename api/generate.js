const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

// 1. Resolve path to your new Serrif font
const fontPath = path.resolve('./fonts/SerrifVF.ttf');

// 2. Debug Check
if (!fs.existsSync(fontPath)) {
    console.error(`FONT NOT FOUND AT: ${fontPath}`);
}

try {
    // We'll call the family 'SerrifFont' to avoid confusion with the old one
    registerFont(fontPath, { family: 'SerrifFont' });
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

    // 3. APPLYING THE NEW FONT
    // We use "SerrifFont" exactly as registered above
    ctx.font = '110px "SerrifFont"'; 
    ctx.fillText(name, width / 2, 520); 
    
    const rightAnchor = 1400; 
    ctx.textAlign = 'center'; 
    
    ctx.font = '50px "SerrifFont"';
    ctx.fillText(cohort, rightAnchor, 775);
    
    ctx.font = '50px "SerrifFont"';
    ctx.fillText(date, rightAnchor, 925);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    // If this fails, the error message will now tell us the exact path it tried to use
    res.status(500).send(`Font Error: ${error.message} - Using Path: ${fontPath}`);
  }
}
