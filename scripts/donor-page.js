function clearForm() {
    const donorForm = document.getElementById("donor-form");
    donorForm["donorID"].value = "";
    donorForm["fullName"].value = "";
    donorForm["phoneNumber"].value = "";
    donorForm["bloodTypeSelect"].selectedIndex = 0;
}
async function addDonor(event) {
    event.preventDefault();

    // const donorForm = document.getElementById("donor-form");
    const donorID = document.getElementById("donorID").value;
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const bloodType = document.getElementById("bloodTypeSelect").value;

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
    const postDonor = await fetch('http://localhost:3000/donors', {
        method: 'POST',
        body: JSON.stringify(donor),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
    }).then(response => response.json())
        .then(json => json
            // const dataObject = JSON.parse(data);
            // alert(`${data.fullName} has been registered as a donor with ${data.bloodType} blood .`);
        )
        .catch((err) => err.message);
    alert("Please No");
    // postDonor.status = "200" && alert("good");
    // postDonor.status != "200" && alert("failed");
    // window.onbeforeunload = $('#success-modal').modal('show');
    
}