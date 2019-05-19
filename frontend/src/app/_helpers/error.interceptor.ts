import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';




@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {  
                this.authenticationService.refreshToken(this.authenticationService.tokenValue.refreshToken).subscribe(data=>{
                    location.reload(true);
                })                          
                //this.authenticationService.logout();
                //location.reload(true);
            }
            
            const error = err.error.message || err.statusText;
            console.log(error)
            return throwError(error);
        }))
    }
}