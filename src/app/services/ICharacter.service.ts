import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export abstract class ICharacterService {
    public readonly data: Observable<Character[]>;

    public abstract search(searchStr: string): Observable<Character[]>;
    public abstract add(newCharacter: Character);
    public abstract remove(ID: number);
}


export class UpdateField {
    public field: string;
    public value: string;
}
