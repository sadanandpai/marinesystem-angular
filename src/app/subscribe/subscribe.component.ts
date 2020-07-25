import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  boatowner: boolean;
  boatdriver: boolean;

  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatOwner'){
      this.boatowner = true;
    } else if(data == 'BoatDriver'){
      this.boatdriver = true;
    } 
  }

}
