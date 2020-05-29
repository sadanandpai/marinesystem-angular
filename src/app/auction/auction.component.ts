import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  boatdriver: boolean = false;
  loadedfishes: any;
  loadedauctions: Object;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
      this.fetchonlyBDFish();
    } else {
      this.fetchFish();
    }
    console.log(window.localStorage);
  }

  onStartBid(id: any){
    this.router.navigate(['/auction', id]);
  }

  onClick(){
    this.router.navigate(['/']);
  }

  onAddFish(){
    this.router.navigate(['/fish']);
  }

  onClickHistory(){
    this.router.navigate(['/history']);
  }

  private fetchFish() {
    this.http.get('http://localhost:8000/portal/fish_list/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedfishes = responseData;
    });

    // this.http.get('http://localhost:8000/portal/auction_list/')
    // .subscribe((responseData: any) => {
    //     console.log(responseData);
    //     this.loadedauctions = responseData;
    // });

  }
    
  private fetchonlyBDFish() {
    let id = localStorage.getItem('id')
    this.http.get<{ [id:string]: Fish }>('http://localhost:8000/portal/bdfish_list/' + id + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedfishes = responseData;
    });

    // this.http.get<{ [id:string]: Fish }>('http://localhost:8000/portal/bdfish_list/' + id + '/')
    // .pipe(map((responseData)=>{
    //   const fisharray: Fish[] = [];
    //   for(const key in responseData){
    //     if(responseData.hasOwnProperty(key)){
    //       fisharray.push({ ...responseData[key], id: key });
    //     }
    //   }
    //   return fisharray;
    // })).subscribe(responseData => {
    //     console.log(responseData);
    //     this.loadedfishes = responseData;
    // });

  }
  
}
