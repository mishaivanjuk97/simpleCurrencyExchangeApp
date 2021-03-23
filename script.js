const firstSelect = document.querySelector('#firstSelect');
const secondSelect = document.querySelector('#secondSelect');
const swapBtn = document.querySelector('#swapBtn');
const amount = document.querySelector('#amount');
const currencyCourse = document.querySelector('#currencyCourse');
const result = document.querySelector('#result');

const apiKey = 'd419a245fdd645471d272f08';

(async function setFrirstSelect() {
   const response = await fetch('https://openexchangerates.org/api/currencies.json');
   const data = await response.json();
   const codes = Object.keys(data)

   codes.forEach((code) => {
      const option = document.createElement('option');

      option.textContent = code;

      firstSelect.appendChild(option);
   })
})();

(async function setSecondSelect() {
   const response = await fetch('https://openexchangerates.org/api/currencies.json');
   const data = await response.json();
   const codes = Object.keys(data)

   codes.forEach((code) => {
      const option = document.createElement('option');

      option.textContent = code;
      
      secondSelect.appendChild(option);
   })
})();

async function exchange() {
   const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${firstSelect.value}`);
   const data = await response.json();
   const rate = data.conversion_rates[secondSelect.value];

   currencyCourse.textContent = `1 ${firstSelect.value} is ${rate} ${secondSelect.value}`

   result.value = (amount.value * rate).toFixed(4);   
}

function swapSelects() {
   const swapped = firstSelect.value;

   firstSelect.value = secondSelect.value;
   secondSelect.value = swapped;
   // or
   // [firstSelect.value, secondSelect.value] = [secondSelect.value, firstSelect.value]

   exchange();
}

firstSelect.addEventListener('change', exchange);
secondSelect.addEventListener('change', exchange);
amount.addEventListener('input', exchange);
swapBtn.addEventListener('click', swapSelects);