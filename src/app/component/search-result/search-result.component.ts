import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { Paper } from '../../../utils/Paper';
import { Router, NavigationEnd } from '@angular/router';
import { GenerateGraphService } from '../../service/generate-graph.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  papers: Paper[];

  // constructor(private searchResultService: SearchResultService,
  //             private router:Router,
  //             private generateGraphService: GenerateGraphService) {}
  constructor(private router: Router,
    private generateGraphService: GenerateGraphService,
    private searchResultService: SearchResultService ){
     // override the route reuse strategy
     this.router.routeReuseStrategy.shouldReuseRoute = function(){
        return false;
     }

     this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
           // trick the Router into believing it's last link wasn't previously loaded
           this.router.navigated = false;
           this.getSearchResult();
           // if you need to scroll back to top, here is the right place
           //window.scrollTo(0, 0);
        }
    });

}
  ngOnInit() {
  }

  getSearchResult(){
    console.log("KEY: " + this.searchResultService.searchKey);
    this.searchResultService.getPapers()
      .subscribe(papers => this.papers = papers);
  }

  onSelect(selectedPaper: Paper): void {
    this.generateGraphService.setPaper(selectedPaper);
    //console.log(selectedPaper);
    this.router.navigate(['/search/graph']);
  }

}
