//From scriptCard.js
let responseJson20Buket = '';
let url = '';
let pokemonNr = 1;
let statsData = {};
let pokeData = [];
let pokeSpecialTxt = {};
let blockAddNewCardsForSearch = false;


// from scriptBucketOfCards.js
let cardObj = [{ pokName: '',pokId: '', pokImg: '', pokType1: '', pokType2: '' }]; // for storage of neccessary data for each loaded card
let searchCardObj = [];
let startPokeID = 0;



// form loadNEWCards.js
// Options for IntersectionObserver
const options = {
    root: null, // the viewport is the root
    rootMargin: "0px",
    threshold: 0.5, // Trigger, if 50% target element in viewport
}

let observer = new IntersectionObserver(intersectionCallback, options);
let targetElement = document.querySelector("#end-of-page");
observer.observe(targetElement);


// Eventlistener:

document.addEventListener("DOMContentLoaded", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show"); 
    });
});

// for scrolling to top
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});