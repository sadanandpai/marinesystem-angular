import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') userForm: NgForm;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.email, value.username, value.password);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post('http://localhost:8000/users/', newUser, { headers: headers })
      .subscribe(
        (responseData) => {
          this.router.navigate(['register']), { relativeTo: this.route };
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
