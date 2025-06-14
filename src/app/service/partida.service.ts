import { Injectable } from '@angular/core';
import { Partida } from '../models/partida.model';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private storageKey = 'partidas';
  private partidaActivaKey = 'partidaActiva';

  // Obtener todas las partidas guardadas
  getPartidas(): Partida[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Guardar nueva partida al historial
  guardarPartida(partida: Partida): void {
  const partidas = this.getPartidas();

  const index = partidas.findIndex(p => p.id === partida.id);
  if (index !== -1) {
    // Ya existe → actualiza
    partidas[index] = partida;
  } else {
    // No existe → agrega nueva
    partidas.push(partida);
  }

  localStorage.setItem(this.storageKey, JSON.stringify(partidas));

  // Establecer también como partida activa
  this.establecerPartidaActiva(partida);
}

  // Establecer partida activa actual
  establecerPartidaActiva(partida: Partida): void {
    localStorage.setItem(this.partidaActivaKey, JSON.stringify(partida));
  }

  // Obtener la partida activa
  obtenerPartidaActiva(): Partida | undefined {
  return JSON.parse(localStorage.getItem('partidaActiva') || 'null') || undefined;
}


  // Limpiar partida activa (por ejemplo, al terminar)
  limpiarPartidaActiva(): void {
    localStorage.removeItem(this.partidaActivaKey);
  }
}






