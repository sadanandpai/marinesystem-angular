import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  boatOwner: boolean;
  
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // import fishname from JSON
    this.fishname = json;
    this.fishname = this.fishname.default;
    // group of user
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatdriver = true;
      this.fetchOnlyBDFish();           // fetch Only Boat Driver's Fish which are ready for auction (For BoatDriver)
    } else if(data == 'BoatOwner') {
      this.boatOwner = true;
      this.fetchFish();           // fetch all Fish which are ready for auction (For BoatOwner)
    }else {
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
    this.fetchFishSubscriber = this.http.get('http://localhost:8000/portal/fish_list_true/')
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
    this.fetchBDFishSubscriber = this.http.get('http://localhost:8000/portal/bdfish_list_true/' + id + '/')
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
