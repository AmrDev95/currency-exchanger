import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone();

    if(environment.exchangeApiKey){
      newRequest = request.clone({
        params:request.params.append('api_key', environment.exchangeApiKey)
      });
    }

    return next.handle(newRequest).pipe(
      finalize(() => {
        //disable loading screen
      }),
      catchError((error: HttpErrorResponse) => {
        //handle request errors
        return throwError(() => error);
      })
    );
  }
}
