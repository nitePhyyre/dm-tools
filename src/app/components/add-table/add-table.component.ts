import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Table, TableRow } from '../../models/table';

@Component({
  selector: 'dm-tools-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  private table: Table;
  @Output() NewTableCreated = new EventEmitter<any>();

  types: any[];
  diceSize: number;
  massAddRowsText: string;
  separationCharacter = '|';

  constructor() {
    this.table = this.getEmptyTable();
    console.log(this.table);

    this.types = [];
    this.types.push({ label: 'D2', value: '2' });
    this.types.push({ label: 'D4', value: '4' });
    this.types.push({ label: 'D6', value: '6' });
    this.types.push({ label: 'D8', value: '8' });
    this.types.push({ label: 'D10', value: '10' });
    this.types.push({ label: 'D12', value: '12' });
    this.types.push({ label: 'D20', value: '20' });
    this.types.push({ label: 'D100', value: '100' });
  }

  private getEmptyTable(): Table {
    const table = new Table();
    const row = new TableRow();

    row.startRange = 1;
    table.addRow(row);

    return table;
  }

  addTableRow() {
    const previousEndRange = this.table.rows[this.table.rows.length - 1].endRange * 1;

    if (previousEndRange < this.diceSize) {
      const row = new TableRow();
      row.startRange = previousEndRange + 1;
      row.endRange = this.diceSize;

      this.table.addRow(row);
    }
  }

  addNewTable() {
    if (this.massAddRowsText.length > 0) {
      this.processMassRowText();
    }
    this.NewTableCreated.emit(this.table);

    this.table = this.getEmptyTable();
    this.diceSize = undefined;
    this.massAddRowsText = '';
  }

  processMassRowText() {
    const rows = this.massAddRowsText.split('\n');
    const newRow = new TableRow();
    rows.forEach(row => {
      const data = row.split('|');
      const ranges = data[0].split('-');
      newRow.startRange = Number(ranges[0]);
      newRow.endRange = Number(ranges[1]);
      newRow.name = data[1];
      newRow.description = data[2];
      newRow.fullText = data[3];

      this.table.addRow(newRow);
    });
  }
}
