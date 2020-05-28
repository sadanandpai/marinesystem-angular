import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Auction } from '../auction.model';
import { Fish } from 'src/app/fishdetails/fish.model';
import { interval } from 'rxjs';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-auctionplatform',
  templateUrl: './auctionplatform.component.html',
  styleUrls: ['./auctionplatform.component.css']
})
export class AuctionplatformComponent implements OnInit {
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

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });

    this.fetchfish();
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
    }
    console.log(window.localStorage)
    
    interval(1000).subscribe(
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
    // patch status false
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
     });
    const data = {
        status: false,
    }
    let id = this.fid;
    this.http.patch('http://localhost:8000/fish/' + id + '/', data, { headers: headers })
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
      }
      this.id = this.fid;
      console.log("bid: " + this.bid)
      this.http.put('http://localhost:8000/portal/auction_list/' + this.id + '/', details, 
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
      this.http.get('http://localhost:8000/fish/'+ id + '/')
        .subscribe((responseData: any) => {
            console.log(responseData);
            let loadedfishes: any = responseData;
            this.fishid = loadedfishes.fish_id;
            this.minprice = loadedfishes.fish_price;
            this.size = loadedfishes.fish_size;
            if(this.bid == null){
              this.bid = this.minprice;
            }
        });

  }

  private getHighestBid(){
    let id = this.fid;
      this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
        .subscribe(
          (responseData: any) => {
            this.bid = responseData.highestBid;
            console.log(responseData);
          },
          (error) => {
            console.log(error);
          });
  }

  private fetchWinner(){
    this.visible = true;
    let id = this.fid;
      this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
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

}
