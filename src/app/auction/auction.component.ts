import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;
  
  bid: number;
  loadedfishes: Fish[] = [];
  htmlToAdd: string;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.fetchFish();
  }

  Done() {
   

  }

  Quote(form: NgForm) {
   const value = form.value;
   const data = {
    bidAmount: value.bidAmount
  };
  
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
          let n = responseData.length - 1;
          this.loadedfishes[0] = responseData[n];
      })
  }
  
}
