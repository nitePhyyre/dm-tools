import { Component, OnInit } from '@angular/core';

import { TablesService } from '../../services/tables.service';
import { Table } from '../../models/table';

import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'dm-tools-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css'],
  providers: [ConfirmationService]
})
export class TableManagementComponent implements OnInit {
  public tables: Table[];

  private name = '';
  private display = false;
  private selectedTable: Table;
  private tablesService: TablesService;

  constructor(tablesService: TablesService, private confirmationService: ConfirmationService) {
    this.tablesService = tablesService;
    this.tablesService.getAvailableTables().subscribe((storedTables) => this.tables = storedTables);
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        // Actual logic to perform a confirmation
      }
    });
  }
  ngOnInit() { }

  /**
   * add
   */
  public showAddDialog() {
    this.display = true;
  }

  public addTableToService($event) {
    this.tablesService.addTable($event);
  }
}
