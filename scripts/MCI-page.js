function clearForm() {
    document.getElementById("ambulanceID").value = "";
    document.getElementById("numberOfBloodUnits").value = "";
}
function requestBloodUnits() {
    const ambulanceID = document.getElementById("ambulanceID").value;
    const numberOfBloodUnits = parseInt(document.getElementById("numberOfBloodUnits").value);
    if (numberOfBloodUnits <= 0) {
        alert("Please enter a valid number of requested blood units");
        return;
    }
    if(!numberOfBloodUnits || !ambulanceID){
        alert("Please enter all the fields before submitting the form");
        return;
    }
    const available = checkBloodTypeAvailability("O-", numberOfBloodUnits);
    if(available.amount === 0){
        const answer = confirm("Sadly, there is not enough blood units of type O-.\nwould you like to be redirected to the donors table?");
        if (answer) {
            window.location.href = '../pages/viewDonors.html';
        }
        return;
    }
    alert(`There was ${available.amount} available blood units type O-.\nthey will given to the ambulance with id: ${ambulanceID}.`);
    clearForm();
    return;
}