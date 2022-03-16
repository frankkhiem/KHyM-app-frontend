var handleScrollDownFunction = function() {
  if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
};

// xử lý ảnh sản phẩm
let sliderImages1 = $('.main-images__slider');
let currentIndex1 = 1;
let numbersSlideMoved = 0;
let indicatorBtns = $$('.sub-images .item');

for( let i = 0; i < indicatorBtns.length; i++ ) {
  indicatorBtns[i].addEventListener('click', function() {
    numbersSlideMoved = Math.abs( i - currentIndex1 );
    sliderImages1.style.transform = `translateX(${(i) * (-450)}px)`;
    currentIndex1 = i;
    addTransition(numbersSlideMoved);
    activeIndicator(i);
  });
}

const addTransition = function(numMoved) {
  switch( numMoved ) {
    case 2:
    case 3:
      sliderImages1.style.transition = `transform 0.4s linear`;
      break;
    case 4:
    case 5:
      sliderImages1.style.transition = `transform 0.5s linear`;
      break;
    case 6:
    case 7:
    case 8:
      sliderImages1.style.transition = `transform 0.7s linear`;
      break;
    default:
      sliderImages1.style.transition = `transform 0.3s linear`;
  }
}

const activeIndicator = function(index) {
  let currentActived = $('.sub-images .item.active');
  currentActived.classList.remove('active');
  indicatorBtns[index].classList.add('active');
}


// zoom ảnh sản phẩm khi hover
let imageContainers = $$('.main-image__container');
let imageProducts = $$('.main-image__container img');

for( let i = 0; i < imageContainers.length; i++ ) {
  imageContainers[i].addEventListener("mousemove", function(e) {
    onZoom(e, i);
  });
  imageContainers[i].addEventListener("mouseover", function(e) {
    onZoom(e, i);
  });
  imageContainers[i].addEventListener("mouseleave", function(e) {
    offZoom(e, i);
  });
}
// imageContainer.addEventListener("mousemove", onZoom);
// imageContainer.addEventListener("mouseover", onZoom);
// imageContainer.addEventListener("mouseleave", offZoom);
function onZoom(e, imageIndex) {
    const x = e.clientX - sliderImages1.offsetLeft;
    //sử dụng pageY thay cho clientY để xử lý việc vừa hover vừa scroll màn hình
    const y = e.pageY - sliderImages1.offsetTop;
    imageProducts[imageIndex].style.transformOrigin = `${x}px ${y}px`;
    imageProducts[imageIndex].style.transform = "scale(2.2)";
}
function offZoom(e, imageIndex) {
    // imageProduct.style.transformOrigin = `center center`;
    imageProducts[imageIndex].style.transform = "scale(1)";
}


// xử lý kéo chuột để cuộn ảnh sub
let dragSubImages = $('.sub-images');
// biến tắt bật chế độ kéo thả, nếu đang kéo thả sẽ không click
let dragMode = false;
let posMouseDrag = {
  left: 0,
  x: 0
};

dragSubImages.scrollLeft = 185;

const mouseDownHandle = function(e) {
  pos = {
    // The current scroll horizontal
    left: dragSubImages.scrollLeft,
    // Get the current mouse position
    x: e.clientX,
  };

  dragSubImages.style.userSelect = 'none';
  dragSubImages.style.cursor = 'grabbing';

  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
  dragMode = true;

  // How far the mouse has been moved
  const dx = e.clientX - pos.x;

  // Scroll the element
  dragSubImages.scrollLeft = pos.left - dx;

  // các ảnh sub có con trỏ grabbing
  for (btn of indicatorBtns) {
    btn.style.cursor = 'grabbing';
  }
};

const mouseUpHandler = function () {
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);

  if( dragSubImages.scrollLeft < 185 ) {
    dragSubImages.scrollLeft = 185;
  }

  if( dragSubImages.scrollLeft > 580 ) {
    dragSubImages.scrollLeft = 580;
  }

  dragSubImages.style.cursor = 'grab';
  dragSubImages.style.userSelect = null;
  // các ảnh sub có con trỏ pointer
  for (btn of indicatorBtns) {
    btn.style.cursor = 'pointer';
  }
};

dragSubImages.addEventListener('mousedown', mouseDownHandle);
dragSubImages.addEventListener('click', function(e){
  if( dragMode ) {
    e.stopPropagation();
    dragMode = false;
  }
}, true);


// click like and dislike
let ratingBtns = $$('.rating .rating-btns div');
for (let btn of ratingBtns) {
  btn.addEventListener('click', function() {
    location.reload();
  });
}

// click buy count btns
let subBtn = $('.buy-count__btn.minus');
let addBtn = $('.buy-count__btn.plus');
subBtn.addEventListener('click', function() {
  let input = $('.buy-count__number input');
  let number = Number(input.value);
  if( number > 1 ) {
    input.value = --number;
  }
});

addBtn.addEventListener('click', function() {
  let input = $('.buy-count__number input');
  let number = Number(input.value);
  input.value = ++number;
});

// đặt màu nền xen kẽ cho thông số sản phẩm
let specificationsItems = $$('.specifications .item');
for( let i = 0; i < specificationsItems.length; i++ ) {
  if( i % 2 === 0 ) {
    specificationsItems[i].style.backgroundColor = '#f5f5f5';
  }
}

// chuyển nav giữa đặc điểm nổi bật và đánh giá
let salientDetailBtn = $('.describe__nav div:nth-child(1)');
let salientDetailContainer = $('.describe__detail');
let reviewDetailBtn = $('.describe__nav div:nth-child(2)');
let reviewDetailContainer = $('.describe__review');

salientDetailBtn.addEventListener('click', function() {
  reviewDetailBtn.classList.remove('active');
  reviewDetailContainer.classList.remove('active');
  salientDetailBtn.classList.add('active');
  salientDetailContainer.classList.add('active');
});

reviewDetailBtn.addEventListener('click', function() {
  salientDetailBtn.classList.remove('active');
  salientDetailContainer.classList.remove('active');
  reviewDetailBtn.classList.add('active');
  reviewDetailContainer.classList.add('active');
});

// chọn số lượng sao trong phần đánh giá
let starsRating = $$('.your-rating i');
let starsCount = 0;
for( let i = 0; i < starsRating.length; i++ ) {
  $('.your-rating').addEventListener('mouseleave', function() {
    starsActive(starsCount);
  });
  starsRating[i].addEventListener('click', function() {
    starsActive(i + 1);
    starsCount = i + 1;
  });
  starsRating[i].addEventListener('mouseenter', function() {
    if( i + 1 > starsCount ) {
      starsActive(i + 1);
    }
  });
}

const starsActive = function(number) {
  for( let i = 0; i < number; i++ ) {
    starsRating[i].classList.remove('fa-regular');
    starsRating[i].classList.add('fa-solid');
  }

  for( let i = number; i < starsRating.length; i++ ) {
    starsRating[i].classList.add('fa-regular');
    starsRating[i].classList.remove('fa-solid');
  }
}