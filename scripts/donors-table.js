function addTableRow(rowIndex, donorId,
    fullName, phoneNumber, streetName,
    cityName, bloodType, timeStamp) {
    /*
    How a table row will look like for the donor data
        <tr>
            <th scope="row">rowIndex</th>
            <td>donorID</td>
            <td>fullName</td>
            <td>phoneNumber</td>
            <td>street</td>
            <td>city</td>
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
    td01.innerHTML = donorId;
    tr.appendChild(td01);

    const td02 = document.createElement("td");
    td02.innerHTML = fullName;
    tr.appendChild(td02);

    const td03 = document.createElement("td");
    td03.innerHTML = phoneNumber;
    tr.appendChild(td03);

    const td04 = document.createElement("td");
    td04.innerHTML = streetName;
    tr.appendChild(td04);

    const td05 = document.createElement("td");
    td05.innerHTML = cityName;
    tr.appendChild(td05);

    const td06 = document.createElement("td");
    td06.innerHTML = bloodType;
    tr.appendChild(td06);

    const td07 = document.createElement("td");
    td07.innerHTML = timeStamp;
    tr.appendChild(td07);

    return tr;
}
window.onload = () => {
    //on load we build the table dynamically by using 
    // the data the json-server 
    const tbody = document.getElementById("table-body");


    const donorsData = getObjectFromLocalStorage("donors");
    if (donorsData) {
        let tableRow = {};
        for (let i = 0; i < donorsData.length; i++) {
            tableRow = addTableRow(i + 1,
                donorsData[i].donorID,
                donorsData[i].fullName,
                donorsData[i].phoneNumber,
                donorsData[i].streetName,
                donorsData[i].cityName,
                donorsData[i].bloodType,
                donorsData[i].timeStamp);
            tbody.appendChild(tableRow);
        }
    }
}