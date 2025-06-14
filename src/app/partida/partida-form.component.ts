import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../usuarios/usuario.model';
import { Partida } from '../models/partida.model';
import { PartidaService } from '../service/partida.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-partida-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './partida-form.component.html',
  styleUrls: ['./partida-form.component.sass']
})
export class PartidaFormComponent implements OnInit {
  usuarios: Usuario[] = [];
  jugador1Id!: number;
  jugador2Id!: number;

  constructor(
  private readonly partidaService: PartidaService,
  private router: Router
) {}


  ngOnInit(): void {
    this.usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  crearPartida() {
    if (this.jugador1Id === this.jugador2Id) {
      alert('Selecciona dos jugadores diferentes.');
      return;
    }

    const nuevaPartida: Partida = {
      id: Date.now(),
      jugador1Id: this.jugador1Id,
      jugador2Id: this.jugador2Id,
      fecha: new Date().toISOString(),
      aciertos: {
        jugador1: 0,
        jugador2: 0
      }
    };

    // Guardar la partida en el historial
  this.partidaService.guardarPartida(nuevaPartida);

  // Establecerla como la partida activa
  this.partidaService.establecerPartidaActiva(nuevaPartida); 

  alert('¡Partida creada exitosamente!');
  this.router.navigate(['/partida'])
  
  }
  
}
