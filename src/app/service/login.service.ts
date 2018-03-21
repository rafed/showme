import { Injectable } from '@angular/core';
import { User } from '../../utils/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private subject = new Subject<any>();;
  sendMessage(message: boolean) {
    this.subject.next(message);
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  constructor(private http: HttpClient, private Router: Router) { }
  login(email: any, password: any) {
    this.http.post(Server.API_ENDPOINT + "login", {
      email: email,
      password: password
    }, this.httpOptions)
      .subscribe(
        res => {
          if (res["msg"] == "error") {
            this.sendMessage(false);
          }
          else {
            this.sendMessage(true);
            localStorage.setItem("token", JSON.stringify(res));
            localStorage.setItem("email", JSON.stringify(res));
            this.Router.navigate(['/search']);
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }
}
