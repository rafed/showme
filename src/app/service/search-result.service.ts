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
  
  constructor(private http: HttpClient) { }

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

  // setAdvancedSearchPaper(data:any){
  //   this.data=data;
  //   this.subject.next({ value: true });
  // }

  // getAdvancedSearchPaper():Observable<Paper[]>{
  //   debugger;
  //   return this.http.get<Paper[]>(Server.API_ENDPOINT+'search/'+this.data)
  //   .pipe(
  //     tap(response => localStorage.setItem('advancedSearchResult', JSON.stringify(response)))
  //   );
  // }
  advancedSearch(data: any) {
    this.http.post(Server.API_ENDPOINT + "search", {
      words: data.words,
      phrase: data.phrase,
      words_some: data.words_some,
      words_none: data.words_none,
      scope: data.scope,
      authors: data.authors,
      published_in: data.published_in,
      year_low: data.year_low,
      year_hi: data.year_hi
    }, this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
  }
}
