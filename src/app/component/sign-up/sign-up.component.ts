import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css',
    '../../../assets/bootstrap/css/bootstrap.min.css',
    '../../../assets/font-awesome/css/font-awesome.min.css',
    '../../../assets/css/form-elements.css',
    '../../../assets/css/style.css']
})
export class SignUpComponent implements OnInit {
  passwordMatched: boolean = true;
  validPassword: boolean = true;
  validEmail: boolean = true;
  signupSuccess: boolean = false;

  constructor(private signupService: SignupService) { }

  public ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  ngAfterViewInit() {
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js", "../../../assets/js/jquery.backstretch.min.js", "../../../assets/js/scripts.js"];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  ngOnInit() {
  }

  onSubmit(data) {

    if (data.password1 != data.password2) {
      this.passwordMatched = false;
    }
    else if (data.password1.length < 4) {
      this.validPassword = false;
    }
    else if (!this.ValidateEmail(data.email)) {
      this.validEmail = false;
    }
    else {
      console.log(data.email + ' ' + data.password1 + ' ' + data.password2+ ' ' + Md5.hashStr(data.password1));
      this.signupSuccess = this.signupService.signup(data.email, Md5.hashStr(data.password1));
    }  
  }
  
}
