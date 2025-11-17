const srcImgContainer = document.getElementById("src-img-container");
const toolsForm = document.getElementById("tools-form");

const canvas = document.getElementById("img-canvas");
const ctx = canvas.getContext("2d");

const downloadOptions = document.getElementById("download-options");
const downloadButton = document.getElementById("download-button");
const resetButton = document.getElementById("reset-button");

let imgWidth = null;
let imgHeight = null;

let image = null;
let fileExt = null;
let dataURL = null;

const tools = {
    autoCrop: ["png", "webp"],
};

let createdElements = [];

function fileUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .webp";
    input.onchange = (e) => {
        const file = e.target.files[0];
        image = new Image();
        image.onload = () => {
            srcImgContainer.style.display = "none";
            canvas.style.display = "inline-block";
            canvasDrawImg();
        };
        image.src = URL.createObjectURL(file);

        displayToolOptions(file.name);
    };
    input.click();
}

function canvasDrawImg() {
    imgWidth = image.naturalWidth;
    imgHeight = image.naturalHeight;
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    ctx.drawImage(image, 0, 0);
}

function displayToolOptions(fileName) {
    const placeholder = document.getElementById("placeholder");
    placeholder.style.display = "none";

    fileExt = fileName.split(".").pop().toLowerCase();
    if (fileExt === "jpg") dataURL = "image/jpeg";
    else dataURL = `image/${fileExt}`;

    for (let tool in tools) {
        if (tools[tool].includes(fileExt)) {
            toolsForm.appendChild(createRadioElement(tool, "action", tool));
        }
    }

    toolsForm.appendChild(
        createRadioElement("coming-soon", "action", "coming soon...", true)
    );

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "apply";
    buttonElement.id = "apply-button";

    buttonElement.addEventListener("click", (e) => {
        e.preventDefault();
        const selectedAction = document
            .querySelector('input[name="action"]:checked')
            .id.split("-")
            .pop();

        switch (selectedAction) {
            case "autoCrop":
                autoCrop();
                break;
            default:
                alert("This feature isn't implemented.");
        }
    });

    toolsForm.appendChild(buttonElement);
}

function createRadioElement(id, name, labelText, disabled) {
    const elementWrapper = document.createElement("div");
    elementWrapper.className = "radio-element";
    elementWrapper.id = "wrapper-" + id;

    const inputElement = document.createElement("input");
    inputElement.type = "radio";
    inputElement.id = "input-" + id;
    inputElement.name = name;
    if (disabled) inputElement.disabled = true;

    elementWrapper.appendChild(inputElement);

    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = "input-" + id;
    inputLabel.className = "input-label";
    inputLabel.innerText = labelText;

    elementWrapper.appendChild(inputLabel);

    createdElements.push("wrapper-" + id);

    return elementWrapper;
}

function autoCrop() {
    const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight).data;

    let top = imgHeight - 1,
        bottom = 0,
        left = imgWidth - 1,
        right = 0;

    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < imgWidth; x++) {
            const alpha = imgData[(y * imgWidth + x) * 4 + 3];
            if (alpha !== 0) {
                if (y < top) top = y;
                if (x < left) left = x;
                if (x > right) right = x;
                bottom = y;
            }
        }
    }

    let cropWidth = right - left + 1;
    let cropHeight = bottom - top + 1;

    const croppedImageData = ctx.getImageData(left, top, cropWidth, cropHeight);

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    ctx.putImageData(croppedImageData, 0, 0);

    showDownloadOptions();
}

function showDownloadOptions() {
    for (let elementId of createdElements) {
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    }
    createdElements = [];

    document.getElementById("apply-button").remove();

    downloadOptions.style.display = "flex";
}

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `edited-image.${fileExt}`;
    link.href = canvas.toDataURL(dataURL);
    link.click();
    link.remove();
});

resetButton.addEventListener("click", () => {
    srcImgContainer.style.display = "flex";
    canvas.style.display = "none";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    placeholder.style.display = "flex";
    downloadOptions.style.display = "none";
});
