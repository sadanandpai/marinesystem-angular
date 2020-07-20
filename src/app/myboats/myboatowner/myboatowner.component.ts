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

  msg: boolean;
  tripID: any;
  tripSubscriber: any;
  loadedTrip: any;
  disable: boolean;
  tripActive: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = localStorage.getItem('tripID');
    if(id==null){
      this.tripActive  = false;
    } else {
      this.tripActive = true;
      
    }

    this.tripSubscriber = this.http
    .get('http://localhost:8000/portal/trip_list/')
    .subscribe(
      (responseData: any) => {
        this.loadedTrip = responseData;
        console.log(responseData);
      },
      (error) => {
        console.log(error);
        this.msg = true;
      }
    );
    

  }

  onClick(){
    this.router.navigate(['/']);
  }

  onSelectTrip(form: NgForm){
    const value = form.value;
    var id=localStorage.getItem('tripID');

    if(id==null){
      this.tripID = value.tripid;
      localStorage.setItem('tripID', this.tripID);
      this.tripActive = true;
    } else {
      localStorage.removeItem('tripID');
      this.tripActive = false;
    }
  }

  onMyBoat(){
    this.router.navigate(['/calculation']);
  }

  onAddBoat(){
    this.router.navigate(['/addboats'])
  }

  onAddExpense(){
    this.router.navigate(['/expenses'])
  }
  
  // onAddSalary(){
  //   this.router.navigate(['/addsalary'])
  // }

  onAuction(){
    this.router.navigate(['/auction'])
  }

  ngOnDestroy() {
    
  }  
}
