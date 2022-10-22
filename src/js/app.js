const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const burshInput = document.querySelector("input[type='range']");
const colorInput = document.querySelector("input[type='color']");

const colors = ["#FFB3B3", "#FFDBA4", "#FFE9AE", "#C1EFFF"];
const paletteBox = document.querySelector(".palette");

const imgInput = document.querySelector("input[type='file']");
const textInput = document.querySelector("input[type='text']");

const savebtn = document.getElementById("save");

colors.forEach((color) => {
  const btn = document.createElement("button");
  btn.style.backgroundColor = color;
  btn.dataset.color = color;
  btn.addEventListener("click", (event) => {
    console.log(event);
    const color = event.target.dataset.color;
    setColor(color);
    colorInput.value = color;
  });
  paletteBox.appendChild(btn);
});

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = burshInput.value;
ctx.lineCap = "round";

canvas.addEventListener("click", (event) => {
  const { offsetX, offsetY } = event;
});

let dragging = false;

canvas.addEventListener("mousedown", (event) => {
  /* console.log(event); */
  const { offsetX, offsetY } = event;
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
  dragging = true;
});

canvas.addEventListener("mousemove", (event) => {
  const { offsetX, offsetY } = event;
  if (dragging) {
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener("mouseleave", (event) => {
  dragging = false;
});

canvas.addEventListener("mouseup", (event) => {
  dragging = false;
});

burshInput.addEventListener("change", (event) => {
  ctx.lineWidth = burshInput.value;
});

function setColor(color) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}

colorInput.addEventListener("change", (event) => {
  setColor(colorInput.value);
});

imgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    ctx.drawImage(img, 200, 200);
    imgInput.value = null;
  };
});

canvas.addEventListener("dblclick", (event) => {
  const { offsetX, offsetY } = event;
  const text = textInput.value;
  if (text === "") {
    return;
  }
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = "48px 'Press Start 2P'";
  ctx.fillText(text, offsetX, offsetY);
  ctx.restore();
});

savebtn.addEventListener("click", (event) => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
});
