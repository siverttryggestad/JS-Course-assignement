const CART_KEY = "cart";

export function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(item) {
  const cart = getCart();
  cart.push(item); 
  saveCart(cart);
  return cart;
}

export function removeFromCart(indexToRemove) {
  const cart = getCart();
  cart.splice(indexToRemove, 1);
  saveCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().length;
}

export function clearCart() {
  localStorage.removeItem("cart");
}