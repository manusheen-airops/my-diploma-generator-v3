const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

try {
    const fontPath = path.resolve('./fonts/Arial.ttf');
    registerFont(fontPath, { family: 'DiplomaFont' });
} catch (e) {
    console.log("Font registration failed.");
}

export default async function handler(req, res) {
  const { name = 'Graduate Name', cohort = 'Intermediate', date = 'November 25, 2025' } = req.query;

  try {
    // --- 1. MATCH THE CANVAS TO YOUR FILE ---
    const width = 1920; 
    const height = 1080; 
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    ctx.imageSmoothingEnabled = true; // Set to true for smoother background scaling

    // --- 2. LOAD & SCALE BACKGROUND ---
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    
    // This tells the engine to draw the image from (0,0) to the FULL width and height
    ctx.drawImage(background, 0, 0, width, height);

// --- 3. THE TEXT ---
    ctx.fillStyle = '#0e1f13';

    // NAME (Keep this centered)
    ctx.textAlign = 'center'; 
    ctx.font = 'bold 120px "DiplomaFont", serif';
    ctx.fillText(name, width / 2, 520); 

    // COHORT & DATE (Move to the right side)
    // 'left' alignment makes the text start at the X coordinate and grow right
    ctx.textAlign = 'left'; 

    // Cohort (Placed at 1300px horizontally, which is roughly 2/3 of 1920)
    ctx.font = 'italic 50px "DiplomaFont", serif';
    ctx.fillText(cohort, 1250, 775);

    // Date (Aligned with the Cohort at 1300px)
    ctx.font = '50px "DiplomaFont", serif';
    ctx.fillText(date, 1175, 925);

    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Alignment Error: ${error.message}`);
  }
}








