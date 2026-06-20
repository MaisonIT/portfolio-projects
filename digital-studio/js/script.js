"use strict"

const html = document.documentElement

const burgerButton = document.querySelector('.burger-menu'); // Твій клас кнопки-бургер
const burgerMenu = document.querySelector('.nav-menu');

window.addEventListener(`load`, loadPage)

function loadPage() {
   html.classList.add(`load`)

   // active buttons menu nav
   actionButton()

   // burger menu
   html.addEventListener(`click`, burgerAction)

   // footer modal
   footerModal()

   // scroll to top button
   scrollToTop()

   // animation page
   scrollAnimation()

   // portfolio filter
   portfolioFilter()

   // form actions
   initLiveForm()

   // Згода на обробку даних
   initCookieConsent()
}

// active buttons menu nav
function actionButton() {

   let currentPage = window.location.pathname.split('/').pop();

   if (currentPage === '') {

      currentPage = 'index.html';

   }

   document.querySelectorAll(`.nav-menu__list-link`).forEach(link => {

      const linkHref = link.getAttribute(`href`);

      if (linkHref === currentPage) {

         link.classList.add(`active`);

      } else {

         link.classList.remove(`active`);

      }

   });

}

// burger menu
function burgerAction(e) {
   const target = e.target

   if (target.closest(`.burger-menu`)) {
      burgerButton.classList.toggle(`active`)
      burgerMenu.classList.toggle(`active`)

      return
   }

   if (target.closest(`.nav-menu__list-link`) && burgerMenu.classList.contains(`active`)) {
      burgerButton.classList.remove(`active`)
      burgerMenu.classList.remove(`active`)
   }

   if (!target.closest(`.nav-menu__list-item`) && burgerMenu.classList.contains(`active`)) {
      burgerButton.classList.remove(`active`)
      burgerMenu.classList.remove(`active`)
   }
}

// scroll to top button
function scrollToTop() {
   const scrollTopBtn = document.querySelector('.scroll-top');

   if (scrollTopBtn) {
      // 1. Слідкуємо за скролом: показуємо кнопку, якщо прокрутили більше 400px
      window.addEventListener('scroll', () => {
         if (window.scrollY > 400) {
            scrollTopBtn.classList.add('is-visible');
         } else {
            scrollTopBtn.classList.remove('is-visible');
         }
      });

      // 2. Логіка плавного скролу вгору при кліку
      scrollTopBtn.addEventListener('click', () => {
         window.scrollTo({
            top: 0,
            behavior: 'smooth' // забезпечує плавний скрол
         });
      });
   }
}

