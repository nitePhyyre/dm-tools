import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter';
import { Monster } from '../models/monster';
import { FactionsService } from './factions.service';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class EncountersService {
  private _encounters: Encounter[];

  private serviceLocalStorageNamespace = 'encounters.';

  get encounters(): Encounter[] {
    return this._encounters;
  }

  constructor() {
    this._encounters = Object.keys(localStorage)
      .filter(x => x.indexOf(this.serviceLocalStorageNamespace) === 0)
      .map((localStorageKey) => {
        return {
          label: localStorageKey.replace(this.serviceLocalStorageNamespace, ''),
          value: new FactionsService<Monster>(localStorageKey, Monster)
        };
      });
  }

  public createNewEncounter(newEncounterName: string) {
    this.encounters.push(
      new Encounter(
        newEncounterName,
        new FactionsService<Monster>(this.serviceLocalStorageNamespace + newEncounterName, Monster)));
  }
}
