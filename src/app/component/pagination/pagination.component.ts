import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core'

@Component({
    moduleId: 'module.id',
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.less']
})

export class PaginationComponent implements OnChanges {
    @Input() currentIndex = 0;

    @Input() pagesTotal = 0;

    @Input() pageSize: number = 10;
    recordsTotal;

    pageRange = [];

    @Output() currentIndexChange = new EventEmitter();
    //  @Output() pageSizeChange = new EventEmitter();

    constructor() { 
        
    }
    //根据当前页数与总页数，计算应该显示的页码范围
    range(): void {
        let result = [];
        if (this.pagesTotal < 4) {
            for(let i=1;i<=this.pagesTotal;i++){
                result.push(i);
            }
             this.pageRange = result;
           

        } else {
            let min = this.currentIndex <= 2
                ? 1
                : this.currentIndex >= this.pagesTotal - 2
                    ? this.pagesTotal - 4
                    : this.currentIndex - 2;
            min = min < 1 ? 1 : min;
            let max = (min + 4) > this.pagesTotal ? this.pagesTotal : (min + 4);

            for (let i = min; i <= max; i++) {
                result.push(i);
            }
            this.pageRange = result;
        }
    }
    setCurrentPage($event) {
        if ($event < 1 || $event > this.pagesTotal || $event == this.currentIndex)
            return;
        this.currentIndexChange.emit($event);

    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['currentIndex']) {
            this.currentIndex = changes['currentIndex'].currentValue
        }
        if (changes['pagesTotal']) {
            this.pagesTotal = changes['pagesTotal'].currentValue;
       
        }
        if (changes['pageSize']) {
            this.pageSize = changes['pageSize'].currentValue
        }

        this.range();
    }


}
