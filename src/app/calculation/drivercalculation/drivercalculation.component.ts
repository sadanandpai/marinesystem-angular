import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drivercalculation',
  templateUrl: './drivercalculation.component.html',
  styleUrls: ['./drivercalculation.component.css']
})
export class DrivercalculationComponent implements OnInit {

  loadedtrips: any;
  fetchTripSubscriber: any;
  // boatid: any;
  // fetchBoatNameSubscriber: any;
  // boat: any;
  // loadedboatdetails: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.fetchTrips();
    }

    onClick(){
        this.router.navigate(['/myboats']);
    }

    onViewCalculation(id: any){
      this.router.navigate(['/calculation', id]);
    }

    private fetchTrips() {
      let id = localStorage.getItem('id')
      this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/tripBD_list/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedtrips = responseData;
          // debugger
          // for(let i=0;i<this.loadedtrips.length;i++){
          //   this.boatid = responseData[i].boat;
          //   this.fetchBoatName()
          // }
      });
    }

    // private fetchBoatName() {
    //   debugger
    //   let id = this.boatid;
    //   this.fetchBoatNameSubscriber = this.http.get('http://localhost:8000/portal/boat_detail/' + id + '/')
    //   .subscribe((responseData: any) => {
    //       console.log(responseData);
    //       this.loadedboatdetails = responseData;
    //       this.boat = responseData.boatName;
    //   });
    // }

    ngOnDestroy() {
      if(this.fetchTripSubscriber){
        this.fetchTripSubscriber.unsubscribe();
      }
    }
  }

