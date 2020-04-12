// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variables and consts

// Elements
let moviePoster = document.getElementById('movie-poster');
let movieTitle = document.getElementById('movie-title');
let movieRuntime = document.getElementById('movie-runtime');
let movieGenre = document.getElementById('movie-genre');
let moviePlot = document.getElementById('movie-plot');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);
let currentMovie = JSON.parse(localStorage.selectMovie);

// Display movie info
const displayMovieInfo = () => {
	moviePoster.setAttribute('src', currentMovie.poster);
	movieTitle.innerText = currentMovie.title;
	movieRuntime.innerText = currentMovie.runtime;
	movieGenre.innerText = currentMovie.genre;
	moviePlot.innerText = currentMovie.plot;
};

// Display profile box
const displayProfile = () => {
	let profileBoxPhoto = document.getElementById('profile-box-photo');
	let profileBoxName = document.getElementById('profile-box-name');

	profileBoxPhoto.setAttribute('src', currentUser.avatar);
	profileBoxName.innerText = currentUser.name;
};

displayProfile();
displayMovieInfo();
