import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bonus-history',
  templateUrl: './bonus-history.component.html',
  styleUrls: ['./bonus-history.component.css']
})
export class BonusHistoryComponent implements OnInit {
  loadedbonus: any;
  boatowner: boolean;
  boatdriver: boolean;
  fetchAdvaceSubscriber: any;
  // boatID: any;
  ownerID: any;

  boatID: any;
  season: any;
  bonus: any;
  advance: any;
  total: any;
  initialSubscriber: any;
  fetchSeasonIDSubscriber: any;
  seasonID: any;
  fetchBonusSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.initialSubscriber = this.route.params.subscribe(data=>{
        this.boatID = Number(data.id);
      });
      
      var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }
      // fetch seasonID using boatID 
      this.fetchSeasonID();
      // fetch all bonuses of this seasonID
      // this.fetchBonus();
      // fetch all advances of this seasonID
      // this.fetchAdvance();
    }

    onClick(){
      this.router.navigate(['/calculation']);
    }

    onBonusHistory(){
      let id = this.boatID;
      this.router.navigate(['/bonushistory', id]);
    }

    onAddAdvance(){
      let id = this.boatID;
      this.router.navigate(['/advance', id]);
    }
  
    private fetchSeasonID() {
      // fetch Season
      this.fetchSeasonIDSubscriber = this.http.get('http://localhost:8000/portal/boat_season_true/' + this.boatID + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.seasonID = responseData[0].id;
          
          this.fetchBonus();
          this.fetchAdvance();

      });
    }
    private fetchBonus() {
      //  fetch Bonus of this season we got seasonID from fetchSeasonID() this method and we have boatID
      this.fetchBonusSubscriber = this.http.get('http://localhost:8000/portal/trip_list/' + this.seasonID + '-' + this.boatID + '/')
      .subscribe((responseData: any) => {
        this.bonus = 0;
        console.log(responseData);
        for(let i=0;i<responseData.length;i++){
          this.bonus += responseData[i].bonus;
        }
        console.log(this.bonus);
        // total calculation
        this.total = this.bonus - this.advance;
        console.log(this.total);
      });
    }
   
    private fetchAdvance() {
       //  fetch Bonus of this season we got seasonID from fetchSeasonID() this method and we have boatID
       this.fetchAdvaceSubscriber = this.http.get('http://localhost:8000/portal/advance_list/' + this.seasonID + '-' + this.boatID + '/')
       .subscribe((responseData: any) => {
         this.advance = 0;
         console.log(responseData);
          for(let i=0;i<responseData.length;i++){
            this.advance += responseData[i].advance;
          }
          console.log(this.advance);
          // total calculation
          this.total = this.bonus - this.advance;
          console.log(this.total);

       });
    }

    ngOnDestroy() {
      if(this.initialSubscriber){
        this.initialSubscriber.unsubscribe();
      }
      if(this.fetchAdvaceSubscriber){
        this.fetchAdvaceSubscriber.unsubscribe();
      }
      if(this.fetchSeasonIDSubscriber){
        this.fetchSeasonIDSubscriber.unsubscribe();
      }
      if(this.fetchBonusSubscriber){
        this.fetchBonusSubscriber.unsubscribe();
      }
    }

  }

