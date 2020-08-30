const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorBtns = document.querySelector(".color-container");
const paintingSize = document.querySelector("#jsPaintingSize");
const controls = document.querySelector(".controls");

let isPainting = false;
let isFilling = false;

const onMouseMove = (event) => {
    if (isFilling === true) {
        return;
    }
    const { offsetX: x, offsetY: y } = event;
    if (isPainting == false) {
        ctx.beginPath();
        ctx.moveTo(5 * x, 5 * y);
    } else {
        ctx.lineTo(5 * x, 5 * y);
        ctx.stroke();
    }
};

const startPainting = () => {
    isPainting = true;
};

const stopPainting = () => {
    isPainting = false;
};

const onColorBtnClick = (event) => {
    if (event.target == null) {
        return;
    }
    ctx.strokeStyle = getComputedStyle(
        document.documentElement
    ).getPropertyValue(`--color-${event.target.dataset.value}`);
    ctx.fillStyle = ctx.strokeStyle;
};

const onChangePaintingSize = (event) => {
    ctx.lineWidth = event.target.value;
};

const saveImage = () => {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
};

const onControlClick = (event) => {
    const btn = event.target;
    const control = btn.dataset.value;
    if (control == null) {
        return;
    }
    switch (control) {
        case "fill":
            isFilling = true;
            btn.innerHTML = "Paint";
            btn.dataset.value = "paint";
            break;
        case "paint":
            isFilling = false;
            btn.innerHTML = "Fill";
            btn.dataset.value = "fill";
            break;
        case "save":
            saveImage();
            break;
        default:
            Error("unknowen control");
            break;
    }
};

const onCanvasClick = (event) => {
    if (isFilling === false) {
        return;
    }

    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const init = () => {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });
    canvas.width = canvas.clientWidth * 5;
    canvas.height = canvas.clientHeight * 5;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#0c0c0c";
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 2.5;

    colorBtns.addEventListener("click", onColorBtnClick);

    paintingSize.addEventListener("input", onChangePaintingSize);

    controls.addEventListener("click", onControlClick);
};

if (canvas) {
    init();
}
