var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

let icons = {
	success: 'fa-solid fa-circle-check',
	info: 'fa-solid fa-circle-info',
	warning: 'fa-solid fa-circle-exclamation',
	error: 'fa-solid fa-circle-xmark',
};

const showToast = function({
		type = 'success', 
		title = '', 
		message = '', 
		duration = 5000,
		href = './pages/not_found',
	}) {
	let toasts = $('#toasts');

	let newToast = document.createElement('div');

	newToast.classList.add('toast__container', `${type}`);
	
	newToast.innerHTML = `
		<div class="toast__icon">
			<i class="${icons[type]}"></i>
		</div>
		<div class="toast__content">
			<div class="toast__title">
				${title}
			</div>
			<div class="toast__message">
				${message}
			</div>
		</div>
		<div class="toast__close-btn">
			<i class="fa-solid fa-xmark"></i>
		</div>
		<div class="toast__progress"></div>
	`;

	newToast.lastElementChild.style.animationDuration = `${(duration / 1000).toPrecision(2)}s`;

	toasts.prepend(newToast);

	const removeToast = function() {
		newToast.classList.remove('active');
		setTimeout(() => {
			toasts.removeChild(newToast);
		}, 300);
	}

	setTimeout(() => {
		newToast.classList.add('active');
	}, 1);

	let autoRemove = setTimeout(() => {
		removeToast();
	}, duration);

	newToast.addEventListener('click', (e) => {
		if( e.target.closest('.toast__close-btn') ) {
			clearTimeout(autoRemove);
			removeToast();
			newToast.lastElementChild.style.animationPlayState = 'paused';
		}
		else {
			location.href = href;
		}
	});
}