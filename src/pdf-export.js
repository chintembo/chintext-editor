function exportToPDF() {
    const content = document.getElementById("editor").innerHTML;
    const blob = new Blob([content], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "document.pdf";
    link.click();
}