// js/index.js
import { fetchRainyDaysProducts } from "./api.js";
import { renderLoading, renderError, clearStatus, renderProductList } from "./ui.js";
import { addToCart, getCartCount } from "./cart.js";

let allProducts = [];

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = String(getCartCount());
}

function setupFilter() {
  const filterSelect = document.querySelector("#filter");
  if (!filterSelect) return;

  filterSelect.addEventListener("change", (event) => {
    const value = event.target.value;

    if (value === "all") {
      renderProductList(allProducts);
      return;
    }

    const filtered = allProducts.filter((product) =>
  String(product.gender).toLowerCase() === value.toLowerCase()
);
    renderProductList(filtered);
  });
}

function setupAddToCart() {
  const list = document.querySelector("#product-list");
  if (!list) return;

  list.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;

    const id = button.dataset.id;
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;

    const imageUrl = product.image?.url ?? product.image ?? "";
    const price = product.discountedPrice ?? product.price;

    addToCart({
      id: product.id,
      title: product.title,
      price,
      imageUrl
    });

    updateCartCount();
  });
}

async function init() {
  try {
    renderLoading("Loading products...");

    allProducts = await fetchRainyDaysProducts();

    clearStatus();
    renderProductList(allProducts);

    updateCartCount();
    setupFilter();
    setupAddToCart();
  } catch (error) {
    renderError(error.message || "Something went wrong.");
  }
}

init();
