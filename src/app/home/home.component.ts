import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  msg : boolean;
  loggedIn: boolean;
  user: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    console.log(this.user);
    if(this.user != null){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  onStart(){
    var user = localStorage.getItem('user');
    console.log(user);
    if(user != null){
      this.router.navigate(['auction']), { relativeTo: this.route };
    } else {
      this.msg = true;
    }

  }

  ngOnDestroy(){
    
  }

}
