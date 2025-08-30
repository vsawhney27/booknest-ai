// Simple OG image generator using HTML Canvas API
// This creates a 1200x630 OG image for social sharing

const fs = require('fs');
const { createCanvas, loadImage, registerFont } = require('canvas');

async function createOGImage() {
  const width = 1200;
  const height = 630;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0E7C66'); // pine
  gradient.addColorStop(1, '#0E3B2E'); // dark green
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add some subtle pattern/texture
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 20, 0, Math.PI * 2);
    ctx.fillStyle = '#BFE3D0'; // mint
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Text styling
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Main title
  ctx.font = 'bold 72px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
  ctx.fillText('BookNest AI', width / 2, height / 2 - 60);

  // Subtitle
  ctx.font = '36px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#BFE3D0'; // mint
  ctx.fillText('Never Miss a Call. Book More Appointments.', width / 2, height / 2 + 30);

  // Company tagline
  ctx.font = '24px -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.fillText('AI-powered phone answering & appointment booking', width / 2, height / 2 + 90);

  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('/Users/veersawhney/new booknest/full/public/og-image.png', buffer);
  
  console.log('OG image created successfully at og-image.png');
}

// Fallback: Create simple OG image without canvas dependency
function createSimpleOGImage() {
  // Since we don't have canvas installed, create a simple SVG and convert it
  const svgContent = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#0E7C66;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0E3B2E;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <text x="600" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#FFFFFF">BookNest AI</text>
    <text x="600" y="350" font-family="Arial, sans-serif" font-size="36" text-anchor="middle" fill="#BFE3D0">Never Miss a Call. Book More Appointments.</text>
    <text x="600" y="420" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="rgba(255,255,255,0.8)">AI-powered phone answering & appointment booking</text>
  </svg>`;
  
  fs.writeFileSync('/Users/veersawhney/new booknest/full/public/og-image.svg', svgContent);
  console.log('OG SVG image created successfully');
}

createSimpleOGImage();