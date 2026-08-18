/* ==================================================
   QUILT IMAGE SLIDESHOWS
================================================== */

const quiltCards = document.querySelectorAll(".quilt-card");

quiltCards.forEach(function (card) {
  const slides = card.querySelectorAll(".slide");
  const previousButton = card.querySelector(".prev");
  const nextButton = card.querySelector(".next");

  if (
    slides.length === 0 ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  if (slides.length === 1) {
    previousButton.hidden = true;
    nextButton.hidden = true;
  }

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

  previousButton.addEventListener("click", function () {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  });

  showSlide(currentSlide);
});


/* ==================================================
   ADD QUILTS TO CART
================================================== */

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const quilt = {
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: button.dataset.image,
      quantity: 1
    };

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingQuilt = cart.find(function (item) {
      return item.name === quilt.name;
    });

    if (existingQuilt) {
      alert(
        quilt.name +
        " is already in your shopping bag. Each quilt is one of a kind."
      );

      return;
    }

    cart.push(quilt);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    updateCartCount();

    alert(
      quilt.name +
      " added to your shopping bag!"
    );
  });
});
