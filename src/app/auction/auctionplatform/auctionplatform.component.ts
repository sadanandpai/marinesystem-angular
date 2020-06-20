import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Auction } from '../auction.model';
import { Fish } from 'src/app/fishdetails/fish.model';
import { interval } from 'rxjs';
import { User } from 'src/app/shared/user.model';
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
  addAuctionDetailsSubscriber: any;
  fishServiceSubscriber: any;
  getHighestBidSubscriber: any;
  fishStatusSubscriber: any;
  damaged: any;

  fishname: any;
  quoteUser: string;
  addQuoteDetailsSubscriber: any;

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
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
    }
    console.log(window.localStorage);

    this.fishServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        this.getHighestBid();
      }
    );
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

  Quote(form: NgForm) {
   const value = form.value;
   const data = {
    Amount: value.quoteAmount
   };
   let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + localStorage.getItem('token')
   });

   this.maxBid = this.bid;
   this.bidAmount = Number(data.Amount)
    if (this.bidAmount > this.bid){
      this.bid = this.bidAmount;
      const details = {
        fishid: this.fid,
        highestBid: this.bid,
        users: localStorage.getItem('user'),
      }
      this.id = this.fid;
      console.log("bid: " + this.bid)
      this.addAuctionDetailsSubscriber = this.http.put('http://localhost:8000/portal/auction_list/' + this.id + '/', details, 
        { headers: headers }).subscribe(
          (responseData) => {
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          }
        );
        const Quotedetails = {
          fishid: this.fid,
          quoteAmount: this.bid,
        }
      this.addQuoteDetailsSubscriber = this.http.post('http://localhost:8000/portal/quote_list/' + this.id + '/', Quotedetails, 
      { headers: headers }).subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
        }
      );
    }else{
      this.bid = this.maxBid;
    }

  }

  private fetchfish() {
    let id = this.fid;
    this.fetchFishSubscriber = this.http.get('http://localhost:8000/fish/'+ id + '/')
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
          },
          (error) => {
            console.log(error);
          });
    this.router.navigate(['winnerdetails', id]);
  }

  onTransaction(){
    let id = this.fid;
    this.router.navigate(['transaction', id]);
  }

  ngOnDestroy(): void{
    if(this.fishServiceSubscriber){
      this.fishServiceSubscriber.unsubscribe();
    }
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    if(this.addAuctionDetailsSubscriber){
      this.addAuctionDetailsSubscriber.unsubscribe();
    }
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
    if(this.addQuoteDetailsSubscriber){
      this.addQuoteDetailsSubscriber.unsubscribe();
    }
    
  }
}
