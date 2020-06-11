import { Component, OnInit, ViewChild, Input, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';
import { User } from '../shared/user.model';
import * as json from '../../assets/i18n/fishname.json';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  boatdriver: boolean = false;
  loadedfishes: any;
  loadedauctions: Object;
  fetchFishSubscriber: any;
  fetchBDFishSubscriber: any;
  fishname: any;
  
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.fishname = json;
    this.fishname = this.fishname.default;
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
      this.fetchOnlyBDFish();
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
    this.fetchFishSubscriber = this.http.get('http://localhost:8000/portal/fish_list/')
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
    
  private fetchOnlyBDFish() {
    let id = localStorage.getItem('id')
    this.fetchBDFishSubscriber = this.http.get<{ [id:string]: Fish }>('http://localhost:8000/portal/bdfish_list/' + id + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedfishes = responseData;
    });

  }
  
  ngOnDestroy() {
    if(this.fetchFishSubscriber){
      this.fetchFishSubscriber.unsubscribe();
    }
    if(this.fetchBDFishSubscriber){
      this.fetchBDFishSubscriber.unsubscribe();
    }
  }
}
