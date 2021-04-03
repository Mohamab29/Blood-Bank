function clearForm() {
    document.getElementById("donorID").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("streetInput").value = "";
    document.getElementById("cityInput").value = "";
    document.getElementById("bloodTypeSelect").value = "";
}

function isDonor(id) {
    //This function checks if the donor id is valid, meaning:
    // if the person has donated before then there is no need to add him again 
    const donors = getObjectFromLocalStorage("donors");
    if (!donors) {
        return false;
    }
    for (const donor of donors) {
        if (donor.donorID === id) {
            return true;
        }
    }
    return false;
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
async function addDonor(event) {
    event.preventDefault();
    const modalParagraph = document.getElementById("modal-paragraph");
    const donorID = document.getElementById("donorID").value;
    const fullName = document.getElementById("fullName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const streetName = document.getElementById("streetInput").value;
    const cityName = document.getElementById("cityInput").value;
    const bloodType = document.getElementById("bloodTypeSelect").value;

    if (!donorID || !fullName || !phoneNumber || !streetName || !cityName || bloodType === "Choose type") {
        alert("Please enter all the fields before submitting the form");
        return;
    }
    if (isDonor(donorID)) {
        //we need to check if we entered the same blood type.
        const donors = getObjectFromLocalStorage("donors");
        for (const d of donors) {
            if (d.donorID === donorID & d.bloodType !== bloodType) {
                alert("Oops!!\nseems like you have entered for the same person a different blood type.");
                return;
            }
        }
        updateBloodBank(bloodType);
        modalParagraph.innerHTML = `${fullName} has already donated but his blood unit has been saved.`;
    } else {
        const donor = {
            id: createId(),
            donorID: donorID,
            fullName: fullName,
            phoneNumber: phoneNumber,
            streetName: streetName,
            cityName: cityName,
            bloodType: bloodType
        };
        modalParagraph.innerHTML = `${donor.fullName} has been added to the donors list with type ${donor.bloodType} blood.`;
        saveToLocalStorage(donor, "donors");
        updateBloodBank(bloodType);
    }
    $('#success-modal').modal('show');
    return;
}
