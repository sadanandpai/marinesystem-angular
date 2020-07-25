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
  addAuctionAmountSubscriber: any;
  sum: number;
  fetchAuctionAmountSubscriber: any;
  trip_id: number;
  getTripIdFromAuctionSubscriber: any;
  driverSalaryPercentage: number;
  writerSalaryPercentage: number;
  crewSalaryPercentage: number;
  totalSalary: number;
  

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
 

    // fetch trip ID from auctiontable(fetchWinner method) not from localStorage for auction total calculation
    // this.tripID = localStorage.getItem('tripID');

    // JSON to display fishname
    this.fishname = json;
    this.fishname = this.fishname.default;

    // get fish id from url
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });

    // fetch auction total from trip table and initialize
    this.fetchTripIdFromAuction();

    this.fetchfish();
    this.fishServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        this.fetchWinner();
      }
    );
    this.fetchQuote();

    
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
      this.quoteSubscriber = this.http.get('http://localhost:8000/portal/quote_list/'+ id + '/')
        .subscribe((responseData: any) => {
          console.log(responseData);
          // new winner details
          this.quoteAmount = responseData.quoteAmount;
          this.quoteUser = responseData.quoteUser;
          // Update auction table with new winner
          const details = {
            trips: this.trip_id,
            fishid: this.fid,
            highestBid: this.quoteAmount,
            users: this.quoteUser,
          }
          this.updateAuctionDetailsSubscriber = this.http.put('http://localhost:8000/portal/auction_update/' + this.fid + '/', details, 
            { headers: headers }).subscribe(
              (responseData) => {
                // debugger
                console.log(responseData);
                this.addAuctionAmount();
                // this.router.navigate(['winnerdetails', this.fid]);
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

  // add auction amount to trip table
  // and also add salary of driver, writer and load/unload crew
  addAuctionAmount() {
    this.sum += this.winAmount;
    // this.driverSalaryPercentage = Number((40*this.sum)/100);
    // this.writerSalaryPercentage = Number((5*this.sum)/100);
    // this.crewSalaryPercentage = Number((25*this.sum)/100);
    // this.totalSalary = Number(this.driverSalaryPercentage) + Number(this.writerSalaryPercentage) + Number(this.crewSalaryPercentage);
    
    // console.log("driver SalaryPercentage " + this.driverSalaryPercentage);
    // console.log("writer SalaryPercentage " + this.writerSalaryPercentage);
    // console.log("crew SalaryPercentage " + this.crewSalaryPercentage);
    // console.log("crew Total Salary " + this.totalSalary);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
      });
     /*  const data = {
      auctionTotal: this.sum,
      driverSalary: this.driverSalaryPercentage,
      writerSalary: this.writerSalaryPercentage,
      loadUnloadSalary: this.crewSalaryPercentage,
      totalSalary: this.totalSalary
    } */
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

  // fetch auction amount from trip table 
  private  fetchAuctionAmount() {
    this.fetchAuctionAmountSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + this.trip_id + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
          // if auction already updated then sum initialized to that number
        this.sum = responseData.auctionTotal;
        if(this.sum==null){
          // if auction was not updated then sum initialized to zero
          this.sum = 0;
          console.log(this.sum);
        }
        console.log(this.sum);
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
