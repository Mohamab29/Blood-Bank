function saveToLocalStorage(object, key) {
    // helping function to add the new updated object at the given key
    //in local storage
    let updatedObject = [];
    const jsonArray = localStorage.getItem(key);
    if (jsonArray) {
        updatedObject = JSON.parse(jsonArray);
    }
    updatedObject.push(object);
    localStorage.setItem(key, JSON.stringify(updatedObject));
    return object;

}
function getObjectFromLocalStorage(key) {
    const jsonArray = localStorage.getItem(key);
    if (!jsonArray) return;
    return JSON.parse(jsonArray);
}
function currentDateAndTime() {
    const today = new Date();
    const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + '-' + time;
    return dateTime;
}
function createId() {
    return "_" + Math.random().toString(36).substr(2, 12); // [a-z](a-z1-9)*
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
window.onload = () => {
    // if someone opens the project for the first time
    // we want to initialize the local storage with all the
    // blood types with amount 0.
    const jsonArray = localStorage.getItem("bloodBank");
    if (jsonArray === null) {
        const bloodTypes = ["AB+", "AB-", "B+", "B-", "A+", "A-", "O-", "O+"]
        for (const bloodType of bloodTypes) {
            saveToLocalStorage({
                id: createId(),
                bloodType: bloodType,
                amount: 0
            }, "bloodBank");
        }

    } else {
        return;
    }
}