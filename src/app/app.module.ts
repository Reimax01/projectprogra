import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/security/login/login.component';
import { RegisterUserComponent } from './modules/security/register-user/register-user.component';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from '@services/token-interceptor.service.service';
import { PublicacionesComponent } from '@components/home/publicaciones/publicaciones.component';
import { HistoriasComponent } from '@components/home/historias/historias.component';
import { PublicacionComponent } from '@components/home/publicacion/publicacion.component';
import { ReaccionPubComponent } from '@components/home/reaccion-pub/reaccion-pub.component';
import { ReaccionComComponent } from '@components/home/reaccion-com/reaccion-com.component';
import { ReaccionCdetComponent } from '@components/home/reaccion-cdet/reaccion-cdet.component';
import {CommonModule, HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import { FooterComponent } from './common/footer/footer.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ContentLayoutComponent} from '@app/modules/home/content-layout/content-layout.component';
import {HomeComponent} from '@app/modules/home/home/home.component';
import {MenuInfoComponent} from '@app/common/menu/menu-info/menu-info.component';
import {MenuPrincipalComponent} from '@app/common/menu/menu-principal/menu-principal.component';
import {MenuLateralComponent} from '@app/common/menu/menu-lateral/menu-lateral.component';
import {MenuMovilComponent} from '@app/common/menu/menu-movil/menu-movil.component';
import {ListFriendsComponent} from '@app/modules/friend/lista-amigos/list-friends.component';
import {EventoComponent} from '@app/modules/event/evento/evento.component';
import {PrincipalEventoComponent} from '@app/modules/event/principal-evento/principal-evento.component';
import {BuscarUsuarioComponent} from '@app/modules/user/buscar-usuario/buscar-usuario.component';
import {PrincipalConfigComponent} from '@app/modules/user/configuracion/principal-config/principal-config.component';
import {CambioContrasenaComponent} from '@app/modules/user/configuracion/cambio-contrasena/cambio-contrasena.component';
import {InformacionPersonalComponent} from '@app/modules/user/configuracion/informacion-personal/informacion-personal.component';
import {ConfiguracionComponent} from '@app/modules/user/configuracion/configuracion/configuracion.component';
import {MenuConfiguracionComponent} from '@app/modules/user/configuracion/menu-configuracion/menu-configuracion.component';
import {InvitacionEventoComponent} from '@app/modules/event/invitacion-evento/invitacion-evento.component';
import {PerfilComponent} from '@app/modules/user/perfil/perfil.component';
import {ProductFormComponent} from '@app/modules/store/product-form/product-form.component';
import {PrincipalStoreComponent} from '@app/modules/store/principal-store/principal-store.component';
import { ProductComponent } from './modules/store/product/product.component';
import {MensajeComponent} from "@app/modules/chat/mensaje/mensaje.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    ContentLayoutComponent,
    HomeComponent,
    MenuInfoComponent,
    MenuPrincipalComponent,
    MenuLateralComponent,
    MenuMovilComponent,
    PublicacionesComponent,
    InvitacionEventoComponent,
    PrincipalEventoComponent,
    EventoComponent,
    ListFriendsComponent,
    BuscarUsuarioComponent,
    HistoriasComponent,
    PublicacionComponent,
    PrincipalConfigComponent,
    ConfiguracionComponent,
    InformacionPersonalComponent,
    CambioContrasenaComponent,
    MenuConfiguracionComponent,
    MensajeComponent,
    PerfilComponent,
    ReaccionPubComponent,
    ReaccionComComponent,
    ReaccionCdetComponent,
    ProductFormComponent,
    PrincipalStoreComponent,
    FooterComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
