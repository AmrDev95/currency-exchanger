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
import { LoadingService } from '../services/loading-bar/loading.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _loadingService : LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest = request.clone();

    if(environment.exchangeApiKey){
      newRequest = request.clone({
        params:request.params.append('api_key', environment.exchangeApiKey)
      });
    }

    this._loadingService.controlPageLoading(request.url, true);

    return next.handle(newRequest).pipe(
      finalize(() => {
        this._loadingService.controlPageLoading(request.url, false);
      }),
      catchError((error: HttpErrorResponse) => {
        this._loadingService.controlPageLoading(request.url, false);
        return throwError(() => error);
      })
    );
  }
}
