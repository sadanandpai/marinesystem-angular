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
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  onStartTrip(form: NgForm){
    const value = form.value;
    const data = {
      boatNum: value.boatNum,
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addTripSubscriber = this.http
      .post('http://localhost:8000/portal/trip_list/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.tripId = responseData.id;
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );

  }
  onMyBoat(){
    this.router.navigate(['/myBoats']);
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
    
  }
}
