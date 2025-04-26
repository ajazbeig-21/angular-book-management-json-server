import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(public router: Router){}
    logout(): void {
      localStorage.removeItem('username');
      this.router.navigate(['/login']);
  }
}
