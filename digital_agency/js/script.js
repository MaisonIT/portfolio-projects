// строгий режим
"use strict"

window.addEventListener(`load`, windowOnLoad)
const html = document.documentElement

// додавання класу load після завантаження сторінки
function windowOnLoad() {
   html.classList.add(`load`)
   window.addEventListener(`click`, burgerAction)
   window.addEventListener(`keydown`, onKeyDown)
   scrollHeader()
   initBudgetSlider()
   actionButton()
}

// burger menu
function burgerAction(e) {
   const currentElement = e.target
   const burgerButton = document.querySelector(`.burger-menu`)
   const burgerMenu = document.querySelector(`.menu__item`)

   // додавання класу до кнопки та меню
   if (currentElement.closest(`.burger-menu`)) {
      burgerMenu.classList.toggle(`menu-open`)
      burgerButton.classList.toggle(`menu-open`)
      return
   }
   // видалення класу в кнопки і меню, якщо клік був поза меню
   if (!currentElement.closest(`.menu__link`) && burgerButton.classList.contains(`menu-open`) && burgerMenu.classList.contains(`menu-open`)) {
      burgerButton.classList.remove(`menu-open`)
      burgerMenu.classList.remove(`menu-open`)
   }

   // видалення класу якщо було натиснуто кнопку меню
   if (currentElement.closest(`.menu__link`) && burgerMenu.classList.contains(`menu-open`)) {
      burgerMenu.classList.remove(`menu-open`)
      burgerButton.classList.remove(`menu-open`)
   } else null

   if (currentElement.closest(`summary`)) {
      e.preventDefault()
      const spoilerTitle = currentElement.closest(`summary`)
      const spoiler = spoilerTitle.closest(`details`)
      const spoilerBody = spoilerTitle.nextElementSibling

      // розкриття спойлера
      if (!spoilerBody.classList.contains(`_slide`)) {
         !spoilerBody.hidden ?
            spoiler.classList.contains(`active`) ? setTimeout(() => {
               spoilerBody.hidden = true
            }, 500) : spoilerBody.hidden = true : null

         !spoiler.open ? spoiler.open = true : setTimeout(() => {
            spoiler.open = false
         }, 500)

         _slideToggle(spoilerBody)
         spoiler.classList.toggle(`active`)
      }
   }
}

// додавання класу на кнопку меню в хедері
function actionButton() {
   document.querySelectorAll(`.menu__link`).forEach(link => {
      const currentUrl = window.location.href
      if (currentUrl.includes(link.getAttribute(`href`))) {
         link.classList.add(`active-button`)
      } else {
         link.classList.remove(`active-button`)
      }
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

// видалення класів при натисканні на esc
function onKeyDown(e) {
   const burgerButton = document.querySelector(`.burger-menu`)
   const burgerMenu = document.querySelector(`.menu__item`)
   if (e.key === `Escape` && burgerButton.classList.contains(`menu-open`) && burgerMenu.classList.contains(`menu-open`)) {
      burgerButton.classList.remove(`menu-open`)
      burgerMenu.classList.remove(`menu-open`)
   }
}

// scroll header
function scrollHeader() {
   const header = document.querySelector(`.header`)
   window.addEventListener(`scroll`, scrollAction)

   function scrollAction() {
      header.classList.toggle(`header-scroll`, (scrollY > 20))
   }
}

// budget-slider
function initBudgetSlider() {
   const minRange = document.querySelector('.budget-slider__range--min');
   const maxRange = document.querySelector('.budget-slider__range--max');
   const fill = document.querySelector('.budget-slider__fill');
   const minValue = document.querySelector('.budget-slider__min-value');
   const maxValue = document.querySelector('.budget-slider__max-value');

   if (!minRange || !maxRange || !fill || !minValue || !maxValue)
      return



   function updateSlider() {
      const min = parseInt(minRange.value);
      const max = parseInt(maxRange.value);
      const total = maxRange.max;

      // не даємо повзункам перетинатись
      if (min >= max) {
         minRange.value = max - 100;
         return;
      }

      const leftPercent = (min / total) * 100;
      const rightPercent = (max / total) * 100;

      fill.style.left = leftPercent + '%';
      fill.style.width = (rightPercent - leftPercent) + '%';

      minValue.textContent = '$' + min;
      maxValue.textContent = '$' + max;
   }

   minRange.addEventListener('input', updateSlider);
   maxRange.addEventListener('input', updateSlider);

   updateSlider();
}

