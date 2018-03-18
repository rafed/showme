import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class RatingService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  sendRating(email, edgeID, rating): void{
    //console.log('äuthors:'+ this.paper.authors);
    this.http.post(Server.API_ENDPOINT+"bibtex", {
      email: email,
      edgeID: edgeID,
      rating: rating
    },this.httpOptions)
    .subscribe(response => {
      console.log(response);
    });
  }
}
