import {NotificacionService} from '@services/notificacion.service';
import {InvitadoService} from '@services/invitado.service';
import {UserService} from '@services/common/user.service';
import {OrganizadorService} from '@services/organizador.service';
import {Component, OnInit} from '@angular/core';
import {Invitado} from '@models/Invitado';
import {Router} from '@angular/router';
import {WebSocketService} from '@services/web-socket.service';
import {AmistadesService} from '@services/amistades.service';

@Component({
  selector: 'app-invitacion-evento',
  templateUrl: './invitacion-evento.component.html',
  styleUrls: ['./invitacion-evento.component.css']
})
export class InvitacionEventoComponent implements OnInit {
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
  eventos: any;
  usuarios: any;
  nombre_evento: any;
  event_name_evento = 'enviar-invitacion';
  invitados = [];
  myEventos: any;
  username: any;

  constructor(private organizadorService: OrganizadorService,
              private invitacionService: InvitadoService,
              private webService: WebSocketService,
              private amigosService: AmistadesService,
              private router: Router,
              private usuarioService: UserService,
              private notificacionService: NotificacionService) {
  }

  ngOnInit(): void {
    this.getUsuario();
    this.getUsuarios();
    this.webService.listen('obtener-invitacion').subscribe((data: any) => {
      this.eventos = data;
      let fin = data.length - 1;
      this.getUsuarioId(data[fin].organizador);
      this.username = localStorage.getItem('username');
      this.notificacionService.notificar(this.username + 'Te a invitado a evento' + data[fin].nombre_evento, 'Informacion');
      const hash = {};
      // elimina eventos con id_evento repetido
      this.eventos = this.eventos.filter(evento => hash[evento.id_evento] ? false : hash[evento.id_evento] = true);
      // Ordena desendentemente los eventos
      const eventosOrdenados = this.eventos.sort((a, b) => {
        return b.id_evento - a.id_evento;
      });
      // sobrer escribe arreglo eventos  con array ordenado
      this.eventos = eventosOrdenados;
    });
  }

  getUsuarioId(id_usuario) {
    this.usuarioService.getUserById(id_usuario).subscribe((res: any) => {
      localStorage.setItem('username', res[0].nom_usuario);
    });
  }

  getEventos(id_usuario: number) {
    this.invitacionService.getInvitado(id_usuario).subscribe(
      (res: any) => {
        this.eventos = res;
      }
    );
  }

  getUsuario() {
    this.usuarioService.getUser().subscribe(
      (res: any) => {
        this.getMyEventos(res[0].id_usuario);
        this.getEventos(res[0].id_usuario);
        localStorage.setItem('id_usuario', res[0].id_usuario);
      },
      (err) => {
      }
    );
  }

  getMyEventos(id_usuario: any) {
    this.organizadorService.getOrganizadorUsuario(id_usuario).subscribe(
      (res: any) => {
        this.myEventos = res;
      }
    );

  }

  invitar(nombre, id_evento: number) {
    this.nombre_evento = nombre;
    localStorage.setItem('id_evento', id_evento.toString());
    this.abrirModal();
  }

  // Cierra ventana modal
  // tslint:disable-next-line: typedef
  public cerrarModal() {
    const modal = document.getElementById('invitacionModal');
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';

    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
  }

  // Abre ventana Modal
  // tslint:disable-next-line: typedef
  public abrirModal() {
    const modal = document.getElementById('invitacionModal');
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'block';
    body.style.position = 'static';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }

  seleccionarUsuario(id_usuario: number) {
    let id_evento = localStorage.getItem('id_evento');
    this.invitados.push({id_evento, estado_evento: 'Pendiente', id_usuario});
  }

  enviar() {
    for (let i = 0; i < this.invitados.length; i++) {
      this.guardarInvitacion(this.invitados[i]);
    }

  }

  guardarInvitacion(invitado: any) {
    let invitadoG: Invitado = {
      id_invitado: 0,
      id_evento: invitado.id_evento,
      estado_evento: invitado.estado_evento,
      id_usuario: invitado.id_usuario
    };
    this.invitacionService.guardarInvitado(invitadoG).subscribe(
      (res: any) => {
        this.webService.emit(this.event_name_evento, res);
        this.cerrarModal();
      }
    );
  }

  getUsuarios() {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    this.amigosService.getAmigos(id_usuario).subscribe((res: any) => {
      this.usuarios = res;
    });
  }

  cambiarEvento(estado_evento) {
    let id_usuario = parseInt(localStorage.getItem('id_usuario'));
    let invitado: Invitado = {
      id_invitado: 0,
      id_evento: 0,
      estado_evento: estado_evento,
      id_usuario: id_usuario
    };
    this.invitacionService.cambiarEstado(id_usuario, invitado).subscribe(
      (res: any) => {
        this.getEventos(id_usuario);
        this.getMyEventos(id_usuario);
      }
    );
  }

  ingresarEvento(id_evento: number) {
    let ruta = 'home/evento/' + id_evento;
    this.router.navigate([ruta]);
  }

  public formato(fecha): string {
    const fechan = new Date(fecha);
    const dia = fechan.getDate();
    const mes = fechan.getMonth();
    const anio = fechan.getFullYear();
    const hora = fechan.getHours();
    const minutos = fechan.getMinutes();
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return (
      dia +
      ' de ' +
      meses[mes] +
      ' del ' +
      anio +
      ' a partir de las ' +
      hora +
      ' : ' +
      minutos
    );
  }


}
