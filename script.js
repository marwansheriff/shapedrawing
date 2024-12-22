const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 3;
let isDrawing = false;  // Track whether the user is currently drawing

// Function to draw basic shapes like circle, rectangle, and triangle
function drawBasicShape(type, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
  ctx.fillStyle = color;

  if (type === 'circle') {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 250, 100, 0, 2 * Math.PI);  // Draw a circle
    ctx.fill();
  } else if (type === 'rectangle') {
    ctx.fillRect(canvas.width / 2 - 100, 250, 200, 100);  // Draw a rectangle
  } else if (type === 'triangle') {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 100);  // Top of the triangle
    ctx.lineTo(canvas.width / 2 - 150, 300);  // Bottom left corner
    ctx.lineTo(canvas.width / 2 + 150, 300);  // Bottom right corner
    ctx.closePath();
    ctx.fill();
  }
}

// Function to draw a custom path (e.g., blob shape)
function drawCustomShape(points, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
  ctx.fillStyle = color;
  ctx.beginPath();

  ctx.moveTo(points[0].x, points[0].y);

  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

// Free drawing functionality
function enableFreeDraw(mode) {
  if (mode === 1) {
    canvas.onmousedown = () => {
      isDrawing = true;
      ctx.beginPath();
    };

    canvas.onmousemove = (e) => {
      if (isDrawing) {
        ctx.lineTo(e.clientX, e.clientY - 130);
        ctx.stroke();
      }
    };

    canvas.onmouseup = () => {
      isDrawing = false;
      ctx.closePath();
    };
  } else if (mode === 2) {
    let hasStarted = false;
    canvas.onclick = (e) => {
      if (!hasStarted) {
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY - 130);
        hasStarted = true;
      } else {
        ctx.lineTo(e.clientX, e.clientY - 130);
        ctx.stroke();
      }
    };
  }
}


function randomshap() {
  const midX = canvas.width / 2;
  const midY = canvas.height / 2;
  const outlineOnly = true;
  const variationFactor = Math.random() * 50 + 50; // Randomize variation factor between 50 and 100

  ctx.beginPath();
  const totalPoints = 10; 
  for (let point = 0; point < totalPoints; point++) {
    const theta = (2 * Math.PI * point) / totalPoints;
    const offset = 100 + Math.random() * variationFactor; // Randomize radius
    const coordX = midX + offset * Math.cos(theta);
    const coordY = midY + offset * Math.sin(theta);
    if (point === 0) {
      ctx.moveTo(coordX, coordY);
    } else {
      ctx.lineTo(coordX, coordY);
    }
  }
  ctx.closePath();

  if (outlineOnly) {
    ctx.stroke();
  } else {
    ctx.fill();
  }
}

// Button click handler
document.getElementById('drawBtn').addEventListener('click', function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const selectedShape = document.getElementById('shape').value;
  const selectedColor = document.getElementById('color').value;

  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;

  if (selectedShape === 'FREE1') {
    enableFreeDraw(1);  // Activate free drawing mode
  } else if (selectedShape === 'FREE2') {
    enableFreeDraw(2);  // Activate free drawing mode
  } else if (selectedShape === 'randomshap') {
    randomshap();
  } else {
    drawBasicShape(selectedShape, selectedColor);
  }
});
