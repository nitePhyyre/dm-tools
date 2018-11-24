import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import _ from 'lodash';
import { ICharacterService } from './Icharacter.service';
import { Character } from '../models/character';

@Injectable({ providedIn: 'root' })
export class FactionsService<T extends Character> implements ICharacterService {
    public readonly data: Observable<T[]>;

    private _data: BehaviorSubject<T[]> = new BehaviorSubject([]);

    constructor(private storageLocation: string, private T: new (data: Partial<T>) => T) {
        this.data = this._data.asObservable();
        let t = [];
        try {
            t = JSON.parse(localStorage.getItem(this.storageLocation));
        } catch (ex) {
            t = [];
        }
        const monsters = _.map(t, (monster) => new T(monster));
        this._data.next(monsters);
    }

    public search(searchStr: string): Observable<T[]> {
        return new Observable<T[]>();
    }

    public add(newMonster: T): void {
        // newMonster.hit_points = d20.roll(newMonster.hit_dice);

        const monsters = this._data.getValue();
        monsters.push(newMonster);
        localStorage.setItem(this.storageLocation, JSON.stringify(monsters));
    }

    public remove(ID: number): void {
        const monsters = this._data.getValue();
        _.remove(monsters, (monster) => monster.id === ID);

        if (monsters.length <= 0) {
            localStorage.removeItem(this.storageLocation);
        } else {
            localStorage.setItem(this.storageLocation, JSON.stringify(monsters));
        }
    }

    public update(character: T) {
        const monsters = this._data.getValue();
        const index = _.findIndex(monsters, ['id', character.id]);
        if (index >= 0) {
            monsters[index] = character;
        }
        // this._data.next(monsters);
        localStorage.setItem(this.storageLocation, JSON.stringify(monsters));
    }
}
