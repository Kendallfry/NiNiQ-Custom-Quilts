/* ==================================================
   SHOPPING CART
================================================== */

const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const cartTotalDisplay =
  document.querySelector("#cart-total-display");
const checkoutButton =
  document.querySelector("#checkout-button");


if (cartItems && cartTotal) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  /* ==================================================
     NORMALIZE ONE-OF-A-KIND CART
  ================================================== */

  /*
    Each quilt is one of a kind.

    This removes duplicate quilt entries that may already
    exist in localStorage and forces every quantity to 1.
  */

  function normalizeCart() {

    const uniqueCart = [];

    cart.forEach(function (item) {

      const existingItem = uniqueCart.find(
        function (savedItem) {
          return savedItem.name === item.name;
        }
      );

      if (!existingItem) {

        uniqueCart.push({
          ...item,
          quantity: 1
        });

      }

    });

    cart = uniqueCart;

  }


  /* ==================================================
     SAVE CART
  ================================================== */

  function saveCart() {

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();

  }


  /* ==================================================
     DISPLAY CART
  ================================================== */

  function displayCart() {

    let total = 0;

    cartItems.innerHTML = "";


    /* ================================================
       EMPTY CART
    ================================================= */

    if (cart.length === 0) {

      cartItems.innerHTML = `
        <div class="empty-cart">

          <h3>Your shopping bag is empty.</h3>

          <p>
            Explore the collection and find a handmade
            quilt created for your space.
          </p>

          <a
            href="NiNiQ_quilts.html"
            class="button"
          >
            Shop the Collection
          </a>

        </div>
      `;

      updateDisplayedTotals(0);

      disableCheckout();

      return;

    }


    /* ================================================
       ACTIVE CHECKOUT BUTTON
    ================================================= */

    enableCheckout();


    /* ================================================
       CREATE CART ITEMS
    ================================================= */

    cart.forEach(function (item, index) {

      const itemPrice = Number(item.price);

      total += itemPrice;


      cartItems.innerHTML += `
        <article class="cart-item">

          <img
            class="cart-item-image"
            src="${item.image}"
            alt="${item.name}"
          >

          <div class="cart-item-details">

            <h3>${item.name}</h3>

            <p class="cart-item-price">
              $${itemPrice.toFixed(2)}
            </p>

            <p class="one-of-a-kind-label">
              One-of-a-kind quilt
            </p>

            <div class="cart-item-controls">

              <button
                type="button"
                class="remove-item"
                data-index="${index}"
                aria-label="Remove ${item.name} from shopping bag"
              >
                Remove
              </button>

            </div>

          </div>

          <p class="cart-item-total">
            $${itemPrice.toFixed(2)}
          </p>

        </article>
      `;

    });


    updateDisplayedTotals(total);

    addCartEventListeners();

  }


  /* ==================================================
     UPDATE BOTH TOTAL DISPLAYS
  ================================================== */

  function updateDisplayedTotals(total) {

    const formattedTotal = total.toFixed(2);

    cartTotal.textContent = formattedTotal;

    if (cartTotalDisplay) {
      cartTotalDisplay.textContent = formattedTotal;
    }

  }


  /* ==================================================
     DISABLE CHECKOUT
  ================================================== */

  function disableCheckout() {

    if (!checkoutButton) {
      return;
    }

    checkoutButton.classList.add("disabled");

    checkoutButton.setAttribute(
      "aria-disabled",
      "true"
    );

    checkoutButton.removeAttribute("href");

    checkoutButton.onclick = function (event) {

      event.preventDefault();

      alert(
        "Your shopping bag is empty. Add a quilt before checking out."
      );

    };

  }


  /* ==================================================
     ENABLE CHECKOUT
  ================================================== */

  function enableCheckout() {

    if (!checkoutButton) {
      return;
    }

    checkoutButton.classList.remove("disabled");
    checkoutButton.removeAttribute("aria-disabled");

    checkoutButton.setAttribute(
      "href",
      "NiNiQ_checkout.html"
    );

    checkoutButton.onclick = null;

  }


  /* ==================================================
     CART EVENT LISTENERS
  ================================================== */

  function addCartEventListeners() {

    const removeButtons =
      document.querySelectorAll(".remove-item");


    removeButtons.forEach(function (button) {

      button.addEventListener(
        "click",
        function () {

          const itemIndex =
            Number(button.dataset.index);

          cart.splice(itemIndex, 1);

          saveCart();
          displayCart();

        }
      );

    });

  }


  /* ==================================================
     INITIALIZE CART
  ================================================== */

  normalizeCart();
  saveCart();
  displayCart();

}