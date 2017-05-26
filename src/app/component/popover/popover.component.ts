import { Component, Input } from '@angular/core';
@Component({
    selector: 'popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.less']
})
export class PopoverComponent {
    isShow = false; 
    @Input() title: string = '';
    @Input() isShowHeader: boolean = true;
    open() {
        this.isShow = true;
    }
    close() {
        this.isShow = false;
    }
}
