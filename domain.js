// Producto, Descuento, Carrito

class Producto {
    #precioBase
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.#precioBase = precio;
        this.cantidad = cantidad;
        this.descuentos = [];
    }
agregarDescuento(nuevoDescuento){
    this.descuentos.push(nuevoDescuento)
}

precioFinal() {
    const cantidad1 = this.cantidad;
    const precioBaseTotal = this.#precioBase * cantidad1;
    const precioFinal = this.descuentos.reduce(
        function (precioAnterior, descuento) {
            return precioAnterior - descuento.valorDescontado(precioBaseTotal, cantidad1);
        }, precioBaseTotal
    )
    return Math.max(0, precioFinal); // Evitar precios negativos
}   //Si no escribo los corchetes puedo evitar el return
} // Closing brace for Producto class

class DescuentoFijo {
    constructor(valor) {
        this.valor = valor;
    }
    valorDescontado(precio, cantidad) {
        return (precioBaseTotal * this.valor) / 100 * cantidad;
    }
}

class DescuentoPorcentual {
    constructor(porcentaje) {
        this.porcentaje = porcentaje;
    }
    valorDescontado(precioBase, _) {
        return (precioBase * porcentaje) / 100;
    }
}

class DescuentoPorCantidad { //tanto descuento en la N unidad
    constructor(cantidadMinima, porcentaje) {
        this.cantidadMinima = cantidadMinima;
        this.porcentaje = porcentaje;
    }
    valorDescontado(precioBase, cantidad) {
       const vecesRepetido = Math.floor(cantidad / this.cantidadMinima); //redondeo hacia abajo
        let valorDescontado = 0;
        if (vecesRepetido > 1) {
            valorDescontado = ((precioBase * this.porcentaje) / 100)* vecesRepetido;
        }
    }
}
module.exports = { Producto, DescuentoFijo, DescuentoPorcentual, DescuentoPorCantidad };