import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-nav',
    standalone: true,
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    imports: [CommonModule, FooterComponent,RouterModule]
})
export class NavComponent {

}
