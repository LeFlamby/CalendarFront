import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let Authorization = "";
    if (localStorage.getItem('token')) {
      Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    const protectedUrls = ["/user", "/note", "/event", "calendar",  "style"];

    const urlRoute = new URL(request.url).pathname; 

    if (protectedUrls.some (url => urlRoute.includes(url)))
    
    {
      return next.handle(
        request.clone({
          setHeaders: { Authorization, }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

