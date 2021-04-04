function clearForm() {
    document.getElementById("donorID").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("streetInput").value = "";
    document.getElementById("cityInput").value = "";
    document.getElementById("bloodTypeSelect").value = "Choose type";
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
            timeStamp:currentDateAndTime(),
            bloodType: bloodType
        };
        modalParagraph.innerHTML = `${donor.fullName} has been added to the donors list with type ${donor.bloodType} blood.`;
        saveToLocalStorage(donor, "donors");
        updateBloodBank(bloodType);
    }
    $('#success-modal').modal('show');
    return;
}
