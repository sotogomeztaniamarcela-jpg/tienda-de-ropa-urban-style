
// =====================================
// URBANSTYLE - TIENDA DE ROPA
// =====================================

// PRODUCTOS
const productos = [
    {
        id: 1,
        nombre: "Camiseta Oversize Negra",
        categoria: "Camisetas",
        tallas: ["S", "M", "L", "XL"],
        precio: 45000,
        imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nombre: "Camiseta Streetwear",
        categoria: "Camisetas",
        tallas: ["S", "M", "L"],
        precio: 50000,
        imagen: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nombre: "Camiseta Blanca Básica",
        categoria: "Camisetas",
        tallas: ["XS", "S", "M", "L", "XL"],
        precio: 35000,
        imagen: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nombre: "Jeans Urban Blue",
        categoria: "Pantalones",
        tallas: ["S", "M", "L", "XL"],
        precio: 95000,
        imagen: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nombre: "Cargo Pants",
        categoria: "Pantalones",
        tallas: ["S", "M", "L", "XL"],
        precio: 110000,
        imagen: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nombre: "Jogger Street",
        categoria: "Pantalones",
        tallas: ["S", "M", "L"],
        precio: 80000,
        imagen: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nombre: "Sudadera Essential",
        categoria: "Sudaderas",
        tallas: ["S", "M", "L", "XL"],
        precio: 85000,
        imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nombre: "Hoodie Urban",
        categoria: "Sudaderas",
        tallas: ["M", "L", "XL"],
        precio: 120000,
        imagen: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        nombre: "Chaqueta Denim",
        categoria: "Chaquetas",
        tallas: ["S", "M", "L"],
        precio: 150000,
        imagen: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        nombre: "Chaqueta Bomber",
        categoria: "Chaquetas",
        tallas: ["M", "L", "XL"],
        precio: 180000,
        imagen: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        nombre: "Gorra Urban",
        categoria: "Accesorios",
        tallas: ["Única"],
        precio: 40000,
        imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        nombre: "Bolso Street",
        categoria: "Accesorios",
        tallas: ["Única"],
        precio: 65000,
        imagen: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    }
];

// VARIABLES
let carrito = JSON.parse(localStorage.getItem("urbanCarrito")) || [];
let descuentoActivo = false;

// FORMATO DE PRECIO
function formatoPrecio(valor) {
    return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    });
}

// RENDERIZAR PRODUCTOS
function mostrarProductos(lista = productos) {

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `
            <article class="product-card">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div class="product-info">

                    <span class="category">${producto.categoria}</span>

                    <h3>${producto.nombre}</h3>

                    <p class="tallas">
                        Tallas: ${producto.tallas.join(", ")}
                    </p>

                    <p class="price">
                        ${formatoPrecio(producto.precio)}
                    </p>

                    <button class="add-cart"
                        onclick="agregarCarrito(${producto.id})">
                        🛒 Agregar al carrito
                    </button>

                </div>

            </article>
        `;

    });

}

// FILTROS
function aplicarFiltros() {

    const categoria = document.getElementById("filtroCategoria").value;
    const talla = document.getElementById("filtroTalla").value;
    const orden = document.getElementById("ordenPrecio").value;

    let resultado = [...productos];

    if (categoria !== "Todos") {
        resultado = resultado.filter(p => p.categoria === categoria);
    }

    if (talla !== "Todas") {
        resultado = resultado.filter(p => p.tallas.includes(talla));
    }

    if (orden === "menor") {
        resultado.sort((a, b) => a.precio - b.precio);
    }

    if (orden === "mayor") {
        resultado.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(resultado);
}

// FILTRAR COLECCIONES
function filtrarColeccion(categoria) {

    document.getElementById("filtroCategoria").value = categoria;

    aplicarFiltros();

    document.getElementById("catalogo").scrollIntoView({
        behavior: "smooth"
    });

}

// AGREGAR AL CARRITO
function agregarCarrito(id) {

    const producto = productos.find(p => p.id === id);

    const existente = carrito.find(p => p.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();

    alert("Producto agregado al carrito 🛒");

}

// GUARDAR CARRITO
function guardarCarrito() {

    localStorage.setItem("urbanCarrito", JSON.stringify(carrito));

    actualizarCarrito();

}

// ABRIR CARRITO
function abrirCarrito() {

    document.getElementById("carritoPanel").classList.add("active");

    document.getElementById("overlay").classList.add("active");

}

// CERRAR CARRITO
function cerrarCarrito() {

    document.getElementById("carritoPanel").classList.remove("active");

    document.getElementById("overlay").classList.remove("active");

}

// CAMBIAR CANTIDAD
function cambiarCantidad(id, cambio) {

    const producto = carrito.find(p => p.id === id);

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
    }

    guardarCarrito();

}

// ELIMINAR PRODUCTO
function eliminarProducto(id) {

    carrito = carrito.filter(p => p.id !== id);

    guardarCarrito();

}

// CALCULAR SUBTOTAL
function calcularSubtotal() {

    return carrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);

}

