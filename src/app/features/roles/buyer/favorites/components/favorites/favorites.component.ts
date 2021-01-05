import { Component, OnInit } from '@angular/core';
import {FavoritesModel} from '../../models/favorites.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorite: FavoritesModel = {} as FavoritesModel;
  constructor() { }

  ngOnInit(): void {
    this.favorite.home = [
      {
        id: 1,
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: true
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 't Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: true
      },
      {
        id: 3,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/03/15/DSCF2937.1584292578.7759.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your  account Here\'s what Here\'s whats happening to your reconnect accoun reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 4,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/06/25/bloco-arquitetos-vila-rica-house-bras--lia-brazil-archello--19-.1593107058.9729.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun',
        status: 'Active',
        favorite: true
      },
      {
        id: 1,
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHw%3D&w=1000&q=80',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 't Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 3,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/03/15/DSCF2937.1584292578.7759.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your  account Here\'s what Here\'s whats happening to your reconnect accoun reconnect account Here\'s what Here\'s whats happening to your reconnect account',
        status: 'Active',
        favorite: false
      },
      {
        id: 4,
        image: 'https://archello.s3.eu-central-1.amazonaws.com/images/2020/06/25/bloco-arquitetos-vila-rica-house-bras--lia-brazil-archello--19-.1593107058.9729.jpg',
        price: 200000,
        area: 2150,
        garage: 1,
        bedroom: 2,
        bathroom: 3,
        description: 'Here\'s whats happening to your reconnect account Here\'s what Here\'s whats happening to your reconnect account  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun  account Here\'s what Here\'s whats happening to your reconnect accoun',
        status: 'Active',
        favorite: false
      }
    ];
  }

}
