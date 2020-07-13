import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  boatDriver: boolean;
  boatOwner: boolean;

  constructor() {}

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
  }

}
