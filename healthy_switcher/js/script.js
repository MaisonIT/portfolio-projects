"use strict"

window.addEventListener(`load`, windowLoaded)
const html = document.documentElement

function windowLoaded() {
	document.addEventListener(`click`, documentAction)
	html.classList.add(`loaded`)
	sliderInit()
	initRating()
	scrollHeader()
}
// Menu burger
function documentAction(e) {
	const targetElement = e.target
	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu-link`) && html.classList.contains(`.menu-open`) ? html.classList.remove(`menu-open`) : null
}

// Swiper
function sliderInit() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 2,
		loop: true,
		// Navigation arrows
		navigation: {
			nextEl: '.about__button--right',
			prevEl: '.about__button--left',
		},
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 2,
				spaceBetween: 5
			},
			// when window width is >= 480px
			480: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			768: {
				slidesPerView: 2,
				spaceBetween: 34
			}
		}
	})
}

// Rating
function initRating() {
	const ratingItems = document.querySelectorAll(`.rating`)
	if (ratingItems.length)
		ratingItems.forEach(ratingItem => {
			const ratingActive = ratingItem.querySelector(`.rating__active`)
			const ratingValue = parseFloat(ratingItem.querySelector(`.rating__value`).innerHTML) ? parseFloat(ratingItem.querySelector(`.rating__value`).innerHTML) : 0
			const ratingCount = ratingValue / 3.4
			const ratingPercent = ratingCount / 5 * 100
			ratingActive.style.width = `${ratingPercent}%`
		})
}

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header--scroll`, (scrollY > 20))
	}
}

