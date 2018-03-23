import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';
import { Paper } from '../../utils/Paper';
import { Server } from '../../utils/Server';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchResultService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  searchKey:string;
  private subject = new Subject<any>();
  private advancedSearchSubject = new Subject<any>();
  constructor(private http: HttpClient) { }

  sendAdvancedSearchData(data: any) {
    this.advancedSearchSubject.next(data);
  }

  getAdvancedSearchData(): Observable<any> {
    return this.advancedSearchSubject.asObservable();
  }

  getValue(): Observable<any> {
    return this.subject.asObservable();
  }

  setPaper(searchKey:string):  void{
    console.log("SET PAPER "+searchKey);
    this.searchKey=searchKey;
    if (localStorage.getItem('searchResult') != null) {
      //console.log('removing ls item');
      localStorage.removeItem('searchResult');
    }
    this.subject.next({ value: true });
  }
  
  getPapers():Observable<Paper[]>{
    console.log('get paper');
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
      //return of([]);
  }

  advancedSearch(words: any,phrase: any,words_some: any,words_none: any,scope: any,
    authors: any,published_in: any,year_low: any,year_hi: any) {
    this.http.post(Server.API_ENDPOINT + "search", {
      words: words,
      phrase: phrase,
      words_some: words_some,
      words_none: words_none,
      scope: scope,
      authors: authors,
      published_in: published_in,
      year_low: year_low,
      year_hi: year_hi
    }, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem("searchResult", JSON.stringify(res));
          this.sendAdvancedSearchData(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }
}
