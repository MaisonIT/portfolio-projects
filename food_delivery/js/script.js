// Строгий режим
"use strict"

window.addEventListener(`load`, pageLoad)
const html = document.documentElement

function pageLoad() {
	html.classList.add(`loaded`)
	document.addEventListener(`click`, documentAction)
	swiperMenu()
	scrollHeader()
}

function documentAction(e) {
	const targetElement = e.target
	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu__link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null
}

// Catalog
const buttons = document.querySelectorAll(".switch-button");
const contents = document.querySelectorAll(".catalog");

buttons.forEach(button => {
	button.addEventListener("click", () => {
		const target = button.dataset.tab;

		buttons.forEach(btn => btn.classList.remove("active"));
		contents.forEach(content => content.classList.remove("active"));

		button.classList.add("active");
		document.getElementById(target).classList.add("active");
	});
});

// Swiper Menu

function swiperMenu() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: `auto`,
		spaceBetween: 35,
		loop: false,
		navigation: {
			nextEl: '.swiper-button--next',
			prevEl: '.swiper-button--prev',
		},
	});
}

// Scroll Header

function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}
}