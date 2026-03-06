const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

try {
    const fontPath = path.resolve('./fonts/Arial.ttf');
    registerFont(fontPath, { family: 'DiplomaFont' });
} catch (e) {
    console.log("Font registration failed, using fallback.");
}

export default async function handler(req, res) {
  // 1. Grab all three variables from the URL
  const { 
    name = 'Graduate Name', 
    cohort = 'Intermediate', 
    date = 'November 25, 2025' 
  } = req.query;

  try {
    const canvas = createCanvas(2000, 1414);
    const ctx = canvas.getContext('2d');

    const background = await loadImage('https://asset-generator-alpha.vercel.app/GTMGen-Certificate.jpg');
    ctx.drawImage(background, 0, 0, 1920, 1080);

    ctx.fillStyle = '#0e1f13';
    ctx.textAlign = 'center';

    // --- DRAW THE NAME ---
    // Increased size to 140px and moved down to 540px
    ctx.font = 'bold 220px "DiplomaFont", serif';
    ctx.fillText(name, 1000, 700); 

    // --- DRAW THE COHORT TYPE ---
    // Smaller font, placed lower (adjust 850 based on your design)
    ctx.font = 'italic 50px "DiplomaFont", serif';
    ctx.fillText(`${cohort} Cohort`, 1000, 850);

    // --- DRAW THE GRADUATION DATE ---
    // Placed at the bottom or near a signature line
    ctx.font = '40px "DiplomaFont", serif';
    ctx.fillText(date, 1000, 1200);

    const buffer = canvas.toBuffer('image/jpeg');
    res.setHeader('Content-Type', 'image/jpeg');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).send(`Design Error: ${error.message}`);
  }
}

