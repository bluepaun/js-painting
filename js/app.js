(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _configuration = _interopRequireDefault(require("./configuration.js"));
var _painter = _interopRequireDefault(require("./painter.js"));
var _brush = _interopRequireDefault(require("./brush.js"));
var _function = _interopRequireDefault(require("./function.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function initalize() {
  const initSize = _configuration.default.getSize();
  _painter.default.setCanvasSize(initSize.width, initSize.height);
  _painter.default.setBurshWidth(5);
}
initalize();
_configuration.default.setCallback("setCanvasSize", (width, height) => {
  _painter.default.setCanvasSize(width, height);
});
_configuration.default.setCallback("saveCurrentImage", fileName => {
  _painter.default.saveCurrentImage(fileName);
});
_brush.default.setCallback("selectedColor", color => {
  _painter.default.setColor(color);
});
_brush.default.setCallback("selectedEraser", on => {
  _painter.default.setEraser(on);
});
_brush.default.setCallback("selectedWidth", lineWidth => {
  _painter.default.setBurshWidth(lineWidth);
});
_function.default.setCallback("enableFill", on => {
  _painter.default.setFill(on);
});
_function.default.setCallback("clearAll", () => {
  _painter.default.clearAll();
});
_function.default.setCallback("inputImage", img => {
  _painter.default.setImage(img);
});
_function.default.setCallback("inputText", size => {
  _painter.default.setText(size);
});

},{"./brush.js":2,"./configuration.js":3,"./function.js":4,"./painter.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const brushBox = document.querySelector(".brush");
const brushTitle = brushBox.querySelector("span");
const brushInput = brushBox.querySelector("input[type='range']");
const eraserBtn = brushBox.querySelector("button");
const colorInput = brushBox.querySelector("input[type='color']");
const palette = brushBox.querySelector(".palette");
const colors = ["#1abc9c", "#16a085", "#f1c40f", "#f39c12", "#2ecc71", "#27ae60", "#e67e22", "#d35400", "#3498db", "#2980b9", "#e74c3c", "#c0392b", "#9b59b6", "#8e44ad", "#ecf0f1", "#bdc3c7", "#34495e", "#2c3e50", "#95a5a6", "#7f8c8d"];
let isBrush = true;
const callbacks = {
  selectedColor: color => {},
  selectedEraser: on => {},
  selectedWidth: lineWidth => {}
};
colors.forEach(color => {
  const btn = document.createElement("button");
  btn.style.backgroundColor = color;
  btn.dataset.color = color;
  btn.addEventListener("click", event => {
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
var _default = {
  setCallback: (name, func) => {
    callbacks[name] = func;
  }
};
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const configBox = document.querySelector(".configuration");
const sizeForm = configBox.querySelector("form:first-child");
const widthInput = sizeForm.querySelector("#canvas-width");
const heightInput = sizeForm.querySelector("#canvas-height");
const saveForm = configBox.querySelector("form:last-child");
const filenameInput = saveForm.querySelector("input");
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
widthInput.value = DEFAULT_WIDTH;
heightInput.value = DEFAULT_HEIGHT;
const callbacks = {
  setCanvasSize: (width, height) => {},
  saveCurrentImage: fileName => {}
};
sizeForm.addEventListener("submit", event => {
  event.preventDefault();
  callbacks.setCanvasSize(widthInput.value, heightInput.value);
});
saveForm.addEventListener("submit", event => {
  event.preventDefault();
  callbacks.saveCurrentImage(filenameInput.value);
});
var _default = {
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
  getSize: () => {
    return {
      width: widthInput.value,
      height: heightInput.value
    };
  }
};
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const funcBox = document.querySelector(".functions");
const imageInput = funcBox.querySelector("#image-input");
const textBtn = funcBox.querySelector("#text-btn");
const fillBtn = funcBox.querySelector("#fill-btn");
const clearBtn = funcBox.querySelector("#clear-btn");
const fontSizeInput = funcBox.querySelector("#font-size");
const callbacks = {
  enableFill: on => {},
  clearAll: () => {},
  inputText: size => {},
  inputImage: img => {}
};
let isFill = false;
fillBtn.addEventListener("click", () => {
  if (isFill) {
    fillBtn.innerText = "Fill";
    isFill = false;
  } else {
    fillBtn.innerText = "Stroke";
    isFill = true;
  }
  callbacks.enableFill(isFill);
});
clearBtn.addEventListener("click", () => {
  callbacks.clearAll();
});
imageInput.addEventListener("change", e => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    callbacks.inputImage(img);
    imageInput.value = null;
  };
});
textBtn.addEventListener("click", e => {
  callbacks.inputText(parseInt(fontSizeInput.value));
});
var _default = {
  setCallback: (name, func) => {
    callbacks[name] = func;
  }
};
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
  const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
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
  input.addEventListener("input", e => {
    const fontWidthPx = getTextWidth(e.target.value, `${fontSize}px Noto Sans`);
    e.target.style.width = `${fontWidthPx}px`;
  });
  form.appendChild(input);
  form.setAttribute("style", `top:${y}px; left:${x}px;`);
  drawBox.appendChild(form);
  setTimeout(() => {
    input.focus();
  }, 50);
  form.addEventListener("submit", e => {
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
canvas.addEventListener("mousedown", event => {
  const {
    offsetX,
    offsetY
  } = event;
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
canvas.addEventListener("mousemove", event => {
  const {
    offsetX,
    offsetY
  } = event;
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
var _default = {
  setCanvasSize: (width, height) => {
    drawBox.setAttribute("style", `width:${width}px; height:${height}px;`);
    canvas.width = width;
    canvas.height = height;
  },
  setBurshWidth: width => {
    ctx.lineWidth = width;
  },
  setColor: color => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
  },
  setFill: on => {
    isFilling = on;
  },
  setEraser: on => {
    if (on) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }
  },
  saveCurrentImage: fileName => {
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
  setImage: img => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  },
  setText: size => {
    fontSize = size;
    isTexting = true;
  }
};
exports.default = _default;

},{}]},{},[1]);
