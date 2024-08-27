import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.component.html',
  styleUrls: ['./codigo.component.scss']
})
export class CodigoComponent {
  constructor(private router: Router) {}

  confirmarQr() {
    this.router.navigate(['/instrucciones']);
  }
}