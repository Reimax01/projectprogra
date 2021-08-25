import { InvitadoService } from '@services/invitado.service';
import { OrganizadorService } from '@services/organizador.service';
import { EventoService } from '@services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  id_evento: number;
  evento: any;
  organizador: any;
  estadisticas: any;

  constructor(private route: ActivatedRoute,
              private eventoService: EventoService,
              private organizadorService: OrganizadorService,
              private invitadosService: InvitadoService) { }

  ngOnInit(): void {
    this.id_evento = Number.parseInt(this.route.snapshot.paramMap.get('id_evento'));
    this.getEvento();
    this.getOrganizador();
    this.getEstadisticas();
  }
  getEstadisticas() {
    this.invitadosService.getEstadistica(this.id_evento).subscribe(
      (res: any) => {
        this.estadisticas = res;
      }
    );
  }
  getEvento() {
   this.eventoService.getEvento(this.id_evento).subscribe(
     (res: any) => {
       this.evento = res[0];
     }
   );
  }
  getOrganizador(){
    this.organizadorService.getOrganizador(this.id_evento).subscribe(
      (res: any) => {
      this.organizador = res[0];
    }
    );
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
