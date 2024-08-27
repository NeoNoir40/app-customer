import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnviosDataService } from 'src/app/_services/envios/envios-data.service';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent implements OnInit {
  qrCodeData: string = '';

  constructor(
    private router: Router,
    private enviosDataService: EnviosDataService
  ) {}

  ngOnInit() {
    this.qrCodeData = this.enviosDataService.getQRCodeData();
    if (!this.qrCodeData) {
      console.error('No se encontraron datos para el código QR');
      // Aquí podrías manejar el caso de que no haya datos, por ejemplo, redirigiendo al usuario
      // this.router.navigate(['/cotizar']);
    }
  }

  confirmarQr() {
    // Limpia los datos del QR después de confirmar
    this.enviosDataService.clearQRCodeData();
    this.router.navigate(['/instrucciones']);
  }
}