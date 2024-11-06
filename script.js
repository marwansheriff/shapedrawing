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

// // Example custom shape points (blob-like shape)
// const blobPoints = [
//   { x: 150, y: 200 },
//   { x: 250, y: 150 },
//   { x: 350, y: 200 },
//   { x: 300, y: 300 },
//   { x: 200, y: 300 }
// ];

// Free drawing functionality
function enableFreeDraw(mode) {
    if (mode===1){
        canvas.onmousedown = () => {
            isDrawing = true;
            ctx.beginPath();
        };
        
        canvas.onmousemove = (e) => {
            if (isDrawing) {
                ctx.lineTo(e.clientX, e.clientY-130);
                ctx.stroke();
    }
};

canvas.onmouseup = () => {
    isDrawing = false;
    ctx.closePath();
};
}
else if(mode===2){
  x=0
    ctx.beginPath();
    canvas.onclick =(e) =>{
      if(x===0){
        ctx.moveTo(e.clientX, e.clientY-130);
        x=1
      }
      else{
    ctx.lineTo(e.clientX,e.clientY-130);
    ctx.stroke();
  }
}
}
}

// Button click handler
document.getElementById('drawBtn').addEventListener('click', function () {
  ctx.closePath();
  ctx.clearRect(0,0,canvas.width,canvas.height)
const selectedShape = document.getElementById('shape').value;
const selectedColor = document.getElementById('color').value;

ctx.strokeStyle = selectedColor;
ctx.fillStyle = selectedColor;

 if (selectedShape === 'FREE1') {
    enableFreeDraw(1);  // Activate free drawing mode
  } else if (selectedShape === 'FREE2') {
    enableFreeDraw(2);  // Activate free drawing mode
  } else {
    drawBasicShape(selectedShape, selectedColor);
  }
});
