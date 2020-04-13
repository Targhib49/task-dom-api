// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Element
const signOut = document.getElementById('sign-out');
const moviePoster = document.getElementById('movie-poster');
const imdbRating = document.getElementById('imdb-rating');
const rotTomatoes = document.getElementById('rot-tomatoes');
const metaScore = document.getElementById('meta-score');
const movieTitle = document.getElementById('movie-title');

// Get local storage data
let currentUser = JSON.parse(localStorage.userLogin);
let currMovie = JSON.parse(localStorage.selectMovie);

// Display movie info
const displayMovieInfo = () => {
	moviePoster.setAttribute('src', currMovie.poster);
	movieTitle.innerText = currMovie.title;
	imdbRating.innerText = currMovie.ratings[0].Value;
	rotTomatoes.innerText = currMovie.ratings[1].Value;
	metaScore.innerText = currMovie.ratings[2].Value;
};

// Display profile box
const displayProfile = () => {
	let profileBoxPhoto = document.getElementById('profile-box-photo');
	let profileBoxName = document.getElementById('profile-box-name');

	profileBoxPhoto.setAttribute('src', currentUser.avatar);
	profileBoxName.innerText = currentUser.name;
};

// Logout
const logout = (event) => {
	event.preventDefault();
	localStorage.setItem('isLoginRYMIB', false);
	localStorage.removeItem('userLogin');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
displayMovieInfo();
displayProfile();

// Listeners
signOut.addEventListener('click', logout);
