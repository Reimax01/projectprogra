import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment.prod';
import {Usuario} from '@models/Usuario';
import {NetSocialBaseService} from '../main/base/NetSocialBaseService';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService extends NetSocialBaseService {
    API_URI = environment.API_URI; // URL de Backend

    constructor(
        protected http: HttpClient
    ) {
        super(http, '');
    }

    getUsers() {
        return this.get('/usuarios');
    }

    getUserById(idUser) {
        return this.get(`/usuario/${idUser}`);
    }

    getUser() {
        return this.get('/usuarioauth');
    }

    getProfileUser(user: string) {
        return this.get(`/usuario/${user}`);
    }

    deleteUser(idUser: number) {
        return this.delete(`/deleteUsuario/${idUser}`);
    }

    // Almacena en bd mediante  NgModel de Usuario enviado a servidor backend
    saveUser(user: Usuario) {
        return this.post('/createUsuario', user);
    }

    // Actualiza en bd mediante  NgModel de Usuario y su id  enviado a servidor backend
    updateUser(idUser: number, updateUser: Usuario) {
        console.log(idUser);
        return this.http.put(`${this.API_URI}/updateUsuario/${idUser}`, updateUser);
    }

    updateImageUser(idUser: number, file: File) {
        const form = new FormData();
        form.append('file', file);
        form.append('url', this.API_URI);
        return this.http.put(`${this.API_URI}/updateImagen/${idUser}`, form);
    }

    loginUser(loginUser: Usuario): any {
        return this.post('/login', loginUser);
    }

    isLogin(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    logout() {
        return this.get('/logout');
    }

    updatePassword(idUser: number, updateUser: Usuario): any {
        return this.http.put(`${this.API_URI}/updateContrasena/${idUser}`, updateUser);
    }

    confirmContrasena(id_usuario: number, updateUsuario: Usuario): any {
        return this.http.put(`${this.API_URI}/confirmContrasena/${id_usuario}`, updateUsuario);
    }

    getGeneros(): Observable<any> {
        return this.get('/generos');
    }

}
