import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-myboatowner',
  templateUrl: './myboatowner.component.html',
  styleUrls: ['./myboatowner.component.css']
})
export class MyboatownerComponent implements OnInit {
  tripId: any;
  msg: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onClick(){
    this.router.navigate(['/']);
  }

  onMyBoat(){
    this.router.navigate(['/myBoats']);
  }

  onAddBoat(){
    this.router.navigate(['/addboats'])
  }

  onAddExpense(){
    this.router.navigate(['/expenses'])
  }
  
  onAddSalary(){
    this.router.navigate(['/addsalary'])
  }

  onAuction(){
    this.router.navigate(['/auction'])
  }

  ngOnDestroy() {
    
  }  
}
