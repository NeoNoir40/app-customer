import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  title = 'Dagpacket';
  password: string = '';
  passwordFieldType: string = 'password';

  onSubmit() {
    console.log('Login attempt');
  }

  contactAdmin() {
    console.log('Contacting admin');
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
