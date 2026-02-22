// js/ui.js
export function renderLoading(message = "Loading products...") {
  const status = document.querySelector("#status");
  status.textContent = message;
}

export function renderError(message = "Something went wrong. Try again.") {
  const status = document.querySelector("#status");
  status.textContent = message;
}

export function clearStatus() {
  const status = document.querySelector("#status");
  status.textContent = "";
}

export function renderProductList(products) {
  const container = document.querySelector("#product-list");

  container.innerHTML = products
    .map((p) => {
      const imageUrl =
        p.image?.url ?? p.image?.src ?? p.image ?? "";

      const price = p.discountedPrice ?? p.price;

      return `
        <article class="product-card">
          <a href="product/index.html?id=${p.id}">
            <img src="${imageUrl}" alt="${p.title}" />
            <h2>${p.title}</h2>
          </a>
          <p>${price} kr</p>
          ${p.onSale ? `<p><strong>On sale!</strong></p>` : ""}
          <button class="add-to-cart" data-id="${p.id}">Add to cart</button>
        </article>
      `;
    })
    .join("");
}
