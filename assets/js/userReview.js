// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Element
let moviePoster = document.getElementById('movie-poster');
let movieTitle = document.getElementById('movie-title');
let textReview = document.getElementById('text-review');
let ratingStar = document.getElementById('rating-star');
let editReview = document.getElementById('edit-review');
let labelNot = document.getElementById('label-not');
let buttonGroup = document.getElementById('button-group');
const signOut = document.getElementById('sign-out');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);
let currMovie = JSON.parse(localStorage.selectMovie);

// Display movie info
const displayMovieInfo = () => {
	moviePoster.setAttribute('src', currMovie.poster);
	movieTitle.innerText = currMovie.title;
};

// Display previous rating and review
const displayPrev = () => {
	let userRating;
	let userReview;

	for (let i = 0; i < currentUser.movieData.length; i++) {
		if (currentUser.movieData[i].idIMDb == currMovie.id) {
			userRating = currentUser.movieData[i].rating;
			userReview = currentUser.movieData[i].review;
		}
	}

	if (userRating != 0) {
		for (let i = 0; i < 10; i++) {
			if (ratingStar[i].value == userRating) {
				ratingStar[i].checked = true;
			}
		}
	} else {
		labelNot.innerHTML = `<p>You haven't rate this movie yet</p>`;
	}

	if (userReview != '') {
		textReview.setAttribute('placeholder', userReview);
	} else {
		textReview.setAttribute('placeholder', "You haven't review this movie yet");
	}
};

// Edit rating and review
const edit = async (event) => {
	if (event.target.matches('.old-button')) {
		labelNot.innerHTML = '';
		for (let i = 0; i < 10; i++) {
			document.getElementById(`star${i + 1}`).disabled = false;
		}
		prevVal = textReview.placeholder;
		if (prevVal != "You haven't review this movie yet") {
			textReview.value = prevVal;
		} else {
			textReview.setAttribute('placeholder', 'Write your review here');
		}

		textReview.removeAttribute('readonly');

		buttonGroup.innerHTML = `<button id="cancel" type="submit" class="btn btn-primary new-button">Cancel</button>
        <button id="submit-review" type="submit" class="btn btn-primary new-button">Submit Review</button>`;
	} else if (event.target.matches('.new-button')) {
		if (event.target.id == 'cancel') {
			event.preventDefault();
			location.reload();
		} else if (event.target.id == 'submit-review') {
			let movieId;
			for (let i = 0; i < currentUser.movieData.length; i++) {
				if (currentUser.movieData[i].idIMDb == currMovie.id) {
					movieId = currentUser.movieData[i].id;
				}
			}

			let urlMovie = `https://5e8ee187fe7f2a00165eead7.mockapi.io/users/${currentUser.id}/movies/${movieId}`;
			let newRating;
			let newReview = textReview.value;
			for (let i = 0; i < 10; i++) {
				if (ratingStar[i].checked) {
					newRating = ratingStar[i].value;
				}
			}

			const response = await fetch(urlMovie, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rating: newRating, review: newReview })
			});

			await response.json();

			if (newRating || newReview) {
				for (let i = 0; i < currentUser.movieData.length; i++) {
					if (currentUser.movieData[i].idIMDb == currMovie.id) {
						currentUser.movieData[i].rating = newRating;
						currentUser.movieData[i].review = newReview;
					}
				}
				localStorage.setItem('userLogin', JSON.stringify(currentUser));
			} else {
				alert("Review and rating can't be empty");
			}
			location.reload();
		}
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
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
displayProfile();
displayMovieInfo();
displayPrev();

// Listeners
buttonGroup.addEventListener('click', edit);
signOut.addEventListener('click', logout);
