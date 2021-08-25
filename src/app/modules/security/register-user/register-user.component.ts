import { UserService } from '@services/common/user.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { Usuario } from '@models/Usuario';
import {NsMessageService} from '@services/common/ns.message.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-registro',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  user: Usuario = {  id_usuario: 0,
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
  generos = [];
  edad;
  alertaEdad;
  alertaGenero;
  file: File;
  form: FormGroup;
  image: any;

  @ViewChild('modalFileImage', {static: true}) public modalFileImage: ModalDirective;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private readonly nsMessageService: NsMessageService
  ) { }

  ngOnInit(): void {
    this.getGenders();
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      date: ['', [Validators.required]],
      user: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_.!-]{3,16}$')]],
      password: ['', [Validators.required,
        Validators.pattern('^(?=.*\\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\\S{8,15}$'),
        Validators.minLength(8),
        Validators.maxLength(15)]],
      gender: ['', [Validators.required]]
    });
  }

  fnCalculateAge(date: Date): number {
    if (date) {
      const timeDiff = Math.abs(Date.now() - date.getTime());
      return Math.ceil((timeDiff / (1000 * 3600 * 24)) / 365);
    } else {
      return 0;
    }
  }

  fnCalculateAge2(date: Date): number {
    const today: Date = new Date();
    const birthDate: Date = new Date(date);
    let age: number = today.getFullYear() - birthDate.getFullYear();
    const month: number = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  onRegister($event): void {
    $event.preventDefault();
    if (this.form.valid) {
      const valueForm = this.form.value;

      const gender = this.user.id_genero;
      const date = valueForm.date;

      /*const convertAge = new Date(date);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);*/
      this.edad = this.fnCalculateAge2(date);

      if (this.edad < 18) {
        this.alertaEdad = 'Usted debe ser mayor de edad para registrarse.';
      } else {
        this.alertaEdad = '';
        if (gender === 0) {
          this.alertaGenero = 'Seleccione un género de las opciones otorgadas.';
        } else {
          this.user.email_user = valueForm.email;
          this.user.nombres_user = valueForm.firstName;
          this.user.apellidos_user = valueForm.lastName;
          this.user.fecha_nac = valueForm.date;
          this.user.contrasena_usuario = valueForm.password;
          this.user.nom_usuario = valueForm.user;
          this.user.id_genero = valueForm.gender;
          this.userService.saveUser(this.user).subscribe( (res: any) => {
              const token = res.token;
              localStorage.setItem('token', token);
              this.nsMessageService.success('Usuario Registrado con exito','Información');
              this.cleanVariables();
              this.openModalFileImage();
            },err => {
              this.nsMessageService.error(err.error);
            }
          );
        }
      }
    }
  }

  changeImage(): void {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.saveImage(res[0].id_usuario);
      }, err => { }
    );
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function load() {
        this.image = reader.result;
      }.bind(this);
      this.file = file;
    } else  {
      this.image = null;
    }
  }

  // Abre ventana Modal
  openModal(nameModal: string): void {
    const modal = document.getElementById(nameModal);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'block';
    body.style.position = 'static';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }

  closeModal(nameModal: string): void {
    const modal = document.getElementById(nameModal);
    const body = document.getElementsByTagName('body')[0];
    modal.style.display = 'none';

    body.style.position = 'inherit';
    body.style.height = 'auto';
    body.style.overflow = 'visible';
  }

  saveImage(idUser) {
    this.userService.updateImageUser(idUser, this.file).subscribe((res: any) => {
          if (res) {
            this.nsMessageService.success('Imagen subida con exito.');
            this.closeModalFileImage();
          }
        }
    );
  }

  // limpia el objeto usuario
  cleanVariables() {
    this.user.nombres_user = '',
    this.user.apellidos_user = '',
    this.user.email_user = '',
    this.user.celular_user = '',
    this.user.fecha_nac = new Date(),
    this.user.nom_usuario = '',
    this.user.contrasena_usuario =  '',
    this.user.presentacion = '',
    this.user.telefono =  '',
    this.user.id_genero = 0;
    this.alertaEdad = '';
    this.alertaGenero = '';
  }

  // obtiene los generos desde bd
  getGenders() {
    this.userService.getGeneros().subscribe((res: any) => {
        console.log(res);
        this.generos = res;
      }, err => {}
    );
  }

  openModalFileImage() {
    this.modalFileImage.show();
    this.file = null;
  }

  closeModalFileImage() {
    this.modalFileImage.hide();
  }

  get emailField() {
    return this.form.get('email');
  }

  get firstNameField() {
    return this.form.get('firstName');
  }

  get lastNameField() {
    return this.form.get('lastName');
  }

  get dateField() {
    return this.form.get('date');
  }

  get userField() {
    return this.form.get('user');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get genderField() {
    return this.form.get('gender');
  }

}
