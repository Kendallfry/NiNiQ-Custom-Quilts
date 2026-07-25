/* ==================================================
   GLOBAL HEADER
================================================== */

const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

function updateHeaderOnScroll() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}

updateHeaderOnScroll();

window.addEventListener("scroll", updateHeaderOnScroll);


/* ==================================================
   MOBILE NAVIGATION
================================================== */

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = mobileNav.classList.toggle("open");

    menuButton.classList.toggle("open", menuIsOpen);
    menuButton.setAttribute(
      "aria-expanded",
      menuIsOpen.toString()
    );

    document.body.classList.toggle("menu-open", menuIsOpen);
  });

  const mobileLinks = mobileNav.querySelectorAll("a");

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("open");
      menuButton.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}


/* ==================================================
   ACTIVE NAVIGATION LINK
================================================== */

const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

const navigationLinks = document.querySelectorAll(
  ".desktop-nav a, .mobile-nav a"
);

navigationLinks.forEach(function (link) {
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


/* ==================================================
   CART COUNT
================================================== */

function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".cart-count");
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalQuantity = savedCart.reduce(function (total, item) {
    return total + (Number(item.quantity) || 1);
  }, 0);

  cartCountElements.forEach(function (cartCount) {
    cartCount.textContent = totalQuantity;

    cartCount.classList.remove("bump");

    void cartCount.offsetWidth;

    cartCount.classList.add("bump");
  });
}

updateCartCount();


/* ==================================================
   SCROLL REVEAL
================================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("visible");
  });
}