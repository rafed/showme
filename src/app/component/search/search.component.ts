import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultService } from '../../service/search-result.service';
import { DisplayHistoryService } from '../../service/display-history.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./search.component.css']
})
export class SearchComponent implements OnInit {
  showDescription = false;
  activeSearchResult = false;

  constructor(private router: Router, 
    private searchResultService: SearchResultService,
    private displayHistoryService: DisplayHistoryService) { }

  ngOnInit() {
    let dynamicScripts = ["../../../assets/js/jquery-1.11.1.min.js","../../../assets/bootstrap/js/bootstrap.min.js"];

    for (let i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    this.updateDescription(true);
  }

  updateDescription(value: boolean): void {
    this.showDescription = value;
  }

  search(searchKey: string): void {
    this.updateSearchResult(true,false);
    console.log("Ädding to history");
    this.displayHistoryService.addToList(searchKey);
    this.searchResultService.setPaper(searchKey);
  }

  updateSearchResult(activeSearchResult: boolean,showDescription:boolean): void {
    console.log('sr úpdated '+activeSearchResult);
    this.activeSearchResult = activeSearchResult;
    this.updateDescription(showDescription);
  }
}
