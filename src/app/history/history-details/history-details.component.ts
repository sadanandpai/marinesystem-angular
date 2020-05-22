import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.css']
})
export class HistoryDetailsComponent implements OnInit {
  fid: number;
  fishid: any;
  minprice: any;
  size: any;
  winAmount: any;
  winnerName: any;
  owner: any;
  date: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data=>{
      this.fid = Number(data.id);
    });
    this.fetchfish();
    this.fetchWinner();
  }

  onclick(){
    this.router.navigate(['/history']);
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
            this.owner = loadedfishes.owner;
        });
  }

  private fetchWinner(){
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
  }
}