// Строгий режим
"use strict"

window.addEventListener(`load`, windowLoad)
const html = document.documentElement

function windowLoad() {
	document.addEventListener(`click`, documentActions)
	html.classList.add(`loaded`)
	scrollHeader()
}
function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest('.menu__link') && html.classList.contains('menu-open') ? html.classList.remove('menu-open') : null
}

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}

}