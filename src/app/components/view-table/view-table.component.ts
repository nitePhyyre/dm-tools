import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../models/table';

@Component({
  selector: 'dm-tools-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css']
})
export class ViewTableComponent implements OnInit {
  @Input() table: Table;

  constructor() { }

  ngOnInit() {
  }
}
