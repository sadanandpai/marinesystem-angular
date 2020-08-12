import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addmonthlyexpense',
  templateUrl: './addmonthlyexpense.component.html',
  styleUrls: ['./addmonthlyexpense.component.css']
})
export class AddmonthlyexpenseComponent implements OnInit, OnDestroy {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  boatOwner: boolean;
  initialSubscriber: any;
  boatID: number;
  seasonID: any;
  fetchSeasonIDSubscriber: any;
  addAdvanceSubscriber: any;
  addMonthlyExpenseSubscriber: any;
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.boatID = Number(data.id);
    });
    
    var data = localStorage.getItem('group');
    if (data=='BoatOwner'){
      this.boatOwner=true;
    } 
    this.fetchSeasonID();
  }

  onClick(){
    this.router.navigate(['/monthlyboatexpense']);
  }

  onHistory(){
    let id = this.boatID;
    this.router.navigate(['/monthlyexpensehistory', id]);
  }

  private fetchSeasonID() {
    this.fetchSeasonIDSubscriber = this.http.get('http://localhost:8000/portal/boat_season_true/' + this.boatID + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        // current active SeasonID
        this.seasonID = responseData[0].id;
    });
  }

  addMonthlyExpense(form: NgForm){
    const value = form.value;
    const data = {
      boat: this.boatID,
      season: this.seasonID,
      amount: value.expense,
      description: value.desc,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addMonthlyExpenseSubscriber = this.http
      .post('http://localhost:8000/portal/monthly_expense/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.success= true;
          this.msg = false;
          form.reset();
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
          this.success= false;
        }
      );
  }

 ngOnDestroy() {
   if(this.addAdvanceSubscriber){
     this.addAdvanceSubscriber.unsubscribe();
   }
   if(this.addMonthlyExpenseSubscriber){
     this.addMonthlyExpenseSubscriber.unsubscribe();
   }

  }
}
