import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit {
  @ViewChild('f') attendenceForm: NgForm;
  msg: boolean;
  success : any;
  addAttendenceSubscriber: any;
  boatDriver: boolean;
  loadedMember: any;
  fetchMemberSubscriber: any;
  updateCrewSubscriber: any;
  tripID: any;
  memberCount: any;
  data: any[] = [];
  count: number;
  getCrewCountSubscriber: any;
  addCrewCountSubscriber: any;


  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.tripID = localStorage.getItem('tripID');
    console.log(this.tripID);
    console.log(window.localStorage);

    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
    this.boatDriver = true;
    } else {
    this.boatDriver = false;
    }
    this.fetchCrewCount();
    this.fetchMember();
  }


  fetchCrewCount() {
    this.getCrewCountSubscriber = this.http
      .get('http://localhost:8000/portal/trip_detail/' + this.tripID + '/')
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          if(responseData.crewCount == null){
            this.count = 0;  
          } else {
            this.count = responseData.crewCount;
          }
            console.log(this.count);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  onClick(){
    this.router.navigate(['/myboats']);
  }

  onAddCrew(){
    this.router.navigate(['/addmembers'])
  }

  addAttendence(form: NgForm) {
    const value = form.value;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    console.log(form.value);

    // Push selected members data to data array 
    for(let i=0;i<this.memberCount;i++){
      // debugger
      if(this.loadedMember[i].selected){
        this.data.push({
          tripId: Number(this.tripID),
          member: Number(value['member_' + this.loadedMember[i].id]),
          salary: Number(value['salary_' + this.loadedMember[i].id]),
          name: value['name_' + this.loadedMember[i].id],
          age: Number(value['age_' + this.loadedMember[i].id]),
        })
        // count is no. of crew in this trip
        this.count += 1;
      }
    }
    console.log(this.data);
    console.log(this.count);

    // post json stringify data
    var data = {"data": this.data};
    console.log(data);
    
    this.addAttendenceSubscriber = this.http
      .post('http://localhost:8000/portal/attendence_list/', JSON.stringify(data), { headers: headers })
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          this.success = true;
          form.reset();
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );

    const crewCount = {
      crewCount: this.count,
    }
    this.addCrewCountSubscriber = this.http
    .patch('http://localhost:8000/portal/trip_detail/' + this.tripID + '/', crewCount, { headers: headers })
    .subscribe(
      (responseData: any) => {
        console.log(responseData);
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  private fetchMember() {
    let id = localStorage.getItem('id')
    this.fetchMemberSubscriber = this.http
      .get('http://localhost:8000/portal/crewBD_list/' + id + '/')
      .subscribe(
        (responseData: any) => {
          console.log(responseData);
          this.loadedMember=responseData;
          this.memberCount = responseData.length;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  ngOnDestroy() {
    if(this.addAttendenceSubscriber){
      this.addAttendenceSubscriber.unsubscribe();
    }
    if(this.fetchMemberSubscriber){
      this.fetchMemberSubscriber.unsubscribe();
    }
    if(this.addCrewCountSubscriber){
      this.addCrewCountSubscriber.unsubscribe();
    }
    if(this.getCrewCountSubscriber){
      this.getCrewCountSubscriber.unsubscribe();
    }
  }

}
