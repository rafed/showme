import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { Paper } from '../../../utils/Paper';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { GenerateGraphService } from '../../service/generate-graph.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css', './search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  papers: Paper[] = [];
  subscription: Subscription;
  isDataAvailable: boolean = false;
  isShowData: boolean = false;

  constructor(private router: Router,
    private generateGraphService: GenerateGraphService,
    private searchResultService: SearchResultService) { }
  ngOnInit() {

    this.getSearchResult();
    this.getAdvancedSearchData();
    // this.searchResultService.getValue()
    //   .subscribe((updated: any) => {
    //     this.isShowData = false;
    //     console.log("got " + updated['value']);
    //     this.getSearchResult();
    //     //this.getAdvancedSearchData();
    //   });
  }

  getSearchResult() {
    //console.log("getting result for: " + this.searchResultService.searchKey);
    this.searchResultService.getPapers()
      .subscribe(papers => {
        this.isShowData = true;
        this.papers = papers;
      });
    // console.log(this.papers.length);
    // if (this.papers.length==0){
    //   this.isDataAvailable=false;
    // }
    // else this.isDataAvailable= true;

  }

  onSelect(selectedPaper: Paper): void {
    this.generateGraphService.setPaper(selectedPaper);
    this.router.navigate(['/search/graph']);
  }

  getAdvancedSearchData() {
    this.subscription = this.searchResultService.getAdvancedSearchData()
      .subscribe(data => {
        this.papers = data;
        this.isShowData = true;
      });
  }
}