import { prisma } from '../prisma';
import { EstadoCarrito } from '@prisma/client';

export class CarritoRepository {
  
  async obtenerCarritoActivoPorUsuario(usuarioId: number) {
    return await prisma.carrito.findFirst({
      where: {
        usuarioId,
        estado: EstadoCarrito.ACTIVO
      },
      include: {
        items: {
          include: {
            stock: {
              include: {
                zapatilla: {
                  include: {
                    marca: true,
                    color: true
                  }
                },
                talle: true
              }
            }
          }
        }
      }
    });
  }

  async crearCarrito(usuarioId: number) {
    return await prisma.carrito.create({
      data: {
        usuarioId,
        estado: EstadoCarrito.ACTIVO
      },
      include: {
        items: {
          include: {
            stock: {
              include: {
                zapatilla: {
                  include: {
                    marca: true,
                    color: true
                  }
                },
                talle: true
              }
            }
          }
        }
      }
    });
  }

  async agregarItem(carritoId: number, stockId: number, cantidad: number) {
    // Verificar si el item ya existe
    const itemExistente = await prisma.carritoItem.findUnique({
      where: {
        carritoId_stockId: {
          carritoId,
          stockId
        }
      }
    });

    if (itemExistente) {
      // Si existe, actualizar la cantidad
      return await prisma.carritoItem.update({
        where: {
          id: itemExistente.id
        },
        data: {
          cantidad: itemExistente.cantidad + cantidad
        },
        include: {
          stock: {
            include: {
              zapatilla: {
                include: {
                  marca: true,
                  color: true
                }
              },
              talle: true
            }
          }
        }
      });
    } else {
      // Si no existe, crear nuevo item
      return await prisma.carritoItem.create({
        data: {
          carritoId,
          stockId,
          cantidad
        },
        include: {
          stock: {
            include: {
              zapatilla: {
                include: {
                  marca: true,
                  color: true
                }
              },
              talle: true
            }
          }
        }
      });
    }
  }

  async actualizarCantidadItem(itemId: number, cantidad: number) {
    return await prisma.carritoItem.update({
      where: {
        id: itemId
      },
      data: {
        cantidad
      },
      include: {
        stock: {
          include: {
            zapatilla: {
              include: {
                marca: true,
                color: true
              }
            },
            talle: true
          }
        }
      }
    });
  }

  async eliminarItem(itemId: number) {
    return await prisma.carritoItem.delete({
      where: {
        id: itemId
      }
    });
  }

  async vaciarCarrito(carritoId: number) {
    return await prisma.carritoItem.deleteMany({
      where: {
        carritoId
      }
    });
  }

  async obtenerStockPorId(stockId: number) {
    return await prisma.stock.findUnique({
      where: {
        id: stockId
      },
      include: {
        zapatilla: true,
        talle: true
      }
    });
  }

  async finalizarCarrito(carritoId: number) {
    return await prisma.carrito.update({
      where: {
        id: carritoId
      },
      data: {
        estado: EstadoCarrito.FINALIZADO
      }
    });
  }
}
