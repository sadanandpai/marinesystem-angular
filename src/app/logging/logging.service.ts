import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  userAdded = new Subject<User[]>();
  private users: User[] =[
    new User('Ash_Kotegar', 'ashkotegar366@gmail.com')
  ];

  constructor() { }

  getUser(){
    return this.users.slice();
  }
  
  addUser(user: User){
    this.users.push(user);
    this.userAdded.next(this.users.slice());
  }
  
}
