import { TestBed, async } from '@angular/core/testing';
import { Table, TableRow } from '../../app/models/table';

describe('Table add row', () => {
    it('should create an instance', () => {
        expect(new Table()).toBeTruthy();
    });
});

describe('Table - addRow()', () => {
    it('should accept first row', () => {
        const table = new Table();

        const row = new TableRow();
        row.startRange = 10;
        row.endRange = 15;
        table.addRow(row);

        expect(table.TableRows.length).toBe(1);
    });

    it('should accept two good rows', () => {
        const table = new Table();
        let row = new TableRow();
        row.startRange = 10;
        row.endRange = 15;
        table.addRow(row);

        row = new TableRow();
        row.startRange = 16;
        row.endRange = 20;
        table.addRow(row);

        expect(table.TableRows.length).toBe(2);
    });

    it('should throw error rows if start value lower than any other row\'s end value', () => {
        const table = new Table();

        let row = new TableRow();
        row.startRange = 10;
        row.endRange = 15;
        table.addRow(row);

        row = new TableRow();
        row.startRange = 2;
        row.endRange = 10;

        expect(function () { table.addRow(row); })
            .toThrowError('New table rows must have a higher start than all other row\'s finish');
    });

    it('should throw error if start value lower than end value', () => {
        const table = new Table();

        const row = new TableRow();
        row.startRange = 10;
        row.endRange = 5;

        expect(function () { table.addRow(row); })
            .toThrowError('Start range must be less than or equal to end range');
    });
});

describe('Table - remove row', () => {
    it('should remove last element form list', () => {
        const table = new Table();

        let row = new TableRow();
        row.startRange = 10;
        row.endRange = 15;
        row.name = 'test';
        table.addRow(row);

        row = new TableRow();
        row.startRange = 16;
        row.endRange = 20;
        row.name = 'wrong';
        table.addRow(row);

        expect(table.TableRows.length).toBe(2);

        table.removeRow();
        expect(table.TableRows[0].name).toBe('test');
    });
});
