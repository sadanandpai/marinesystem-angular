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

  onStartBid(id: any){
    this.router.navigate(['/auction', id])
  }

  private fetchFish() {
    this.http.get<{ [id:string]: Fish }>('http://localhost:8000/portal/fish_list/')
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

      })
  }
  
}
