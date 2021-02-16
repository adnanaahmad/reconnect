import { Component, OnInit } from '@angular/core';
import {FavoritesModel} from '../../models/favorites.model';
import {FavoritesService} from '../../services/favorites.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorite: FavoritesModel = {} as FavoritesModel;
  constructor(private favoriteService: FavoritesService) { }

  ngOnInit(): void {
    this.getFavorites();
  }
  getFavorites(): void{
    this.favoriteService.getFavorites().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.favorite.home = res.result;
    }, error => {
      console.log(error);
    });
  }
  updatedFavorites(event): void{
    this.favorite.home = event;
  }

}
