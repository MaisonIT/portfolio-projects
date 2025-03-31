// Строгий режим
"use strict"

window.addEventListener(`load`, windowLoad)
const html = document.documentElement

function windowLoad() {
	document.addEventListener(`click`, documentActions)
	html.classList.add(`loaded`)
}
function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest('.menu__link') && html.classList.contains('menu-open') ? html.classList.remove('menu-open') : null
}
document.querySelectorAll(`.items-skills__item`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.5}s`
})
document.querySelectorAll(`.reference__item`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.5}s`
})