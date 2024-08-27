import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnviosDataService } from 'src/app/_services/envios/envios-data.service';

interface Paqueteria {
  nombre: string;
  imagen: string;
  tiempo_de_entrega: string;
  precio: number;
}

@Component({
  selector: 'app-paqueterias',
  templateUrl: './paqueterias.component.html',
  styleUrls: ['./paqueterias.component.scss']
})
export class PaqueteriasComponent {
  quotes: { superenvios: { paqueterias: Paqueteria[] }, fedex: Paqueteria[], paqueteexpress: Paqueteria[] };
  paqueteriaSeleccionada: Paqueteria | null = null;
  isSidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private enviosDataService: EnviosDataService
  ) {
    const navigationExtras = this.router.getCurrentNavigation()?.extras || {};
    this.quotes = navigationExtras?.state as { superenvios: { paqueterias: Paqueteria[] }, fedex: Paqueteria[], paqueteexpress: Paqueteria[] };
  }

  seleccionarPaqueteria(paqueteria: Paqueteria) {
    console.log('Paquetería seleccionada:', paqueteria); // Para depuración
    this.paqueteriaSeleccionada = paqueteria;
    this.enviosDataService.setPaqueteriaSeleccionada(paqueteria);
    this.router.navigate(['/descripcion']);
  }

  confirmarSeleccion() {
    if (this.paqueteriaSeleccionada) {
      this.enviosDataService.setPaqueteriaSeleccionada(this.paqueteriaSeleccionada);
      this.router.navigate(['/descripcion']);
    }
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  navigateToDescription(response: { superenvios: { paqueterias: any[] }, fedex: any[], paqueteexpress: any[] }) {
    this.router.navigate(['/descripcion']);
  }
}