import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor (private authService: AuthService, private router: Router) {}

    canActivate() {

        console.log('Auth guard');
        // if the user is authenticated from logging in, navigate to dashboard
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/dashboard']);
        }

        return !this.authService.isLoggedIn();
    }
}
