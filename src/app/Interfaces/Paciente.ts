import { HistorialMedico } from './HistorialMedico';
import { obraSocial } from './obraSocial';

export interface Paciente {
  IdPaciente?: number;
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
