const fileInput = document.getElementById("file-input");
const container = document.getElementById("container");

function previewFiles() {
  container.innerHTML = "";

  const files = fileInput.files;

  for (const file of files) {
    //  validate loại file
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert(`${file.name} không hợp lệ! Chỉ chọn JPG hoặc PNG.`);
      continue;
    }

    //  validate
    if (file.size > 2 * 1024 * 1024) {
      alert(`${file.name} quá lớn! (chỉ < 2MB).`);
      continue;
    }

    //  tạo preview
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      container.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fileInput.addEventListener("change", previewFiles);
});
