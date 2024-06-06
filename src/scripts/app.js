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