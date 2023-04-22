export interface Paciente{
    IdPaciente? : number;
    Nombre?: string;
    Apellido?: string;
    Dni?: string;
    FechaNacimiento?: Date;
    Sexo?: string;
    Email?: string;
    Telefono?: string;
    Antecedentes?:string;
    IdUsuario?: number;
    IdTurno?: number;
    IdObraSocial?:number;
    IdHistorial?:number;
}