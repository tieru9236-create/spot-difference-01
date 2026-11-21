// Multi-scene rendering routines: Scene 1 (Harbour), Scene 2 (Night Market), Scene 3 (Coral Lagoon)

export function renderScene(ctx, sceneId, w, h, isRight = false) {
  if (sceneId === 'night_market') {
    drawNightMarket(ctx, w, h, isRight);
  } else if (sceneId === 'coral_reef') {
    drawCoralLagoon(ctx, w, h, isRight);
  } else {
    drawDawnScene(ctx, w, h, isRight);
  }
}

// === SCENE 1: THE HARBOUR AT DAWN ===
export function drawDawnScene(ctx, w, h, isRight = false) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.68);
  skyGrad.addColorStop(0, '#f97316');
  skyGrad.addColorStop(0.45, '#fb923c');
  skyGrad.addColorStop(0.8, '#fde047');
  skyGrad.addColorStop(1, '#fef08a');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h * 0.68);

  const seaGrad = ctx.createLinearGradient(0, h * 0.65, 0, h * 0.82);
  seaGrad.addColorStop(0, '#0284c7');
  seaGrad.addColorStop(1, '#0369a1');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, h * 0.65, w, h * 0.17);

  // Sun
  ctx.fillStyle = '#facc15';
  ctx.beginPath();
  ctx.arc(w * 0.86, h * 0.18, 44, 0, Math.PI * 2);
  ctx.fill();

  // Clouds
  drawCloud(ctx, w * 0.1, h * 0.12, 1.0);
  if (!isRight) {
    drawCloud(ctx, w * 0.58, h * 0.18, 0.85);
  } else {
    drawCloud(ctx, w * 0.68, h * 0.22, 0.72);
  }

  // Birds
  drawBird(ctx, w * 0.22, h * 0.22);
  drawBird(ctx, w * 0.30, h * 0.20);
  if (!isRight) {
    drawBird(ctx, w * 0.38, h * 0.23);
  }

  // Lighthouse
  drawLighthouse(ctx, w * 0.08, h * 0.32);

  // Coast
  ctx.fillStyle = '#e2b87f';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.76);
  ctx.lineTo(w, h * 0.72);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Houses
  drawHouse(ctx, w * 0.22, h * 0.62, 55, 45, '#b91c1c', '#fef3c7');
  const h2Roof = isRight ? '#d946ef' : '#2563eb';
  drawHouse(ctx, w * 0.36, h * 0.63, 65, 42, h2Roof, '#ffffff');
  drawHouse(ctx, w * 0.52, h * 0.62, 55, 44, '#7e22ce', '#fef08a');

  // Boats
  drawSailboat(ctx, w * 0.62, h * 0.68, 55, '#dc2626');
  drawGreenRowboat(ctx, w * 0.29, h * 0.70);

  if (!isRight) {
    drawOrangeBuoy(ctx, w * 0.84, h * 0.70);
    drawBlueBoat(ctx, w * 0.75, h * 0.69);
  } else {
    drawLargeCargoBoat(ctx, w * 0.84, h * 0.68);
  }

  drawCrate(ctx, w * 0.18, h * 0.80);
  drawBarrel(ctx, w * 0.44, h * 0.80);
  drawBollard(ctx, w * 0.64, h * 0.81);
}

