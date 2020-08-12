import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monthlyboatexpense',
  templateUrl: './monthlyboatexpense.component.html',
  styleUrls: ['./monthlyboatexpense.component.css']
})
export class MonthlyboatexpenseComponent implements OnInit {

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