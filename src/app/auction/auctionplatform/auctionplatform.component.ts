import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Auction } from '../auction.model';
import { Fish } from 'src/app/fishdetails/fish.model';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-auctionplatform',
  templateUrl: './auctionplatform.component.html',
  styleUrls: ['./auctionplatform.component.css']
})
export class AuctionplatformComponent implements OnInit {
  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;

  loadedAuctions: Auction[] = [];
  loadedfishes: Fish[] = [];
  id: number;
  fid: number;
  
  fishid: number;
  minprice: number;
  size: number;

  bid: number;
  maxBid: number;
  bidAmount: number;
  
  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.fid = Number(data.id) + 1;
    });
    this.fetchfish();
    interval(1000).subscribe(
      (val) => { 
        this.getHighestBid()
      });
  }
  
  Done(form: NgForm) {
    
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
      }
      console.log(this.fid);
      this.id = this.fid;
      console.log("bid: " + this.bid)
      this.http.put<{ [id:string]: Auction }>('http://localhost:8000/portal/auction_list/' + this.id + '/', details, {
        headers: headers,
      }).subscribe(
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
      this.http.get('http://localhost:8000/fish/'+ id +"/")
        .subscribe(responseData => {
            console.log("loadedfishes");
            console.log(responseData);
            let loadedfishes = responseData;
            this.fishid = loadedfishes.fish_id;
            this.minprice = loadedfishes.fish_price;
            this.size = loadedfishes.fish_size;
            if(this.bid == undefined){
              this.bid = this.minprice;
            }
        });       
  }

  private getHighestBid(){
    let id = this.fid;
      this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData) => {
            this.bid = responseData.highestBid;
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          });
  }

}
