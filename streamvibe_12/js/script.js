// Строгий режим
"use strict"

window.addEventListener('load', windowLoad);
const html = document.documentElement;

function windowLoad() {
	document.addEventListener('click', documentActions);
	document.addEventListener('keydown', documentActions);
	html.classList.add('loaded');
	slidersInit()
	scrollActions()
	faqBuild()
	plansAction()
	initRating()
}

function documentActions(e) {
	const type = e.type
	const targetElement = e.target

	if (type === 'click') {
		// Меню-бургер
		if (targetElement.closest('.icon-menu')) {
			html.classList.toggle('menu-open');
			bodyLock(html.classList.contains('menu-open'))
		}
		if (targetElement.closest('.menu__link') && html.classList.contains('menu-open')) {
			html.classList.remove('menu-open')
			bodyLock(false)
		}

		// Попап
		// Закриття
		if (document.querySelector('.popup--open') && (!targetElement.closest('.body-popup') || targetElement.closest('.body-popup__close'))) {
			popupClose()
		}
		// Відкриття
		if (targetElement.closest('[data-popup]')) {
			const curentElement = targetElement.closest('[data-popup]')
			popupOpen(curentElement)
		}

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
		if (targetElement.closest('.switcher__item')) {
			const button = targetElement.closest('.switcher__item')
			if (!button.classList.contains('switcher__item--active')) {
				document.querySelector('.switcher__item--active').classList.remove('switcher__item--active')
				button.classList.add('switcher__item--active')
				plansAction()
			}
		}

		// Форми
		if (targetElement.closest('.select__value')) {
			const selectValue = targetElement.closest('.select__value')
			const select = selectValue.closest('.select')
			select.classList.toggle('--select-open')

		}
		if (targetElement.closest('.select__item')) {
			const selectItem = targetElement.closest('.select__item')
			const selectItemValue = +selectItem.dataset.value
			const selectItemContent = selectItem.innerHTML
			const select = selectItem.closest('.select')
			const selectValue = select.querySelector('.select__value')
			const inputValue = select.nextElementSibling

			inputValue.value = selectItemValue
			selectValue.innerHTML = selectItemContent

			select.classList.remove('--select-open')

		}
		if (!targetElement.closest('.select') && targetElement.querySelector('.select.--select-open')) {
			targetElement.querySelector('.select.--select-open').classList.remove('--select-open')
		}

	} else if (type === 'keydown') {
		const key = e.key
		if (key === 'Escape') {
			document.querySelector('.popup--open') ? popupClose() : null
			// ....
		}
	}
}
function popupClose() {
	const curentPopup = document.querySelector('.popup--open')
	curentPopup.classList.remove('popup--open')
	setTimeout(() => {
		bodyLock(false)
	}, 500);
}
function popupOpen(curentElement) {
	const curentPopup = document.querySelector(curentElement.dataset.popup)
	if (curentPopup) {
		bodyLock(true)
		curentPopup.classList.add('popup--open')
	} else {
		console.log('Такого попапу не існує')
	}
}
function bodyLock(mode) {
	let lockPaddingValue = (window.innerWidth - document.body.offsetWidth) + 'px'
	lockPaddingValue = mode ? lockPaddingValue : 0;
	document.body.style.paddingInlineEnd = lockPaddingValue

	const paddingLockElements = document.querySelectorAll('[data-pl]')
	paddingLockElements.forEach(paddingLockElement => {
		if (paddingLockElement.dataset.pl === 'inset') {
			paddingLockElement.style.insetInlineEnd = lockPaddingValue
		} else {
			paddingLockElement.style.paddingInlineEnd = lockPaddingValue
		}
	});
	document.documentElement.classList.toggle('lock', mode)
}

