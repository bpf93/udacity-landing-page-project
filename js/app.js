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
  links = document.querySelectorAll('.navbar__menu .menu__link');
}

//Scroll to anchor ID using scrollTO event

/**
 * Iterates over sections NodeList to get the section that corresponds to the link clicked
 *Scrolls to section and makes it active 
 */
function scrollToSection(e) {
  e.preventDefault();
  sections.forEach(section => {
    if (e.target.href.includes(section.id)) {
      section.scrollIntoView({
      behavior: "smooth"
      });
    }
  })
}

/** */
function makeActive(){
//Declare a variable to store targeted section
  let target;
  sections.forEach( section => {
    const rect = section.getBoundingClientRect();
    //If section is within viewport parameters, set as the target and add 'active' class to it
    if (rect.top <= 150 && rect.bottom >= 150) {
      target = section.id;
      section.classList.add('your-active-class');
    }
    //If section is not within parameters, remove 'active' class from it
    else {
      section.classList.remove('your-active-class');
    }
  })
  //Iterate over each link
  links.forEach( link => {
    //If the link's href matches the targeted section's id, add "active" class to the link
    if (link.href.includes(target)) {
      link.classList.add("active");
    }
    //If the link's href doesn't match the targeted section's id, remove "active" class from the link  
    else {
      link.classList.remove("active");
    }
  })
}

/* Sidepanel Functions */
/*
function openPanel() {
navList.classList.toggle("open");
navList.style.width = "18rem";
}

function closePanel() {
  navList.style.width = "0";
  navList.classList.toggle("open");
}

function togglePanel (e) {
  if (navList.classList.contains("open") && !navList.contains(e.target)) {
    closePanel();
  } else if (e.target.className === "openbtn") {
    openPanel()
  }
}
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
createNavItems();

/**
 * End Main Functions
 * Begin Events
 *
*/

// Scroll to section on link click
document.addEventListener('click', scrollToSection);

// Set sections as active
window.addEventListener('scroll', makeActive);

/* Side Panel Event Listeners */
/*
document.addEventListener("click", togglePanel);
*/


