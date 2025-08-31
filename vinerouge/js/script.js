// Строгий режим
"use strict"
window.addEventListener(`load`, loadPage)
const html = document.documentElement

function loadPage() {
	html.classList.add(`loaded`)

	document.addEventListener(`click`, actionClick)
	swiperShop()
	swiperTestimonials()
	scrollHeader()
}

function actionClick(e) {
	const targetElement = e.target
	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu-link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null
}

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}
}


// Swiper shop
function swiperShop() {
	const swiper = new Swiper('.swiper', {
		// Default parameters
		watchSlidesProgress: true,
		on: {
			progress(swiper) {
				swiper.slides.forEach(slide => {
					if (slide.classList.contains('swiper-slide-fully-visible')) {
						slide.style.opacity = 1;
					} else {
						slide.style.opacity = 0.5;
					}
				});
			}
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30,
			},
			1300: {
				slidesPerView: "auto",
				spaceBetween: 37,
			}
		},
		navigation: {
			nextEl: '.swiper-controls__shop-button--next',
			prevEl: '.swiper-controls__shop-button--prev',
		},
		pagination: {
			el: '.swiper-controls__pagination-shop',
			clickable: true,
			bulletClass: `swiper-controls__pagination-shop-item`,
			bulletActiveClass: `swiper-controls__pagination-shop-item--active`,
		},
	})
}

// Swiper Testimonials
function swiperTestimonials() {
	const swiper = new Swiper('.swiper-testimonials', {
		// Default parameters
		slidesPerView: `auto`,
		// spaceBetween: 500,
		navigation: {
			nextEl: '.swiper-controls__testimonials-button-next',
			prevEl: '.swiper-controls__testimonials-button-prev',
		},
		pagination: {
			el: '.testimonials__pagination',
			clickable: true,
			bulletClass: `swiper-controls__pagination-testimonials-item`,
			bulletActiveClass: `swiper-controls__pagination-testimonials-item--active`,
		},
	})
}