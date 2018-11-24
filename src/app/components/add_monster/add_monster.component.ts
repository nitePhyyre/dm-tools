import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Monster } from '../../models/monster';
import { MonsterManualService } from '../../services/monster_manual.service';

import { FactionsService } from '../../services/factions.service';
import { Character } from '../../models/character';

import * as _ from 'lodash';
// import d20 = require('d20');
@Component({
    selector: 'add-monster',
    templateUrl: './add_monster.component.html',
    styleUrls: ['./add-monster.component.css']
})
export class AddMonsterComponent {
    @Input()
    public characterService: FactionsService<Character>;

    private display = false;
    private searchTerm: string;
    private searchResults: Monster[];

    private monsterNameCounter = {};

    private selectedMonster: Monster;
    private qty: number;

    private selectedEncounter: FactionsService<Monster>;

    constructor(private monsterManualService: MonsterManualService) { }

    public search(event) {
        this.monsterManualService.searchMonster(event.query).subscribe((data) => {
            this.searchResults = data;
        });
    }
    public selectMonster(monster: Monster) {
        this.qty = null;
        this.selectedMonster = monster;
    }

    public addMonster() {
        if (!(this.qty > 0)) {
            this.qty = 1;
        }
        for (let i = 0; i < this.qty; i++) {
            let newMonster = _.clone(this.selectedMonster);
            newMonster = new Monster(newMonster);
            this.monsterNameCounter[newMonster.name]++;
            if (!(this.monsterNameCounter[newMonster.name] > 0)) {
                this.monsterNameCounter[newMonster.name] = 1;
            }

            newMonster.name =
                newMonster.name + ' ' + this.monsterNameCounter[newMonster.name];
            const newHp = d20.roll(newMonster.hit_dice);
            newMonster.hit_points = newHp;
            this.characterService.add(newMonster);
        }
    }

    public rollMonsterInitiatives() {
        this.characterService.data.subscribe((monsters) => {
            _.each(monsters, (monster) => {
                const init = d20.roll('1d20+' + monster.dexterityModifier);
                monster.init = init;
                this.characterService.update(monster);
            });
        });
    }
}
