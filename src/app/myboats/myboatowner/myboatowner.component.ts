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
  TripStatusSubscriber: any;
  loadedBoat: any;
  boatSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = localStorage.getItem('tripID');
    if(id==null || id=="" || id=='undefined'){
      this.tripActive  = false;
    } else {
      this.tripActive = true;
      
    }

    this.TripListTrue();
    
  }

  TripListTrue() {
    this.tripSubscriber = this.http
    .get('http://localhost:8000/portal/trip_list_true/')
    .subscribe(
      (responseData: any) => {
        this.loadedTrip = responseData;
        console.log(responseData);
        // checkOwner of trip, show only current owners trip (using Boat ID)
      },
      (error) => {
        console.log(error);
        this.msg = true;
      }
    );
  }

  // check Boat ID with boat Table ID in this list  
  checkOwner() {
    let id = localStorage.getItem('id');
    this.boatSubscriber = this.http
    .get('http://localhost:8000/portal/boatOwner_list/' + id + '/')
    .subscribe(
      (responseData: any) => {
        this.loadedBoat = responseData;
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

    if(id==null || id=="" || id=='undefined'){
      // Select Trip
      this.tripID = value.tripid;
      if(value.tripid==null || value.tripid=="" || value.tripid=='undefined'){
        this.tripActive = false;
      }
      localStorage.setItem('tripID', this.tripID);
      this.tripActive = true;
    } else {
      // End Trip
      const data = {
        Status: false,
      }
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      });
      let id = localStorage.getItem('tripID');
      this.TripStatusSubscriber = this.http
        .patch('http://localhost:8000/portal/trip_list_false/' + id + '/', data, { headers: headers })
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
            this.TripListTrue();
            localStorage.removeItem('tripID');
          },
          (error) => {
            console.log(error);
          }
        );
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
