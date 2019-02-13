import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {first} from "rxjs/operators";
import {RestApiService} from "../../services/rest-api.service";
import {User} from "../Models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              private restAPI: RestApiService) { }

  ngOnInit() {
  }

  submit(username: string, password: string) {

    // Won't submit unless there's more than one character in each input.
    if (!username.length || !password.length) {
      alert('Must enter both a username and a password');
      return;
    }


    this.restAPI.register(new User(username, password)).pipe(first())
        .subscribe(
            data => {
                alert("Registration successful!. Please log in.");
              },
            // Or produces an error alert
            error => {
                alert(error.error);
            });
  }

}
