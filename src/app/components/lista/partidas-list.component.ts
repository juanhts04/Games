import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partida } from '../../models/partida.model';

@Component({
  selector: 'app-partidas-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Historial de Partidas</h2>
    <ul>
      <li *ngFor="let partida of partidas">
        Fecha: {{ partida.fecha | date:'short' }},
        Jugador 1: {{ partida.jugador1Id }},
        Jugador 2: {{ partida.jugador2Id }},
        Aciertos - J1: {{ partida.aciertos.jugador1 }},
        J2: {{ partida.aciertos.jugador2 }}
      </li>
    </ul>
  `
})
export class PartidasListComponent implements OnInit {
  partidas: Partida[] = [];

  ngOnInit(): void {
    this.partidas = JSON.parse(localStorage.getItem('partidas') || '[]');
  }
}
