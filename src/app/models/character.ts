// const uuid = require('uuid/v4');
import uuid from 'uuid/v4';

export class Character {
    public id: number;
    public originalName: string;
    public notes: string;
    public size: string;
    public type: string;
    public subtype: string;
    public alignment: string;
    public armorClass: number;
    public armorType: string;
    public hitPoints: number;
    public hitDice: string;
    public hit_points: number;
    public hit_dice: string;
    public speed: any[];
    public strength: number;
    public dexterity: number;
    public constitution: number;
    public intelligence: number;
    public wisdom: number;
    public charisma: number;
    public strengthSave: number;
    public dexteritySave: number;
    public constitutionSave: number;
    public intelligenceSave: number;
    public wisdomSave: number;
    public charismaSave: number;
    public senses: any[];
    public languages: string;
    public perception: number;
    public acrobatics: number;
    public arcana: number;
    public athletics: number;
    public deception: number;
    public history: number;
    public insight: number;
    public intimidation: number;
    public investigation: number;
    public license: string;
    public medicine: number;
    public nature: number;
    public performance: number;
    public persuasion: number;
    public religion: number;
    public stealth: number;
    public survival: number;
    public damage: number;
    public init: number;
    public skills: any[];

    constructor(obj: any = {}) {
        this.damage = 0;
        this.hitPoints = 0;
        this.damage = 0;
        this.init = 0;
        this.hitDice = '';
        this.originalName = '';
        this.notes = '';
        this.size = 'medium';
        this.type = '';
        this.subtype = '';
        this.alignment = '';
        this.armorClass = 0;
        this.armorType = '';
        this.speed = [];
        this.strength = 0;
        this.dexterity = 0;
        this.constitution = 0;
        this.intelligence = 0;
        this.wisdom = 0;
        this.charisma = 0;
        this.strengthSave = 0;
        this.dexteritySave = 0;
        this.constitutionSave = 0;
        this.intelligenceSave = 0;
        this.wisdomSave = 0;
        this.charismaSave = 0;
        this.senses = [];
        this.languages = '';
        this.perception = 0;
        this.acrobatics = 0;
        this.arcana = 0;
        this.athletics = 0;
        this.deception = 0;
        this.history = 0;
        this.insight = 0;
        this.intimidation = 0;
        this.investigation = 0;
        this.license = '';
        this.medicine = 0;
        this.nature = 0;
        this.performance = 0;
        this.persuasion = 0;
        this.religion = 0;
        this.stealth = 0;
        this.survival = 0;
        this.id = uuid();

        delete obj.id; // delete any id passed into constructor to ensure using new one
        Object.assign(this, obj);
    }

    takeDamage(damageAmount: number): void {
        this.damage = this.damage + damageAmount;
    }

    gainLife(gainAmount: number): void {
        this.damage = this.damage - gainAmount;
    }

    get name(): string { return this.originalName; }
    set name(n) { this.originalName = n; }

    get strengthModifier(): number { return this.getModifierFromScore(this.strength); }
    get dexterityModifier(): number { return this.getModifierFromScore(this.dexterity); }
    get constitutionModifier(): number { return this.getModifierFromScore(this.constitution); }
    get intelligenceModifier(): number { return this.getModifierFromScore(this.intelligence); }
    get wisdomModifier(): number { return this.getModifierFromScore(this.wisdom); }
    get charismaModifier(): number { return this.getModifierFromScore(this.charisma); }

    private getModifierFromScore(score: number): number {
        let modifier: number;
        modifier = score - 10;
        modifier = Math.floor(modifier / 2);
        return modifier;
    }
}
