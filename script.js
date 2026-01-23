// ===== CART LOGIC =====
window.cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-to-cart");

// 🔥 Only attach listeners if buttons exist
if (addButtons.length > 0) {
  addButtons.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      let product = btn.closest(".pro");
      if (!product) return;

      let img = product.querySelector("img").src;
      let name = product.querySelector(".des h5").innerText;
      let priceText = product.querySelector(".des h4").innerText;
      let price = parseInt(priceText.replace("₹", "").replace(",", ""));

      let id = img + idx;

      let existing = cart.find((item) => item.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({
          id,
          img,
          name,
          price,
          qty: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Added to cart!");
      updateCartCount();
    });
  });
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.qty, 0);

  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

updateCartCount();
