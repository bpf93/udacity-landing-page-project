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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const docFragment = document.createDocumentFragment();
const navList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");
let links;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * 
 */
function createNavItems() {
  for (let i = 0; i < sections.length; i++) {
    //Create list item and add to document fragment
    const li = document.createElement("li");
    docFragment.appendChild(li);
    //Create anchor and append to list item
    const a = document.createElement("a");
    li.appendChild(a);
    //Set text and attribute for anchor
    a.innerHTML = sections[i].dataset.nav;
    a.setAttribute("href", "#" + sections[i].id);
    a.classList.add("menu__link");
  }
  //Append document fragment to ul
  navList.append(docFragment);
  //Make NodeList of links
  links = document.querySelectorAll('a');
}

/**
 * 
 */
function setActiveClass() {
  sections.forEach(section => {
    //Remove 'active' class from any section that's not currently at the top of the viewport
    if (Math.floor(section.getBoundingClientRect().top) !== 0) {
      section.classList.remove("your-active-class");
    } 
    //Add 'active' class to the section at the top of the viewport
    if (Math.floor(section.getBoundingClientRect().top) === 0) {
      section.classList.add("your-active-class");
    }
  });
}

  /**
   * Scroll to anchor ID using scrollTO event
   */
//function makeActive(){
//  for (const section of sections) {
//      const sect = section.getBoundingClientRect();
//      if (sect.top <= 160 && sect.bottom >= 160) {
//      //apply active state on current section
//      section.classList.add("your-active-class");
//      } else {
//      //Remove active state from other section
//      section.classList.remove("your-active-class");
//      }
//   }
//}

function scrollTo(e) {
  e.preventDefault();
  //Iterates over sections NodeList to get the section that corresponds to the link clicked then scrolls to section
  for (let i = 0; i < sections.length; i++){  
    if (e.target.hash === "#" + sections[i].id) {
      sections[i].scrollIntoView({
      behavior: "smooth"
    });
  //When scroll is complete, trigger the setActiveClass event handler
    document.addEventListener("scrollend", setActiveClass);
    }
  }
}

/** */
function openNav() {
  navList.classList.toggle("open");
  navList.style.width = "18rem";
}

/** */
function closeNav() {
  navList.style.width = "0";
  navList.classList.toggle("open");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createNavItems();

// Add class 'active' to section when near top of viewport

/**Add class 'active' to section when near top of viewport*/
function goToSection(e) {
  scrollTo(e);
}

function toggleNav (e) {
  if (navList.classList.contains("open") && !navList.contains(e.target)) {
    closeNav();
  } else if (e.target.className === "openbtn") {
    openNav()
  }
}

function hash(e) {
  for (const section of sections) {
    if (location.hash === "#" + section.id) {
      console.log(section.id + "is active");
      section.classList.add("your-active-class");
        } else {
          console.log(section.id + "is not active");
        //Remove active state from other section
        section.classList.remove("your-active-class");
        }
    }
  }

// Scroll to anchor ID using scrollTO event
/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
 
// Scroll to section on link click
/**
 * Scroll to section on link click
 * Set sections as active
 */
navList.addEventListener("click", goToSection);

/** */
document.addEventListener("click", toggleNav);

// Set sections as active
//document.addEventListener("scroll", makeActive);
window.addEventListener('hashchange', hash);




