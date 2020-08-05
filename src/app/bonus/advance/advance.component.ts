import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent implements OnInit, OnDestroy {
  @ViewChild('f') boatForm: NgForm;
  msg: boolean;
  success : any;
  boatOwner: boolean;
  initialSubscriber: any;
  boatID: number;
  seasonID: any;
  fetchSeasonIDSubscriber: any;
  addAdvanceSubscriber: any;
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.initialSubscriber = this.route.params.subscribe(data=>{
      this.boatID = Number(data.id);
    });
    
    var data = localStorage.getItem('group');
    if (data=='BoatOwner'){
      this.boatOwner=true;
    } 
    this.fetchSeasonID();
  }

  onClick(){
    let id = this.boatID;
    this.router.navigate(['/bonus', id]);
  }

  onHistory(){
    let id = this.boatID;
    this.router.navigate(['/advancehistory', id]);
  }

  private fetchSeasonID() {
    this.fetchSeasonIDSubscriber = this.http.get('http://localhost:8000/portal/boat_season_true/' + this.boatID + '/')
    .subscribe((responseData: any) => {
        console.log(responseData);
        this.seasonID = responseData[0].id;
    });
  }

  addAdvance(form: NgForm){
    const value = form.value;
    const data = {
      boat: this.boatID,
      season: this.seasonID,
      advance: value.advance,
      comment: value.comment,  
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + localStorage.getItem('token')
    });
    this.addAdvanceSubscriber = this.http
      .post('http://localhost:8000/portal/advance/', data, { headers: headers })
      .subscribe(
        (responseData: any) => {
          this.success= true;
          this.msg = false;
          form.reset();
          console.log(responseData);
        },
        (error) => {
          console.log(error);
          this.msg = true;
          this.success= false;
        }
      );
  }

 ngOnDestroy() {
   if(this.addAdvanceSubscriber){
     this.addAdvanceSubscriber.unsubscribe();
   }

  }
}
