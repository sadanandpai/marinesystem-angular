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
  loadedMembers: any;
  fetchMemberSubscriber: any;
  updateCrewSubscriber: any;
  tripID: any;
  memberCount: any;
  public attendence: any[] = [{
    id: 1,
    name: '',
    age: '',
    number: '',
    salary: ''
  }];


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
    this.fetchMembers();
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
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    console.log(form.value);

    for(let i=1;i<=this.memberCount;i++){
      debugger
      const data = {
        tripid: this.tripID,
        member: value.member_[i],
        salary: value.salary_[i],
      };
      debugger
      console.log(data);
    }

    
    // this.addAttendenceSubscriber = this.http
    //   .post('http://localhost:8000/portal/attendence_list/', data, { headers: headers })
    //   .subscribe(
    //     (responseData: any) => {
    //       this.success= true;
    //       console.log(responseData);
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.msg = true;
    //     }
    //   );
    //   var id=value.member;
    //   this.updateCrewSubscriber = this.http
    //   .post('http://localhost:8000/portal/crew_detail/' + id + '/', data, { headers: headers })
    //   .subscribe(
    //     (responseData: any) => {
    //       this.success= true;
    //       console.log(responseData);
    //     },
    //     (error) => {
    //       console.log(error);
    //       this.msg = true;
    //     }
    //   );
  }

  private fetchMembers() {
    let id = localStorage.getItem('id')
    this.fetchMemberSubscriber = this.http
      .get('http://localhost:8000/portal/crewBD_list/' + id + '/')
      .subscribe(
        (responseData: any) => {
          this.success= true;
          console.log(responseData);
          this.loadedMembers=responseData
          this.memberCount = responseData.length;
        },
        (error) => {
          console.log(error);
          this.msg = true;
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
  }

}

