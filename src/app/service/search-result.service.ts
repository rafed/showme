import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { Paper } from '../../utils/Paper';
import { Server } from '../../utils/Server';

@Injectable()
export class SearchResultService {
  url="http://192.168.0.106:9999/api/";//"http://172.16.18.105:9999/api/search";
  searchKey:string;
  constructor(private http: HttpClient) { }

  setPaper(searchKey:string):  void{
    console.log(searchKey);
    this.searchKey=searchKey;
    if (localStorage.getItem('searchResult') != null) {
      console.log('removing item');
      localStorage.removeItem('searchResult');
    }
  }
  
  getPapers():Observable<Paper[]>{
    let searchResult=localStorage.getItem('searchResult');
    if ( searchResult!= null) {
      var list = JSON.parse(searchResult);
     
      return of(list);
    }

    console.log('getting result from server\n');
      return this.http.get<Paper[]>(Server.API_ENDPOINT+'search/'+this.searchKey)
      .pipe(
        tap(response => localStorage.setItem("searchResult", JSON.stringify(response)))
      );
  }
}
