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

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.tripID = localStorage.getItem('tripID');
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  // ADD fish and auction
  fishDetails(form: NgForm) {
    const value = form.value;
    if (value.damaged != true){
      value.damaged = false;
    }
    const data = {
      fish_id: value.fishid,
      fish_size: value.size,
      fish_price: value.price,
      damaged: value.damaged,
      status: true,
    };
    this.damaged = value.damaged;
    console.log("Damaged :" + this.damaged);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.fishDetailsSubscriber = this.http
      .post('http://localhost:8000/portal/fish_list/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          localStorage.setItem('fishid', responseData.id);
          console.log(localStorage.getItem('fishid'));
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
      console.log(window.localStorage);
      const details = {
        fishid: localStorage.getItem('fishid'),
        trips: this.tripID,
        highestBid: null,
      }
      // wait 2sec to add fish details
      setTimeout(() => {
        // debugger
        var id = localStorage.getItem('fishid');
        console.log(id);
        this.auctionDetailsSubscriber = this.http.put('http://localhost:8000/portal/auction_list/' + id + '/', details, { headers: headers })
        .subscribe(
          (responseData) => {
            console.log(responseData);
            form.reset();
            this.success= true;
          },
          (error) => {
            console.log(error);
          }
        );
        // debugger
      }, 2000);
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
