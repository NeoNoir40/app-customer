import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  title = 'Dagpacket';
  password: string = '12345';
  email: string = 'bladimir@deepia.dev';
  passwordFieldType: string = 'password';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login attempt');
    // Aquí deberías implementar la lógica real de autenticación
    // Por ahora, simularemos un inicio de sesión exitoso
    if (this.email && this.password) {
      console.log('Login successful');
      // Navega al componente de cotización
      this.router.navigate(['/cotizar']);
    } else {
      console.log('Login failed');
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  }

  goToSignup() {
    // Navega al componente de registro
    this.router.navigate(['/signup']);
  }

  contactAdmin() {
    console.log('Contacting admin');
    // Implementa la lógica para contactar al administrador
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}