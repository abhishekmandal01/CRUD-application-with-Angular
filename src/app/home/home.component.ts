import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(private accountService: AccountService) {
      this.user = this.accountService.userValue;
  }

  ngOnInit(): void {
  }
}
