import { Injectable } from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class CalendarUtilService {

  private calendarOptionsSource = new BehaviorSubject<any>({});
  calendarOptions$ = this.calendarOptionsSource.asObservable();

  private changeViewSource = new BehaviorSubject<string>('');
  changeView$ = this.changeViewSource.asObservable();


  calendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    locale: frLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'  //,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  constructor() { }



  updateCalendarOptions(options: any) {
    this.calendarOptionsSource.next(options);
  }

  triggerChangeView(view: string) {
    this.changeViewSource.next(view);
  }

}

