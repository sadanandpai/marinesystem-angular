import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      this.loggedIn = false
    } else {
      this.loggedIn = true
    }
    
  }

  onClick(){
    if(this.loggedIn){
      this.onLogoutClick();
    } else {
      this.onLoginClick();
    }
    this.loggedIn = false;
  }
  onLogoutClick(){
    window.localStorage.clear();
    console.log("Logout: ");
    console.log(window.localStorage);
    // this.loggedIn = false;
    // localStorage.removeItem('token');
  }
  onLoginClick(){
    console.log("Login: ");
    console.log(window.localStorage);
  }

}
