import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-calculation-details',
  templateUrl: './calculation-details.component.html',
  styleUrls: ['./calculation-details.component.css']
})
export class CalculationDetailsComponent implements OnInit {

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
