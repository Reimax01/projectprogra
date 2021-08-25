export interface Amigo{
  fecha_emision_amigo: Date;
  fecha_aceptacion_amigo: Date;
  es_aceptada: boolean;
  es_seguido: boolean;
  es_seguidor: boolean;
  es_bloqueado: boolean;
  id_usuario: number;
  id_amigo: number;
}
