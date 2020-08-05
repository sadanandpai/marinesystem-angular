import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  }

  onClick(){
    this.router.navigate(['/bonus']);
  }

  onHistory(){
    this.router.navigate(['/advancehistory']);
  }

  addAdvance(form: NgForm){

  }

 ngOnDestroy() {

  }
}
