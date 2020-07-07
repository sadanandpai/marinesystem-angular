import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addsalary',
  templateUrl: './addsalary.component.html',
  styleUrls: ['./addsalary.component.css']
})
export class AddsalaryComponent implements OnInit {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  addSalarySubscriber: any;
  boatOwner: boolean;
  tripId: string;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatOwner'){
      this.boatOwner = true;
    } else {
      this.boatOwner = false;
    }
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  addSalary(form: NgForm) {
    const value = form.value;
    const data = {
      driver: value.driver,
      writer: value.writer,  
      loadUnload: value.loadUnload,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    
    this.addSalarySubscriber = this.http
      .patch('http://localhost:8000/portal/trip_detail/' + this.tripId + '/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.success= true;
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
}

  ngOnDestroy() {
    if(this.addSalarySubscriber){
      this.addSalarySubscriber.unsubscribe();
    }
  }

}
