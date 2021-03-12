import { Component, OnInit } from '@angular/core';
import {FavoritesModel} from '../../models/favorites.model';
import {FavoritesService} from '../../services/favorites.service';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorite: FavoritesModel = {} as FavoritesModel;
  constructor(private favoriteService: FavoritesService,
              private store: StoreService) { }

  ngOnInit(): void {
    this.getFavorites();
  }
  getFavorites(): void{
    this.store.updateProgressBarLoading(true);
    this.favoriteService.getFavorites().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.favorite.home = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  updatedFavorites(event): void{
    this.favorite.home = event;
  }

}
