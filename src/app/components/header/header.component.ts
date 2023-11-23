import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
items: MenuItem[]|undefined;

ngOnInit() {
  this.items = [  
      { icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'], styleClass: 'calendar', label: 'Calendrier' },
      { icon: 'pi pi-fw pi-pencil', routerLink: ['/edit'], styleClass: 'edit', label: 'Notes' },    
  ];
}

constructor (private router: Router) { 
  
}


}