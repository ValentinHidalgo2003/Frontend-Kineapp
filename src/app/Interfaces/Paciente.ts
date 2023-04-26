import { HistorialMedico } from './HistorialMedico';
import { obraSocial } from './obraSocial';

// export interface Paciente{
//     nombre?: string;
//     apellido?: string;
//     dni?: string;
//     fechaNacimiento?: Date;
//     sexo?: string;
//     email?: string;
//     telefono?: string;
//     antecedentes?:string;
//    historialMedico?:HistorialMedico;
// }
export interface Paciente {
  Nombre?: string;
  Apellido?: string;
  Dni?: number;
  fechaNacimento?: Date;
  sexo?: boolean;
  email?: string;
  telefono?: string;
  antecedentes?: string;
  historialMedico?: HistorialMedico;
  IdHistorialMedico?: Number;
  IdObraSocial?: number;
  DtoObraSocial?: obraSocial;
  IdTurno?: number;
  IdUsuario?: number;
}