// CALCULAR DESCUENTO
function calcularDescuento() {

    if (descuentoActivo) {
        return calcularSubtotal() * 0.10;
    }

    return 0;

}

// ACTUALIZAR CARRITO
function actualizarCarrito() {

    const lista = document.getElementById("listaCarrito");

    const contador = document.getElementById("contadorCarrito");

    const cantidadTotal = carrito.reduce((total, p) => total + p.cantidad, 0);

    contador.textContent = cantidadTotal;

    lista.innerHTML = "";

    carrito.forEach(producto => {

        lista.innerHTML += `
            <div class="cart-item">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div class="cart-item-info">

                    <h4>${producto.nombre}</h4>

                    <p>${formatoPrecio(producto.precio)}</p>

                    <div class="quantity-controls">

                        <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>

                        <span>${producto.cantidad}</span>

                        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>

                    </div>

                    <button class="remove-item"
                        onclick="eliminarProducto(${producto.id})">
                        Eliminar
                    </button>

                </div>

            </div>
        `;

    });

    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento();
    const total = subtotal - descuento;

    document.getElementById("subtotal").textContent = formatoPrecio(subtotal);

    document.getElementById("descuento").textContent = formatoPrecio(descuento);

    document.getElementById("total").textContent = formatoPrecio(total);

    actualizarResumenCheckout();

}

// APLICAR CUPÓN
function aplicarCupon() {

    const codigo = document.getElementById("codigoCupon").value.trim().toUpperCase();

    const mensaje = document.getElementById("mensajeCupon");

    if (codigo === "URBAN10") {

        descuentoActivo = true;

        mensaje.textContent = "¡Cupón aplicado! 10% de descuento.";

        mensaje.style.color = "green";

    } else {

        descuentoActivo = false;

        mensaje.textContent = "Cupón inválido.";

        mensaje.style.color = "red";

    }

    actualizarCarrito();

}

// IR A CHECKOUT
function irCheckout() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }

    cerrarCarrito();

    actualizarResumenCheckout();

    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });

}

// RESUMEN DE COMPRA
function actualizarResumenCheckout() {

    const resumen = document.getElementById("resumenPedido");

    resumen.innerHTML = "";

    carrito.forEach(producto => {

        resumen.innerHTML += `
            <div class="checkout-product">
                <span>${producto.nombre} x ${producto.cantidad}</span>
                <span>${formatoPrecio(producto.precio * producto.cantidad)}</span>
            </div>
        `;

    });

    const subtotal = calcularSubtotal();
    const descuento = calcularDescuento();

    document.getElementById("checkoutSubtotal").textContent = formatoPrecio(subtotal);

    document.getElementById("checkoutDescuento").textContent = formatoPrecio(descuento);

    document.getElementById("checkoutTotal").textContent = formatoPrecio(subtotal - descuento);

}

// FINALIZAR COMPRA
document.getElementById("formularioCompra").addEventListener("submit", function(event) {

    event.preventDefault();

    if (carrito.length === 0) {

        alert("No hay productos en el carrito.");

        return;

    }

    const nombre = document.getElementById("nombre").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    const direccion = document.getElementById("direccion").value.trim();

    const ciudad = document.getElementById("ciudad").value.trim();

    if (!nombre || !correo || !telefono || !direccion || !ciudad) {

        alert("Por favor completa todos los campos obligatorios.");

        return;

    }

    const numeroPedido = "URB-" + Date.now().toString().slice(-6);

    document.getElementById("confirmacion").innerHTML = `
        <div style="background:#e8f8ed;padding:25px;border-radius:12px;">
            <h2>🎉 ¡Pedido confirmado!</h2>
            <p>Gracias por comprar en UrbanStyle, ${nombre}.</p>
            <p>Tu número de pedido es: <strong>${numeroPedido}</strong></p>
            <p>Tu pedido ha sido registrado correctamente.</p>
            <p>Esta es una compra simulada, no se realizó ningún pago.</p>
        </div>
    `;

    // LIMPIAR CARRITO
    carrito = [];

    descuentoActivo = false;

    guardarCarrito();

    document.getElementById("formularioCompra").reset();

    document.getElementById("codigoCupon").value = "";

    document.getElementById("mensajeCupon").textContent = "";

    actualizarResumenCheckout();

});

// EVENTOS DE FILTROS
document.getElementById("filtroCategoria").addEventListener("change", aplicarFiltros);

document.getElementById("filtroTalla").addEventListener("change", aplicarFiltros);

document.getElementById("ordenPrecio").addEventListener("change", aplicarFiltros);

// INICIAR TIENDA
mostrarProductos();

actualizarCarrito();
