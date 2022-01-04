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

// merge file lists
let fileLists = document.querySelectorAll(".js-diff-progressive-container");
if (fileLists.length > 1) {
    Array.from(fileLists).slice(1).forEach(list => {
        Array.from(list.children).forEach(diffEl => {
            fileLists[0].append(diffEl);
        });
        list.remove();
    });
}
// sort by change count
const getFileChangeCount = (fileEl) => {
    let count = fileEl.querySelector(".diffstat").innerText.trim();
    count = parseInt(count);
    return count;
};
let files = Array.from(fileLists[0].children);
files.sort((a, b) => {
    return getFileChangeCount(a) - getFileChangeCount(b);
});
files.forEach(file => fileLists[0].append(file));