const funcBox = document.querySelector(".functions");
const imageInput = funcBox.querySelector("#image-input");
const textBtn = funcBox.querySelector("#text-btn");
const fillBtn = funcBox.querySelector("#fill-btn");
const clearBtn = funcBox.querySelector("#clear-btn");
const fontSizeInput = funcBox.querySelector("#font-size");

const callbacks = {
  enableFill: (on) => {},
  clearAll: () => {},
  inputText: (size) => {},
  inputImage: (img) => {},
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

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    callbacks.inputImage(img);
    imageInput.value = null;
  };
});

textBtn.addEventListener("click", (e) => {
  callbacks.inputText(parseInt(fontSizeInput.value));
});

export default {
  setCallback: (name, func) => {
    callbacks[name] = func;
  },
};
