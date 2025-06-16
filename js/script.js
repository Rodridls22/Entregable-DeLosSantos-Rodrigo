const IVA = 1.21;
const DESCUENTO = 0.85;

const catalogo = [
  { id: 1, nombre: "Pancho", precio: 120 },
  { id: 2, nombre: "Hamburguesa", precio: 250 },
  { id: 3, nombre: "Papas fritas", precio: 180 },
  { id: 4, nombre: "Refresco 500ml", precio: 100 },
  { id: 5, nombre: "Torta frita", precio: 90 },
  { id: 6, nombre: "Combo Pancho + Refresco", precio: 200 },
  { id: 7, nombre: "Combo Hamburguesa + Papas + Refresco", precio: 480 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuentoAplicado = false;

function precioConIVA(precio) {
  return precio * IVA;
}

function aplicarDescuento(total) {
  return total * DESCUENTO;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCatalogo() {
  const contenedor = document.getElementById("catalogo");
  contenedor.innerHTML = "<h2>Menú</h2>";

  catalogo.forEach((producto) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${producto.nombre} - $${producto.precio}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
}

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "<h2>Carrito</h2>";

  if (carrito.length === 0) {
    contenedor.innerHTML += "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;
  carrito.forEach((prod, index) => {
    const precioFinal = precioConIVA(prod.precio);
    total += precioFinal;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${prod.nombre} - $${precioFinal.toFixed(2)}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });

  if (descuentoAplicado) {
    total = aplicarDescuento(total);
    contenedor.innerHTML += `<p><strong>Total con descuento: $${total.toFixed(2)}</strong></p>`;
  } else {
    contenedor.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
  }
}

function agregarAlCarrito(id) {
  const producto = catalogo.find((p) => p.id === id);
  carrito.push(producto);
  guardarCarrito();
  mostrarCarrito();
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  descuentoAplicado = false;
  guardarCarrito();
  mostrarCarrito();
}

function aplicarDescuentoAlCarrito() {
  if (!descuentoAplicado) {
    descuentoAplicado = true;
    mostrarCarrito();
  }
}

document.getElementById("vaciarCarrito").addEventListener("click", vaciarCarrito);
document.getElementById("aplicarDescuento").addEventListener("click", aplicarDescuentoAlCarrito);

mostrarCatalogo();
mostrarCarrito();
