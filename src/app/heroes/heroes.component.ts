import { Component, OnInit } from '@angular/core';

import { DataSvcService } from '../services/data-svc.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes;

  constructor(
    private datasvc: DataSvcService
  ) { }

  ngOnInit() {
    this.datasvc.getHeroes()
                .subscribe(
                  p => this.heroes = p,
                  e => console.log(e),
                  () => console.log('completed')
                );
  }

}
