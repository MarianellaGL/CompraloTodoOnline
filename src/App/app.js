import { Spinner } from "../Components/Spinner.js";
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";
import { CheckoutForm } from "../Components/CheckoutForm.js";

let products = [];

// spinner mientras carga
const loadingDiv = document.getElementById('products');
loadingDiv.innerHTML = Spinner();

try {
  // llamada api
  products = await getProductsFromAPI();

  if (products.length === 0) {
    // Si el arreglo viene vacío
    loadingDiv.innerHTML = '<p class="text-danger">No se encontraron productos.</p>';
  } else {
    // Renderizamos productos
    renderCards(products, "Productos");

    // formulario de checkout al final
    const checkoutContainer = document.getElementById('checkout-section');
    if (checkoutContainer) {
      const form = CheckoutForm();
      checkoutContainer.appendChild(form);
    }
  }

} catch (error) {
  // por si ocurre un error con la api
  loadingDiv.innerHTML = '<p class="text-danger">Error al cargar los productos. Intenta nuevamente más tarde.</p>';
  console.error("Error al obtener productos:", error);
}

