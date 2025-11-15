let srcImgContainer = document.getElementById("src-img-container");
let srcImg = document.getElementById("src-img");

function fileUpload() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpg, .webp';
    input.onchange = e => {
        let file = e.target.files[0];
        srcImgContainer.style.display = "none";
        srcImg.style.display = "inline-block";
        srcImg.src = URL.createObjectURL(file);
    }
    input.click();
}
