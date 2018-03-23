import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
  '../../../assets/font-awesome/css/font-awesome.min.css',
  './navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isAuthenticated: boolean;
  constructor( private Router: Router) { }
  ngOnInit() {
    if (localStorage.getItem("token")!=null){
      this.isAuthenticated = true;
    }
    else this.isAuthenticated = false;  
  }
  loggedOut() {
    let x = document.getElementById("loggedOut");
    x.className = "show";
    setTimeout(function () { 
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  public logout(){
    this.loggedOut();
    localStorage.removeItem('token');
    this.Router.navigate(['/search']);
    this.isAuthenticated = false;
  }
 
}
