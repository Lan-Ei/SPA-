//Объект с курсами трех валют
const rates = {};

//Элементы для отображения курсов валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');
const elementBYN = document.querySelector('[data-value="BYN"]');

//Элементы формы, ввод суммы, вывод валюты, поле с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');

getCurrencies();
//функция получения курса валют и отображением их на странице

async function getCurrencies(){

    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.BYN = result.Valute.BYN;

    console.log(rates);

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    //Цвет для информера USD
    if (rates.USD.Value > rates.USD.Previous){
        elementUSD.classList.add('top');
    }
    else if (rates.USD.Value < rates.USD.Previous){
        elementUSD.classList.add('bottom');
    }

    //Цвет для информера EUR
    if (rates.EUR.Value > rates.EUR.Previous){
        elementEUR.classList.add('top');
    }
    else if (rates.EUR.Value < rates.EUR.Previous){
        elementEUR.classList.add('bottom');
    }

    //Цвет для информера GBP
    if (rates.GBP.Value > rates.GBP.Previous){
        elementGBP.classList.add('top');
    }
    else if (rates.GBP.Value > rates.GBP.Previous){
        elementGBP.classList.add('bottom');
    }
}

//слушаем изменения в ткстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;
select_input.oninput = convertValue;

//функция конвертации
function convertValue(){
    if (select_input.value == select.value){
        result.value = parseFloat(input.value);
    }
    else if (select_input.value == "RUB"){
        result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);
    }
    else if (select.value == "RUB"){
        result.value = (parseFloat(input.value) * rates[select_input.value].Value).toFixed(2);
    }
    else {
        result.value = (parseFloat(input.value) * (rates[select_input.value].Value / rates[select.value].Value).toFixed(2));
    }
    /*result.value = (parseFloat(input.value) / rates[select.value].Value).toFixed(2);*/

}