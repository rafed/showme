import { Component, OnInit } from '@angular/core';
import { User } from '../../../utils/User';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../assets/font-awesome/css/font-awesome.min.css',
    '../../../assets/css/form-elements.css',
    '../../../assets/css/style.css',
    './login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private loginService: LoginService) {};

  ngAfterViewInit() {
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js","../../../assets/js/jquery.backstretch.min.js","../../../assets/js/scripts.js"];

    for (var i = 0; i < dynamicScripts .length; i++) {
        let node = document.createElement('script');
        node.src = dynamicScripts [i];
        node.type = 'text/javascript';
        node.async = false;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  ngOnInit() {
  }

  onSubmit(data) {
    console.log("Entered Email id : " + data.email+ ' '+ data.password);
    this.loginService.login(data.email,data.password);
    // this.user.email=data.email;
    // this.user.password=data.password;
  }

}
