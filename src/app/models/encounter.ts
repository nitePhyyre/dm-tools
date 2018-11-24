import { FactionsService } from '../services/factions.service';
import { Monster } from './monster';

export class Encounter {
    label: string;
    value: FactionsService<Monster>;

    constructor(label: string, service: FactionsService<Monster>) {
        this.label = label;
        this.value = service;
    }
}
