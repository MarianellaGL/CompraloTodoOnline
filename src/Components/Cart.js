let cart = [];

export function addToCart(product) {
  let existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToLocalStorage();
  Toastify({
    text: `"Producto ${product.title} agregado al carrito"`,
    duration: 3000, 
    close: true,   
    gravity: "top", 
    position: "right", 
    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)", 
    stopOnFocus: true, 
  }).showToast();
}

export function getCart() {
  return [...cart]; 
}

export function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
  saveCartToLocalStorage();

}

export function loadCartFromLocalStorage() {
  const saved = localStorage.getItem('shoppingCart');
  if (saved) {
    cart = JSON.parse(saved);
  }
}

function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}
