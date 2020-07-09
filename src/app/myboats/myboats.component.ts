import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-myboats',
  templateUrl: './myboats.component.html',
  styleUrls: ['./myboats.component.css']
})
export class MyboatsComponent implements OnInit {
  boatDriver: boolean;
  boatOwner: boolean;

  constructor() { }

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatDriver = true;
    } else if(data == 'BoatOwner') {
      this.boatOwner = true;
    } else {
      this.boatDriver = false;
      this.boatOwner = false;
    }
    console.log(window.localStorage);
  }

}
