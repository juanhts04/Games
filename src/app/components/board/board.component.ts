import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Card } from '../../models/card.model';
import { CardComponent } from "../card/card.component";
import { Partida } from '../../models/partida.model';
import { Usuario } from '../../usuarios/usuario.model';
import { PartidaService } from '../../service/partida.service';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
 
})
export class BoardComponent implements OnInit {
  cards: Card[] = [];
  firstCard: Card | null = null;
  secondCard: Card | null = null;
  lockBoard = false;

  currentPlayer = 1;
  scores: { [key: number]: number } = { 1: 0, 2: 0 };

  partida?: Partida;
  jugador1?: Usuario;
  jugador2?: Usuario;
  

  tiempoTranscurrido: string = '00:00';
  nivel: string = 'Fácil';
  temporizador: any;

constructor(
  private readonly partidaService: PartidaService,
  private readonly router: Router
) {}


  ngOnInit(): void {
  this.cargarPartidaActiva();
  this.generateBoard();
  this.iniciarTemporizador();
  }

  finalizarPartida(): void {
  if (!this.partida) return;

  // Actualiza los aciertos en la partida antes de guardarla
  this.partida.aciertos = {
    jugador1: this.scores[1],
    jugador2: this.scores[2]
  };

  // Guarda la partida en historial
  this.partidaService.guardarPartida(this.partida);

  // Limpia la partida activa
  localStorage.removeItem('partidaActiva');

  // Redirige a la página de inicio (crear partida)
  this.router.navigate(['/']);
}

cargarPartidaActiva(): void {
  const partida = this.partidaService.obtenerPartidaActiva();
  if (partida) {
    this.partida = partida;
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    this.jugador1 = usuarios.find(u => u.id === partida.jugador1Id);
    this.jugador2 = usuarios.find(u => u.id === partida.jugador2Id);
  } else {
    console.warn('No se encontró una partida activa.');
  }
}



  iniciarTemporizador(): void {
    const inicio = Date.now();
    this.temporizador = setInterval(() => {
      const elapsed = Date.now() - inicio;
      const minutos = Math.floor(elapsed / 60000);
      const segundos = Math.floor((elapsed % 60000) / 1000);
      this.tiempoTranscurrido = `${this.pad(minutos)}:${this.pad(segundos)}`;
    }, 1000);
  }
  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  generateBoard(): void {
    const values = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
    const duplicated = [...values, ...values]
      .map((value, i) => ({ id: i, value, revealed: false, matched: false }))
      .sort(() => Math.random() - 0.5);

    this.cards = duplicated;
  }

  onCardClick(card: Card): void {
    if (this.lockBoard || card.revealed || card.matched) return;

    card.revealed = true;

    if (!this.firstCard) {
      this.firstCard = card;
      return;
    }

    this.secondCard = card;
    this.lockBoard = true;

    setTimeout(() => {
      if (this.firstCard!.value === this.secondCard!.value) {
        this.firstCard!.matched = true;
        this.secondCard!.matched = true;
        this.scores[this.currentPlayer]++;
      } else {
        this.firstCard!.revealed = false;
        this.secondCard!.revealed = false;
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
      }

      this.firstCard = null;
      this.secondCard = null;
      this.lockBoard = false;
    }, 800);
  }
}

