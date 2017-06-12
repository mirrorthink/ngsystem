

import { Injectable } from '@angular/core';
import { Router, CanActivate, Route } from '@angular/router';
import { CookieService } from './cookies';

@Injectable()
export class GuardService implements CanActivate {
  constructor(private router: Router, private _cookieService: CookieService) { }
  canActivate() {

   // return true;
       if (this._cookieService.get("user")) {

      return true
    }else {
      this.router.navigateByUrl('/login')

      return false
    }
  }
}