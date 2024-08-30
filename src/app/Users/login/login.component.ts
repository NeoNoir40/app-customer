import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/autenticacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, 
    private authService: AuthService) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          this.successMessage = 'Inicio de sesión exitoso';
          // Almacenar el token JWT
          localStorage.setItem('token', response.data.token);
          setTimeout(() => {
            this.router.navigate(['/cotizar']);
          }, 2000); // Redirige después de 2 segundos
        },
        (error: any) => {
          console.error('Login failed', error);
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        }
      );
    } else {
      this.errorMessage = 'Por favor, ingrese email y contraseña';
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  contactAdmin() {
    console.log('Contacting admin');
    // Implementa la lógica para contactar al administrador
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-pass']);
  }
}