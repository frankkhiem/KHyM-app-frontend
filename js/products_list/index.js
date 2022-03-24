// lấy giá trị từ thanh điều chỉnh giá
let priceBar = $('input.price-bar');
let price = priceBar.value;
let priceValueElement = $('div.price-value');
priceValueElement.innerText = '~ ' + price + ' triệu ₫';
priceBar.addEventListener('input', function(){
	let price = priceBar.value;
	console.log(typeof(price));
	if( price == priceBar.min ) {
		priceValueElement.innerText = '< ' + price + ' triệu ₫';
	}
	else if( price == priceBar.max ) {
		priceValueElement.innerText = '> ' + price + ' triệu ₫';
	}
	else {
		priceValueElement.innerText = '~ ' + price + ' triệu ₫';
	}
});

// tắt bật bảng filter options
let filterBtn = $('.filter-btn');
filterBtn.addEventListener('click', function() {
	let filterOptions = $('.filter-options');
	if (filterOptions.classList.contains('show')) {
		filterOptions.classList.remove('show');
	}
	else {
		filterOptions.classList.add('show');
	}
});

// tắt bật các lựa chọn sort
let sortChoices = $$('.sorter-btn span');
let sortOptions = $$('.sort-options span');

for( let i = 0; i < sortOptions.length; i++ ) {
	sortOptions[i].addEventListener('click', function() {
		let sortChoiced = $('.sorter-btn span.show');
		let sortOptionActived = $('.sort-options span.active');
		// hủy kích hoạt option sort hiện tại
		sortChoiced.classList.remove('show');
		sortOptionActived.classList.remove('active');
		// kích hoạt option sort click vào
		sortChoices[i].classList.add('show');
		sortOptions[i].classList.add('active');
	});
}

let sorterBtn = $('.sorter-btn');
sorterBtn.addEventListener('click', function() {
	let sortOptions = $('.sort-options');
	if (sortOptions.classList.contains('show')) {
		sortOptions.classList.remove('show');
	}
	else {
		sortOptions.classList.add('show');
	}
});

var handleScrollDownFunction = function() {
  if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
};


// show Toast message
$$('.products-section .item-actions .item-action:first-child').forEach((element) => {
	element.addEventListener('click', function(e) {
		e.preventDefault();
		showToast({
			type:'info', 
			title: 'Thông báo',
			message: 'Bạn đã thêm sản phẩm mới vào giỏ hàng',
			duration: 5000
		});
	});
});

$$('.products-section .item-actions .item-action:nth-child(3)').forEach((element) => {
	element.addEventListener('click', function(e) {
		e.preventDefault();
		showToast({
			type:'success', 
			title: 'Thành công',
			message: 'Đã thêm sản phẩm vào danh sách yêu thích',
			duration: 5000
		});
	});
});