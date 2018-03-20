import { Injectable } from '@angular/core';
import { User } from '../../utils/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class SignupService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }
  signup(email:any, password:any): boolean{
    let signupSuccess:boolean;
    this.http.post(Server.API_ENDPOINT+"register", {
      email: email,
      password: password
    },this.httpOptions)
    .subscribe(
      res => {
        if (res["msg"]=="error") signupSuccess = false;
        else signupSuccess = true;
      },
      err => {
        console.log("Error occured");
      }
    );
    return signupSuccess;  
  }
}
