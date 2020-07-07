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

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    var data = localStorage.getItem('group');
    if(data == 'BoatDriver'){
    this.boatDriver = true;
    } else {
    this.boatDriver = false;
    }
    this.fetchMembers();
  }
  
  onClick(){
    this.router.navigate(['/auction']);
  }

  onAddCrew(){
    this.router.navigate(['/addmembers'])
  }

  addAttendence(form: NgForm) {
    const value = form.value;
    const data = {
      name: value.name,
      salary: value.salary,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addAttendenceSubscriber = this.http
      .post('http://localhost:8000/portal//', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.success= true;
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
        }
      );
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
  }

}

