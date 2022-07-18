import { getLocaleCurrencyCode } from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import { PeriodicElement } from '@app/models/PeriodicElement';
import { AccountService } from '@app/services/account.service';

@Component({
  selector: 'app-list',
  styleUrls: ['./list.component.css'],
  templateUrl: './list.component.html',
})

export class ListComponent {

  constructor(public accountService: AccountService)
  {
  }

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'empId', "action"];
  dataSource = this.accountService.getAll();

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  editrow(row)
  {

  }

  removeData(row) {
    this.dataSource.splice(row.id-1, 1);
    this.table.renderRows();
  }
}
