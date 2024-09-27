let carrito = [];
let total = 0;

document.getElementById("vaciar-carrito").disabled = true;
document.getElementById("comprar").disabled = true;

fetch("../productos.json")
  .then((response) => response.json())
  .then((data) => {
    mostrarProductos(data);
  })
  .catch((error) => console.error("Error al cargar productos:", error));

cargarCarritoDesdeLocalStorage();

function mostrarProductos(productos) {
  const seccionProductos = document.getElementById("productos");
  seccionProductos.classList.add("row");

  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("col-lg-3", "col-6", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const imgProducto = document.createElement("img");
    imgProducto.src = producto.imagen;
    imgProducto.alt = producto.nombre;
    imgProducto.classList.add("card-img-top");
    card.appendChild(imgProducto);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "text-center");

    const h3Producto = document.createElement("h5");
    h3Producto.textContent = producto.nombre;
    h3Producto.classList.add("card-title");
    cardBody.appendChild(h3Producto);

    const pPrecio = document.createElement("p");
    pPrecio.textContent = `$${producto.precio}`;
    pPrecio.classList.add("card-text");
    cardBody.appendChild(pPrecio);

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar al Carrito";
    botonAgregar.classList.add("btn", "mt-2");
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id));
    cardBody.appendChild(botonAgregar);

    card.appendChild(cardBody);
    divProducto.appendChild(card);
    seccionProductos.appendChild(divProducto);
  });
}

function agregarAlCarrito(idProducto) {
  fetch("../productos.json")
    .then((response) => response.json())
    .then((productos) => {
      const producto = productos.find((p) => p.id === idProducto);
      carrito.push(producto);
      actualizarCarrito();
    });
}

function actualizarCarrito() {
  const listaCarrito = document.getElementById("lista-carrito");
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    const mensajeVacio = document.createElement("p");
    mensajeVacio.textContent = "No hay productos en el carrito";
    listaCarrito.appendChild(mensajeVacio);
  } else {
    carrito.forEach((producto, index) => {
      const liProducto = document.createElement("li");
      liProducto.classList.add(
        "d-flex",
        "align-items-center",
        "justify-content-center"
      );

      const spanProducto = document.createElement("span");
      spanProducto.textContent = `${producto.nombre} - $${producto.precio}`;
      liProducto.appendChild(spanProducto);

      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "X";
      botonEliminar.classList.add(
        "btn",
        "btn-danger",
        "btn-sm",
        "ml-2",
        "equis"
      );
      botonEliminar.addEventListener("click", () => eliminarDelCarrito(index));
      liProducto.appendChild(botonEliminar);

      listaCarrito.appendChild(liProducto);
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  calcularTotal();
  actualizarEstadoBotones();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function calcularTotal() {
  total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  document.getElementById("total").textContent = `$${total}`;
}

function actualizarEstadoBotones() {
  const botonVaciar = document.getElementById("vaciar-carrito");
  const botonComprar = document.getElementById("comprar");

  if (carrito.length > 0) {
    botonVaciar.disabled = false;
    botonComprar.disabled = false;
  } else {
    botonVaciar.disabled = true;
    botonComprar.disabled = true;
  }
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

document.getElementById("comprar").addEventListener("click", () => {
  Swal.fire({
    title: "Compra realizada",
    text: "¡Gracias por su compra!",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
  carrito = [];
  actualizarCarrito();
});
