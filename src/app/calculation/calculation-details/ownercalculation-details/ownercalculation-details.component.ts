import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ownercalculation-details',
  templateUrl: './ownercalculation-details.component.html',
  styleUrls: ['./ownercalculation-details.component.css']
})
export class OwnercalculationDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('f') boatForm: NgForm;
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
totalSalary: any
  loadedExtracostOwner: any;
  fetchExtraCostBDSubscriber: any;
  fetchExtraCostOwnerSubscriber: any;
  loadedExtracostBD: any;
  sumOfExpenditure: number;
  profit: any;
  addProfitSubscriber: any;
  deskUnloadCrewSalary: any;
  dockUnloadCrewSalary: any;
  bonus: any;
  addSalarySubscriber: any;
  updateBonusSubscriber: any;
  errmsg: boolean;
  seasonID: any;
  status: any;
  driverSalaryPercent: any;
  UnloadCrewSalaryPercent: any;
  isUnloadCrewPercent: boolean;


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

    calculateProfit(){
      this.sumOfExpenditure = Number(this.totalSalary) + Number(this.totalOwner) + Number(this.bonus);
      this.profit = Number(this.auctionTotal) - Number(this.sumOfExpenditure);

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      });
      const data = {
        Profit: Math.round(this.profit), 
      };
      this.addProfitSubscriber = this.http.patch('http://localhost:8000/portal/trip_detail/' + this.tripID + '/', data, { headers : headers })
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.profit = responseData.Profit;
      });
    }

    private fetchTrip() {
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/trip_detail/' + this.tripID + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.trip = responseData.id;
          this.seasonID = responseData.seasonId;
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
          this.driverSalaryPercent = responseData.driverSalaryPercent;
          this.UnloadCrewSalaryPercent = responseData.UnloadCrewSalaryPercent;
          this.driverSalary = responseData.driverSalary;
          this.deskUnloadCrewSalary = responseData.deskUnloadCrewSalary;
          this.dockUnloadCrewSalary = responseData.dockUnloadCrewSalary;
          this.bonus = responseData.bonus;
          this.totalSalary = responseData.totalSalary;
          this.profit = responseData.Profit;
          this.status = responseData.Status;
          if(responseData.UnloadCrewSalaryPercent == null || responseData.UnloadCrewSalaryPercent == 0){
            this.isUnloadCrewPercent=false;
          } else {
            this.isUnloadCrewPercent=true;
          }
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

    salary(form: NgForm){
      const value = form.value;
      if(value.driverSalary > 100){
        this.errmsg = true;
      } else {
        this.errmsg = false;
        this.driverSalaryPercent = value.driverSalary;
        this.driverSalary = Number((this.auctionTotal * value.driverSalary)/100);
      }
      if(value.optradio == 'percent') {
        if(value.unloadCrewSalary > 100){
          this.UnloadCrewSalaryPercent = 0;
          this.errmsg = true
        } else {
          this.errmsg = false;
          this.UnloadCrewSalaryPercent = Number(value.unloadCrewSalary);
          this.deskUnloadCrewSalary = Number((this.auctionTotal * value.unloadCrewSalary)/100);
          this.dockUnloadCrewSalary = Number((this.auctionTotal * value.unloadCrewSalary)/100);
        }
      } else if(value.optradio == 'lumpsum') {
        this.deskUnloadCrewSalary = Number(value.unloadCrewSalary);
        this.dockUnloadCrewSalary = Number(value.unloadCrewSalary);
      } else {
        this.deskUnloadCrewSalary = Number(value.unloadCrewSalary);
        this.dockUnloadCrewSalary = Number(value.unloadCrewSalary);
      }
      this.totalSalary = Number(this.driverSalary) + Number(this.deskUnloadCrewSalary * 2);
      this.bonus = Number(this.driverSalary/this.crewCount);

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      });
      const data = {
        UnloadCrewSalaryPercent: this.UnloadCrewSalaryPercent,
        driverSalaryPercent: this.driverSalaryPercent,
        driverSalary: Math.round(this.driverSalary), 
        deskUnloadCrewSalary: Math.round(this.deskUnloadCrewSalary), 
        dockUnloadCrewSalary: Math.round(this.dockUnloadCrewSalary), 
        totalSalary: Math.round(this.totalSalary), 
        bonus: Math.round(this.bonus), 
      };
      this.addSalarySubscriber = this.http.patch('http://localhost:8000/portal/trip_detail/' + this.tripID + '/', data, { headers : headers })
      .subscribe((responseData: any) => {
          console.log(responseData);
        this.driverSalary = responseData.driverSalary;
        this.deskUnloadCrewSalary = responseData.deskUnloadCrewSalary;
        this.dockUnloadCrewSalary = responseData.dockUnloadCrewSalary;
        this.totalSalary = responseData.totalSalary;
        this.bonus = responseData.bonus;
      });
    }

    calculateBonus(){
      this.bonus = Number(this.driverSalary/this.crewCount);
      this.sumOfExpenditure = Number(this.totalSalary) + Number(this.totalOwner) + Number(this.bonus);
      this.profit = Number(this.auctionTotal) - Number(this.sumOfExpenditure);

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      });
      const data = {
        bonus: Math.round(this.bonus), 
        profit: Math.round(this.profit), 
      };
      this.updateBonusSubscriber = this.http.patch('http://localhost:8000/portal/trip_detail/' + this.tripID + '/', data, { headers : headers })
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.bonus = responseData.bonus;
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
      if(this.addProfitSubscriber){
        this.addProfitSubscriber.unsubscribe();
      }
      if(this.addSalarySubscriber){
        this.addSalarySubscriber.unsubscribe();
      }
      if(this.updateBonusSubscriber){
        this.updateBonusSubscriber.unsubscribe();
      }

    }

  }

