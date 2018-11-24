import { Inject, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Factions } from '../../models/factions';
import { Character } from '../../models/character';
import { Player } from '../../models/player';
import { Monster } from '../../models/monster';

import { FactionsService } from '../../services/factions.service';

import * as _ from 'lodash';
import { ServicesIndustrialparc } from '../../ServicesIndutrialparc';
import { EncountersService } from '../../services/encounters.service';

@Component({
  selector: 'dm-initiative',
  templateUrl: './combat_management.component.html',
  styleUrls: ['./combat_management.component.css']
})
export class CombatManagementComponent implements OnInit {
  @ViewChild('addFactionInput') public addFactionInputElement: ElementRef;

  private combatStarted = false;
  private showAddFactionInput = false;

  private factions: Factions[] = [];

  private playerColumns = [];
  private monsterColumns = [];

  private selectedCharacters: Character[];

  constructor(
    @Inject(ServicesIndustrialparc.PLAYER_SERVICE) private playersService: FactionsService<Player>,
    @Inject(ServicesIndustrialparc.ALLY_SERVICE) private alliesService: FactionsService<Monster>,
    @Inject(ServicesIndustrialparc.MONSTER_SERVICE) private monstersService: FactionsService<Monster>,
    private encountersService: EncountersService) {
    this.factions = [];
  }

  get combatants(): Array<FactionsService<Character>> {
    const cbts = _.map(this.factions, (faction) => faction.encounter);
    cbts.push(this.playersService);
    return cbts;
  }

  public ngOnInit() {
    this.playerColumns = [
      { field: 'name', header: 'Name', size: '25%' },
      { field: 'hp', header: 'Hit Points', size: '25%' },
      { field: 'passive_perception', header: 'PP', size: '25%' },
      { field: 'init', header: 'Init', size: '25%' }
    ];

    this.monsterColumns = [
      { field: 'editableName', header: 'Name', size: '25%' },
      { field: 'hp', header: 'Hit Points', size: '25%' },
      { field: 'init', header: 'Init', size: '25%' },
      { field: 'monster_stats', header: '', size: '25%' }
    ];
  }

  public changeSelectedCharacter(character: Character) {
    this.selectedCharacters.push(character);
  }

  public addFaction(value: string) {
    const t = new Factions(value);
    this.factions.push(t);
    this.showAddFactionInput = false;
  }
}
