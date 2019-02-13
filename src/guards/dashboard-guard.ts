import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class DashboardGuard implements CanActivate, CanLoad {


    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {
        return this.canLoad();
    }

    canLoad() {
        console.log('dashboard guard');

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/authenticate']);
        }

        return this.authService.isLoggedIn();
    }
}
