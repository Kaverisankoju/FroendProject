let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartDiv = document.getElementById("cart-items");
let totalDiv = document.getElementById("total");

function renderCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div style="display:flex; gap:20px; margin:15px 0; align-items:center;">
        <img src="${item.img}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
          <p>Qty: ${item.qty}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  totalDiv.innerText = "Total: ₹" + total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
