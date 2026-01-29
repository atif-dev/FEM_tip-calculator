let billErrorMsg = document.querySelector("#bill_error_msg");
let peopleErrorMsg = document.querySelector("#people_error_msg");
let billInput = document.querySelector("#bill_input");
let peopleInput = document.querySelector("#people_input");
let tipPerPerson = document.querySelector("#tip_per_person");
let billPerPerson = document.querySelector("#bill_per_person");
let customInput = document.querySelector("#custom_input");
let customInputMobile = document.querySelector("#custom_input_mobile");

let resetBtn = document.querySelector("#reset_btn");

const removeErrors = () =>{
  billErrorMsg.innerHTML = "";
  peopleErrorMsg.innerHTML = "";
  billInput.classList.remove("red-border");
  peopleInput.classList.remove("red-border");
 }

billInput.addEventListener("keypress", (event) => {
  // Allow only digits (0-9), decimal point (.), and backspace
  if (!/\d|\./.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault(); // Prevent invalid character insertion, including minus sign
  }
})

peopleInput.addEventListener("keypress", (event) => {
  // Allow only numbers and backspace, preventing negative sign and decimals
  if (/[^0-9\b]/.test(event.key)) {
    event.preventDefault();
  }
});

/*PC keyboard navigation calculation*/
customInput.addEventListener("keydown", (event) => {
  if(event.code === "Space" || event.code === "Enter"){
    calculateCustomTipAndTotalBill(customInput.value);
  }
})

/*PC runtime calculation*/
customInput.addEventListener("input", (event) => {
  let numValue = Number(customInput.value);
  calculateCustomTipAndTotalBill(numValue);
})

customInput.addEventListener("click", (event) => {
  calculateCustomTipAndTotalBill(customInput.value);
})

/*Mobile touch calculation*/
customInputMobile.addEventListener("click", (event) => {
  calculateCustomTipAndTotalBill(customInputMobile.value);
})

/*Mobile runtime calculation*/
customInputMobile.addEventListener("input", (event) => {
  calculateCustomTipAndTotalBill(customInputMobile.value);
})

resetBtn.addEventListener("click", (event) => {
  reset();
})

const reset = () => {
  resetBtn.classList.add("btn-active");
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  customInputMobile.value = "";
  tipPerPerson.innerHTML = `$0.00`;
  billPerPerson.innerHTML = `$0.00`;
};

const calculateCustomTipAndTotalBill = (customTip) => {
  resetBtn.classList.remove("btn-active");
  if(Number(customTip) === 0 || Number(customTip) < 0){
    return;
  }

  if(billInput.value === "" && peopleInput.value === ""){
    billErrorMsg.innerHTML = "Please Enter Bill Amount";
    peopleErrorMsg.innerHTML = "Can\'t be empty";
    billInput.classList.add("red-border");
    peopleInput.classList.add("red-border");
  }
  else if(Number(billInput.value) === 0 && Number(peopleInput.value) === 0){
    billErrorMsg.innerHTML = "Please Enter Valid Amount";
    peopleErrorMsg.innerHTML = "Can\'t be zero";  
  }else{
    if(billInput.value === ""){
      billErrorMsg.innerHTML = "Please Enter Bill Amount";
      billInput.classList.add("red-border");
    }else if(Number(billInput.value) === 0){
      billErrorMsg.innerHTML = "Please Enter Valid Amount";
      billInput.classList.add("red-border");
    }
    else if(peopleInput.value === ""){
      peopleErrorMsg.innerHTML = "Can\'t be empty";
      peopleInput.classList.add("red-border");
    }
    else if(Number(peopleInput.value) === 0){
      peopleErrorMsg.innerHTML = "Can\'t be zero";
      peopleInput.classList.add("red-border");
    }else{
      removeErrors();

      let people = Number(peopleInput.value);
      let bill = Number(billInput.value);
      const customTipAmountPerPerson = (bill * customTip / 100) / people;
      let billAmountPerPerson = ((bill / people) + customTipAmountPerPerson).toFixed(2);
      tipPerPerson.innerHTML = `$${customTipAmountPerPerson.toFixed(2)}`;
      billPerPerson.innerHTML = `$${billAmountPerPerson}`;  
    }
  }
}

const calculateTip = (tip) => {
  resetBtn.classList.remove("btn-active");
  if(billInput.value === "" && peopleInput.value === ""){
    billErrorMsg.innerHTML = "Please Enter Bill Amount";
    peopleErrorMsg.innerHTML = "Can\'t be empty";
    billInput.classList.add("red-border");
    peopleInput.classList.add("red-border");
  }
  else if(Number(billInput.value) === 0 && Number(peopleInput.value) === 0){
    billErrorMsg.innerHTML = "Please Enter Valid Amount";
    peopleErrorMsg.innerHTML = "Can\'t be zero";
    billInput.classList.add("red-border");
    peopleInput.classList.add("red-border");  
  }else{
    if(billInput.value === ""){
      billErrorMsg.innerHTML = "Please Enter Bill Amount";
      billInput.classList.add("red-border");
    }else if(Number(billInput.value) === 0){
      billErrorMsg.innerHTML = "Please Enter Valid Amount";
      billInput.classList.add("red-border");
    }
    else if(peopleInput.value === ""){
      peopleErrorMsg.innerHTML = "Can\'t be empty";
      peopleInput.classList.add("red-border");
    }
    else if(Number(peopleInput.value) === 0){
      peopleErrorMsg.innerHTML = "Can\'t be zero";
      peopleInput.classList.add("red-border");
    }else{
      removeErrors();

      let people = Number(peopleInput.value);
      let bill = Number(billInput.value);
      let tipAmountPerPerson = (bill * tip / 100) / people;
      tipAmountPerPerson = tipAmountPerPerson.toFixed(2);
      let billAmountPerPerson = (((bill/people) + Number(tipAmountPerPerson)).toFixed(2));
      tipPerPerson.innerHTML = `$${tipAmountPerPerson}`;
      billPerPerson.innerHTML = `$${billAmountPerPerson}`;
    }
  }
};

let tipButtons = document.querySelectorAll("[data-tip-value]");
tipButtons.forEach(btn => {
  let tip = Number(btn.getAttribute("data-tip-value"));
  btn.addEventListener("click", (event) => {
    calculateTip(tip);
  });
});