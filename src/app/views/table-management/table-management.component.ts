import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../services/tables.service';
import { Table } from '../../models/table';

@Component({
  selector: 'dm-tools-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit {
  private tables: Table[];

  constructor(tablesService: TablesService) {
    if (tablesService.AvailableTables.length === 0) {
      tablesService.load();
    }
    this.tables = tablesService.AvailableTables;
  }

  ngOnInit() {
  }

}
