

export interface User {
    userId: string,
    nombre: string,
    idPerfil: string,
    nombrePerfil: string,
    apellidos: string,
    genero: string,
    idGrado: string,
    nombreGrado: string,
    email: string,
    telefono: string,
    cip: string,
    dni: string,
    username: string,
    password?: string,
    createdDate?: string,
    updatedDate?: string
}

export interface Perfil {
    idPerfil: string,
    nombrePerfil: string,
    createdDate: string,
    updatedDate: string
}

export interface FormData {
    userId: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    cip: string;
    dni: string;
    idGrado: string;
    idPerfil: string;
    genero: string;
    fechaNacimiento: string;
    username: string;
    password: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    provincia: string;
}

export interface Grado {
    idGrado: string
    nombreGrado: string
}