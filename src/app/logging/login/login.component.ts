import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    const value = form.value;
    const user = { username: value.username, password: value.password };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .post('http://localhost:8000/api-token-auth/', user, { headers: headers })
      .subscribe(
        (responseData:any) => {
          localStorage.setItem('token', responseData.token);
          this.router.navigate(['fish']), { relativeTo: this.route };
        },
        (error) => {
          console.log('error', error);
        }
      );
    form.reset();
  }

  onRegister() {
    this.router.navigate(['register']), { relativeTo: this.route };
  }
}
