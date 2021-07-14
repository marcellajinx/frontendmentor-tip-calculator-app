let inputs_num = document.querySelectorAll("input[type='number']");
let inputs_btn = document.querySelectorAll("button");
let tipPercentInput = 0;

inputs_num.forEach(function(input_num){
    input_num.addEventListener("input", calculateTip);
});

const billInput = document.getElementById("bill");
billInput.addEventListener("change", calculateTip);

const peopleInput = document.getElementById("people");
peopleInput.addEventListener("change", calculateTip);

inputs_btn.forEach((input_btn) => {
    input_btn.addEventListener("click", () => {
        if (!input_btn.classList.contains("pertip--active")) {
            inputs_btn.forEach((button) => {
                button.classList.remove("pertip--active");
            });
            input_btn.classList.add("pertip--active");
            tipPercentInput = input_btn.getAttribute("data-value");
        } else {
            input_btn.classList.remove("pertip--active");
            tipPercentInput = 1;
        }
        calculateTip();
    });
});

function calculateTip() {
    let bill = parseFloat(billInput.value);
    let people = parseFloat(peopleInput.value);
    let tipPercent = tipPercentInput;
    let tipPercentCustom = parseFloat(document.getElementById("pertipc").value);


    if (tipPercentCustom !== '' && !isNaN(tipPercentCustom)) {
        tipPercent = tipPercentCustom;
    }

    console.log(tipPercentCustom)
    if (tipPercentCustom!=='NaN' && tipPercentInput!==0) {
        document.getElementById("pertipc").value = '';
    }

    let totalTip = parseFloat((bill * (tipPercent/100)).toFixed(2))
    let total = parseFloat((bill + totalTip).toFixed(2));

    let totalTip_person = (totalTip / people).toFixed(2);
    let total_person = (total/people).toFixed(2);

    if (people <= 0) {
        document.getElementById("people-err").classList.add("active");
        document.getElementById("people").classList.add("active");
    } 
    else if (people > 0 && !isNaN(people)) {
        document.getElementById("tip_per").innerHTML = `$${totalTip_person}`;
        document.getElementById("total_per").innerHTML = `$${total_person}`; 
    }
    else {
        document.getElementById("people-err").classList.remove("active");
        document.getElementById("people").classList.remove("active");
    }
}

function reset() {
    document.getElementById("people").value = '';
    document.getElementById("bill").value = '';
    document.getElementById("tip_per").innerHTML = "$0.00";
    document.getElementById("total_per").innerHTML = "$0.00";
    document.getElementById("pertipc").value = '';
}