// === SCENE 2: THE NIGHT MARKET ===
export function drawNightMarket(ctx, w, h, isRight = false) {
  // Midnight sky
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0, '#090d16');
  skyGrad.addColorStop(0.5, '#111827');
  skyGrad.addColorStop(1, '#1e1b4b');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Distant city lights & roof silhouettes
  ctx.fillStyle = '#1e293b';
  for (let bx = 0; bx < w; bx += 40) {
    const bh = 80 + ((bx * 7) % 60);
    ctx.fillRect(bx, h * 0.4 - bh, 36, bh);
  }

  // Overhead market bunting ropes
  ctx.strokeStyle = '#475569';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 70);
  ctx.quadraticCurveTo(w * 0.5, 110, w, 60);
  ctx.stroke();

  // Glowing festival lanterns
  for (let i = 0; i < 7; i++) {
    const lx = 40 + i * 80;
    const ly = 75 + Math.sin(i * 0.8) * 15;
    let col = (i % 2 === 0) ? '#f43f5e' : '#eab308';
    if (i === 2 && isRight) col = '#06b6d4'; // Diff: lantern color!
    
    // Halo glow
    const rad = ctx.createRadialGradient(lx, ly, 4, lx, ly, 22);
    rad.addColorStop(0, col);
    rad.addColorStop(1, 'transparent');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(lx, ly, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(lx, ly, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // Market Stalls (Street Level)
  // Stall 1 (Noodle shop)
  ctx.fillStyle = '#b45309';
  ctx.fillRect(50, h * 0.55, 140, 160);
  ctx.fillStyle = '#dc2626'; // Red striped canopy
  ctx.fillRect(40, h * 0.52, 160, 25);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('NOODLES', 85, h * 0.54);

  // Steamer Pot
  ctx.fillStyle = '#94a3b8';
  ctx.fillRect(80, h * 0.65, 35, 25);
  if (!isRight) {
    // Steam puff difference!
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(95, h * 0.62, 8, Math.PI * 0.5, Math.PI * 1.5);
    ctx.stroke();
  }

  // Stall 2 (Art & Fans)
  ctx.fillStyle = '#4338ca';
  ctx.fillRect(240, h * 0.55, 150, 160);
  ctx.fillStyle = '#059669'; // Green canopy
  ctx.fillRect(230, h * 0.52, 170, 25);

  // Cat on stall counter
  if (!isRight) {
    ctx.fillStyle = '#f97316'; // Orange sleeping cat
    ctx.beginPath();
    ctx.ellipse(320, h * 0.67, 16, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(332, h * 0.64, 7, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Difference: sleeping cat replaced by vase of flowers!
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(315, h * 0.63, 14, 22);
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(322, h * 0.60, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // Neon sign on right building
  ctx.fillStyle = '#f43f5e';
  ctx.font = 'bold 22px sans-serif';
  const neonText = isRight ? '夜 市 ★' : '夜 市';
  ctx.fillText(neonText, 440, 140);
}

// === SCENE 3: THE CORAL LAGOON ===
export function drawCoralLagoon(ctx, w, h, isRight = false) {
  // Deep aqua to turquoise gradient
  const seaGrad = ctx.createLinearGradient(0, 0, 0, h);
  seaGrad.addColorStop(0, '#0284c7');
  seaGrad.addColorStop(0.4, '#0369a1');
  seaGrad.addColorStop(0.8, '#0f766e');
  seaGrad.addColorStop(1, '#042f2e');
  ctx.fillStyle = seaGrad;
  ctx.fillRect(0, 0, w, h);

  // Sunbeams filtering from ocean surface
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 14;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(80 + i * 90, 0);
    ctx.lineTo(140 + i * 90, h * 0.8);
    ctx.stroke();
  }

  // Sea turtle
  if (!isRight) {
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(150, 160, 24, 16, Math.PI * 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(175, 155, 9, 0, Math.PI * 2); // Turtle head
    ctx.fill();
  } // Difference: turtle swam away in right pane!

  // Coral reef floor
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(0, h * 0.78);
  ctx.bezierCurveTo(w * 0.3, h * 0.72, w * 0.7, h * 0.84, w, h * 0.75);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Branching corals
  ctx.fillStyle = '#e11d48'; // Red coral tree
  ctx.fillRect(80, h * 0.65, 16, 70);
  ctx.fillRect(70, h * 0.68, 36, 12);

  // Purple coral (difference)
  const purpleCol = isRight ? '#a855f7' : '#ec4899';
  ctx.fillStyle = purpleCol;
  ctx.beginPath();
  ctx.arc(490, h * 0.72, 28, Math.PI, 0);
  ctx.fill();

  // Starfish on sand
  const starCol = isRight ? '#facc15' : '#ef4444';
  ctx.fillStyle = starCol;
  ctx.beginPath();
  ctx.arc(380, h * 0.85, 14, 0, Math.PI * 2);
  ctx.fill();

  // Rising bubbles stream
  if (!isRight) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let b = 0; b < 5; b++) {
      ctx.beginPath();
      ctx.arc(440, 180 + b * 28, 5 + b, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// Helpers
function drawCloud(ctx, x, y, scale) {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 28 * scale, 0, Math.PI * 2);
  ctx.arc(x + 24 * scale, y - 12 * scale, 34 * scale, 0, Math.PI * 2);
  ctx.arc(x + 58 * scale, y - 8 * scale, 30 * scale, 0, Math.PI * 2);
  ctx.arc(x + 78 * scale, y + 4 * scale, 24 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function drawBird(ctx, x, y) {
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(x, y, 10, Math.PI, 0, false);
  ctx.arc(x + 18, y, 10, Math.PI, 0, false);
  ctx.stroke();
}

function drawLighthouse(ctx, x, y) {
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x + 8, y);
  ctx.lineTo(x + 36, y);
  ctx.lineTo(x + 44, y + 160);
  ctx.lineTo(x, y + 160);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#dc2626';
  ctx.fillRect(x + 5, y + 35, 34, 30);
  ctx.fillRect(x + 2, y + 95, 40, 30);

  ctx.fillStyle = '#1f2937';
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.lineTo(x + 40, y);
  ctx.lineTo(x + 22, y - 26);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fbbf24';
  ctx.fillRect(x + 12, y - 18, 20, 16);
}

function drawHouse(ctx, x, y, w, h, roofColor, wallColor) {
  ctx.fillStyle = wallColor;
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(x - 6, y);
  ctx.lineTo(x + w / 2, y - 28);
  ctx.lineTo(x + w + 6, y);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.fillRect(x + 8, y + 12, 14, 16);
  ctx.fillRect(x + w - 22, y + 12, 14, 16);
}

function drawSailboat(ctx, x, y, w, hullColor) {
  ctx.fillStyle = hullColor;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w * 0.85, y + 18);
  ctx.lineTo(x + w * 0.15, y + 18);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x + w * 0.5, y - 36);
  ctx.lineTo(x + w * 0.5, y - 2);
  ctx.lineTo(x + w * 0.88, y - 2);
  ctx.closePath();
  ctx.fill();
}

function drawGreenRowboat(ctx, x, y) {
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 40, y);
  ctx.lineTo(x + 34, y + 14);
  ctx.lineTo(x + 6, y + 14);
  ctx.closePath();
  ctx.fill();
}

function drawOrangeBuoy(ctx, x, y) {
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - 16);
  ctx.lineTo(x, y - 10);
  ctx.stroke();
}

function drawBlueBoat(ctx, x, y) {
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 45, y);
  ctx.lineTo(x + 38, y + 15);
  ctx.lineTo(x + 7, y + 15);
  ctx.closePath();
  ctx.fill();
}

function drawLargeCargoBoat(ctx, x, y) {
  ctx.fillStyle = '#1d4ed8';
  ctx.beginPath();
  ctx.moveTo(x - 20, y);
  ctx.lineTo(x + 48, y);
  ctx.lineTo(x + 38, y + 20);
  ctx.lineTo(x - 12, y + 20);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(x + 10, y - 32);
  ctx.lineTo(x + 10, y - 2);
  ctx.lineTo(x + 40, y - 2);
  ctx.closePath();
  ctx.fill();
}

function drawCrate(ctx, x, y) {
  ctx.fillStyle = '#b45309';
  ctx.fillRect(x, y, 26, 22);
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, 26, 22);
}

function drawBarrel(ctx, x, y) {
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.ellipse(x, y, 12, 14, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawBollard(ctx, x, y) {
  ctx.fillStyle = '#713f12';
  ctx.fillRect(x, y, 10, 26);
  ctx.fillStyle = '#854d0e';
  ctx.beginPath();
  ctx.arc(x + 5, y, 6, 0, Math.PI * 2);
  ctx.fill();
}
