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
let imageProductSize = $('.intro-images .slider-container').offsetWidth;

$$('.intro-section .main-image__container').forEach(function(container) {
  container.style.width = `${imageProductSize}px`;
});
$('.intro-section .main-rating__container').style.width = `${imageProductSize}px`;
$('.main-rating__container .rating').style.width = `100%`;
$('.intro-section .main-images__slider').style.transform = `translateX(${-imageProductSize}px)`;

for( let i = 0; i < indicatorBtns.length; i++ ) {
  indicatorBtns[i].addEventListener('click', function() {
    numbersSlideMoved = Math.abs( i - currentIndex1 );
    sliderImages1.style.transform = `translateX(${(i) * (-imageProductSize)}px)`;
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

  if( dragSubImages.scrollLeft > 620 ) {
    dragSubImages.scrollLeft = 620;
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

// xử lý khi ấn nút gửi comment
$('.your-comment button').addEventListener('click', function() {
  location.href = './';
});


// style modal thông số chi tiết sản phẩm
let configBlocks = $$('.specifications-modal .config-block');
configBlocks.forEach(function(element) {
  Array.from(element.children).forEach(function(item, index) {
    if( index % 2 === 0 ) {
      item.classList.add('odd');
    }
  });
});

// bật tắt modal thông số chi tiết sản phẩm
let specificationsModal = $('.specifications-modal');

let specificationsModalBtn = $('.specifications .more-btn');
specificationsModalBtn.addEventListener('click', function(){
  specificationsModal.style.display = 'block';
  document.body.classList.add('noscroll');
  setTimeout(function() {
    specificationsModal.style.opacity = '1';
  }, 1);
});

const closeSpecificationsModalFn = function() {
  specificationsModal.style.opacity = '0';
  setTimeout(function() {
    $('.specifications-modal .overlay').scrollTop = 0;
    specificationsModal.style.display = 'none';
    document.body.classList.remove('noscroll');
  }, 301);
};

let closeSpecificationsModalBtn1 = $('.specifications-modal .modal-close-icon');
closeSpecificationsModalBtn1.addEventListener('click', closeSpecificationsModalFn);

let closeSpecificationsModalBtn2 = $('.specifications-modal .modal-close-btn button');
closeSpecificationsModalBtn2.addEventListener('click', closeSpecificationsModalFn);

let overlaySpecificationsModal = $('.specifications-modal .overlay');
overlaySpecificationsModal.addEventListener('click', closeSpecificationsModalFn);

let specificationsModalContainer = $('.specifications-modal .modal-container');
specificationsModalContainer.addEventListener('click', function(e) {
  e.stopPropagation();
});

// xử lý Modal ảnh sản phẩm
let sliderDisplaySize = $('.images-modal .slider-display').offsetWidth;

let currentIndex2 = 1;
let prevSliderBtn = $('.slider-btn.previous');
let nextSliderBtn = $('.slider-btn.next');

let imagesModal = $('.images-modal');
let sliderContainer = $('.images-modal .slider-container');

let thumnailImages = $$('.images-modal .thumnail-item');

let thumnailsContainer = $('.images-modal .thumnails');

const thumnailImagesScrollHandle = function(next) {
  let currentThumnailActived = $('.images-modal .thumnail-item.active');

  if( next ) {
    if( currentThumnailActived.offsetLeft + currentThumnailActived.offsetWidth > sliderDisplaySize ) {
      thumnailsContainer.scrollLeft = 32 + currentThumnailActived.offsetLeft + currentThumnailActived.offsetWidth - sliderDisplaySize;
    }
  }
}

prevSliderBtn.addEventListener('click', function() {
  showImageSlide(--currentIndex2);
  sliderContainer.style.transition = 'transform .3s ease-out';
  thumnailImagesScrollHandle(false);
});

nextSliderBtn.addEventListener('click', function() {
  showImageSlide(++currentIndex2);
  sliderContainer.style.transition = 'transform .3s ease-out';
  thumnailImagesScrollHandle(true);
});

let numbersImage = sliderContainer.childElementCount;
let firstImage = sliderContainer.firstElementChild;
let lastImage = sliderContainer.lastElementChild;
sliderContainer.prepend(lastImage.cloneNode(true));
sliderContainer.append(firstImage.cloneNode(true));


// Hàm hiển thị ảnh thứ index trên slider
const showImageSlide = function(index) {
  sliderContainer.style.transform = `translateX(${index * (-sliderDisplaySize)}px)`;
  if( index === 0 ) {
    thumnailModalActive(7);
    setTimeout(() => {
      currentIndex2 = numbersImage;
      sliderContainer.style.transition = null;
      showImageSlide(currentIndex2);
    }, 301);
  }
  else if( index === numbersImage + 1 ) {
    thumnailModalActive(0);
    setTimeout(() => {
      currentIndex2 = 1;
      sliderContainer.style.transition = null;
      showImageSlide(currentIndex2);
    }, 301);
  }
  else {
    currentIndex2 = index;
    thumnailModalActive(index - 1);
  }
}

const thumnailModalActive = function(index) {
  let currentThumnailActived = $('.images-modal .thumnail-item.active');
  if( currentThumnailActived ) {
    currentThumnailActived.classList.remove('active');
  }
  thumnailImages[index].classList.add('active');
  if( index === 0 ) {
    setTimeout(() => {
      thumnailsContainer.scrollLeft = 0;
    }, 1);
  }
  else if( index + 1 === numbersImage ) {
    setTimeout(() => {
      thumnailsContainer.scrollLeft = sliderDisplaySize + currentThumnailActived.offsetWidth;
    }, 1);
  }
}

thumnailImages.forEach(function(thumn, index) {
  thumn.addEventListener('click', function() {
    let numbersSlideMoved = Math.abs(index + 1 - currentIndex2);
    // console.log(numbersSlideMoved);
    sliderContainer.style.transition = `transform ${0.3 + (numbersSlideMoved - 1) * 0.07}s ease-out`;
    showImageSlide(index + 1);
  });
});

// Xử lý kéo thả chuột trên modal images
const getTranslateX = function(element) {
  let style = window.getComputedStyle(element);
  let matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

let posSliderDrag = {
  x: 0,
  translateX: 0
}

const mouseDownSliderHandle = function(e) {
  sliderContainer.style.cursor = 'grabbing';
  sliderContainer.style.transition = null;

  posSliderDrag = {
    x: e.clientX,
    translateX: getTranslateX(sliderContainer)
  }
  // console.log(posSliderDrag);
  sliderContainer.addEventListener('mousemove', mouseMoveSliderHandle);
  document.addEventListener('mouseup', mouseUpSliderHandle);
}

const mouseMoveSliderHandle = function(e) {
  let moveSize = posSliderDrag.x - e.clientX;
  sliderContainer.style.transform = `translateX(${posSliderDrag.translateX - moveSize}px)`;
  // console.log(Math.abs(moveSize));
}

const mouseUpSliderHandle = function(e) {
  sliderContainer.removeEventListener('mousemove', mouseMoveSliderHandle);
  document.removeEventListener('mouseup', mouseUpSliderHandle);

  let moveSize = posSliderDrag.x - e.clientX;
  // console.log(moveSize);
  const scrollDirection = function(value) {
    if( value < 0 ) {
      showImageSlide(--currentIndex2);
    }
    else {
      showImageSlide(++currentIndex2);
    }
  }

  if( Math.abs(moveSize) < 64 ) {
    sliderContainer.style.transition = `transform 0.1s ease-out`;
    showImageSlide(currentIndex2);
  }
  else if ( Math.abs(moveSize) > sliderDisplaySize ) {
    sliderContainer.style.transition = `transform 0.1s ease-out`;
    scrollDirection(moveSize);
  }
  else {
    sliderContainer.style.transition = `transform ${0.3 * ((sliderDisplaySize - Math.abs(moveSize)) / sliderDisplaySize)}s ease-out`;
    scrollDirection(moveSize);
  }

  sliderContainer.style.cursor = 'default';
}

sliderContainer.addEventListener('mousedown', mouseDownSliderHandle);


// Xử lý bật tắt modal ảnh
let zoomBtns = $$('.main-image__container .zoom-btn');
zoomBtns.forEach(function(btn, index) {
  btn.addEventListener('mousemove', function(e) {
    e.stopPropagation();
    offZoom(e, index);
  });

  btn.addEventListener('click', function() {
    imagesModal.style.display = 'block';
    sliderDisplaySize = $('.images-modal .slider-display').offsetWidth;
    sliderContainer.style.transition = null;

    // Xử lý responsive Modal ảnh
    $$('.images-modal .slider-container .slider-item').forEach(function(item) {
      item.style.width = `${sliderDisplaySize}px`;
    });

    showImageSlide(index + 1);
    document.body.classList.add('noscroll');
    setTimeout(function() {
      imagesModal.style.opacity = '1';
    }, 1);
  });
});

const closeImagesModalFn = function() {
  imagesModal.style.opacity = '0';
  setTimeout(function() {
    $('.specifications-modal .overlay').scrollTop = 0;
    imagesModal.style.display = 'none';
    document.body.classList.remove('noscroll');
  }, 301);
}

let closeImagesModalBtn = $('.images-modal .modal-close-icon');
closeImagesModalBtn.addEventListener('click', function() {
  closeImagesModalFn();
});

let overlayImagesModal = $('.images-modal .overlay');
overlayImagesModal.addEventListener('click', function() {
  closeImagesModalFn();
});

let imagesModalContainer = $('.images-modal .modal-container');
imagesModalContainer.addEventListener('click', function(e) {
  e.stopPropagation();
});


// Go to Not found page
// $('.product-action .favorite').addEventListener('click', function() {
//   location.href = '../not_found';
// });

$$('.social-sharing .social-btn').forEach((element) => {
  element.addEventListener('click', function() {
    location.href = '../not_found';
  });
});

// show Toast message
$('.product-action .add-to-cart').addEventListener('click', function() {
  showToast({
    type:'info', 
    title: 'Thông báo',
    message: 'Bạn đã thêm sản phẩm mới vào giỏ hàng',
    duration: 5000
  });
});

$('.product-action .favorite').addEventListener('click', function() {
  showToast({
    type:'success', 
    title: 'Thành công',
    message: 'Đã thêm sản phẩm vào danh sách yêu thích',
    duration: 5000
  });
});

$$('.recommend-section .item-actions .item-action:first-child').forEach((element) => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    showToast({
      type:'success', 
      title: 'Thành công',
      message: 'Bạn đã thêm sản phẩm mới vào giỏ hàng',
      duration: 5000
    });
  });
});


$$('.recommend-section .item-actions .item-action:nth-child(3)').forEach((element) => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    showToast({
      type:'error', 
      title: 'Thất bại',
      message: 'Hệ thống lỗi, vui lòng đợi trong giây lát!',
      duration: 5000
    });
  });
});

$$('.recommend-section .item-actions .item-action:last-child').forEach((element) => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    showToast({
      type:'warning', 
      title: 'Cảnh báo',
      message: 'Hệ thống không thể tìm ra sản phẩm tương tự',
      duration: 5000
    });
  });
});