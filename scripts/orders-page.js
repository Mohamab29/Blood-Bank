function clearForm() {
    const donorForm = document.getElementById("donor-form");
    donorForm["patientID"].value = "";
    donorForm["fullName"].value = "";
    donorForm["numberOfBloodUnits"].value = "";
    donorForm["bloodType"].selectedIndex = 0;
}
function addOrder(){
    const donorForm = document.getElementById("donor-form");
    const donorID = donorForm["donorID"].value;
    const fullName = donorForm["fullName"].value;
    const phoneNumber = donorForm["phoneNumber"].value;
    const bloodType = donorForm["bloodTypeSelect"].value;

    if (!donorID || !fullName || !phoneNumber || bloodType === "Choose type") {
        alert("Please enter all the fields before submitting the form");
        return;
    }
    const donor = {
        donorID: donorID,
        fullName: fullName,
        phoneNumber: phoneNumber,
        bloodType: bloodType
    };
    const postDonor = async () => {
        await fetch('http://localhost:3000/donors', {
            method: 'POST',
            body: JSON.stringify(donor),
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
        }).then(response => { return response.json() })
            .then(data => {
                // const dataObject = JSON.parse(data);
                alert(`${data.fullName} has been registered as a donor with ${data.bloodType} blood .`);
            })
            .catch((err) => { alert("this error happened :" + err) });

    };
    postDonor();

}
