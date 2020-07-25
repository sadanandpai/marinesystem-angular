import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { interval } from 'rxjs/internal/observable/interval';
import { ActivatedRoute, Router } from '@angular/router';
import * as json from '../../../assets/i18n/fishname.json';

@Component({
  selector: 'app-customer-auctionplatform',
  templateUrl: './customer-auctionplatform.component.html',
  styleUrls: ['./customer-auctionplatform.component.css']
})
export class CustomerAuctionplatformComponent implements OnInit, OnDestroy {

  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;

  fishname: any;
  fid: number;
  maxBid: any;
  bid: any;
  bidAmount: number;
  id: number;
  fishid: any;
  minprice: any;
  size: any;
  damaged: any;
  quoteUser: string;

  initialSubscriber: any;
  fishServiceSubscriber: any;
  addAuctionDetailsSubscriber: any;
  addQuoteDetailsSubscriber: any;
  fetchFishSubscriber: any;
  getHighestBidSubscriber: any;

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
      // keep update highest bidder name and amount
      this.id = this.fid;
      console.log("bid: " + this.bid)
      this.addAuctionDetailsSubscriber = this.http.patch('http://localhost:8000/portal/auction_list/' + this.id + '/', details, 
        { headers: headers }).subscribe(
          (responseData) => {
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          }
        );

        // Add all bidders amount
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
    } else {
      this.bid = this.maxBid;
    }

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
    if(this.addQuoteDetailsSubscriber){
      this.addQuoteDetailsSubscriber.unsubscribe();
    }
  }
}
