import * as THREE from 'three';

/**
 * Creates high-fidelity procedural canvas textures for the Earth globe:
 * - Surface map (deep sapphire ocean, landmasses, mountain elevation shading)
 * - Cloud layer with alpha transparency
 * - Specular reflection map for glistening oceans
 */

export function createEarthCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Deep ocean base
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#041224');
  oceanGrad.addColorStop(0.5, '#072444');
  oceanGrad.addColorStop(1, '#041224');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Subtle latitude lines / bathymetric shelf glow
  ctx.strokeStyle = 'rgba(24, 200, 216, 0.08)';
  ctx.lineWidth = 1;
  for (let lat = 100; lat < canvas.height; lat += 120) {
    ctx.beginPath();
    ctx.moveTo(0, lat);
    ctx.lineTo(canvas.width, lat);
    ctx.stroke();
  }

  // Draw stylized continent outlines and landmass fills
  ctx.fillStyle = '#173D35'; // Deep emerald / alpine green landmass
  ctx.strokeStyle = '#276856';
  ctx.lineWidth = 2;

  // Approximate continents geometry on equirectangular projection
  // Eurasia & Africa
  ctx.beginPath();
  // Africa
  ctx.ellipse(1080, 560, 140, 210, 0.1, 0, Math.PI * 2);
  // Europe
  ctx.ellipse(1040, 320, 110, 90, 0, 0, Math.PI * 2);
  // Asia
  ctx.ellipse(1350, 360, 240, 160, 0, 0, Math.PI * 2);
  // India
  ctx.ellipse(1320, 520, 70, 90, 0.2, 0, Math.PI * 2);
  // Southeast Asia & Indonesia
  ctx.ellipse(1560, 600, 110, 70, -0.2, 0, Math.PI * 2);
  // Australia
  ctx.ellipse(1680, 750, 120, 90, 0.1, 0, Math.PI * 2);
  // North America
  ctx.ellipse(450, 340, 220, 150, -0.1, 0, Math.PI * 2);
  // South America
  ctx.ellipse(640, 680, 120, 200, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Mountain & vegetation highlights
  ctx.fillStyle = '#2A5C43';
  ctx.beginPath();
  ctx.ellipse(1040, 320, 70, 50, 0, 0, Math.PI * 2);
  ctx.ellipse(1350, 360, 160, 100, 0, 0, Math.PI * 2);
  ctx.ellipse(450, 340, 140, 90, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Desert golden accents (Sahara, Arabian Peninsula, Gobi)
  ctx.fillStyle = '#8B734B';
  ctx.beginPath();
  ctx.ellipse(1080, 480, 100, 60, 0, 0, Math.PI * 2);
  ctx.ellipse(1190, 470, 70, 55, 0.3, 0, Math.PI * 2); // Arabia
  ctx.fill();

  // Coastline cyan luminescence
  ctx.strokeStyle = 'rgba(24, 200, 216, 0.35)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // City night light specks on continents
  ctx.fillStyle = '#FFDD80';
  for (let i = 0; i < 350; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    // Check if on land approximately
    const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    if (pixel[1] > 40) { // Green channel indicates land
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function createCloudsCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Wispy cloud formations
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = 80 + Math.random() * (canvas.height - 160);
    const radiusX = 40 + Math.random() * 90;
    const radiusY = 15 + Math.random() * 30;
    const rotation = (Math.random() - 0.5) * 0.4;

    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, rotation, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
