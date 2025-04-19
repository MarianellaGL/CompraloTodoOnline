/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";
import { renderCards } from "../Components/RenderCards.js";


let products = await getProductsFromAPI();


if (products.length === 0) {
  // Aquí vamos a llamar a una página de error
} else {
    // Acá vamos a preguntar si hay un storage de productos buscados en ese caso debemos mostrarlos
    renderCards(products, "Productos");

}
