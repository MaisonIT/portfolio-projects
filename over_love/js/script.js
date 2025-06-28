// Строгий режим
"use strict"

window.addEventListener(`load`, loadPage)
const html = document.documentElement

function loadPage() {
	document.addEventListener(`click`, documentAction)
	html.classList.add(`loaded`)
	slider()
	sliderProduct()
	scrollHeader()
}
function documentAction(e) {
	const targetElement = e.target
	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu__link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null
}

// Slider swipe
function slider() {
	const swiper = new Swiper('.graphic-swiper', {
		scrollbar: {
			el: '.graphic__scrollbar',
			draggable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			1440: {
				slidesPerView: 5,
				spaceBetween: 41,
			}
		}
	})
}

// Slider Product
function sliderProduct() {
	const swiperProduct = new Swiper('.product-swiper', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.controls__button--next',
			prevEl: '.controls__button--prev',
		},
		pagination: {
			el: '.product__pagination',
			clickable: true,
			bulletClass: `pagination__item`,
			bulletActiveClass: `pagination__item--active`,
		},
	})
}

// Scroll header

function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}
}