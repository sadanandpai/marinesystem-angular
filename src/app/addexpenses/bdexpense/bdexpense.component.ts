import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bdexpense',
  templateUrl: './bdexpense.component.html',
  styleUrls: ['./bdexpense.component.css']
})
export class BdexpenseComponent implements OnInit {
  @ViewChild('f') expenseForm: NgForm;
  msg: boolean;
  expensesSubscriber: any;
  success : any;

  public costs: any[] = [];

  sum: any;
  extraExpensesSubscriber: any;
  tripID: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.tripID = localStorage.getItem('tripID');
  }

  addCost() {
    this.costs.push({
      id: this.costs.length + 1,
      name: '',
      cost: '',
      qty: '',
      types: 'BoatDriver',
    });
  }

  removeCost(i: number) {
    this.costs.splice(i, 1);
  }

  onClick(){
    this.router.navigate(['/myboats']);
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
    value.grandTotal = Number(value.water) + Number(value.lpg) + Number(value.ration) + this.sum;
    const data = {
      water: value.water,
      LPG: value.lpg,
      ration: value.ration,
      waterQty: value.waterQty,
      LPGQty: value.lpgQty,
      rationQty: value.rationQty,
      totalBd: value.grandTotal,
    };

    console.log("Form value");
    console.log(data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    let id=this.tripID;
    this.expensesSubscriber = this.http
      .patch('http://localhost:8000/portal/trip_detail/' + id + '/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          form.reset();
          this.success = true;
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );

    if(this.costs.length > 0){
      for(let i=0; i<this.costs.length; i++){    
        const extraData = {
          trip: this.tripID,
          name: this.costs[i].name,
          cost: this.costs[i].cost,
          qty: this.costs[i].qty,
          types: 'BoatDriver',
        };
        this.extraExpensesSubscriber = this.http
          .post('http://localhost:8000/portal/extraCost_list/', extraData, { headers: headers })
          .subscribe(
            (responseData: any) => {
              console.log(responseData);
              form.reset();
              this.success = true;
            },
            (error) => {
              console.log(error);
              this.msg = true;
            }
        );
      }
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
