import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mycrew-details',
  templateUrl: './mycrew-details.component.html',
  styleUrls: ['./mycrew-details.component.css']
})
export class MycrewDetailsComponent implements OnInit {

  loadedcrews: any;
  Salary: number;
  fetchCrewSubscriber: any;
  tripID: number;
  initialSubscriber: any;
  member: any;
  // boatid: any;
  // fetchBoatNameSubscriber: any;
  // boat: any;
  // loadedboatdetails: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {

      this.initialSubscriber = this.route.params.subscribe(data=>{
        this.tripID = Number(data.id);
      });
      this.fetchCrews();

    }

    onClick(){
      //tripid

        this.router.navigate(['/calculation']);
    }    


    private fetchCrews() {
      let id = this.tripID;
      this.fetchCrewSubscriber = this.http.get('http://localhost:8000/portal/tripAttendence_list/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedcrews = responseData;
          
          for(let i=0;i<this.loadedcrews.length;i++){
            this.member = this.loadedcrews[i].member;
            console.log(this.member);
          }




          this.Salary = 0;
          for(let i=0;i<this.loadedcrews.length;i++){
            this.Salary += this.loadedcrews[i].salary;
            console.log(this.Salary);
          }
          console.log(this.Salary);
      });
    }

    ngOnDestroy() {
      if(this.fetchCrewSubscriber){
        this.fetchCrewSubscriber.unsubscribe();
      }
      if(this.initialSubscriber){
        this.initialSubscriber.unsubscribe();
      }
    }
  }

