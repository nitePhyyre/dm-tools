import { Component, Input } from '@angular/core';

import { Monster } from '../../models/monster';

import { FactionsService } from '../../services/factions.service';
import { MonsterManualService } from '../../services/monster_manual.service';

import * as _ from 'lodash';
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'dm-encounter-management',
  templateUrl: './encounter_management.component.html',
  styleUrls: ['./encounter_management.component.css']
})
export class EncounterManagementComponent {
  private selectedEncounter: FactionsService<Monster>;
  private newEncounterName: string;
  private monsterManual: Monster[];

  constructor(private monsterManualService: MonsterManualService,
    private encountersService: EncountersService) {
    monsterManualService.getMonsters()
      .subscribe((monsters) => { this.monsterManual = monsters; });
  }

  private createNewEncounter() {
    this.encountersService.createNewEncounter(this.newEncounterName);
    this.newEncounterName = '';
  }

  private addMonsterToEncounter(encounter: FactionsService<Monster>, monster: Monster) {
    monster = new Monster(monster);
    encounter.add(monster);
  }
}