// modal popup rights and terms
function footerModal() {
   const modalTexts = {
      privacy: `
      <p><strong>Політика конфіденційності Petrushov Digital Studio</strong></p>
      <p>Ми збираємо ваші персональні дані (ім'я, email, телефон) виключно для зв'язку з вами щодо ваших проєктів.</p>
      <p>Ми гарантуємо, що ваші дані не будуть передані третім особам або використані для спаму. Ви маєте право в будь-який момент попросити нас видалити вашу інформацію з нашої бази.</p>
   `,
      terms: `
      <p><strong>Умови використання сайту</strong></p>
      <p>Усі матеріали, дизайн, кейси та коди, розміщені на цьому сайті, є інтелектуальною власністю Petrushov Digital Studio.</p>
      <p>Будь-яке копіювання або використання контенту без прямого посилання на першоджерело заборонено. Інформація про ціни на розробку є ознайомчою і фіксується індивідуально в договорі.</p>
   `
   };

   const modal = document.getElementById('info-modal');
   if (!modal) return;

   const modalTitle = document.getElementById('modal-title');
   const modalText = document.getElementById('modal-text');
   const modalClose = modal.querySelector('.modal__close') || modal.querySelector('.modal-success__close-btn');

   // Функція для плавного закриття
   const closeModal = () => {
      modal.classList.remove('is-open', 'active');
      document.body.classList.remove('lock'); // повертаємо скрол сайту
   };

   // Функція для зміни контенту з мікро-анімацією перемикання
   const changeContent = (title, htmlContent) => {
      // Якщо модалка вже відкрита (користувач клікає з однієї на іншу)
      if (modal.classList.contains('is-open') || modal.classList.contains('active')) {
         modal.classList.remove('is-open', 'active'); // спочатку гасимо

         // Чекаємо 200мс, поки відпрацює CSS opacity fade-out, і міняємо текст всередині
         setTimeout(() => {
            modalTitle.textContent = title;
            modalText.innerHTML = htmlContent;
            modal.classList.add('is-open', 'active'); // плавно показуємо з новим текстом
         }, 200);
      } else {
         // Якщо вона була повністю закрита — відкриваємо стандартно
         modalTitle.textContent = title;
         modalText.innerHTML = htmlContent;
         modal.classList.add('is-open', 'active');
         document.body.classList.add('lock'); // блокуємо скрол сторінки
      }
   };

   // Слідкуємо за кліками на посилання у футері
   document.getElementById('link-privacy')?.addEventListener('click', (e) => {
      e.preventDefault();
      changeContent("Політика конфіденційності", modalTexts.privacy);
   });

   document.getElementById('link-terms')?.addEventListener('click', (e) => {
      e.preventDefault();
      changeContent("Умови використання", modalTexts.terms);
   });

   // Закриття при кліку на хрестик
   modalClose?.addEventListener('click', closeModal);

   // 🌟 ОПТИМІЗАЦІЯ КЛІКУ НА ФОН:
   // Шукаємо оверлей всередині твоєї модалки (або перевіряємо, чи клікнули на сам фон)
   modal.addEventListener('click', (e) => {
      const isOverlay = e.target.classList.contains('modal__overlay') || e.target.classList.contains('modal-success__overlay') || e.target === modal;
      if (isOverlay) {
         closeModal();
      }
   });

   // Закриття при натисканні на Escape
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && (modal.classList.contains('is-open') || modal.classList.contains('active'))) {
         closeModal();
      }
   });
}

// animation page
function scrollAnimation() {
   const options = {
      root: null,
      rootMargin: `0px 0px -50px 0px`,
      threshold: 0.02,
   }

   const callBack = (entries, observer) => {
      entries.forEach(entry => {
         const currentElement = entry.target
         if (entry.isIntersecting) {
            currentElement.classList.add(`is-visible`)
            observer.unobserve(currentElement)
         }
      })
   }
   const observer = new IntersectionObserver(callBack, options)
   const target = document.querySelectorAll(`.anim`)
   target.forEach(target => {
      observer.observe(target)
   })
}

// delay animathion
document.querySelectorAll(`.services__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.portfolio__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.1}s`
})
document.querySelectorAll(`.price__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.item-develop`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.about__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.values__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.team__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.process__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})
document.querySelectorAll(`.project__item`).forEach((item, index) => {
   item.style.transitionDelay = `${index * 0.3}s`
})



// filters portfolio cards
function portfolioFilter() {
   const filterButtons = document.querySelectorAll('.portfolio__list-button');
   const portfolioItems = document.querySelectorAll('.item-portfolio');

   if (!filterButtons.length || !portfolioItems.length) return;

   filterButtons.forEach(button => {
      button.addEventListener('click', () => {
         const currentFilter = button.getAttribute('data-filter');

         // Перемикання активного класу на кнопках (li)
         filterButtons.forEach(btn => btn.parentElement.classList.remove('active'));
         button.parentElement.classList.add('active');

         portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (currentFilter === 'all' || currentFilter === itemCategory) {
               // Показуємо картку
               item.classList.remove('is-hidden');
            } else {
               // Ховаємо картку
               item.classList.add('is-hidden');
            }
         });
      });
   });
}

