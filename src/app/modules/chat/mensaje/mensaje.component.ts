import {AmistadesService} from '@services/amistades.service';
import {WebSocketService} from '@services/web-socket.service';
import {Component, OnInit} from '@angular/core';
import {UserService} from '@services/common/user.service';
import {ChatService} from '@services/chat.service';
import {Chat} from '@models/Chat';
import {NotificacionService} from '@services/notificacion.service';
import {Mensaje} from '@models/Mensaje';
import {MensajeService} from '@services/mensaje.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css'],
})
export class MensajeComponent implements OnInit {
  usuarios: any;
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
    genero: '',
  };
  nomb_chat: any;
  idMessages = 1;
  ContainereContextMenu = document.getElementById('content-menu');

  mensaje: Mensaje = {
    id_mensaje: 0,
    mensaje: '',
    estado: false,
    fecha_hora_mensaje: new Date(),
    id_chat: 0,
    id_usuario: 0,
  };
  mensajes_chat = [];
  mensajes = [];
  id_chat: any;

  constructor(
    private usuarioService: UserService,
    private amigosService: AmistadesService,
    private chatService: ChatService,
    private notificacionService: NotificacionService,
    private webService: WebSocketService,
    private mensajeService: MensajeService
  ) {
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getUsuario();
    this.webService.listen('recibir-chat').subscribe((data: any) => {
      localStorage.setItem('usuario', data.nom_chat);
      localStorage.setItem('id_chat', data.id_chat);

    });
    // notifica que usuario de sesion actual esta escribiendo comentario
    this.webService.listen('writing').subscribe((data: any) => {
      if (data.user !== this.usuario.nom_usuario) {
        let userWriting = [];
        if (data.message === '') {
          userWriting.push('no-show-writing');
        }
      }
    });

    this.webService.listen('new-message').subscribe((data: any) => {
      this.mensajes = data;
    });


  }

  filtrar_mensajes(data: any) {
    let usuario = localStorage.getItem('usuario');
    let usuarioa = localStorage.getItem('nom_usuario');
    this.mensajes = data.filter(mensaje => mensaje.nom_usuario == usuario || mensaje.nom_usuario === usuarioa);
    console.log(this.mensajes);
  }

  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.almacenarUsuario(res[0]);
        localStorage.setItem('id_usuario', res[0].id_usuario);
        localStorage.setItem('nom_usuario', res[0].nomb_usuario);
      },
      (err) => {
      }
    );
  }

  // Almacena datos de usuarios en objeto usuario desde la bd
  // tslint:disable-next-line: typedef
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

  getUsuarios() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    this.amigosService.getAmigos(id_usuario).subscribe((res: any) => {
      this.usuarios = res;
    });
  }

  crearchat(usuario) {
    let chat: Chat = {
      id_chat: 0,
      fecha: new Date(),
      nomb_chat: usuario.nom_usuario,
    };
    this.chatService.chatear(chat).subscribe((res: any) => {
      this.nomb_chat = usuario.nom_usuario;
      this.id_chat = res[0].id_chat;
      this.webService.emit('iniciar-chat', res);
      this.notificar(
        'Se ha realizado con exito creacion de chat' +
        ' de ' +
        usuario.nom_usuario,
        'Informacion'
      );
    });
  }

  //Metodo Notificar
  notificar(mensaje: string, tipo_notificacion: string) {
    this.notificacionService.notificar(mensaje, tipo_notificacion);
  }

  enviar_imagen(event) {
    this.idMessages = this.idMessages + 1;
    let file = event.target.files[0];
    if (file.type.indexOf('image') !== -1) {
      let message: Mensaje = {
        id_mensaje: 0,
        mensaje: '',
        estado: false,
        fecha_hora_mensaje: new Date(),
        id_chat: this.id_chat,
        id_usuario: this.usuario.id_usuario,
      };
      this.guardar_mensaje(file, message);
      this.mensaje.mensaje = '';
    }
  }

  enviar_archivo(event) {
    this.idMessages = this.idMessages + 1;
    let file = event.target.files[0];
    if (file.type.indexOf('image') === -1) {
      let message: Mensaje = {
        id_mensaje: 0,
        mensaje: '',
        estado: false,
        fecha_hora_mensaje: new Date(),
        id_chat: this.id_chat,
        id_usuario: this.usuario.id_usuario,
      };
      this.guardar_mensaje(file, message);
      this.mensaje.mensaje = '';
    }
  }

  guardar_mensaje(file: File, mensaje: Mensaje) {
    mensaje.id_chat = parseInt(localStorage.getItem('id_chat'));
    this.mensajeService.mensajear(mensaje, file).subscribe((res: any) => {
      this.webService.emit('new-message', res);
    });
  }

  enviar() {
    let message: Mensaje = {
      id_mensaje: 0,
      mensaje: this.mensaje.mensaje,
      estado: false,
      fecha_hora_mensaje: new Date(),
      id_chat: this.id_chat,
      id_usuario: this.usuario.id_usuario,
    };
    this.guardar_mensaje(null, message);
    this.mensaje.mensaje = '';
  }

  //Enviar por Enter
  enviar_enter(event) {
    this.idMessages = this.idMessages + 1;
    if (event.key === 'Enter' && this.mensaje.mensaje.trim() !== '') {
      event.preventDefault();
      let payload = {
        id: this.idMessages,
        user: this.usuario.nom_usuario,
        nameFile: '',
        message: this.mensaje.mensaje,
        date: new Date(),
      };
      this.webService.emit('new-message', payload);
      this.mensaje.mensaje = '';
    }
  }

  soltar_tecla(event) {
    if (event.key === 'Enter') {
      this.mensaje.mensaje = '';
    }

    let payload = {
      user: this.usuario.nom_usuario,
      message: this.mensaje.mensaje.trim(),
      nameFile: '',
    };
    this.webService.emit('writing', payload);
  }

  render(messagesData) {
    const messages = document.getElementById('messages-content');
    //this.mensajes_chat.innerHTML = '';
    let html = messagesData.map((data, index) => {
      let date = new Date(data.date);
      let me = data.user === this.usuario.nom_usuario ? 'me' : '';
      let same = '';
      let downLoadAttached = {};
      if (typeof data.message === 'object') {
        downLoadAttached = this.getLinkDownloadAttached(
          data.message.message,
          data.message.type,
          data.message.nameFile
        );
      }
      if (index !== 0) {
        same = data.user === messagesData[index - 1].user ? 'same' : '';
      }
    });

    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight;
  }

  getLinkDownloadAttached(arrayBuffer, type, name) {
    let nameArray = name.split('.');
    let ext = nameArray[nameArray.length - 1];
    let blob = new window.Blob([arrayBuffer], {type: type});
    let objectUrl = URL.createObjectURL(blob);
    return {
      href: objectUrl,
      nameFile: name,
      ext: ext !== 'pdf' && ext !== 'docx' ? 'file' : ext,
    };
  }

  createContextMenu(id, x, y) {
    const contentMenu = document.createElement('div');
    const btnDelete = document.createElement('div');
    contentMenu.classList.add('content-context-menu');
    contentMenu.id = 'content-context-menu';
    contentMenu.style.transform = `translate(${x}px, ${y}px)`;
    btnDelete.textContent = 'Eliminar';
    btnDelete.classList.add('btn-eliminar');
    btnDelete.id = 'btn-eliminar';

    btnDelete.addEventListener('click', () => {
      this.webService.emit('delete-message', id);
    });

    contentMenu.appendChild(btnDelete);
    this.ContainereContextMenu.appendChild(contentMenu);
  }

  verificararchivo(ruta) {
    if (typeof ruta !== 'undefined') {
      if (ruta) {
        let extensionesValidas = '.document';
        let extension = ruta.substring(ruta.lastIndexOf('.') + 1).toLowerCase();
        let extensionValida = extensionesValidas.indexOf(extension);
        if (extensionValida < 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  verificararchivopdf(ruta) {
    if (typeof ruta !== 'undefined') {
      if (ruta) {
        let extensionesValidas = '.pdf';
        let extension = ruta.substring(ruta.lastIndexOf('.') + 1).toLowerCase();
        let extensionValida = extensionesValidas.indexOf(extension);
        if (extensionValida < 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  verificarimagen(ruta) {
    if (typeof ruta !== 'undefined') {
      if (ruta) {
        let extensionesValidas = '.png, .gif, .jpeg, .jpg';
        let extension = ruta.substring(ruta.lastIndexOf('.') + 1).toLowerCase();
        let extensionValida = extensionesValidas.indexOf(extension);
        if (extensionValida < 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }

  verificartexto(ruta) {
    if (ruta) {
      return false;
    } else {
      return true;
    }
  }
}
