import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AsideComponent } from './components/aside/aside.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { DatePipe } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    AsideComponent,
    NavComponent,
    FooterComponent,
    FormsModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'StartTemplate';
  userList: User[] = [];

  unsubdcribe = new Subject();
  constructor(private userService: UserService, private datePipe: DatePipe) {}
  ngOnDestroy(): void {
    this.unsubdcribe.next('');
    this.unsubdcribe.complete();
  }

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.unsubdcribe))
      .subscribe((data) => {
        data.map((u) => {
          u.nickname = `${u.id}-${u.name}`;
          const dateValue = new Date('1995-12-25T23:15:30');
          u.birtdate = this.datePipe.transform(dateValue, 'dd.MM.yyyy');
          u.birthtime = this.datePipe.transform(dateValue, 'hh:mm:ss');
        });
        this.userList = data;
        console.log(data);
      });
  }

  trackByFn(index: number, item: User) {
    return index;
  }
  add() {
    this.userList.push({
      id: this.userList.length + 1,
      name: 'hakan',
      username: '',
      birtdate: '',
      birthtime: '',
      email: '',
      nickname: '',
    });
  }
}
