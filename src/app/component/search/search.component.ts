import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css',
    '../../../assets/css/fonts.css', //http://fonts.googleapis.com/css?family=Roboto:400,100,300,500 k fonts.css hishabe save korsi
    '../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../assets/font-awesome/css/font-awesome.min.css']
})
export class SearchComponent implements OnInit {
  showDescription=false;
  constructor(private router: Router) { }

  ngOnInit() {
    var dynamicScripts = ["../../../assets/js/jquery-3.2.1.min.js","../../../assets/bootstrap/js/bootstrap.min.js"];

    for (var i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
    if(this.router.url=='/search'){
      this.showDescription=true;
    }
    else{
      this.showDescription=false;
    }
    // document.getElementsByTagName('body')[0].setAttribute('data-spy','scroll');
    // document.getElementsByTagName('body')[0].setAttribute('data-target','.navbar');
    // document.getElementsByTagName('body')[0].setAttribute('data-offset','50');
  }
}
