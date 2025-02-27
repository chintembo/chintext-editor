const editor = document.getElementById("editor");

function format(command, value = null) {
    document.execCommand(command, false, value);
}

function setFontSize(size) {
    document.execCommand("fontSize", false, size);
}

function setColor(color) {
    document.execCommand("foreColor", false, color);
}

function setBgColor(color) {
    document.execCommand("hiliteColor", false, color);
}

function setFont(font) {
    document.execCommand("fontName", false, font);
}

// Insert Image by Pasting or Drag-Dropping
function insertImageAtCursor(src) {
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => enableResize(img);

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(img);
    enableResize(img);
}

editor.addEventListener("paste", (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = function (event) {
                insertImageAtCursor(event.target.result);
            };
            reader.readAsDataURL(blob);
        }
    }
});

// Drag & Drop Images
editor.addEventListener("dragover", (event) => event.preventDefault());
editor.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (event) {
            insertImageAtCursor(event.target.result);
        };
        reader.readAsDataURL(files[0]);
    }
});

// Insert Table
function insertTable() {
    let tableHTML = '<table border="1">';
    for (let i = 0; i < 3; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < 3; j++) {
            tableHTML += "<td contenteditable='true'>Cell</td>";
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";
    document.execCommand("insertHTML", false, tableHTML);
}

// Enable Image Resizing
function enableResize(img) {
    const resizeHandle = document.createElement("div");
    resizeHandle.className = "resize-handle";
    editor.appendChild(resizeHandle);
    positionHandle(img, resizeHandle);

    resizeHandle.onmousedown = function (event) {
        event.preventDefault();
        document.onmousemove = function (e) {
            img.style.width = e.pageX - img.offsetLeft + "px";
            img.style.height = "auto";
            positionHandle(img, resizeHandle);
        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    img.onclick = () => positionHandle(img, resizeHandle);
}

function positionHandle(img, handle) {
    handle.style.left = img.offsetLeft + img.width - 10 + "px";
    handle.style.top = img.offsetTop + img.height - 10 + "px";
    handle.style.display = "block";
}
