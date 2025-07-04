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

  marca?: Marca;
  color?: Color;
  stock?: Stock[];
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
