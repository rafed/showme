import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
  '../../../assets/font-awesome/css/font-awesome.min.css',
  './navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  // history:any[]
  ngOnInit() {
    // console.log("HISTORY");
    // this.displayHistoryService.getList()
    //   .subscribe(history => {
        
    //     console.log('HISTORY');
    //     console.log(history);
    //   });
    // this.displayHistoryService.getList().subscribe((history: any) => { 
    //   console.log("got "+history['list']);
    //   this.history = history['list'];
    // });
    // this.displayHistoryService.prepareList();
  }

  // onSelect(searchKey:any){
  //   console.log(searchKey+" selected");
  //   this.searchResultService.setPaper(searchKey);
  //   //this.router.navigate(['/search']);
  //   //this.router.navigate(['/search/result']);
  // }
  
}
