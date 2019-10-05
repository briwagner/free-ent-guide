import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tv-menu',
  templateUrl: './tv-menu.component.html',
})
export class TvMenuComponent {

  @Input() activePath: string;
}
