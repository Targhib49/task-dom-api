// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variable and consts
let movieData = [];

// Element
const signOut = document.getElementById('sign-out');
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const imdbRating = document.getElementById('imdb-rating');
const rotTomatoes = document.getElementById('rot-tomatoes');
const metaScore = document.getElementById('meta-score');
const ratingGroup = document.getElementById('rating-group');
const scorePlaceholder = document.getElementById('score-placeholder');
const otherUserReview = document.getElementById('other-user-review');

// Get local storage data
let currentUser = JSON.parse(localStorage.userLogin);
let currMovie = JSON.parse(localStorage.selectMovie);
let userName = JSON.parse(localStorage.userName);
let allMovieData = JSON.parse(localStorage.allMovieData);

// Average ratings
const rating = () => {
	let movieScore = 0;
	let userCount = 0;
	for (let i = 0; i < allMovieData.length; i++) {
		if (allMovieData[i].idIMDb == currMovie.id) {
			movieScore += Number(allMovieData[i].rating);
			userCount++;
		}
	}
	if (userCount != 0) {
		let average = Math.round(movieScore / userCount);
		scorePlaceholder.innerHTML = `<div class="col-5">
										<span class="h6">Average user rating score:</span>
									</div>
									<div class="col-3">
										<span class="h6">${average}/10</span>
									</div>
									<div class="col-4">
										<span class="h6">From ${userCount} user</span>
									</div>`;
	} else {
		scorePlaceholder.innerHTML = `<div class="col-5">
										<span class="h6">Average user rating score:</span>
									</div>
									<div class="col-7>
										<span class="h6">No user has given rating for this movie yet</span>
									</div>`;
	}
};

// Display other user review
const review = () => {
	let movieReview = [];
	for (let i = 0; i < allMovieData.length; i++) {
		if (allMovieData[i].idIMDb == currMovie.id) {
			let temp = {
				id: allMovieData[i].userId,
				review: allMovieData[i].review
			};
			movieReview.push(temp);
		}
	}

	if (movieReview.length != 0) {
		let display = '';
		let count;
		if (movieReview.length > 3) {
			count = 3;
		} else {
			count = movieReview.length;
		}
		for (let i = 0; i < count; i++) {
			let id = Math.floor(Math.random() * movieReview.length);
			for (let j = 0; j < userName.length; j++) {
				if (userName[j].id == movieReview[id].id) {
					display += `<div class="row pt-2 user-review pb-1">
							<div class="col-4">
								<span class="h6">${userName[j].name}</span>
							</div>
							<div class="col-8">
								<span class="h6">${movieReview[id].review}</span>
							</div>
						</div>`;
					movieReview.splice(id, 1);
				}
			}
		}
		otherUserReview.innerHTML = display;
	} else {
		let display = `<div class="row pt-2 user-review pt-3"><div class="col text-center"><p>No user has review this movie yet</p></div></div>`;
		otherUserReview.innerHTML = display;
	}
};

// Get all movie data from mockAPI
// const getMovieData = async () => {
// 	for (let i = 1; i < countUsers + 1; i++) {
// 		let urlMovie = `https://5e8ee187fe7f2a00165eead7.mockapi.io/users/${i}/movies`;
// 		const response = await fetch(urlMovie);
// 		const result = await response.json();

// 		result.forEach((movie) => {
// 			movieData.push(movie);
// 		});
// 	}

// };

// Display movie info
const displayMovieInfo = () => {
	moviePoster.setAttribute('src', currMovie.poster);
	movieTitle.innerText = currMovie.title;
	for (let i = 0; i < currMovie.ratings.length; i++) {
		ratingGroup.innerHTML += `<div class="row py-1">
									<div class="col-6 text-left">
										<span class="critics">${currMovie.ratings[i].Source}</span>
									</div>
									<div class="col-1 text-center align-self-center">
										<span>:</span>
									</div>
									<div class="col-4 text-left align-self-center">
										<span id="imdb-rating" class="critics-value">${currMovie.ratings[i].Value}</span>
									</div>
								</div>`;
	}
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
	localStorage.removeItem('selectMovie');
	localStorage.removeItem('userName');
	localStorage.removeItem('allMovieData');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
displayMovieInfo();
displayProfile();
// getMovieData();
rating();
review();

// Listeners
signOut.addEventListener('click', logout);
