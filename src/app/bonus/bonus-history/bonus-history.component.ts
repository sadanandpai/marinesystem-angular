import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bonus-history',
  templateUrl: './bonus-history.component.html',
  styleUrls: ['./bonus-history.component.css']
})
export class BonusHistoryComponent implements OnInit {
  loadedadvance: any;
  loadedbonus: any;
  boatowner: boolean;
  boatdriver: boolean;
  total: any;
  fetchAdvaceSubscriber: any;
  initialSubscriber: any;
  boatID: number;

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

      this.fetchAdvance();
    }

    onClick(){
      let id = this.boatID;
      this.router.navigate(['/bonus', id]);
    }

    onViewMore(id: any){
      // this.router.navigate(['/history', id]);
    }
  
    private fetchAdvance() {
      this.fetchAdvaceSubscriber = this.http.get('http://localhost:8000/portal//')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedadvance = responseData;
      });
    }

    ngOnDestroy() {
      if(this.fetchAdvaceSubscriber){
        this.fetchAdvaceSubscriber.unsubscribe();
      }
    }

  }

