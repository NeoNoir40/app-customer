import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EnviosDataService } from 'src/app/_services/envios/envios-data.service';

interface Paqueteria {
  nombre: string;
  proveedor: string;
  tiempo_de_entrega: string;
  nombre_servicio: string;
  precio: number;
}

@Component({
  selector: 'app-paqueterias',
  templateUrl: './paqueterias.component.html',
  styleUrls: ['./paqueterias.component.scss']
})
export class PaqueteriasComponent {
  quotes: { superenvios: { paqueterias: Paqueteria[] }, fedex: Paqueteria[], paqueteexpress: Paqueteria[], dhl: Paqueteria[] };
  paqueteriaSeleccionada: Paqueteria | null = null;
  isSidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private enviosDataService: EnviosDataService
  ) {
    const navigationExtras = this.router.getCurrentNavigation()?.extras || {};
    this.quotes = navigationExtras?.state as { superenvios: { paqueterias: Paqueteria[] }, fedex: Paqueteria[], paqueteexpress: Paqueteria[], dhl: Paqueteria[] };
  }

  seleccionarPaqueteria(paqueteria: Paqueteria) {
    console.log('Paquetería seleccionada:', paqueteria); 
    this.paqueteriaSeleccionada = paqueteria;
    this.enviosDataService.setPaqueteriaSeleccionada(paqueteria);
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

  getImage(proveedor: string): string {
    const proveedorNormalizado = proveedor.toLowerCase().replace(/\s+/g, '');
    return `assets/images/${proveedorNormalizado}_logo.png`;
  }
}