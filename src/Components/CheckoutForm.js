import { showToast } from "../Utils/showToast.js";
import { clearCart } from "./Cart.js";
import { renderCartItems } from "./Cart.js";

export function CheckoutForm() {
  // Ocultar las cards
  const cards = document.querySelector("#productsContainer");
  cards.classList.add("d-none");

  const form = document.createElement("form");
  form.className = "p-4 border rounded";

  const h3 = document.createElement("h3");
  h3.textContent = "Finalizar Compra";

  const emailGroup = document.createElement("div");
  emailGroup.className = "mb-3";

  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.className = "form-label";
  emailLabel.textContent = "Correo electrónico";

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.name = "email";
  emailInput.className = "form-control";
  emailInput.required = true;
  emailInput.setAttribute("aria-label", "Correo electrónico");

  emailGroup.appendChild(emailLabel);
  emailGroup.appendChild(emailInput);

  const nameGroup = document.createElement("div");
  nameGroup.className = "mb-3";

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name");
  nameLabel.className = "form-label";
  nameLabel.textContent = "Nombre completo";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  nameInput.name = "name";
  nameInput.className = "form-control";
  nameInput.required = true;
  nameInput.setAttribute("aria-label", "Nombre completo");

  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);

  //boton envio
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "btn btn-success";
  submitButton.textContent = "Confirmar compra";
  //elem. formulario
  form.appendChild(h3);
  form.appendChild(emailGroup);
  form.appendChild(nameGroup);
  form.appendChild(submitButton);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = emailInput.value;

    // Vaciar carrito correctamente
    clearCart();
    renderCartItems();

    // Mostrar mensaje
    showToast(
      `¡Gracias por tu compra! Nos comunicaremos contigo pronto a ${email}.`
    );

    form.classList.add("d-none");
    cards.classList.remove("d-none");

    const buyBtn = document.getElementById("buyCartBtn");
    const deleteBtn = document.getElementById("deleteCartBtn");
    if (buyBtn) buyBtn.classList.add("d-none");
    if (deleteBtn) deleteBtn.classList.add("d-none");
  });

  return form;
}
