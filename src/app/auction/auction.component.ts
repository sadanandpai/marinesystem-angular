import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  @ViewChild('f') auctionForm: NgForm;
  @ViewChild('q') bidForm: NgForm;
 
  loadedfishes: Object;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.fetchFish();
  }

  Done(form: NgForm) {
    
  }

  Quote(form: NgForm) {
   
  }

  private fetchFish() {
    this.http.get('http://localhost:8000/fish/')
      .subscribe(responseData => {
        this.loadedfishes = responseData;
      })
  }
  
}
