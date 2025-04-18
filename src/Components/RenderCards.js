export function renderCards(products){

    const productsContainer = document.getElementById('productsContainer');
     productsContainer.innerHTML = '';
   
     const div = document.createElement('div');
     div.classList.add('row', 'g-4');
   
     products.forEach(product => {
   
       const card = document.createElement('div');
       card.classList.add('col-md-3');
       card.innerHTML = `
       <div class="card h-100" id="${product.id}">
         <img src="${product.image}" class="card-img-top" alt="${product.title}">
         <div class="card-body">
           <h3 class="card-title">${product.title}</h3>
           <p class="card-text">$${product.price}</p>
           <button class="btn btn-primary mt-3 w-100">Comprar</button>
         </div>
       </div>
       `;
   
       div.appendChild(card); // agregamos cada tarjeta al contenedor
     });
   
     productsContainer.appendChild(div); // agregamos el grupo al contenedor principal
   }