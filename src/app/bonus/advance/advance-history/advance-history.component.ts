import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advance-history',
  templateUrl: './advance-history.component.html',
  styleUrls: ['./advance-history.component.css']
})
export class AdvanceHistoryComponent implements OnInit, OnDestroy {
  loadedadvance: any;
  fetchFishSubscriber: any;
  fishname: any;
  boatowner: boolean;
  boatdriver: boolean;
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
        this.router.navigate(['/advance']);
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

