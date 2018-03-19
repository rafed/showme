import { Injectable } from '@angular/core';
import { User } from '../../utils/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor(private http: HttpClient) { }
  login(email:any, password:any){
    
    this.http.post(Server.API_ENDPOINT+"login", {
      email: email,
      password: password
    },this.httpOptions)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res));
      },
      err => {
        console.log("Error occured");
      }
    );  
  }
}
