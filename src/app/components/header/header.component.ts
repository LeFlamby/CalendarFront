import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CalendarUtilService } from 'src/app/services/utils/calendar-util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
items: MenuItem[]|undefined;

ngOnInit() {
  

  this.calendarUtil.calendarOptions$.subscribe((options) => {
    this.items = [
      { icon: 'pi pi-fw pi-calendar', routerLink: ['/calendar'], styleClass: 'calendar', label: 'Calendrier' },
      { icon: 'pi pi-fw pi-pencil', routerLink: ['/edit'], styleClass: 'edit', label: 'Notes' }, 
      { label: 'Mois', command: () => this.changeView('dayGridMonth', options) },
      { label: 'Semaine', command: () => this.changeView('timeGridWeek', options) },
    ];
  });
}

constructor (private router: Router, private calendarUtil: CalendarUtilService) { 
  
}
changeView(viewName: string, options: any) {
  this.calendarUtil.triggerChangeView(viewName);
}

}