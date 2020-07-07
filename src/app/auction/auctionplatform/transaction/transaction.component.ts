import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as json from '../../../../assets/i18n/fishname.json';
import { interval } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  fid: number;
  fishid: any;
  minprice: any;
  winAmount: any;
  winnerName: any;
  fetchFishSubscriber: any;
  fetchWinnerSubscriber: any;
  initialSubscriber: any;

  fishname: any;
  damaged: any;
  quoteUser: any;
  quoteAmount: any;
  fish_id: any;
  fishServiceSubscriber: any;
  loadedQuotes: any;
  fetchQuoteSubscriber: any;
  quoteSubscriber: any;
  updateAuctionDetailsSubscriber: any;
  fishStatusSubscriber: any;
  

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
    this.fishServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        this.fetchWinner();
      }
    );
    this.fetchQuote();
  }

  onClick(){
    this.router.navigate(['/auction', this.fid]);
  }

  quoteDetails(form: NgForm) {
    const value = form.value;
    console.log(value.winner);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
     });
    // fetch selected Radio button's details
      let id = value.winner;
      // debugger
      this.quoteSubscriber = this.http.get('http://localhost:8000/portal/quote_list/'+ id + '/')
        .subscribe((responseData: any) => {
          console.log(responseData);
          // debugger
          this.quoteAmount = responseData.quoteAmount;
          this.quoteUser = responseData.quoteUser;
          // Update auction table
          const details = {
            fishid: this.fid,
            highestBid: this.quoteAmount,
            users: this.quoteUser,
          }
          this.updateAuctionDetailsSubscriber = this.http.put('http://localhost:8000/portal/auction_update/' + this.fid + '/', details, 
            { headers: headers }).subscribe(
              (responseData) => {
                // debugger
                console.log(responseData);
                this.router.navigate(['winnerdetails', this.fid]);
              },
              (error) => {
                console.log(error);
              }
          );
        }
      );
    
    // fish status false
    const data = {
      status: false,
    }
    this.fishStatusSubscriber = this.http.patch('http://localhost:8000/portal/fish_list/' + this.fid + '/', data, { headers: headers })
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
            this.damaged = loadedfishes.damaged;
        });
  }

  private fetchQuote() {
    let id = this.fid;
      this.fetchQuoteSubscriber = this.http.get('http://localhost:8000/portal/quotefish_list/'+ id + '/')
        .subscribe((responseData: any) => {
            console.log(responseData);
            this.loadedQuotes = responseData;
            // this.fish_id = loadedQuotes.fish;
            // this.quoteAmount = loadedQuotes.quoteAmount;
            // this.quoteUser = loadedQuotes.quoteUser;
        });
  }

  private fetchWinner(){
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
    if(this.fishServiceSubscriber){
      this.fishServiceSubscriber.unsubscribe();
    }
    if(this.fetchQuoteSubscriber){
      this.fetchQuoteSubscriber.unsubscribe();
    }
    if(this.quoteSubscriber){
      this.quoteSubscriber.unsubscribe();
    }
    if(this.updateAuctionDetailsSubscriber){
      this.updateAuctionDetailsSubscriber.unsubscribe();
    }
    if(this.fishStatusSubscriber){
      this.fishStatusSubscriber.unsubscribe();
    }
  }
}
