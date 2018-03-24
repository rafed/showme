import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class RatingService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { }

  sendRating(token, edgeID, rating): void{
    //console.log('äuthors:'+ this.paper.authors);
    console.log(token+" "+edgeID+ " "+rating);
    this.http.post(Server.API_ENDPOINT+"rating", {
      token: token,
      edge_id: edgeID,
      rating: rating
    },this.httpOptions)
    .subscribe(response => {
      console.log(response);
    });
  }
}
