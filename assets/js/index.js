// Check login
let check = localStorage.getItem('isLoginRYMIB');

if (check != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}

//============================================================

// Global variable and constant

// Element
const signOut = document.getElementById('sign-out');

// Get data from local storage
let currentUser = JSON.parse(localStorage.userLogin);

// Connect to omdb API

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

// Logout
const logout = (event) => {
	event.preventDefault();
	localStorage.setItem('isLoginRYMIB', false);
	localStorage.removeItem('userLogin');
	window.location.href = `${window.origin}/welcome.html`;
};

// Initialization
displayProfile();

// Listeners
signOut.addEventListener('click', logout);
