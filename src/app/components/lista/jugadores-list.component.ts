import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../usuarios/usuario.model';

@Component({
  selector: 'app-jugadores-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Jugadores Registrados</h2>
    <ul>
      <li *ngFor="let jugador of jugadores">
        {{ jugador.nombre }}
      </li>
    </ul>
  `
})
export class JugadoresListComponent implements OnInit {
  jugadores: Usuario[] = [];

  ngOnInit(): void {
    this.jugadores = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }
}
