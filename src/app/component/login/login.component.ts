import { Component, OnInit } from '@angular/core';
import { User } from '../../../utils/User';
import { LoginService } from '../../service/login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Subscription } from 'rxjs/Subscription';

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
  message: boolean = true;
  subscription: Subscription;
  constructor(private loginService: LoginService) {
    
  };
  loginSuccess: boolean = true;
  ngAfterViewInit() {
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js"];
    //"../../../assets/js/jquery.backstretch.min.js","../../../assets/js/scripts.js"
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
    this.message = true;
    this.loginService.login(data.email,Md5.hashStr(data.password));
    this.subscription = this.loginService.getMessage().subscribe(message => { 
      this.message = message;
    });
  }
}
