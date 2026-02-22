import { fetchRainyDaysProductById } from "../JS/api.js";
import { renderLoading, renderError, clearStatus } from "../JS/ui.js";
import { addToCart, getCartCount } from "../JS/cart.js";

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = String(getCartCount());
}



async function init() {
  updateCartCount();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    renderError("No product found.");
    return;
  }

  try {
    renderLoading();

    const product = await fetchRainyDaysProductById(id);

    clearStatus();
    renderProduct(product);

  } catch (error) {
    renderError("Failed to load product.");
  }
}

function renderProduct(product) {
  const container = document.querySelector("#product-details");

  const imageUrl = product.image?.url ?? product.image ?? "";
  const price = product.discountedPrice ?? product.price;

  const sizes = ["XS", "S", "M", "L", "XL"];

  container.innerHTML = `
    <div class="product-page">
      <div>
        <img class="product-image" src="${imageUrl}" alt="${product.title}" />
      </div>

      <div class="product-info">
        <h1>${product.title}</h1>

        ${product.onSale ? `<span class="badge">On sale</span>` : ""}

        <p class="price"><strong>${price} kr</strong></p>
        <p>${product.description ?? ""}</p>

        <div class="controls">
          <label>
            Size:
            <select id="size">
              ${sizes.map((s) => `<option value="${s}">${s}</option>`).join("")}
            </select>
          </label>

          <p id="stock-text"><strong>In stock</strong></p>

          <button id="add-to-cart">Add to cart</button>
        </div>
      </div>
    </div>
  `;

  document.querySelector("#add-to-cart").addEventListener("click", () => {
    const size = document.querySelector("#size").value;

    addToCart({
      id: product.id,
      title: product.title,
      price,
      imageUrl,
      size,
    });

    updateCartCount();

    const status = document.querySelector("#status");
    if (status) status.textContent = "Added to cart!";
    setTimeout(() => {
      if (status) status.textContent = "";
    }, 1200);
  });
}

init();
