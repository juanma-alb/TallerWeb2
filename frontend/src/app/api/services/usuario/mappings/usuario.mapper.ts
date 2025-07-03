import { Usuario } from "../../../../modules/usuario/interfaces/usuario.interface";
import { UsuarioRest } from "../interfaces/usuario.interface.rest";

export class UsuarioMapper{

    static mapUsuarioRestToUsuario(usuarioRest: UsuarioRest): Usuario {
        return{
            id:        usuarioRest.id,
            email:     usuarioRest.email,
            firstName: usuarioRest.firstName,
            lastName:  usuarioRest.lastName,
            address:   usuarioRest.address
        }
    }
}

// se mapea el objeto que viene del Back a un Usuario del front