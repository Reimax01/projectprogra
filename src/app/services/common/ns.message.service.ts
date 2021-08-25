import {Inject, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NsMessageService {

    constructor(
        @Inject(ToastrService) private readonly toastr: ToastrService
    ) { }

    success(msj: string, header?: string) {
        this.toastr.success(msj, header);
    }

    error(msj: string, header?: string) {
        this.toastr.error(msj, header);
    }

    errors(msj: string[]) {
        this.toastr.error(msj.join('<br/>'));
    }

    warning(msj: string) {
        this.toastr.warning(msj);
    }

    info(msj: string) {
        this.toastr.info(msj);
    }

    /**
     * Oculta todos los mensajes que se encuentren en la pantalla
     */
    clear() {
        this.toastr.clear();
    }
}
