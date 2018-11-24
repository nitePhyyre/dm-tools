import * as _ from 'lodash';

export class Table {
    public name: string;
    public displayPriority: number;
    public rows: Array<TableRow>;

    public constructor() {
        this.name = '';
        this.rows = [];
    }

    /**
     * addRow
     */
    public addRow(newRow: TableRow) {
        if (newRow.startRange > newRow.endRange) {
            throw new Error('Start range must be less than or equal to end range');
        }
        if (_.some(this.rows, (row: TableRow) => row.endRange >= newRow.startRange)) {
            throw new Error('New table rows must have a higher start than all other row\'s finish');
        }
        this.rows.push(newRow);
    }

    /**
     * removeRow
     */
    public removeRow() {
        this.rows.pop();
    }
}

export class TableRow {
    public startRange: number;
    public endRange: number;
    public name: string;
    public description: string;
    public fullText: string;
}
