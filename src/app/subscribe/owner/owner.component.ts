import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  loadedcustomer: any
  fetchAllRequestedCustomerSubscriber: any;
  acceptCustomerSubscriber: any;
  deleteCustomerSubscriber: any;
  subscribeServiceSubscriber: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.subscribeServiceSubscriber = interval(1000).subscribe(
      (val) => { 
        this.fetchAllRequestedCustomer();
      }
    );
  }

  private fetchAllRequestedCustomer() {
    // fetch All Requested Customer whose status false
    this.fetchAllRequestedCustomerSubscriber = this.http.get('http://localhost:8000/portal/subscribe_false/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.loadedcustomer = responseData;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick(){
    this.router.navigate(['/myboats']);
  }


  onAccept(id: any){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    const data = {
      accept: true
    }
     this.acceptCustomerSubscriber = this.http.put('http://localhost:8000/portal/subscribe/' + id + '/', data, )
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    );

  }
  onDelete(id: any){
     this.deleteCustomerSubscriber = this.http.delete('http://localhost:8000/portal/subscribe/' + id + '/')
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
    if(this.subscribeServiceSubscriber){
      this.subscribeServiceSubscriber.unsubscribe();
    }
    if(this.fetchAllRequestedCustomerSubscriber){
      this.fetchAllRequestedCustomerSubscriber.unsubscribe();
    }
    
  }
}

