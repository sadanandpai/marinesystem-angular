import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ownerexpense',
  templateUrl: './ownerexpense.component.html',
  styleUrls: ['./ownerexpense.component.css']
})
export class OwnerexpenseComponent implements OnInit {
  @ViewChild('f') expenseForm: NgForm;
  msg: boolean;
  expensesSubscriber: any;
  success : any;

  public costs: any[] = [{
    id: 1,
    name: '',
    cost: '',
    type: 'BoatOwner',
  }];
  sum: any;
  extraExpensesSubscriber: any;
  tripId: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
  }

  addCost() {
    this.costs.push({
      id: this.costs.length + 1,
      name: '',
      cost: '',
      type: 'BoatOwner',
    });
  }

  removeCost(i: number) {
    this.costs.splice(i, 1);
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  expenses(form: NgForm) {
    console.log(this.costs);
    this.sum = 0;
    for(let i=0; i<this.costs.length; i++){
      console.log(this.costs[i].cost);
      var num = Number(this.costs[i].cost);
      // console.log(num);
      this.sum += num;
    }
    console.log(this.sum);

    const value = form.value;
    value.grandTotal = Number(value.diesel) + Number(value.ice) + Number(value.maintainance) + this.sum;
    const data = {
      diesel: value.diesel,
      ice: value.ice,
      maintainance: value.maintainance,
      grandTotal: value.grandTotal,
    };

    console.log("Form value");
    console.log(data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    // this.tripId = value.tripId

    this.expensesSubscriber = this.http
      .patch('http://localhost:8000/portal/trip_detail/' + this.tripId + '/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );

    for(let i=0; i<this.costs.length; i++){    
      const extraData = {
        name: this.costs[i].name,
        cost: this.costs[i].cost,
        type: 'BoatOwner',
      };
      this.extraExpensesSubscriber = this.http
        .post('http://localhost:8000/portal/extraCost_list/', extraData, { headers: headers })
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
          },
          (error) => {
            console.log(error);
            this.msg = true;
          }
      );
    }
  }


  ngOnDestroy() {
    if(this.expensesSubscriber){
      this.expensesSubscriber.unsubscribe();
    }
    if(this.extraExpensesSubscriber){
      this.extraExpensesSubscriber.unsubscribe();
    }
  }


}
