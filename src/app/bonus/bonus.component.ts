import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
  boatowner: boolean;
  boatdriver: boolean;
  fetchAdvaceSubscriber: any;
  // boatID: any;
  ownerID: any;

  boat: any;
  season: any;
  bonus: any;
  advance: any;
  total: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }
      this.fetchAdvance();
    }

    onClick(){
      this.router.navigate(['/calculation']);
    }

    onBonusHistory(){
      this.router.navigate(['/bonushistory']);
    }

    onAddAdvance(){
      this.router.navigate(['/advance']);
    }
  
    private fetchAdvance() {
      this.fetchAdvaceSubscriber = this.http.get('http://localhost:8000/portal//')
      .subscribe((responseData: any) => {
          console.log(responseData);
      });
    }

    ngOnDestroy() {
      if(this.fetchAdvaceSubscriber){
        this.fetchAdvaceSubscriber.unsubscribe();
      }
    }

  }

