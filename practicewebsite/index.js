const themes = [
  { theme: "dark", priClr: "#1e2022", secClr: "#333539" },
  { theme: "light", priClr: "#fff", secClr: "#cecece" },
  { theme: "custom", priClr: "#ccdff9", secClr: "#60a5fa" }
];

let themeIndex = 0;
const themesDOM = document.querySelector(".themes");
const redirectBtn = document.getElementById("redirectTo");
const componentID = "66aae00acee507776b3673b1";
let baseURL = `https://we-code.dev/components/component?id=${componentID}`;

const themeEvent = (targetEle) => {
  const targetElement = targetEle.target;
  const targetEleIndex = Array.from(document.querySelectorAll(".themes ul li")).indexOf(targetElement);
  const switchThemeTo = targetElement.getAttribute("data-theme");
  const parentElement = targetElement.closest("ul");
  const { x: parentX } = parentElement.getBoundingClientRect();
  const { x: targetX } = targetElement.getBoundingClientRect();
  const fromX = `${targetX - parentX}px`;

  parentElement.style.setProperty("--posX", fromX);
  const containerEle = document.querySelector(".container");
  baseURL = `${baseURL.split("&")[0]}&theme=${switchThemeTo}`;
  containerEle.setAttribute("data-theme", switchThemeTo);
  const { priClr, secClr } = themes[targetEleIndex];
  containerEle.style.setProperty("--matchBg", `linear-gradient(to bottom right, ${priClr}, ${secClr})`);
};

const renderThemes = () => {
  const ulEle = document.createElement("ul");

  themes.forEach((themeData) => {
      const { theme, priClr, secClr } = themeData;
      const liEle = document.createElement("li");
      liEle.style.background = `linear-gradient(to bottom right, ${priClr} 50%, ${secClr} 50%)`;
      liEle.setAttribute("data-theme", theme);
      liEle.addEventListener("click", themeEvent);
      ulEle.appendChild(liEle);
  });

  themesDOM.appendChild(ulEle);
};

renderThemes();

const slideTransforms = [
  'translate3d(-200%, -50%, 0rem) rotateY(45deg) scale(0.85)', 
  'translate3d(-150%, -50%, 3rem) rotateY(30deg) scale(0.9)', 
  'translate3d(-100%, -50%, 6rem) rotateY(15deg) scale(0.95)', 
  'translate3d(-50%, -50%, 9rem)', 
  'translate3d(0%, -50%, 6rem) rotateY(-15deg) scale(0.95)', 
  'translate3d(50%, -50%, 3rem) rotateY(-30deg) scale(0.9)', 
  'translate3d(100%, -50%, 0) rotateY(-45deg) scale(0.85)'
];

const slides = document.querySelectorAll('.slide');

slides.forEach((slide, index) => {
  const slideTransform = slideTransforms[index];
  slide.style.transform = slideTransform;
});

let debounceTimeOut;

const navigateTo = (bool) => {
  clearTimeout(debounceTimeOut);
  debounceTimeOut = setTimeout(() => {
      if (bool) {
          slideTransforms.unshift(slideTransforms.pop());
      } else {
          slideTransforms.push(slideTransforms.shift());
      }
      slides.forEach((slide, index) => {
          slide.style.transform = slideTransforms[index];
      });
  }, 500);
};

// Move the clicked slide to the center
const setCenterSlide = (index) => {
  const currentCenterIndex = Math.floor(slideTransforms.length / 2);
  const offset = currentCenterIndex - index;
  if (offset !== 0) {
      if (offset > 0) {
          for (let i = 0; i < offset; i++) {
              slideTransforms.push(slideTransforms.shift());
          }
      } else {
          for (let i = 0; i < Math.abs(offset); i++) {
              slideTransforms.unshift(slideTransforms.pop());
          }
      }
      slides.forEach((slide, index) => {
          slide.style.transform = slideTransforms[index];
      });
  }
};

// Add click event listener to each iframe to center it when clicked
slides.forEach((slide, index) => {
  slide.addEventListener('click', () => setCenterSlide(index));
});

document.getElementById('prev-slide').addEventListener('click', () => navigateTo(false));
document.getElementById('nxt-slide').addEventListener('click', () => navigateTo(true));


  // slider first

//   const sliderContent = document.getElementById('sliderContent');
// const slidess = document.querySelectorAll('.slide');
// let currentIndex = 0;

// document.getElementById('prevSlide').addEventListener('click', () => {
//     currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
//     updateSlider();
// });

