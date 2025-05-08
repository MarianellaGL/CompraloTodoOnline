//para el spinner
import { Spinner } from "../Components/Spinner.js";

let products = [];

const loadingDiv = document.getElementById('products');
loadingDiv.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';

products = await getProductsFromAPI();

if (products.length === 0) {
  loadingDiv.innerHTML = '<p class="text-danger">No se encontraron productos.</p>';
} else {
  renderCards(products, "Productos");
}
