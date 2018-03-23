import { Injectable } from '@angular/core';
import { User } from '../../utils/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SignupService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  private subject = new Subject<any>();;
  sendMessage(message: boolean) {
    this.subject.next(message);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient) { }
  signup(email:any, password:any){
    this.http.post(Server.API_ENDPOINT+"register", {
      email: email,
      password: password
    },this.httpOptions)
    .subscribe(
      res => {
        if (res["msg"] == "error") {
          this.sendMessage(false);
        }
        else {
          this.sendMessage(true);
        }
      },
      err => {
        console.log("Error occured");
      }
    ); 
  }
}
