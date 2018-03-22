import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { Paper } from '../../../utils/Paper';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { GenerateGraphService } from '../../service/generate-graph.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  papers: Paper[];

  constructor(private router: Router,
    private generateGraphService: GenerateGraphService,
    private searchResultService: SearchResultService ){}
  
    ngOnInit() {
    //console.log("SR");
    this.getSearchResult();
    //this.getAdvancedSearchResult();
    this.searchResultService.getValue()
      .subscribe((updated: any) => { 
        console.log("got "+updated['value']);
        this.getSearchResult();
        //this.getAdvancedSearchResult();
      });
  }

  getSearchResult(){
    //console.log("getting result for: " + this.searchResultService.searchKey);
    this.searchResultService.getPapers()
       .subscribe(papers => this.papers = papers);
  }

  // getAdvancedSearchResult(){
  //   this.searchResultService.getAdvancedSearchPaper()
  //      .subscribe(papers => this.papers = papers);
  // }

  onSelect(selectedPaper: Paper): void {
    this.generateGraphService.setPaper(selectedPaper);
    //console.log(selectedPaper);
    this.router.navigate(['/search/graph']);
  }
}
