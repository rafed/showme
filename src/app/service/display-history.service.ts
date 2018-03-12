import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DisplayHistoryService {
  private subject = new Subject<any>();

  constructor() { }
  addToList(searchString){
    console.log("called history");
    let list = JSON.parse(localStorage.getItem('history'));
    if(list!=null){
      for(var i=0; i<list.length; i++){
        if(list[i] == searchString){
          console.log('exist');
          this.prepareList();
          return;
        }
      }
      if(list.length >= 10){
          list.splice(-1, 1);
      }
    }
    else{
      list=[];
    }
    console.log('hi');
    list.splice(0, 0, searchString);
    localStorage.setItem("history", JSON.stringify(list));
    console.log('after adding to history');
    console.log(list);
    this.prepareList();
  }

  getList(): Observable<any> {
    return this.subject.asObservable();
  }

  prepareList(){
    console.log('getting history');
    let history=localStorage.getItem('history');
    if ( history!= null) {
      var list = JSON.parse(history);
      this.subject.next({ list: list });
    }
  }
}
