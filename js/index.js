const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// click vào btn search hiển thị ra thanh search
var searchTool = $('.search.tool-item #show-search');
var overlaySearchBar = $('.search .overlay');
var searchBar = $('.search .search-bar');
var closedSearchBar = $('.search-bar__closed');

searchTool.addEventListener('click', function() {
	overlaySearchBar.style.display = 'block';
	searchBar.classList.add('show');
});

overlaySearchBar.addEventListener('click', function(e) {
	searchBar.classList.remove('show');
	this.style.display = null;
});

closedSearchBar.addEventListener('click', function(e) {
	searchBar.classList.remove('show');
	overlaySearchBar.style.display = null;
});


// click vào btn user hiện modal đăng nhập/đăng ký
var userTool = $('#show-modal-login');
var modalLoginContainer = $('.modal-container.overlay');
var modalLogin = $('.modal-login');
var closedModalLogin = $('.modal-login__closed');
var closedModalLoginFn = function() {
	modalLoginContainer.classList.remove('show');
};

userTool.addEventListener('click', function() {
	modalLoginContainer.classList.add('show');
});

modalLoginContainer.addEventListener('click', closedModalLoginFn);

closedModalLogin.addEventListener('click', closedModalLoginFn);

modalLogin.addEventListener('click', function(e) {
	e.stopPropagation();
});

// chuyển tab giữa đăng nhập và đăng ký
const loginTab = $('#login-tab');
const loginForm = $('#login-form');
const registerTab = $('#register-tab');
const registerForm = $('#register-form');

loginTab.addEventListener('click', function() {
		let tabActived = $('.modal-login-tab.active');
		let formShowed = $('.modal-login-form.show');
		tabActived.classList.remove('active');
		formShowed.classList.remove('show');
		loginTab.classList.add('active');
		loginForm.classList.add('show');
});

registerTab.addEventListener('click', function() {
		let tabActived = $('.modal-login-tab.active');
		let formShowed = $('.modal-login-form.show');
		tabActived.classList.remove('active');
		formShowed.classList.remove('show');
		registerTab.classList.add('active');
		registerForm.classList.add('show');
});