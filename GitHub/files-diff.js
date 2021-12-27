// unmark all files viewed
document.querySelectorAll(
    "#files input[type=checkbox].js-reviewed-checkbox"
).forEach(cb => {
    if (cb.checked) {
        cb.click();
    }
});

// mark all files viewed
document.querySelectorAll(
    "#files input[type=checkbox].js-reviewed-checkbox"
).forEach(cb => {
    if (!cb.checked) {
        cb.click();
    }
});

// fold all files
document.querySelectorAll(
    "#files .file-info > button"
).forEach(button => {
    let fileEl = button.closest(".file");
    if (fileEl) {
        if (fileEl.classList.contains("Details--on")) {
            button.click();
        }
    }
});