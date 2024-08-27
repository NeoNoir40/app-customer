import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Users/login/login.component';
import { SignupComponent } from './Users/signup/signup.component';
import { CotizarComponent } from './Paquete/cotizar/cotizar.component';
import { PaqueteriasComponent } from './Paquete/paqueterias/paqueterias.component';
import { LottieModule } from 'ngx-lottie';
import lottie from 'lottie-web';
import { AppSidebarComponent } from './sidebar/app-sidebar/app-sidebar.component';
import { DescripcionComponent } from './Paquete/descripcion/descripcion.component';
import { CodigoComponent } from './Paquete/codigo/codigo.component';
import { InstruccionesComponent } from './Paquete/instrucciones/instrucciones.component';
import { HistorialComponent } from './Paquete/historial/historial.component';






export function playerFactory() {
  return lottie;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CotizarComponent,
    PaqueteriasComponent,
    AppSidebarComponent,
    DescripcionComponent,
    CodigoComponent,
    InstruccionesComponent,
    HistorialComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,    
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
