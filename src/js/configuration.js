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
  saveCurrentImage: (fileName) => {},
};

sizeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  callbacks.setCanvasSize(widthInput.value, heightInput.value);
});

saveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  callbacks.saveCurrentImage(filenameInput.value);
});

export default {
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
  getSize: () => {
    return {
      width: widthInput.value,
      height: heightInput.value,
    };
  },
};
