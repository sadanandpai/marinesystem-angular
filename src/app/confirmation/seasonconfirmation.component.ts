import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seasonconfirmation',
  templateUrl: './seasonconfirmation.component.html',
  styleUrls: ['./seasonconfirmation.component.css']
})
export class SeasonconfirmationComponent implements OnInit {
  initialSubscriber: any;
  seasonID: number;
  endSeasonUpdateSubscriber: any;
  seasonActive: boolean;



  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.seasonID = Number(data.id);
    });
    
  }

  endSeason(){
    console.log(localStorage.getItem('user'));
    // Update - seasonStatus=false, endDate=now.dateTime, 
    const data = {
      seasonStatus: false,
      owner: localStorage.getItem('id')
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.endSeasonUpdateSubscriber = this.http
    .patch('http://localhost:8000/portal/season/' + this.seasonID +'/', data, )
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
        this.seasonActive=false;
        localStorage.removeItem('seasonID');
        this.onClick();
      },
      (error) => {
        console.log(error);
      }
    );
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
