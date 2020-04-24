import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { LoggingService } from '../logging.service';
import { User } from '../../shared/user.model';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@ViewChild('f') userForm: NgForm;
  constructor(private http: HttpClient,
              private loggingService: LoggingService,
              private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    const value = form.value;
    const newUser = new User(value.username, value.email);
    this.loggingService.addUser(newUser);
    this.dataStorageService.storeUserData();
    //add to database
    // this.http.post('http://localhost:8000/users/', form).subscribe(
    //   responseData => {
    //     console.log(responseData);
    //   });
    //reset page

  }
}
