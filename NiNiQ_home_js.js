
// Code for quilt slideshow
const quiltCards = document.querySelectorAll(".quilt-card");

quiltCards.forEach(function (card) {
  const slides = card.querySelectorAll(".slide");
  const prevButton = card.querySelector(".prev");
  const nextButton = card.querySelector(".next");

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(function (slide) {
      slide.style.display = "none";
    });

    slides[index].style.display = "block";
  }

  nextButton.addEventListener("click", function () {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  });

  prevButton.addEventListener("click", function () {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  });

  showSlide(currentSlide);
});

// Cart button code 
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const quilt = {
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingQuilt = cart.find(function (item) {
      return item.name === quilt.name;
    });

    if (existingQuilt) {
      existingQuilt.quantity++;
    } else {
      cart.push(quilt);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(quilt.name + " added to cart!");
  });
});


const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutButton = document.querySelector("#checkout-button");

if (cartItems && cartTotal) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {

      cartItems.innerHTML = "<p>Your cart is empty.</p>";

      cartTotal.textContent = 0;

      if (checkoutButton) {

        checkoutButton.classList.add("disabled-button");
        checkoutButton.removeAttribute("href");

        checkoutButton.onclick = function (event) {

          event.preventDefault();

          alert("Your cart is empty. Add a quilt before checking out.");

        };

      }
      return;
    }

    if (checkoutButton) {

      checkoutButton.classList.remove("disabled-button");

      // Restores the correct checkout-page link.
      checkoutButton.setAttribute("href", "NiNiQ_checkout.html");

      // Removes the empty-cart click behavior.
      checkoutButton.onclick = null;
    }

    cart.forEach(function (item, index) {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;

      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">

          <div>
            <h3>${item.name}</h3>
            <p>$${item.price} each</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Item Total: $${itemTotal}</p>
          </div>

          <div class="quantity-controls">

              <button class="decrease" data-index="${index}">−</button>

              <span>${item.quantity}</span>

              <button class="increase" data-index="${index}">+</button>

          </div>
        </div>
      `;
    });

    // Cart quantity increase button

    const increaseButtons = document.querySelectorAll(".increase");

    increaseButtons.forEach(function (button) {

      button.addEventListener("click", function () {

        const index = button.dataset.index;

        cart[index].quantity++;

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        displayCart();

      });

    });

    // Cart quantity decrease button

    const decreaseButtons = document.querySelectorAll(".decrease");

    decreaseButtons.forEach(function (button) {

      button.addEventListener("click", function () {

        const index = button.dataset.index;

        cart[index].quantity--;

        if (cart[index].quantity <= 0) {

          cart.splice(index, 1);

        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        displayCart();

      });

    });


    // Cart item removal button
    cartTotal.textContent = total;

    const removeButtons = document.querySelectorAll(".remove-item");

    removeButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const itemIndex = button.dataset.index;

        cart.splice(itemIndex, 1);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();

        displayCart();
      });
    });
  }

  displayCart();
}



// Checkout code
const checkoutItems = document.querySelector("#checkout-items");
const checkoutTotal = document.querySelector("#checkout-total");

if (checkoutItems && checkoutTotal) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  checkoutItems.innerHTML = "";

  cart.forEach(function (item) {
    total += item.price;

    checkoutItems.innerHTML += `
      <div class="checkout-summary-item">
        <p><strong>${item.name}</strong></p>
        <p>$${item.price}</p>
      </div>
    `;
  });

  checkoutTotal.textContent = total;
}

/* ==================================================
   GLOBAL HEADER
================================================== */

const siteHeader = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

if (siteHeader) {
  window.addEventListener("scroll", function () {
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
  });
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = mobileNav.classList.toggle("open");

    menuButton.classList.toggle("open", menuIsOpen);
    menuButton.setAttribute("aria-expanded", menuIsOpen);
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

/* Automatically highlights the current page*/

const currentPage = window.location.pathname.split("/").pop();

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
   Animate Any Section
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