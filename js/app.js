
/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('#navbar__list');
let highlighted = document.querySelector('ul');
let sectionObj = {};
/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function buildNav() {
  const fragment = document.createDocumentFragment();

  for (const section of sections) {
    const li = document.createElement('li');
    li.classList.add('menu__link');
    // const a = document.createElement('a');
    li.textContent = section.dataset.nav;
    sectionObj[section.dataset.nav] = section.id;
    //console.log(sectionObj);
    // a.setAttribute('href', '#'+section.id);
    // li.appendChild(a);
    fragment.appendChild(li);
  }

  navBar.appendChild(fragment);
}
// Add class 'active' to section when near top of viewport
function addClassActive(elements) {
  for (const element of elements) {
    if (isInViewport(element)) {
      element.classList.add('your-active-class');
    } else {
      element.classList.remove('your-active-class');
    }
  }
}

// Scroll to anchor ID using scrollTO event

function scroll(element) {
  highlighted.classList.remove('highlight');
  highlighted = element;
  element.classList.add('highlight');
  const id = sectionObj[element.innerText];
  const clickedSection = document.getElementById(id);
  clickedSection.scrollIntoView({behavior:'smooth'});
}


/**
 * End Main Functions
 * Begin Events
 *
*/

document.addEventListener('scroll', () => {addClassActive(sections)});
navBar.addEventListener('click',
  (e) => {e.target.nodeName === 'LI' ? scroll(e.target) : null}
);

// Build menu
buildNav();

// Scroll to section on link click

// Set sections as active