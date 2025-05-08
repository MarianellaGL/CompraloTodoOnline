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
    style: {
      background: "linear-gradient(to right, #ff416c, #ff4b2b)"
    },
    stopOnFocus: true, 
  }).showToast();
}

export function getCart() {
  return [...cart]; 
}

export function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
  saveCartToLocalStorage();
  Toastify({
    text: `"El producto ${product.title} ha sido removido del carrito"`,
    duration: 3000, 
    close: true,   
    gravity: "top", 
    position: "right", 
    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)", 
    stopOnFocus: true, 
  }).showToast();

}
// Esta funcion llama al localstorage y devuvelve lo guardado en el carrito
export function loadCartFromLocalStorage() {
  const saved = localStorage.getItem('shoppingCart');
  if (saved) {
    cart = JSON.parse(saved);
  }
}
// Esta funcion guarda en el localstorage del navegador un string del carrito
export function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

export function updateCartQuantity(productId, delta) {
  const product = cart.find(p => p.id === productId);
  if (!product) return;

  product.quantity += delta;

  if (product.quantity <= 0) {
    cart = cart.filter(p => p.id !== productId);
    Toastify({
      text: `"El producto ${product.title} ha sido removido del carrito"`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #ff416c, #ff4b2b)"
      },
      stopOnFocus: true,
    }).showToast();
  } else {
    Toastify({
      text: `"Cantidad de ${product.title} actualizada a ${product.quantity}"`,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)"
      },
      stopOnFocus: true,
    }).showToast();
  }

  saveCartToLocalStorage();
}
export function refreshCartSidebar() {
  const offcanvasEl = document.getElementById('offcanvasCart');
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  offcanvas.hide();

  setTimeout(() => {
    const newOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
    newOffcanvas.show();
  }, 200); // Tiempo suficiente para ocultar y volver a mostrar
}

export function renderCartItems() {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    return;
  }

  cart.forEach(product => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center gap-2';

    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
      <div class="flex-grow-1">
        <div>${product.title}</div>
        <small class="text-muted">x${product.quantity}</small>
      </div>
      <div class="btn-group" role="group">
        <button class="btn btn-sm btn-outline-secondary btn-decrease" data-id="${product.id}">-</button>
        <button class="btn btn-sm btn-outline-secondary btn-increase" data-id="${product.id}">+</button>
      </div>
      <span class="badge bg-primary rounded-pill ms-2">$${product.price * product.quantity}</span>
    `;

    list.appendChild(li);
  });

  // Volver a asignar eventos
  list.querySelectorAll('.btn-increase').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      updateCartQuantity(id, +1);
      renderCartItems();
    });
  });

  list.querySelectorAll('.btn-decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      updateCartQuantity(id, -1);
      renderCartItems();
    });
  });
}
