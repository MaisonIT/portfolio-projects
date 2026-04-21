// Строгий режим
"use strict"

window.addEventListener('load', loadPage)
const html = document.documentElement

// плавний показ сторінки запуск функцій кліку меню, відкриття спойлер меню
function loadPage(){
   html.classList.add(`loaded`)
   document.addEventListener(`click`, menuAction)
   document.addEventListener(`click`, openSpoilerEvents)
   scrollHeaeder()
   scrollAnimation()
   scrollTag()
}
// бурегр меню
function menuAction(e){
   const currentElement = e.target
   const menuBlock = document.querySelector(`.header-items__block`)
   const mainBlock = document.querySelector(`.main`)
   
   if (currentElement.closest(`.burger-menu`)){
      menuBlock.classList.toggle(`menu-open`)
      mainBlock.classList.toggle(`lock`)
   }

   currentElement.closest(`.header-items__list-link`) && menuBlock.closest(`.menu-open`) ? menuBlock.classList.remove(`menu-open`) : null

}

// зміна фону header по скролу
function scrollHeaeder(){
   window.addEventListener('scroll', scrollAction)

   function scrollAction() { 
      const header = document.querySelector(`.header-items`)
      header.classList.toggle(`header-scroll`, (scrollY > 20))
    }
}

// функція відкриття спойлера 
function openSpoilerEvents (e){
   const spoilerButton = e.target
   const menuSpoiler = document.querySelector(`.events__items-block`)

   if(spoilerButton.closest(`.spoiler-button`)){
spoilerButton.classList.toggle(`button-open`)
      menuSpoiler.classList.toggle(`spoiler-open`)
   }
}

// анімація палвного виведення блоків
function scrollAnimation() {
   const options = {
      root: null,
      rootMargin: `0px 0px 0px 0px`,
      theshold: 0.5,
   }

   const callBack = (entries, observer) => {
      entries.forEach(entry => {
         const currentElement = entry.target
         if(entry.isIntersecting){
            currentElement.classList.add(`animate`)
         } else {
            currentElement.classList.remove(`animate`)
         }
      })
   }

   const observer = new IntersectionObserver(callBack, options)
   const target = document.querySelectorAll(`.is-anim`)

   target.forEach(target =>{
      observer.observe(target)
   })
}

// scroller list
function scrollTag() {
	const scrollers = document.querySelectorAll(`.scroller`);

	if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
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

// Popup входу і логіну на Vue
const {createApp, ref, onMounted, onBeforeUnmount, computed} = Vue

createApp({
   setup() {
      const isOpen = ref(false)
      const mode = ref(`login`) // login | join
      const password = ref(``)

      const openPopup = (type = `login`) => {
         mode.value = type
         isOpen.value = true
         document.body.classList.add(`lock`)
      }

      const closePopup = () => {
         isOpen.value = false
         document.body.classList.remove(`lock`)
      }

      const handleDocumentClick = (event) => {
         const trigger = event.target.closest(`[data-auth]`)
         if (!trigger) return

         event.preventDefault()

         const type = trigger.dataset.auth || `login`
         openPopup(type)
      }

      const hanldeEsc = (event) =>{
         if(event.key === `Escape` && isOpen.value){
            closePopup()
         }
      }

      const hasMinLength = computed(() => password.value.length >= 8)
      const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>_\-\\/[\];'`~+=]/.test(password.value))

      onMounted(()=>{
         document.addEventListener(`click`, handleDocumentClick)
         document.addEventListener(`keydown`, hanldeEsc)
      })

      onBeforeUnmount (()=> {
         document.removeEventListener(`click`, handleDocumentClick)
         document.removeEventListener(`keydown`, hanldeEsc)
      })

      return {
         isOpen,
         mode,
         password,
         hasMinLength,
         hasSpecialChar,
         openPopup,
         closePopup
      }
   },
   template: `
      <div v-if="isOpen" class="popup popup--open" @click="closePopup">
      <div class="popup__items" @click.stop>
        <button class="popup__close" type="button" @click="closePopup">×</button>

        <h2 class="popup__title">
          {{ mode === 'login' ? 'Log In' : 'Join Now' }}
        </h2>

        <form action="#" class="popup__form">
          <div class="popup__item" v-if="mode === 'join'">
            <input id="name" name="name" placeholder=" " type="text" />
            <label for="name">Enter your name</label>
          </div>

          <div class="popup__item">
            <input id="email" name="email" placeholder=" " type="email" />
            <label for="email">Enter your email</label>
          </div>

          <div class="popup__item">
            <input id="pass" name="pass" placeholder=" " type="password" v-model="password" />
            <label for="pass">Enter your password</label>

             <ul class="popup__rules">
                     <li :class="{ valid: hasMinLength, invalid: password.length > 0 && !hasMinLength }">
                        Minimum 8 characters
                     </li>
                     <li :class="{ valid: hasSpecialChar, invalid: password.length > 0 && !hasSpecialChar }">
                        At least 1 special character
                     </li>
                  </ul>
          </div>

             <button class="popup__submit join" type="submit">
               {{ mode === 'login' ? 'Log In' : 'Create Account' }}
             </button>
        </form>
      </div>
    </div>
   `
}).mount(`#auth-popup-app`)