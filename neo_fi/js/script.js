// Строгий режим
"use strict"

window.addEventListener(`load`, loadPage)
const html = document.documentElement

function loadPage() {
	html.classList.add(`loaded`)
	document.addEventListener(`click`, documentAction)
	slider()
	sliderNext()
	scrollHeader()
	scrollAnimation()
}

function documentAction(e) {
	const targetElement = e.target
	if (targetElement.closest(`.icon-menu`)) {
		html.classList.toggle(`menu-open`)
	}
	targetElement.closest(`.menu__link`) && html.classList.contains(`menu-open`) ? html.classList.remove(`menu-open`) : null

	// Спойлери
	if (targetElement.closest('summary')) {
		e.preventDefault()
		const spollerTitle = targetElement.closest('summary')
		const spoller = spollerTitle.closest('details')
		const spollerBody = spollerTitle.nextElementSibling

		if (!spollerBody.classList.contains('_slide')) {
			!spollerBody.hidden ?
				spoller.classList.contains('active') ? setTimeout(() => { spollerBody.hidden = true }, 500) : spollerBody.hidden = true
				: null
			!spoller.open ? spoller.open = true : setTimeout(() => { spoller.open = false }, 500)
			_slideToggle(spollerBody)
			spoller.classList.toggle('active')
		}
	}
}

// Delay
document.querySelectorAll(`.partners__img`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.4}s`
})
document.querySelectorAll(`.future__item`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.4}s`
})
document.querySelectorAll(`.product__item`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.4}s`
})
document.querySelectorAll(`.item-about__box`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.4}s`
})
document.querySelectorAll(`.faq__spoiler`).forEach((item, index) => {
	item.style.transitionDelay = `${index * 0.4}s`
})

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}
}

//  Scroll Animation
function scrollAnimation() {
	const options = {
		root: null,
		rootMargin: `0px 0px 0px 0px`,
		treshhold: 0.5,
	}
	const callBack = (entries, observer) => {
		entries.forEach(entry => {
			const currentElement = entry.target
			if (entry.isIntersecting) {
				currentElement.classList.add(`animate`)
			} else {
				currentElement.classList.remove(`animate`)
			}
		})
	}
	const observer = new IntersectionObserver(callBack, options)
	const target = document.querySelectorAll(`.anim`)
	target.forEach(target => {
		observer.observe(target)
	})
}

// Допоміжні модулі плавного розкриття та закриття об'єкта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = `${target.offsetHeight}px`;
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = !showmore ? true : false;
			!showmore ? target.style.removeProperty('height') : null;
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			!showmore ? target.style.removeProperty('overflow') : null;
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію 
			document.dispatchEvent(new CustomEvent("slideUpDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideDown = (target, duration = 500, showmore = 0) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.hidden = target.hidden ? false : null;
		showmore ? target.style.removeProperty('height') : null;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = showmore ? `${showmore}px` : `0px`;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
			// Створюємо подію
			document.dispatchEvent(new CustomEvent("slideDownDone", {
				detail: {
					target: target
				}
			}));
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

// Slider First
function slider() {
	const swiper = new Swiper('.swiper-first', {
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: `auto`,
				spaceBetween: 20,
			},
			// when window width is >= 480px
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			1440: {
				slidesPerView: 4,
				spaceBetween: 20
			}
		}
	})
}

// Slider next

function sliderNext() {
	const swiperNext = new Swiper('.swiper-next', {
		// Default parameters
		// Responsive breakpoints
		breakpoints: {
			// when window width is >= 320px
			320: {
				slidesPerView: `auto`,
				spaceBetween: 20,
			},
			// when window width is >= 480px
			768: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			// when window width is >= 640px
			1440: {
				slidesPerView: 4,
				spaceBetween: 20
			}
		}
	})
}