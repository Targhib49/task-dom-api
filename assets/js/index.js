let cek = localStorage.getItem('isLoginRYMIB');

if (cek != 'true') {
	window.location.href = `${window.origin}/welcome.html`;
}
