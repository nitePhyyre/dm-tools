import { Character } from './character';

export class Monster extends Character {
    public damageVulnerabilities: string;
    public damageResistances: string;
    public damageImmunities: string;
    public conditionImmunities: string;
    public challengeRating: string;
    public actions: any[];
    public reactions: any[];
    public legendaryActions: any[];
    public specialAbilities: any[];

    constructor(obj = {}) {
        super(obj);
    }
}
