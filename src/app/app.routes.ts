import { Routes } from '@angular/router';
import { TableManagementComponent } from './views/table-management/table-management.component';
import { CombatManagementComponent } from './views/combat_management/combat_management.component';
import { EncounterManagementComponent } from './views/encounter_management/encounter_management.component';

export const ROUTES: Routes = [
    { path: 'tables', component: TableManagementComponent },
    { path: 'combat', component: CombatManagementComponent },
    { path: 'encounters', component: EncounterManagementComponent }
];
