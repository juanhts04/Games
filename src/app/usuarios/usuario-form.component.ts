import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Necesario para routerLink
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.sass'],
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class UsuarioFormComponent {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: '',
    password: ''
  };

  mensaje = '';

  constructor(private readonly usuarioService: UsuarioService) {}

  registrar(): void {
    if (!this.usuario.nombre || !this.usuario.email || !this.usuario.password) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.usuarioService.registrarUsuario(this.usuario);
    this.mensaje = 'Usuario registrado con éxito';
    this.usuario = { id: 0, nombre: '', email: '', password: '' };
  }
}


