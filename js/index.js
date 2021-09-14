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
})

overlaySearchBar.addEventListener('click', function(e) {
	searchBar.classList.remove('show');
	this.style.display = 'none';
})

closedSearchBar.addEventListener('click', function(e) {
	searchBar.classList.remove('show');
	overlaySearchBar.style.display = 'none';
})


// click vào btn user hiện modal đăng nhập/đăng ký