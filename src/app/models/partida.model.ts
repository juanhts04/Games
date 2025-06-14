export interface Partida {
  id: number;
  jugador1Id: number;
  jugador2Id: number;
  fecha: string;
  tiempo?: number;
  niveles?: number;
  aciertos: {
    jugador1: number;
    jugador2: number;
  };
}
