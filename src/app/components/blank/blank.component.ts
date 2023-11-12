import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from '../elements/loading-button/loading-button.component';
import { DatetimePickerComponent } from '../elements/datetime-picker/datetime-picker.component';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFont from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFont.pdfMake.vfs;
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { DataGridComponent } from '../elements/data-grid/data-grid.component';
declare const $: any;

@Component({
  selector: 'app-blank',
  standalone: true,
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css'],
  imports: [
    CommonModule,
    LoadingButtonComponent,
    DatetimePickerComponent,
    FormsModule,
    DataGridComponent,
    ReactiveFormsModule,
  ],
})
export class BlankComponent {
  isLoading: boolean = false;
  buttonType: string = 'submit';
  datePicker: string = 'datepic';
  dataList: any[] = [];
  dataGridList = [
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 6.5,
      BatchTime: '2022-12-29T15:43:17',
      BatchNo: 1,
      MerchantName: 'Green Restaurant',
      TransactionCount: 2,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 3.4,
      BatchTime: '2023-01-02T10:52:33',
      BatchNo: 3,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 4,
      BatchTime: '2023-01-02T11:56:31',
      BatchNo: 4,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 1,
      BatchTime: '2023-01-02T12:02:56',
      BatchNo: 6,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 1,
      BatchTime: '2023-01-02T12:02:59',
      BatchNo: 9,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 5,
      BatchTime: '2023-01-02T13:39:38',
      BatchNo: 13,
      MerchantName: 'Green Restaurant',
      TransactionCount: 2,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 6,
      BatchTime: '2023-01-02T14:22:30',
      BatchNo: 14,
      MerchantName: 'Green Restaurant',
      TransactionCount: 3,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 2,
      BatchTime: '2023-01-02T14:33:51',
      BatchNo: 15,
      MerchantName: 'Green Restaurant',
      TransactionCount: 2,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 1,
      BatchTime: '2023-01-02T14:34:29',
      BatchNo: 16,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
    {
      MerchantNo: 30000280,
      TerminalNo: 10798,
      TransactionAmount: 1,
      BatchTime: '2023-01-02T14:35:19',
      BatchNo: 17,
      MerchantName: 'Green Restaurant',
      TransactionCount: 1,
    },
  ];
  constructor(private formBuilder: FormBuilder) {}
  holder: any;

  ngAfterViewInit(): void {
    $('.kt_datepicker_7').flatpickr({
      altInput: true,
      altFormat: 'd.m.Y',
      dateFormat: 'd.m.Y',
      mode: 'range',
      locale: 'tr',
    });
    $('#kt_datepicker_3').flatpickr({
      enableTime: true,
      dateFormat: 'd.m.Y H:i',
      time_24hr: true,
      locale: 'tr',
    });
    $('.kt_datepicker_8').flatpickr({
      altInput: true,
      altFormat: 'd.m.Y',
      dateFormat: 'd.m.Y',
      locale: 'tr',
    });
    $('#selecter').select2();
    $('#selecter2').select2();
  }
  setLoading(form: NgForm) {
    console.log(form.value);

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

  GetData(event: any[]) {
    console.log(event);

    this.dataList = event;
  }

  buildTableBody(data: any[], columns: any) {
    var body = [];
    debugger;

    //push first and second row
    body.push(data[0]);

    data.forEach((row) => {
      var dataRow: any[] = [];
      columns.forEach((column: any) => {
        dataRow.push(JSON.stringify(row[column]));
      });
      body.push(dataRow);
    });

    return body;
  }

  table(data: any[], columns: string[]) {
    return {
      table: {
        headerRows: columns.length,
        widths: new Array(columns.length).fill('auto').flat(),
        body: this.buildTableBody(data, columns),
      },
    };
  }

  generatePdf() {
    this.dataGridList.push(...this.dataGridList);
    this.dataGridList.push(...this.dataGridList);
    const data = this.dataGridList.concat(...this.dataGridList);
    let docDefinition = {
      content: [
        { text: 'PDF Generate', style: 'header' },
        this.table(data, Object.keys(this.dataGridList[0])),
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
