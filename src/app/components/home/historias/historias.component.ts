import { Historias } from '@models/Historias';
import { AmistadesService } from '@services/amistades.service';
import { HistoriasService } from '@services/historias.service';
import { UserService } from '@services/common/user.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-historias',
  templateUrl: './historias.component.html',
  styleUrls: ['./historias.component.css']
})
export class HistoriasComponent implements OnInit {
  file: any;
  image = '';
  usuario = {
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
    genero: ''
  };
  amigos: any;
  historia: any = {
    imagen_usuario: '',
    nom_usuario: '',
    imagen_historia: ''
  };
  @ViewChild('modalPublicar', {static: true}) public modalPublicar: ModalDirective;
  @ViewChild('mostarHistoriaModal', {static: true}) public mostarHistoriaModal: ModalDirective;
  constructor(private usuarioService: UserService,
              private historiaService: HistoriasService,
              private amigosService: AmistadesService) { }

  ngOnInit(): void {
    this.getUsuario();
    this.getAmigos();
  }

  abrirHistoria(id_usuario: number) {
    this.historiaService.getHistoriaUsuario(id_usuario).subscribe(
      (res: any) => {
        this.historia = res[0];
        console.log(res[0]);
      }
    );
    this.openModal(this.mostarHistoriaModal);
  }

  publicar() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    const historia: Historias = {
      id_historia: 0,
      imagen_historia: '',
      id_usuario: id_usuario
    };
    this.historiaService.publicar_historia(historia, this.file).subscribe(
      (res: any) => {
          this.closeModal(this.modalPublicar);
      }
    );
  }

  getAmigos() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    this.amigosService.getAmigos(id_usuario).subscribe(
      (res: any) => {
        this.amigos = res;
      }
    );
  }

  public onFileChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function load() {
        this.image = reader.result;
        this.openModal(this.modalPublicar);
      }.bind(this);
      this.file = file;
    }
  }

  // Abre ventana Modal
  openModal(modalDirective: ModalDirective): void {
    modalDirective.show();
  }

  closeModal(modalDirective: ModalDirective): void {
    modalDirective.hide();
  }

  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        localStorage.setItem('id_usuario', res[0].id_usuario);
      }, err => { }
    );
  }
  // almacena usuario desde variable usuario obtenido desde bd
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.genero = usuario.genero;
  }

}
