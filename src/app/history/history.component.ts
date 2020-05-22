import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Fish } from '../fishdetails/fish.model';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  loadedfishes: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.fetchFish();
    }

    onClick(){
        this.router.navigate(['/auction']);
    }

    onViewMore(id: any){
      this.router.navigate(['/history', id])
    }
  
    private fetchFish() {
      let id = localStorage.getItem('id')
      this.http.get('http://localhost:8000/portal/bdfish_list/' + id + '/')
      .subscribe((responseData: any) => {
          console.log(responseData);
          this.loadedfishes = responseData;
      });
    }
  }

