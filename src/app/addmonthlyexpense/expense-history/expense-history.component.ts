import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.css']
})
export class ExpenseHistoryComponent implements OnInit {
  loadedmonthlyexpense: any;
  boatowner: boolean;
  boatdriver: boolean;
  initialSubscriber: any;
  boatID: number;
  fetchMonthlyExpenseSubscriber: any;

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

      this.fetchMonthlyExpense();
    }



    onClick(){
      let id = this.boatID;
        this.router.navigate(['/addmonthlyexpense', id]);
    }
  
    private fetchMonthlyExpense() {
      let id = localStorage.getItem('id');
      this.fetchMonthlyExpenseSubscriber = this.http.get('http://localhost:8000/portal/boatmonthly_expense/' + this.boatID + '-' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedmonthlyexpense = responseData;
      });
    }

    ngOnDestroy() {
      if(this.initialSubscriber){
        this.initialSubscriber.unsubscribe();
      }
      if(this.fetchMonthlyExpenseSubscriber){
        this.fetchMonthlyExpenseSubscriber.unsubscribe();
      }
    }

  }

