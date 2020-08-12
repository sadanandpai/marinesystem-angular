import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NodeWithI18n } from '@angular/compiler';
import { getLocaleDateTimeFormat } from '@angular/common';
import { interval } from 'rxjs/internal/observable/interval';

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
  // disable: boolean;
  tripActive: boolean;
  TripStatusSubscriber: any;
  loadedBoat: any;
  boatSubscriber: any;
  seasonActive: boolean;
  notrips: boolean;
  tripsCount: number;
  seasonStatusCheckSubscriber: any;
  seasonID: any;
  endSeasonUpdateSubscriber: any;
  StartSeasonCreateSubscriber: any;
  seasonServiceSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id = localStorage.getItem('tripID');
    if(id==null || id=="" || id=='undefined'){
      // show Select Trip Button
      this.tripActive  = false;
    } else {
      // Show End Trip Button
      this.tripActive = true;
    }
    this.trueTripListofParticularOwner();

    // this.seasonServiceSubscriber = interval(1000).subscribe(
    //   (val) => { 
        /* this.TripListTrue(); */
        // fetch owners Season which is active
        let owner = Number(localStorage.getItem('id'));
        this.fetchSeasonTrue(owner);
    //   }
    // );
  }

  
  onClick(){
    this.router.navigate(['/']);
  }

  fetchSeasonTrue(owner: number) {
    // fetch owners Season details, which is active
    // if no active Season then End Season i.e. seasonActive==false else true

    this.seasonStatusCheckSubscriber = this.http
    .get('http://localhost:8000/portal/season_true/' + owner + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        if(responseData.length==0 || responseData.length==null || responseData.length==undefined){
          this.seasonActive=false;
        } else {
          this.seasonActive=true;
          this.seasonID=responseData[responseData.length-1].id;
          localStorage.setItem('seasonID', this.seasonID);
          console.log('seasonID is:: ' + this.seasonID);
        }
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  }

  endSeason(){
    let id= this.seasonID;
    this.router.navigate(['/seasonConfirmation', id]);

  /*   // Update :- seasonStatus=false, endDate=now.dateTime, 
    const data = {
      endDate: Date(),
      owner: localStorage.getItem('id'),
      seasonStatus: false,
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.endSeasonUpdateSubscriber = this.http
    .patch('http://localhost:8000/portal/season/' + this.seasonID +'/', data, )
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.seasonActive=false;
        localStorage.removeItem('seasonID');
      },
      (error) => {
        console.log(error);
      }
    ); */
  }

  startSeason(){
    // along with owner add new season start Date & status will take default values
    const data = {
      owner: localStorage.getItem('id'),
      seasonStatus: true,
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.StartSeasonCreateSubscriber = this.http
    .post('http://localhost:8000/portal/season/', data, )
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.seasonActive=true;
        this.seasonID=responseData.id;
        localStorage.setItem('seasonID', this.seasonID);
        console.log('seasonID is:: ' + this.seasonID);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  trueTripListofParticularOwner() {
    let id = localStorage.getItem('id');
    this.tripSubscriber = this.http
    .get('http://localhost:8000/portal/trueTripListofParticularOwner/' + id + '/')
    .subscribe(
      (responseData: any) => {
        this.loadedTrip = responseData;
        console.log(responseData);
        // check notrips, responseData.length==0
        this.tripsCount=responseData.length;
        if(this.tripsCount==0 || this.tripsCount==null || this.tripsCount==undefined){
          this.notrips=true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  TripListTrue() {
    this.tripSubscriber = this.http
    .get('http://localhost:8000/portal/trip_list_true/')
    .subscribe(
      (responseData: any) => {
        this.loadedTrip = responseData;
        console.log(responseData);
        // check notrips, responseData.length==0
        this.tripsCount=responseData.length;
        if(this.tripsCount==0 || this.tripsCount==null || this.tripsCount==undefined){
          this.notrips=true;
        }
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

  onSelectTrip(form: NgForm){
    const value = form.value;
    var id=localStorage.getItem('tripID');

    if(id==null || id=="" || id=='undefined'){
      // Select Trip Button
      this.tripID = value.tripid;
      if(value.tripid==null || value.tripid=="" || value.tripid=='undefined'){
        this.tripActive = false;
      }
      localStorage.setItem('tripID', this.tripID);
      this.tripActive = true;
    } else {
      // End Trip button
      let id = localStorage.getItem('tripID');
      this.router.navigate(['/tripConfirmation', id]);
      /* const data = {
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
      */
    }
  }

  onMyBoat(){
    this.router.navigate(['/calculation']);
  }

  onAddBoat(){
    this.router.navigate(['/addboats']);
  }

  onAddExpense(){
    this.router.navigate(['/expenses']);
  }
  
  onAddMonthlyExpense(){
    this.router.navigate(['/monthlyboatexpense']);
  }
  
  // onAddSalary(){
  //   this.router.navigate(['/addsalary']);
  // }

  onAuction(){
    this.router.navigate(['/auction']);
  }

  onReport(){
    this.router.navigate(['/report']);
  }

  ngOnDestroy() {
      if(this.TripStatusSubscriber){
        this.TripStatusSubscriber.unsubscribe();
      }
      if(this.boatSubscriber){
        this.boatSubscriber.unsubscribe();
      }
      if(this.seasonStatusCheckSubscriber) {
        this.seasonStatusCheckSubscriber.unsubscribe();
      }
      if(this.endSeasonUpdateSubscriber) {
        this.endSeasonUpdateSubscriber.unsubscribe();
      }
      if(this.StartSeasonCreateSubscriber) {
        this.StartSeasonCreateSubscriber.unsubscribe();
      }
      if(this.seasonServiceSubscriber) {
        this.seasonServiceSubscriber.unsubscribe();
      }
  }  
}