// Swiper
function slidersInit() {
	if (document.querySelector('.items-slider__list')) {
		const sliderListFiveItems = new Swiper('.items-slider__list', {
			//slidesPerGroup: 5,
			//slidesPerView: 5,
			//spaceBetween: 30,
			//loop: true,
			// Navigation arrows
			autoHeight: true,
			navigation: {
				prevEl: '.slider-controls__arrow--left',
				nextEl: '.slider-controls__arrow--right',
			},
			// If we need pagination
			pagination: {
				el: '.slider-controls__bullets',
				clickable: true,
				bulletClass: `slider-controls__bullet-item`,
				bulletActiveClass: `slider-controls__bullet-item--active`,
			},
			scrollbar: {
				snapOnRelease: true,
				dragSize: 20,
				el: '.items-slider__scrollbar',
			},
			breakpoints: {
				// when window width is >= 480px
				320: {
					slidesPerView: 1.8,
					spaceBetween: 20
				},
				// when window width is >= 600px
				600: {
					slidesPerView: 3,
					spaceBetween: 20
				},
				// when window width is >= 800px
				850: {
					slidesPerGroup: 1,
					slidesPerView: 4,
					spaceBetween: 20
				},
				992: {
					slidesPerGroup: 4,
					slidesPerView: 4,
					spaceBetween: 20
				},
				// when window width is >= 1200px
				1200: {
					slidesPerGroup: 5,
					slidesPerView: 5,
					spaceBetween: 30
				}
			}
		});
	}
	if (document.querySelector('.cast-slider')) {
		const sliderCast = new Swiper('.cast-slider', {
			//slidesPerGroup: 5,
			//slidesPerView: 5,
			//spaceBetween: 30,
			//loop: true,
			// Navigation arrows
			autoHeight: false,
			navigation: {
				prevEl: '.controls-cast-slider__arrow--left',
				nextEl: '.controls-cast-slider__arrow--right',
			},
			breakpoints: {
				// when window width is >= 
				320: {
					slidesPerView: 3,
					spaceBetween: 10
				},
				380: {
					slidesPerView: 3,
					spaceBetween: 10
				},
				430: {
					slidesPerView: 5,
					spaceBetween: 10
				},
				// when window width is >= 
				560: {
					slidesPerView: 6,
					spaceBetween: 10
				},
				// when window width is >= 
				768: {
					slidesPerView: 7,
					spaceBetween: 15
				},
				// when window width is >= 
				900: {
					slidesPerView: 8,
					spaceBetween: 20
				},
				1200: {
					slidesPerView: 7,
					spaceBetween: 15
				},
				// when window width is >= 
				1500: {
					slidesPerView: 8,
					spaceBetween: 20
				}
			}
		});
	}
	if (document.querySelector('.reviews-slider')) {
		const sliderListFiveItems = new Swiper('.reviews-slider', {
			//slidesPerGroup: 5,
			//slidesPerView: 5,
			//spaceBetween: 30,
			//loop: true,
			// Navigation arrows
			autoHeight: true,
			navigation: {
				prevEl: '.controls-reviews-slider__arrow--left',
				nextEl: '.controls-reviews-slider__arrow--right',
			},
			// If we need pagination
			pagination: {
				el: '.controls-reviews-slider__bullets',
				clickable: true,
				bulletClass: `controls-reviews-slider__bullet-item`,
				bulletActiveClass: `controls-reviews-slider__bullet-item--active`,
			},
			breakpoints: {
				// when window width is >= 600px
				320: {
					slidesPerGroup: 1,
					slidesPerView: 1,
					spaceBetween: 10
				},
				880: {
					slidesPerGroup: 2,
					slidesPerView: 2,
					spaceBetween: 20
				},
				// when window width is >= 1200px
				1200: {
					slidesPerGroup: 1,
					slidesPerView: 1,
					spaceBetween: 20
				},
				// when window width is >= 1200px
				1450: {
					slidesPerGroup: 2,
					slidesPerView: 2,
					spaceBetween: 30
				}
			}
		});
	}

}
// Робота зі скролом
function scrollActions() {
	window.addEventListener('scroll', scrollAction)

	function scrollAction() {
		// Робота з шапкою
		const header = document.querySelector('.header')
		header.classList.toggle('header--scroll', (scrollY > 20))
	}

	const options = {
		root: null,
		rootMargin: "0px 0px 0px 0px",
		// Відсоток від розміру об'єкту.
		// При появі якого спрацьовує подія
		// Де 0 це будь яка поява
		// 1 це повна поява об'кта в в'юпорті
		threshold: 0.2,
	}
	const callback = (entries, observer) => {
		entries.forEach(entry => {
			const currentElement = entry.target
			if (entry.isIntersecting) {
				currentElement.classList.add('--animate')
				//console.log('я тебе бачу')
			} else {
				//currentElement.classList.remove('--animate')
				//console.log('я тебе не бачу')
			}
		})
	}
	const observer = new IntersectionObserver(callback, options)

	const animElements = document.querySelectorAll('[class*="--anim"]')
	animElements.forEach(animElement => {
		observer.observe(animElement)
	})
}
// FAQ побудова структури
function faqBuild() {
	const faqItems = document.querySelectorAll('.item-faq')
	if (faqItems.length) {
		const faqBody = document.querySelector('.faq__body')
		let faqTemplate = `<div class="faq__column">`
		faqItems.forEach((faqItem, index) => {
			faqTemplate += faqItem.outerHTML // Отрумуємо рядок(String), повну HTML-структуру з об'єкту
			++index === Math.ceil(faqItems.length / 2) ? faqTemplate += `</div><div class="faq__column">` : null
		});
		faqTemplate += `</div>`
		faqBody.innerHTML = faqTemplate
	}
}
// Plans
async function getPlans(activeType) {
	const response = await fetch('../json/plans.json')
	if (response.ok) {
		const data = await response.json()
		plansShow(data, activeType)
	} else {
		console.log('Error')
	}
}
function plansShow(data, activeType) {
	const plansPrices = document.querySelectorAll('.item-plan__price span')
	const prices = data.price

	plansPrices.forEach((plansPrice, index) => {
		plansPrice.innerHTML = prices[index][activeType]
	});

}
function plansAction() {
	const activeSwitcher = document.querySelector('.switcher__item--active');
	if (activeSwitcher) {
		const activeType = activeSwitcher.dataset.type
		if (activeType) {
			getPlans(activeType)
		}
	}
}

// Rating
function initRating() {
	const ratingItems = document.querySelectorAll('.rating')
	if (ratingItems.length) {
		ratingItems.forEach(ratingItem => {
			const ratingActive = ratingItem.querySelector('.rating__active')
			const ratingValue = parseFloat(ratingItem.querySelector('.rating__value').innerHTML) ? parseFloat(ratingItem.querySelector('.rating__value').innerHTML) : 0
			const ratingPercent = ratingValue / 5 * 100
			ratingActive.style.width = `${ratingPercent}%`
		});
	}
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
