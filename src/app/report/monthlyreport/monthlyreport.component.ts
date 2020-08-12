import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.component.html',
  styleUrls: ['./monthlyreport.component.css']
})
export class MonthlyreportComponent implements OnInit {

seasonID: any;
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
monthlyExpense: number;
  fetchMonthlyExpenseSubscriber: any;
  loadedmonthlyexpense: any;
  onClickSearch: boolean;
  monthlyExpenseCount: any;

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
  }

  onClick(){
    this.router.navigate(['/report']);
  }

  onSearch(form: NgForm) {
    const value = form.value;
    this.onClickSearch = true;
    // let id = localStorage.getItem('id');
    this.expenditure = 0;
    this.profit = 0;
    this.monthlyExpense = 0;
    if(value.month == undefined || value.year == undefined){
      this.month = 0;
      this.year = 0; 
      // this.msg= true; 
    }

    this.month = value.month;
    this.year = value.year;
    this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/monthlytriplist/' + this.boatID + '/' + this.month + '-' + this.year + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedtrips = responseData;
        this.tripCount = responseData.length;

        for(let i=0; i<responseData.length; i++){
          this.expenditure += (responseData[i].totalOwner + responseData[i].totalSalary);
          this.profit += responseData[i].Profit;
        }
        
    });
    this.fetchMonthlyExpenseSubscriber = this.http.get('http://localhost:8000/portal/monthlyexpenselist/' + this.boatID + '/' + this.month + '-' + this.year + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.loadedmonthlyexpense = responseData;
        this.monthlyExpenseCount = responseData.length;
        for(let i=0; i<responseData.length; i++){
          this.monthlyExpense += responseData[i].amount;
        }
        
    });
  }

  onmonthlyexpense(){
    let id = this.boatID;
    this.router.navigate(['/monthlyexpensehistory', id]);
  }

  ngOnDestroy() {
    if(this.initialSubscriber){
      this.initialSubscriber.unsubscribe();
    }
    if(this.fetchTripSubscriber){
      this.fetchTripSubscriber.unsubscribe();
    }
  }

}

