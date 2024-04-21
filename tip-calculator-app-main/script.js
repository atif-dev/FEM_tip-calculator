const billAmount = document.querySelector(".bill-input");
const totalPeople = document.querySelector(".tpeople");

const tipValue1 = document.querySelector(".tip-value1");
const tipValue2 = document.querySelector(".tip-value2");
const customInput = document.querySelector(".custom-input");
const errorMsg = document.querySelector(".error-msg");
const tpeopleInput = document.querySelector(".tpeople");
const tipAmount = document.querySelector(".tip-amount");
const totalBill = document.querySelector(".total-amount");
const resetButton = document.querySelector(".reset-btn");


billAmount.addEventListener("keypress", function(event) {
  // Allow only digits (0-9), decimal point (.), and backspace
  if (!/\d|\./.test(event.key) && event.key !== "Backspace") {
    event.preventDefault(); // Prevent invalid character insertion, including minus sign
  }
});

// Event listeners for focus and blur
const addFocusBlurListeners = (inputElement) => {
  inputElement.addEventListener("focus", function() {
    setColAndHidePlacHolder(this);
    this.style.fontWeight = 700;
  });

  inputElement.addEventListener("blur", function() {
    setColAndHidePlacHolder(this);
  });
};

addFocusBlurListeners(billAmount);
addFocusBlurListeners(totalPeople);

//Capture bill and total people values
var billValue = 0;
billAmount.addEventListener("input", function(event) {
    const typedValue = event.target.value;
    console.log("Typed value:", typedValue);
    billValue = typedValue;
  });

var totalPeopleValue = 0;
totalPeople.addEventListener("input", function(event) {
    const typedPeopleValue = event.target.value;
    console.log("Typed people value:", typedPeopleValue);
    totalPeopleValue = typedPeopleValue;
});

customInput.addEventListener("click", function() {
    resetTipAndBill();
  });

