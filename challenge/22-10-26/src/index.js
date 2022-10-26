const canvas = document.querySelector("canvas");
const color = document.getElementById("color");
const fill = document.getElementById("fill");
const stroke = document.getElementById("stroke");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

ctx.lineWidth = 5;
let isPainting = false;
let isFilling = false;

color.addEventListener("change", (e) => {
  const c = color.value;
  ctx.fillStyle = c;
  ctx.strokeStyle = c;
});

fill.addEventListener("click", () => {
  isFilling = true;
});

stroke.addEventListener("click", () => {
  isFilling = false;
});

canvas.addEventListener("mousedown", (e) => {
  const { offsetX, offsetY } = e;
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);

  isPainting = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (!isPainting) {
    return;
  }
  const { offsetX, offsetY } = e;
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
});

function drawFinish(e) {
  isPainting = false;
  if (isFilling) {
    ctx.fill();
  }
}

canvas.addEventListener("mouseup", drawFinish);
canvas.addEventListener("mouseleave", drawFinish);
