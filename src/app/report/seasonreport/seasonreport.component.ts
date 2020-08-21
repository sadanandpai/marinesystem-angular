import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seasonreport',
  templateUrl: './seasonreport.component.html',
  styleUrls: ['./seasonreport.component.css']
})
export class SeasonreportComponent implements OnInit {

  boatowner: boolean;
  boatdriver: boolean;
  initialSubscriber: any;
  boatID: number;
  month: any;
  year: any;
  fetchTripSubscriber: any;
  loadedtrips: any;
  tripCount: any;
  expenditure: any;
  profit: any;
  fetchMonthlyExpenseSubscriber: any;
  loadedmonthlyexpense: any;
  onClickSearch: boolean;
  loadedSeason: any;
  fetchSeasonSubscriber: any;
  seasonID: any;
  seasonlyExpense: any;
  redColor: any;
  
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      // this.initialSubscriber = this.route.params.subscribe(data=>{
      //   this.boatID = Number(data.id);
      // });
  
      var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
        this.seasonList();
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }

    }
  
    onClick(){
        this.router.navigate(['/report']);
    }

    private seasonList() {
      let id = localStorage.getItem('id')
      this.fetchSeasonSubscriber = this.http.get('http://localhost:8000/portal/season_false/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedSeason = responseData;
          
      });
      
    }
  
    onSearch(form: NgForm) {
      const value = form.value;
      console.log(value.seasonid);
      this.onClickSearch = true;
      // let id = localStorage.getItem('id');
      this.expenditure = 0;
      this.profit = 0;
      this.seasonlyExpense = 0;
      if(value.season == undefined){
        this.seasonID = 0; 
        // this.msg= true; 
      }
        this.seasonID = value.seasonid;
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/seasontriplist/' +  this.seasonID + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedtrips = responseData;
          this.tripCount = responseData.length;
  
          for(let i=0; i<responseData.length; i++){
            this.expenditure += (responseData[i].totalOwner + responseData[i].totalSalary);
            this.profit += responseData[i].Profit;
          }
          if(this.profit < 0){
            console.log(this.redColor);
            this.redColor = true;
            console.log(this.redColor);
          } else {
            this.redColor = false;
          }
          
      });
      this.fetchMonthlyExpenseSubscriber = this.http.get('http://localhost:8000/portal/seasonmonthlyexpenselist/' + this.seasonID + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          for(let i=0; i<responseData.length; i++){
            this.seasonlyExpense += responseData[i].amount;
          }
          
      });
    }
  
    ngOnDestroy() {
      if(this.initialSubscriber){
        this.initialSubscriber.unsubscribe();
      }
      if(this.fetchSeasonSubscriber){
        this.fetchSeasonSubscriber.unsubscribe();
      }
      if(this.fetchTripSubscriber){
        this.fetchTripSubscriber.unsubscribe();
      }
    }
  
  }
  
  