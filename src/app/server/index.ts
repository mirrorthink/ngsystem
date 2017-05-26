import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { server } from './service';
@Injectable()
export class CommonApiService {


  private apiBase: string = server;
  constructor(private http: Http) {
    //this.generateTokenStream();
  }

  getpersoninfo(pageindex) {
    let api = this.apiBase + '/personinfo';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('page', pageindex);
    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  getadmininfo(pageindex) {

    let api = this.apiBase + '/admininfo';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('page', pageindex);
    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  reg(data) {
    let api = this.apiBase + '/reg';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data', data);
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(api, urlSearchParams, {
      headers
    })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  login(data) {
    let api = this.apiBase + '/login';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data', data);
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(api, urlSearchParams, {
      headers
    })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)

  }
  modifyadministrator(data) {
    let api = this.apiBase + '/modifyadministrator';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data', data);
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(api, urlSearchParams, {
      headers
    })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  modifyUser(data) {
    let api = this.apiBase + '/modifyUser';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data', data);
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(api, urlSearchParams, {
      headers
    })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)

  }

  private messagealert = new Subject<string>();
  messagealert$ = this.messagealert.asObservable();

  messageChange(mes: string) {
    this.messagealert.next(mes);
  }

  private loginState = new Subject<boolean>();
  loginState$ = this.loginState.asObservable();

  loginStateChange(state: boolean) {
    this.loginState.next(state);
  }

  private handleError(error ) {
    console.log(error)
  }


  deleteAdmin(_id) {
    let api = this.apiBase + '/deleteAdmin';

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('_id', _id);

    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  deleteUser(_id) {
    let api = this.apiBase + '/deleteUser';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('_id', _id);


    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  addLog(data) {
    let api = this.apiBase + '/addLog';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('data', data);
    let headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(api, urlSearchParams, {
      headers
    })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  getloginfo(pageindex) {
    let api = this.apiBase + '/loginfo';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('page', pageindex);

    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  search(term: string) {
    let api = this.apiBase + '/search';
    // TODO: Add error handling
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('search', term);
    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  getJsConfig() {
    let api = this.apiBase + '/JsConfig';
    return this.http.get(api)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }


  logError(err) {
    let api = this.apiBase + '/logError';
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('err', err);
    return this.http.get(api, urlSearchParams)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }

  searchAdmin(term: string) {
    let api = this.apiBase + '/searchAdmin';
    // TODO: Add error handling
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('search', term);
    return this.http.get(api, { search: urlSearchParams })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError)
  }
  formatDate(date: Date): string {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '   ' + date.getHours() + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes());
  }

}

