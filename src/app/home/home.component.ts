import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  msg: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
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

}
