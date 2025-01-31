let to = "inr";
let from = "usd";
let countries = 0;
let val = document.querySelector("#result");
let amount = document.querySelector(".amnt");
let fromele = document.querySelector(".from");
let toele = document.querySelector(".to");

amount.select();
const list = async () => {
    let p = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
    );
    let countries = await p.json();
    let n = 0;
    for (ccode in countries) {
        if (countries[ccode] != "") {
            let optionsto = document.createElement("option");
            let optionsfrom = document.createElement("option");
            fromele.appendChild(optionsfrom);
            toele.appendChild(optionsto);
            optionsto.outerHTML = `<option class = ${ccode}>${countries[ccode]}</option>`;
            optionsfrom.outerHTML = `<option class = ${ccode}>${countries[ccode]}</option>`;
            n++;
        }
    }
};
list();

const conversionrate = async () => {
    let p = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
    );
    let resp = await p.json();
    return resp[from][to];
};

const action = async () => {
    from = fromele.options[fromele.selectedIndex].classList[0];
    to = toele.options[toele.selectedIndex].classList[0];
    let rate = await conversionrate();
    // console.log(rate)
    val.innerHTML = `${amount.value} ${from.toUpperCase()} = ${
        rate * amount.value
    } ${to.toUpperCase()}`;
    let result1 = parseFloat(rate) * parseFloat(amount.value);
    console.log(`${amount.value} ${from.toUpperCase()} = ${result1} ${to.toUpperCase()}`);
};

document.addEventListener("DOMContentLoaded", action);
amount.addEventListener("input", action);
let button = document.querySelector(".calc");
button.addEventListener("click", action);
