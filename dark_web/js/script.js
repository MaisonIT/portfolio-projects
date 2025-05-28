// Строгий режим
"use strict"

window.addEventListener(`load`, loadPage)
const html = document.documentElement

function loadPage() {
	document.addEventListener(`click`, documentAction)
	html.classList.add(`loaded`)
	sliderExplore()
	scrollHeader()
	plansAction()
	sliderMovies()
	sliderGenresMovies()
	sliderPopularMovies()
	sliderTrendingMovies()
	sliderReleaseMovies()
	sliderMustMovies()
	sliderGenresShows()
	sliderPopularShows()
	sliderTrendingShows()
	sliderReleaseShows()
	sliderMustShows()

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

// Scroll header
function scrollHeader() {
	window.addEventListener(`scroll`, scrollAction)

	function scrollAction() {
		const header = document.querySelector(`.header`)
		header.classList.toggle(`header-scroll`, (scrollY > 20))
	}

}

// Slider Main
function sliderMovies() {
	const swiper = new Swiper('.present__swiper', {
		slidesPerView: `auto`,
		// loop: false,
		navigation: {
			nextEl: '.controls__swipe-main--next',
			prevEl: '.controls__swipe-main--prev',
		},
		pagination: {
			el: '.controls__main-slide',
			clickable: true,
			bulletClass: `controls__element-main-slide`,
			bulletActiveClass: `controls__element-main-slide--active`,
		},
	});
}
// Slider Explore
function sliderExplore() {
	const swiper = new Swiper('.swiper-explore', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-explore--next',
			prevEl: '.controls__scroll-explore--prev',
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
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Slider Genres (movies)
function sliderGenresMovies() {
	const swiper = new Swiper('.swiper-genres', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-genres--next',
			prevEl: '.controls__scroll-genres--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
				spaceBetween: 16,
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
			el: '.controls__genres-slide',
			clickable: true,
			bulletClass: `controls__element-genres-slide`,
			bulletActiveClass: `controls__element-genres-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Slider Popular (movies)
function sliderPopularMovies() {
	const swiper = new Swiper('.swiper-popular', {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-popular--next',
			prevEl: '.controls__scroll-popular--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
				spaceBetween: 16,
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
			el: '.controls__popular-slide',
			clickable: true,
			bulletClass: `controls__element-popular-slide`,
			bulletActiveClass: `controls__element-popular-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});

}
// Slider Trending (movies)
function sliderTrendingMovies() {
	const swiper = new Swiper('.swiper-trending', {
		slidesPerView: 5,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-trending--next',
			prevEl: '.controls__scroll-trending--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
				spaceBetween: 16,
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
			el: '.controls__trending-slide',
			clickable: true,
			bulletClass: `controls__element-trending-slide`,
			bulletActiveClass: `controls__element-trending-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Slider Release (movies)
function sliderReleaseMovies() {
	const swiper = new Swiper('.swiper-release', {
		slidesPerView: 5,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-release--next',
			prevEl: '.controls__scroll-release--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
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
			el: '.controls__release-slide',
			clickable: true,
			bulletClass: `controls__element-release-slide`,
			bulletActiveClass: `controls__element-release-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Sider Must (movies)
function sliderMustMovies() {
	const swiper = new Swiper('.swiper-must', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-must--next',
			prevEl: '.controls__scroll-must--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: `4`,
			}
		},
		pagination: {
			el: '.controls__must-slide',
			clickable: true,
			bulletClass: `controls__element-must-slide`,
			bulletActiveClass: `controls__element-must-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}

// Slider Genres (shows)
function sliderGenresShows() {
	const swiper = new Swiper('.swiper-genres-shows', {
		slidesPerView: 5,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-genres-shows--next',
			prevEl: '.controls__scroll-genres-shows--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
				spaceBetween: 16,
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
			el: '.controls__genres-shows-slide',
			clickable: true,
			bulletClass: `controls__element-genres-shows-slide`,
			bulletActiveClass: `controls__element-genres-shows-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Slider Popular (shows)
function sliderPopularShows() {
	const swiper = new Swiper('.swiper-popular-shows', {
		slidesPerView: 4,
		spaceBetween: 30,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-popular-shows--next',
			prevEl: '.controls__scroll-popular-shows--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.8,
				spaceBetween: 16,
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
			el: '.controls__popular-shows-slide',
			clickable: true,
			bulletClass: `controls__element-popular-shows-slide`,
			bulletActiveClass: `controls__element-popular-shows-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});

}
// Sider Trending (shows)
function sliderTrendingShows() {
	const swiper = new Swiper('.swiper-trending-shows', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-trending-shows--next',
			prevEl: '.controls__scroll-trending-shows--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: `4`,
			}
		},
		pagination: {
			el: '.controls__trending-shows-slide',
			clickable: true,
			bulletClass: `controls__element-trending-shows-slide`,
			bulletActiveClass: `controls__element-trending-shows-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Sider Release (shows)
function sliderReleaseShows() {
	const swiper = new Swiper('.swiper-release-shows', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-release-shows--next',
			prevEl: '.controls__scroll-release-shows--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: `4`,
			}
		},
		pagination: {
			el: '.controls__release-shows-slide',
			clickable: true,
			bulletClass: `controls__element-release-shows-slide`,
			bulletActiveClass: `controls__element-release-shows-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
			draggable: true,
		},
	});
}
// Sider Must (shows)
function sliderMustShows() {
	const swiper = new Swiper('.swiper-must-shows', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: false,
		navigation: {
			nextEl: '.controls__scroll-must-shows--next',
			prevEl: '.controls__scroll-must-shows--prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.3,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			1440: {
				slidesPerView: `4`,
			}
		},
		pagination: {
			el: '.controls__must-shows-slide',
			clickable: true,
			bulletClass: `controls__element-must-shows-slide`,
			bulletActiveClass: `controls__element-must-shows-slide--active`,
		},
		scrollbar: {
			el: '.scrollbar',
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
	const response = await fetch('json/plans.json')
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
	const activeSwitcher = document.querySelector('.switcher__button--active');
	if (activeSwitcher) {
		const activeType = activeSwitcher.dataset.type
		if (activeType) {
			getPlans(activeType)
		}
	}
}
// Catalog
const buttons = document.querySelectorAll(".switch__button");
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
// Active header
document.querySelectorAll('.menu__link').forEach(link => {
	const currentUrl = window.location.href;

	if (currentUrl.includes(link.getAttribute('href'))) {
		link.classList.add('active');
	} else {
		link.classList.remove('active');
	}
});