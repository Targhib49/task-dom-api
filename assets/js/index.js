// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variable and constant
let moviesList = [
	'Iron man',
	'The incredible hulk',
	'Iron man 2',
	'Thor',
	'Captain america: The first Avenger',
	'The Avengers',
	'Wall-e',
	'Sonic the hedgehog',
	'Dolittle',
	'Up',
	'Ratatouille',
	'Despicable me',

	'The incredibles',
	'Tron: legacy',
	'Terminator: dark fate',
	'Terminator Genisys',
	'Terminator salvation',
	'Terminator 3: Rise of the machines',
	'Terminator 2: Judgment day',
	'The terminator',
	'The maze runner',
	'Maze runner: the scorch trials',
	'Maze runner: the death cure',
	'How to train your dragon',

	'How to train your dragon 2'
	// 'How to train your dragon: the hidden world',
	// 'Interstellar',
	// 'A star is born',
	// 'The greatest showman',
	// 'Ready player one',
	// 'Bad boy',
	// 'Avatar',
	// 'Aquaman',
	// 'Joker',
	// 'Gladiator',
	// '300',

	// 'Captain america: civil war',
	// 'Doctor strange',
	// 'Guardians of the galaxy vol. 2',
	// 'Spider-man: homecoming',
	// 'Thor: Ragnarok',
	// 'Black panther',
	// 'Avengers: infinity war',
	// 'Ant-man and the wasp',
	// 'Captain marvel',
	// 'Avengers: endgame',
	// 'Spider-man: far from home',
	// 'Finding nemo',

	// 'Finding dory',
	// 'Coco',
	// 'Brave',
	// 'Moana',
	// 'Tangled',
	// 'Aladdin',
	// 'Beauty and the beast'
];
let omdbData = [];
let currentPage = 1;

// Element
const signOut = document.getElementById('sign-out');
let moviesScreen = document.getElementById('movies-screen');
let secondRowScreen = document.getElementById('second-row-screen');
let paging = document.getElementById('paging');
let searchForm = document.getElementById('search-form');

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
		if (paginatedItems[i].poster == 'N/A') {
			paginatedItems[i].poster = './assets/images/no-image-available-png-3.png';
		}
		wrapper.innerHTML += `<div class="col-2 card text-center py-2"><a id="${paginatedItems[i]
			.imdbId}" class="myMovies" href="moviesInfo.html">
                              <img class="img-fluid" src="${paginatedItems[i].poster}" alt="poster">
                              <p class="card-text text-center pt-1">${paginatedItems[i].title}</p></a></div>`;
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
		let moviesTitle = encodeURI(moviesList[i]);
		const response = await fetch(`http://www.omdbapi.com/?apikey=7c646784&t=${moviesTitle}`);
		const result = await response.json();
		let tempObj = {
			title: result.Title,
			poster: result.Poster,
			plot: result.Plot,
			runtime: result.Runtime,
			genre: result.Genre,
			ratings: result.Ratings,
			imdbId: result.imdbID
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
const searchMovies = () => {
	const inputSearch = searchForm.value.toLowerCase();

	const filterMovies = omdbData.filter((element) => {
		if (element.title.toLowerCase().includes(inputSearch)) {
			return element;
		}
	});

	if (filterMovies.length != 0) {
		displayMovies(filterMovies, moviesScreen, 12, 1);
	} else {
		paging.innerHTML = '';
		moviesScreen.innerHTML = `<div class="col p-3"><span class="h4">No movies matched with your key</span></div>`;
	}
};

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
searchForm.addEventListener('keyup', searchMovies);
