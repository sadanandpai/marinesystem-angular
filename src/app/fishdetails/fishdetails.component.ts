import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Fish } from './fish.model';


@Component({
  selector: 'app-fishdetails',
  templateUrl: './fishdetails.component.html',
  styleUrls: ['./fishdetails.component.css']
})
export class FishdetailsComponent implements OnInit {
  @ViewChild('f') fishForm: NgForm;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.fishForm.setValue({
    //   userid: '1',
    // })
  }

  fishDetails(form: NgForm){
    const value = form.value;
    const newFish = new Fish(1, value.fishid, value.size, value.minprice, 'Active');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
  });
    this.http.post('http://localhost:8000/portal/fish/', newFish, { headers: headers })
    .subscribe(responseData => {
        console.log(responseData);
    }, error => {
      console.log(error);
  });

  }

}
