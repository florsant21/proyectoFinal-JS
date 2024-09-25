let carrito = [];
let total = 0;

fetch('../productos.json')
    .then(response => response.json())
    .then(data => {
        mostrarProductos(data);
    })
    .catch(error => console.error('Error al cargar productos:', error));

function mostrarProductos(productos) {
    const seccionProductos = document.getElementById('productos');
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');

        const imgProducto = document.createElement('img');
        imgProducto.src = producto.imagen;
        imgProducto.alt = producto.nombre;
        divProducto.appendChild(imgProducto);

        const h3Producto = document.createElement('h3');
        h3Producto.textContent = producto.nombre;
        divProducto.appendChild(h3Producto);

        const pPrecio = document.createElement('p');
        pPrecio.textContent = `$${producto.precio}`;
        divProducto.appendChild(pPrecio);

        const botonAgregar = document.createElement('button');
        botonAgregar.textContent = 'Agregar al Carrito';
        botonAgregar.addEventListener('click', () => agregarAlCarrito(producto.id));
        divProducto.appendChild(botonAgregar);

        seccionProductos.appendChild(divProducto);
    });
}

function agregarAlCarrito(idProducto) {
    fetch('../productos.json')
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id === idProducto);
            carrito.push(producto);
            actualizarCarrito();
        });
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    carrito.forEach(producto => {
        const liProducto = document.createElement('li');
        liProducto.textContent = `${producto.nombre} - $${producto.precio}`;

        listaCarrito.appendChild(liProducto);
    });

    calcularTotal();
}

function calcularTotal() {
    total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    document.getElementById('total').textContent = total;
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

document.getElementById('comprar').addEventListener('click', () => {
    alert('Gracias por su compra!');
    carrito = [];
    actualizarCarrito();
});
