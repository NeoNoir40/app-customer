import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviosDataService } from 'src/app/_services/envios/envios-data.service';

interface Paqueteria {
  nombre: string;
  imagen: string;
  tiempo_de_entrega: string;
  precio: number;
}


@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styleUrls: ['./descripcion.component.scss']
})

export class DescripcionComponent implements OnInit {
  paqueteria: Paqueteria | null = null;
  isSidebarOpen: boolean = false;
  currentStep = 1;
  sender: any = {};
  recipient: any = {};
  shippingPrice: number = 0;
  shippingType: string = 'Express';
  estimatedDeliveryTime: string = '1-2 días hábiles';

  constructor(
    private router: Router, 
    private enviosDataService: EnviosDataService
  ) { }

  ngOnInit() {
    const paqueteria = this.enviosDataService.getPaqueteriaSeleccionada();
    console.log('Paquetería recuperada:', paqueteria); // Para depuración
    if (paqueteria) {
      this.paqueteria = paqueteria;
      this.shippingPrice = Number(paqueteria.precio) || 0;
      this.estimatedDeliveryTime = paqueteria.tiempo_de_entrega || '';
      this.shippingType = paqueteria.nombre || '';
    } else {
      console.log('No se encontró información de paquetería');
    }
  }


  senderFields = [
    { key: 'fullName', label: 'Nombre completo', type: 'text' },
    { key: 'email', label: 'Correo electrónico', type: 'email' },
    { key: 'phone', label: 'Número telefónico', type: 'tel' },
    { key: 'country', label: 'País', type: 'text' },
    { key: 'postalCode', label: 'CP', type: 'text' },
    { key: 'state', label: 'Estado', type: 'text' },
    { key: 'city', label: 'Ciudad', type: 'text' },
    { key: 'colony', label: 'Colonia', type: 'text' },
    { key: 'street', label: 'Calle', type: 'text' },
    { key: 'exteriorNumber', label: 'Número exterior', type: 'text' },
    { key: 'interiorNumber', label: 'Número interior', type: 'text' },
    { key: 'reference', label: 'Referencia', type: 'text' },
  ];

  recipientFields = [...this.senderFields];

  openSidebar() {
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  confirmarPedido() {
    this.enviosDataService.clearPaqueteriaSeleccionada();
    this.router.navigate(['/codigo']);
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      console.log('Paso actual:', this.currentStep);
      console.log('Datos del remitente:', this.sender);
      console.log('Datos del destinatario:', this.recipient);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  adressRemitente() {
    const fields = ['street', 'exteriorNumber', 'interiorNumber', 'colony', 'city', 'state', 'country', 'postalCode', 'reference'];
    return fields
      .map(field => this.sender[field])
      .filter(value => value && value.trim() !== '')
      .join(', ');
  }

  adressDestinatario() {
    const fields = ['street', 'exteriorNumber', 'interiorNumber', 'colony', 'city', 'state', 'country', 'postalCode'];
    return fields
      .map(field => this.recipient[field])
      .filter(value => value && value.trim() !== '')
      .join(', ');
  }

  getPackageImage(): string {
    console.log('Paquetería en getPackageImage:', this.paqueteria);
    if (!this.paqueteria || !this.paqueteria.nombre) {
      console.log('Paquetería o nombre de paquetería no definido');
      return 'assets/images/default_logo.png';
    }
  
    const nombrePaqueteria = this.paqueteria.nombre.toLowerCase();
    console.log('Nombre de paquetería (lowercase):', nombrePaqueteria);
    switch (nombrePaqueteria) {
      case 'fedex':
        return 'assets/images/fedex_logo.png';
      case 'dhl':
        return 'assets/images/dhl_logo.png';
      case 'ups':
        return 'assets/images/ups_logo.png';
      case 'estafeta':
        return 'assets/images/estafeta_logo.png';
      case 'paqueteexpress':
        return 'assets/images/paquetexpress_logo.png';
      case 'superenvios':
        return 'assets/images/superenvios_logo.png';
      // Agrega más casos según sea necesario
      default:
        return 'assets/images/isotipo-dagpacket.png'; // imagen por defecto si no coincide ninguna
    }
  }
}
