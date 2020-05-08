import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auction } from '../auction.model';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-auctionplatform',
  templateUrl: './auctionplatform.component.html',
  styleUrls: ['./auctionplatform.component.css']
})
export class AuctionplatformComponent implements OnInit {
  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;

  loadedAuctions: Auction[] = [];
  fid: number;
  size: number;
  fishid: number;
  minprice: number;

  bid: number;
  maxBid: number;
  bidAmount: number;
  
  constructor(private http: HttpClient,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
      this.fishid = Number(data.fish_id);
      this.minprice = Number(data.minprice);
      this.size = Number(data.fish_size);
      this.bid = this.minprice;
    })
  }
  
  Done(form: NgForm) {
    const value = form.value;
    console.log(value);
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
        users: 'http://localhost:8000/users/1/'
      }
      console.log(details.users);
      this.http.post<{ [id:string]: Auction }>('http://localhost:8000/auction/', details, {
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

}
