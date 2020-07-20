import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-myboatdriver',
  templateUrl: './myboatdriver.component.html',
  styleUrls: ['./myboatdriver.component.css']
})
export class MyboatdriverComponent implements OnInit {
  @ViewChild('f') tripForm: NgForm;
  tripId: any;
  addTripSubscriber: any;
  msg: boolean;
  boatSubscriber: any;
  loadedBoats: any;
  disable: boolean;
  tripActive: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boatSubscriber = this.http
    .get('http://localhost:8000/portal/boat_list/')
    .subscribe(
      (responseData: any) => {
        this.loadedBoats = responseData;
        console.log(responseData);
      },
      (error) => {
        console.log(error);
        this.msg = true;
      }
    );
    var id = localStorage.getItem('tripID');
    console.log(id);
    if(id==null){
      this.tripActive  = false;
    } else {
      this.tripActive = true;
      
    }
  }

  onClick(){
    this.router.navigate(['/']);
  }

  onStartTrip(form: NgForm){
    const value = form.value;
    var id = localStorage.getItem('tripID');
    if(id==null){   
    const data = {
      boat: value.boatid,
    };
    // debugger
    console.log(value);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    // debugger
    this.addTripSubscriber = this.http
      .post('http://localhost:8000/portal/trip_list/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.tripId = responseData.id;
          console.log(responseData);
          localStorage.setItem('tripID', this.tripId);
          console.log(window.localStorage);
          this.tripActive = true;
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
    } else {
      localStorage.removeItem('tripID');
      this.tripActive = false;
    }

  }
  onMyBoat(){
    this.router.navigate(['/calculation']);
  }

  onAddCrew(){
    this.router.navigate(['/addmembers'])
  }

  onAddExpense(){
    this.router.navigate(['/expenses'])
  }
  
  onAttendence(){
    this.router.navigate(['/attendence'])
  }

  onAuction(){
    this.router.navigate(['/auction'])
  }

  ngOnDestroy() {
    if(this.addTripSubscriber){
      this.addTripSubscriber.unsubscribe();
    }
    if(this.boatSubscriber){
      this.boatSubscriber.unsubscribe();
    }
    
  }
}
