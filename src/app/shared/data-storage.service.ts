import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
              private loggingService: LoggingService) { }

  storeUserData(){
    const users = this.loggingService.getUser();
    console.log(users)
    this.http.post('http://localhost:8000/users/users.json', users)
      .subscribe(responseData => {
          console.log(responseData);
      });
  }
}
