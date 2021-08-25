import { MultimediaPubService } from './../../../services/multimedia-pub.service';
import { PublicacionService } from './../../../services/publicacion.service';
import { Component, Input, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { UserService } from 'src/app/services/common/user.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { Notificacion } from 'src/app/models/Notificacion';
import { ReaccionpubService } from './../../../services/reaccionpub.service';
import { Reaccionpub} from 'src/app/models/Reaccionpub';
import { style } from '@angular/animations';

@Component({
  selector: 'app-reaccion-pub',
  templateUrl: './reaccion-pub.component.html',
  styleUrls: ['./reaccion-pub.component.css']
})
export class ReaccionPubComponent implements OnInit {

  @Input() id_pub:number; 
  @Input() id_usuario:number; 
  @Input() nom_usuario:string;
  publicaciones: any = [];
  reaccionesuser: any = [];
  Reacciones: any = [];
  // tslint:disable-next-line: variable-name
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
    genero: ''};
  publicacion ={
    id_pub: 0
  };
  Reaccion: Reaccionpub = {
    id_pub: 0,
    id_usuario: 0,
    id_reac:0
  };
   // tslint:disable-next-line: variable-name
   event_name = 'reaccionar';
  //
  event_name_notificar_reaccion = 'notificar';
  // tslint:disable-next-line: variable-name
  accion_comentario: string;
  contador: number;
  imagenes: any = [];

  constructor(private publicacionService: PublicacionService,
              private webService: WebSocketService,
              private notificacioneService: NotificacionService,
              private usuarioService: UserService,
              private ReaccionpubService: ReaccionpubService,              
              private multimediaService: MultimediaPubService
              ) { }
  

              ngOnInit(): void {
                this.getPublicaciones();
                this.getUsuario();
                // obtiene publicaciones desde el servidor mediante socket
                this.webService.listen('obtener-notificacion').subscribe((data: any) => {
                  this.notificar(data[0].contenido_notif, "Informacion");
                });
                this.webService.listen('obtener-reaccion').subscribe((data:any)=>{
                  this.Reacciones=data;
                })
            
                this.webService.listen('obtener-publicacion').subscribe((data: any) => {
                  // tslint:disable-next-line: prefer-for-of
                  for (let index = 0; index < data.length; index++) {
                    this.publicaciones.push(data[index][0]);
                  }
                  // tslint:disable-next-line: prefer-for-of
                  for (let index = 0; index < data.length; index++) {
                   this.imagenes.push(data[index][0]);
                  }
                  const hash = {};
                  // elimina publicaciones con id_pub repetido
                  this.publicaciones = this.publicaciones.filter(publicacion => hash[publicacion.id_pub] ? false : hash[publicacion.id_pub] = true);
                  // Ordena desendentemente las publicaciones
                  const publicacionesOrdenadas = this.publicaciones.sort((a, b) => {
                    return b.id_pub - a.id_pub;
                  });
                  // sobrer escribe arreglo publicaciones  con array ordenado
                  this.publicaciones = publicacionesOrdenadas;
            
            
                });
                // obtiene comentarios desde el servidor mediante socket
                /*this.webService.listen('obtener-comentario').subscribe((data: any) => {
            
                  // tslint:disable-next-line: prefer-for-of
                  for (let i = 0; i < data.length; i++) {
                    this.comentarios.push(data[i][0]);
                  }
                  const hash = {};
                  // elimina comentarios con id_com repetido
                  this.comentarios = this.comentarios.filter(comentario => hash[comentario.id_com] ? false : hash[comentario.id_com] = true);
                  // ordena comentarios desendentemente
                  const comentariosOrdenadas = this.comentarios.sort((a, b) => {
                    return b.id_com - a.id_com;
                  });
                  // sobre escribe comentario con comentarios ordenados
                  this.Reacciones = comentariosOrdenadas;
                });*/
                // notifica que usuario de sesion actual esta escribiendo comentario
                this.webService.listen('notificar-comentario').subscribe((data: any) => {
                  this.accion_comentario = data + ' esta escribiendo...';
                });
            
              }
              //Metodo Notificar
  notificar(mensaje: string, tipo_notificacion: string) {
    this.notificacioneService.notificar(mensaje, tipo_notificacion);
  }
  public cerrarModal(nombre_modal: string, nombre_modal1: string): void {
    const modal = document.getElementById(nombre_modal);
    const modal1 = document.getElementById(nombre_modal1);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';
    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
    modal1.classList.toggle("modal-close");
    setTimeout(function(){
      modal.style.opacity="0";
      modal.style.visibility="hidden";
    },900)
  }
  public abrirModal(nombre_modal: string, nombre_modal1: string): void {
    
    const modal = document.getElementById(nombre_modal);
    const modal1 = document.getElementById(nombre_modal1);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'flex';
    modal.style.position = 'fixed';
    modal.style.height = '100vh';
    modal.style.overflow = 'hidden';
    modal.style.opacity="1"
    modal.style.visibility="visible";
    modal1.classList.toggle("modal-close");
    localStorage.setItem('pub',this.id_pub.toString());
    console.log(this.id_pub+" "+this.id_usuario+ " "+this.nom_usuario)
  }
  // obtiene usuario desde bd
  // tslint:disable-next-line: typedef
  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
      }, err => { }
    );
  }
  // almacena usuario desde variable usuario obtenido desde bd
  // tslint:disable-next-line: typedef
  almacenarUsuario(usuario: any) {
    this.usuario.id_usuario = usuario.id_usuario;
    this.usuario.nombres_user = usuario.nombres_usuario;
    this.usuario.apellidos_user = usuario.apellidos_usuario;
    this.usuario.nom_usuario = usuario.nom_usuario;
    this.usuario.imagen_usuario = usuario.imagen_usuario;
    this.usuario.presentacion = usuario.presentacion_usuario;
    this.usuario.email_user = usuario.email_usuario;
    this.usuario.fecha_nac = this.formatoFechUsu(usuario.fecha_nac_usuario);
    this.usuario.genero = usuario.genero;
  }
  // convierte fecha en formato aceptado por html5
  formatoFechUsu(fecha_nac_usuario: string): string {
    const fecha = fecha_nac_usuario.slice(0, -14);
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    return anio + '-' + mes + '-' + dia;
  }
  // Obtiene publicaciones desde bd
  // tslint:disable-next-line: typedef
  getPublicaciones() {
    this.publicacionService.getPublicaciones().subscribe(
      (res: any) => {
        this.publicaciones = res;
        this.getReacciones(res);
        this.getImagenes(res);
      }
    );
  }
  getImagenes(publicaciones: any): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < publicaciones.length; index++) {
      this.getImagen(publicaciones[index].id_pub);
    }
  }
  // tslint:disable-next-line: variable-name
  getImagen(id_pub: number): void{
    this.multimediaService.getImagen(id_pub).subscribe(
      (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          this.imagenes.push(res[index]);
        }
      }
    );
  }
  procesarImagen(imagenes: any, id_pub: number){
    const arrayImagenes: any = [];
    arrayImagenes.push({imagenes, id_pub});
    console.log(arrayImagenes);
  }
  adelante(): void {
    if (this.contador < (this.imagenes.length - 1)) {
      this.contador = this.contador + 1;
    } else {
      this.contador = 0;
    }
  }
  atras(): void {
    if (this.contador > 0) {
      this.contador = this.contador - 1;
    }
  }
  // Obtiene comentarios desde variable comentario
  // tslint:disable-next-line: typedef
  getReacciones(Reaccion: any) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < Reaccion.length; index++) {
      this.getReaccion(Reaccion[index].id_pub);

    }
  }
  // obtiene comentario de determinada publicacion definida por variable id_pub
  // tslint:disable-next-line: typedef
  // tslint:disable-next-line: variable-name
  getReaccion(id_pub: number) {

    this.ReaccionpubService.getReaccionpub(id_pub).subscribe(

      (res: any) => {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < res.length; index++) {
          this.Reacciones.push(res[index]);
        }
      }, err => {

      }
    );
  }
  getreaccionuser(id: number)
  {
    let confirma=0
    for (let index=0; index< this.Reacciones.length; index++){
      if(this.Reacciones[index].id_pub == id && this.Reacciones[index].id_usuario == this.id_usuario ){
        confirma=confirma+ 1;
      }else{
        confirma= confirma+0;
      }

    }
    return confirma;
  }
  getcamposreaccionuser(id: number){
    for (let index=0; index< this.Reacciones.length; index++){
      if(this.Reacciones[index].id_pub == id && this.Reacciones[index].id_usuario == this.id_usuario ){
        return this.Reacciones[index];
      }
    }
    return null;

  }

  // notifica quien esta escribiendo comentario
  // tslint:disable-next-line: typedef
  public notificarreaccion() {
    this.webService.emit('escribir-notificacion', this.usuario.nom_usuario);
  }
  // convierte fecha a formato texto
  // tslint:disable-next-line: typedef
  public formato(texto) {
    const fecha = texto.slice(0, -14);
    // tslint:disable-next-line: max-line-length
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let horas = 0;
    // tslint:disable-next-line: quotemark
    const separador = 'T';
    const tiempop = texto.split(separador);
    const tiempot = tiempop[1].split('.')[0];
    if (Number(tiempot.split(':')[0]) < 5) {
      horas = Number(tiempot.split(':')[0]) + 19;
    } else {
      horas = Number(tiempot.split(':')[0]) - 5;
    }

    const minutos = tiempot.split(':')[1];
    const segundos = tiempot.split(':')[2];
    const tiempo = horas + ':' + minutos + ':' + segundos;
    const dia = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$3');
    const mes = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$2');
    const anio = fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, '$1');
    // tslint:disable-next-line: radix
    const mesCnv = meses[parseInt(mes)];
    return dia + ' de ' + mesCnv + ' del ' + anio + ' a las ' + tiempo;
  }
  // Comenta publicacion determinada por variable id_pub
  // tslint:disable-next-line: variable-name
  // tslint:disable-next-line: typedef
  public reaccionar(id_reac) {
    this.Reaccion.id_pub = parseInt(localStorage.getItem('pub'));
    this.Reaccion.id_usuario = this.usuario.id_usuario;
    this.Reaccion.id_reac=id_reac;
    
    console.log(this.Reaccion.id_pub);
    console.log(this.getcamposreaccionuser(this.Reaccion.id_pub));
    if(this.getreaccionuser(this.Reaccion.id_pub)>=1)
    {
      if(this.getcamposreaccionuser(this.Reaccion.id_pub).id_reac==this.Reaccion.id_reac){
        
        this.ReaccionpubService.borrar(this.Reaccion).subscribe(
          (res: any) => {
            let notificacion: Notificacion = {
              id_notif: 0,
              contenido_notif: "El usuario " + this.usuario.nom_usuario + " ha reaccionado una publicacion",
              fecha_hora_notif: new Date(),
              leida_notif:false,
              id_usuario: this.usuario.id_usuario,
            };
            this.guardarnotificacion(notificacion);
            this.webService.emit(this.event_name, res);
          }
        );
      }else{
        this.ReaccionpubService.actualizar(this.Reaccion).subscribe(
          (res: any) => {
            let notificacion: Notificacion = {
              id_notif: 0,
              contenido_notif: "El usuario " + this.usuario.nom_usuario + " ha reaccionado una publicacion",
              fecha_hora_notif: new Date(),
              leida_notif:false,
              id_usuario: this.usuario.id_usuario,
            };
            this.guardarnotificacion(notificacion);
            this.webService.emit(this.event_name, res);
          }
        );
      }
    }else{
      this.ReaccionpubService.publicar(this.Reaccion).subscribe(
        (res: any) => {
          let notificacion: Notificacion = {
            id_notif: 0,
            contenido_notif: "El usuario " + this.usuario.nom_usuario + " ha reaccionado una publicacion",
            fecha_hora_notif: new Date(),
            leida_notif:false,
            id_usuario: this.usuario.id_usuario,
          };
          this.guardarnotificacion(notificacion);
          this.webService.emit(this.event_name, res);
        }
      );
    }
    
  }
  //GuardaNotificaciones de Reaccion
  guardarnotificacion(notificacion: Notificacion) {
    this.notificacioneService.guardarNotificacion(notificacion).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name_notificar_reaccion, res);
      }
    );
  }
  // Realiza conteo de Reaccion de publicacion determinada por variable id_pub
  // tslint:disable-next-line: typedef
  public contarReaccion() {
    // tslint:disable-next-line: variable-name
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' reaccionan';
    } else {
      return ' ' + cant_reac + ' reaccionaron';
    }
  }
  public contarRmeGusta()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==1).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le gusto';
    } else {
      return ' ' + cant_reac + ' les gustaron';
    }
  }
  public contarRmeEncanta()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==2).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le encanto';
    } else {     
      return ' ' + cant_reac + ' les encantaron';
    }
  }
  public contarRmeImporta()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==3).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le importo';
    } else {
      return ' ' + cant_reac + ' les importaron';
    }
  }
  public contarRmeEntristece()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==4).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le entristece';
    } else {
      return ' ' + cant_reac + ' les entristecio';
    }
  }
  public contarRmeSorprende()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==5).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le sorprende';
    } else {
      return ' ' + cant_reac + ' les sorprendieron';
    }
  }
  public contarRmeEnoja()
  {
    const cant_reac = this.Reacciones.filter(Reaccion => Reaccion.id_pub == this.id_pub && Reaccion.id_reac==6).length;
    if (cant_reac <= 1) {
      return ' ' + cant_reac + ' le enojo';
    } else {
      return ' ' + cant_reac + ' les enojaron';
    }
  }

}
