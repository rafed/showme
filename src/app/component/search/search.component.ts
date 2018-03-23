import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { DisplayHistoryService } from '../../service/display-history.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  showDescription = true;
  history:string[];
  searchKey: string;

  constructor(private searchResultService: SearchResultService,
    private displayHistoryService: DisplayHistoryService,
    private router: Router) {}


  ngOnInit() {
    let dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js"];

    for (let i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    
    this.displayHistoryService.getList().subscribe((history: any) => { 
      this.history = history['list'];
    });
    this.displayHistoryService.prepareList();

    console.log("INIT "+this.showDescription);
  }

  search(searchKey: string): void {
    this.showDescription = false;
    this.searchKey=searchKey;
    this.displayHistoryService.addToList(this.searchKey);
    this.searchResultService.setPaper(this.searchKey);
    this.router.navigate(['/search/result']);
  }

  onSubmit(data): void{
    this.showDescription = false;
    this.searchResultService.advancedSearch(data.words,data.phrase,data.words_some,data.words_none,data.scope,
      data.authors,data.published_in,data.year_low,data.year_hi);
    this.router.navigate(['/search/result']); 
  }
}
