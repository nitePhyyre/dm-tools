import * as _ from 'lodash';

export class Table {
    public TableRows: Array<TableRow>;

    public constructor() {
        this.TableRows = [];
    }
    /**
     * addRow
     */
    public addRow(newRow: TableRow) {
        if (newRow.startRange > newRow.endRange) {
            throw new Error('Start range must be less than or equal to end range');
        }
        if (_.some(this.TableRows, (row: TableRow) => row.endRange >= newRow.startRange)) {
            throw new Error('New table rows must have a higher start than all other row\'s finish');
        }
        this.TableRows.push(newRow);
    }

    /**
     * removeRow
     */
    public removeRow() {
        this.TableRows.pop();
    }
}

export class TableRow {
    public startRange: number;
    public endRange: number;
    public name: string;
    public description: string;
    public fullText: string;
}
