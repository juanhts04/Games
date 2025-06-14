import { Routes } from '@angular/router';
import { UsuarioFormComponent } from './usuarios/usuario-form.component';
import { BoardComponent } from './components/board/board.component';
import { PartidaFormComponent } from './partida/partida-form.component';
import { JugadoresListComponent } from './components/lista/jugadores-list.component';
import { PartidasListComponent } from './components/lista/partidas-list.component';

export const routes: Routes = [
  { path: '', component: PartidaFormComponent }, // Página inicial
  { path: 'partida', component: BoardComponent },
  { path: 'registro', component: UsuarioFormComponent },
  { path: 'jugadores', component: JugadoresListComponent },
  { path: 'historial', component: PartidasListComponent }
  
];

