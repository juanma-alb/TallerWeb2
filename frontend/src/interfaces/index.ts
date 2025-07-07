export interface Marca {
  id: number;
  nombre: string;
  zapatillas?: Zapatilla[];
}

export interface Color {
  id: number;
  nombre: string;
  zapatillas?: Zapatilla[];
}

export interface Talle {
  id: number;
  numero: number;
  stock?: Stock[];
}

export type Sexo = 'hombre' | 'mujer' | 'niño';

export interface Zapatilla {
  id: number;
  nombre: string;
  marcaId: number;
  colorId: number;
  sexo: Sexo;
  precio: number;
  descripcion?: string;
  imagen?: string;

  marca: Marca;
  color: Color;
  stock: Stock[];
}

export interface Stock {
  id: number;
  zapatillaId: number;
  talleId: number;
  cantidad: number;
  activo: boolean;

  zapatilla?: Zapatilla;
  talle?: Talle;
}

// Interfaces del carrito
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
  total: number;
  cantidadTotal: number;
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

export interface CarritoResponse {
  success: boolean;
  data: Carrito;
  message?: string;
}