// document.getElementById('nextSlide').addEventListener('click', () => {
//     currentIndex = (currentIndex === slidess.length - 1) ? 0 : currentIndex + 1;
//     updateSlider();
// });

// function updateSlider() {
//     sliderContent.style.transform = `translateX(-${currentIndex * 100}%)`;
// }

// function lefts{

//   const sliderContent = document.getElementById('sliderContent');
  

// }

// ----------------

// const iframes = document.querySelectorAll('.video-frame');
// let currentIndex = 0; 

// function updateSlider() {
//     iframes.forEach((iframe, index) => {
//         iframe.classList.remove('center');
//         if (index === currentIndex) {
//             iframe.style.transform = 'translateX(0%) scale(1)';
//             iframe.style.opacity = '1';
//             iframe.style.zIndex = '1';
//             iframe.classList.add('center');
//         } else if (index === (currentIndex === 0 ? iframes.length - 1 : currentIndex - 1)) {
//             iframe.style.transform = 'translateX(-110%) scale(0.8)';
//             iframe.style.opacity = '0.6';
//             iframe.style.zIndex = '0';
//         } else {
//             iframe.style.transform = 'translateX(110%) scale(0.8)';
//             iframe.style.opacity = '0.6';
//             iframe.style.zIndex = '0';
//         }
//     });
// }

// document.getElementById('prevSlide').addEventListener('click', () => {
//     currentIndex = (currentIndex === 0) ? iframes.length - 1 : currentIndex - 1;
//     updateSlider();
// });

// document.getElementById('nextSlide').addEventListener('click', () => {
//     currentIndex = (currentIndex === iframes.length - 1) ? 0 : currentIndex + 1;
//     updateSlider();
// });

// updateSlider();

// -------------------

$(function(){
  if($('.gallery-wrapper').length){
      var galleryThumbs = new Swiper('.gallery-wrapper .content .gallery.thumb .swiper-container', {
          speed: 900,
          effect: 'slide',
          spaceBetween: 12,
          grabCursor: false,
          simulateTouch: true,
          loop: false,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          navigation: {
              nextEl: '.gallery-wrapper .content .gallery.thumb .swiper-next-button',
              prevEl: '.gallery-wrapper .content .gallery.thumb .swiper-prev-button',
          },
          breakpoints: {
              320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
              },
              414: {
                  slidesPerView: 3,
                  spaceBetween: 10
              },
              768: {
                  slidesPerView: 5,
                  spaceBetween: 10
              },
              1024: {
                  slidesPerView: 7,
                  spaceBetween: 10
              }
          },
      on: {
        init: function() { 
          let containerThumbWidth = $('.gallery-wrapper .content .gallery.thumb').outerWidth();

let totalThumbWidth = 0;

$('.gallery.thumb .swiper-container .swiper-wrapper .swiper-slide').each(function(){
  let thumbWidth = $(this).outerWidth();
  totalThumbWidth += thumbWidth
});



if(totalThumbWidth < containerThumbWidth){
  $('.gallery.thumb .swiper-next-button, .gallery.thumb .swiper-prev-button').addClass('hide');
}else{
  $('.gallery.thumb .swiper-next-button, .gallery.thumb .swiper-prev-button').removeClass('hide');
}
       }
      }
      });

      var galleryFull = new Swiper('.gallery-wrapper .content .gallery.full .swiper-container', {
          speed: 900,
          effect: 'slide',
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: true,
          autoplay: {
              delay: 7000,
              disableOnInteraction: false,
              stopOnLastSlide: false
          },
          keyboard: {
              enabled: true,
          },
          grabCursor: false,
          simulateTouch: false,
          loop: true,
          navigation: {
              nextEl: '.gallery-wrapper .content .gallery.full .swiper-next-button',
              prevEl: '.gallery-wrapper .content .gallery.full .swiper-prev-button',
          },
          thumbs: {
              swiper: galleryThumbs
          },
          on: {
              slideChangeTransitionStart: function () {
                  $('.gallery-wrapper .content .gallery.full .swiper-slide .overlay').removeClass('show');
              },
              slideChangeTransitionEnd: function () {
                  $('.gallery-wrapper .content .gallery.full .swiper-slide-active .overlay').addClass('show');
              }
          }
      });
  }
});


$(window).on("load", function() {
  setTimeout(function(){
      $('.loader').fadeOut();
  }, 1000);
});


// watchlist slider


// infinite scroll 

