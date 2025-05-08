import { addToCart } from './Cart.js';

// Asignar el modal de eventos al productos
export function attachShowModalEvents(product) {
   showProductModal(product);

  }

// Mostrar el modal del producto
function showProductModal(product) {
    const existingModal = document.getElementById(`modal-${product.id}`);
    if (existingModal) {
      const modal = new bootstrap.Modal(existingModal);
      modal.show();
      return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = `modal-${product.id}`;
    modal.tabIndex = -1;
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${product.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
            <p><strong>Precio:</strong> $${product.price}</p>
            <p>${product.description || 'Descripción no disponible.'}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-warning btn-add-to-cart" data-product-id="${product.id}">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;
  
    document.body.appendChild(modal);
  
  
    modal.querySelector('.btn-add-to-cart').addEventListener('click', () => {
      addToCart(product);
      const addToCartBtn = modal.querySelector('.btn-add-to-cart');
      addToCartBtn.blur();

        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();
     
    });
  
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
  }
