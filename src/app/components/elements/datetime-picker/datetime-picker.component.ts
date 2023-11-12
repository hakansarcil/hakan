import { AfterViewInit, Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
declare const $: any;

@Component({
  selector: 'app-datetime-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimePickerComponent),
      multi: true,
    },
  ],
})
export class DatetimePickerComponent
  implements AfterViewInit, ControlValueAccessor
{
  pickerId: string = crypto.randomUUID();
  
  dateValue: string = '';
  writeValue(obj: any): void {    
    this.dateValue = obj;
    this.propagateChange(this.dateValue);
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  ngAfterViewInit(): void {
    let datePickerid="#"+this.pickerId;
    $(datePickerid).change(() => {
      let data = $(datePickerid).val();
      this.writeValue(data);
    });
    $(datePickerid).flatpickr({
      altInput: true,
      altFormat: 'd.m.Y',
      dateFormat: 'd.m.Y',
      locale: 'tr',
    });
  }
}
