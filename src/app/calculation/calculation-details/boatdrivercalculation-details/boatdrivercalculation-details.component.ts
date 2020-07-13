import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boatdrivercalculation-details',
  templateUrl: './boatdrivercalculation-details.component.html',
  styleUrls: ['./boatdrivercalculation-details.component.css']
})
export class BoatdrivercalculationDetailsComponent implements OnInit {

  fetchTripSubscriber: any;
  tripID: number;
  initialSubscriber: any;
  id: any;
  boat: any;
  driver: any;
  waterQty: any;
  water: any;
  LPGQty: any;
  LPG: any;
  rationQty: any;
  ration: any;
  totalBd: any;
  crewCount: any;
  fetchExtraCostBDSubscriber: any;
  loadedExtracostBD: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.initialSubscriber = this.route.params.subscribe(data=>{
        this.tripID = Number(data.id);
      });
      this.fetchTrip();
      this.fetchExtraCostBD();
      console.log(window.localStorage);
    }

    onClick(){
        this.router.navigate(['/calculation']);
    }

    onMyCrew(){
      // boat driver's ID
      var id = localStorage.getItem('id');
      this.router.navigate(['/mycrew', id]);
    }

    private fetchTrip() {
      let id = this.tripID
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.id = responseData.id;
          this.boat = responseData.boat;
          this.driver = responseData.driver;
          this.waterQty = responseData.waterQty;
          this.water = responseData.water;
          this.LPGQty = responseData.LPGQty;
          this.LPG = responseData.LPG;
          this.rationQty = responseData.rationQty;
          this.ration = responseData.ration;
          this.totalBd = responseData.totalBd;
          this.crewCount = responseData.crewCount;
          
      });
    }
    private fetchExtraCostBD(){
      let id = this.tripID
      this.fetchExtraCostBDSubscriber = this.http.get('http://localhost:8000/portal/extraCostBD_list/' + id + '/')
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedExtracostBD=responseData;
      });
    }

    ngOnDestroy() {
      if(this.fetchTripSubscriber){
        this.fetchTripSubscriber.unsubscribe();
      }
      if(this.initialSubscriber){
        this.initialSubscriber.unsubscribe();
      }
      if(this.fetchExtraCostBDSubscriber){
        this.fetchExtraCostBDSubscriber.unsubscribe();
      }
    }

  }

