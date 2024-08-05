import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizarComponent } from './Paquete/cotizar/cotizar.component';
import { LoginComponent } from './Users/login/login.component';
import { SignupComponent } from './Users/signup/signup.component';
import { PaqueteriasComponent } from './Paquete/paqueterias/paqueterias.component';

const routes: Routes = [
  { path: 'cotizar', component: CotizarComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'paqueterias', component: PaqueteriasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
