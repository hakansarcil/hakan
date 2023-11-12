import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() dataGridList: any[] = [];
  orderColumn: string = 'MerchantNo';
  orderAsc: boolean = true;
  currentPage: number = 1;
  pageSize: number = 3;

  totalRecordCount: number = 0;
  totalPageCount: number = 0;
  pageList: number[] = [];

  @Output() dataItems = new EventEmitter<any[]>();
  
  GetData() {
 
    this.totalPageCount = this.dataGridList.length / this.pageSize;
    this.totalRecordCount = this.dataGridList.length;
    this.pageList = [];
    for (let index = 1; index <= this.totalPageCount; index++) {
      this.pageList.push(index);
    }
  }

  getExData() {
    this.dataItems.emit(this.dataGridList);
  }
  Order(column: any) {
    if ((this.orderColumn = column)) {
      this.orderAsc = !this.orderAsc;
    }
    this.orderColumn = column;
    this.currentPage = 1;
    this.GetData();
  }
  setPage(page: number) {
    this.currentPage = page;
    this.GetData();
    console.log(page);
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.GetData();
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPageCount) {
      this.currentPage += 1;
      this.GetData();
    }
  }
}
