// ===== NAVBAR =====
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar){
  bar.addEventListener('click',()=>{
    nav.classList.add('active')
  })
}

if (close){
  close.addEventListener('click',()=>{
    nav.classList.remove('active')
  })
}

// ===== CART LOGIC (ADD TO CART) =====
document.addEventListener("DOMContentLoaded", () => {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const product = btn.closest(".pro");
      if (!product) return;

      const img = product.querySelector("img").src;
      const name = product.querySelector(".des h5").innerText;
      const priceText = product.querySelector(".des h4").innerText;
      const price = parseInt(priceText.replace("₹", "").replace(",", ""));

      const id = img + name;

      const existing = cart.find((item) => item.id === id);

      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, img, name, price, qty: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
      updateCartCount();
    });
  });

  updateCartCount();
});

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}
