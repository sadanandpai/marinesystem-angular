import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as json from '../../../assets/i18n/fishname.json';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit, OnDestroy {
  fid: number;
  fishid: any;
  minprice: any;
  size: any;
  winAmount: any;
  winnerName: any;
  driver: any;
  date: any;
  fetchFishSubscriber: any;
  fetchWinnerSubscriber: any;
  initialSubscriber: any;
  handledowner: boolean;
  boatowner: boolean;
  boatdriver: boolean;

  fishname: any;
  damaged: any;
  trip_id: any;
  fetchBoatIdSubscriber: any;
  boatID: any;
  fetchOwnerSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fishname = json;
    this.fishname = this.fishname.default;
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });
    var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }
    this.fetchfish();
    this.fetchWinner();
  }

  onClick(){
    this.router.navigate(['/history']);
  }

  private fetchfish() {
    let id = this.fid;
      this.fetchFishSubscriber = this.http.get('http://localhost:8000/portal/fish_list/'+ id + '/')
        .subscribe((responseData: any) => {
            console.log(responseData);
            let loadedfishes: any = responseData;
            this.fishid = loadedfishes.fish_id;
            this.minprice = loadedfishes.fish_price;
            this.size = loadedfishes.fish_size;
            this.driver = loadedfishes.driver;
            this.damaged = loadedfishes.damaged;
        });
  }

  private fetchWinner(){
    let id = this.fid;
      this.fetchWinnerSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
            this.winAmount = responseData.highestBid;
            this.winnerName = responseData.users;
            this.trip_id = responseData.trips;
            if(this.boatowner==true){
              this.fetchBoatId();
            }
          },
          (error) => {
            console.log(error);
          });
  }

   // fetch boat id from trip table 
   private  fetchBoatId() {
    this.fetchBoatIdSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + this.trip_id + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        // we need BoatID to check, if this fish is belongs to current logged in owner or not,,
        this.boatID = responseData.boat;
        // we got BoatID in this responseData, so fetch for owner of boat using id
        this.fetchOwnerFromBoatUsingBoatID();

      },
      (error) => {
        console.log(error);
      }
    );
  }
fetchOwnerFromBoatUsingBoatID() {
  this.fetchOwnerSubscriber = this.http.get('http://localhost:8000/portal/boat_detail/' + this.boatID + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        if(responseData.owner == localStorage.getItem('user')){
          console.log(responseData.owner + ' == ' + localStorage.getItem('user'));
          this.handledowner = true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
}


  ngOnDestroy() {
    if(this.fetchFishSubscriber){
      this.fetchFishSubscriber.unsubscribe();
    }
    if(this.fetchWinnerSubscriber){
      this.fetchWinnerSubscriber.unsubscribe();
    }
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    if(this.fetchBoatIdSubscriber){
      this.fetchBoatIdSubscriber.unsubscribe();
    }
    if(this.fetchOwnerSubscriber){
      this.fetchOwnerSubscriber.unsubscribe();
    }
  }
}
