import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tripwise-calculation',
  templateUrl: './tripwise-calculation.component.html',
  styleUrls: ['./tripwise-calculation.component.css']
})
export class TripwiseCalculationComponent implements OnInit {

  loadedtrips: any;
  fetchTripSubscriber: any;
  initialSubscriber: any;
  boatID: number;
  // boatid: any;
  // fetchBoatNameSubscriber: any;
  // boat: any;
  // loadedboatdetails: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.initialSubscriber = this.route.params.subscribe(data=>{
        this.boatID = Number(data.id);
      });
      this.fetchTripsbyBoat();
    }

    onClick(){
        this.router.navigate(['/calculation']);
    }

    onViewCalculation(id: any){
      this.router.navigate(['/calculation', id]);
    }

    private fetchTripsbyBoat() {
      let id = this.boatID;
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/tripOwner_list/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedtrips = responseData;
      });
    }


    ngOnDestroy() {
      if(this.fetchTripSubscriber){
        this.fetchTripSubscriber.unsubscribe();
      }
    }

  }

