import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'papeleria-gestion-front';

  toggleSidebar(): void {
    const body: Element = document.querySelector('body')!;
    const sidebar: Element = body.querySelector('.sidebar')!;
    sidebar.classList.toggle('close');
  }
}
