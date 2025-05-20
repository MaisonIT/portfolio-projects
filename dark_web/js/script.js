// Строгий режим
"use strict"

window.addEventListener(`load`, loadPage)
const html = document.documentElement

function loadPage() {
	document.addEventListener(`click`, documentAction)
	html.classList.add(`loaded`)
	slider()
	scrollHeader()
	plansAction()

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
				spoller.classList.contains('--active') ? setTimeout(() => { spollerBody.hidden = true }, 500) : spollerBody.hidden = true
				: null

			!spoller.open ? spoller.open = true : setTimeout(() => { spoller.open = false }, 500)

			_slideToggle(spollerBody)

			spoller.classList.toggle('--active')
		}
	}

	// План
	if (targetElement.closest('.switcher__button')) {
		const button = targetElement.closest('.switcher__button')
		if (!button.classList.contains('switcher__button--active')) {
			document.querySelector('.switcher__button--active').classList.remove('switcher__button--active')
			button.classList.add('switcher__button--active')
			plansAction()
		}
	}
}

// Scroll
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}

}


// Slider
function slider() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll--rotate',
			prevEl: '.controls__scroll--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: `1.8`,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1440: {
				spaceBetween: 30,
			}
		},
		pagination: {
			el: '.controls__pagination',
			clickable: true,
			bulletClass: `controls__element-item`,
			bulletActiveClass: `controls__element-item--active`,
		},
		scrollbar: {
			el: '.scroll__scrollbar',
			draggable: true,
		},
	});
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


// Plans
async function getPlans(activeType) {
	const response = await fetch('plans.json')
	if (response.ok) {
		const data = await response.json()
		plansShow(data, activeType)
	} else {
		console.log('Error')
	}
}
function plansShow(data, activeType) {
	const plansPrices = document.querySelectorAll(`.item-plan__price span`)
	const prices = data.price
	plansPrices.forEach((plansPrices, index) => {
		plansPrices.innerHTML = prices[index][activeType]
	})

}
function plansAction() {
	const activeType = document.querySelector(`.switcher__button--active`).dataset.type
	if (activeType) {
		getPlans(activeType)
	}
}
