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
const urlUser = 'https://5e8ee187fe7f2a00165eead7.mockapi.io/users';

// Element
const userLogin = document.getElementById('user-login');
const userRegister = document.getElementById('user-register');

// Connect to mockAPI - user
const getUserData = async () => {
	const response = await fetch(urlUser);
	const result = await response.json();

	result.forEach((user) => {
		userData.push(user);
	});
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

// Sign in
const login = (event) => {
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
				getMovieData(id);

				let userLogin = {
					id,
					name,
					email,
					password,
					avatar,
					movieData
				};

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
