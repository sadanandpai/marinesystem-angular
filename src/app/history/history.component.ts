import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';
import { map } from 'rxjs/internal/operators/map';
import * as json from '../../assets/i18n/fishname.json';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
  loadedfishes: any;
  fetchFishSubscriber: any;
  fishname: any;
  boatowner: boolean;
  boatdriver: boolean;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.fishname = json;
      this.fishname = this.fishname.default;
      var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }

      this.fetchFish();
    }

    onClick(){
        this.router.navigate(['/auction']);
    }

    onViewMore(id: any){
      this.router.navigate(['/history', id])
    }
  
    private fetchFish() {
      this.fetchFishSubscriber = this.http.get('http://localhost:8000/portal/ownerfish_list_false/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedfishes = responseData;
      });
    }

    ngOnDestroy() {
      if(this.fetchFishSubscriber){
        this.fetchFishSubscriber.unsubscribe();
      }
    }

  }

