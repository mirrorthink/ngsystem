
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../server';
import { CookieService } from '../server/cookies';
import { FileUploader } from 'ng2-file-upload';
import { server } from '../server/service';

@Component({

  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {
    @ViewChild("uploadPopoverInput") private uploadPopoverInput;
  URL = server + '/upload/';
  admin: String;
  file: any;
  everypage: Number = 10;
  pageCount = 1;
  pageIndex = 1;
  activeItem = {
      "name": '',
      '_id': 0,
      'openid': '',
      'phoneNumber': '',
      'totalMoney': 0,
      'changeMoney':0,
      'lastModifyTime':'',
  };
  public uploader: FileUploader = new FileUploader({ url: this.URL,removeAfterUpload:true });
  activeIndex;

  @ViewChild("modifyPopover") private modifyPopover;
  @ViewChild("uploadPopover") private uploadPopover;
  personMessages = [
    {
      "name": '',
      '_id': 0,
      'openid': '',
      'phoneNumber': '',
      'totalMoney': 0,
      'changeMoney':0,
      'lastModifyTime':'',

   
    }
  ]
  ngOnInit() {
    this.getData(this.pageIndex)

  }
  constructor(private api: CommonApiService, private _cookieService: CookieService) {
    this.admin = this._cookieService.get("user")
  }

  change(item, index) {
    this.activeItem = Object.assign({}, item)
    this.activeIndex = index;
  }
  onModifySubmit() {
  let diffmomey = this.activeItem.totalMoney - this.personMessages[this.activeIndex].totalMoney
    this.activeItem.changeMoney=diffmomey;
    this.api.modifyUser(JSON.stringify(this.activeItem)).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('修改成功');
          this.modifyPopover.close();
        
       
          let momeyverb;
          (diffmomey > 0) ? momeyverb = '增加' : momeyverb = '减少';
       
          let detail = '金额' + momeyverb + '了' + Math.abs(diffmomey) + ';' 
          this.personMessages[this.activeIndex] = this.activeItem;
          let logdata = {
            name: this.activeItem.name,
            admin: this.admin,
            type: '金额变动',
            detail: detail,
          }
          this.api.addLog(JSON.stringify(logdata))

        } else {
          console.log(mess)
        }
      },
      error => this.api.logError(error));
  }
  currentIndexChange(page) {
    this.pageIndex = page;
    this.getData(page)
  }
  getData(page) {
    var that=this;
    this.api.getpersoninfo(page).then(
      state => { 
        //if (state) { this.personMessages = state.records; this.pageCount =Math.ceil(state.pageCount) } 
      if (state) {
            state.records.forEach(function (item, index) {

              item.lastModifyTime && (item.lastModifyTime = that.api.formatDate(new Date(item.lastModifyTime)));
            });
            this.personMessages = state.records; this.pageCount = state.pageCount;
          }
        },
      error => { this.api.logError(error) });
  }
  search(event, value) {
    // console.log(value)
    if (((event.type == "keyup") && (event.code == "Enter")) || event.type == "click") {
      value=value.replace(/\s/g, "")
      this.api.search(value).then(
        state => {
          if (state.person) {
            this.personMessages = [];
            this.personMessages.push(state.person)
            console.log(state.person)

          }else{
            this.api.messageChange('无相关用户');
          }
        },
        error => { this.api.logError(error) });
    }
  }
  showAll() {
    this.getData(this.pageIndex)
  }


  delete() {
    // console.log(this.activeItem._id)

    this.api.deleteUser(this.activeItem._id).then(
      mess => {
        if (mess.state == "success") {
          this.api.messageChange('删除成功');
          this.modifyPopover.close();
          console.log(this.activeItem)
          let logdata = {
            name:this.personMessages[this.activeIndex].name,
            admin: this.admin,
            type: '删除用户',
            detail: '',
          }
          this.api.addLog(JSON.stringify(logdata))
          this.personMessages.splice(this.activeIndex, 1)

        } else {
          console.log(mess)
        }
      },
      error => this.api.logError(error));
  }


  uploadFile() {
    var that = this;
    // 上传
    this.uploader.queue[0].onSuccess = function (response, status, headers) {
      // 上传文件成功
      if (status == 200) {
        // 上传文件后获取服务器返回的数据
        let tempRes = JSON.parse(response);
        if (tempRes.state == "success") {
          that.api.messageChange('上传成功,修改了'+tempRes.count+'条数据');
          that.uploadPopover.close();
          that.showAll()
          console.log(that.uploadPopoverInput.value)
         
          that.uploadPopoverInput.value=null;
          
          /*
          let logdata = {
            admin: this.admin,
            type: '导入excel表',
            detail: '',
          }
          that.api.addLog(JSON.stringify(logdata))*/
          console.log(that.admin)
          
          let logdata = {
            name:'',
            admin: that.admin,
            type: '导入excel表',
            detail: '',
          }
          that.api.addLog(JSON.stringify(logdata))
        } else {
          console.log(tempRes)
        }

      } else {
        // 上传文件后获取服务器返回的数据错误
        console.log(status)
      }
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

}