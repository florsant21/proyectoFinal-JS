const iconoCarrito = document.getElementById("icono-carrito");

iconoCarrito.addEventListener("click", (event) => {
  event.preventDefault();

  const seccionCarrito = document.getElementById("carrito");

  seccionCarrito.scrollIntoView({ behavior: "smooth" });
});
