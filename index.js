const { Producto, DescuentoFijo, DescuentoPorcentual, DescuentoPorCantidad } = require('./domain.js');


const coca = new Producto("Coca Cola", 10, 1);
const descuentoFijo = new DescuentoFijo(5)
coca.agregarDescuento(descuentoFijo);

console.log(coca); // 5
console.log("El precio final del producto es " + coca.precioFinal()); // 5

const galletitas = new Producto("Galletitas", 20, 2);

const fideos = new Producto("Fideos", 100, 2);
fideos.agregarDescuento(new DescuentoPorcentual(10));

const carrito = [coca];
carrito.push(galletitas)
carrito.push(fideos)

function aumentarPrecioForEach(productos, monto) {
    productos.forEach(producto => {
        producto.precioBase += monto;
    });
}
function aumentarPrecioBaseMap(productos, monto) {
    return productos.map(producto => {
        producto.precioBase += monto;
        return producto;
    });
}  

aumentarPrecioForEach(carrito, 10);
console.log("Coca: " + coca.precioBase); // 20
console.log("Galletitas: " + galletitas.precioBase); // 30

const listaPrecios = aumentarPrecioBaseMap(carrito, 10);
console.log(listaPrecios)

//Punto B,, el precio mas alto
function precioMasAlto(productos) {
    const preciosProdcutors = productos.map(producto => producto.precioBase);
    return Math.max(...preciosProdcutors);
}

console.log(carrito.map(productos => productos.precioBase)); // [20, 30]
console.log("El precio mas alto es: " + precioMasAlto(carrito)); // 30
//para el Bonus usar el reduce

//punto C
function productosMasBaratosQue(monto, productos) {
    return productos.filter(producto => producto.precioBase < monto);
}
console.log(productosMasBaratosQue(carrito, 15))

//punto D
function obtenerPrecioTotal(productos) {
    return productos.reduce((acumulador, producto) => acumulador + producto.precioBase, 0);
}

console.log("El precio total del carrito es: " + obtenerPrecioTotal(carrito)); // 50

//punto E ordenar lista
function ordenarLista(productos) {
    productos.sort((p1, p2) => p1.precioFinal() - p2.precioFinal());
}
ordenarLista(carrito)
console.log("La lista ordenada es: ", carrito);