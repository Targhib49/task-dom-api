// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variable and constant
let moviesList = [
	'Black panther',
	'Doctor strange',
	'Aladdin',
	'Big Hero 6',
	'The maze runner',
	'Ready player one',
	'the lorax',
	'joker',
	'up',
	'A star is born',
	'Sonic the hedgehog',
	'Sing',
	'Coco',
	'Hercules',
	'The greatest showman'
];
let omdbData = [];
let currentPage = 1;

// Element
const signOut = document.getElementById('sign-out');
let moviesScreen = document.getElementById('movies-screen');
let secondRowScreen = document.getElementById('second-row-screen');
let paging = document.getElementById('paging');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);

// Display Movies
const displayMovies = (items, wrapper, rows_per_page, page) => {
	wrapper.innerHTML = '';
	page--;

	let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = items.slice(start, end);

	for (let i = 0; i < paginatedItems.length; i++) {
		wrapper.innerHTML += `<div class="col-2 card"><div class="card-body"><a href="moviesInfo.html">
        <img src="${paginatedItems[i].poster}" alt="poster">
        <p class="card-text text-center pt-1">${paginatedItems[i].title}</p></a></div></div>`;
	}
};

// Paginating
const paginatingSetup = () => {
	let pageNumber = Math.ceil(omdbData.length / 12);
	let display = '';
	for (let i = 1; i < pageNumber + 1; i++) {
		display += `<li id="box-${i}" class="page-item"><a id="page-${i}" class="my-box page-link" href="">${i}</a></li>`;
	}
	paging.innerHTML = display;
	document.getElementById('box-1').classList.add('active');
};

const paginating = (event) => {
	if (event.target.matches('.my-box')) {
		event.preventDefault();
		let prevPage = currentPage;
		currentPage = event.target.id.replace('page-', '');
		document.getElementById(`box-${prevPage}`).classList.remove('active');
		document.getElementById(`box-${currentPage}`).classList.add('active');
	}
	displayMovies(omdbData, moviesScreen, 12, currentPage);
};

// Connect to omdb API
const getomdbData = async () => {
	for (let i = 0; i < moviesList.length; i++) {
		const response = await fetch(`http://www.omdbapi.com/?apikey=7c646784&t=${moviesList[i]}`);
		const result = await response.json();
		let tempObj = {
			title: result.Title,
			poster: result.Poster,
			plot: result.Plot,
			runtime: result.Runtime,
			genre: result.Genre,
			ratings: result.Ratings
		};
		omdbData.push(tempObj);
	}

	displayMovies(omdbData, moviesScreen, 12, 1);
	paginatingSetup();
};

// Display profile box
const displayProfile = () => {
	let profileBoxPhoto = document.getElementById('profile-box-photo');
	let profileBoxName = document.getElementById('profile-box-name');

	profileBoxPhoto.setAttribute('src', currentUser.avatar);
	profileBoxName.innerText = currentUser.name;

	const compare = './assets/images/pngwave.png';
	let photoAttribute = profileBoxPhoto.getAttribute('src');

	// Check avatar
	if (photoAttribute == compare) {
		let r = confirm("You haven't change your avatar\n Do you want to change it now?");
		if (r == true) {
			window.location.href = `${window.origin}/userProfile.html`;
		}
	}
};

// Search Movies

// Logout
const logout = (event) => {
	event.preventDefault();
	localStorage.setItem('isLoginRYMIB', false);
	localStorage.removeItem('userLogin');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
getomdbData();
displayProfile();

// Listeners
signOut.addEventListener('click', logout);
paging.addEventListener('click', paginating);
