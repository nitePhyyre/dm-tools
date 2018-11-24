import { InjectionToken } from '@angular/core';
import { FactionsService } from './services/factions.service';
import { Player } from './models/player';
import { Monster } from './models/monster';

export class ServicesIndustrialparc {
    public static PLAYER_SERVICE = new InjectionToken<FactionsService<Player>>('player.service');
    public static ALLY_SERVICE = new InjectionToken<FactionsService<Monster>>('ally.service');
    public static MONSTER_SERVICE = new InjectionToken<FactionsService<Monster>>('monster.service');

    public static playerServiceFactory() {
        return () => new FactionsService<Player>('players', Player);
    }
    public static allyServiceFactory() {
        return () => new FactionsService<Monster>('encounters.allies', Monster);
    }
    public static monsterServiceFactory() {
        return () => new FactionsService<Monster>('monsters', Monster);
    }
}
