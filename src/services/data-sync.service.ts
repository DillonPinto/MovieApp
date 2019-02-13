import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../app/Models/user';
import {RestApiService} from './rest-api.service';
import {UserList} from '../app/Models/user-list';

@Injectable({
  providedIn: 'root'
})
export class DataSyncService {

  private user = new BehaviorSubject<User>(this.restApi.userDB[0]);

  currentUser = this.user.asObservable();

  constructor(private restApi: RestApiService) { }

  syncUserData(userData: User) {
    this.user.next(userData);
  }

}
