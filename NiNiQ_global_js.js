/* ==================================================
   SHARED HEADER AND FOOTER
================================================== */

const sharedHeader = document.querySelector("#site-header");
const sharedFooter = document.querySelector("#site-footer");

if (sharedHeader) {
  sharedHeader.innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <a href="index.html" class="brand-logo" aria-label="NiNi-Q home">
          <img src="logo.65.png" alt="NiNi-Q logo">
        </a>

        <nav class="desktop-nav" aria-label="Main navigation">
          <a href="index.html">Home</a>
          <a href="NiNiQ_quilts.html">Shop Quilts</a>
          <a href="NiNiQ_about.html">About</a>
          <a href="NiNiQ_custom.html">Custom Request</a>
        </nav>

        <div class="header-actions">
          <a href="NiNiQ_cart.html" class="cart-link" aria-label="View shopping bag">
            <svg class="shopping-bag-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.5 8.5h11l1 12h-13l1-12Z"></path>
              <path d="M9 9V6.75C9 5.23 10.34 4 12 4s3 1.23 3 2.75V9"></path>
            </svg>
            <span class="cart-count">0</span>
          </a>

          <button type="button" class="menu-button" aria-label="Open navigation menu" aria-expanded="false">
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <nav class="mobile-nav" aria-label="Mobile navigation">
        <a href="index.html">Home</a>
        <a href="NiNiQ_quilts.html">Shop Quilts</a>
        <a href="NiNiQ_about.html">About</a>
        <a href="NiNiQ_custom.html">Custom Request</a>
      </nav>
    </header>
  `;
}

if (sharedFooter) {
  sharedFooter.innerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo" aria-label="NiNi-Q home">
            <img src="logo.65.png" alt="NiNi-Q logo">
          </a>
          <p>Professionally designed. Handcrafted with intention. Made to be treasured.</p>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="NiNiQ_quilts.html">Shop Quilts</a>
          <a href="NiNiQ_about.html">About</a>
          <a href="NiNiQ_custom.html">Custom Request</a>
          <a href="NiNiQ_cart.html">Shopping Bag</a>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>&copy; <span class="copyright-year"></span> NiNi-Q Quilts. All rights reserved.</p>
      </div>
    </footer>
  `;

  const copyrightYear = sharedFooter.querySelector(".copyright-year");
  copyrightYear.textContent = new Date().getFullYear();
}


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
