import { UserService } from '@services/common/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: string;
  perfil = {
    id_usuario: 0,
    nom_usuario: '',
    imagen_usuario: '',
    nombres_user: '',
    apellidos_user: '',
    email_user: '',
    celular_user: '',
    fecha_nac: '',
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    genero: ''};
  constructor(private route: ActivatedRoute, private usuarioService: UserService) { }

  ngOnInit(): void {
   this.usuario = this.route.snapshot.paramMap.get('usuario');
   this.getPerfil(this.usuario);
  }

  getPerfil(usuario: string) {
   this.usuarioService.getProfileUser(usuario).subscribe(
     (res: any) => {
       if (res) {
         this.almacenarUsuario(res[0]);
       }
     }
   );
  }
   // almacena usuario desde variable usuario obtenido desde bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {

    this.perfil.id_usuario = usuario.id_usuario;
    this.perfil.nombres_user = usuario.nombres_usuario;
    this.perfil.apellidos_user = usuario.apellidos_usuario;
    this.perfil.nom_usuario = usuario.nom_usuario;
    this.perfil.imagen_usuario = usuario.imagen_usuario;
    this.perfil.presentacion = usuario.presentacion_usuario;
    this.perfil.email_user = usuario.email_usuario;
    this.perfil.telefono = usuario.telefono_usuario;
    this.perfil.fecha_nac = this.formatoFechUsu(usuario.fecha_nac_usuario);
    this.perfil.genero = usuario.genero;
  }
// convierte fecha en formato aceptado por html5
  // tslint:disable-next-line: variable-name
  formatoFechUsu(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
   }
}
