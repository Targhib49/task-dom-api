// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global Variable and Consts
let mockMovies = [];

// Elements
let moviePoster = document.getElementById('movie-poster');
let movieTitle = document.getElementById('movie-title');
let movieRuntime = document.getElementById('movie-runtime');
let movieGenre = document.getElementById('movie-genre');
let moviePlot = document.getElementById('movie-plot');
const signOut = document.getElementById('sign-out');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);
let currMovie = JSON.parse(localStorage.selectMovie);

// Display movie info
const displayMovieInfo = () => {
	moviePoster.setAttribute('src', currMovie.poster);
	movieTitle.innerText = currMovie.title;
	movieRuntime.innerText = currMovie.runtime;
	movieGenre.innerText = currMovie.genre;
	moviePlot.innerText = currMovie.plot;
};

// Display profile box
const displayProfile = () => {
	let profileBoxPhoto = document.getElementById('profile-box-photo');
	let profileBoxName = document.getElementById('profile-box-name');

	profileBoxPhoto.setAttribute('src', currentUser.avatar);
	profileBoxName.innerText = currentUser.name;
};

// Get mock Movie data
const getMockMovies = async () => {
	let urlMovie = `https://5e8ee187fe7f2a00165eead7.mockapi.io/users/${currentUser.id}/movies`;
	let temp;
	const response = await fetch(urlMovie);
	const result = await response.json();

	result.forEach((movie) => {
		mockMovies.push(movie);
	});
	console.log(mockMovies);

	for (let i = 0; i < mockMovies.length; i++) {
		if (currMovie.id == mockMovies[i].idIMDb) {
			temp = mockMovies[i].id;
		}
	}
	console.log(temp);
	console.log(currentUser);

	for (let i = 0; i < mockMovies.length; i++) {
		if (currMovie.id == currentUser.movieData[i].idIMDb) {
			currentUser.movieData[i].id = temp;
		}
	}

	localStorage.setItem('userLogin', JSON.stringify(currentUser));
	displayProfile();
	displayMovieInfo();
};

// Get user review and rating data

// Mark as favorite

// Logout
const logout = (event) => {
	event.preventDefault();
	localStorage.setItem('isLoginRYMIB', false);
	localStorage.removeItem('userLogin');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
getMockMovies();

//Listeners
signOut.addEventListener('click', logout);

// 1. Get current user and selected movie data from local storage
// 2. Get new movie data from mockAPI for the current user
// 3. Get all rating and review data from mockAPI movie
// 4. Update local storage with new data from number 2
// 5. Display movie info and profile box, don't forget logout!!
// 6. Function mark as favorite
