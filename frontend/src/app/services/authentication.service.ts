import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { environment } from 'src/environments/environment';
import { User } from '../modules/user/models/User';
import { JwtToken } from '../modules/user/models/jwt-token';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenSubject: BehaviorSubject<JwtToken>;
    public token: Observable<JwtToken>;

    constructor(private http: HttpClient,
        private router: Router) {
        this.tokenSubject = new BehaviorSubject<JwtToken>(JSON.parse(localStorage.getItem('token')));
        this.token = this.tokenSubject.asObservable();
    }

    public get tokenValue(): JwtToken {
        return this.tokenSubject.value;
    }

    public get currentUsername(): string {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.tokenSubject.value.token.toString());
        return decodedToken.sub;
    }

    public get currentUsersRole(): string {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.tokenSubject.value.token.toString());
        return decodedToken.scopes.substring(5);
    }

    refreshToken(refreshToken: String) {
        return this.http.post<any>(`${environment.apiUrl}/token/refresh-token`, refreshToken)
        .pipe(map(token => {
            if (token) {
                localStorage.removeItem('token');
                this.tokenSubject.next(null);
                localStorage.setItem('token', JSON.stringify(token));
                this.tokenSubject.next(token);
            }

            return token;
        }));
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/token/generate-token`, { username, password })
            .pipe(map(token => {
                if (token) {
                    localStorage.setItem('token', JSON.stringify(token));
                    this.tokenSubject.next(token);
                    console.log(this.currentUsersRole);                    
                }
                return token;
            }));
    }

    logout() {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
    }
}
