import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizarComponent } from './Paquete/cotizar/cotizar.component';
import { LoginComponent } from './Users/login/login.component';
import { SignupComponent } from './Users/signup/signup.component';
import { PaqueteriasComponent } from './Paquete/paqueterias/paqueterias.component';
import { AppSidebarComponent } from './sidebar/app-sidebar/app-sidebar.component';
import { DescripcionComponent } from './Paquete/descripcion/descripcion.component';
import { CodigoComponent } from './Paquete/codigo/codigo.component';
import { InstruccionesComponent } from './Paquete/instrucciones/instrucciones.component';
import { HistorialComponent } from './Paquete/historial/historial.component';



const routes: Routes = [
  { path: 'cotizar', component: CotizarComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'paqueterias', component: PaqueteriasComponent },
  { path: 'sidebar', component: AppSidebarComponent },
  { path: 'descripcion', component: DescripcionComponent },
  { path: 'codigo', component: CodigoComponent },
  { path: 'instrucciones', component: InstruccionesComponent },
  { path: 'historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