const imageCarousel = document.getElementById('imageCarousel');
const carouselInner = imageCarousel.querySelector('.image-carousel');
const images = carouselInner.querySelectorAll('img');
const imageCount = images.length;
let isMouseDown = false;
let startX;
let scrollLeft;

// Clone the images for infinite scrolling
for (let i = 0; i < imageCount; i++) {
  const clone = images[i].cloneNode(true);
  carouselInner.appendChild(clone);
}

imageCarousel.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  startX = e.pageX - imageCarousel.offsetLeft;
  scrollLeft = imageCarousel.scrollLeft;
  imageCarousel.style.cursor = 'grabbing'; // Change cursor to grabbing
});

imageCarousel.addEventListener('mouseleave', () => {
  isMouseDown = false;
  imageCarousel.style.cursor = 'grab'; // Change cursor back to grab
});

imageCarousel.addEventListener('mouseup', () => {
  isMouseDown = false;
  imageCarousel.style.cursor = 'grab'; // Change cursor back to grab
});

// Prevent event bubbling for images
const imagesList = carouselInner.getElementsByTagName('img');
for (let img of imagesList) {
  img.addEventListener('mousedown', (e) => {
    e.stopPropagation(); // Stop event from bubbling up to the carousel
  });
}

imageCarousel.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return; // Stop the function from running if mouse is not down
  const x = e.pageX - imageCarousel.offsetLeft;
  const walk = (x - startX) * 1; // The distance you move
  imageCarousel.scrollLeft = scrollLeft - walk; // Scroll the carousel
});

// Infinite scroll
function checkScroll() {
  if (imageCarousel.scrollLeft <= 0) {
    imageCarousel.scrollLeft = carouselInner.scrollWidth / 2; // Jump to the second set of images
  } else if (imageCarousel.scrollLeft >= carouselInner.scrollWidth / 2) {
    imageCarousel.scrollLeft = 0; // Jump back to the start
  }
}

setInterval(checkScroll, 100); // Check for scroll position every 100ms


// first slider 2

// const carousel = document.querySelector('.carousel');
// const slides2 = Array.from(document.querySelectorAll('.slide2'));
// let currentSlide = 2; 

// function updateCarousel() {
//   slides2.forEach(slide => slide.classList.remove('active'));

//   slides2[currentSlide].classList.add('active');

//   slides2.forEach((slide, index) => {
//     const distanceFromCenter = index - currentSlide;

//     if (distanceFromCenter === 0) {
//       slide.style.transform = 'translateX(0) scale(1.2)';
//       slide.style.opacity = 1;
//     } 
//     else {
//       slide.style.transform = `translateX(${distanceFromCenter * 230}px) scale(0.8)`;
//       slide.style.opacity = 0.6;
//     }
//   });
// }

// function nextSlide() {
//   currentSlide = (currentSlide + 1) % slides2.length;
//   updateCarousel();
// }

// function prevSlide() {
//   currentSlide = (currentSlide - 1 + slides.length) % slides2.length;
//   updateCarousel();
// }

// updateCarousel();

// content - 2

// const videoSlider = document.getElementById('sliderContent');
// const videos = [
//     document.getElementById('firstVideo'),
//     document.getElementById('secondVideo'),
//     document.getElementById('thirdVideo'),
// ];
// let currentIndex = 0; // Start from the first video

// function updateSlider() {
//     // Update iframe classes based on current index
//     videos.forEach((video, index) => {
//         video.classList.remove('active', 'left', 'right');

//         if (index === currentIndex) {
//             video.classList.add('active'); // Active frame in the center
//         } else if (index === (currentIndex + 1) % videos.length) {
//             video.classList.add('right'); // Next frame sliding in
//         } else if (index === (currentIndex - 1 + videos.length) % videos.length) {
//             video.classList.add('left'); // Previous frame sliding out
//         }
//     });
// }

// // Left Arrow Click Event
// document.getElementById('leftArrow').addEventListener('click', () => {
//     currentIndex = (currentIndex - 1 + videos.length) % videos.length; // Wrap around to last video
//     updateSlider();
// });

// // Right Arrow Click Event
// document.getElementById('rightArrow').addEventListener('click', () => {
//     currentIndex = (currentIndex + 1) % videos.length; // Wrap around to first video
//     updateSlider();
// });

// // Initialize the slider
// updateSlider();

// function firstslider(){

//   const firstsfirstimg = document.getElementById("firstsfirsti")

// }


// ---------------












