import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {
  @ViewChild('f') memberForm: NgForm;
  msg: boolean;
  success : any;
  addMemberSubscriber: any;
  boatDriver: boolean;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
      this.boatDriver = true;
    } else {
      this.boatDriver = false;
    }
  }

  onClick(){
    this.router.navigate(['/myboats']);
  }

  addCrew(form: NgForm) {
    const value = form.value;
    const data = {
      name: value.name,
      number: value.number,
      age: value.age,
      salary: value.salary,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addMemberSubscriber = this.http
      .post('http://localhost:8000/portal/crew_list/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.success= true;
          form.reset();
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
  }

  ngOnDestroy() {
    if(this.addMemberSubscriber){
      this.addMemberSubscriber.unsubscribe();
    }
  }


}
