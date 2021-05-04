import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  houses: Array<string>;
  team: Array<string>;
  constructor() { }

  ngOnInit(): void {
    this.houses = ['https://images.adsttc.com/media/images/5be9/fd5c/08a5/e5a5/8c00/008f/large_jpg/CARLES_FAUS_ARQUITECTURA_-_CARMEN_HOUSE_(2).jpg?1542061390',
      'https://nimvo.com/wp-content/uploads/2018/04/Modern-House.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnm8ECMJaAQu_rUUfaYZy-FQnl4XQbgsyLcA&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTahA0LYlzFA-K_B3pu8ruheyd1STRBMXTxbg&usqp=CAU'];
  }

}
