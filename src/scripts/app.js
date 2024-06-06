"use strict";

function burgerMenu() {
    var boutonBurgerMenu = document.querySelector(".burgermenu");
    var listeSvgBurgermenu = document.querySelectorAll(".burgermenu__svg");
    var menuListe = document.querySelector(".nav__menu");
  
    if (boutonBurgerMenu && listeSvgBurgermenu && menuListe) {
      var activateBurgermenu = function activateBurgermenu() {
        listeSvgBurgermenu.forEach(function (svg) {
          if (svg.classList.contains("svg--active")) {
            svg.classList.toggle("svg--inactive");
            svg.classList.toggle("svg--active");
          } else if (svg.classList.contains("svg--inactive")) {
            svg.classList.toggle("svg--active");
            svg.classList.toggle("svg--inactive");
          }
        });
        menuListe.classList.toggle("nav__menu--active");
      };
  
      boutonBurgerMenu.addEventListener("click", activateBurgermenu);
    }
  }
  
  burgerMenu();

  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelectorAll('.slider__indicator');
    const readMoreButton = document.getElementById('read-more');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-text');
    const closeBtn = document.querySelector('.popup__close');
    const prevButton = document.querySelector('.slider__nav--prev');
    const nextButton = document.querySelector('.slider__nav--next');
    const slider = document.querySelector('.slider');
    const totalSlides = slides.length;

    let currentIndex = 0;
    let isAnimating = false;

    // Clone first and last slide for infinite loop effect
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[totalSlides - 1].cloneNode(true);

    slider.appendChild(firstSlide);
    slider.insertBefore(lastSlide, slides[0]);

    function updateSlider(index, animate = true) {
        if (animate) {
            slider.style.transition = 'transform 0.5s ease-in-out';
        } else {
            slider.style.transition = 'none';
        }
        slider.style.transform = `translateX(-${(index + 1) * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('slider__indicator--active', i === index);
        });
    }

    function goToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        currentIndex = index;
        updateSlider(currentIndex);

        setTimeout(() => {
            if (currentIndex === -1) {
                slider.style.transition = 'none';
                currentIndex = totalSlides - 1;
                updateSlider(currentIndex, false);
            } else if (currentIndex === totalSlides) {
                slider.style.transition = 'none';
                currentIndex = 0;
                updateSlider(currentIndex, false);
            }
            isAnimating = false;
        }, 500);
    }

    function showPopup(content) {
        popupContent.innerText = content;
        popup.style.display = 'flex';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    readMoreButton.addEventListener('click', () => {
        const contents = [
            "Lorem ipsum dolor sit amet, readImAde description...",
            "Lorem ipsum dolor sit amet, décembre description...",
            "Lorem ipsum dolor sit amet, Dataplay description...",
            "Lorem ipsum dolor sit amet, RUX 2024 description..."
        ];
        showPopup(contents[currentIndex]);
    });

    closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    prevButton.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });

    let startX, endX;
    document.querySelector('.slider__container').addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].clientX;
    });

    document.querySelector('.slider__container').addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) {
            goToSlide(currentIndex + 1);
        } else if (startX < endX - 50) {
            goToSlide(currentIndex - 1);
        }
    });

    document.querySelector('.slider__container').addEventListener('mousedown', (e) => {
        startX = e.clientX;
    });

    document.querySelector('.slider__container').addEventListener('mouseup', (e) => {
        endX = e.clientX;
        if (startX > endX + 50) {
            goToSlide(currentIndex + 1);
        } else if (startX < endX - 50) {
            goToSlide(currentIndex - 1);
        }
    });

    // Initial update to set up slider position
    updateSlider(currentIndex, false);
});
