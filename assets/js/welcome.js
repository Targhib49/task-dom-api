// Animation
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('welcome-container');

signUpButton.addEventListener('click', () => {
	container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
	container.classList.remove('right-panel-active');
});

//==================================================================

// Global variable and constant
let userData = [];
let movieData = [];
let userName = [];
let allMovieData = [];
let countUsers = 0;
const urlUser = 'https://5e8ee187fe7f2a00165eead7.mockapi.io/users';

// Element
const userLogin = document.getElementById('user-login');
const userRegister = document.getElementById('user-register');
const signIn = document.getElementById('sign-in');
const signUp = document.getElementById('sign-up');

// Connect to mockAPI - user
const getUserData = async () => {
	const response = await fetch(urlUser);
	const result = await response.json();

	result.forEach((user) => {
		userData.push(user);
		let temp = {
			id: user.id,
			name: user.name
		};
		userName.push(temp);
	});

	countUsers = userData.length;
	localStorage.setItem('userName', JSON.stringify(userName));
	await getAllMovieData();
};

// Connect to mockAPI - movie
const getMovieData = async (id) => {
	let urlMovie = `https://5e8ee187fe7f2a00165eead7.mockapi.io/users/${id}/movies`;

	const response = await fetch(urlMovie);
	const result = await response.json();

	result.forEach((movie) => {
		movieData.push(movie);
	});
};

// Get all movie data from mockAPI
const getAllMovieData = async () => {
	for (let i = 1; i < countUsers + 1; i++) {
		let urlMovie = `https://5e8ee187fe7f2a00165eead7.mockapi.io/users/${i}/movies`;
		const response = await fetch(urlMovie);
		const result = await response.json();

		result.forEach((movie) => {
			allMovieData.push(movie);
		});
	}
	localStorage.setItem('allMovieData', JSON.stringify(allMovieData));

	if (allMovieData.length != 0) {
		signIn.removeAttribute('disabled');
		signUp.removeAttribute('disabled');
	}
};

// Sign in
const login = async (event) => {
	event.preventDefault();
	let loginSuccess = false;

	const email = document.getElementById('logEmail').value.toLowerCase();
	const password = document.getElementById('logPassword').value;

	if (userData.length != 0) {
		for (let i = 0; i < userData.length; i++) {
			if (userData[i].email.toLowerCase() == email && userData[i].password == password) {
				let id = userData[i].id;
				let name = userData[i].name;
				let avatar = userData[i].avatar;
				await getMovieData(id);

				let userLogin = {
					id,
					name,
					email,
					password,
					avatar,
					movieData
				};

				console.log(userLogin.userMovie);
				localStorage.setItem('isLoginRYMIB', true);
				localStorage.setItem('userLogin', JSON.stringify(userLogin));
				loginSuccess = true;
			}
		}

		if (loginSuccess) {
			window.location.href = `${window.origin}/index.html`;
		} else {
			alert("Oops, your email and password didn't match");
		}
	}
};

// Sign up
const register = async (event) => {
	event.preventDefault();
	const name = document.getElementById('regName').value;
	const email = document.getElementById('regEmail').value;
	const password = document.getElementById('regPassword').value;
	const avatar = './assets/images/pngwave.png';

	const registrant = {
		name,
		email,
		password,
		avatar
	};

	console.log(registrant);

	//Check email availability
	let sameEmail = false;
	for (let i = 0; i < userData.length; i++) {
		if (email == userData[i].email) {
			sameEmail = true;
		}
	}

	if (!sameEmail) {
		const response = await fetch(urlUser, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrant)
		});
		await response.json();
		window.location.href = `${window.origin}/welcome.html`;
	} else {
		alert('Email has already been registered');
	}
};

// Initialization
getUserData();

// Listener
userLogin.addEventListener('submit', login);
userRegister.addEventListener('submit', register);

// Connect to mockAPI user -> Save in array
// Sign up -> Check email availability
// Sign in -> Compare with database -> Get user data (id, name, email, password, avatar) &
// 			  connect to mockAPI movie to get user/id/movie data -> Save in local storage

//==================================================================
if (allMovieData.length == 0) {
	signIn.setAttribute('disabled', '');
	signUp.setAttribute('disabled', '');
}
