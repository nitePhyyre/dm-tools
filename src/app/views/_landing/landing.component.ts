/**
 * Angular 2 decorators and services
 */
import {
  Component,
  ViewEncapsulation
} from '@angular/core';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'dm-tools',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './landing.component.html',
  styleUrls: [
    './landing.component.css'
  ]
})
export class LandingComponent { }
