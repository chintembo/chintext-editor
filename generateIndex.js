const fs = require("fs");

const content = `import "./dist/chintext.min.js";
import "./css/chintext.css";

export default function initializeChinText(selector) {
    const editor = document.querySelector(selector);
    if (editor) {
        editor.classList.add("chintext-editor");
        editor.contentEditable = true;
    }
}`;

fs.writeFileSync("index.js", content, "utf8");
console.log("✅ index.js has been generated!");
