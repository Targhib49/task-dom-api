// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variables and consts
const urlUser = 'https://5e8ee187fe7f2a00165eead7.mockapi.io/users';

// Elements
const signOut = document.getElementById('sign-out');
const saveAvatar = document.getElementById('save-avatar');
const saveChanges = document.getElementById('save-changes');
let profileName = document.getElementById('profile-name');
let profileEmail = document.getElementById('profile-email');
let profilePassword = document.getElementById('profile-password');
let buttons = document.getElementById('buttons');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);

// Display profile box
const displayProfileBox = () => {
	let profileBoxPhoto = document.getElementById('profile-box-photo');
	profileBoxPhoto.setAttribute('src', currentUser.avatar);
};

// Display profile info
const displayProfileInfo = () => {
	profileName.setAttribute('placeholder', currentUser.name);
	profileEmail.setAttribute('placeholder', currentUser.email);
	profilePassword.setAttribute('value', currentUser.password);
};

// Display favorite movies
const displayFavoriteMovies = () => {
	let profileFavoriteBox = document.getElementById('profile-favorite-box');

	let isMarkedEmpty = true;
	let markedMovie = [];
	for (let i = 0; i < currentUser.movieData.length; i++) {
		if (currentUser.movieData[i].marked == true) {
			isMarkedEmpty = false;
			let tempObj = {
				title: currentUser.movieData[i].title,
				poster: currentUser.movieData[i].poster
			};
			markedMovie.push(tempObj);
		}
	}

	if (!isMarkedEmpty) {
		let display;
		for (let i = 0; i < 3; i++) {
			let id = Math.floor(Math.random() * markedMovie.length);
			display = `<div id="movie-${i}" class="col-3 card"><img src="${markedMovie[id]
				.poster}" class="img-fluid" alt="poster">
            <p class="card-text text-center pt-1">${markedMovie[id].title}</p></div>`;
		}
		profileFavoriteBox.innerHTML = display;
	} else {
		let display = `<div class="row pt-2 user-review pb-1"><div class="col"><p>You haven't marked any movies as your favorite yet</p></div></div>`;
		profileFavoriteBox.innerHTML = display;
	}
};

// Display movies review
const displayMoviesReview = () => {
	let profileReviewBox = document.getElementById('profile-review-box');

	let isReviewEmpty = true;
	let movieReview = [];
	for (let i = 0; i < currentUser.movieData.length; i++) {
		if (currentUser.movieData[i].review != null) {
			isReviewEmpty = false;
			let tempObj = {
				title: currentUser.movieData[i].title,
				review: currentUser.movieData[i].review
			};
			movieReview.push(tempObj);
		}
	}

	if (!isReviewEmpty) {
		let display = '';
		for (let i = 0; i < 2; i++) {
			let id = Math.floor(Math.random() * movieReview.length);
			display = `<div id="row-${i}" class="row pt-2 user-review pb-1"><div class="col-4"><span class="h6">${movieReview[
				id
			].title}</span></div><div class="col-8"><span class="h6">${movieReview[id].review}</span></div>`;
		}
		profileReviewBox.innerHTML = display;
	} else {
		let display = `<div class="row pt-2 user-review pt-3"><div class="col text-center"><p>You haven't review any movies yet</p></div></div>`;
		profileReviewBox.innerHTML = display;
	}
};

// Edit Profile
const buttonsEvent = (event) => {
	if (event.target.matches('.old-button')) {
		if (event.target.id == 'edit-profile') {
			event.preventDefault();

			buttons.innerHTML = `<a id="change-avatar" class="new-button" data-toggle="modal" data-target="#file-input" href="">Change Avatar</a><br>
			<a id="save-profile" class="new-button" data-toggle="modal" data-target="#data-changes" href="">Save profile</a><br>
			<a id="cancel" class="new-button" href="">Cancel</a>`;

			profileName.removeAttribute('readonly');
			profileName.setAttribute('placeholder', '');
			profileName.setAttribute('value', currentUser.name);

			profileEmail.removeAttribute('readonly');
			profileEmail.setAttribute('placeholder', '');
			profileEmail.setAttribute('value', currentUser.email);

			profilePassword.removeAttribute('readonly');
			profilePassword.setAttribute('placeholder', '');
			profilePassword.setAttribute('value', currentUser.password);
		}
	}

	if (event.target.matches('.new-button')) {
		if (event.target.id == 'save-profile') {
		} else if (event.target.id == 'cancel') {
			event.preventDefault();
			location.reload();
		}
	}
};

// Save avatar
const saveAvatarChange = async (event) => {
	let id = currentUser.id;
	let inputLink = document.getElementById('input-link').value;
	let value = '';

	if (inputLink) {
		value = inputLink;
	}

	const response = await fetch(`${urlUser}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ avatar: value })
	});

	await response.json();
	currentUser.avatar = value;

	localStorage.setItem('userLogin', JSON.stringify(currentUser));
	location.reload();
};

// Save data change
const saveDataChange = async (event) => {
	let id = currentUser.id;
	let newName = profileName.value;
	let newEmail = profileEmail.value;
	let newPassword = profilePassword.value;

	const response = await fetch(`${urlUser}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name: newName, email: newEmail, password: newPassword })
	});

	await response.json();
	currentUser.name = newName;
	currentUser.email = newEmail;
	currentUser.password = newPassword;

	localStorage.setItem('userLogin', JSON.stringify(currentUser));
	location.reload();
};

// Logout
const logout = (event) => {
	event.preventDefault();
	localStorage.setItem('isLoginRYMIB', false);
	localStorage.removeItem('userLogin');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
displayProfileBox();
displayProfileInfo();
displayFavoriteMovies();
displayMoviesReview();

// Listeners
signOut.addEventListener('click', logout);
buttons.addEventListener('click', buttonsEvent);
saveAvatar.addEventListener('click', saveAvatarChange);
saveChanges.addEventListener('click', saveDataChange);
