import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @ViewChild('f') userForm: NgForm;
  msg: Boolean;
  registerSubscriber: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['']), { relativeTo: this.route };
  }

  onContinue(){
    this.router.navigate(['login']), { relativeTo: this.route };
  }

  onSignup(form: NgForm) {
    const value = form.value;
    const newUser = new User(value.email, value.username, value.password, 'visitor');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.registerSubscriber = this.http
      .post('http://localhost:8000/users/', newUser, { headers: headers })
      .subscribe(
        (responseData) => {
          this.router.navigate(['login']), { relativeTo: this.route };
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
  }

  onClear(form: NgForm){
    this.msg = false;
    form.reset();
  }

  ngOnDestroy() {
    if(this.registerSubscriber){
    this.registerSubscriber.unsubscribe();
    }
  }
}
