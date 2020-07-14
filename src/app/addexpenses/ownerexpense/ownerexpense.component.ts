import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ownerexpense',
  templateUrl: './ownerexpense.component.html',
  styleUrls: ['./ownerexpense.component.css']
})
export class OwnerexpenseComponent implements OnInit{
  @ViewChild('f') expenseForm: NgForm;
  msg: boolean;
  expensesSubscriber: any;
  success : any;

  public costs: any[] = [{
    id: 1,
    name: '',
    cost: '',
    qty: '',
    types: 'BoatOwner',
  }];
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
      types: 'BoatOwner',
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
    value.grandTotal = Number(value.diesel) + Number(value.ice) + Number(value.maintainance) + this.sum;
    const data = {
      diesel: value.diesel,
      ice: value.ice,
      dieselQty: value.dieselQty,
      iceQty: value.iceQty,
      maintainance: value.maintainance,
      totalOwner: value.grandTotal,
    };

    console.log("Form value");
    console.log(data);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });

    this.expensesSubscriber = this.http
      .patch('http://localhost:8000/portal/tripOwner_details/' + this.tripID + '/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);

        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
    // debugger
    // var length = Number(this.costs.length);
    // if(length > 1){
    //   debugger
      for(let i=0; i<this.costs.length; i++){    
        const extraData = {
          trip: this.tripID,
          name: this.costs[i].name,
          cost: this.costs[i].cost,
          qty: this.costs[i].qty,
          types: 'BoatOwner',
        };
        this.extraExpensesSubscriber = this.http
          .post('http://localhost:8000/portal/extraCost_list/', extraData, { headers: headers })
          .subscribe(
            (responseData: any) => {
              console.log(responseData);
              if(i==this.costs.length-1){
                // last loop
                this.success=true;
                form.reset();
              }
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
