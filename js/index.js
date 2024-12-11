// HTML ELEMENTS
const inputBill = document.getElementById("Bill");
const errorMsgBill = document.getElementById("error-msg-bill");

const inputNumberOfPeople = document.getElementById("NumberOfPeople");
const errorMsgNumberOfPeople = document.getElementById("error-msg-nop");

const buttonReset = document.getElementById("buttonReset");
const amountTipPerson = document.getElementById("amountTipPerson");
const amountTotalPerson = document.getElementById("amountTotalPerson");

const buttonsPercentage = document.querySelectorAll(".header__div-div-button");
const customPercentage = document.getElementById("custom");

// INPUT VALIDATIONS
const setErrorMsg = (input, errorContainer, msg) => {
  if (msg) {
    errorContainer.textContent = msg;
    errorContainer.style.display = "block";
    input.classList.add("invalid");
    input.classList.remove("valid");
  } else {
    errorContainer.style.display = "none";
    input.classList.add("valid");
    input.classList.remove("invalid");
  }
};

const validateField = (input, errorContainer) => {
  const value = parseFloat(input.value.trim());
  if (input.value.trim() === "") {
    setErrorMsg(
      input,
      errorContainer,
      "The field is empty or your value is invalid!"
    );
    return false;
  } else if (value === 0) {
    setErrorMsg(input, errorContainer, "Can't be Zero!");
    return false;
  } else if (value < 0) {
    setErrorMsg(input, errorContainer, "Negative values are not allowed!");
    return false;
  } else {
    setErrorMsg(input, errorContainer, null);
    return true;
  }
};

// TIP CALCULATE
const calculateTip = (percentage) => {
  const billValue = parseFloat(inputBill.value);
  const numberOfPeople = parseInt(inputNumberOfPeople.value);

  if (!billValue || !numberOfPeople)
    return { tipPerPerson: 0, totalPerPerson: 0 };

  const tipPerPerson = ((percentage / 100) * billValue) / numberOfPeople;

  const totalPerPerson =
    percentage !== 0 ? billValue / numberOfPeople + tipPerPerson : 0;

  amountTipPerson.textContent =
    isNaN(tipPerPerson) || 0 > tipPerPerson
      ? "$0.00"
      : `$${tipPerPerson.toFixed(2)}`;
  amountTotalPerson.textContent =
    isNaN(totalPerPerson) || 0 > totalPerPerson
      ? "$0.00"
      : `$${totalPerPerson.toFixed(2)}`;
};

// PRINCIPAL FUNCTIONS
const tipCalculator = () => {
  let percentage;

  buttonsPercentage.forEach((button) => {
    button.addEventListener("click", (e) => {
      button.classList.toggle("active");
      const isActive = button.classList.contains("active");
      percentage = isActive ? parseInt(e.target.id) : 0;

      buttonsPercentage.forEach((otherButton) => {
        if (otherButton !== button) otherButton.classList.remove("active");
      });

      customPercentage.value = "";
      calculateTip(percentage);
      updateResetButton();
    });
  });

  customPercentage.addEventListener("input", () => {
    buttonsPercentage.forEach((button) => {
      button.classList.remove("active");
    });
    percentage = parseInt(customPercentage.value);

    calculateTip(percentage);
    updateResetButton();
  });
};

const updateResetButton = () => {
  const isBillValid = validateField(inputBill, errorMsgBill);
  const isPeopleValid = validateField(
    inputNumberOfPeople,
    errorMsgNumberOfPeople
  );
  const isCustomValid =
    customPercentage.value.trim() !== "" &&
    parseFloat(customPercentage.value) > 0;
  buttonReset.disabled = !(
    isBillValid &&
    isPeopleValid &&
    (isCustomValid || customPercentage.value === "")
  );
};

// BTN RESET EVENT
buttonReset.addEventListener("click", () => {
  amountTipPerson.textContent = amountTotalPerson.textContent = "$0.00";
  inputBill.value = inputNumberOfPeople.value = customPercentage.value = "";
  buttonsPercentage.forEach((button) => {
    button.classList.remove("active");
  });
  buttonReset.disabled = true;
});

// INPUTS LISTENER
[inputBill, inputNumberOfPeople].forEach((input) => {
  input.addEventListener("input", () => {
    validateField(
      input,
      input === inputBill ? errorMsgBill : errorMsgNumberOfPeople
    );
    tipCalculator();
  });
});

tipCalculator();
