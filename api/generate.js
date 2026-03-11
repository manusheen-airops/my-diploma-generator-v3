const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

// 1. Precise path for Vercel's Linux environment
const fontPath = path.join(process.cwd(), 'fonts', 'Saans-Regular.ttf');

try {
    registerFont(fontPath, { family: 'Saans' });
} catch (e) {
    console.log("Font registration failed, using fallback.");
}

export default async function handler(req, res) {
  // Grab variables from AirOps URL
  const { 
    name = 'Graduate Name', 
    cohort = 'Intermediate', 
    date = 'March 2026' 
  } = req.query;

  try {
    // --- 1. SET CANVAS TO 1080p ---
    const width = 1920; 
    const height = 1080; 
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Ensure smooth scaling for the background
    ctx.imageSmoothingEnabled = true;

    // --- 2. LOAD & DRAW BACKGROUND ---
    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, width, height);

    // --- 3. THE NAME (Centered + Shadow) ---
    ctx.textAlign = 'center'; 
    ctx.font = '110px "Saans"';
    
    // The "Premium Lift" Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)'; 
    ctx.shadowBlur = 12;                     
    ctx.shadowOffsetX = 3;                   
    ctx.shadowOffsetY = 3;                   

    ctx.fillStyle = '#1a1a1a'; // Elegant Dark Grey
    ctx.fillText(name, width / 2, 455); 

    // Reset shadow so labels stay crisp and flat
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // --- 4. THE COHORT & DATE BLOCK (Right Aligned) ---
    const rightAnchor = 1315; // Adjusted to match Screenshot 1's position
    ctx.textAlign = 'left'; 

    // Cohort Label
    ctx.fillStyle = '#444444';
    ctx.font = '32px "Saans"';
    ctx.fillText('Cohort Type:', rightAnchor, 665);

    // Cohort Value (AirOps Green)
    ctx.fillStyle = '#5a8c6a'; 
    ctx.font = '52px "Saans"';
    ctx.fillText(cohort, rightAnchor, 725);

    // Date Label
    ctx.fillStyle = '#444444';
    ctx.font = '32px "Saans"';
    ctx.fillText('Conferral date:', rightAnchor, 815);

    // Date Value (AirOps Green)
    ctx.fillStyle = '#5a8c6a'; 
    ctx.font = '52px "Saans"';
    ctx.fillText(date, rightAnchor, 875);

    // --- 5. OUTPUT THE FINAL JPEG ---
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.98 });
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);

  } catch (error) {
    res.status(500).send(`Production Error: ${error.message}`);
  }
}
