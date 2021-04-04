function addTableRow(rowIndex, patientID,
    fullName, numberOfBloodUnits,
    bloodType, timeStamp) {
    /*
    How a table row will look like for the donor data
        <tr>
            <th scope="row">rowIndex</th>
            <td>patientID</td>
            <td>fullName</td>
            <td>numberOfBloodUnits</td>
            <td>bloodType</td>
            <td>time stamp</td>
        </tr>
    */
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.scope = "row";
    th.innerHTML = rowIndex;
    tr.appendChild(th);

    const td01 = document.createElement("td");
    td01.innerHTML = patientID;
    tr.appendChild(td01);
    const td02 = document.createElement("td");
    td02.innerHTML = fullName;
    tr.appendChild(td02);
    const td03 = document.createElement("td");
    td03.innerHTML = numberOfBloodUnits;
    tr.appendChild(td03);
    const td04 = document.createElement("td");
    td04.innerHTML = bloodType;
    tr.appendChild(td04);
    const td05 = document.createElement("td");
    td05.innerHTML = timeStamp;
    tr.appendChild(td05);

    return tr;
}

window.onload = async () => {
    //on load we build the table dynamically by using 
    // the data the json-server 
    const tbody = document.getElementById("table-body");

    const donorsData = getObjectFromLocalStorage("hospitalOrders");
    if (donorsData) {
        let tableRow = {};
        for (let i = 0; i < donorsData.length; i++) {
            tableRow = addTableRow(i + 1,
                donorsData[i].patientID,
                donorsData[i].fullName,
                donorsData[i].numberOfBloodUnits,
                donorsData[i].bloodType,
                donorsData[i].timeStamp);
            tbody.appendChild(tableRow);
        }
    }
}