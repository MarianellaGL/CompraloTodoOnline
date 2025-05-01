/*global logic*/
import { getProductsFromAPI } from "../Services/getProductsFromAPI.js";

const productsContainer = document.getElementById("products");

const fetchProducts = async () => {
  const products = await getProductsFromAPI();
  console.log(products);
};

fetchProducts();

//TODO: ordenar el código. BORRAR EL MOCK
// Supuesto Inv
const productos = [
  {
    id: 1,
    nombre: "Laptop Dell",
    descripcion: "Notebook 15'' para estudiantes",
  },
  {
    id: 2,
    nombre: "Teclado Mecánico",
    descripcion: "Con switches rojos para gaming",
  },
  {
    id: 3,
    nombre: "Libro: Clean Code",
    descripcion: "Guía para escribir mejor código",
  },
  {
    id: 4,
    nombre: "Monitor 24''",
    descripcion: "Full HD, ideal para trabajo y estudio",
  },
  {
    id: 5,
    nombre: "Mouse inalámbrico",
    descripcion: "Ergonómico con batería recargable",
  },
  {
    id: 6,
    nombre: "Libro: El nombre del viento",
    descripcion: "Novela de fantasía",
  },
];

// Input pa la search
const inputBusqueda = document.getElementById("searchInput");

// Func mostrar prod en HTML
function mostrarProductos(lista) {
  console.log("mostrando productos", lista);
  productsContainer.innerHTML = ""; // Limpiamos el contenedor
  lista.forEach((producto) => {
    console.log(producto);
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `<h3>${producto.nombre}</h3><p>${producto.descripcion}</p>`;
    productsContainer.appendChild(div);
  });
}

// Filtrar prod a medida del interaccion del user con tec
inputBusqueda.addEventListener("input", (e) => {
  console.log(e.target.value);
  const texto = inputBusqueda.value.toLowerCase();
  const filtrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(texto) ||
      p.descripcion.toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
});

// Se muestran todos al cargar pagina
mostrarProductos(productos);
