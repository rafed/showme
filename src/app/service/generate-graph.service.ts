import { Injectable } from '@angular/core';
import { Paper } from '../../utils/Paper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class GenerateGraphService {
  paper: Paper;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  setPaper(paper:Paper):  void{
    console.log(paper.title);
    this.paper=paper;
  }

  getBibtex() {
    console.log('äuthors:'+ this.paper.authors);
    return this.http.post(Server.API_ENDPOINT+"bibtex", {
      data_cid: this.paper.data_cid,
      title: this.paper.title,
      authors: this.paper.authors
    },this.httpOptions)
    
    //return this.http.get(Server.API_ENDPOINT+"bibtex/"+this.paper.data_cid);
  }

   getReferenceData() {
    console.log("PDF "+this.paper.pdflink);
    return this.http.get(Server.API_ENDPOINT+"parse/"+this.paper.pdflink);
    // return this.http.post(Server.API_ENDPOINT+"parse", {
    //   pdflink: this.paper.pdflink,
    //   title: this.paper.title,
    //   authors: this.paper.authors
    // },this.httpOptions)
  }

}
