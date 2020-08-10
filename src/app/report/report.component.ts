import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  // loadedtrips: any;
  // fetchTripSubscriber: any;
  loadedboats: any;
  fetchBoatSubscriber: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.fetchBoats();
    }

    onClick(){
        this.router.navigate(['/myboats']);
    }

    onAddMonthlyExpense(id: any){
      this.router.navigate(['/addmonthlyexpense', id])
    }

    onReport(id: any){
      this.router.navigate(['/monthlyreport', id]);
    }

    // private fetchTrips() {
    //   let id = localStorage.getItem('id')
    //   this.fetchTripSubscriber = this.http.get('http://localhost:8000/portal/tripBD_list/' + id + '/')
    //   .subscribe((responseData: any) => {
    //       console.log(responseData);
    //       this.loadedtrips = responseData;
    //   });
    // }
    private fetchBoats() {
      let id = localStorage.getItem('id');
      this.fetchBoatSubscriber = this.http.get('http://localhost:8000/portal/boatOwner_list/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedboats = responseData;
      });
    }

    ngOnDestroy() {
      if(this.fetchBoatSubscriber){
        this.fetchBoatSubscriber.unsubscribe();
      }
    }

  }