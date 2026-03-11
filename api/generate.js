const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

// 1. Resolve path to your Serrif font
const fontPath = path.resolve('./fonts/SerrifVF.ttf');

// 2. Register the font with the family name 'SerrifFont'
try {
    if (fs.existsSync(fontPath)) {
        registerFont(fontPath, { family: 'SerrifFont' });
    } else {
        console.error("Font file not found at path: " + fontPath);
    }
} catch (e) {
    console.error("Font registration failed:", e);
}

export default async function handler(req, res) {
  // Grab variables from the URL
  const { 
    name = 'Graduate Name', 
    cohort = 'Intermediate', 
    date = 'March 2026' 
  } = req.query;

  try {
    // --- 1. SETUP CANVAS (1080p) ---
    const width = 1920; 
    const height = 1080; 
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;

    // --- 2. LOAD BACKGROUND ---
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, width, height);

    // --- 3. DRAW THE NAME (Centered & Bold) ---
    ctx.fillStyle = '#1a1a1a'; // Dark Grey/Black
    ctx.textAlign = 'center'; 
    ctx.font = 'bold 110px "SerrifFont"'; 
    ctx.fillText(name, width / 2, 455); 

    // --- 4. DRAW THE COHORT & DATE BLOCK (Right Side) ---
    const rightAnchor = 1315; // Positioned for the right-hand column
    ctx.textAlign = 'left'; 

    // Cohort Label
    ctx.fillStyle = '#444444';
    ctx.font = '32px "SerrifFont"';
    ctx.fillText('Cohort Type:', rightAnchor, 665);

    // Cohort Value (Bold + Green)
    ctx.fillStyle = '#5a8c6a'; 
    ctx.font = 'bold 52px "SerrifFont"';
    ctx.fillText(cohort, rightAnchor, 725);

    // Date Label
    ctx.fillStyle = '#444444';
    ctx.font = '32px "SerrifFont"';
    ctx.fillText('Conferral date:', rightAnchor, 815);

    // Date Value (Bold + Green)
    ctx.fillStyle = '#5a8c6a'; 
    ctx.font = 'bold 52px "SerrifFont"';
    ctx.fillText(date, rightAnchor, 875);

    // --- 5. OUTPUT IMAGE ---
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.98 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);

  } catch (error) {
    res.status(500).send(`Generation Error: ${error.message}`);
  }
}
