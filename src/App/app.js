import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";
import {
  getCart,
  loadCartFromLocalStorage,
  updateCartQuantity,
  refreshCartSidebar,
  renderCartItems
} from "../Components/Cart.js";
import { Spinner } from "../Components/Spinner.js";
import { CheckoutForm } from "../Components/CheckoutForm.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Elementos del DOM
  const inputBusqueda = document.getElementById("searchInput");
  const buyBtn = document.getElementById("buyCartBtn");
  const checkoutSection = document.getElementById("checkout-section");
  const loadingDiv = document.getElementById("products");
  const deleteBtn = document.getElementById("deleteCartBtn");

  // Mostrar spinner mientras se cargan productos
  loadingDiv.innerHTML = `
    <div class="text-center p-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>`;

  // Cargar productos
  let products = await getProductsFromAPI();

  // Renderizar productos si hay resultados
  if (products.length === 0) {
    loadingDiv.innerHTML =
      '<p class="text-danger">No se encontraron productos.</p>';
  } else {
    renderCards(products, "Productos");
  }

  // Buscar productos
  inputBusqueda.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = products.filter(
      (p) =>
        p.title.toLowerCase().includes(texto) ||
        p.description.toLowerCase().includes(texto)
    );
    renderCards(filtrados, "Resultado búsqueda");
  });

  // Cargar carrito del localStorage
  loadCartFromLocalStorage();

  // Mostrar contenido del carrito cuando se abre
  document
    .getElementById("offcanvasCart")
    .addEventListener("show.bs.offcanvas", renderCartItems);

  // Mostrar formulario al hacer click en el botón de comprar
  if (buyBtn && checkoutSection) {
    buyBtn.addEventListener("click", () => {
      const offcanvasEl = document.getElementById("offcanvasCart");
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }

      // Mostrar el formulario y ocultar productos
      checkoutSection.innerHTML = "";
      checkoutSection.appendChild(CheckoutForm());

      const cards = document.querySelector("#productsContainer");
      if (cards) cards.classList.add("d-none");
    });
  } else {
    console.warn("No se encontró el botón o la sección de checkout en el DOM.");
  }

  // Vaciar carrito
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      localStorage.setItem("shoppingCart", JSON.stringify([])); // Vacía el carrito
      if (typeof refreshCartSidebar === "function") refreshCartSidebar(); // Limpiar visualmente el carrito
      if (checkoutSection) checkoutSection.innerHTML = ""; // Limpiar formulario si está visible

      // Ocultar botones si es necesario
      deleteBtn.classList.add("d-none");
      const buyBtn = document.getElementById("buyCartBtn");
      if (buyBtn) buyBtn.classList.add("d-none");
    });
  }
});
