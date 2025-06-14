import { Injectable } from '@angular/core';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private localStorageKey = 'usuarios';

  obtenerUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : [];
  }

  registrarUsuario(usuario: Usuario): void {
    const usuarios = this.obtenerUsuarios();
    usuario.id = this.generarNuevoId(usuarios);
    usuarios.push(usuario);
    localStorage.setItem(this.localStorageKey, JSON.stringify(usuarios));
  }

  private generarNuevoId(usuarios: Usuario[]): number {
    return usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  }
}
