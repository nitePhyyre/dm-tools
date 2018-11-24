import { Injectable } from '@angular/core';
import { Table } from '../models/table';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TablesService {
  private storageLocation = 'AvailableTables';
  private _availableTables: BehaviorSubject<Table[]> = new BehaviorSubject([]);

  private get AvailableTables() {
    return this._availableTables.getValue();
  }

  constructor() {
    this.load();
  }

  public getAvailableTables() {
    return this._availableTables.asObservable();
  }

  public setAvailableTables(newTables: Table[]) {
    this._availableTables.next(newTables);
    this.save();
  }
  /**
   * Add a new Table to the service
   */
  public addTable(newTable: Table) {
    const newTablesList = this.AvailableTables;
    newTablesList.push(newTable);
    this._availableTables.next(newTablesList);
    this.save();
  }

  /**
   * Remove a Table to the service
  */
  public removeTableAt(index: number) {
    const newTablesList = this.AvailableTables;
    newTablesList.splice(index);
    this._availableTables.next(newTablesList);
    this.save();
  }

  /**
   * save
   */
  private save() {
    localStorage.setItem(this.storageLocation, JSON.stringify(this.AvailableTables));
  }

  /**
   * load
   */
  private load() {
    const storedTables = JSON.parse(localStorage.getItem(this.storageLocation)) || [];
    this._availableTables.next(storedTables);
    // return this;
  }
}
