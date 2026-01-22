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

// ===== CART LOGIC =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach((btn, idx) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let product = btn.closest(".pro");

    let img = product.querySelector("img").src;
    let name = product.querySelector(".des h5").innerText;
    let priceText = product.querySelector(".des h4").innerText;
    let price = parseInt(priceText.replace("₹", "").replace(",", ""));

    // Unique ID using image + index
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
  });
});



function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((total, item) => total + item.qty, 0);

  const badge = document.getElementById("cart-count");

  if (badge) {
    badge.innerText = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}