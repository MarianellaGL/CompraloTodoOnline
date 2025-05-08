// falso form
export function CheckoutForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`¡Gracias por tu compra! Nos comunicaremos contigo pronto para brindarte más detalles a ${email}.`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <h3>Finalizar Compra</h3>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input type="email" className="form-control" id="email" name="email" required />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre completo</label>
        <input type="text" className="form-control" id="name" name="name" required />
      </div>
      <button type="submit" className="btn btn-success">Confirmar compra</button>
    </form>
  );
}
