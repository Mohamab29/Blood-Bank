function clearForm() {
    const donorForm = document.getElementById("order-form");
    donorForm["patientID"].value = "";
    donorForm["fullName"].value = "";
    donorForm["numberOfBloodUnits"].value = "";
    donorForm["bloodType"].selectedIndex = 0;
}
async function patchAmountsOfBloodAsync(numberOfBloodUnits, bloodType) {
    const bloodBankURI = 'http://localhost:3000/bloodBank/' + bloodType;

    const response = await fetch(bloodBankURI);
    const bloodTypeObject = await response.json();
    let updatedAmount = parseInt(bloodTypeObject.amount) - numberOfBloodUnits;
    console.log(bloodTypeObject)
    console.log(updatedAmount)
    fetch(bloodBankURI, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                amount: updatedAmount
            }
        )
    }).then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => alert("This error happened:" + err));
}
function addOrder() {
    const orderForm = document.getElementById("order-form");
    const patientID = orderForm["patientID"].value;
    const fullName = orderForm["fullName"].value;
    const numberOfBloodUnits = orderForm["numberOfBloodUnits"].value;
    const bloodType = orderForm["bloodTypeSelect"].value;

    if (!patientID || !fullName || !numberOfBloodUnits || bloodType === "Choose type") {
        alert("Please enter all the fields before submitting the form");
        return;
    }
    const order = {
        patientID: patientID,
        fullName: fullName,
        numberOfBloodUnits: numberOfBloodUnits,
        bloodType: bloodType
    };
    patchAmountsOfBloodAsync(numberOfBloodUnits,bloodType);
    const postDonor = async () => {
        await fetch('http://localhost:3000/hospitalOrders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
        }).then(response => { return response.json() })
            .then(data => {
                // const dataObject = JSON.parse(data);
                alert(`${data.fullName} will receive ${data.numberOfBloodUnits} units of blood of type ${data.bloodType} blood.`);
            })
            .catch((err) => { alert("this error happened :" + err) });

    };
    postDonor();
    return false;
}
