// строгий режим
"use strict"

const html = document.documentElement
const burgerButton = document.querySelector(`.burger-menu`)
const burgerMenu = document.querySelector(`.header__menu`)
let allProducts = [];
let currentPage = 1
const productsPerPage = 8
let addresses = JSON.parse(localStorage.getItem(`addresses`)) || []


window.addEventListener(`load`, loadPage)

function loadPage() {
   html.classList.add(`load`)

   // burger
   html.addEventListener(`click`, burgerAction)

   // burger esc 
   html.addEventListener(`keydown`, burgerEscapeAction)

   // scroll header
   scrollHeader()

   // active buttons menu nav
   actionButton()

   // swiper categories
   swiperCategories()

   // promo-banner-swiper
   promoSwiper()

   // products
   productsRender()

   // select filter
   customSelect()

   // mobile filter show
   mobileFilters()

   // розкриття тексту details
   toggleBlock(
      document.querySelector(
         '.buttons__button--details'
      ),

      document.querySelector(
         '.characteristics__column'
      ),

      '616px'
   );

   // розкриття тексту testemonials
   toggleBlock(
      document.querySelector(
         '.buttons__button--testemonials'
      ),

      document.querySelector(
         '.testemonials__items'
      ),

      '672px'
   );

   // сторінка продукту
   loadProductPage()

   // update cart count
   updateCartCount()

   // cart page
   loadCartPage()

   // cart actions
   initCartActions()

   // checkout navigation
   initCheckoutNavigation()

   // active checkout breadcrumbs
   activeCheckoutBreadcrumbs()

   // edit adress
   initEditAddressModal()

   // remove adress
   removeAddress()

   // render addresses after reload
   renderAddresses()

   // select date
   changeShippingDate()

   // render payment summary
   renderPaymentSummary()

   // save selected adress
   saveSelectedAddress()

   // render selected adress
   renderSelectedAddress()

   // shipping methods
   saveShippingMethod()

   // render selected methods
   renderShippingMethod()

   // payment tabs
   paymentTabs()
}

