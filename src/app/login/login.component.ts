import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {User} from '../Models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
    }

    // Log user in
    login(username: string, password: string) {
        const user = new User(username, password);

        this.authService.login(user).subscribe(success => {
            if (success) {
                this.router.navigate(['/dashboard']);
            }
        });
    }



}
