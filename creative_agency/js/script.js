// Строгий режим
"use strict"

window.addEventListener(`load`, windowLoad)
const html = document.documentElement

function windowLoad() {
	document.addEventListener(`click`, documentAction)
	html.classList.add(`loaded`)
	scrollTag()
	swiperAction()
	scrollHeader()
	swiperClientAction()
}

function documentAction(e) {
	const targetElement = e.target

	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu__link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null
}

// Counter
window.addEventListener('DOMContentLoaded', () => {
	const counters = document.querySelectorAll('.static__head');

	counters.forEach(counter => {
		const target = +counter.getAttribute('data-target');
		const span = counter.querySelector('span');
		let count = 0;
		const speed = 40;

		const updateCount = () => {
			if (count < target) {
				count++;
				counter.childNodes[0].nodeValue = count;
				setTimeout(updateCount, speed);
			} else {
				counter.childNodes[0].nodeValue = target;
			}
		};

		updateCount();
	});
});

// Swiper
function scrollTag() {

	const scrollers = document.querySelectorAll(`.scroller`);

	if (!window.matchMedia(`(prefes-reduced-motion: reduce)`).matches) {
		// addAnimation()
	}

	function addAnimation() {
		scrollers.forEach((scroller) => {
			scroller.setAttribute(`data-animated`, true)

			const scrollerInner = scroller.querySelector(`.scroller__inner`)
			const scrollerContent = Array.from(scrollerInner.children)

			scrollerContent.forEach(item => {
				const duplicatedItem = item.cloneNode(true)
				duplicatedItem.setAttribute(`aria-hidden`, true)
				scrollerInner.appendChild(duplicatedItem)
			})
		});
	}
}

// Swiper
function swiperAction() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: `auto`,
		spaceBetween: 30,
		loop: true,
		// Navigation arrows
		navigation: {
			nextEl: '.projects__arrow--right',
			prevEl: '.projects__arrow--left',
		},
	});
}
function swiperClientAction() {
	const swiperClient = new Swiper('.swiper-client', {
		slidesPerView: `1`,
		spaceBetween: 60,
		loop: true,
		centeredSlides: true,
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: 1,
				spaceBetween: 20
			},
			// when window width is >= 640px
			640: {
				slidesPerView: 2,
				spaceBetween: 60
			}
		},
		effect: `coverflow`,
		coverflowEffect: {
			rotate: 0,
			slideShadows: false,
			scale: 1,
		},
		pagination: {
			el: '.testemonials__actions',
			clickable: true,
			bulletClass: `testemonials__actions-item`,
			bulletActiveClass: `testemonials__actions-item--active`,
		},
	});
}

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header--scroll`, (scrollY > 20))
	}
}