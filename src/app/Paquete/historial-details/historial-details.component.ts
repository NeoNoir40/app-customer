import { Component } from '@angular/core';
import {OnInit} from '@angular/core';
import { EnviosDataService } from 'src/app/_services/envios/envios-data.service';
import { Router,Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-historial-details',
  templateUrl: './historial-details.component.html',
  styleUrls: ['./historial-details.component.scss']
})
export class HistorialDetailsComponent {

  constructor(private enviosDataService:EnviosDataService, private router:Router,private route:ActivatedRoute) { }
  pedido: any = {};
  isSidebarOpen: boolean = false;

  id: string = '';

  ngOnInit(): void {
    // Aquí normalmente cargarías los datos desde un servicio
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      // console.log('ID:', this.id);
      this.cargarDetallePedido(this.id);
    }
    );
  }
    

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }


  cargarDetallePedido(id:string): void {

    // Llamada al servicio para obtener los detalles del pedido
    this.enviosDataService.getShipmentDetails(id).subscribe(
      (response: any) => {
        console.log('Detalles del pedido:', response);
        this.pedido = response.data;
        console.log('Pedido:', this.pedido);
      },
      (error: any) => {
        console.error('Error al cargar los detalles del pedido:', error);
      }
    );

  }
 
  

}
