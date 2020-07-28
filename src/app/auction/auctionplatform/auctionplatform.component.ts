import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { interval } from 'rxjs';
import * as json from '../../../assets/i18n/fishname.json';

@Component({
  selector: 'app-auctionplatform',
  templateUrl: './auctionplatform.component.html',
  styleUrls: ['./auctionplatform.component.css']
})
export class AuctionplatformComponent implements OnInit, OnDestroy {
  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;

  loadedAuctions: any;
  loadedfishes: any;
  id: number;
  fid: number;
  
  fishid: number;
  minprice: number;
  size: number;
  owner: any;

  bid: number;
  maxBid: number;
  bidAmount: number;

  winAmount: number;
  winnerName: string;
  visible: boolean = false;
  
  boatdriver: boolean = false;
  initialSubscriber: any;
  fetchFishSubscriber: any;
  fetchWinnerSubscriber: any;
  fishServiceSubscriber: any;
  getHighestBidSubscriber: any;
  fishStatusSubscriber: any;
  damaged: any;

  fishname: any;
  quoteUser: string;
  tripID: any;
  sum: number;
  addAuctionAmountSubscriber: any;
  fetchAuctionAmountSubscriber: any;
  getTripIdFromAuctionSubscriber: any;
  trip_id: number;
  driverSalaryPercentage: number;
  writerSalaryPercentage: number;
  crewSalaryPercentage: number;
  totalSalary: number;
  boatowner: boolean;
  boatID: any;
  fetchOwnerSubscriber: any;
  handleAuction: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fishname = json;
    this.fishname = this.fishname.default;
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });
    this.fetchfish();

    // get tripID, to fetch and update auction total amount, from getHighestBid method
    this.fetchTripIdFromAuction();

    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
    } else if(data == 'BoatOwner'){
      this.boatowner = true;
    } 
    console.log(window.localStorage);

    this.fishServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        this.getHighestBid();
      }
    );

  }
  
  private fetchTripIdFromAuction() {
    let id = this.fid;
    this.getTripIdFromAuctionSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
            this.trip_id = Number(responseData.trips);
            this.fetchAuctionAmount();
          },
          (error) => {
            console.log(error);
          });
  }

  onClick(){
    this.router.navigate(['/auction']);
  }
  
  Done(form: NgForm) {
    // Show winner details
    console.log("Winner Details");
    this.fetchWinner();
    // fish status false
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
     });
    const data = {
        status: false,
    }
    let id = this.fid;
    this.fishStatusSubscriber = this.http.patch('http://localhost:8000/fish/' + id + '/', data, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
    
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
        });
  }

  private getHighestBid(){
    let id = this.fid;
    this.getHighestBidSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            if(responseData.highestBid == null){
              this.bid = this.minprice;
              this.quoteUser = "Quote Didn't started yet!";
            } else {
              this.bid = responseData.highestBid;
              this.quoteUser = responseData.users;
            }
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          });
  }

  private fetchWinner(){
    this.visible = true;
    let id = this.fid;
    this.fetchWinnerSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            this.winAmount = responseData.highestBid;
            this.winnerName = responseData.users;
            console.log(responseData);
            this.addAuctionAmount();
          },
          (error) => {
            console.log(error);
          });
    // this.router.navigate(['winnerdetails', this.fid]);
  }

  onTransaction(){
    this.router.navigate(['transaction', this.fid]);
  }

  // add auction total amount to trip table
  addAuctionAmount() {
    this.sum += this.winAmount;
    // this.writerSalaryPercentage = Number((5*this.sum)/100);
    // this.crewSalaryPercentage = Number((1*this.sum)/100);
    // this.driverSalaryPercentage = Number((25*this.sum)/100);
    // this.totalSalary = Number(this.driverSalaryPercentage) + Number(this.writerSalaryPercentage) + Number(this.crewSalaryPercentage);
    
    // console.log("driver SalaryPercentage " + this.driverSalaryPercentage);
    // console.log("writer SalaryPercentage " + this.writerSalaryPercentage);
    // console.log("crew SalaryPercentage " + this.crewSalaryPercentage);
    // console.log("crew Total Salary " + this.totalSalary);
    
      /* const data = {
      auctionTotal: this.sum,
      driverSalary: Math.round(this.driverSalaryPercentage),
      writerSalary: Math.round(this.writerSalaryPercentage),
      loadUnloadSalary: Math.round(this.crewSalaryPercentage),
      totalSalary: Math.round(this.totalSalary)
    } */
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
      });
    const data = {
      auctionTotal: this.sum
    }
    this.addAuctionAmountSubscriber = this.http.patch('http://localhost:8000/portal/trip_detail/' + this.trip_id + '/', data, { headers: headers })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          this.router.navigate(['winnerdetails', this.fid]);
        },
        (error) => {
          console.log(error);
        }
      );
    
  }
  
    // fetch old auction amount from trip table 
    private  fetchAuctionAmount() {
      // to get trip id from auction table
      // debugger
      this.fetchAuctionAmountSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + this.trip_id + '/')
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          // we need BoatID to check, if this fish is belongs to current logged in owner or not,, if not he can't handle auction of this fish 
          this.boatID = responseData.boat;
            // if auction already updated then sum initialized to that number
          this.sum = responseData.auctionTotal;
          if(this.sum==null){
            // if auction was not updated then sum initialized to zero
            this.sum = 0;
          }
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
            this.handleAuction = true;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy(): void{
    if(this.fishServiceSubscriber){
      this.fishServiceSubscriber.unsubscribe();
    }
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    // if(this.addAuctionDetailsSubscriber){
    //   this.addAuctionDetailsSubscriber.unsubscribe();
    // }
    if(this.fetchFishSubscriber){
      this.fetchFishSubscriber.unsubscribe();
    }
    if(this.getHighestBidSubscriber){
      this.getHighestBidSubscriber.unsubscribe();
    }
    if(this.fetchWinnerSubscriber){
      this.fetchWinnerSubscriber.unsubscribe();
    }
    if(this.fishStatusSubscriber){
      this.fishStatusSubscriber.unsubscribe();
    }
    if(this.addAuctionAmountSubscriber){
      this.addAuctionAmountSubscriber.unsubscribe();
    }
    if(this.fetchAuctionAmountSubscriber){
      this.fetchAuctionAmountSubscriber.unsubscribe();
    }
    if(this.getTripIdFromAuctionSubscriber){
      this.getTripIdFromAuctionSubscriber.unsubscribe();
    }
  }
}
