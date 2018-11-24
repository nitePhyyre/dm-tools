import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter';
import { Monster } from '../models/monster';
import { FactionsService } from './factions.service';
import * as _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ActiveEncountersService {
  private _activeEncounters: Encounter[];

  private serviceLocalStorageNamespace = 'encounters.active_encounters.';

  get activeEncounters(): Encounter[] {
    return this._activeEncounters;
  }

  constructor() {
    this._activeEncounters = Object.keys(localStorage)
      .filter(x => x.indexOf(this.serviceLocalStorageNamespace) === 0)
      .map((localStorageKey) => {
        return {
          label: localStorageKey.replace(this.serviceLocalStorageNamespace, ''),
          value: new FactionsService<Monster>(localStorageKey, Monster)
        };
      });
  }

  public createNewActiveEncounter(newEncounterName: string) {
    this.activeEncounters.push(
      new Encounter(
        newEncounterName,
        new FactionsService<Monster>(this.serviceLocalStorageNamespace + newEncounterName, Monster)));
  }
}
