import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  fetchAllBoatOwnerSubscriber: any;
  loadedowner: any;
  addtosubscribeSubscriber: any;

  constructor(private http: HttpClient,
              private router: Router,) { }

  ngOnInit(): void {
    this.fetchAllBoatOwner();
  }

  onClick(){
    this.router.navigate(['/auction']);
  }

  private  fetchAllBoatOwner() {
    this.fetchAllBoatOwnerSubscriber = this.http.get('http://localhost:8000/portal/boatowner/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.loadedowner = responseData;
      },
      (error) => {
        console.log(error);
      }
    );
  }


  onSubscribe(id: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    const data = {
      owner: id,
    }
    this.addtosubscribeSubscriber = this.http.post('http://localhost:8000/portal/subscribe/', data, { headers : headers })
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  ngOnDestroy(): void {
    if(this.fetchAllBoatOwnerSubscriber){
      this.fetchAllBoatOwnerSubscriber.unsubscribe();
    }
    if(this.addtosubscribeSubscriber){
      this.addtosubscribeSubscriber.unsubscribe();
    }

  }
}
