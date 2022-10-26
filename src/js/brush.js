const brushBox = document.querySelector(".brush");
const brushTitle = brushBox.querySelector("span");
const brushInput = brushBox.querySelector("input[type='range']");
const eraserBtn = brushBox.querySelector("button");
const colorInput = brushBox.querySelector("input[type='color']");
const palette = brushBox.querySelector(".palette");

const colors = [
  "#1abc9c",
  "#16a085",
  "#f1c40f",
  "#f39c12",
  "#2ecc71",
  "#27ae60",
  "#e67e22",
  "#d35400",
  "#3498db",
  "#2980b9",
  "#e74c3c",
  "#c0392b",
  "#9b59b6",
  "#8e44ad",
  "#ecf0f1",
  "#bdc3c7",
  "#34495e",
  "#2c3e50",
  "#95a5a6",
  "#7f8c8d",
];

let isBrush = true;

const callbacks = {
  selectedColor: (color) => {},
  selectedEraser: (on) => {},
  selectedWidth: (lineWidth) => {},
};

colors.forEach((color) => {
  const btn = document.createElement("button");
  btn.style.backgroundColor = color;
  btn.dataset.color = color;
  btn.addEventListener("click", (event) => {
    const color = event.target.dataset.color;
    colorInput.value = color;
    callbacks.selectedColor(color);
  });
  palette.appendChild(btn);
});

colorInput.addEventListener("change", () => {
  callbacks.selectedColor(color);
});

eraserBtn.addEventListener("click", () => {
  if (isBrush) {
    brushTitle.innerText = "eraser";
    eraserBtn.innerText = "brush";
    isBrush = false;
  } else {
    brushTitle.innerText = "brush";
    eraserBtn.innerText = "eraser";
    isBrush = true;
  }
  callbacks.selectedEraser(!isBrush);
});

brushInput.addEventListener("change", () => {
  callbacks.selectedWidth(brushInput.value);
});

export default {
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
};
