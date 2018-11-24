import { FactionsService } from '../services/factions.service';
import { Character } from './character';

export class Factions {
    public name: string;
    public encounter: FactionsService<Character>;

    constructor(name: string) {
        this.name = name;
        this.encounter = new FactionsService<Character>(name, Character);
    }
}
