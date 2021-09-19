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
	modalLoginContainer.classList.add('visially-hidden'); 
	modalLoginContainer.addEventListener('transitionend', function(e) {
    modalLoginContainer.classList.add('hidden');
  }, { 
    capture: false , 
    once: true , 
    passive: false 
  });
};

userTool.addEventListener('click', function() {
	modalLoginContainer.classList.remove('hidden');
	setTimeout(function () {
    modalLoginContainer.classList.remove('visially-hidden');
  }, 1);
	
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

// click vào button cuộn trang web lên đầu trang và cuộn để ẩn hiện header
const scrollToTopBtn = $('#scroll-top-btn');
const header = $('header');

let lastLocationScroll = window.pageYOffset || document.documentElement.scrollTop;
window.onscroll = function() {
	handleScrollDownFunction();
}

const handleScrollDownFunction = function() {
  if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
    scrollToTopBtn.classList.add('show');
    header.classList.add('white-header');
  } else {
    scrollToTopBtn.classList.remove('show');
    header.classList.remove('white-header');
  }
};

// const scrollHiddenHeader = function() {
// 	let locationScroll = window.pageYOffset || document.documentElement.scrollTop;
// 	if (locationScroll > lastLocationScroll) {
// 		if (locationScroll > 500) {
// 			header.classList.add('hidden');
// 		}
// 	}
// 	else {
// 		header.classList.remove('hidden');
// 	}
// 	lastLocationScroll = locationScroll <= 0 ? 0 : locationScroll; // For Mobile or negative scrolling
// }

scrollToTopBtn.addEventListener('click', function(){
	document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});


// Tạo màn hình load trang web
const loadingPage = $('#loading-container');

window.onload = function() {
	setTimeout(function(){
		loadingPage.classList.add('loaded');
	}, 3000);
}


/**
 * Code Js cho các component của Bootstrap
 */
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
/**
 * End code cho Bootstrap
 */


/**
 * Code Js cho Swiper Slider
 */
const swiper = new Swiper('.feedback-slider', {
	speed: 500,
  spaceBetween: 40,
	autoplay: {
	 delay: 7500,
	 disableOnInteraction: false
	},
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  breakpoints: {
  	1024: {
  		slidesPerView: 2,
  	}
  }
});
/**
 * End code cho Swiper Slider
 */