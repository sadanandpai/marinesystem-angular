import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ownercalculation-details',
  templateUrl: './ownercalculation-details.component.html',
  styleUrls: ['./ownercalculation-details.component.css']
})
export class OwnercalculationDetailsComponent implements OnInit {

  fetchTripSubscriber: any;
  tripID: number;
  initialSubscriber: any;

trip: any
boat: any
crewCount: any
driver: any
water: any
waterQty: any
LPG: any
LPGQty: any
ration: any
rationQty: any
totalBd: any
diesel: any
dieselQty: any
ice: any
iceQty: any
maintainance: any
totalOwner: any
auctionTotal: any
driverSalary: any
loadUnloadSalary: any
writerSalary: any
totalSalary: any
Profit: any
  loadedExtracostOwner: any;
  fetchExtraCostBDSubscriber: any;
  fetchExtraCostOwnerSubscriber: any;
  loadedExtracostBD: any;


  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.initialSubscriber = this.route.params.subscribe(data=>{
        this.tripID = Number(data.id);
      });
      this.fetchTrip();
      this.fetchExtraCostOwner();
      this.fetchExtraCostBD();
    }

    onClick(){
        this.router.navigate(['/trips', this.boat]);
    }

    private fetchTrip() {
      let id = this.tripID
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.trip = responseData.id;
          this.boat = responseData.boat;
          this.crewCount = responseData.crewCount;
          this.driver = responseData.driver;
          this.water = responseData.water;
          this.waterQty = responseData.waterQty;
          this.LPG = responseData.LPG;
          this.LPGQty = responseData.LPGQty;
          this.ration = responseData.ration;
          this.rationQty = responseData.rationQty;
          this.totalBd = responseData.totalBd;
          this.diesel = responseData.diesel;
          this.dieselQty = responseData.dieselQty;
          this.ice = responseData.ice;
          this.iceQty = responseData.iceQty;
          this.maintainance = responseData.maintainance;
          this.totalOwner = responseData.totalOwner;
          this.auctionTotal = responseData.auctionTotal;
          this.driverSalary = responseData.driverSalary;
          this.loadUnloadSalary = responseData.loadUnloadSalary;
          this.writerSalary = responseData.writerSalary;
          this.totalSalary = responseData.totalSalary;
          this.Profit = responseData.Profit;
          
      });
    }

    private fetchExtraCostOwner(){
      let id = this.tripID
      this.fetchExtraCostOwnerSubscriber = this.http.get('http://localhost:8000/portal/extraCostOwner_list/' + id + '/')
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedExtracostOwner=responseData;
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
      if(this.fetchExtraCostOwnerSubscriber){
        this.fetchExtraCostOwnerSubscriber.unsubscribe();
      }
      if(this.fetchExtraCostBDSubscriber){
        this.fetchExtraCostBDSubscriber.unsubscribe();
      }
    }

  }

