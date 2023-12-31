import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css']
})
export class LoadingButtonComponent {
  @Input() isloading: boolean = false;
  @Input() loadingText: string = '';
  @Input() buttonType: string = 'button';
 
}
