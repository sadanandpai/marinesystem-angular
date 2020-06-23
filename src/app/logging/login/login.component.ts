import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') loginForm: NgForm;
  msg: Boolean;
  loginSubscriber: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
  }


  onClick(){
    this.router.navigate(['/']);
  }

  onLogin(form: NgForm) {
    const value = form.value;
    const user = { username: value.username, password: value.password };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.loginSubscriber = this.http
      .post('http://localhost:8000/api-token-auth/', user, { headers: headers })
      .subscribe(
        (responseData:any) => {
          localStorage.setItem('token', responseData.token);
          localStorage.setItem('user', user.username);
          localStorage.setItem('group', responseData.groups);
          localStorage.setItem('id', responseData.user_id);
          
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('error', error);
          this.msg = true;
        }
      );
    form.reset();
  }

  onRegister() {
    this.router.navigate(['register']), { relativeTo: this.route };
  }

  ngOnDestroy() {
    if(this.loginSubscriber){
      this.loginSubscriber.unsubscribe();
    }
  }
}
