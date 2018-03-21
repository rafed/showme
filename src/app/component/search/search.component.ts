import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { DisplayHistoryService } from '../../service/display-history.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./search.component.css']
})
export class SearchComponent implements OnInit {
  showDescription = true;
  history:string[];
  searchKey: string;
  advancedSearchForm: FormGroup;

  constructor(private searchResultService: SearchResultService,
    private displayHistoryService: DisplayHistoryService,
    private router: Router, private fb: FormBuilder) {
      this.createAdvancedSearchForm();
  }
  createAdvancedSearchForm() {
    this.advancedSearchForm = this.fb.group({
      "words": [''],
      "phrase": [''],
      "words_some": [''],
      "words_none": [''],
      "scope": [''],
      "authors": [''],
      "published_in": [''],
      "year_low": [''],
      "year_hi":[''] 
    });
  }

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

  advancedSearch(){
    console.log(this.advancedSearchForm.value);
    this.searchResultService.setAdvancedSearchPaper(this.advancedSearchForm.value);
  }
}
