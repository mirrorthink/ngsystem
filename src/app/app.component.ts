import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonApiService } from './server';
import { CookieService } from './server/cookies';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  FALSE: boolean = false;
  navShow: boolean = true;
  @ViewChild("registerPopover") private registerPopover;
  @ViewChild("info") private info;
  @ViewChild("loginPopover") private loginPopover;
  login: boolean = false;
  administrator: string = "";
  regInfo: string = "";
  infomessage: string = "";
  errorMessage;
  constructor(private router: Router, private api: CommonApiService, private _cookieService: CookieService) {
    api.messagealert$.subscribe(
      mess => {
        this.infomessage = mess;
        this.info.open();
        setTimeout(() => {
          this.info.close();
        }, 1000);
      });
    api.loginState$.subscribe(
      state => {
        this.login = state;
        this.administrator = this._cookieService.get("user");
      });
  }
  ngOnInit() {
    this.administrator = this._cookieService.get("user");

    if (this.administrator) {
      this.api.loginStateChange(true);
    }
  }
  logout() {
    this._cookieService.remove("user");
    this.router.navigateByUrl('/login')
    this.api.loginStateChange(false);
  }
}
