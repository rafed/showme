import { Component, OnInit } from '@angular/core';
import { SignupService } from '../../service/signup.service';
import { Subscription } from 'rxjs/Subscription';

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
  message: boolean;
  isDuplicateEmail: boolean = true;
  subscription: Subscription;

  constructor(private signupService: SignupService) { }

  public ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  ngAfterViewInit() {
    var dynamicScripts = ["../../../assets/bootstrap/js/bootstrap.min.js"];

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
    this.isDuplicateEmail = this.passwordMatched = this.validPassword = this.validEmail = true;
    this.subscription = this.signupService.getMessage().subscribe(message => { 
      this.message = message;
      if (this.message == false){
        this.isDuplicateEmail = false;
      }
    });
    if (data.password1 != data.password2) {
      this.passwordMatched = false;
    }
    else if (data.password1.length < 8) {
      this.validPassword = false;
    }
    else if (!this.ValidateEmail(data.email)) {
      this.validEmail = false;
    }
    else {
      this.signupService.signup(data.email, data.password1);
    }  
  }
  
}
