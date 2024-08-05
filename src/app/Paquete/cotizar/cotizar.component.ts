import { Component } from '@angular/core';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.scss']
})

export class CotizarComponent {
  origenPostal: string = '';
  destinoPostal: string = '';
  altura: number = 0;
  ancho: number = 0;
  largo: number = 0;

  onSubmit() {
    console.log('Cotización solicitada');
    // Implement cotización logic here
  }
}