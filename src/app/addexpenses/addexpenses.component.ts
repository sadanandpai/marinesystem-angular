import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addexpenses',
  templateUrl: './addexpenses.component.html',
  styleUrls: ['./addexpenses.component.css']
})
export class AddexpensesComponent implements OnInit {
  boatDriver: boolean = false;
  boatOwner: boolean = false;

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
