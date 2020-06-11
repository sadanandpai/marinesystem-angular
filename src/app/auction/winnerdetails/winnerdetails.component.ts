import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-winnerdetails',
  templateUrl: './winnerdetails.component.html',
  styleUrls: ['./winnerdetails.component.css']
})
export class WinnerdetailsComponent implements OnInit {
  visible: boolean;
  fid: any;
  winAmount: any;
  winnerName: any;
  boatdriver: boolean;
  initialSubscriber: any;
  auctionDetailsSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });
    
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
    }

    this.visible = true;
    let id = this.fid;
    this.auctionDetailsSubscriber = this.http.get('http://localhost:8000/portal/auction_list/' + id + '/')
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
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    if(this.auctionDetailsSubscriber){
      this.auctionDetailsSubscriber.unsubscribe();
    }
  }
}
