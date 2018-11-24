import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

// Landing is our top level component
import { LandingComponent } from './views/_landing/landing.component';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
import { ServicesIndustrialparc } from './ServicesIndutrialparc';

/*
 * Custom component Library
 */
import { AddTableComponent } from './components/add-table/add-table.component';
import { CurrentInitiativeTrackerComponent } from './components/current_initiative_tracker/current_initiative_tracker.component';
import { CharacterInfoComponent } from './components/character_info/character_info.component';
import { CharacterHealthComponent } from './components/character_health/character_health.component';
import { TableManagementComponent } from './views/table-management/table-management.component';
import { ViewTableComponent } from './components/view-table/view-table.component';
import { EncounterManagementComponent } from './views/encounter_management/encounter_management.component';
import { CombatManagementComponent } from './views/combat_management/combat_management.component';
import { CurrentCombatantsComponent } from './components/current_combatants/current_combatants.component';
import { CharacterTableComponent } from './components/character_table/character_table.component';
import { AddMonsterComponent } from './components/add_monster/add_monster.component';
/*
 * Modules for PrimeNg UI component Library
 */
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OrderListModule } from 'primeng/orderlist';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';


const d20 = require('d20');

@NgModule({
  declarations: [
    AddMonsterComponent,
    EncounterManagementComponent,
    LandingComponent,
    TableManagementComponent,
    CombatManagementComponent,
    CharacterInfoComponent,
    CharacterHealthComponent,
    CharacterTableComponent,
    CurrentCombatantsComponent,
    CurrentInitiativeTrackerComponent,
    AddTableComponent,
    ViewTableComponent
  ],
  imports: [
    /** Angular modules */
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,

    /** PrimeNg modules */
    AutoCompleteModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    TableModule,
    OrderListModule,
    OverlayPanelModule,
    PanelModule,
    SelectButtonModule,
    TabViewModule,

    /** Router */
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [
    {
      provide: ServicesIndustrialparc.PLAYER_SERVICE,
      useFactory: ServicesIndustrialparc.playerServiceFactory()
    },
    {
      provide: ServicesIndustrialparc.ALLY_SERVICE,
      useFactory: ServicesIndustrialparc.allyServiceFactory()
    },
    {
      provide: ServicesIndustrialparc.MONSTER_SERVICE,
      useFactory: ServicesIndustrialparc.monsterServiceFactory()
    }
  ],
  bootstrap: [LandingComponent]
})
export class AppModule { }
