function addTableRow(rowIndex, donorId, fullName, phoneNumber, bloodType) {
    /*
    How a table row will look like for the donor data
        <tr>
            <th scope="row">rowIndex</th>
            <td>donorID</td>
            <td>fullName</td>
            <td>phoneNumber</td>
            <td>bloodType</td>
        </tr>
    */
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = rowIndex;
    tr.appendChild(th);

    const td01 = document.createElement("td");
    td01.innerHTML = donorId;
    tr.appendChild(td01);
    const td02 = document.createElement("td");
    td02.innerHTML = fullName;
    tr.appendChild(td02);
    const td03 = document.createElement("td");
    td03.innerHTML = phoneNumber;
    tr.appendChild(td03);
    const td04 = document.createElement("td");
    td04.innerHTML = bloodType;
    tr.appendChild(td04);

    return tr;
}
function searchTable() {
    // this function is called when someone uses the search bar above the table
    // we check all the table data (aka cells) , if the string that in the input match any cell 
    // if yes then we display it

    const table = document.getElementById("data-table");
    const tr = table.getElementsByTagName("tr");

    const checkCell = (cell) => {
        let searchInput = document.getElementById("search-input");
        let filter = searchInput.value.toLowerCase();
        let txtValue = cell.innerText.toLowerCase();
        return txtValue.includes(filter);
    };
    let cells = {};
    let contain = false;
    for (let i = 1; i < tr.length; i++) {
        cells = tr[i].getElementsByTagName("td");
        for (const cell of cells) {
            if (checkCell(cell)) {
                tr[i].style.display = "";
                contain = true;
            }
        }
        if (!contain) {
            tr[i].style.display = "none";
        }
        contain = false;
    }
}
window.onload = async () => {
    //on load we build the table dynamically by using 
    // the data the json-server 
    const tbody = document.getElementById("table-body");
    let uri = 'http://localhost:3000/donors';

    const response = await fetch(uri);
    const donorsData = await response.json();

    let tableRow = {};
    for (let i = 0; i < donorsData.length; i++) {
        tableRow = addTableRow(i + 1,
            donorsData[i].donorID,
            donorsData[i].fullName,
            donorsData[i].phoneNumber,
            donorsData[i].bloodType);
        tbody.appendChild(tableRow);
    }

}