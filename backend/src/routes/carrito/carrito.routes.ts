import { Router } from 'express';
import { CarritoController } from '../../controller/carrito.controller';

export const carritoRouter = Router();

const carritoController = new CarritoController();

// GET /api/carrito - Obtener carrito del usuario
carritoRouter.get('/', carritoController.obtenerCarrito.bind(carritoController));

// POST /api/carrito - Agregar producto al carrito
carritoRouter.post('/', carritoController.agregarAlCarrito.bind(carritoController));

// PUT /api/carrito/item/:itemId - Actualizar cantidad de un item
carritoRouter.put('/item/:itemId', carritoController.actualizarCantidad.bind(carritoController));

// DELETE /api/carrito/item/:itemId - Eliminar item del carrito
carritoRouter.delete('/item/:itemId', carritoController.eliminarItem.bind(carritoController));

// DELETE /api/carrito - Vaciar carrito
carritoRouter.delete('/', carritoController.vaciarCarrito.bind(carritoController));

// POST /api/carrito/checkout - Finalizar compra
carritoRouter.post('/checkout', carritoController.finalizarCompra.bind(carritoController));
