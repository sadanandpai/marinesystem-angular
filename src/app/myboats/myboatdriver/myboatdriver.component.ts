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
  fetchSeasonIDSubscriber: any;
  seasonID: any;
  seasonErr: boolean;

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
    if(id==null || id=="" || id==undefined){
      // show Start Trip Button
      this.tripActive  = false;
    } else {
      // show End trip Button
      this.tripActive = true;
      var endBtn = document.getElementById('trip-btn');
      endBtn.style.backgroundColor = 'red';
    }

  }

  onClick(){
    this.router.navigate(['/']);
  }

  onStartTrip(form: NgForm){
    const value = form.value;
    var id = localStorage.getItem('tripID');
    let boat = value.boatid;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    // check for trip id null or not 
    if(id==null || id=="" || id==undefined) { 
      // Start Trip Button
    this.fetchSeasonIDSubscriber = this.http
      .get('http://localhost:8000/portal/boat_season_true/' + boat + '/')
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          if(responseData.length==undefined || responseData.length==0){
            this.seasonErr = true;
          }
          // got seasonID here
          this.seasonID = responseData[0].id;
          console.log(this.seasonID);
          
            // Got SeasonID now create Trip 
            const data = {
              boat: value.boatid,
              seasonId: this.seasonID,
            };
            console.log(value);

            this.addTripSubscriber = this.http
              .post('http://localhost:8000/portal/trip_list/', data, { headers: headers })
              .subscribe(
                (responseData: any) => {
                  this.tripId = responseData.id;
                  console.log(responseData);
                  localStorage.setItem('tripID', this.tripId);
                  console.log(window.localStorage);
                  this.tripActive = true;
                  // css for end trip btn
                  var endBtn = document.getElementById('trip-btn');
                  endBtn.style.backgroundColor = 'red';
                },
                (error) => {
                  console.log(error);
              });
            },
            (error) => {
            console.log(error);
          });
          } else {
            // End Trip Button
            // if tripID not null then end current active trip
            let id = localStorage.getItem('tripID');
            this.router.navigate(['/tripConfirmation', id]);
            /* localStorage.removeItem('tripID');
            this.tripActive = false; */
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
