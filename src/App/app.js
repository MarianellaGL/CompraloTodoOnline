/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";
import { getCart } from '../Components/Cart.js';


let products = await getProductsFromAPI();


if (products.length === 0) {
  // Aquí vamos a llamar a una página de error
  console.log("El arreglo de productos vino vacio")
} else {
    // Acá vamos a preguntar si hay un localstorage de productos buscados en ese caso debemos mostrarlos
    renderCards(products, "Productos");

}


// Mostrarmos lo que contiene el carrito al hacer click en el
document.getElementById('btnCart').addEventListener('click', () => {
  let cart = getCart();
  let content = cart.map(p => `<li>${p.title} x${p.quantity} - $${p.price * p.quantity}</li>`).join('\n');
  alert(`Carrito:\n${cart.length ? content : 'Vacío'}`);
});
