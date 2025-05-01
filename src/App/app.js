/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";

const productsContainer = document.getElementById("products");

const fetchProducts = async () => {
  const products = await getProductsFromAPI();
  console.log(products);
};

fetchProducts();
