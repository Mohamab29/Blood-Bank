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
    /*
    @key:string
    */
    const jsonArray = localStorage.getItem(key);
    if (!jsonArray) return null;
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
function updateBloodBank(bloodType, amount = 1) {
    // incrementing the blood units with the same blood type in the blood bank
    const bloodTypesArray = getObjectFromLocalStorage("bloodBank");
    if (!bloodTypesArray) {
        alert("There should a blood bank key in the local storage,check what is wrong!");
    }
    else {
        const indexOfBloodType = bloodTypesArray.map((item) => item.bloodType).indexOf(bloodType);
        if (indexOfBloodType < 0) return false;
        const bloodTypeObject = bloodTypesArray[indexOfBloodType];
        const newAmount = parseInt(bloodTypeObject.amount) + amount;
        const updatedBloodType = {
            id: bloodTypeObject.id,
            bloodType: bloodType,
            amount: newAmount
        }
        bloodTypesArray.splice(indexOfBloodType, 1);
        bloodTypesArray.push(updatedBloodType);
        localStorage.removeItem("bloodBank");
        localStorage.setItem("bloodBank", JSON.stringify(bloodTypesArray));
    }
}
// =====> local storage initialization 
window.onload = () => {
    // if someone opens the project for the first time
    // we want to initialize the local storage with all the
    // blood types with amount 0.
    const bloodBank = getObjectFromLocalStorage("bloodBank");
    const hospitalOrders = getObjectFromLocalStorage("hospitalOrders");
    const orders = getObjectFromLocalStorage("orders");
    if (!bloodBank && !hospitalOrders && !orders) {
        const bloodTypes = ["AB+", "AB-", "B+", "B-", "A+", "A-", "O-", "O+"]
        for (const bloodType of bloodTypes) {
            saveToLocalStorage({
                id: createId(),
                bloodType: bloodType,
                amount: 100
            }, "bloodBank");
        }
        localStorage.setItem("hospitalOrders","[]");
        localStorage.setItem("donors","[]");
    } 
    else {
        return;
    }
}