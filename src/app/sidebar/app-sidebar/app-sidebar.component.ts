import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthLoginService } from '../../_services/autenticacion/auth-login.service';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  @Input() isSidebarOpen = true;
  isInventarioExpanded = false;

  constructor(
    private authService: AuthLoginService,
    private router: Router
  ) {}

  toggleInventario(): void {
    this.isInventarioExpanded = !this.isInventarioExpanded;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}