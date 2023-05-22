(function () {
  "use strict";

  // ########################## Preloader ##############################
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  // ########################## Theme switcher ##########################
  var darkMode = false;
  var themeSwitch = document.querySelectorAll("[data-theme-switcher]");
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    darkMode = true;
  }
  if (localStorage.getItem("theme") === "dark") {
    darkMode = true;
  } else if (localStorage.getItem("theme") === "light") {
    darkMode = false;
  }
  if (darkMode) {
    document.documentElement.classList.toggle("dark");
  }
  document.addEventListener("DOMContentLoaded", () => {
    [].forEach.call(themeSwitch, function (ts) {
      ts.checked = darkMode ? true : false;
      ts.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(
          "theme",
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
      });
    });
  });

  // ####################### Header #########################
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function (event) {
    const scrollY = this.window.pageYOffset;
    if (scrollY >= 30) {
      header.classList.add("shadow");
      return;
    }
    header.classList.remove("shadow");
  });

  // ####################### Brand Slider #########################
  new Swiper(".brand-slider", {
    spaceBetween: 12,
    loop: true,

    breakpoints: {
      0: {
        slidesPerView: 1.3,
      },
      450: {
        slidesPerView: 2.5,
      },
      700: {
        slidesPerView: 3,
      },
      850: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },

      1600: {
        slidesPerView: 5.5,
      },
    },
  });

  // ########################## Logo Animation ##############################
  new Swiper(".logo-animation", {
    slidesPerView: 10,
    spaceBetween: 10,
    allowTouchMove: false,
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 1,
      disableOnInteraction: false,
    },
    breakpoints: {
      1350: { slidesPerView: 10 },
      1260: { slidesPerView: 8.5 },
      1180: { slidesPerView: 8 },
      1024: { slidesPerView: 7 },
      790: { slidesPerView: 6 },
      400: { slidesPerView: 3 },
      520: { slidesPerView: 4 },
      680: { slidesPerView: 5 },
      0: { slidesPerView: 2.4 },
    },
  });

  new Swiper(".logo-animation-rtl", {
    slidesPerView: 10,
    direction: "horizontal",
    spaceBetween: 10,
    allowTouchMove: false,
    loop: true,
    speed: 4000,
    autoplay: {
      delay: 1,
      reverseDirection: true,
      disableOnInteraction: false,
    },
    breakpoints: {
      1350: { slidesPerView: 10 },
      1260: { slidesPerView: 8.5 },
      1180: { slidesPerView: 8 },
      1024: { slidesPerView: 7 },
      790: { slidesPerView: 6 },
      400: { slidesPerView: 3 },
      520: { slidesPerView: 4 },
      680: { slidesPerView: 5 },
      0: { slidesPerView: 2.4 },
    },
  });

  new Swiper(".testimonial-slider", {
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: ".testimonial-slider-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });

  // ########################## Tab ##########################
  function setActiveTab(tabGroup, tabName) {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  tabGroups.forEach((tabGroup) => {
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");
    const activeTabName =
      localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
      tabsNavItem[0].getAttribute("data-tab");

    setActiveTab(tabGroup, activeTabName);

    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", () => {
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);
        localStorage.setItem(
          `activeTabName-${tabGroup.dataset.tabGroup}`,
          tabName
        );
      });
    });
  });

  // ########################## Accordion ##########################
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // ########################## Modal ##############################
  const openModalButtons = document.querySelectorAll("[data-modal-open]");
  const closeModalButtons = document.querySelectorAll("[data-modal-close]");

  function openModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "block";
    overlay.style.display = "block";
  }

  function closeModal(modal) {
    if (modal === null) {
      return null;
    }
    const overlay = modal.querySelector("[data-modal-overlay]");
    modal.style.display = "none";
    overlay.style.display = "none";
  }

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.nextElementSibling;
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest("[data-modal]");
      closeModal(modal);
    });
  });

  // video player
  const thumnails = document.querySelectorAll("[data-thumnail]");
  thumnails.forEach((thumnail) => {
    thumnail.addEventListener("click", () => {
      const video = thumnail.nextElementSibling;
      video.classList.remove("hidden");
      video.classList.add("block");
    });
  });

  // card filter
  const departmentSelect = document.querySelector("[data-department]");
  const locationSelect = document.querySelector("[data-office]");
  const cardList = document.querySelectorAll("[data-filter]");

  let selectedDepartment = "*";
  let selectedLocation = "*";

  departmentSelect?.addEventListener("change", (e) => {
    selectedDepartment = e.target.value;
    filtrCardList(selectedDepartment);
  });

  locationSelect?.addEventListener("change", (e) => {
    selectedLocation = e.target.value;
    filtrCardList(selectedLocation);
  });

  const filtrCardList = (filter) => {
    cardList.forEach((card) => {
      const attr = card.dataset.filter;
      if (filter === "*") {
        card.style.display = "block";
      } else {
        const validJSON = attr.replace(/'/g, '"');
        const filterArray = JSON.parse(validJSON);
        const isValueInFilter = filterArray.includes(filter);
        card.style.display = isValueInFilter ? "block" : "none";
      }
    });
  };

  //pricing
  const priceTags = document.querySelectorAll("[data-package]");
  priceTags?.forEach((priceTag) => {
    priceTag.addEventListener("click", function () {
      priceTags.forEach((priceTag) => priceTag.classList.remove("btn-primary"));
      this.classList.add("btn-primary");

      const priceTypes = this.dataset.package;
      const elements = document.querySelectorAll(
        "[data-price-" + priceTypes + "]"
      );

      elements.forEach((element) => {
        const price = element.getAttribute("data-price-" + priceTypes);
        element.innerHTML = "$" + price;
      });
    });
  });

  //  counter;
  let observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.8,
  });

  const counters = document.querySelectorAll("[data-counter]");
  counters?.forEach((counter) => observer.observe(counter));

  function startCounter(counter) {
    const speed = parseInt(counter.getAttribute("data-speed"));
    const target = parseInt(counter.getAttribute("data-target"));
    const count = parseInt(counter.innerText);
    const increment = Math.trunc(target / speed);
    if (count < target) {
      counter.innerHTML = count + increment;
      setTimeout(() => startCounter(counter), 80);
    } else {
      counter.innerText = target;
    }
  }

  function handleIntersection(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > 0) {
        startCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }

  const Shuffle = window.Shuffle; // Assumes you're using the UMD version of Shuffle (for example, from unpkg.com).
  const element = document.getElementById("photo-gallery");
  const sizer = element.querySelector(".js-shuffle-sizer");

  const shuffleInstance = new Shuffle(element, {
    itemSelector: ".picture-item",
  });
})();
