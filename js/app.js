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
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
let links;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * Creates a list item with a navigational link for each section on the page
 */
function createNavItems() {
  //For each section, create a list item and add it the document fragment
  sections.forEach(section => {
    const li = document.createElement('li');
    docFragment.appendChild(li);
    //Create an anchor and append it to the list item
    const a = document.createElement('a');
    li.appendChild(a);
    //Set the text of the anchor to correspond with section's data-nav attribute
    a.innerHTML = section.dataset.nav;
    //Set the href attribute of the anchor to correspond to the section's id
    a.setAttribute('href', '#' + section.id);
    //Add menu__link class to each anchor
    a.classList.add('menu__link');
  })
  //Append document fragment to ul
  navList.append(docFragment);
  //Make NodeList of links
  links = document.querySelectorAll('.navbar__menu .menu__link');
}

/**
 * Scroll to section whose id corresponds to href of the link clicked
 */
function scrollToSection(e) {
  //Prevents default behavior (of jumping to section) when link is clicked
  e.preventDefault(); 
  sections.forEach(section => {
    //If the section's id corresponds to the link's href, scroll the section into view
    if (e.target.href.includes(section.id)) {
      section.scrollIntoView({
      behavior: 'smooth'
      });
    }
  })
}

/** Set section and corresponding link as active when section is in viewport */
function makeActive(){
//Declare a variable to store targeted section
  let target; 
  sections.forEach(section => {
    //Declare a variable that stores information regarding the position of the section relative to the viewport
    const rect = section.getBoundingClientRect();
    //Determine if top and bottom of section are within viewport parameters
    if (rect.top <= 150 && rect.bottom >= 150) {
      //If conditions are met, set section as target based on it's id
      target = section.id;
      //Add 'active' class to section
      section.classList.add('your-active-class');
    }
    //If section is not within parameters, remove 'active' class from it
    else {
      section.classList.remove('your-active-class');
    }
  })
  links.forEach(link => {
    //If the link's href matches the targeted section's id, add 'active' class to the link
    if (link.href.includes(target)) {
      link.classList.add('active');
    }
    //If the link's href doesn't match the targeted section's id, remove 'active' class from the link  
    else {
      link.classList.remove('active');
    }
  })
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
createNavItems();

/**
 * End Main Functions
 * Begin Events
 *
*/

//Scroll to section on click
document.addEventListener('click', scrollToSection);

//Set section and corresponding link as active when section is scrolled into viewport
window.addEventListener('scroll', makeActive);



