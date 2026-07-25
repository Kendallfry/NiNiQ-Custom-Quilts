/* ==================================================
   CHECKOUT PAGE
================================================== */

const checkoutItems =
  document.querySelector("#checkout-items");

const checkoutSubtotal =
  document.querySelector("#checkout-subtotal");

const checkoutTotal =
  document.querySelector("#checkout-total");

const checkoutForm =
  document.querySelector("#checkout-form");

const placeOrderButton =
  document.querySelector("#place-order-button");

const checkoutMessage =
  document.querySelector("#checkout-message");

const cardNumberInput =
  document.querySelector("#card-number");

const expirationInput =
  document.querySelector("#exp-date");

const cvvInput =
  document.querySelector("#cvv");


if (checkoutItems && checkoutTotal) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  /* ==================================================
     NORMALIZE ONE-OF-A-KIND CART
  ================================================== */

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

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();

  }


  /* ==================================================
     DISPLAY ORDER SUMMARY
  ================================================== */

  function displayCheckoutSummary() {

    let total = 0;

    checkoutItems.innerHTML = "";


    /* ================================================
       EMPTY SHOPPING BAG
    ================================================= */

    if (cart.length === 0) {

      checkoutItems.innerHTML = `
        <div class="checkout-empty">

          <h3>Your shopping bag is empty.</h3>

          <p>
            Add a one-of-a-kind quilt before continuing
            through checkout.
          </p>

          <a
            href="NiNiQ_quilts.html"
            class="button"
          >
            Shop the Collection
          </a>

        </div>
      `;

      updateCheckoutTotals(0);
      disableCheckout();

      return;

    }


    /* ================================================
       CREATE SUMMARY ITEMS
    ================================================= */

    cart.forEach(function (item) {

      const itemPrice = Number(item.price) || 0;

      total += itemPrice;

      checkoutItems.innerHTML += `
        <article class="checkout-summary-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div class="checkout-summary-item-details">

            <h3>${item.name}</h3>

            <p>One-of-a-kind quilt</p>

            <span>Quantity: 1</span>

          </div>

          <strong>
            $${itemPrice.toFixed(2)}
          </strong>

        </article>
      `;

    });

    updateCheckoutTotals(total);
    enableCheckout();

  }


  /* ==================================================
     UPDATE TOTALS
  ================================================== */

  function updateCheckoutTotals(total) {

    const formattedTotal = total.toFixed(2);

    if (checkoutSubtotal) {
      checkoutSubtotal.textContent = formattedTotal;
    }

    checkoutTotal.textContent = formattedTotal;

  }


  /* ==================================================
     DISABLE CHECKOUT
  ================================================== */

  function disableCheckout() {

    if (!placeOrderButton) {
      return;
    }

    placeOrderButton.disabled = true;
    placeOrderButton.classList.add("disabled");

    if (checkoutMessage) {

      checkoutMessage.textContent =
        "Your shopping bag is empty. Add a quilt before placing an order.";

      checkoutMessage.classList.add("error-message");

    }

  }


  /* ==================================================
     ENABLE CHECKOUT
  ================================================== */

  function enableCheckout() {

    if (!placeOrderButton) {
      return;
    }

    placeOrderButton.disabled = false;
    placeOrderButton.classList.remove("disabled");

  }


  /* ==================================================
     FORMAT CARD NUMBER
  ================================================== */

  if (cardNumberInput) {

    cardNumberInput.addEventListener(
      "input",
      function () {

        const digits =
          cardNumberInput.value
            .replace(/\D/g, "")
            .slice(0, 16);

        const groups =
          digits.match(/.{1,4}/g);

        cardNumberInput.value =
          groups ? groups.join(" ") : "";

      }
    );

  }


  /* ==================================================
     FORMAT EXPIRATION DATE
  ================================================== */

  if (expirationInput) {

    expirationInput.addEventListener(
      "input",
      function () {

        let digits =
          expirationInput.value
            .replace(/\D/g, "")
            .slice(0, 4);

        if (digits.length > 2) {

          digits =
            digits.slice(0, 2) +
            " / " +
            digits.slice(2);

        }

        expirationInput.value = digits;

      }
    );

  }


  /* ==================================================
     FORMAT SECURITY CODE
  ================================================== */

  if (cvvInput) {

    cvvInput.addEventListener(
      "input",
      function () {

        cvvInput.value =
          cvvInput.value
            .replace(/\D/g, "")
            .slice(0, 4);

      }
    );

  }


  /* ==================================================
     DEMONSTRATION FORM SUBMISSION
  ================================================== */

  if (checkoutForm) {

    checkoutForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        if (cart.length === 0) {
          disableCheckout();
          return;
        }


        /* Use built-in HTML validation */

        if (!checkoutForm.checkValidity()) {

          checkoutForm.reportValidity();

          if (checkoutMessage) {

            checkoutMessage.textContent =
              "Please complete all required fields before continuing.";

            checkoutMessage.classList.add("error-message");
            checkoutMessage.classList.remove("success-message");

          }

          return;

        }


        /*
          This checkout is currently a portfolio
          demonstration only.

          Do not save payment information in
          localStorage.
        */

        if (checkoutMessage) {

          checkoutMessage.textContent =
            "Checkout demonstration complete. No payment was processed and no order was submitted.";

          checkoutMessage.classList.remove("error-message");
          checkoutMessage.classList.add("success-message");

        }

      }
    );

  }


  /* ==================================================
     INITIALIZE CHECKOUT
  ================================================== */

  normalizeCart();
  displayCheckoutSummary();

}