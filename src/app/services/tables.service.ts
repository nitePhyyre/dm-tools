import { Injectable } from '@angular/core';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  public AvailableTables: Array<Table>;

  private storageLocation = 'AvailableTables';

  constructor() {
    this.AvailableTables = [];
    this.load();
  }

  /**
   * save
   */
  public save() {
    localStorage.setItem(this.storageLocation, JSON.stringify(this.AvailableTables));
  }

  /**
   * load
   */
  public load() {
    this.AvailableTables = JSON.parse(localStorage.getItem(this.storageLocation)) || [];
  }
}
