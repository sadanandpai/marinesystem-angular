import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fishdetails',
  templateUrl: './fishdetails.component.html',
  styleUrls: ['./fishdetails.component.css'],
})
export class FishdetailsComponent implements OnInit, OnDestroy {
  @ViewChild('f') fishForm: NgForm;
  msg: boolean;
  minprice: any;
  fid: any;
  fishDetailsSubscriber: any;
  auctionDetailsSubscriber: any;
  damaged: boolean;
  success: boolean;
  tripID: any;
  warning: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.tripID = localStorage.getItem('tripID');
    if(this.tripID == null || this.tripID == undefined){
      this.warning = true;
    }
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  onClickhere(){
    this.router.navigate(['/myboats']);
  }
  // ADD fish and auction
  fishDetails(form: NgForm) {
    const value = form.value;
    if (value.damaged != true){
      value.damaged = false;
    }
    const detailData = {
      fish_id: value.fishid,
      fish_size: value.size,
      fish_price: value.price,
      damaged: value.damaged,
      status: true,
      // auction table data
      trips: this.tripID,
      highestBid: null,
    };
    this.damaged = value.damaged;
    console.log("Damaged :" + this.damaged);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });

    // Send data as JSON
    var data = {"data": detailData};

    this.fishDetailsSubscriber = this.http
      .post('http://localhost:8000/portal/fish_auction_list/', JSON.stringify(data), { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          this.success = true;
          this.msg = false;
          form.reset();
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
      console.log(window.localStorage);
  }
  
  ngOnDestroy() {
    if(this.fishDetailsSubscriber){
      this.fishDetailsSubscriber.unsubscribe();
    }
    if(this.auctionDetailsSubscriber){
      this.auctionDetailsSubscriber.unsubscribe();
    }
  }
}