// burger
function burgerAction(e) {
   const target = e.target

   if (target.closest(`.burger-menu`)) {
      burgerButton.classList.toggle(`active`)
      burgerMenu.classList.toggle(`active`)

      return
   }

   if (target.closest(`.menu__link`) && burgerMenu.classList.contains(`active`)) {
      burgerButton.classList.remove(`active`)
      burgerMenu.classList.remove(`active`)
   }

   if (!target.closest(`.menu__item`) && burgerMenu.classList.contains(`active`)) {
      burgerButton.classList.remove(`active`)
      burgerMenu.classList.remove(`active`)
   }

   // плавне розкриття спойлера фільтрів
   if (target.closest(`summary`)) {
      e.preventDefault()
      const spoilerTitle = target.closest(`summary`)
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

// burger esc 
function burgerEscapeAction(e) {
   const burgerMenu = document.querySelector(`.header__menu`)

   if (!burgerMenu) return

   if (e.key === `Escape` && burgerMenu.classList.contains(`active`)) {
      burgerButton.classList.remove(`active`)
      burgerMenu.classList.remove(`active`)
   }
}

// scroll header
function scrollHeader() {
   const header = document.querySelector(`.header`)

   window.addEventListener(`scroll`, () => {
      if (window.scrollY > 20) {
         header.classList.add(`scrolled`)
      } else {
         header.classList.remove(`scrolled`)
      }
   })
}

// swiper categories
function swiperCategories() {
   const swiperCategoriesBody = document.querySelector(`.swiper-categories`)

   if (swiperCategoriesBody) {
      new Swiper(`.swiper-categories`, {
         slidesPerView: `2.2`,
         spaceBetween: 0,
         navigation: {
            nextEl: '.actions-scroll__button-next',
            prevEl: '.actions-scroll__button-prev',
         },
         breakpoints: {
            // when window width is >= 320px
            768: {
               slidesPerView: `auto`,
               spaceBetween: 32,
            }
         }
      })
   }

}

// active buttons menu nav
function actionButton() {

   let currentPage = window.location.pathname.split('/').pop();

   if (currentPage === '') {

      currentPage = 'index.html';

   }

   document.querySelectorAll(`.menu__link`).forEach(link => {

      const linkHref = link.getAttribute(`href`);

      if (linkHref === currentPage) {

         link.classList.add(`active-button`);

      } else {

         link.classList.remove(`active-button`);

      }

   });

}

// tab-line(products)
const links = document.querySelectorAll('.products__list-link');
const line = document.querySelector('.products__tab-line');

function moveLine(target) {

   line.style.width = `${target.offsetWidth}px`;

   line.style.transform =
      `translateX(${target.offsetLeft}px)`;
}

const activeLink =
   document.querySelector('.products__list-link.active');

if (activeLink) {
   moveLine(activeLink);
}

links.forEach(link => {
   link.addEventListener('click', (e) => {
      e.preventDefault();

      links.forEach(item =>
         item.classList.remove('active'));

      link.classList.add('active');

      moveLine(link);
   });
});

const tabs =
   document.querySelectorAll('.products__list-link');

tabs.forEach(tab => {

   tab.addEventListener('click', () => {

      tabs.forEach(item =>
         item.classList.remove('active'));

      tab.classList.add('active');

      const category =
         tab.dataset.category;

      const filteredProducts =
         allProducts.filter(product =>
            product.category === category
         );

      renderProducts(filteredProducts);

      moveLine(tab);
   });
});

// products
function productsRender() {
   async function getProducts() {

      const response =
         await fetch('./json/products.json');

      const products =
         await response.json();

      allProducts = products;
      initFilters()

      if (
         document.querySelector(
            '.catalog__items'
         )
      ) {

         paginateProducts(allProducts);

      }

      const activeTab =
         document.querySelector(
            '.products__list-link.active'
         );

      if (activeTab) {

         const category =
            activeTab.dataset.category;

         const filteredProducts =
            allProducts.filter(product =>
               product.category === category
            );

         renderProducts(filteredProducts);

      }

      const discountProducts =
         allProducts.filter(
            product => product.discount
         );

      renderDiscountProducts(discountProducts);
   }

   getProducts();
}
// catalog
function renderProducts(products) {

   const productsContainer =
      document.querySelector('.products__items');

   if (!productsContainer) return

   productsContainer.innerHTML = '';

   products.forEach(product => {

      const productTemplate = `
         <a href="product.html?slug=${product.slug}" class="products__item item-product">

            <button
               type="button"
               class="item-product__head
               ${product.liked ? 'active' : ''}">
               <svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none">
                  <path d="M2.88776 12.7678L12.2689 21.5804C12.5933 21.8851 12.7555 22.0375 12.9535 22.0375C13.1515 22.0375 13.3138 21.8851 13.6382 21.5804L23.0193 12.7678C25.6275 10.3177 25.9443 6.28568 23.7506 3.45831L23.3381 2.92667C20.7139 -0.455676 15.4464 0.11157 13.6024 3.97509C13.342 4.52083 12.5651 4.52083 12.3046 3.97509C10.4607 0.11157 5.19316 -0.455676 2.56893 2.92667L2.15645 3.45831C-0.0372038 6.28568 0.279528 10.3177 2.88776 12.7678Z" stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
               </svg>
            </button>

            <div class="item-product__img">

               <img
                  src="${product.images.main}"
                  alt="${product.title}"
               >

            </div>

            <h3 class="item-product__title">
               ${product.title}
            </h3>

            <p class="item-product__price">
               $${product.price}
            </p>

            <div class="item-product__button buttons">
               <button class="buttons__button buttons__button--product">
                  Buy Now
               </button>
            </div>

         </a>
      `;


      // promotion
      productsContainer.insertAdjacentHTML(
         'beforeend',
         productTemplate
      );
   });
}

// promotion
function renderDiscountProducts(products) {

   const discountsContainer =
      document.querySelector('.promotion__items');

   if (!discountsContainer) return

   discountsContainer.innerHTML = '';

   products.forEach(product => {

      const productTemplate = `
         <a href="product.html?slug=${product.slug}" class="promotion__item item-product">

            <button
               type="button"
               class="item-product__head
               ${product.liked ? 'active' : ''}">
               <svg xmlns="http://www.w3.org/2000/svg" width="26" height="23" viewBox="0 0 26 23" fill="none">
                  <path d="M2.88776 12.7678L12.2689 21.5804C12.5933 21.8851 12.7555 22.0375 12.9535 22.0375C13.1515 22.0375 13.3138 21.8851 13.6382 21.5804L23.0193 12.7678C25.6275 10.3177 25.9443 6.28568 23.7506 3.45831L23.3381 2.92667C20.7139 -0.455676 15.4464 0.11157 13.6024 3.97509C13.342 4.52083 12.5651 4.52083 12.3046 3.97509C10.4607 0.11157 5.19316 -0.455676 2.56893 2.92667L2.15645 3.45831C-0.0372038 6.28568 0.279528 10.3177 2.88776 12.7678Z" stroke="#919191" stroke-opacity="0.77" stroke-width="1.4"/>
               </svg>
            </button>

            <div class="item-product__img">

               <img
                  src="${product.images.main}"
                  alt="${product.title}"
               >

            </div>

            <h3 class="item-product__title">
               ${product.title}
            </h3>

            <p class="item-product__price">
               $${product.price}
            </p>

            <div class="item-product__button buttons">
               <button class="buttons__button buttons__button--product">
                  Buy Now
               </button>
            </div>

         </a>
      `;

      discountsContainer.insertAdjacentHTML(
         'beforeend',
         productTemplate
      );
   });
}

// promo-banner-swiper
function promoSwiper() {
   const promoSwiperBody = document.querySelector(`.promo-banner-swiper`)

   if (promoSwiperBody) {
      new Swiper(`.promo-banner-swiper`, {
         slidesPerView: `auto`,
         pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
         }
      })
   }
}

// select filter
function customSelect() {
   function sortProducts(sortType) {
      let sortedProducts =
         [...allProducts];

      switch (sortType) {

         case 'rating':

            sortedProducts =
               [...allProducts];

            break;

         case 'price-asc':

            sortedProducts.sort((a, b) =>
               a.price - b.price
            );

            break;

         case 'price-desc':

            sortedProducts.sort((a, b) =>
               b.price - a.price
            );

            break;

         case 'a-z':

            sortedProducts.sort((a, b) =>
               a.title.localeCompare(b.title)
            );

            break;

         case 'discount':

            sortedProducts =
               sortedProducts.filter(product =>
                  product.discount
               );

            break;

      }

      currentPage = 1;
      paginateProducts(sortedProducts);
   }

   const select =
      document.querySelector('.select');

   if (select) {

      const selectValue =
         select.querySelector('.select__value');

      const selectText = select.querySelector(`.select__text`)

      const selectItems =
         select.querySelectorAll('.select__item');

      // hide default item
      const defaultItem =
         select.querySelector(
            '[data-sort="rating"]'
         );

      if (defaultItem) {
         defaultItem.hidden = true;
      }

      // open/close
      selectValue.addEventListener('click', () => {

         select.classList.toggle('active');

      });

      // choose item
      selectItems.forEach(item => {

         item.addEventListener('click', () => {

            const itemText =
               item.textContent;

            const sortType =
               item.dataset.sort;

            // set text
            selectText.textContent =
               itemText;

            // set active state
            selectItems.forEach(el => {
               el.classList.remove('active')
               el.hidden = false;
            });

            item.classList.add('active');

            // hide selected item
            item.hidden = true;

            // close select
            select.classList.remove('active');

            // sort products
            sortProducts(sortType);

         });

      });

      // outside click
      document.addEventListener('click', e => {

         if (!e.target.closest('.select')) {

            select.classList.remove('active');

         }

      });
   }
}

// catalog items 
function renderCatalogProducts(products) {

   const productsCatalogContainer =
      document.querySelector('.catalog__items');

   if (!productsCatalogContainer) return

   productsCatalogContainer.innerHTML = '';

   products.forEach(product => {

      const productTemplate = `
         <a href="product.html?slug=${product.slug}" class="catalog__item item-product">

            <button
               type="button"
               class="item-product__head
               ${product.liked ? 'active' : ''}">

               <svg xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="23"
                  viewBox="0 0 26 23"
                  fill="none">

                  <path
                     d="M2.88776 12.7678L12.2689 21.5804C12.5933 21.8851 12.7555 22.0375 12.9535 22.0375C13.1515 22.0375 13.3138 21.8851 13.6382 21.5804L23.0193 12.7678C25.6275 10.3177 25.9443 6.28568 23.7506 3.45831L23.3381 2.92667C20.7139 -0.455676 15.4464 0.11157 13.6024 3.97509C13.342 4.52083 12.5651 4.52083 12.3046 3.97509C10.4607 0.11157 5.19316 -0.455676 2.56893 2.92667L2.15645 3.45831C-0.0372038 6.28568 0.279528 10.3177 2.88776 12.7678Z"
                     stroke="#919191"
                     stroke-opacity="0.77"
                     stroke-width="1.4"
                  />

               </svg>

            </button>

            <div class="item-product__img">

               <img
                  src="${product.images.main}"
                  alt="${product.title}"
               >

            </div>

            <h3 class="item-product__title">
               ${product.title}
            </h3>

            <p class="item-product__price">
               $${product.price}
            </p>

            <div class="item-product__button buttons">

               <button
                  class="buttons__button buttons__button--product">

                  Buy Now

               </button>

            </div>

         </a>
      `;

      productsCatalogContainer.insertAdjacentHTML(
         'beforeend',
         productTemplate
      );

   });

}

// universal renderer
function renderCurrentProducts(products) {

   const catalog =
      document.querySelector('.catalog__items');

   const home =
      document.querySelector('.products__items');

   if (catalog) {
      renderCatalogProducts(products);
   }

   if (home) {
      renderProducts(products);
   }

}

// pagination products
//  Render current page
function paginateProducts(products) {

   const start =
      (currentPage - 1) * productsPerPage;

   const end =
      start + productsPerPage;

   const paginatedProducts =
      products.slice(start, end);

   renderCatalogProducts(
      paginatedProducts
   );

   updateProductsCount(products);

   renderPagination(products);
}

// Render buttons
function renderPagination(products) {

   const pagination =
      document.querySelector(
         '.pagination-catalog__items'
      );

   if (!pagination) return;

   pagination.innerHTML = '';

   const totalPages =
      Math.ceil(
         products.length / productsPerPage
      );

   const prevButton =
      document.querySelector(
         '.pagination-catalog__arrow--prev'
      );

   if (prevButton) {

      prevButton.onclick = () => {

         if (currentPage <= 1) return;

         currentPage--;

         paginateProducts(products);

      };

   }

   const nextButton =
      document.querySelector(
         '.pagination-catalog__arrow--next'
      );

   if (nextButton) {

      nextButton.onclick = () => {

         if (
            currentPage >= totalPages
         ) return;

         currentPage++;

         paginateProducts(products);

      };

   }

   prevButton?.classList.toggle(
      'disabled',
      currentPage === 1
   );

   nextButton?.classList.toggle(
      'disabled',
      currentPage === totalPages
   );

   // create button
   function createButton(page) {

      const button =
         document.createElement('button');

      button.textContent = page;

      button.classList.add(
         'pagination-catalog__item'
      );

      if (page === currentPage) {

         button.classList.add('active');

      }

      button.addEventListener(
         'click',
         () => {

            currentPage = page;

            paginateProducts(products);

         }
      );

      pagination.append(button);

   }

   // create dots
   function createDots() {

      const dots =
         document.createElement('span');

      dots.textContent = '....';

      dots.classList.add(
         'pagination-catalog__dots'
      );

      pagination.append(dots);

   }

   // small pages
   if (totalPages <= 5) {

      for (
         let i = 1;
         i <= totalPages;
         i++
      ) {

         createButton(i);

      }

      return;

   }

   // start
   if (currentPage <= 3) {

      createButton(1);
      createButton(2);
      createButton(3);

      createDots();

      createButton(totalPages);

      return;

   }

   // middle
   if (
      currentPage > 3 &&
      currentPage < totalPages - 2
   ) {

      createButton(1);

      createDots();

      createButton(currentPage - 1);
      createButton(currentPage);
      createButton(currentPage + 1);

      createDots();

      createButton(totalPages);

      return;

   }

   // end
   createButton(1);

   createDots();

   createButton(totalPages - 2);
   createButton(totalPages - 1);
   createButton(totalPages);

}

// catalog count
function updateProductsCount(products) {

   const countElement =
      document.querySelector(
         '.catalog__number-products'
      );

   if (!countElement) return;

   countElement.textContent =
      products.length;

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

// aside filter
function initFilters() {

   const filterInputs =
      document.querySelectorAll(
         '.spoiler-filters__input'
      );

   if (!filterInputs.length) {

      initBrandSearch();

      return;

   }

   // filters count
   updateFiltersCount();

   // brand search
   initBrandSearch();

   // глобальний пошук в хедері
   initGlobalSearch();

   // filters events
   filterInputs.forEach(input => {

      input.addEventListener('change', () => {

         applyFilters();

      });

   });
}

// counts filters
function applyFilters() {

   const checkedInputs =
      document.querySelectorAll(
         '.spoiler-filters__input:checked'
      );

   const activeFilters = {};

   const globalSearchInput =
      document.querySelector(
         '.search-input__body--global'
      );

   const searchValue =
      globalSearchInput
         ? globalSearchInput.value
            .trim()
            .toLowerCase()
         : '';

   checkedInputs.forEach(input => {

      const filterType =
         input.dataset.filter;

      const filterValue =
         input.id;

      // create array
      if (!activeFilters[filterType]) {

         activeFilters[filterType] = [];

      }

      activeFilters[filterType].push(
         filterValue
      );

   });

   const filteredProducts =
      allProducts.filter(product => {

         if (
            searchValue &&
            !product.title
               .toLowerCase()
               .includes(searchValue)
         ) {

            return false;

         }

         return Object.entries(
            activeFilters
         ).every(([key, values]) => {

            // protection array
            if (
               Array.isArray(product.filters?.[key])
            ) {

               return product.filters?.[key].some(item =>
                  values.includes(item)
               );

            }

            return values.includes(
               product.filters?.[key]
            );

         });

      });

   currentPage = 1;

   paginateProducts(filteredProducts);

}

function updateFiltersCount() {

   const filterInputs =
      document.querySelectorAll(
         '.spoiler-filters__input'
      );

   filterInputs.forEach(input => {

      const filterType =
         input.dataset.filter;

      const filterValue =
         input.id;

      const count =
         allProducts.filter(product => {

            // array values
            if (
               Array.isArray(
                  product.filters?.[filterType]
               )
            ) {

               return product.filters?.[
                  filterType
               ]?.includes(filterValue);

            }

            return (
               product.filters?.[filterType] ===
               filterValue
            );

         }).length;

      const label =
         input.nextElementSibling;

      const countElement =
         label.querySelector(
            '.spoiler-filters__count'
         );

      if (countElement) {

         countElement.textContent =
            `${count}`;

      }

   });

}

// mobile filter
function mobileFilters() {

   const filterButton =
      document.querySelector(
         '.catalog__filters'
      );

   const filterBody =
      document.querySelector(
         '.catalog__side-body'
      );

   if (!filterButton || !filterBody) return;

   html.addEventListener(
      'click',
      actionFilters
   );

   document.addEventListener(
      'keydown',
      escapeFilters
   );

   function actionFilters(e) {

      const target = e.target;

      // close button
      if (
         target.closest(
            '.side-filters__close'
         )
      ) {

         filterButton.classList.remove(
            'active'
         );

         filterBody.classList.remove(
            'active'
         );

         return;

      }

      // open/close button
      if (
         target.closest(
            '.filters-button__body'
         )
      ) {

         filterButton.classList.toggle(
            'active'
         );

         filterBody.classList.toggle(
            'active'
         );

         return;

      }

      // click outside
      if (
         !target.closest(
            '.catalog__side-body'
         ) &&
         !target.closest(
            '.filters-button__body'
         ) &&
         filterBody.classList.contains(
            'active'
         )
      ) {

         filterButton.classList.remove(
            'active'
         );

         filterBody.classList.remove(
            'active'
         );

      }

   }

   function escapeFilters(e) {

      if (
         e.key === 'Escape' &&
         filterBody.classList.contains(
            'active'
         )
      ) {

         filterButton.classList.remove(
            'active'
         );

         filterBody.classList.remove(
            'active'
         );

      }

   }

}

// brand search
function initBrandSearch() {

   const searchInput =
      document.querySelector(
         '.search-input__body--brands'
      );

   if (!searchInput) return;

   const brandItems =
      document.querySelectorAll(
         '.spoiler-filters__body--brands .spoiler-filters__block-input'
      );

   searchInput.addEventListener(
      'keydown',
      e => {

         if (e.key === 'Enter') {

            e.preventDefault();

         }

      }
   );

   searchInput.addEventListener(
      'input',
      () => {

         const searchValue =
            searchInput.value
               .trim()
               .toLowerCase();

         brandItems.forEach(item => {

            const label =
               item.querySelector(
                  '.spoiler-filters__label'
               );

            if (!label) return;

            const text =
               label.textContent
                  .replace(/\d+/g, '')
                  .trim()
                  .toLowerCase();

            if (text.includes(searchValue)) {

               item.style.display = '';

            } else {

               item.style.display = 'none';

            }

         });

      }
   );
}

// глобальний пошук в хедері
function initGlobalSearch() {

   const searchInput =
      document.querySelector(
         '.search-input__body--global'
      );

   if (!searchInput) return;

   searchInput.addEventListener(
      'input',
      () => {

         applyFilters();

      }
   );

}

// розкриття тексту продукту
function openProductTextAbout() {

   const button =
      document.querySelector(
         '.product__about-block-button'
      );

   const aboutBlock =
      document.querySelector(
         '.product__about-text'
      );

   if (
      !button ||
      !aboutBlock
   ) return;

   button.onclick = () => {

      const isActive =
         aboutBlock.classList.contains(
            'active'
         );

      if (isActive) {

         aboutBlock.style.maxHeight =
            aboutBlock.scrollHeight + 'px';

         requestAnimationFrame(() => {

            aboutBlock.style.maxHeight =
               '72px';

         });

      } else {

         aboutBlock.style.maxHeight =
            aboutBlock.scrollHeight + 'px';

      }

      aboutBlock.classList.toggle(
         'active'
      );

      button.classList.toggle(
         'active'
      );

   };

}

// розкриття тексту details testemonials
function toggleBlock(
   button,
   block,
   closedHeight
) {

   if (!button || !block) return;

   button.addEventListener(
      'click',
      () => {

         const isActive =
            block.classList.contains(
               'active'
            );

         if (isActive) {

            block.style.maxHeight =
               block.scrollHeight + 'px';

            requestAnimationFrame(() => {

               block.style.maxHeight =
                  closedHeight;

            });

         } else {

            block.style.maxHeight =
               block.scrollHeight + 'px';

         }

         block.classList.toggle(
            'active'
         );

         button.classList.toggle(
            'active'
         );

      }
   );

}

// сторінка продукту
async function loadProductPage() {

   const productPage =
      document.querySelector(
         '.product'
      );

   if (!productPage) return;

   const params =
      new URLSearchParams(
         window.location.search
      );

   const productSlug =
      params.get('slug');

   if (!productSlug) return;

   const response =
      await fetch(
         './json/products.json'
      );

   const products =
      await response.json();

   const currentProduct =
      products.find(product =>
         product.slug === productSlug
      );

   if (!currentProduct) return;

   renderProductInfo(currentProduct);

   // розкриття тексту продукту
   openProductTextAbout()

   renderProductGallery(currentProduct);

   renderProductColors(currentProduct);

   renderProductMemory(currentProduct);

   renderProductDetails(currentProduct);

   renderProductCharacteristics(currentProduct);

   renderReviewsSummary(currentProduct);

   renderProductReviews(currentProduct);

   initAddToCart(currentProduct);
}

// product-gallery
function renderProductGallery(product) {

   const sideGallery =
      document.querySelector(
         '.product__image-side'
      );

   const mainImage =
      document.querySelector(
         '.product__image-main img'
      );

   if (
      !sideGallery ||
      !mainImage
   ) return;

   sideGallery.innerHTML = '';

   const allImages = [

      product.images.main,

      ...product.images.gallery

   ];

   mainImage.src =
      product.images.main;

   mainImage.alt =
      product.title;

   allImages.forEach(
      (image, index) => {

         sideGallery
            .insertAdjacentHTML(

               'beforeend',

               `
               <div
                  class="
                     product__image-side-img
                     ${index === 0 ? 'active' : ''}
                  "
               >

                  <img
                     src="${image}"
                     alt="${product.title}"
                  >

               </div>
               `
            );

      }
   );

   sideGallery.onclick = e => {

      const currentImage =
         e.target.closest('img');

      if (!currentImage) return;

      const oldMainSrc =
         mainImage.src;

      const oldMainAlt =
         mainImage.alt;

      mainImage.src =
         currentImage.src;

      mainImage.alt =
         currentImage.alt;

      document
         .querySelectorAll(
            '.product__image-side-img'
         )
         .forEach(item => {

            item.classList.remove(
               'active'
            );

         });

      currentImage
         .closest(
            '.product__image-side-img'
         )
         .classList.add(
            'active'
         );

   };

}

// product-info
function renderProductInfo(product) {

   const title =
      document.querySelector(
         '.product__title'
      );

   const price =
      document.querySelector(
         '.product__price'
      );

   const about =
      document.querySelector(
         '.product__about-text'
      );

   if (title) {

      title.textContent =
         product.title;

   }

   if (price) {

      price.innerHTML = `
         $${product.price}

         ${product.oldPrice

            ? `
               <span
                  class="
                     product__discount
                  "
               >
                  $${product.oldPrice}
               </span>
            `

            : ''

         }
      `;

   }

   if (about) {

      about.textContent =
         product.description;
   }

}

// product-colors
function renderProductColors(product) {

   const colorsList =
      document.querySelector(
         '.product__color-list'
      );

   if (!colorsList) return;

   colorsList.innerHTML = '';

   product.colors.forEach(
      (color, index) => {

         colorsList
            .insertAdjacentHTML(

               'beforeend',

               `
               <li
                  class="
                     product__color-list-item
                  "
               >

                  <button
                     class="
                        product__list-link
                        ${index === 0 ? 'active' : ''}
                     "

                     style="
                        background-color:
                        ${color.value}
                     "
                  ></button>

               </li>
               `
            );

      }
   );

}

// product-memory
function renderProductMemory(product) {

   const memoryList =
      document.querySelector(
         '.product__memory-list'
      );

   if (!memoryList) return;

   memoryList.innerHTML = '';

   product.memoryOptions
      .forEach(
         (memory, index) => {

            memoryList
               .insertAdjacentHTML(

                  'beforeend',

                  `
                  <li
                     class="
                        product__memory-list-item
                     "
                  >

                     <button
                        class="
                           product__memory-list-link
                           ${index === 0 ? 'active' : ''}
                        "
                     >

                        ${memory}

                     </button>

                  </li>
                  `
               );

         }
      );

}

// product-details
function renderProductDetails(product) {

   const detailsList =
      document.querySelector(
         '.product__details-list'
      );

   if (!detailsList) return;

   detailsList.innerHTML = '';

   const details = [

      {
         icon: 'screen',

         label: 'Screen size',

         value:
            product.specifications
               ?.screen
               ?.diagonal || '-'
      },

      {
         icon: 'cpu',

         label: 'CPU',

         value:
            product.specifications
               ?.system
               ?.processor || '-'
      },

      {
         icon: 'cores',

         label:
            'Number of Cores',

         value:
            product.specifications
               ?.system
               ?.cores || '-'
      },

      {
         icon: 'camera',

         label:
            'Main camera',

         value:
            `
            ${product.specifications
               ?.camera
               ?.main || '-'}
            /
            ${product.specifications
               ?.camera
               ?.ultrawide || '-'}
            /
            ${product.specifications
               ?.camera
               ?.telephoto || '-'}
            `
      },

      {
         icon: 'fcamera',

         label:
            'Front camera',

         value:
            product.specifications
               ?.camera
               ?.front || '-'
      },

      {
         icon: 'battery',

         label:
            'Battery capacity',

         value:
            product.specifications
               ?.battery
               ?.capacity || '-'
      }

   ];

   details.forEach(detail => {

      detailsList
         .insertAdjacentHTML(

            'beforeend',

            `
            <li
               class="
                  product__list-item
               "
            >

               <div
                  class="
                     product__list-item-icon
                  "
               >

                  <img
                     src="
                     img/icons/product/${detail.icon}.svg
                     "

                     alt="${detail.label}"
                  >

               </div>

               <div
                  class="
                     product__list-item-about
                  "
               >

                  <p
                     class="
                        product__list-item-text
                     "
                  >

                     ${detail.label}

                  </p>

                  <p
                     class="
                        product__list-item-size
                     "
                  >

                     ${detail.value}

                  </p>

               </div>

            </li>
            `
         );

   });

}

// details characterisics
function renderProductCharacteristics(product) {

   const column =
      document.querySelector(
         '.characteristics__column'
      );

   const about =
      document.querySelector(
         '.details__about'
      );

   if (
      !column ||
      !product.specifications
   ) return;

   column.innerHTML = '';

   if (about) {

      about.textContent =
         product.description;

   }

   const sections = [

      {
         title: 'Screen',

         rows: [

            {
               label:
                  'Screen diagonal',

               value:
                  product.specifications
                     ?.screen
                     ?.diagonal
            },

            {
               label:
                  'The screen resolution',

               value:
                  product.specifications
                     ?.screen
                     ?.resolution
            },

            {
               label:
                  'The screen refresh rate',

               value:
                  product.specifications
                     ?.screen
                     ?.refreshRate
            },

            {
               label:
                  'The pixel density',

               value:
                  product.specifications
                     ?.screen
                     ?.pixelDensity
            },

            {
               label:
                  'Screen type',

               value:
                  product.specifications
                     ?.screen
                     ?.type
            },

            {
               label:
                  'Additionally',

               value:
                  product.specifications
                     ?.screen
                     ?.additionalFeatures
            }

         ]
      },

      {
         title: 'CPU',

         rows: [

            {
               label: 'CPU',

               value:
                  product.specifications
                     ?.system
                     ?.processor
            },

            {
               label:
                  'Number of cores',

               value:
                  product.specifications
                     ?.system
                     ?.cores
            }

         ]
      },
      {
         title: 'Camera',

         rows: [

            {
               label: 'Main camera',

               value:
                  product.specifications
                     ?.camera
                     ?.main
            },

            {
               label: 'Ultra wide camera',

               value:
                  product.specifications
                     ?.camera
                     ?.ultrawide
            },

            {
               label: 'Telephoto camera',

               value:
                  product.specifications
                     ?.camera
                     ?.telephoto
            },

            {
               label: 'Front camera',

               value:
                  product.specifications
                     ?.camera
                     ?.front
            },

            {
               label: 'Optical zoom',

               value:
                  product.specifications
                     ?.camera
                     ?.opticalZoom
            },

            {
               label: 'Video recording',

               value:
                  product.specifications
                     ?.camera
                     ?.videoRecording
            },

            {
               label: 'Night mode',

               value:
                  product.specifications
                     ?.camera
                     ?.nightMode
            },

            {
               label: 'Smart HDR',

               value:
                  product.specifications
                     ?.camera
                     ?.smartHDR
            }

         ]
      },
      {
         title: 'Battery',

         rows: [

            {
               label: 'Battery capacity',

               value:
                  product.specifications
                     ?.battery
                     ?.capacity
            },

            {
               label: 'Fast charging',

               value:
                  product.specifications
                     ?.battery
                     ?.fastCharging
            },

            {
               label: 'Wireless charging',

               value:
                  product.specifications
                     ?.battery
                     ?.wirelessCharging
            },

            {
               label: 'Video playback',

               value:
                  product.specifications
                     ?.battery
                     ?.videoPlayback
            }

         ]
      },
      {
         title: 'System',

         rows: [

            {
               label: 'Operating system',

               value:
                  product.specifications
                     ?.system
                     ?.os
            },

            {
               label: 'RAM',

               value:
                  product.specifications
                     ?.system
                     ?.ram
            },

            {
               label: 'Neural Engine',

               value:
                  product.specifications
                     ?.system
                     ?.neuralEngine
            }

         ]
      },
      {
         title: 'Connectivity',

         rows: [

            {
               label: 'Wi-Fi',

               value:
                  product.specifications
                     ?.connectivity
                     ?.wifi
            },

            {
               label: 'Bluetooth',

               value:
                  product.specifications
                     ?.connectivity
                     ?.bluetooth
            },

            {
               label: 'NFC',

               value:
                  product.specifications
                     ?.connectivity
                     ?.nfc
            },

            {
               label: 'Connector',

               value:
                  product.specifications
                     ?.connectivity
                     ?.connector
            }

         ]
      }

   ];

   sections.forEach(
      section => {

         const rows =
            section.rows.map(
               row => {

                  const isArray =
                     Array.isArray(
                        row.value
                     );

                  return `
                     <div
                        class="
                           characteristics__row
                        "
                     >

                        <dt
                           class="
                              characteristics__label
                           "
                        >

                           ${row.label}

                        </dt>

                        <dd
                           class="
                              characteristics__value
                           "
                        >

                           ${isArray

                        ? `

                                 <ul
                                    class="
                                       characteristics__values
                                    "
                                 >

                                    ${row.value.map(item => `

                                       <li
                                          class="
                                             characteristics__value-item
                                          "
                                       >

                                          ${item}

                                       </li>

                                    `).join('')}

                                 </ul>

                              `

                        : row.value

                     }

                        </dd>

                     </div>
                  `;

               }
            ).join('');

         column.insertAdjacentHTML(

            'beforeend',

            `
            <article
               class="
                  characteristics
               "
            >

               <h3
                  class="
                     characteristics__title
                  "
               >

                  ${section.title}

               </h3>

               <dl
                  class="
                     characteristics__body
                  "
               >

                  ${rows}

               </dl>

            </article>
            `
         );

      }
   );

}

// reviews summary
function renderReviewsSummary(product) {

   const reviewsSide =
      document.querySelector(
         '.reviews__side'
      );

   const chart =
      document.querySelector(
         '.reviews__rating-chart'
      );

   if (
      !reviewsSide ||
      !chart
   ) return;

   const ratingWidth =
      (product.rating / 5) * 100;

   reviewsSide.innerHTML = `

      <div
         class="
            reviews__score
         "
      >

         ${product.rating}

      </div>

      <div
         class="
            reviews__of
         "
      >

         of ${product.reviewsCount}
         reviews

      </div>

      <div
         class="
            reviews__rating
            rating-stars
         "
      >

         <div
            class="
               rating-stars__empty
            "
         >

            <img
               src="
               img/icons/rate-stars.svg
               "

               alt="
                  Rate stars empty
               "
            >

         </div>

         <div
            class="
               rating-stars__fill
            "

            style="
               width:${ratingWidth}%
            "
         >

            <img
               src="
               img/icons/rate-stars-fill.svg
               "

               alt="
                  Rate stars fill
               "
            >

         </div>

      </div>
   `;

   chart.innerHTML = '';

   const summary = [

      {
         title: 'Excellent',

         value:
            product.reviewsSummary
               ?.excellent
      },

      {
         title: 'Good',

         value:
            product.reviewsSummary
               ?.good
      },

      {
         title: 'Average',

         value:
            product.reviewsSummary
               ?.average
      },

      {
         title: 'Below Average',

         value:
            product.reviewsSummary
               ?.belowAverage
      },

      {
         title: 'Poor',

         value:
            product.reviewsSummary
               ?.poor
      }

   ];

   const maxValue =
      Math.max(
         ...summary.map(
            item => item.value
         )
      );

   summary.forEach(item => {

      const progressWidth =
         (item.value / maxValue) * 100;

      chart.insertAdjacentHTML(

         'beforeend',

         `
         <div
            class="
               reviews__rating-chart-row
            "
         >

            <p
               class="
                  reviews__rating-chart-title
               "
            >

               ${item.title}

            </p>

            <div
               class="
                  reviews__rating-chart-progress
               "
            >

               <span
                  style="
                     width:${progressWidth}%
                  "
               ></span>

            </div>

            <p
               class="
                  reviews__rating-chart-value
               "
            >

               ${item.value}

            </p>

         </div>
         `
      );

   });

}

// testemonials
function renderProductReviews(product) {

   const reviewsContainer =
      document.querySelector(
         '.testemonials__items'
      );

   if (
      !reviewsContainer ||
      !product.reviews
   ) return;

   reviewsContainer.innerHTML = '';

   product.reviews.forEach(
      review => {

         const ratingWidth =
            (review.rating / 5) * 100;

         const reviewImages =
            review.images?.length

               ? `

                  <div
                     class="
                        testemonials__blockqoute-images
                     "
                  >

                     ${review.images.map(image => `

                        <div
                           class="
                              testemonials__blockqoute-img
                           "
                        >

                           <img
                              src="${image}"
                              alt="
                                 Review Photo
                              "
                           >

                        </div>

                     `).join('')}

                  </div>

               `

               : '';

         reviewsContainer
            .insertAdjacentHTML(

               'beforeend',

               `
               <div
                  class="
                     testemonials__item
                  "
               >

                  <div
                     class="
                        testemonials__avatar
                     "
                  >

                     <img
                        src="${review.avatar}"

                        alt="${review.name}"
                     >

                  </div>

                  <div
                     class="
                        testemonials__body
                     "
                  >

                     <div
                        class="
                           testemonials__head
                        "
                     >

                        <strong
                           class="
                              testemonials__name
                           "
                        >

                           ${review.name}

                        </strong>

                        <time
                           class="
                              testemonials__date
                           "

                           datetime="
                              ${review.datetime}
                           "
                        >

                           ${review.date}

                        </time>

                     </div>

                     <div
                        class="
                           testemonials__rate-stars
                        "
                     >

                        <div
                           class="
                              testemonials__rate-star
                              testemonials__rate-star--empty
                           "
                        >

                           <img
                              src="
                                 img/icons/rate-stars.svg
                              "

                              alt="
                                 Rate stars empty
                              "
                           >

                        </div>

                        <div
                           class="
                              testemonials__rate-star
                              testemonials__rate-star--fill
                           "

                           style="
                              width:${ratingWidth}%
                           "
                        >

                           <img
                              src="
                                 img/icons/rate-stars-fill.svg
                              "

                              alt="
                                 Rate stars fill
                              "
                           >

                        </div>

                     </div>

                     <div
                        class="
                           testemonials__blockqoute
                        "
                     >

                        <blockquote
                           class="
                              testemonials__qoute
                           "
                        >

                           ${review.text}

                        </blockquote>

                        ${reviewImages}

                     </div>

                  </div>

               </div>
               `
            );

      });

}

// add product to cart
function initAddToCart(product) {

   const button = document.querySelector(`.buttons__button--cart`)

   if (!button) return

   button.addEventListener(`click`, () => {

      let cart = JSON.parse(localStorage.getItem(`cart`)) || []

      const existingProduct = cart.find(item => {
         return item.slug === product.slug
      })

      if (existingProduct) {

         existingProduct.quantity++

      } else {

         cart.push({
            slug: product.slug,
            quantity: 1
         })

      }

      localStorage.setItem(`cart`, JSON.stringify(cart))

      updateCartCount()

   })
}

// update cart count
function updateCartCount() {

   const cartCounts =
      document.querySelectorAll(`.actions__link-cart-count`)

   if (!cartCounts.length) return

   const cart =
      JSON.parse(localStorage.getItem(`cart`)) || []

   const totalCount =
      cart.reduce((total, item) => {

         return total + item.quantity

      }, 0)

   cartCounts.forEach(count => {

      count.textContent = totalCount

      count.hidden = totalCount === 0

   })

}

// load cart page
async function loadCartPage() {

   const cartPage = document.querySelector(`.cart`)

   if (!cartPage) return

   const response =
      await fetch(`./json/products.json`)

   const products =
      await response.json()

   const cart =
      JSON.parse(localStorage.getItem(`cart`)) || []

   const cartProducts =
      cart.map(cartItem => {

         const product =
            products.find(product => {

               return product.slug === cartItem.slug

            })

         return {
            ...product,
            quantity: cartItem.quantity
         }

      })

   renderCartProducts(cartProducts)
   renderCartSummary(cartProducts)

   console.log(cartProducts)
}

// render cart products
function renderCartProducts(products) {

   const cartContainer =
      document.querySelector(`.cart-body__items`)

   if (!cartContainer) return

   cartContainer.innerHTML = ''

   products.forEach(product => {

      cartContainer.insertAdjacentHTML(`beforeend`, `

         <div
            class="cart-body__item"
            data-slug="${product.slug}"
         >

            <div class="cart-body__img">

               <img
                  src="${product.images.main}"
                  alt="${product.title}"
               >

            </div>

            <div class="cart-body__row">

               <div class="cart-body__text-block">

                  <strong class="cart-body__name">
                     ${product.title}
                  </strong>

                  <p class="cart-body__id">
                     #${product.id}
                  </p>

               </div>

               <div class="cart-body__actions-block">

                  <div class="cart-body__actions">

                     <button class="cart-body__minus">
                        -
                     </button>

                     <span class="cart-body__count">
                        ${product.quantity}
                     </span>

                     <button class="cart-body__plus">
                        +
                     </button>

                  </div>

                  <p class="cart-body__price">
                     $${product.price}
                  </p>

                  <button
                     class="
                        cart-body__remove
                        -icon-close
                     "

                     type="button"
                  ></button>

               </div>

            </div>

         </div>

      `)

   })

}

// render cart summary
function renderCartSummary(products) {

   const subtotalElement =
      document.querySelector(`.summary__subtotal`)

   const taxElement =
      document.querySelector(`.summary__tax`)

   const deliveryElement =
      document.querySelector(`.summary__delivery`)

   const totalElement =
      document.querySelector(`.summary__total`)

   if (
      !subtotalElement ||
      !taxElement ||
      !deliveryElement ||
      !totalElement
   ) return

   const subtotal =
      products.reduce((total, product) => {

         return total +
            (
               product.price *
               product.quantity
            )

      }, 0)

   const tax =
      Math.round(subtotal * 0.02)

   const delivery = 29

   const total =
      subtotal +
      tax +
      delivery

   subtotalElement.textContent =
      `$${subtotal}`

   taxElement.textContent =
      `$${tax}`

   deliveryElement.textContent =
      `$${delivery}`

   totalElement.textContent =
      `$${total}`

}

// init cart actions
function initCartActions() {

   const cartContainer =
      document.querySelector(`.cart-body__items`)

   if (!cartContainer) return

   cartContainer.addEventListener(`click`, e => {

      const target = e.target

      const cartItem =
         target.closest(`.cart-body__item`)

      if (!cartItem) return

      const slug =
         cartItem.dataset.slug

      let cart =
         JSON.parse(localStorage.getItem(`cart`)) || []

      const product =
         cart.find(item => {

            return item.slug === slug

         })

      if (!product) return

      if (target.closest(`.cart-body__plus`)) {

         product.quantity++

      }

      if (target.closest(`.cart-body__minus`)) {

         if (product.quantity > 1) {

            product.quantity--

         }

      }

      if (target.closest(`.cart-body__remove`)) {

         cart =
            cart.filter(item => {

               return item.slug !== slug

            })

      }

      localStorage.setItem(`cart`, JSON.stringify(cart))

      loadCartPage()

      updateCartCount()

   })

}

// checkout navigation
function initCheckoutNavigation() {

   const nextButton =
      document.querySelector(
         '.buttons__button--next'
      );

   const backButton =
      document.querySelector(
         '.buttons__button--back'
      );

   const currentPage =
      window.location.pathname
         .split('/')
         .pop();

   if (nextButton) {

      nextButton.addEventListener(
         'click',
         e => {

            // address validation
            if (
               currentPage ===
               'checkout-adress.html'
            ) {

               const checkedRadio =
                  document.querySelector(
                     '.adress__input-radio:checked'
                  );

               if (!checkedRadio) {

                  e.preventDefault();

                  showToast(
                     'Please select address'
                  );

                  return;

               }

               window.location.href =
                  'checkout-shipping.html';

            }

            // shipping validation
            else if (
               currentPage ===
               'checkout-shipping.html'
            ) {

               const checkedRadio =
                  document.querySelector(
                     '.shipping__input-radio:checked'
                  );

               if (!checkedRadio) {

                  e.preventDefault();

                  showToast(
                     'Please select shipping method'
                  );

                  return;

               }

               window.location.href =
                  'checkout-payment.html';

            }

         }
      );

   }

   if (backButton) {

      backButton.addEventListener(
         'click',
         () => {

            if (
               currentPage ===
               'checkout-adress.html'
            ) {

               window.location.href =
                  'cart.html';

            }

            else if (
               currentPage ===
               'checkout-shipping.html'
            ) {

               window.location.href =
                  'checkout-adress.html';

            }

            else if (
               currentPage ===
               'checkout-payment.html'
            ) {

               window.location.href =
                  'checkout-shipping.html';

            }

         }
      );

   }

}

// active checkout breadcrumbs
function activeCheckoutBreadcrumbs() {

   const currentPage =
      window.location.pathname

   const step1 =
      document.querySelector(
         `.breadcrumbs-checkout__list-item--step1`
      )

   const step2 =
      document.querySelector(
         `.breadcrumbs-checkout__list-item--step2`
      )

   const step3 =
      document.querySelector(
         `.breadcrumbs-checkout__list-item--step3`
      )

   if (
      currentPage.includes(`adress`)
   ) {

      step1?.classList.add(`active`)
      step2?.classList.add(`next`)
   }

   if (
      currentPage.includes(`shipping`)
   ) {

      step2?.classList.add(`active`)
      step3?.classList.add(`next`)

   }

   if (
      currentPage.includes(`payment`)
   ) {
      step2?.classList.add(`next`)
      step3?.classList.add(`active`)

   }

}

// edit adress
function initEditAddressModal() {

   const modal =
      document.querySelector(
         '.adress-modal'
      );

   const closeButton =
      document.querySelector(
         '.adress-modal__close'
      );

   const form =
      document.querySelector(
         '.adress-modal__form'
      );

   const addButton =
      document.querySelector(
         '.adress__add-button'
      );

   if (
      !modal ||
      !form
   ) return;

   let currentAdress = null;

   let isEditMode = false;

   // edit address
   document.addEventListener(
      'click',
      e => {

         const editButton =
            e.target.closest(
               '.adress__button-edit'
            );

         if (!editButton) return;

         isEditMode = true;

         currentAdress =
            editButton.closest(
               '.adress__item'
            );

         const title =
            currentAdress.querySelector(
               '.adress__label'
            );

         const address =
            currentAdress.querySelector(
               '.adress__name'
            );

         const phone =
            currentAdress.querySelector(
               '.adress__tel'
            );

         const value =
            currentAdress.querySelector(
               '.adress__value'
            );

         form.title.value =
            title.textContent.trim();

         form.address.value =
            address.textContent.trim();

         form.phone.value =
            phone.textContent.trim();

         form.type.value =
            value.textContent.trim();

         modal.classList.add(
            'active'
         );

      }
   );

   // add address
   addButton?.addEventListener(
      'click',
      () => {

         isEditMode = false;

         currentAdress = null;

         form.reset();

         modal.classList.add(
            'active'
         );

      }
   );

   // save form
   form.addEventListener(
      'submit',
      e => {

         e.preventDefault();

         // edit
         if (
            isEditMode &&
            currentAdress
         ) {

            currentAdress.querySelector(
               '.adress__label'
            ).textContent =
               form.title.value;

            currentAdress.querySelector(
               '.adress__name'
            ).textContent =
               form.address.value;

            currentAdress.querySelector(
               '.adress__tel'
            ).textContent =
               form.phone.value;

            currentAdress.querySelector(
               '.adress__value'
            ).textContent =
               form.type.value;

            const oldTitle =
               currentAdress.dataset.title;

            addresses =
               addresses.map(address => {

                  if (
                     address.title === oldTitle
                  ) {

                     return {

                        title:
                           form.title.value,

                        address:
                           form.address.value,

                        phone:
                           form.phone.value,

                        type:
                           form.type.value

                     }

                  }

                  return address

               });

            localStorage.setItem(

               `addresses`,

               JSON.stringify(addresses)

            );

            currentAdress.dataset.title =
               form.title.value;

            localStorage.setItem(

               `addresses`,

               JSON.stringify(addresses)

            )

         }

         // add
         else {

            const adressItems =
               document.querySelector(
                  '.adress__items'
               );

            const uniqueId =
               `adress-${Date.now()}`;

            addresses.push({

               title:
                  form.title.value,

               address:
                  form.address.value,

               phone:
                  form.phone.value,

               type:
                  form.type.value

            })

            localStorage.setItem(

               `addresses`,

               JSON.stringify(addresses)

            )

            adressItems.insertAdjacentHTML(

               'beforeend',

               `
               <div class="adress__item">

                  <div class="adress__row">

                     <div class="adress__head">

                        <input
                           class="
                              adress__input-radio
                           "

                           id="${uniqueId}"

                           name="adress"

                           type="radio"
                        >

                        <label
                           class="
                              adress__label
                           "

                           for="${uniqueId}"
                        >

                           ${form.title.value}

                        </label>

                        <span
                           class="
                              adress__value
                           "
                        >

                           home

                        </span>

                     </div>

                     <div
                        class="
                           adress__body
                        "
                     >

                        <address
                           class="
                              adress__name
                           "
                        >

                           ${form.address.value}

                        </address>

                        <span
                           class="
                              adress__tel
                           "
                        >

                           ${form.phone.value}

                        </span>

                     </div>

                  </div>

                  <div
                     class="
                        adress__actions
                     "
                  >

                     <button
                        class="
                           adress__button-edit
                           -icon-edit
                        "

                        type="button"
                     ></button>

                     <button
                        class="
                           adress__button-remove
                           -icon-close
                        "

                        type="button"
                     ></button>

                  </div>

               </div>
               `
            );

         }

         modal.classList.remove(
            'active'
         );

         form.reset();

      }
   );

   // close button
   closeButton?.addEventListener(
      'click',
      () => {

         modal.classList.remove(
            'active'
         );

      }
   );

   // close outside
   modal.addEventListener(
      'click',
      e => {

         if (
            e.target === modal
         ) {

            modal.classList.remove(
               'active'
            );

         }

      }
   );

}

// remove adress
function removeAddress() {

   document.addEventListener(
      'click',
      e => {

         const removeButton =
            e.target.closest(
               '.adress__button-remove'
            );

         if (!removeButton) return;

         const currentAdress =
            removeButton.closest(
               '.adress__item'
            );

         if (!currentAdress) return;

         const addressTitle =
            currentAdress.querySelector(
               '.adress__label'
            ).textContent.trim();

         addresses =
            addresses.filter(address => {

               return (
                  address.title.trim() !==
                  addressTitle
               );

            });

         localStorage.setItem(

            `addresses`,

            JSON.stringify(addresses)

         );

         currentAdress.remove();

      }
   );

}


// render addresses after reload
function renderAddresses() {

   const adressItems =
      document.querySelector(
         '.adress__items'
      );

   if (
      !adressItems ||
      !addresses.length
   ) return;

   adressItems.innerHTML = '';

   addresses.forEach(address => {

      const uniqueId =
         `adress-${Date.now()}-${Math.random()}`;

      adressItems.insertAdjacentHTML(

         'beforeend',

         `
         <div class="adress__item" data-title="${address.title}">

            <div class="adress__row">

               <div class="adress__head">

                  <input
                     class="
                        adress__input-radio
                     "

                     id="${uniqueId}"

                     name="adress"

                     type="radio"
                  >

                  <label
                     class="
                        adress__label
                     "

                     for="${uniqueId}"
                  >

                     ${address.title}

                  </label>

                  <span
                     class="
                        adress__value
                     "
                  >

                     ${address.type}

                  </span>

               </div>

               <div
                  class="
                     adress__body
                  "
               >

                  <address
                     class="
                        adress__name
                     "
                  >

                     ${address.address}

                  </address>

                  <span
                     class="
                        adress__tel
                     "
                  >

                     ${address.phone}

                  </span>

               </div>

            </div>

            <div
               class="
                  adress__actions
               "
            >

               <button
                  class="
                     adress__button-edit
                     -icon-edit
                  "

                  type="button"
               ></button>

               <button
                  class="
                     adress__button-remove
                     -icon-close
                  "

                  type="button"
               ></button>

            </div>

         </div>
         `
      );

   });

}

// select date
function changeShippingDate() {

   const dateInput =
      document.querySelector(
         '.shipping__date-input'
      )

   const dateText =
      document.querySelector(
         '.shipping__date-icon'
      )

   if (
      !dateInput ||
      !dateText
   ) return

   dateInput.addEventListener(
      'change',
      () => {

         const selectedDate =
            new Date(
               dateInput.value
            )

         const formattedDate =
            selectedDate.toLocaleDateString(

               `en-GB`,

               {
                  day: `2-digit`,
                  month: `short`,
                  year: `numeric`
               }

            )

         dateText.textContent =
            formattedDate

      }
   )

}

// render payment summary
async function renderPaymentSummary() {

   const summaryBody =
      document.querySelector(
         '.summary-payments__body'
      )

   if (!summaryBody) return

   const response =
      await fetch(
         './json/products.json'
      )

   const products =
      await response.json()

   const cart =
      JSON.parse(
         localStorage.getItem(`cart`)
      ) || []

   const cartProducts =
      cart.map(cartItem => {

         const product =
            products.find(product => {

               return (
                  product.slug ===
                  cartItem.slug
               )

            })

         return {

            ...product,

            quantity:
               cartItem.quantity

         }

      })

   summaryBody.innerHTML = ``

   renderPaymentTotals(
      cartProducts
   )

   cartProducts.forEach(product => {

      summaryBody.insertAdjacentHTML(

         `beforeend`,

         `
         <div class="summary-payments__product">

            <div class="summary-payments__img">

               <img
                  src="${product.images.main}"
                  alt="${product.title}"
               >

            </div>

            <div class="summary-payments__row">

               <p class="summary-payments__product-title">

                  ${product.title}

               </p>

               <p class="summary-payments__product-price">

                  $${product.price}

               </p>

            </div>

         </div>
         `
      )

   })

}

// render total payments
function renderPaymentTotals(products) {

   const subtotalElement =
      document.querySelector(
         '.summary__subtotal'
      )

   const taxElement =
      document.querySelector(
         '.summary__tax'
      )

   const deliveryElement =
      document.querySelector(
         '.summary__delivery'
      )

   const totalElement =
      document.querySelector(
         '.summary__total'
      )

   if (
      !subtotalElement ||
      !taxElement ||
      !deliveryElement ||
      !totalElement
   ) return

   const subtotal =
      products.reduce((total, product) => {

         return total +
            (
               product.price *
               product.quantity
            )

      }, 0)

   const tax =
      Math.round(subtotal * 0.02)

   const delivery = 29

   const total =
      subtotal +
      tax +
      delivery

   subtotalElement.textContent =
      `$${subtotal}`

   taxElement.textContent =
      `$${tax}`

   deliveryElement.textContent =
      `$${delivery}`

   totalElement.textContent =
      `$${total}`

}

// save selected adress
function saveSelectedAddress() {

   document.addEventListener(
      'change',
      e => {

         const radio =
            e.target.closest(
               '.adress__input-radio'
            )

         if (!radio) return

         const currentAdress =
            radio.closest(
               '.adress__item'
            )

         if (!currentAdress) return

         const selectedAddress = {

            title:
               currentAdress.querySelector(
                  '.adress__label'
               ).textContent,

            address:
               currentAdress.querySelector(
                  '.adress__name'
               ).textContent,

            phone:
               currentAdress.querySelector(
                  '.adress__tel'
               ).textContent,

            type:
               currentAdress.querySelector(
                  '.adress__value'
               ).textContent

         }

         localStorage.setItem(

            `selectedAddress`,

            JSON.stringify(
               selectedAddress
            )

         )

      }
   )

}

// render selected adress
function renderSelectedAddress() {

   const addressElement =
      document.querySelector(
         '.summary-payments__adress'
      )

   if (!addressElement) return

   const selectedAddress =
      JSON.parse(
         localStorage.getItem(
            `selectedAddress`
         )
      )

   if (!selectedAddress) return

   addressElement.textContent =
      selectedAddress.address

}

// shipping methods
function saveShippingMethod() {

   document.addEventListener(
      'change',
      e => {

         const radio =
            e.target.closest(
               '.shipping__input-radio'
            )

         if (!radio) return

         const shippingItem =
            radio.closest(
               '.shipping__item'
            )

         if (!shippingItem) return

         const shippingMethod =
            shippingItem.querySelector(
               '.shipping__label'
            ).textContent

         localStorage.setItem(

            `shippingMethod`,

            shippingMethod

         )

      }
   )

}

// render selected methods
function renderShippingMethod() {

   const shippingElement =
      document.querySelector(
         '.summary-payments__shipping-method'
      )

   if (!shippingElement) return

   const shippingMethod =
      localStorage.getItem(
         `shippingMethod`
      )

   if (!shippingMethod) return

   shippingElement.textContent =
      shippingMethod

}

// payment tabs
function paymentTabs() {
   const paymentLinks =
      document.querySelectorAll(
         '.payment__list'
      );

   const paymentLine =
      document.querySelector(
         '.payment__tab-line'
      );

   function movePaymentLine(target) {

      paymentLine.style.width =
         `${target.offsetWidth}px`;

      paymentLine.style.transform =
         `translateX(${target.offsetLeft}px)`;

   }

   const activePaymentLink =
      document.querySelector(
         '.payment__list.active'
      ) || paymentLinks[0];

   if (activePaymentLink) {

      activePaymentLink.classList.add(
         'active'
      );

      movePaymentLine(
         activePaymentLink
      );

   }

   paymentLinks.forEach(link => {

      link.addEventListener(
         'click',
         () => {

            paymentLinks.forEach(link => {

               link.classList.remove(
                  'active'
               );

            });

            link.classList.add(
               'active'
            );

            movePaymentLine(link);

         }
      );

   });

}

// toast notification
function showToast(message) {

   const toast =
      document.querySelector(
         '.toast'
      )

   if (!toast) return

   toast.textContent =
      message

   toast.classList.add(
      'show'
   )

   setTimeout(() => {

      toast.classList.remove(
         'show'
      )

   }, 2500)

}