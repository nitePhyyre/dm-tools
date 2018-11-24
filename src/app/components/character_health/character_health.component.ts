import { Component, Input } from '@angular/core';
import { Character } from '../../models/character';
import { FactionsService } from '../../services/factions.service';

@Component({
  selector: 'character-health',
  templateUrl: './character_health.component.html',
  styleUrls: ['./character_health.component.css']
})
export class CharacterHealthComponent {
  @Input() public character: Character;
  @Input() public shouldShowControls = true;
  @Input() public characterService: FactionsService<Character>;

  private updateCharacterHealth(character: Character, amount: number) {
    character.takeDamage(amount);
    this.characterService.update(character);
  }
}
