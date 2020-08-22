import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as json from '../../../assets/i18n/fishname.json';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-delete-auction',
  templateUrl: './delete-auction.component.html',
  styleUrls: ['./delete-auction.component.css']
})
export class DeleteAuctionComponent implements OnInit {

  fid: number;
  
  fishid: number;
  minprice: number;
  size: number;
  damaged: any;
  driver: any;
  
  boatdriver: boolean = false;
  initialSubscriber: any;
  fetchFishSubscriber: any;
  fishServiceSubscriber: any;

  fishname: any;
  quoteUser: string;
  getTripIdFromAuctionSubscriber: any;
  trip_id: number;
  boatowner: boolean;
  boatID: any;
  fetchOwnerSubscriber: any;
  handleDelete: boolean;
  fetchBoatIDSubscriber: any;
  deleteFishSubscriber: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fishname = json;
    this.fishname = this.fishname.default;
    // fetch fish table id
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });
    // using fish id fetch fish details
    this.fetchfish();

    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
    } else if(data == 'BoatOwner'){
      this.boatowner = true;
    } 
    console.log(window.localStorage);

    // this.fishServiceSubscriber = interval(1000).subscribe(
    //   (val) => { 
    //     this.getHighestBid();
    //   }
    // );

  }

  // back button code
  onClick(){
    let id = this.fid;
    this.router.navigate(['/auction', id]);
  }

  // delete button code
  onDelete(){
    let id = this.fid;
    this.deleteFishSubscriber = this.http.delete('http://localhost:8000/portal/fish_list/'+ id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
      });
  }

  // cancel button code
  onCancel(){
    this.router.navigate(['/auction']);
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
        this.damaged = loadedfishes.damaged;
        this.driver = loadedfishes.driver;
        if(this.boatdriver == true){
          let activeDriver = localStorage.getItem('user')
          if(activeDriver == loadedfishes.driver){
            this.handleDelete = true;
          }
        } else if(this.boatowner == true) {
          this.fetchTripIdFromAuction();
        }
      });
  }
  
  private fetchTripIdFromAuction() {
    let id = this.fid;
    this.getTripIdFromAuctionSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
            this.trip_id = Number(responseData.trips);
            this.fetchBoatID()
          },
          (error) => {
            console.log(error);
          });
  }

  // fetch old auction amount from trip table 
  private  fetchBoatID() {
    // to get trip id from auction table
    // debugger
    this.fetchBoatIDSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + this.trip_id + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        // we need BoatID to check, if this fish is belongs to current logged in owner or not,, if not he can't handle auction of this fish 
        this.boatID = responseData.boat;
        // we got BoatID in this responseData, so fetch for owner of boat using id
        this.fetchOwnerFromBoatUsingBoatID();
      },
      (error) => {
        console.log(error);
      });
  }
  
    // fetch Owner From Boat Table Using BoatID 
  fetchOwnerFromBoatUsingBoatID() {
    this.fetchOwnerSubscriber = this.http.get('http://localhost:8000/portal/boat_detail/' + this.boatID + '/')
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          if(responseData.owner == localStorage.getItem('user')){
            console.log(responseData.owner + ' == ' + localStorage.getItem('user'));
            this.handleDelete = true;
          }
        },
        (error) => {
          console.log(error);
      });
  }

  // private getHighestBid(){
  //   let id = this.fid;
  //   this.getHighestBidSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
  //       .subscribe(
  //         (responseData: any) => {
  //           if(responseData.highestBid == null){
  //             // if auction didn't sarted then driver/owner can edit
  //             this.bid = this.minprice;
  //             this.quoteUser = "Quote Didn't started yet!";
  //           } else {
  //             // only delete
  //             this.bid = responseData.highestBid;
  //             this.quoteUser = responseData.users;
  //           }
  //           console.log(responseData);
  //         },
  //         (error) => {
  //           console.log(error);
  //         });
  // }

  


  ngOnDestroy(): void{
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    if(this.fetchFishSubscriber){
      this.fetchFishSubscriber.unsubscribe();
    }
    if(this.deleteFishSubscriber){
      this.deleteFishSubscriber.unsubscribe();
    }
    if(this.getTripIdFromAuctionSubscriber){
      this.getTripIdFromAuctionSubscriber.unsubscribe();
    }
    if(this.fetchBoatIDSubscriber){
      this.fetchBoatIDSubscriber.unsubscribe();
    }
    if(this.fetchOwnerSubscriber){
      this.fetchOwnerSubscriber.unsubscribe();
    }
  }
}
