const $ = document.querySelector.bind(document);

$('body > .home').addEventListener('click', function() {
	location.href = '../..';
});