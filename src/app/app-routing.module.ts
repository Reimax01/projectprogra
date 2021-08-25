import { NgModule } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import {LoginComponent} from './modules/security/login/login.component';
import {RegisterUserComponent} from './modules/security/register-user/register-user.component';
import {PublicacionComponent} from '@components/home/publicacion/publicacion.component';
import {AuthGuard} from './guard/auth.guard';
import {ContentLayoutComponent} from '@app/modules/home/content-layout/content-layout.component';
import {HomeComponent} from '@app/modules/home/home/home.component';
import {ListFriendsComponent} from '@app/modules/friend/lista-amigos/list-friends.component';
import {PerfilComponent} from '@app/modules/user/perfil/perfil.component';
import {BuscarUsuarioComponent} from '@app/modules/user/buscar-usuario/buscar-usuario.component';
import {PrincipalEventoComponent} from '@app/modules/event/principal-evento/principal-evento.component';
import {EventoComponent} from '@app/modules/event/evento/evento.component';
import {PrincipalConfigComponent} from '@app/modules/user/configuracion/principal-config/principal-config.component';
import {ConfiguracionComponent} from '@app/modules/user/configuracion/configuracion/configuracion.component';
import {InformacionPersonalComponent} from '@app/modules/user/configuracion/informacion-personal/informacion-personal.component';
import {CambioContrasenaComponent} from '@app/modules/user/configuracion/cambio-contrasena/cambio-contrasena.component';
import {ProductFormComponent} from '@app/modules/store/product-form/product-form.component';
import {PrincipalStoreComponent} from '@app/modules/store/principal-store/principal-store.component';
import {MensajeComponent} from '@app/modules/chat/mensaje/mensaje.component';

const routes: Route[] = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register-user', component: RegisterUserComponent },
    {
        path: 'home', component: ContentLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'chat', component: MensajeComponent },
            { path: 'amigos', component: ListFriendsComponent },
            { path: 'perfil/:usuario', component: PerfilComponent },
            { path: 'usuarios/:usuario', component: BuscarUsuarioComponent },
            { path: 'publicacion/:id_pub', component: PublicacionComponent },
            { path: 'evento', component: PrincipalEventoComponent},
            { path: 'evento/:id_evento', component: EventoComponent},
            { path: 'marketplace/crear', component: ProductFormComponent },
            { path: 'marketplace', component: PrincipalStoreComponent },
            { path: 'configuracion', component: ConfiguracionComponent },
            { path: 'configuracion/informacion-personal', component: InformacionPersonalComponent },
            { path: 'configuracion/cambiar-contrasena', component: CambioContrasenaComponent }
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
