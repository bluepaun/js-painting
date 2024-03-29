const drawBox = document.querySelector(".draw-box");
const canvas = drawBox.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.lineCap = "round";

let dragging = false;
let isFilling = false;
let isTexting = false;

let textForm = null;
let fontSize = 0.1;

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

/* function getCssStyle(element, prop) { */
/*   return window.getComputedStyle(element, null).getPropertyValue(prop); */
/* } */
/**/
/* function getCanvasFont(el = document.body) { */
/*   const fontWeight = getCssStyle(el, "font-weight") || "normal"; */
/*   const fontSize = getCssStyle(el, "font-size") || "16px"; */
/*   const fontFamily = getCssStyle(el, "font-family") || "Times New Roman"; */
/**/
/*   return `${fontWeight} ${fontSize} ${fontFamily}`; */
/* } */

/* console.log(getTextWidth("hello there!", "bold 12pt arial"));  // close to 86 */

function createTextInput(x, y) {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("required", true);
  input.style.color = ctx.fillStyle;
  input.style.fontSize = `${fontSize}px`;
  input.addEventListener("input", (e) => {
    const fontWidthPx = getTextWidth(e.target.value, `${fontSize}px Noto Sans`);
    e.target.style.width = `${fontWidthPx}px`;
  });
  form.appendChild(input);
  form.setAttribute("style", `top:${y}px; left:${x}px;`);
  drawBox.appendChild(form);
  setTimeout(() => {
    input.focus();
  }, 50);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const target = e.target;
    const text = target.querySelector("input").value;
    if (text !== "") {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.font = `${fontSize}px 'Noto Sans'`;
      ctx.fillText(text, x, y + fontSize);
      ctx.restore();
    }
    isTexting = false;
    textForm = null;
    target.remove();
  });
  textForm = form;
}

canvas.addEventListener("mousedown", (event) => {
  const { offsetX, offsetY } = event;
  if (isTexting) {
    if (textForm === null) {
      createTextInput(offsetX, offsetY);
    } else {
      textForm.remove();
      textForm = null;
      isTexting = false;
    }
    return;
  }
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

function dragFinish() {
  if (dragging && isFilling) {
    ctx.fill();
  }
  dragging = false;
}

canvas.addEventListener("mouseleave", dragFinish);
canvas.addEventListener("mouseup", dragFinish);

export default {
  setCanvasSize: (width, height) => {
    drawBox.setAttribute("style", `width:${width}px; height:${height}px;`);
    canvas.width = width;
    canvas.height = height;
  },
  setBurshWidth: (width) => {
    ctx.lineWidth = width;
  },
  setColor: (color) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
  },
  setFill: (on) => {
    isFilling = on;
  },
  setEraser: (on) => {
    if (on) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }
  },
  saveCurrentImage: (fileName) => {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.png`;
    a.click();
  },
  clearAll: () => {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  },
  setImage: (img) => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  },
  setText: (size) => {
    fontSize = size;
    isTexting = true;
  },
};
