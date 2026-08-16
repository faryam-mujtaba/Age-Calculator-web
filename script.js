const ageForm = document.getElementById("ageForm");
const dobInput = document.getElementById("dob");

const yearsElement = document.getElementById("years");
const monthsElement = document.getElementById("months");
const daysElement = document.getElementById("days");

const errorMessage = document.getElementById("errorMessage");

ageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const birthDateValue = dobInput.value;

    // Clear previous error
    errorMessage.textContent = "";

    if (!birthDateValue) {
        errorMessage.textContent = "Please select your date of birth.";
        return;
    }

    const birthDate = new Date(birthDateValue);
    const today = new Date();

    // Check if birth date is in the future
    if (birthDate > today) {
        errorMessage.textContent = "Date of birth cannot be in the future.";
        return;
    }

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;

        const previousMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            0
        );

        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display age
    yearsElement.textContent = years;
    monthsElement.textContent = months;
    daysElement.textContent = days;
});