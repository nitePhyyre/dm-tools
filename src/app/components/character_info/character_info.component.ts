import { Component, Input } from '@angular/core';
import { Character } from '../../models/character';

import * as _ from 'lodash';
@Component({
  selector: 'dm-character-info',
  templateUrl: './character_info.component.html',
  styleUrls: ['./character_info.component.css']
})
export class CharacterInfoComponent {
  @Input() character: Character;
  visible: boolean = true;

  getXpValue(challengeRating: string) {
    return eval(challengeRating) * 200;
  }
}
