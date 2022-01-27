/**
 * Define Global Variables
 *
 */
const navList = document.getElementById("navbar__list");
const sections = document.getElementsByTagName("section");
const anchorTags = document.getElementsByClassName("menu__link");
const fregNavList = document.createDocumentFragment();
const scrollBtn = document.getElementById("scroll-btn");
const hamburgerIcon = document.getElementById("hamburger-icon");

// variable to store the active section throughout the code
let activeSection = document.querySelector(".your-active-class");
// variable to store the active anchor tag
let activeAnchor;
let navElementCount = 0;
let lastScrollTop = 0;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Create nav element
 * @param {string} sectionName
 * @param {string} sectionId
 * @returns {Node} list item
 */
function createNavElement(secName, sectionId) {
  const navElement = document.createElement("li");
  const anchorTag = document.createElement("a");
  navElementCount++;

  anchorTag.setAttribute("id", "anchor" + navElementCount);
  anchorTag.setAttribute("href", `#${sectionId}`);
  anchorTag.classList.add("menu__link");
  anchorTag.textContent = secName;

  navElement.appendChild(anchorTag);

  return navElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description Build the nav
 * @param {HTMLCollection} sections
 */
function buildNavBar(sections) {
  for (let section of sections) {
    const secName = section.getAttribute("data-nav");
    const secId = section.getAttribute("id");

    fregNavList.appendChild(createNavElement(secName, secId));
  }
  navList.appendChild(fregNavList);

  // set the first link as active link
  const activeAnch = document.getElementById("anchor1");
  activeAnch.classList.add("menu__link--active");
  activeAnchor = activeAnch;
}

/**
 * @description  Set section and its anchor tag as active
 * @param {Node} inactiveSection
 */
function activateSection(inactiveSec) {
  if (inactiveSec !== activeSection) {
    // activate section
    inactiveSec.classList.add("your-active-class");
    activeSection.classList.remove("your-active-class");
    activeSection = inactiveSec;

    // activate anchor tag
    let anchorId = inactiveSec.getAttribute("id");
    anchorId = anchorId.replace("section", "anchor");
    const anchor = document.getElementById(anchorId);

    anchor.classList.add("menu__link--active");
    activeAnchor.classList.remove("menu__link--active");
    activeAnchor = anchor;
  }
}

// Add class 'active' to section when near top of viewport
onscroll = function () {
  let scrollPoss = this.document.documentElement.scrollTop;

  for (let section of sections) {
    if (
      scrollPoss >= section.offsetTop - 100 &&
      scrollPoss <= section.offsetTop - 200 + section.offsetHeight
    ) {
      for (let anchor of anchorTags) {
        anchor.classList.add("unfocus");
      }
      activateSection(section);
    }
  }
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNavBar(sections);

// Scroll to section on link click
navList.addEventListener("click", (e) => {
  if (e.target.nodeName === "A") {
    e.preventDefault();
    const sec = document.querySelector(
      `[data-nav = '${e.target.textContent}']`
    );
    const secPoss = sec.getBoundingClientRect().top;
    const startPoss = window.pageYOffset;
    activateSection(sec);

    window.scrollTo({
      top: secPoss + startPoss,
      behavior: "smooth",
    });

    navList.classList.toggle("visible");
  }
});

// hide the nav while scroll down and show it while scroll up
window.addEventListener("scroll", function () {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  const nav = document.getElementById("navbar__list");

  if (st > lastScrollTop) {
    nav.style.top = "-150px";
  } else {
    nav.style.top = "0";
  }

  lastScrollTop = st <= 0 ? 0 : st;
});

/* Change the nav style when scroll */
const nav = document.getElementById("navbar__list");
const sectionOne = document.getElementById("section1");

const sectionOneOptions = {
  rootMargin: "-670px 0px 0px 0px",
};

const sectionOneObserver = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });
}, sectionOneOptions);

sectionOneObserver.observe(sectionOne);

/* form focus state */

const inputs = document.getElementsByTagName("input");

for (var i = 0; i < inputs.length; i++) {
  const input = inputs[i];
  input.addEventListener("input", function () {
    this.value
      ? this.classList.add("notempty")
      : this.classList.remove("notempty");
  });
}

const textarea = document.getElementsByTagName("textarea")[0];

textarea.addEventListener("input", function () {
  this.value
    ? this.classList.add("notempty")
    : this.classList.remove("notempty");
});

/* reset form after submission */

const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  setTimeout(() => {
    form.reset();
  }, 100);
  return true;
});
