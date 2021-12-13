const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const wealthBtn = document.getElementById('calculate-wealth');

getRandomUser();
getRandomUser();
getRandomUser();

let data = [];

//Fetch random user & add money
async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api/');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	};

	addData(newUser);
}

//Double Money
function doubleMoney() {
	data = data.map((user) => {
		return {...user, money: user.money * 2}
	});
	updateDOM();
}

//Filter only Millionaires
function showMillionaries() {
	data = data.filter((user) => user.money > 1000000);
	updateDOM();
}

//Sort by richest
function sortByRichest() {
	data.sort((a,b) => b.money - a.money);
	updateDOM();
}

//Calculate wealth
function calculateWealth() {
	const wealth = data.reduce((acc, user) => (acc +=user.money), 0);
	const wealthEl = document.createElement('div');
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
	main.appendChild(wealthEl);
}

//Add new object to data array
function addData(obj) {
	data.push(obj);
	updateDOM();
}

//Update DOM
function updateDOM(provideData = data) {
	//clear main div
	main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

	provideData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}

//Format number as money
function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67

}

//Event listener
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionaireBtn.addEventListener('click', showMillionaries);
sortBtn.addEventListener('click', sortByRichest);
wealthBtn.addEventListener('click', calculateWealth);