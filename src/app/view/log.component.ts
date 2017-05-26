
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../server';
declare var navigator: any;
declare var wx: any;
@Component({
  selector: 'my-app',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.less']
})
export class LogComponent implements OnInit {

  @ViewChild("modifyPopover") private modifyPopover;
  pageIndex = 1;
  everypage: Number = 10;
  JsConfig;

  pageCount;
  ngOnInit() {

    this.getData(this.pageIndex);

  }
  show = false;
  activeItem = {
    "name": '',
    'type': '',
    'admin': '',
    'modifyTime': '',
    'detail': ''
  };
  activeIndex;
  errorMessage;
  items = [

  ]
  constructor(private api: CommonApiService) {

  }





  change(item, index) {
    this.activeItem = Object.assign({}, item)
    this.activeIndex = index;
  }
  onModifySubmit() {
    //let data=Object.assign({}, JSON.stringify(this.activeItem)) 
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
      error => this.errorMessage = <any>error);
  }
  getData(page) {
    let that=this;
    this.api.getloginfo(page).then(
      state => {
        if (state) {
          state.records.forEach(function (item, index) {
            item.modifyTime=that.api.formatDate(new Date(item.modifyTime));
          });

          this.items = state.records; this.pageCount = Math.ceil(state.pageCount)
        }
      },
      error => { this.errorMessage = <any>error; console.log(error) });
  }
  currentIndexChange(page) {
    this.pageIndex = page;

    this.getData(page)
  }
  showAll() {
    this.getData(this.pageIndex);
  }


}