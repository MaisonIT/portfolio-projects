// Строгий режим
"use strict"
window.addEventListener(`load`, pageLoader);
const html = document.documentElement;
function pageLoader() {
	html.classList.add(`loaded`);
	document.addEventListener(`click`, actionClick);
	document.addEventListener(`click`, blogOpen);
	headerScroll()
	swiperShop()
	swiperTestimonials()
}

function actionClick(e) {
	const target = e.target;
	if (target.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	target.closest(`.menu__link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null
}

function headerScroll() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`);
		header.classList.toggle(`header--scroll`, (scrollY > 20))
	}
}

// Slider-shop
function swiperShop() {
	const swiper = new Swiper('.swiper-shop', {
		slidesPerView: `auto`,
		spaceBetween: 15
	});
}

// Slider testimonials
function swiperTestimonials() {
	const swiper = new Swiper(`.swiper-testimonials`, {
		slidesPerView: `auto`,
		navigation: {
			nextEl: '.swiper-testimonials-next',
			prevEl: '.swiper-testimonials-prev',
		},
		pagination: {
			el: '.testimonials__pagination',
			clickable: true,
			bulletClass: `testimonials__pagination-bullet`,
			bulletActiveClass: `testimonials__pagination-bullet--active`,
		},
	});
}

// Blog open
function blogOpen(e) {
	const target = e.target;
	const blog = document.getElementById(`blog-open`);
	if (target.closest(`.blog__button`)) {
		blog.classList.toggle(`blog-open`);
	}
	if (!target.closest(`.blog__button`)) {
		blog.classList.remove(`blog-open`)
	}
}

