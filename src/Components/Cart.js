import { showToast } from "../Utils/showToast.js"

let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

export function addToCart(product) {
  let existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCartToLocalStorage();
  showToast(`Producto ${product.title} agregado al carrito`, "#ff4b2b");
}

export function getCart() {
  return [...cart];
}

export function removeFromCart(productId) {
  const removedProduct = cart.find(p => p.id === productId);
  cart = cart.filter(p => p.id !== productId);
  saveCartToLocalStorage();
  if (removedProduct) {
    showToast(`El producto ${removedProduct.title} ha sido removido del carrito`, "#ff4b2b");
  }
}

export function updateCartQuantity(productId, delta) {
  const product = cart.find(p => p.id === productId);
  if (!product) return;

  product.quantity += delta;

  if (product.quantity <= 0) {
    cart = cart.filter(p => p.id !== productId);
    showToast(`El producto ${product.title} ha sido removido del carrito`, "#ff4b2b");
  } else {
    showToast(`Cantidad de ${product.title} actualizada a ${product.quantity}`, "#96c93d");
  }

  saveCartToLocalStorage();
}

export function loadCartFromLocalStorage() {
  const saved = localStorage.getItem('shoppingCart');
  const buyButton = document.getElementById('buyCartBtn');
  if (saved) {
    cart = JSON.parse(saved);
    if (cart.length > 0)
    {
      buyButton.classList.remove('d-none');
      document.getElementById('deleteCartBtn').classList.remove('d-none');
    } else {
      buyButton.classList.add('d-none'); 
      document.getElementById('deleteCartBtn').classList.add('d-none');
    }

  }
}

export function saveCartToLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

export function refreshCartSidebar() {
  const offcanvasEl = document.getElementById('offcanvasCart');
  const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
  offcanvas.hide();

  setTimeout(() => {
    const newOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
    newOffcanvas.show();
  }, 200);
}

export function renderCartItems() {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  const buyButton = document.getElementById('buyCartBtn'); // seleccionamos el botón

 
  list.innerHTML = '';

  if (cart.length === 0) {
    list.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    buyButton.classList.add('d-none');
    document.getElementById('deleteCartBtn').classList.add('d-none');
    return;
  }
  buyButton.classList.remove('d-none'); 
  document.getElementById('deleteCartBtn').classList.remove('d-none');

  cart.forEach(product => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex align-items-center gap-2';

    li.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
      <div class="flex-grow-1">
        <div>${product.title}</div>
       
      </div>
      <div class="btn-group" role="group">
        <div class="d-flex justify-content-center align-items-center">
          <button class="btn btn-sm btn-outline-primary btn-decrease mx-1" data-id="${product.id}">-</button>
          <small class="text-muted mx-1">x${product.quantity}</small>
          <button class="btn btn-sm btn-outline-primary btn-increase mx-1" data-id="${product.id}">+</button>
        </div>
      </div>
      <span class="badge bg-primary rounded-pill ms-2">$${product.price * product.quantity}</span>
    `;

    list.appendChild(li);
  });

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
export function clearCart() {
  cart = [];
  saveCartToLocalStorage();
}
