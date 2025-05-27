// Constantes
const IVA = 1.21;
const DESCUENTO = 0.85; // 15% de descuento

// Variables
let totalCarrito = 0;
let productos = [];

// Catálogo ComidApp
const catalogo = [
  { id: 1, nombre: "Pancho", precio: 120 },
  { id: 2, nombre: "Hamburguesa", precio: 250 },
  { id: 3, nombre: "Papas fritas", precio: 180 },
  { id: 4, nombre: "Refresco 500ml", precio: 100 },
  { id: 5, nombre: "Torta frita", precio: 90 },
  { id: 6, nombre: "Combo Pancho + Refresco", precio: 200 },
  { id: 7, nombre: "Combo Hamburguesa + Papas + Refresco", precio: 480 },
];

// Función para aplicar IVA
const precioConIVA = (precio) => precio * IVA;

// Función para aplicar descuento
const aplicarDescuento = (total) => total * DESCUENTO;

// Mostrar catálogo
function mostrarCatalogo() {
  let mensaje = "Bienvenido a ComidApp 🍔🌭\nPrecios sin IVA:\nElegí un producto:\n";
  catalogo.forEach((prod) => {
    mensaje += `${prod.id} - ${prod.nombre} ($${prod.precio})\n`;
  });
  mensaje += `${catalogo.length + 1} - Ver carrito y total\nESC - Salir`;
  return mensaje;
}

let seguirComprando = true;

do {
  let eleccion = prompt(mostrarCatalogo());

  if (eleccion === null) break;

  if (eleccion.toUpperCase() === "ESC") {
    alert("Gracias por usar ComidApp. ¡Buen provecho!");
    seguirComprando = false;
    break;
  }

  const idElegido = parseInt(eleccion);
  if (!isNaN(idElegido) && idElegido >= 1 && idElegido <= catalogo.length) {
    const producto = catalogo.find((p) => p.id === idElegido);
    totalCarrito += precioConIVA(producto.precio);
    productos.push(producto.nombre);
    alert(`Agregaste "${producto.nombre}" al carrito.`);
  } else if (idElegido === catalogo.length + 1) {
    if (productos.length === 0) {
      alert("Tu carrito está vacío.");
      continue;
    }

    let respuesta = prompt("¿Tenés un cupón de descuento?\n1 - Sí\n2 - No");

    let totalFinal = respuesta === "1" ? aplicarDescuento(totalCarrito) : totalCarrito;

    alert(
      `Productos en tu carrito: ${productos.join(", ")}\nTotal a pagar (con IVA): $${totalFinal.toFixed(
        2
      )}`
    );
  } else {
    alert("Opción inválida. Elegí un número del menú.");
  }
} while (seguirComprando);
