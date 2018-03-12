import { Injectable } from '@angular/core';
import { Paper } from '../../utils/Paper';
import { HttpClient } from '@angular/common/http';
import { Server } from '../../utils/Server';

@Injectable()
export class GenerateGraphService {
  paper: Paper;
  constructor(private http: HttpClient) { }

  setPaper(paper:Paper):  void{
    console.log(paper.title);
    this.paper=paper;
  }

  getBibtex() {
    return this.http.get(Server.API_ENDPOINT+"bibtex/"+this.paper.data_cid);
  }

   getReferenceData() {
    console.log("PDF "+this.paper.pdflink);
    return this.http.get(Server.API_ENDPOINT+"parse/"+this.paper.pdflink);
  }

}
