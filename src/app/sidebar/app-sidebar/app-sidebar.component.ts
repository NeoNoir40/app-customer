import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSidebarComponent {
  @Input() isSidebarOpen = true;
  isInventarioExpanded = false;

  toggleInventario(): void {
    this.isInventarioExpanded = !this.isInventarioExpanded;
  }
}