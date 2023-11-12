import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatetimePickerComponent } from '../elements/datetime-picker/datetime-picker.component';
declare const $: any;

@Component({
  selector: 'app-formarray',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatetimePickerComponent],
  templateUrl: './formarray.component.html',
  styleUrls: ['./formarray.component.css'],
})
export class FormarrayComponent {
  frm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      name: ['', [Validators.required, Validators.min(6)]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.email]],
      birthDate: ['', []],
      firstDate: ['', []],
      isAdmin: [false],
      select: [''],
      adress: formBuilder.array([]),
    });
  }
  get addressList(): FormArray {
    return this.frm.get('adress') as FormArray;
  }
  get name() {
    return this.frm.get('name');
  }
  get surname() {
    return this.frm.get('surname');
  }

  city(i: number) {
    return (<FormArray>this.frm.controls['adress']).controls[i].get('city');
  }
  street(i: number) {
    return (this.frm.get('adress') as FormArray).controls[i].get('street');
  }

  postalCode(i: number) {
    return (this.frm.get('adress') as FormArray).controls[i].get('postalCode');
  }
  ngAfterViewInit(): void {
    $('.kt_datepicker_8').flatpickr({
      altInput: true,
      altFormat: 'd.m.Y',
      dateFormat: 'd.m.Y',
      locale: 'tr',
    });
    $('.kt_datepicker_12').flatpickr({
      altInput: true,
      altFormat: 'd.m.Y',
      dateFormat: 'd.m.Y',
      locale: 'tr',
    });

    $('.select2').select2();
    $('.js-example-basic-single').select2();
    $('#select').on('change', (event: any) => {
      var value = event.target.value;
      this.frm.get('select')?.setValue(value);
    });
  }
  addAddress() {
    this.addressList.push(this.newAddress());
  }
  newAddress(): FormGroup {
    return this.formBuilder.group({
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postalCode: ['', []],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.frm.value);
  }

  onRemove(i: any) {
    const control = <FormArray>this.frm.controls['adress'];
    control.removeAt(i);
  }
}
