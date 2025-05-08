//spinner vainilla con todo
import { Spinner } from "../Components/Spinner.js";
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";

let products = [];

const loadingDiv = document.getElementById('products');
loadingDiv.innerHTML = Spinner();

products = await getProductsFromAPI();

if (products.length === 0) {
  loadingDiv.innerHTML = '<p class="text-danger">No se encontraron productos.</p>';
} else {
  renderCards(products, "Productos");
}
