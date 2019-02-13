import { Injectable } from '@angular/core';
import {User} from '../app/Models/user';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {Token} from '../app/Models/token';
import {config} from '../app/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedInUser: string;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<boolean> {

        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username: user.username, password: user.password}).pipe(
            // Tap to use tokens in logUserIn()
            tap(tokens => this.logUserIn(user.username, tokens)),
            mapTo(true), catchError(error => {
                alert(error.error.message);
                return of(false);
            })
        );

    }


    logout() {
        return this.http.post<any>(`${config.apiUrl}/logout`, {
            'refreshToken': this.getRefreshToken()}).pipe(
                // Tap the log out and return true, or false on error
            tap(() => this.logUserOut()), mapTo(true),
            catchError(error => {
                alert(error.error);
                return of(false);
            })
        );
    }



    refreshToken() {
        return this.http.post<any>(`${config.apiUrl}/refresh`, {
            'refreshToken': this.getRefreshToken()}).pipe(tap((token: Token) => {
            this.storeJwtToken(token.jwt);
        }));

    }




    // Log the user out by removing the user's tokens and setting the loggedInUser variable to null
    private logUserOut() {
        this.loggedInUser = null;
        this.removeTokens();
    }


    // Log the user in by setting the loggedInUser variable to the user's username and storing the user's tokens
    private logUserIn(username: string, tokens: Token) {
        this.loggedInUser = username;
        this.storeTokens(tokens);
    }

    // Add Javascript web tokens to local storage
    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }
    // Retreive Javascript web tokens from localstorage
    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    // Get refresh token
    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    // Store both the user's tokens (JWT and refresh)
    private storeTokens(tokens: Token) {
        localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    // Remove both the user's tokens (JWT and refresh)
    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);

    }

    // Return a forced boolean for if a user is logged in by checking if a JWT token was stored.
    isLoggedIn(): boolean {
        return !!this.getJwtToken();
    }
}
