import { clearCart, getCartCount } from "../../JS/cart.js";

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = String(getCartCount());
}

clearCart();

updateCartCount();