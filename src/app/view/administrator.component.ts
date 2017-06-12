
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../server';
import { CookieService } from '../server/cookies';
@Component({

  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.less']
})
export class AdministratorComponent implements OnInit {
  @ViewChild("modifyPopover") private modifyPopover;
  pageIndex: Number = 1;
  pageCount: Number;
  ngOnInit() {
    this.getData(this.pageIndex)
  }
  everypage: Number = 10;
  activeItem = {
    "name": '',
    'idNumber': '',
    'phoneNumber': '',
    'regTime': '',
    '_id': 0,
  };
  activeIndex;
  items = [
    {
      "name": '',
      'idNumber': '',
      'phoneNumber': '',
      'regTime': '',
      '_id': 0,
    }
  ]
  constructor(private api: CommonApiService, private _cookieService: CookieService) {
  }
  change(item, index) {
    this.activeItem = Object.assign({}, item)
    this.activeIndex = index;
  }
  onModifySubmit() {
    this.api.modifyadministrator(JSON.stringify(this.activeItem)).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('修改成功');
          this.modifyPopover.close();
          this.items[this.activeIndex] = this.activeItem;
        } else {
          console.log(mess)
        }
      },
      error => this.api.logError(error));
  }
  getData(page) {
    var that = this;
    this.api.getadmininfo(page).then(
      state => {
        if (state) {
          state.records.forEach(function (item, index) {

            item.regTime = that.api.formatDate(new Date(item.regTime));
          });
          this.items = state.records; this.pageCount = state.pageCount;
        }
      },
      error => this.api.logError(error));
  }
  currentIndexChange(page) {
    this.pageIndex = page;

    this.getData(page)
  }
  delete() {
    this.api.deleteAdmin(this.activeItem._id).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('删除成功');
          this.modifyPopover.close();
          let logdata = {
            name: this.items[this.activeIndex].name,
            admin: this._cookieService.get("user"),
            type: '删除管理员',
            detail: '',
          }
          this.api.addLog(JSON.stringify(logdata))
          this.items.splice(this.activeIndex, 1)
        } else {
          console.log(mess)
        }
      },
      error => this.api.logError(error));
  }
  search(event, value) {
    // console.log(value)
    if (((event.type == "keyup") && (event.code == "Enter")) || event.type == "click") {
      this.api.searchAdmin(value).then(
        state => {
          if (state) {
            this.items = [];
            this.items.push(state)
          }
        },
        error => { this.api.logError(error) });
    }
  }
  showAll() {
    this.getData(this.pageIndex)
  }
}