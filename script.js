"use strict";

const allSections = document.querySelectorAll(".section");
const dropDown = document.querySelectorAll(".nav_item-sub");
const nav = document.querySelector(".nav");
const navArrow = document.querySelectorAll(".arr-btn");
const mobileToggle = document.querySelector(".toggle_btn");
const mobileNav = document.querySelector(".nav_flex");
const signUp = document.querySelectorAll(".btn-signUp");
const login = document.querySelectorAll(".btn-login");
const closePopup = document.querySelectorAll(".close_btn");
const overlay = document.querySelector(".overlay");

///////////////media query
let mql = window.matchMedia("(max-width: 900px)");
/////////section fading in
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section_hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  section.classList.add("section_hidden");
  sectionObserver.observe(section);
});

////////////Drop down menu
let nextSibling;
let activeElement;
const activateNav = function (target) {
  target.classList.add("arr-btnUp");
  if (mql.matches) {
    return;
  }
  target.src = "/images/icon-arrow-light.svg";
  // target.style.transform = "rotate(180deg)";
  target.classList.add("arr-btnUp");
  console.log(target);
};
const deactivateNav = function (target) {
  target.src = "/images/icon-arrow-dark.svg";
  // target.style.transform = "rotate(0deg)";

  target.classList.remove("arr-btnUp");
  console.log(target);
  console.log("done");
};
nav.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    // e.target.classList.contains("nav_item-p") ||
    // e.target.classList.contains("arr-btn")
    e.target.parentNode.classList.contains("nav_item-title")
  ) {
    console.log(e.target);
    navArrow.forEach((img) => img.classList.remove("arr-btnUp"));

    // else if()
    if (e.target.classList.contains("arr-btn")) {
      activateNav(e.target);
    } else activateNav(e.target.nextElementSibling);
    console.log(activeElement);
    if (activeElement) deactivateNav(activeElement);
    activeElement = e.target;
    // activateNav(e.target);
    // nextSibling = e.target.nextElementSibling;
    // lastchild = e.target.lastElementChild;
    // while (nextSibling) {
    //   activeElement = nextSibling;
    //   if (nextSibling.classList.contains("nav_item-sub")) break;
    //   nextSibling = nextSibling.nextElementSibling;
    // }
    dropDown.forEach((menu) => {
      if (menu !== e.target.parentNode.nextElementSibling) {
        menu.classList.add("hidden");
      }
    });
    console.log(e.target.parentNode);
    e.target.parentNode.nextElementSibling.classList.toggle("hidden");
  }
});
let test = true;
mobileToggle.addEventListener("click", (e) => {
  console.log(e.target.src);
  mobileNav.style.display = "flex";
  if (test) {
    // mobileNav.style.opacity = "1";
    e.target.src = "/images/icon-close.svg";
    mobileNav.style.animation = "navFadein 2s ease forwards";
  }
  if (!test) {
    e.target.src = "/images/icon-hamburger.svg";
    mobileNav.style.animation = "navFadeout 2s ease forwards";
    // mobileNav.style.opacity = "0";
  }
  test = !test;
});

signUp.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".popup-login").classList.add("hidden");
    overlay.classList.remove("hidden");
    document.querySelector(".popup-signup").classList.remove("hidden");
  });
});

login.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelector(".popup-signup").classList.add("hidden");
    overlay.classList.remove("hidden");
    document.querySelector(".popup-login").classList.remove("hidden");
  });
});

closePopup.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    overlay.classList.add("hidden");
    document.querySelector(".popup-signup").classList.add("hidden");
    document.querySelector(".popup-login").classList.add("hidden");
  });
});

overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
  document.querySelector(".popup-signup").classList.add("hidden");
  document.querySelector(".popup-login").classList.add("hidden");
});
