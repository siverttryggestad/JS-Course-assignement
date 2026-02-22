import { getCart, removeFromCart, getCartCount } from "../JS/cart.js";

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = String(getCartCount());
}

function renderCart() {
  const items = getCart();
  const container = document.querySelector("#cart-items");
  const totalEl = document.querySelector("#total");
  const status = document.querySelector("#status");

  if (!items.length) {
    container.innerHTML = "";
    totalEl.textContent = "0";
    status.textContent = "Your cart is empty.";
    return;
  }

  status.textContent = "";

  let total = 0;

  container.innerHTML = items
    .map((item, index) => {
      const price = item.price ?? 0;
      total += price;

      return `
        <article class="cart-item">
          <img src="${item.imageUrl}" alt="${item.title}" />
          <div>
            <h2>${item.title}</h2>
            ${item.size ? `<p>Size: ${item.size}</p>` : ""}
            <p>${price} kr</p>
          </div>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </article>
      `;
    })
    .join("");

  totalEl.textContent = String(total.toFixed(2));
}

document.querySelector("#cart-items").addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-btn");
  if (!btn) return;

  const index = Number(btn.dataset.index);
  removeFromCart(index);

  updateCartCount();
  renderCart();
});

updateCartCount();
renderCart();
