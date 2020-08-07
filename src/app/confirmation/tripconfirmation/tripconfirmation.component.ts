import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tripconfirmation',
  templateUrl: './tripconfirmation.component.html',
  styleUrls: ['./tripconfirmation.component.css']
})
export class TripconfirmationComponent implements OnInit {
  initialSubscriber: any;
  tripID: number;
  endSeasonUpdateSubscriber: any;
  tripActive: boolean;
  boatowner: boolean;
  boatdriver: boolean;
  TripStatusSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.tripID = Number(data.id);
    });

    var data = localStorage.getItem('group');
      if(data == 'BoatOwner'){
        this.boatowner = true;
      } else if(data == 'BoatDriver'){
        this.boatdriver = true;
      }
  }
  
  endTrip(){
    if(this.boatowner == true){
      const data = {
        Status: false,
      }
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      });
      let id = this.tripID;
      this.TripStatusSubscriber = this.http
        .patch('http://localhost:8000/portal/trip_list_false/' + id + '/', data, { headers: headers })
        .subscribe(
          (responseData: any) => {
            console.log(responseData);
            // this.TripListTrue();
            localStorage.removeItem('tripID');
            this.onClick();
          },
          (error) => {
            console.log(error);
          }
        );
    } else if(this.boatdriver == true){
      localStorage.removeItem('tripID');
      this.tripActive = false;
      this.onClick();
    }
    
  }

  onCancel(){
    this.router.navigate(['/myboats']);
  }

  onClick(){
    this.router.navigate(['/myboats']);
  }

  ngOnDestroy() {
    if(this.initialSubscriber) {
      this.initialSubscriber.unsubscribe();
    }
    if(this.endSeasonUpdateSubscriber) {
      this.endSeasonUpdateSubscriber.unsubscribe();
    }
  }
}