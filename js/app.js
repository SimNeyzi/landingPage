// Global Variables
const sections = document.querySelectorAll('section');
const navBar = document.querySelector('#navbar__list');
let highlighted = document.querySelector('ul');
let sectionObj = {};
let header = document.querySelector('.page__header');

// Helper Functions
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  let inView;

  function checkPercentage(inView, windowHeight) {
    if ((inView / windowHeight) * 100 > 51) {
      return true;
    } else {
      return false;
    }
  }

  if (rect.bottom < 0) {
    return false;
  }

  if (rect.top > window.innerHeight) {
    return false;
  }

  if (rect.top < 0 && rect.bottom > window.innerHeight) {
    return true;
  }

  if (rect.top < 0 && rect.bottom < window.innerHeight) {
    inView = rect.bottom;
  }

  if (rect.top > 0 && rect.bottom > window.innerHeight) {
    inView = window.innerHeight - rect.top;
  }

  if (rect.top > 0 && rect.bottom < window.innerHeight) {
    inView = rect.bottom - rect.top;
  }

  return checkPercentage(inView, window.innerHeight);
}

// Main Functions

// Build the navbar
function buildNav() {
  const fragment = document.createDocumentFragment();
  for (const section of sections) {
    const li = document.createElement('li');
    li.classList.add('menu__link');
    li.textContent = section.dataset.nav;
    sectionObj[section.dataset.nav] = section.id;
    fragment.appendChild(li);
  }
  navBar.appendChild(fragment);
}

// Highlight section name in navbar based on viewport
function highlight(element) {
  const menuLinks = document.querySelectorAll('.menu__link')
  for (const menuLink of menuLinks) {
    if (menuLink.textContent === element.dataset.nav) {
      menuLink.classList.add('highlight');
    } else {
      menuLink.classList.remove('highlight');
    }
  }
}

// Add class 'active' to section when near top of viewport
function addClassActive(elements) {
  for (const element of elements) {
    if (isInViewport(element)) {
      element.classList.add('your-active-class');
      highlight(element);
    } else {
      element.classList.remove('your-active-class');
    }
  }
}

// Scroll to anchor ID using scrollTO event
function scroll(element) {
  const id = sectionObj[element.innerText];
  const clickedSection = document.getElementById(id);
  clickedSection.scrollIntoView({ behavior: 'smooth' });
}

// Events
function setActive() {
  document.addEventListener('scroll', () => { addClassActive(sections) });
}

function hideNavbar() {
  document.addEventListener('scroll', () => {
    header.classList.remove('scroll-not-active')
    setTimeout(() => { header.classList.add('scroll-not-active') }, 5000);
  })
}

function scrollToSection() {
  navBar.addEventListener('click',
    (e) => { e.target.nodeName === 'LI' ? scroll(e.target) : null }
  );
}

// Build menu
buildNav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
setActive();

// Hide nav bar when not scrolling
hideNavbar();
