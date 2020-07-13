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
  tripID: any;

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
    this.tripID = localStorage.getItem('tripID');
  }

  onClick(){
    this.router.navigate(['/myboats']);
  }

  addSalary(form: NgForm) {
    const value = form.value;
    const data = {
      driverSalary: value.driver,
      writerSalary: value.writer,  
      loadUnloadSalary: value.loadUnload,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    
    this.addSalarySubscriber = this.http
      .patch('http://localhost:8000/portal/tripOwner_details/' + this.tripID + '/', data, { headers: headers })
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
