export interface Usuario {
    id:        number;
    email:     string;
    firstName: string;
    lastName:  string;
    address:   string;
}

// export interface SignInResponse {
//   usuario: Usuario;
// }

export interface UsuarioRegistro {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
}
