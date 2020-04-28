import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../shared/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@ViewChild('f') userForm: NgForm;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    const value = form.value;
    const newUser = new User(value.email, value.username, value.password);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
    this.http.post('http://localhost:8000/users/', newUser, { headers: headers })
    .subscribe(responseData => {
      alert("User Added Successfully!!!");
    }, responseData => {
      alert("Invalid Email / Username already exists!!!");
  });

  }
}
