import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed: boolean = true;
  loggedIn: boolean = false;
  loggingServiceSubscriber: any;
  lang: boolean;

  constructor(private translate: TranslateService) { 
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loggingServiceSubscriber = interval(1000)
    .subscribe((val) => { 
      if(localStorage.getItem('token') == null){
        this.loggedIn = false;
      } else {
        this.loggedIn = true;
      }
    });
  }

  onClick(){
    window.localStorage.clear();
  }

  onClickLang(){
    if(this.lang == true){
      this.lang = false;
    } else {
      this.lang = true;  
    }
  }

  useLanguage(language: string){
    this.translate.use(language);
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


   openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";

  }
  
   closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }
  

  ngOnDestroy(){
    if(this.loggingServiceSubscriber){
      this.loggingServiceSubscriber.unsubscribe();
    }
    
  }
}