// form actions
function initLiveForm() {
   const form = document.querySelector('.project__form.form');
   if (!form) return;

   // Логіка для модального вікна успіху
   const successModal = document.querySelector('#modal-success');

   const closeModal = () => {
      if (successModal) {
         successModal.classList.remove('is-open');
         document.body.classList.remove('lock');
      }
   };

   // Надійна ініціалізація закриття модалки (хрестик та фон)
   if (successModal) {
      const closeBtn = successModal.querySelector('.modal-success__close-btn');
      const overlay = successModal.querySelector('.modal-success__overlay');

      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (overlay) overlay.addEventListener('click', closeModal);
   }

   // Функція валідації окремого поля
   function validateField(input) {
      const value = input.value.trim();
      const formBlock = input.closest('.form__block');
      let isValid = true;

      // Перевіряємо тільки якщо поле обов'язкове, або якщо воно не порожнє
      if (input.hasAttribute('required') && value === '') {
         isValid = false;
      } else if (value !== '') {
         if (input.classList.contains('form__input--email')) {
            // Строга регулярка на латиницю
            const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            isValid = emailRegex.test(value);
         } else if (input.classList.contains('form__input--tel')) {
            const cleanValue = value.replace(/\s+/g, ''); // прибираємо пробіли

            // 1. Перевірка для України: починається з +380, 380 або 0, і далі 9 цифр номера
            const uaRegex = /^(\+?380|0)\d{9}$/;

            // 2. Перевірка для закордону: обов'язковий "+" на початку, код країни (1-3 цифри) і сам номер
            const intlRegex = /^\+\d{1,3}\d{7,14}$/;

            // Валідно, якщо підходить хоча б під один стандарт
            isValid = uaRegex.test(cleanValue) || intlRegex.test(cleanValue);

            // Захист від тупого спаму однаковими цифрами (наприклад, 11111111)
            if (isValid && /^(.)\1+$/.test(cleanValue.replace(/\D/g, ''))) {
               isValid = false;
            }
         }
      }

      if (formBlock) {
         if (isValid) {
            formBlock.classList.remove('is-invalid');
            formBlock.classList.add('is-valid');
         } else {
            formBlock.classList.remove('is-valid');
            formBlock.classList.add('is-invalid');
         }
      }

      return isValid;
   }

   // Слідкуємо за відправкою форми
   form.addEventListener('submit', function (e) {
      e.preventDefault();

      const inputs = form.querySelectorAll('.form__input[required]');
      let isFormValid = true;

      inputs.forEach(input => {
         if (!validateField(input)) {
            isFormValid = false;
         }
      });

      if (!isFormValid) return;

      // Знаходимо кнопку сабміту
      const submitBtn = form.querySelector('.buttons__button--submit');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Відправити заявку';

      if (submitBtn) {
         submitBtn.innerHTML = '<span>Відправка...</span>';
         submitBtn.disabled = true;
      }

      // Збір даних з полів
      const name = form.querySelector('.form__input--name')?.value.trim() || 'Не вказано';
      const email = form.querySelector('.form__input--email')?.value.trim() || 'Не вказано';
      const phone = form.querySelector('.form__input--tel')?.value.trim() || 'Не вказано';
      const message = form.querySelector('.form__textarea')?.value.trim() || 'Без повідомлення';

      // 🌟 НАДІЙНИЙ ТА БЕЗПЕЧНИЙ ЗАПИТ НА СЕРВЕРНУ ФУНКЦІЮ VERCEL
      fetch('/api/send-message', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ name, email, phone, message })
      })
         .then(response => {
            if (response.ok) {
               form.reset();

               // Повністю очищаємо класи станів після успіху
               form.querySelectorAll('.form__block').forEach(block => {
                  block.classList.remove('is-typing', 'is-valid', 'is-invalid');
               });

               if (successModal) {
                  successModal.classList.add('is-open');
                  document.body.classList.add('lock');
               }
            } else {
               throw new Error('Помилка відправки через серверну функцію');
            }
         })
         .catch(error => {
            console.error(error);
            alert('Сталася помилка при відправці. Спробуйте ще раз.');
         })
         .finally(() => {
            if (submitBtn) {
               submitBtn.innerHTML = originalBtnText;
               submitBtn.disabled = false;
            }
         });
   });

   // Обробка полів: введення, фокус, вихід, та робота кнопок очищення
   form.querySelectorAll('.form__input').forEach(input => {
      const formBlock = input.closest('.form__block');
      const inputBlock = input.closest('.form__input-block');

      // 🌟 ПОДІЯ ФОКУСУ: Повертає хрестик моментально, якщо в полі вже є текст
      input.addEventListener('focus', () => {
         if (input.value.trim() !== '' && formBlock) {
            formBlock.classList.add('is-typing');
         }
      });

      // 1. Подія введення тексту
      input.addEventListener('input', () => {
         // Керуємо видимістю хрестика під час друку
         if (input.value.trim() !== '') {
            if (formBlock) formBlock.classList.add('is-typing');
         } else {
            if (formBlock) formBlock.classList.remove('is-typing');
         }

         // РОЗУМНЕ БЛОКУВАННЯ БУКВ В ТЕЛЕФОНІ
         if (input.classList.contains('form__input--tel')) {
            input.value = input.value.replace(/(?!^\+)[^0-9]/g, '');

            // Обмеження максимальної довжини за міжнародним стандартом (15 цифр + плюс)
            if (input.value.length > 16) {
               input.value = input.value.substring(0, 16);
            }
         }

         // Ховаємо червону помилку під час друку, щоб не дратувати користувача
         if (formBlock) {
            formBlock.classList.remove('is-invalid');
         }
      });

      // 2. Подія виходу з поля (BLUR)
      input.addEventListener('blur', () => {
         if (formBlock) formBlock.classList.remove('is-typing');
         validateField(input);
      });

      // 3. ЛОГІКА ХРЕСТИКІВ ОЧИЩЕННЯ (Через mousedown, щоб випередити подій blur)
      if (inputBlock) {
         const clearBtn = inputBlock.querySelector('.form__input-clear-btn');

         if (clearBtn) {
            clearBtn.addEventListener('mousedown', (e) => {
               e.preventDefault(); // Забороняємо інпуту скидати фокус завчасно

               input.value = ''; // Стираємо текст

               // Повністю змиваємо всі класи оформлення, щоб поле стало дефолтним
               if (formBlock) {
                  formBlock.classList.remove('is-valid', 'is-invalid', 'is-typing');
               }

               // М'яко повертаємо курсор назад в інпут
               setTimeout(() => {
                  input.focus();
               }, 0);
            });
         }
      }
   });
}

