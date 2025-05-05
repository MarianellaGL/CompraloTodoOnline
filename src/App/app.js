/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";
import { getCart, loadCartFromLocalStorage } from '../Components/Cart.js';


let products = await getProductsFromAPI();


if (products.length === 0) {
  // Aquí vamos a llamar a una página de error
  console.log("El arreglo de productos vino vacio")
} else {
    // Acá vamos a preguntar si hay un localstorage de productos buscados en ese caso debemos mostrarlos
    renderCards(products, "Productos");

}
// llamar al localstorage por si cosas en  el carrito
loadCartFromLocalStorage();

document.getElementById('offcanvasCart').addEventListener('show.bs.offcanvas', () => {
  const cart = getCart();
  const list = document.getElementById('cartItems');
  list.innerHTML = ''; // limpiar

  if (cart.length === 0) {
    list.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
  } else {
    cart.forEach(product => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
      <div class="flex-grow-1">
        <div>${product.title}</div>
        <small class="text-muted">x${product.quantity}</small>
      </div>
      <span class="badge bg-primary rounded-pill">$${product.price * product.quantity}</span>
    `;
      list.appendChild(li);
    });
  }
});


