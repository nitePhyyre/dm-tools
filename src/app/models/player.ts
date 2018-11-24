import { Character } from './character';

export class Player extends Character {
    public playerName: string;
    public experience: number;

    constructor(obj = {}) {
        super(obj);
    }
}
