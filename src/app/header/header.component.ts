import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false;
  loggingServiceSubscriber: any;

  constructor() { }

  ngOnInit(): void {
    this.loggingServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        if(localStorage.getItem('token') == null){
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
      }
    );
  }

  onClick(){
    window.localStorage.clear();
  }

  // onClick(){
  //   if(this.loggedIn){
  //     this.onLogoutClick();
  //   } else {
  //     this.onLoginClick();
  //   }
  //   this.loggedIn = false;
  // }
  // onLogoutClick(){
  //   window.localStorage.clear();
  //   console.log("Logout: ");
  //   console.log(window.localStorage);
  //   // this.loggedIn = false;
  //   // localStorage.removeItem('token');
  // }
  // onLoginClick(){
  //   console.log("Login: ");
  //   console.log(window.localStorage);
  // }

  ngOnDestroy(){
    if(this.loggingServiceSubscriber){
      this.loggingServiceSubscriber.unsubscribe();
    }
    
  }
}
