import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  loadedfishes: Fish[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchFish();
  }

  onStartBid(id: any, minprice: number, fish_id: number, fish_size: number){
    this.router.navigate(['/auction', id, {params: id, minprice, fish_id, fish_size}])
  }

  private fetchFish() {
    this.http.get<{ [id:string]: Fish }>('http://localhost:8000/fish/')
      .pipe(map((responseData)=>{
        const fisharray: Fish[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            fisharray.push({ ...responseData[key], id: key });
          }
        }
        return fisharray;
      })).subscribe(responseData => {
          console.log(responseData);
          this.loadedfishes = responseData;
          // this.bid = this.loadedfishes[0].fish_price;
          // for(const key in responseData){
          //   if(responseData.hasOwnProperty(key)){
          //     if(this.loadedfishes[key].status==true){
          //       this.bid = this.loadedfishes[key].fish_price;
          //       this.fishid = this.loadedfishes[key].fish_id;
          //       this.size = this.loadedfishes[key].fish_size;    
          //      }
          //    }
          //  }
      })
  }
  
}
