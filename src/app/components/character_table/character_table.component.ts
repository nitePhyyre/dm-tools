import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Character } from '../../models/character';

import * as _ from 'lodash';
import { FactionsService } from '../../services/factions.service';

@Component({
  selector: 'dm-character-table',
  templateUrl: './character_table.component.html',
  styleUrls: ['./character_table.component.css']
})
export class CharacterTableComponent {
  @Input() public characterService: FactionsService<Character>;
  @Output() public SelectedCharacterChange = new EventEmitter<Character[]>();
  @Input() public columns: string[];

  private visible = true;
  private selectedCharacter: Character;
  private selectedCharacters: Character[];

  constructor() {
    this.selectedCharacters = [];
  }

  private updateCharacterName(character: Character, newName: string) {
    character.name = newName;
    this.characterService.update(character);
  }

  private selectCharacter(character: Character) {
    this.selectedCharacters.push(character);
    this.SelectedCharacterChange.emit(this.selectedCharacters);
  }

  private removeCharacter(character: Character) {
    this.characterService.remove(character.id);
  }
}
