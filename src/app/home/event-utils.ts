import { EventInput } from '@fullcalendar/core';
import { ApiService } from '../api.service';




let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [

// static fetchEvents() {
//   return this.http.get("events");
// }
 
//  ApiService.get("event").subscribe((data) => {
//   data.forEach((element: { id: number; title: string; start: Date; end: Date; description : string }) => {
//     element.id = element.id;
//     element.title = element.title;
//     element.start = element.start;
//     element.end = element.end;
//     element.description = element.description;
//   });

 
//   INITIAL_EVENTS.push(...data);
//    // return data;
// });



//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T00:00:00',
//     end: TODAY_STR + 'T03:00:00'
//   },

//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00',
//     end: TODAY_STR + 'T15:00:00'
//   }
];



export function createEventId() {
 
 
  return String(eventGuid++);
  

}