//calculate tip and total bill for custome input
customInput.addEventListener("keyup", () => {
  if(customInput.value == "")
        tipAmount.innerHTML = `$0.00`;
  if((customInput.value != "") && (Number(customInput.value) != 0)){
    if (tpeopleInput.value == 0 || tpeopleInput.value == "") {
      errorMsg.style.display = "block"; // Show error message
      totalPeople.style.border = "1.4px solid #DC7E64";
    }else{
      errorMsg.style.display = "none"; // Show error message
      totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
      console.log();
      let typedcustomInput = Number(customInput.value)/100;
      console.log(((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2))
      let customTip = ((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2)
      let tBillPerPerson = ((Number(billValue)/Number(totalPeopleValue))+Number(customTip)).toFixed(2);
      tipAmount.innerHTML = `$${customTip}`;
      totalBill.innerHTML = `$${tBillPerPerson}`;
    }
    
  }
});

resetButton.addEventListener("click", function() {
  resetTipAndBill();
});

tpeopleInput.addEventListener("keyup", function() {
  if(((customInput.value !== "" && customInput.value !== "0") && (billAmount.value !== "" && billAmount.value !== "0")) && (tpeopleInput.value !== "" && tpeopleInput.value !== "0")){
    errorMsg.style.display = "none"; 
    totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
    let typedcustomInput = Number(customInput.value)/100;
    console.log(((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2))
    let customTip = ((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2)
    let tBillPerPerson = ((Number(billValue)/Number(totalPeopleValue))+Number(customTip)).toFixed(2);
      tipAmount.innerHTML = `$${customTip}`;
      totalBill.innerHTML = `$${tBillPerPerson}`;

  }else{

    if(tpeopleInput.value === "0"){
      errorMsg.style.display = "block"; // Show error message
      totalPeople.style.border = "1.4px solid #DC7E64";
      return false;
    }

    errorMsg.style.display = "none"; 
    totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
   
    resetTipAndBill();
  }

});

const setColAndHidePlacHolder = (inputElement)=> {
  inputElement.style.color = "hsl(183, 100%, 15%)"; // Set text color on focus
  inputElement.style.placeholder = "transparent"; // Hide placeholder on focus
}

function calculateTip(element) {
  const tipPercentage = parseFloat(element.innerHTML);
  if (!isNaN(tipPercentage) && totalPeopleValue > 0) {
      const tipAmountPerPerson = (billValue * tipPercentage / 100) / totalPeopleValue;
      displayTipAndTotal(tipAmountPerPerson);
  }
}

function displayTipAndTotal(tipAmountPerPerson) {
  const totalAmountPerPerson = ((billValue / totalPeopleValue) + tipAmountPerPerson).toFixed(2);
  tipAmount.innerHTML = `$${tipAmountPerPerson.toFixed(2)}`;
  totalBill.innerHTML = `$${totalAmountPerPerson}`;
}

const resetTipAndBill = ()=> {
  tipAmount.innerHTML = `$0.00`;
  totalBill.innerHTML = `$0.00`;
}

// Event delegation for tip selection/calculation of desktop version and mobile.
document.querySelectorAll(".tip-value1 div, .tip-value2 div, .tip-value1_mobile div, .tip-value2_mobile div, .tip-value3_mobile div").forEach(child => {
  child.addEventListener("click", function() {
      calculateTip(child);
  });
});

// Event listeners for numeric inputs
const addNumericInputListeners = (inputElement) => {
  inputElement.addEventListener("keypress", function(event) {
      if (!/\d/.test(event.key) && event.key !== "Backspace") {
          event.preventDefault();
      }
  });
};

addNumericInputListeners(totalPeople);
addNumericInputListeners(customInput);

// ----Code for mobile version---- //
const tipValue1_Mobile = document.querySelector(".tip-value1_mobile");
const tipValue2_Mobile = document.querySelector(".tip-value2_mobile");
const tipValue3_Mobile = document.querySelector(".tip-value3_mobile");
const customInput_mobile = document.querySelector(".custom-input_mobile");

customInput_mobile.addEventListener("click", function() {
  resetTipAndBill();
});

//calculate tip and total bill for custome input
addNumericInputListeners(customInput_mobile);

customInput_mobile.addEventListener("keyup", () => {
if(customInput_mobile.value == "")
      tipAmount.innerHTML = `$0.00`;
if((customInput_mobile.value != "") && (Number(customInput_mobile.value) != 0)){
  if (tpeopleInput.value == 0 || tpeopleInput.value == "") {
    errorMsg.style.display = "block"; // Show error message
    totalPeople.style.border = "1.4px solid #DC7E64";
  }else{
    errorMsg.style.display = "none"; // Show error message
    totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
    console.log();
    let typedcustomInput = Number(customInput_mobile.value)/100;
    console.log(((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2))
    let customTip = ((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2)
    let tBillPerPerson = ((Number(billValue)/Number(totalPeopleValue))+Number(customTip)).toFixed(2);
    tipAmount.innerHTML = `$${customTip}`;
    totalBill.innerHTML = `$${tBillPerPerson}`;
  }
  
}
});

tpeopleInput.addEventListener("keyup", function() {
  if(((customInput_mobile.value !== "" && customInput_mobile.value !== "0") && (billAmount.value !== "" && billAmount.value !== "0")) && (tpeopleInput.value !== "" && tpeopleInput.value !== "0")){
    errorMsg.style.display = "none"; 
    totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
    let typedcustomInput = Number(customInput_mobile.value)/100;
    console.log(((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2))
    let customTip = ((Number(billValue)*typedcustomInput)/Number(totalPeopleValue)).toFixed(2)
    let tBillPerPerson = ((Number(billValue)/Number(totalPeopleValue))+Number(customTip)).toFixed(2);
      tipAmount.innerHTML = `$${customTip}`;
      totalBill.innerHTML = `$${tBillPerPerson}`;
      
  }else{

    if(tpeopleInput.value === "0"){
      errorMsg.style.display = "block"; // Show error message
      totalPeople.style.border = "1.4px solid #DC7E64";
      return false;
    }

    errorMsg.style.display = "none"; 
    totalPeople.style.border = "1.4px solid hsl(189, 41%, 97%)";
   
    resetTipAndBill();
  }

});



  