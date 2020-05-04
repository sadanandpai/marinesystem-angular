import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-fishdetails',
  templateUrl: './fishdetails.component.html',
  styleUrls: ['./fishdetails.component.css'],
})
export class FishdetailsComponent implements OnInit {
  @ViewChild('f') fishForm: NgForm;
  msg: Boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.fishForm.setValue({
    //   userid: '1',
    // })
  }

  fishDetails(form: NgForm) {
    const value = form.value;

    const data = {
      fish_id: value.fishid,
      fish_size: value.size,
      fish_price: value.price,
      status: true,
    };
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.http
      .post('http://localhost:8000/portal/fish_list/', data, {
        headers: headers,
      })
      .subscribe(
        (responseData) => {
          console.log(responseData);
          
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
  }
}
