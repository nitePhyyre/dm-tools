import { Component, Input, OnInit } from '@angular/core';
import { OverlayPanel } from 'primeng/primeng';

// import { CharacterInfoComponent } from '../character_info/character_info.component';

import { FactionsService } from '../../services/factions.service';
import { Character } from '../../models/character';

import * as _ from 'lodash';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'dm-current-initiative',
  templateUrl: './current_initiative_tracker.component.html',
  styleUrls: ['./current_initiative_tracker.component.css']
})
export class CurrentInitiativeTrackerComponent {
  @Input() public data: Array<FactionsService<Character>>;
  @Input() public columns: string[];
  @Input() public selectedCharacters: Character[];

  public _combatants: Character[];

  private visible = true;
  private _currentRound = -1;
  private _currentTurn = -1;

  constructor() {
    this.selectedCharacters = [new Character()];
  }
  get currentRound(): number {
    return this._currentRound;
  }
  set currentRound(newCurrentRound: number) {
    this._currentRound = newCurrentRound;
  }

  get currentTurn(): number {
    return this._currentTurn;
  }
  set currentTurn(newCurrentTurn: number) {
    this.combatants.subscribe((combatants) => {
      if (newCurrentTurn >= combatants.length) {
        newCurrentTurn = -1;
        _.each(this.data, (service, index) => {
          service.data.subscribe((characterList) => {
            _.each(characterList, (character) => {
              character.init = null;
              service.update(character);
            });
          });
        });
      } else if (newCurrentTurn < -1) {
        newCurrentTurn = -1;
      }
      this._currentTurn = newCurrentTurn;
    });
  }

  get combatants(): Observable<Character[]> {
    const _combatantList = new BehaviorSubject<Character[]>([]);

    const that = this;
    combineLatest(_.map(this.data, (d) => d.data))
      .subscribe(data => {
        that._combatants = _.flattenDeep(data) as Character[];
        that._combatants = _.orderBy(this._combatants, ['init'], ['desc']);
        _combatantList.next(that._combatants);
      });
    return _combatantList.asObservable();
  }

  get currentCombatant(): Observable<Character> {
    const _currentCombatant = new BehaviorSubject<Character>(new Character());

    if (this._combatants !== undefined && this._combatants[this.currentTurn] !== undefined) {
      _currentCombatant.next(this._combatants[this.currentTurn]);
    }
    return _currentCombatant.asObservable();
  }

  private hoverOverCharacter(event, character: Character, overlayPanel: OverlayPanel) {
    // this.selectedCharacter = character;
    // overlayPanel.toggle(event);
  }

  private handleTabPanelClose(t) {
    t.close();
  }
}
