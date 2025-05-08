/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";
import { getCart, loadCartFromLocalStorage , updateCartQuantity, refreshCartSidebar, renderCartItems} from '../Components/Cart.js';
import { Spinner } from "../Components/Spinner.js";


// Input pa la search
const inputBusqueda = document.getElementById("searchInput");

let products = await getProductsFromAPI();
// Filtrar prod a medida del interaccion del user con tec
inputBusqueda.addEventListener("input", (e) => {
  console.log(e.target.value);
  const texto = inputBusqueda.value.toLowerCase();
  const filtrados = products.filter(
    (p) =>
      p.title.toLowerCase().includes(texto) ||
      p.description.toLowerCase().includes(texto)
  );
  renderCards(filtrados, "Resultado búsqueda");
});

// Se muestran todos al cargar pagina
renderCards(products, "Productos");

// llamar al localstorage por si cosas en  el carrito
loadCartFromLocalStorage();

document.getElementById('offcanvasCart').addEventListener('show.bs.offcanvas', renderCartItems)


const loadingDiv = document.getElementById('products');
loadingDiv.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';


if (products.length === 0) {
  loadingDiv.innerHTML = '<p class="text-danger">No se encontraron productos.</p>';
} else {
  renderCards(products, "Productos");
}
