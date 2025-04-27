// Строгий режим
"use strict"

window.addEventListener(`load`, windowLoad)
const html = document.documentElement

function windowLoad() {
	html.classList.add(`loaded`)
	scrollTag()
	scrollHeader()
}

// Swiper
function scrollTag() {

	const scrollers = document.querySelectorAll(`.scroller`);

	if (!window.matchMedia(`(prefes-reduced-motion: reduce)`).matches) {
		addAnimation()
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

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}
}