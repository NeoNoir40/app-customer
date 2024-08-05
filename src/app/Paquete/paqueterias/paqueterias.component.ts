import { Component } from '@angular/core';

interface Paqueteria {
  nombre: string;
  precio: number;
  tiempo: string;
}

@Component({
  selector: 'app-paqueterias',
  templateUrl: './paqueterias.component.html',
  styleUrls: ['./paqueterias.component.css']
})
export class PaqueteriasComponent {
  paqueterias: Paqueteria[] = [
    { nombre: 'Paquetería 1', precio: 320, tiempo: '1 a 2 días' },
    { nombre: 'Paquetería 2', precio: 570, tiempo: '1 día' },
    { nombre: 'Paquetería 3', precio: 290, tiempo: '3 a 5 días' },
  ];
}