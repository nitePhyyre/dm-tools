import { Inject, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Character } from '../../models/character';
import { Player } from '../../models/player';
import { Monster } from '../../models/monster';

import { FactionsService } from '../../services/factions.service';

import * as _ from 'lodash';
import { ServicesIndustrialparc } from '../../ServicesIndutrialparc';
import { EncountersService } from '../../services/encounters.service';
import { ActiveEncountersService } from '../../services/active_encounters.service';
import { Factions } from '../../models/factions';

@Component({
  selector: 'dm-current-combatants',
  templateUrl: './current_combatants.component.html',
  styleUrls: ['./current_combatants.component.css']
})
export class CurrentCombatantsComponent implements OnInit {
  @Input() public factions: Factions[];
  @Output() public SelectedCharacterChange = new EventEmitter<Character[]>();
  public combatStarted = false;

  public playerColumns = [];
  public monsterColumns = [];

  public selectedAlliesService: any;
  public selectedEncounter: any;

  constructor(@Inject(ServicesIndustrialparc.PLAYER_SERVICE) private playersService: FactionsService<Player>,
    @Inject(ServicesIndustrialparc.ALLY_SERVICE) private alliesService: FactionsService<Monster>,
    @Inject(ServicesIndustrialparc.MONSTER_SERVICE) private monstersService: FactionsService<Monster>,
    private encountersService: EncountersService,
    private activeEncountersService: ActiveEncountersService) { }

  get combatants(): Array<FactionsService<Character>> {
    return [this.playersService];
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

  private selectCharacter(characters: Character[]) {
    this.SelectedCharacterChange.emit(characters);
  }

  private removeSide(side: Factions) {
    this.factions = this.factions.filter((s) => s.name === side.name);
  }
}
