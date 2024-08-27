import { Component, OnInit } from '@angular/core';

interface Pedido {
  id: number;
  estado: 'Entregado' | 'En tránsito' | 'Procesando';
  origen: string;
  destino: string;
  fechaEnvio: Date;
  tipo: 'Paquete' | 'Sobre';
  costo: number;
}

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  isSidebarOpen: boolean = false;
  historialPedidos: Pedido[] = [];

  constructor() { }

  ngOnInit(): void {
    // Aquí normalmente cargarías los datos desde un servicio
    this.cargarHistorialPedidos();
  }

  cargarHistorialPedidos(): void {
    // Simulación de carga de datos
    // En una aplicación real, estos datos vendrían de una API o servicio
    this.historialPedidos = [
      {
        id: 1001,
        estado: 'Entregado',
        origen: 'Ciudad de México',
        destino: 'Guadalajara',
        fechaEnvio: new Date('2024-08-15'),
        tipo: 'Paquete',
        costo: 250.50
      },
      {
        id: 1002,
        estado: 'En tránsito',
        origen: 'Monterrey',
        destino: 'Cancún',
        fechaEnvio: new Date('2024-08-18'),
        tipo: 'Sobre',
        costo: 180.75
      },
      {
        id: 1003,
        estado: 'Procesando',
        origen: 'Tijuana',
        destino: 'Mérida',
        fechaEnvio: new Date('2024-08-20'),
        tipo: 'Paquete',
        costo: 320.00
      },
    ];
  }

  openSidebar(): void {
    this.isSidebarOpen = true;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  verDetallesPedido(id: number): void {
    // Implementar la lógica para ver los detalles de un pedido específico
    console.log(`Ver detalles del pedido ${id}`);
  }

  // Métodos para la paginación (a implementar)
  paginaAnterior(): void {
    // Lógica para ir a la página anterior
  }

  paginaSiguiente(): void {
    // Lógica para ir a la página siguiente
  }

  irAPagina(numeroPagina: number): void {
    // Lógica para ir a una página específica
  }
}