// Згода на обробку даних
function initCookieConsent() {
   const consentBanner = document.getElementById('cookie-consent');
   const acceptBtn = document.getElementById('cookie-accept-btn');
   const privacyLink = document.getElementById('link-privacy-cookie');

   if (!consentBanner || !acceptBtn) return;

   // Перевіряємо, чи користувач вже давав згоду раніше
   const hasConsented = localStorage.getItem('user_cookie_consent');

   if (!hasConsented) {
      // Показуємо плашку через 2.5 секунди після завантаження (м'який ефект)
      setTimeout(() => {
         consentBanner.classList.add('is-show');
      }, 2500);
   }

   // Клік на кнопку «Прийняти»
   acceptBtn.addEventListener('click', () => {
      consentBanner.classList.remove('is-show');

      // Записуємо в пам'ять браузера, що згода отримана
      localStorage.setItem('user_cookie_consent', 'true');
   });

   // Додатково: якщо людина клікає на посилання всередині плашки, 
   // відкриваємо нашу вже готову темну модалку політики
   privacyLink?.addEventListener('click', (e) => {
      e.preventDefault();

      const privacyModal = document.getElementById('info-modal'); // Твій ID модалки правил
      const modalTitle = document.getElementById('modal-title');
      const modalText = document.getElementById('modal-text');

      if (privacyModal && modalTitle && modalText) {
         // Підставляємо контент політики конфіденційності (як у твоїй footerModal)
         modalTitle.textContent = "Політика конфіденційності";
         // Тут твій текст або змінна з текстом:
         modalText.innerHTML = `<p><strong>Політика конфіденційності Petrushov Digital Studio</strong></p><p>Ми збираємо ваші персональні дані виключно для зв'язку з вами...</p>`;

         privacyModal.classList.add('is-open', 'active');
         document.body.classList.add('lock');
      }
   });
}