import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  CalendarApi,
} from '@fullcalendar/core';
import { ApiService } from '../../services/api.service';
import { map, tap } from 'rxjs';
import { CalendarUtilService } from '../../services/utils/calendar-util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({});
  currentEvents = signal<EventApi[]>([]);
  isDataFirstFetched: boolean = false;

  constructor(
    private api: ApiService,
    private calendarUtil: CalendarUtilService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setCalendar();
    this.getDatas();
  }


  setCalendar(): void {
    this.calendarOptions.set({
      ...this.calendarUtil.calendarOptions,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventDrop: this.handleEventDrop.bind(this),
    });
  }


  getDatas(): void {
    this.api
      .get('/event')
      .pipe(
        tap((data) => console.log(data)),
        map((data: any[]) =>
          data.map((event) => {
            return {
              id: event.id,
              title: event.title,
              start: new Date(event.start).toISOString().slice(0, 19),
              end: new Date(event.end).toISOString().slice(0, 19), // ça à l'air bon!
              description: event?.description,
            };
          })
        )
      )
      .subscribe((data) => {
        this.calendarOptions.update((options) => {
          console.log('transformé', data);
          return {
            ...options,
            events: data,
          };
        });
        this.isDataFirstFetched = true;
      });
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const description = prompt('Please enter a new description for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title && description) {
      this.persistEventThenAddToDom(title, description, selectInfo, calendarApi);
    }
  }

  persistEventThenAddToDom(title: string, description: string, selectInfo: DateSelectArg, calendarApi: CalendarApi): void {
    this.api
      .post('/event', {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        description,
      })
      .subscribe((data) => {
        console.log(data);

        calendarApi.addEvent({
          id: data.id,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          description,
          allDay: selectInfo.allDay,
        });
      });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      this.api.delete('/event/' + clickInfo.event.id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges();
  }

  handleEventDrop(info: { event: EventApi; oldEvent: EventApi }) {
    const updatedEvent = {
      id: info.event.id,
      start: info.event.start,
      end: info.event.end,
      title: info.event.title,
      //  description: info.event.description,
    };

    this.api.put('/event/' + info.event.id, updatedEvent).subscribe((data) => {
      console.log(data);
    });

  }

}

