import { attachShowModalEvents } from "./ShowModal.js";

// Aqui creamos la funcion que renderiza las tarjetas con los estilos de bootsttrap a la cual le pasamos un arreglo de productso y unn titulo
export function renderCards(products, title) {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add('row', 'g-4');

  const titulo = document.createElement('h2');
  titulo.textContent = title;
  titulo.classList.add('text-start', 'fw-light', 'mb-4', 'w-100');
  div.appendChild(titulo);

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('col-md-3', 'producto');

    card.innerHTML = `
      <div class="card h-100" id="${product.id}">
        <img src="${product.image}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h3 class="card-title">${product.title}</h3>
          <p class="card-text">$${product.price}</p>
          <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary mt-3 w-100 btn-showProduct" data-product-id="${product.id}">Mostrar</button>
          </div>
        </div>
      </div>
    `;

    div.appendChild(card);
    // Agregamos el listener  directamente pasando el product
    setTimeout(() => {
      const showBtn = card.querySelector('.btn-showProduct');
      if (showBtn) {
        showBtn.addEventListener('click', () => {
          attachShowModalEvents(product);
        });
      }
    }, 0);
  });

  productsContainer.appendChild(div);
  }

  

