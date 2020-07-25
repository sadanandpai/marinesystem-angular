import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addboat',
  templateUrl: './addboat.component.html',
  styleUrls: ['./addboat.component.css']
})
export class AddboatComponent implements OnInit {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  addBoatSubscriber: any;
  boatOwner: boolean;

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
    this.router.navigate(['/myboats']);
  }

  addBoat(form: NgForm) {
    const value = form.value;
    const data = {
      boatName: value.name,
      boatNumber: value.number,
      description: value.description,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addBoatSubscriber = this.http
      .post('http://localhost:8000/portal/boat_list/', data, { headers: headers })
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
    if(this.addBoatSubscriber){
      this.addBoatSubscriber.unsubscribe();
    }
  }

}
