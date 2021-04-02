function addTableRow(rowIndex, id, amount) {
    /*
    How a table row will look like for the blood bank data
        <tr>
            <th scope="row">rowIndex</th>
            <td>id</td>
            <td>amount</td>
        </tr>
    */
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = rowIndex;
    tr.appendChild(th);

    let td01 = document.createElement("td");
    td01.innerHTML = id;
    tr.appendChild(td01);
    let td02 = document.createElement("td");
    td02.innerHTML = amount;
    tr.appendChild(td02);
    return tr;
}
function searchTable() {
    // this function is called when someone uses the search bar above the table
    // we check all the table data (aka cells) , if the string that in the input match any cell 
    // if yes then we display it
    let td01, td02;
    const table = document.getElementById("data-table");
    const tr = table.getElementsByTagName("tr");

    const showOrHideRow = (tr, td1, td2) => {
        let searchInput = document.getElementById("search-input");
        let filter = searchInput.value;
        let txtValue1 = td1.innerText;
        let txtValue2 = td2.innerText;
        if (txtValue1.indexOf(filter) > -1 || txtValue2.indexOf(filter) > -1) {
            tr.style.display = "";
        } else {
            tr.style.display = "none";
        }
    };

    for (let i = 1; i < tr.length; i++) {
        td01 = tr[i].getElementsByTagName("td")[0];
        td02 = tr[i].getElementsByTagName("td")[1];
        if (td01 && td02) {
            showOrHideRow(tr[i], td01, td02);
        }
    }
}
window.onload = async () => {
    //on load we build the table dynamically by using 
    // the data the json-server 
    const tbody = document.getElementById("table-body");
    let uri = 'http://localhost:3000/bloodBank?_sort=amount&_order=asc';

    const response = await fetch(uri);
    const bloodTypesData = await response.json();

    let tableRow = {};
    for (let i = 0; i < bloodTypesData.length; i++) {
        tableRow = addTableRow(i + 1, bloodTypesData[i].id, bloodTypesData[i].amount);
        tbody.appendChild(tableRow);
    }

}