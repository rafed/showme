import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DisplayHistoryService } from '../../service/display-history.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
  '../../../assets/font-awesome/css/font-awesome.min.css',
  './navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private displayHistoryService: DisplayHistoryService) { }

  history:any[]
  ngOnInit() {
    this.displayHistoryService.getList()
      .subscribe(history => {
        this.history = history
        console.log('HISTORY');
        console.log(history);
      });

      this.uploadFileService.getValue().subscribe((percent: any) => { 
        console.log("Sending "+percent['number']);
        this.percentage=percent['number'];
      });
  }

  onSelect(searchKey:any){
    console.log(searchKey+"selected");
  }
  
}
