import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from '../app/Models/user';
import {UserList} from '../app/Models/user-list';
import {config} from '../app/config';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  // TODO REMOVE
  userDB: User[] = [
    new User('1', 'p')];
  constructor(private http: HttpClient) {}


  getByUsername(username: string) {
    return this.http.get(`${config.apiUrl}/users/${username}`);
  }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, {username: user.username, password: user.password});
  }

  update(user: User) {
    return this.http.put(`${config.apiUrl}/users/${user.username}`, user);
  }

}





