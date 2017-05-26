import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../server';
import { CookieService } from '../server/cookies';
declare var wx: any;
@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  loginShow: boolean = true;
  FALSE: boolean = false;


  regInfo: String ;
  constructor(private api: CommonApiService, private _cookieService: CookieService, private router: Router, ) {


  }
  regform = {
    "name": "",
    "password": "",
    "repassword": ""
  }
  logform = {
    "name": "",
    "password": "",
    "rementber": ""
  }

  checkpass() {
    if (this.regform.password != this.regform.repassword) {
      this.regInfo = "两次密码不一致"
    } else {
      this.regInfo = ""
    }
  }
  onRegisterSubmit() {
    this.api.reg(JSON.stringify(this.regform)).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('注册成功，请登录')
          this.loginShow = true;
        } else if (mess.state == "alredyeite") {
          this.api.messageChange('用户名被占用')
        } 
      },
      error =>  this.api.logError('注册错误'));
  }
  onLoginSubmit() {

    this.api.login(JSON.stringify(this.logform)).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('登录成功');
          let expires = function (state) {
            if (state) {
              let d = new Date();
              d.setDate(d.getDate() + 7);
              return d
            }
          }
          this._cookieService.put('user', mess.name, { "expires": expires(this.logform.rementber) });
          this.api.loginStateChange(true);
          this.router.navigateByUrl('/main')
        }else{
          this.api.messageChange('用户名或密码不正确');
        } 
      },
      error => this.api.logError('登录错误'));
  }
}