let main = document.querySelector("main");

let hexLetters = "0123456789ABCDEF";
hexLetters = hexLetters.split("");

let table = elem("table", [
    elem("thead", [
        elem("tr", [
            elem("th"),
        ]),
    ]),
    elem("tbody"),
]);

let theadRow = table.children[0].children[0];
let tbody = table.children[1];

hexLetters.forEach(letter => {
    theadRow.append( elem("th", letter) );
});

hexLetters.forEach(firstLetter => {
    let row = elem("tr");
    row.append( elem("th", firstLetter) );
    
    hexLetters.forEach(secondLetter => {
        let cell = elem("td", [
            elem("span", {"class":"hex"}, firstLetter + secondLetter),
            elem("span", {"class":"decimal"}, [
                parseInt(firstLetter + secondLetter, 16),
            ]),
        ]);
        row.append(cell);
    });
    
    tbody.append(row);
});

main.append(table);

let rows = Array.from(tbody.querySelectorAll("tr"));
let cells = Array.from(tbody.querySelectorAll("td"));
cells.forEach(cell => {
    cell.addEventListener("mouseenter", () => {
        cells.forEach(cell => cell.classList.remove("highlight"));
        let cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
        rows.forEach(row => {
            row.children[cellIndex].classList.add("highlight");
        });
    });
});
table.addEventListener("mouseleave", () => {
    cells.forEach(cell => cell.classList.remove("highlight"));
});