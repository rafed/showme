import { Component, OnInit } from '@angular/core';
import { SearchResultService } from '../../service/search-result.service';
import { Paper } from '../../../utils/Paper';
import { Router } from '@angular/router';
import { GenerateGraphService } from '../../service/generate-graph.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css','./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  papers: Paper[];

  constructor(private searchResultService: SearchResultService,
              private router:Router,
              private generateGraphService: GenerateGraphService) { console.log("HI1");}

  ngOnInit() {
    // console.log("HI");
    // //let p = new Paper();
    // //p.title = 'my title';
    // //this.papers.push(p);
    // if(this.searchResultService.searchKey==''){
    //   console.log('redirect');
    //   this.router.navigate(['/search']);
    // }
    console.log(this.searchResultService.searchKey);
    this.searchResultService.getPapers()
      .subscribe(papers => this.papers = papers);
    
   // this.papers = this.searchResultService.getPapers();
    //localstorage exists 
    //does not exist

    //  .subscribe(papers => 
    //   this.papers = papers);
  }

  onSelect(selectedPaper: Paper): void {
    this.generateGraphService.setPaper(selectedPaper);
    //console.log(selectedPaper);
    this.router.navigate(['/search/graph']);
  }

}
