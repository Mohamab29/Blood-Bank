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

function createId() {
    return "_" + Math.random().toString(36).substr(2, 12); // [a-z](a-z1-9)*
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