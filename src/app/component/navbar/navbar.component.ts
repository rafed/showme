import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { DisplayHistoryService } from '../../service/display-history.service';
import { SearchResultService } from '../../service/search-result.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
  '../../../assets/font-awesome/css/font-awesome.min.css',
  './navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private displayHistoryService: DisplayHistoryService,
    private searchResultService: SearchResultService,
    private router:Router) { }

  history:any[]
  ngOnInit() {
    console.log("HISTORY");
    // this.displayHistoryService.getList()
    //   .subscribe(history => {
        
    //     console.log('HISTORY');
    //     console.log(history);
    //   });
    this.displayHistoryService.getList().subscribe((history: any) => { 
      console.log("got "+history['list']);
      this.history = history['list'];
    });
    this.displayHistoryService.prepareList();
  }

  onSelect(searchKey:any){
    console.log(searchKey+" selected");
    this.searchResultService.setPaper(searchKey);
    //this.router.navigate(['/search']);
    this.router.navigate(['/search/result']);
  }
  
}
