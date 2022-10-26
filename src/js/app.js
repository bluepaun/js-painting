import configBox from "./configuration.js";
import painter from "./painter.js";
import brushBox from "./brush.js";
import funcBox from "./function.js";

function initalize() {
  const initSize = configBox.getSize();
  painter.setCanvasSize(initSize.width, initSize.height);
  painter.setBurshWidth(5);
}

initalize();

/* canvas.addEventListener("dblclick", (event) => { */
/*   const { offsetX, offsetY } = event; */
/*   const text = textInput.value; */
/*   if (text === "") { */
/*     return; */
/*   } */
/*   ctx.save(); */
/*   ctx.lineWidth = 1; */
/*   ctx.font = "48px 'Press Start 2P'"; */
/*   ctx.fillText(text, offsetX, offsetY); */
/*   ctx.restore(); */
/* }); */

configBox.setCallback("setCanvasSize", (width, height) => {
  painter.setCanvasSize(width, height);
});

configBox.setCallback("saveCurrentImage", (fileName) => {
  painter.saveCurrentImage(fileName);
});

brushBox.setCallback("selectedColor", (color) => {
  painter.setColor(color);
});

brushBox.setCallback("selectedEraser", (on) => {
  painter.setEraser(on);
});

brushBox.setCallback("selectedWidth", (lineWidth) => {
  painter.setBurshWidth(lineWidth);
});

funcBox.setCallback("enableFill", (on) => {
  painter.setFill(on);
});

funcBox.setCallback("clearAll", () => {
  painter.clearAll();
});

funcBox.setCallback("inputImage", (img) => {
  painter.setImage(img);
});

funcBox.setCallback("inputText", () => {
  painter.setText();
});
