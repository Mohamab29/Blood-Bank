const renderBloodTypes = async () => {
    let uri = 'http://localhost:3000/bloodBank?_sort=amount';

    const response = await fetch(uri);
    const bloodTypesData = await response.json();

    let ourData = '';
    for (const bloodType of bloodTypesData) {
        ourData += `
            <p>
            The blood type : ${bloodType.id}
            <br>
            The amount of units : ${bloodType.amount}
            </p>
        `;
    }
    document.getElementById("bloodTypes").innerHTML = ourData;
}
const renderDonors = async () => {
    let uri = 'http://localhost:3000/donors';

    const response = await fetch(uri);
    const donorsData = await response.json();

    let ourData = '';
    for (const donor of donorsData) {
        ourData += `
            <p>
            The Name of donor : ${donor.fullName}
            <br>
            Donor id  : ${donor.donorID}
            <br>
            Phone number  : ${donor.phoneNumber}
            <br>
            Blood Type  : ${donor.bloodType}
            <br>
            </p>
        `;
    }
    document.getElementById("donors").innerHTML = ourData;
}
async function addDonor() {
    const myForm = document.getElementById("myForm");
    console.log(myForm.fullName.value);
    const donor = {
        donorID: myForm.donorId.value,
        fullName: myForm.fullName.value,
        phoneNumber: myForm.phoneNumber.value,
        bloodType: myForm.bloodType.value
    }
    await fetch('http://localhost:3000/donors', {
        method: 'POST',
        body: JSON.stringify(donor),
        headers: { 'Content-Type': 'application/json' }
    });

    let ourData = '';

    ourData += `
        <p>
        The Name of donor : ${donor.fullName}
        <br>
        Donor id  : ${donor.donorID}
        <br>
        Phone number  : ${donor.phoneNumber}
        <br>
        Blood Type  : ${donor.bloodType}
        <br>
        </p>
    `;

    document.getElementById("donors").innerHTML += ourData;
}
// renderBloodTypes();
// renderDonors();