const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const humanX = 300;
const humanY = 200;
const bodyWidh = 100;
const bodyHeight = 300;
const headRadius = 80;
const armWidth = 30;
const armHeight = 150;
const eyeRadius = 15;
const mouseRadius = 40;

ctx.fillRect(humanX - bodyWidh / 2, humanY, bodyWidh, bodyHeight);
ctx.fillRect(
  humanX - bodyWidh / 2 - 20 - armWidth,
  humanY,
  armWidth,
  armHeight
);
ctx.fillRect(humanX + bodyWidh / 2 + 20, humanY, armWidth, armHeight);

ctx.arc(humanX, humanY - 10 - headRadius, headRadius, 0, 2 * Math.PI);
ctx.fill();
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(humanX, humanY - 10 - headRadius, mouseRadius, 0, Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "yellow";
ctx.arc(
  humanX - 2 * eyeRadius,
  humanY - 10 - headRadius - 2 * eyeRadius,
  eyeRadius,
  Math.PI,
  2 * Math.PI
);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = "green";
ctx.arc(
  humanX + 2 * eyeRadius,
  humanY - 10 - headRadius - 2 * eyeRadius,
  eyeRadius,
  Math.PI,
  2 * Math.PI
);
ctx.fill();
