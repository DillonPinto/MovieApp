import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
@Injectable()

export class TokenInterceptor implements HttpInterceptor {

  private refresh = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor (public authService: AuthService) {}

  // Intercepts outgoing HTTP requests and processes them appropriately
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const movieApiUrl = /omdbapi.com/gi;

    if(request.headers.has('DoNotIntercept')) {
      request = request.clone({
        headers: request.headers.delete(
          'DoNotIntercept'
        )
      });
      return next.handle(request);
    }

      // Add authorization attribute to the outgoing header
      if (this.authService.getJwtToken()) {
          request = this.addToken(request, this.authService.getJwtToken());
      }


      return next.handle(request).pipe(catchError(error => {

        if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(request, next);
        } else {
            return throwError(error);
        }

      }));
  }




  private addToken(httpRequest: HttpRequest<any>, token: string) {
    // Add the Authorization attribute to the header.
    return httpRequest.clone({setHeaders: {'Authorization': `Bearer ${token}`}});
  }




  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refresh) {
      this.refresh = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.refresh = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

    } else {
        return this.refreshTokenSubject.pipe(
        // Block until token is not null
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
            return next.handle(this.addToken(request, jwt));
        }));
    }
  }


}
