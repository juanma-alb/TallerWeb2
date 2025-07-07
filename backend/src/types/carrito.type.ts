export interface CarritoItem {
  id: number;
  carritoId: number;
  stockId: number;
  cantidad: number;
  stock: {
    id: number;
    zapatilla: {
      id: number;
      nombre: string;
      precio: number;
      imagen?: string;
      marca: {
        nombre: string;
      };
      color: {
        nombre: string;
      };
    };
    talle: {
      numero: number;
    };
    cantidad: number;
  };
}

export interface Carrito {
  id: number;
  usuarioId: number;
  estado: string;
  items: CarritoItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AgregarAlCarritoDto {
  stockId: number;
  cantidad: number;
}

export interface ActualizarCantidadDto {
  cantidad: number;
}
