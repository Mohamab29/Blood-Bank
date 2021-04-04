function clearForm() {
    document.getElementById("patientID").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("numberOfBloodUnits").value = "";
    document.getElementById("bloodTypeSelect").value = "Choose type";
}
function checkOtherBloodTypes(numBUs, bloodBank, compatibleBTs) {
    let givenBloodTypes = {
        bloodTypes: [],
        amount: 0
    } // we save the blood types that gave us the adequate units
    for (const blood of bloodBank) {
        if (numBUs == 0) {
            break;
        }
        if (compatibleBTs.includes(blood.bloodType)) {
            if (blood.amount > 0) {
                if (blood.amount < numBUs) {

                    numBUs = numBUs - blood.amount;
                    updateBloodBank(blood.bloodType, -blood.amount);
                    givenBloodTypes.bloodTypes.push(blood.bloodType);
                    givenBloodTypes.amount += blood.amount;
                } else if (blood.amount >= numBUs) {

                    updateBloodBank(blood.bloodType, -numBUs);
                    givenBloodTypes.bloodTypes.push(blood.bloodType);
                    givenBloodTypes.amount += numBUs;
                    break;
                }
            }
        }
    }
    return givenBloodTypes;
}
function checkBloodTypeAvailability(bloodType, numBUs) {
    const compatibleBTs = {
        "A+": ["A+", "A-", "O+", "O-"],
        "O+": ["O+", "O-"],
        "B+": ["B+", "B-", "O+", "O-"],
        "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
        "A-": ["A-", "O-"],
        "O-": ["O-"],
        "B-": ["B-", "O-"],
        "AB-": ["AB-", "A-", "B-", "O-"]
    }
    const bloodBank = getObjectFromLocalStorage("bloodBank");
    let givenBloodTypes = {
        bloodTypes: [],
        amount: 0
    };
    for (const blood of bloodBank) {
        if (blood.bloodType === bloodType) {
            //first we check if the amount is enough
            if (blood.amount >= numBUs) {
                updateBloodBank(bloodType, -numBUs);
                givenBloodTypes.bloodTypes.push(blood.bloodType);
                givenBloodTypes.amount += numBUs;
            } else if (blood.amount < numBUs) {
                givenBloodTypes = checkOtherBloodTypes(numBUs, bloodBank, compatibleBTs[bloodType]);
            }
        }
    }
    return givenBloodTypes;
}
function addOrder() {
    const modalParagraph = document.getElementById("modal-paragraph");
    const patientID = document.getElementById("patientID").value;
    const fullName = document.getElementById("fullName").value;
    const numberOfBloodUnits = parseInt(document.getElementById("numberOfBloodUnits").value);
    const bloodType = document.getElementById("bloodTypeSelect").value;
    if (numberOfBloodUnits <= 0) {
        alert("Please enter a valid number of requested blood units");
        return;
    }
    if (!patientID || !fullName || !numberOfBloodUnits || bloodType === "Choose type") {
        alert("Please enter all the fields before submitting the form");
        return;
    }
    const givenBloodTypes = checkBloodTypeAvailability(bloodType, numberOfBloodUnits);
    if (givenBloodTypes.bloodTypes.length === 0) {
        const answer = confirm("Sadly, there is not enough blood units from the same type or other compatible types.\nwould you like to be redirected to the donors table?");
        if (answer) {
            window.location.href = '../pages/viewDonors.html';
        }
        return;
    }
    const bloodTypes = givenBloodTypes.bloodTypes;
    let bloodTypesString = '';
    for (let i = 0; i < bloodTypes.length; i++) {
        if (i === bloodTypes.length - 1) {
            bloodTypesString += bloodTypes[i]
        } else {
            bloodTypesString += bloodTypes[i] + ",";
        }

    }
    const order = {
        id: createId(),
        patientID: patientID,
        fullName: fullName,
        numberOfBloodUnits: givenBloodTypes.amount,
        bloodType: bloodTypesString,
        timeStamp: currentDateAndTime()
    };
    modalParagraph.innerHTML = `${fullName} will receive the following blood type/s: ${bloodTypesString}.<br>this amount: ${givenBloodTypes.amount}.<br>the order has been added to orders table.`
    saveToLocalStorage(order, "hospitalOrders");
    $('#success-modal').modal('show');
}
