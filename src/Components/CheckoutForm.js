import { showToast } from "../Utils/showToast.js";
import { clearCart } from './Cart.js';
import { renderCartItems } from './Cart.js';

// falso form 
export function CheckoutForm() {
  // Ocultar las cards
  const cards = document.querySelector('#productsContainer');
  cards.classList.add('d-none');
  
  //creacion formulario
  const form = document.createElement('form');
  form.className = 'p-4 border rounded';
  
//titulo formulario
  const h3 = document.createElement('h3');
  h3.textContent = 'Finalizar Compra';
  
//correo electronico
  const emailGroup = document.createElement('div');
  emailGroup.className = 'mb-3';
  
  const emailLabel = document.createElement('label');
  emailLabel.setAttribute('for', 'email');
  emailLabel.className = 'form-label';
  emailLabel.textContent = 'Correo electrónico';
  
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.id = 'email';
  emailInput.name = 'email';
  emailInput.className = 'form-control';
  emailInput.required = true;
  emailInput.setAttribute('aria-label', 'Correo electrónico'); 

  
  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);
  
//nombre completo
  const nameGroup = document.createElement('div');
  nameGroup.className = 'mb-3';
  
  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'name');
  nameLabel.className = 'form-label';
  nameLabel.textContent = 'Nombre completo';
  
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.className = 'form-control';
  nameInput.required = true;
  nameInput.setAttribute('aria-label', 'Nombre completo');
  
  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  
//boton envio
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.className = 'btn btn-success';
  submitButton.textContent = 'Confirmar compra';
//elem. formulario
  form.appendChild(h3);
  form.appendChild(emailGroup);
  form.appendChild(nameGroup);
  form.appendChild(submitButton);
//envento de manejo del envio del form
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = emailInput.value;
    showToast(`¡Gracias por tu compra! Nos comunicaremos contigo pronto para brindarte más detalles a ${email}.`);
    localStorage.setItem('shoppingCart', JSON.stringify([]));
    form.classList.add('d-none');
    cards.classList.remove('d-none');
  });

  return form;
}
