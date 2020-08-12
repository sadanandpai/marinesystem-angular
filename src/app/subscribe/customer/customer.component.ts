import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs/internal/observable/interval';

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
  fetchAllRequestedOwnerSubscriber: any;
  loadedrequest: any;
  checkAcceptedOrPendingRequestServiceSubscriber: any;
  
  // public status: any[] = [];
  // public pending: any[] = [];
  // public accepted: any[] = [];
  // pending: any;
  // accepted: any;
  owner: string;
  acceptence: any[] = [];


  constructor(private http: HttpClient,
              private router: Router,) { }

  ngOnInit(): void {
    
    this.fetchAllBoatOwner();
    // this.checkAcceptedOrPendingRequestServiceSubscriber = interval(1000).subscribe(
    //   (val) => { 
    //     this.fetchAllBoatOwner();
    //   }
    // );
    
  }

  onClick(){
    this.router.navigate(['/']);
  }

  private fetchAllBoatOwner() {
  // fetch all Boat Owners
    this.fetchAllBoatOwnerSubscriber = this.http.get('http://localhost:8000/portal/boatowner/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.loadedowner = responseData;
        this.requestedOwnerList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  requestedOwnerList() {
    // fetch All Requested owners by this customer
    let id = localStorage.getItem('id');
    const data={
      customer: id,
    }
    this.fetchAllRequestedOwnerSubscriber = this.http.get('http://localhost:8000/portal/subscribe_customerwise_filter/'+ id + '/')
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.loadedrequest = responseData;
        this.checkAcceptedOrPending();
      },
      (error) => {
        console.log(error);
      }
    );
 }

 private checkAcceptedOrPending() {
   this.acceptence = [];
   var j=0;
  for(let i=0; i<this.loadedowner.length; i++){
    let owner = this.loadedowner[i].username;
    let customerRequestedOwner = this.loadedrequest[j]?.owner;
    if(owner == customerRequestedOwner){
      this.acceptence.push(this.loadedrequest[j++].accept ? 'accepted' : 'pending' );
    } else {
      this.acceptence.push('subscribe');
    }
  }
}

/*   private checkAcceptedOrPendingOld(){
    // if(this.loadedowner.length == undefined){
    //   this.loadedowner.length = 0;
    // } else if(this.loadedrequest.length == undefined){
    //   this.loadedrequest.length = 0;
    // }
    debugger
      for(let i=0; i<this.loadedowner.length; i++){
        for(let j=0; j<this.loadedrequest.length; j++){
          if(this.loadedowner[i].username == this.loadedrequest[j].owner && this.loadedrequest[j].accept == false){
            this.status.push({
              id: this.status.length + 1,
              owner: this.loadedrequest[i].owner,
              status: 'pending',
            });
            console.log(this.status[i]);
            // this.pending = true;
            // console.log('this.pending: ' + this.pending);
          } else if(this.loadedowner[i].username == this.loadedrequest[j].owner && this.loadedrequest[j].accept == true){
            this.status.push({
              id: this.status.length + 1,
              owner: this.loadedrequest[i].owner,
              status: 'accepted',
            });
            console.log(this.status[i]);
            // this.accepted = true;
            // console.log('this.accepted: ' + this.accepted);
          }
        }
      }
    console.log(this.status);
  } */

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
        this.fetchAllBoatOwner();
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
    if(this.checkAcceptedOrPendingRequestServiceSubscriber){
      this.checkAcceptedOrPendingRequestServiceSubscriber.unsubscribe();
    }

  }
}
