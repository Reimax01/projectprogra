import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UserService } from 'src/app/services/common/user.service';
import {NsMessageService} from '@services/common/ns.message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {  id_usuario: 0,
    nombres_user: '',
    apellidos_user: '',
    nom_usuario: '',
    email_user: '',
    celular_user: '',
    fecha_nac: new Date(),
    contrasena_usuario: '',
    presentacion: '',
    telefono: '',
    id_genero: 0
  };
  token = '';
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private nsMessageService: NsMessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkSession();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
    console.log(this.form);
  }

  loginUser($event): void {
    console.log(this.form);
    $event.preventDefault();
    if (this.form.valid) {
      this.usuario.email_user = this.form.value.user;
      this.usuario.contrasena_usuario = this.form.value.password;
      this.userService.loginUser(this.usuario).subscribe( res => {
          this.token = res.token;
          localStorage.setItem('token', this.token);
          this.router.navigate(['/home']);
        }, err => {
          console.log(err);
          this.nsMessageService.error(err.error, 'Error');
        }
      );
    }
  }

  checkSession(): void {
   if (this.userService.isLogin()){
      this.router.navigate(['/home']);
    }
  }

  get userField() {
    return this.form.get('user');
  }

  get passwordField() {
    return this.form.get('password');
  }

  onChangeInputUser($event) {
    console.log($event);
    console.log(this.form);
  }

}


